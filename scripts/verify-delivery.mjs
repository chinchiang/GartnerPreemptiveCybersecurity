import fs from 'node:fs';
import assert from 'node:assert/strict';
import path from 'node:path';
import vm from 'node:vm';
import {platforms} from '../lib/platforms.ts';
import {technologies,stages,inputCatalog,outputCatalog,sources} from '../lib/content.ts';
assert.equal(platforms.length,5);assert.equal(technologies.length,11);assert.equal(stages.length,6);assert.equal(inputCatalog.length,10);assert.equal(outputCatalog.length,8);
for(const p of platforms){
 const root=`skills/${p.id}/${p.skill}`;
 for(const name of ['SKILL.md','INSTALL.md','PORTABLE.md','references/workflow.md','references/input.schema.json','references/output.schema.json','references/acceptance.md','examples/input.json','examples/report.json'])assert.ok(fs.existsSync(`${root}/${name}`),`${root}/${name}`);
 const skill=fs.readFileSync(`${root}/SKILL.md`,'utf8');assert.ok(skill.startsWith('---\nname: '+p.skill+'\ndescription: '));
 for(const m of skill.matchAll(/\]\(([^)]+)\)/g))if(!m[1].includes('://'))assert.ok(fs.existsSync(path.resolve(root,m[1])),`Missing reference ${m[1]}`);
}
const html=fs.readFileSync('dist/index.html','utf8');
assert.ok(html.startsWith('<!doctype html>'));assert.ok(html.includes('lang="zh-Hant"'));
const markup=html.replace(/<script>[\s\S]*<\/script>/,'');
assert.ok(!/<script[^>]*\bsrc=/i.test(markup));assert.ok(!/<link[^>]*\bhref=/i.test(markup));assert.ok(!/<iframe/i.test(markup));
const script=html.match(/<script>([\s\S]*)<\/script>/)?.[1];assert.ok(script);new vm.Script(script);
assert.ok(!/@import\s/.test(html.split('</style>')[0]),'CSS must be fully inlined');
const data=JSON.parse(fs.readFileSync('lib/downloads.json','utf8'));
for(const p of platforms){const zipped=fs.readFileSync('public/downloads/'+data[p.id].filename);assert.deepEqual(Buffer.from(data[p.id].base64,'base64'),zipped);assert.ok(html.includes(data[p.id].base64),'ZIP not embedded in offline HTML')}
for(const s of sources)assert.ok(s.url.startsWith('https://'));
assert.ok(!fs.existsSync('public/sources'),'Reference PDFs must not be distributed');
console.log('PASS: full content inventory, skill references, embedded ZIP byte equality, standalone HTML and JS syntax.');
