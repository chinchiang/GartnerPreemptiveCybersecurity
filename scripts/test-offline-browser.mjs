import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser=await chromium.launch({channel:'chrome',headless:true});
fs.mkdirSync('work/browser',{recursive:true});
const errors=[],network=[];
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 page.setDefaultTimeout(5000);
 page.on('pageerror',e=>errors.push(e.message));
 page.on('request',r=>{if(/^https?:/.test(r.url()))network.push(r.url())});
 await page.goto(pathToFileURL(path.resolve('dist/index.html')).href);
 await page.locator('h1').waitFor({state:'visible'});
 assert.ok((await page.locator('h1').innerText()).includes('先制式資安'));
 const nav=['方法論總覽','Inputs → Outputs','11 項技術解析','五平台 Skills','合成案例工作台','指標與導入','完整研究手冊','來源與研究限制'];
 for(let i=0;i<nav.length;i++){await page.locator('nav button').nth(i).click();assert.ok((await page.locator('main').innerText()).length>200)}
 await page.locator('nav button').nth(3).click();
 const digest=b=>createHash('sha256').update(b).digest('hex');
 for(const name of ['ChatGPT','Claude','Grok','Nemotron','DeepSeek v4']){
  await page.locator('.platform-tabs button').filter({hasText:name}).click();
  const promise=page.waitForEvent('download');
  await page.getByRole('button',{name:`下載 ${name} Skill`,exact:true}).click();
  const download=await promise;const file=await download.path();
  assert.equal(digest(fs.readFileSync(file)),digest(fs.readFileSync('public/downloads/'+download.suggestedFilename())));
 }
 await page.locator('nav button').nth(4).click();
 await page.getByRole('button',{name:'檢查基本結構',exact:true}).click();
 await page.locator('.validation').getByText(/基本結構與引用檢查透過/).waitFor();
 await page.locator('#input-json').fill('{');
 await page.getByRole('button',{name:'檢查基本結構',exact:true}).click();
 await page.locator('.validation').getByText(/無法解析/).waitFor();
 await page.locator('nav button').nth(0).click();
 await page.screenshot({path:'work/browser/desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});
 await page.getByRole('button',{name:'開啟選單',exact:true}).click();
 await page.locator('nav button').nth(3).click();
 assert.ok(await page.getByRole('button',{name:'下載 DeepSeek v4 Skill',exact:true}).isVisible());
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Mobile horizontal overflow');
 await page.screenshot({path:'work/browser/mobile.png',fullPage:true});
 assert.deepEqual(errors,[]);assert.deepEqual(network,[]);
 console.log('PASS: file:// startup, eight sections, five byte-verified ZIP downloads, valid/invalid JSON, mobile navigation, zero page errors, zero HTTP requests.');
}finally{await browser.close()}
