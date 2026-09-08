import fs from 'node:fs';
const js=fs.readFileSync('dist/app.js','utf8').replace(/<\/script/gi,'<\\/script');
const css=fs.readdirSync('dist').filter(f=>f.endsWith('.css')).map(f=>fs.readFileSync('dist/'+f,'utf8')).join('\n');
if(!css)throw new Error('Missing stylesheet');
fs.writeFileSync('dist/index.html',`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="referrer" content="no-referrer"><title>先制式資安｜方法論與 Skills 手冊</title><style>${css}</style></head><body><div id="root"></div><noscript>請啟用 JavaScript，或閱讀套件內 docs/methodology-and-skills.md。</noscript><script>${js}</script></body></html>`);
console.log('Self-contained dist/index.html; no CDN, remote scripts, fonts or API needed.');
