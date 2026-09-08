import hashlib
from pathlib import Path
import zipfile
root = Path(__file__).resolve().parents[1]
out = root / 'releases'
out.mkdir(exist_ok=True)
target = out / 'GartnerPreemptiveCybersecurity-offline.zip'
files = {'index.html': root/'dist/index.html', 'README.md':root/'README.md'}
for folder in ['docs','public/downloads','schemas','examples']:
    for file in (root/folder).rglob('*'):
        if file.is_file():
            name=file.relative_to(root).as_posix().replace('public/downloads/','downloads/')
            files[name]=file
for platform in ['chatgpt','claude','grok','nemotron','deepseek-v4']:
    for file in (root/'skills'/platform).rglob('*'):
        if file.is_file() and '__pycache__' not in file.parts:
            files[file.relative_to(root).as_posix()]=file
with zipfile.ZipFile(target,'w',zipfile.ZIP_DEFLATED) as z:
    for name,file in sorted(files.items()):
        info=zipfile.ZipInfo(name,(2026,9,8,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED
        z.writestr(info,file.read_bytes())
with zipfile.ZipFile(target) as z:
    assert z.testzip() is None
    assert 'index.html' in z.namelist()
    assert len([n for n in z.namelist() if n.endswith('/SKILL.md')])==5
hashes=[]
for file in [target,root/'dist/index.html',*sorted((root/'public/downloads').glob('*.zip'))]:
    hashes.append(hashlib.sha256(file.read_bytes()).hexdigest()+'  '+file.name)
(out/'SHA256SUMS.txt').write_text('\n'.join(hashes)+'\n',encoding='utf-8')
print(f'Packaged {len(files)} files; archive verified: {target.name} ({target.stat().st_size:,} bytes)')
