import base64
import json
from pathlib import Path
import zipfile
root = Path(__file__).resolve().parents[1]
out = root / 'public/downloads'
out.mkdir(parents=True, exist_ok=True)
assets = {}
for platform in ('chatgpt', 'claude', 'grok', 'nemotron', 'deepseek-v4'):
    parent = root / 'skills' / platform
    skill = next(parent.iterdir())
    filename = f'{skill.name}.zip'
    with zipfile.ZipFile(out / filename, 'w', zipfile.ZIP_DEFLATED) as archive:
        for file in sorted(skill.rglob('*')):
            if file.is_file() and '__pycache__' not in file.parts:
                entry = zipfile.ZipInfo(file.relative_to(parent).as_posix(), (2026, 9, 8, 0, 0, 0))
                entry.compress_type = zipfile.ZIP_DEFLATED
                archive.writestr(entry, file.read_bytes())
    with zipfile.ZipFile(out / filename) as archive:
        assert archive.testzip() is None
        assert f'{skill.name}/SKILL.md' in archive.namelist()
    assets[platform] = {'filename': filename, 'base64': base64.b64encode((out / filename).read_bytes()).decode(), 'skill': (skill / 'SKILL.md').read_text(encoding='utf-8'), 'install': (skill / 'INSTALL.md').read_text(encoding='utf-8'), 'portable': (skill / 'PORTABLE.md').read_text(encoding='utf-8')}
assets['manual'] = {'filename': 'methodology-and-skills.md', 'text': (root / 'docs/methodology-and-skills.md').read_text(encoding='utf-8')}
(root / 'lib/downloads.json').write_text(json.dumps(assets, ensure_ascii=False), encoding='utf-8')
print('Verified five skill ZIPs and embedded all offline downloads.')
