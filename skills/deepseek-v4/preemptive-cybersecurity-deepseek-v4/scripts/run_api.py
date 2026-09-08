"""Explicit, tool-free API adapter. Dry-run performs no network requests."""
import argparse
import datetime
import json
import os
from pathlib import Path
import sys
import urllib.error
import urllib.request
from urllib.parse import urlparse


def validate_document(document, schema_path):
    from jsonschema import Draft202012Validator, ValidationError
    schema = json.loads(schema_path.read_text(encoding="utf-8"))
    Draft202012Validator.check_schema(schema)
    try:
        Draft202012Validator(schema).validate(document)
    except ValidationError as error:
        location = '.'.join(str(p) for p in error.absolute_path) or '<root>'
        raise ValueError('Schema validation failed at ' + location + ' (' + error.validator + ')') from None


def validate_report(report, data):
    if report["scope_id"] != data["scope"]["scope_id"]:
        raise ValueError("Output scope_id does not match input")
    evidence = [e["evidence_id"] for e in report["evidence"]]
    if len(evidence) != len(set(evidence)):
        raise ValueError("Duplicate evidence IDs")
    allowed = {e["evidence_id"] for e in data["evidence"]}
    if not set(evidence) <= allowed:
        raise ValueError("Report introduced evidence not provided to this tool-free run")
    assets = {a["asset_id"] for a in data["assets"]}
    fids = set()
    for finding in report["findings"]:
        if finding["finding_id"] in fids:
            raise ValueError("Duplicate finding ID")
        fids.add(finding["finding_id"])
        if not set(finding["asset_ids"]) <= assets:
            raise ValueError("Unknown asset ID")
        refs = finding["evidence_ids"] + finding["validation"]["evidence_ids"]
        if not set(refs) <= set(evidence):
            raise ValueError("Unknown evidence reference")
        if finding["status"] == "validated" and (finding["validation"]["status"] != "passed" or not finding["validation"]["evidence_ids"]):
            raise ValueError("Validated finding requires passed validation with evidence")
        if data["scope"]["authorization"] == "analysis_only" and finding["validation"]["status"] == "passed" and not finding["validation"]["evidence_ids"]:
            raise ValueError("Analysis-only run cannot invent passed validation")
    for metric in report["metrics"]:
        if metric["denominator"] in (None, 0) and metric["value"] is not None:
            raise ValueError("Unknown or zero denominator requires null metric value")


def validate_input(data):
    scope = data['scope']
    start = datetime.datetime.fromisoformat(scope['window_start'].replace('Z', '+00:00'))
    end = datetime.datetime.fromisoformat(scope['window_end'].replace('Z', '+00:00'))
    if start.tzinfo is None or end.tzinfo is None or start > end:
        raise ValueError('Observation window requires timezone-aware ordered times')
    for category, key in [('assets','asset_id'),('signals','signal_id'),('controls','control_id'),('evidence','evidence_id'),('exposures','exposure_id')]:
        values = [item[key] for item in data[category]]
        if len(values) != len(set(values)):
            raise ValueError('Duplicate input ' + key)
    assets = {item['asset_id'] for item in data['assets']}
    evidence = {item['evidence_id'] for item in data['evidence']}
    for item in data['controls'] + data['exposures']:
        if not set(item['asset_ids']) <= assets:
            raise ValueError('Unknown input asset reference')
    for item in data['relationships']:
        if item['from'] not in assets or item['to'] not in assets:
            raise ValueError('Unknown relationship asset reference')
    for item in data['relationships'] + data['exposures']:
        if not set(item['evidence_ids']) <= evidence:
            raise ValueError('Unknown input evidence reference')
    for item in data['controls']:
        if item['evidence_id'] is not None and item['evidence_id'] not in evidence:
            raise ValueError('Unknown control evidence reference')
    if scope['authorization'] == 'authorized_testing' and not all([scope['approved_actions'],scope['test_window'],scope['stop_conditions'],scope['rollback_owner']]):
        raise ValueError('Authorized testing requires actions, test window, stop conditions and rollback owner')


def prepare(root, args):
    data = json.loads(Path(args.input).read_text(encoding="utf-8"))
    validate_document(data, root / "references/input.schema.json")
    validate_input(data)
    if args.provider == "deepseek-v4" and args.model not in ("deepseek-v4-pro", "deepseek-v4-flash"):
        raise ValueError("Select the requested V4 family: deepseek-v4-pro or deepseek-v4-flash")
    if "YOUR_" in args.model:
        raise ValueError("Replace the model placeholder with the actual endpoint model ID")
    base = args.base_url or ("https://api.deepseek.com" if args.provider == "deepseek-v4" else "https://integrate.api.nvidia.com/v1")
    parsed = urlparse(base)
    if parsed.username or parsed.password or parsed.query or parsed.fragment:
        raise ValueError("Endpoint must not contain embedded credentials, query or fragment")
    if parsed.scheme != "https" and not (parsed.scheme == "http" and parsed.hostname in ("localhost", "127.0.0.1", "::1")):
        raise ValueError("Use HTTPS, or HTTP only for a local inference endpoint")
    payload = {"model": args.model, "stream": False, "messages": [
        {"role": "system", "content": (root / "PORTABLE.md").read_text(encoding="utf-8") + "\nReturn only the report JSON object. No tools are available. Evidence must be drawn from the supplied input."},
        {"role": "user", "content": json.dumps(data, ensure_ascii=False)},
    ]}
    return data, base.rstrip("/") + "/chat/completions", payload


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--provider", choices=["nemotron", "deepseek-v4"], required=True)
    parser.add_argument("--model", required=True)
    parser.add_argument("--base-url")
    parser.add_argument("--input", required=True)
    parser.add_argument("--output", default="report.json")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    data, url, payload = prepare(root, args)
    if args.dry_run:
        print(json.dumps({"network_called": False, "provider": args.provider, "endpoint": url, "model": args.model, "scope_id": data["scope"]["scope_id"], "input_valid": True, "instruction_characters": len(payload["messages"][0]["content"])}, ensure_ascii=False, indent=2))
        return
    key_name = "NVIDIA_API_KEY" if args.provider == "nemotron" else "DEEPSEEK_API_KEY"
    key = os.environ.get(key_name)
    if not key:
        raise ValueError("Missing environment variable " + key_name)
    out = Path(args.output)
    raw_path = out.with_suffix(".raw.json")
    meta_path = out.with_suffix(".run.json")
    if any(p.exists() for p in (out, raw_path, meta_path)):
        raise ValueError("Output already exists; choose a new --output path")
    request = urllib.request.Request(url, data=json.dumps(payload).encode("utf-8"), headers={"Content-Type": "application/json", "Authorization": "Bearer " + key}, method="POST")
    try:
        with urllib.request.urlopen(request, timeout=180) as response:
            raw = json.load(response)
    except urllib.error.HTTPError as error:
        raise ValueError("API returned HTTP " + str(error.code) + "; no automatic retry") from None
    out.parent.mkdir(parents=True, exist_ok=True)
    raw_path.write_text(json.dumps(raw, ensure_ascii=False, indent=2), encoding="utf-8")
    report = json.loads(raw["choices"][0]["message"]["content"])
    validate_document(report, root / "references/output.schema.json")
    validate_report(report, data)
    out.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    meta_path.write_text(json.dumps({"provider": args.provider, "requested_model": args.model, "returned_model": raw.get("model"), "endpoint": url, "executed_at": datetime.datetime.now(datetime.timezone.utc).isoformat(), "scope_id": data["scope"]["scope_id"], "validation": "schema-and-reference-checks; semantic-review-still-required"}, ensure_ascii=False, indent=2), encoding="utf-8")
    print("Saved validated JSON; review evidence meaning and limitations before use: " + str(out))


if __name__ == "__main__":
    try:
        main()
    except (ValueError, KeyError, OSError, ImportError) as exc:
        print("Error: " + str(exc), file=sys.stderr)
        sys.exit(1)
