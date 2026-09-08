import copy
import importlib.util
import json
from pathlib import Path
from types import SimpleNamespace
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location('runner', ROOT / 'skills/run_api.py')
runner = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(runner)

class ContractTests(unittest.TestCase):
    def setUp(self):
        self.data = json.loads((ROOT / 'examples/input.json').read_text(encoding='utf-8'))
        self.report = json.loads((ROOT / 'examples/report.json').read_text(encoding='utf-8'))

    def test_synthetic_examples_match_schemas(self):
        runner.validate_document(self.data, ROOT / 'schemas/input.schema.json')
        runner.validate_input(self.data)
        runner.validate_document(self.report, ROOT / 'schemas/output.schema.json')
        runner.validate_report(self.report, self.data)

    def test_unknown_evidence_is_rejected(self):
        self.report['findings'][0]['evidence_ids'].append('INVENTED')
        with self.assertRaisesRegex(ValueError, 'Unknown evidence'):
            runner.validate_report(self.report, self.data)

    def test_invented_evidence_record_is_rejected(self):
        item = copy.deepcopy(self.report['evidence'][0])
        item['evidence_id'] = 'NEW'
        self.report['evidence'].append(item)
        with self.assertRaisesRegex(ValueError, 'introduced evidence'):
            runner.validate_report(self.report, self.data)

    def test_unknown_asset_is_rejected(self):
        self.report['findings'][0]['asset_ids'] = ['NO-ASSET']
        with self.assertRaisesRegex(ValueError, 'Unknown asset'):
            runner.validate_report(self.report, self.data)

    def test_missing_validation_cannot_be_called_validated(self):
        self.report['findings'][0]['status'] = 'validated'
        with self.assertRaisesRegex(ValueError, 'requires passed'):
            runner.validate_report(self.report, self.data)

    def test_zero_denominator_is_not_success(self):
        self.report['metrics'][0].update(value=100, denominator=0)
        with self.assertRaisesRegex(ValueError, 'zero denominator'):
            runner.validate_report(self.report, self.data)

    def test_different_scope_is_rejected(self):
        self.report['scope_id'] = 'OTHER'
        with self.assertRaisesRegex(ValueError, 'scope_id'):
            runner.validate_report(self.report, self.data)

    def test_prepare_is_offline_and_includes_instructions(self):
        args = SimpleNamespace(input=str(ROOT / 'examples/input.json'), provider='deepseek-v4', model='deepseek-v4-pro', base_url=None)
        with patch('urllib.request.urlopen', side_effect=AssertionError('Network forbidden')):
            data, url, body = runner.prepare(ROOT / 'skills/deepseek-v4/preemptive-cybersecurity-deepseek-v4', args)
        self.assertEqual(url, 'https://api.deepseek.com/chat/completions')
        self.assertEqual(data['scope']['scope_id'], 'SYNTH-ODM-01')
        self.assertIn('JSON Schema', body['messages'][0]['content'])
        self.assertNotIn('tools', body)

    def test_no_substitution_of_requested_v4(self):
        args = SimpleNamespace(input=str(ROOT / 'examples/input.json'), provider='deepseek-v4', model='deepseek-chat', base_url=None)
        with self.assertRaisesRegex(ValueError, 'V4 family'):
            runner.prepare(ROOT / 'skills/deepseek-v4/preemptive-cybersecurity-deepseek-v4', args)

    def test_nonlocal_http_and_url_credentials_rejected(self):
        for url in ['http://remote.example/v1', 'https://user:secret@example.com/v1']:
            args = SimpleNamespace(input=str(ROOT / 'examples/input.json'), provider='deepseek-v4', model='deepseek-v4-pro', base_url=url)
            with self.assertRaises(ValueError):
                runner.prepare(ROOT / 'skills/deepseek-v4/preemptive-cybersecurity-deepseek-v4', args)

    def test_duplicate_input_assets_rejected(self):
        self.data['assets'].append(copy.deepcopy(self.data['assets'][0]))
        with self.assertRaisesRegex(ValueError, 'Duplicate input'):
            runner.validate_input(self.data)

    def test_incomplete_testing_authorization_rejected(self):
        self.data['scope']['authorization'] = 'authorized_testing'
        with self.assertRaisesRegex(ValueError, 'requires actions'):
            runner.validate_input(self.data)

    def test_unknown_exposure_evidence_rejected(self):
        self.data['exposures'][0]['evidence_ids'] = ['NOT-FOUND']
        with self.assertRaisesRegex(ValueError, 'Unknown input evidence'):
            runner.validate_input(self.data)

if __name__ == '__main__':
    unittest.main()
