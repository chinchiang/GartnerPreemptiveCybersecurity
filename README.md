# Gartner Preemptive Cybersecurity｜先制式資安互動手冊

私人交付：互動網站、方法論與五平臺 skills。繁體中文；資料核對日期 2026-09-08。這是依 Gartner 原始研究所作的獨立分析與工程實作，並非官方產品或認證。

## 直接開啟

1. 從本儲存庫的 Releases 下載 `GartnerPreemptiveCybersecurity-offline.zip`（需登入具有存取權的 GitHub 帳號）。
2. 解壓到自己的電腦，雙擊 `index.html`，以 Chrome／Edge／Firefox 等現代瀏覽器開啟。
3. 不需安裝程式、啟動伺服器或連網。頁面中的五平臺 ZIP 與完整手冊下載也可離線使用。
4. 在「五平臺 Skills」選擇 ChatGPT、Claude、Grok、Nemotron 或 DeepSeek v4，檢視完整指令與安裝方式。下載後先以合成案例試跑。

網站內容與指令碼都包含在單一 HTML。只有主動點選來源或 GitHub 連結才前往外部網站；案例編輯器不傳送資料，也不呼叫 AI。無自動儲存，重新開啟會清除勾選與編輯狀態。

## 內容

- Gartner 概念、Deny／Disrupt／Deceive，以及六階段工程工作流程。
- 10 類輸入與 8 類輸出，資料來源、時效、缺口處理與驗收條件。
- 11 項技術的 inputs、outputs、實務適用性、原研究年限與限制。
- 五套分別適配的 SKILL.md、完整安裝及移除說明、可攜式指令。
- JSON schemas、合成案例與標明限制的範例報告。
- 本地 API runner（Nemotron／DeepSeek v4）；不附金鑰，不自動執行付費呼叫。
- 成效指標、90 天匯入建議、來源與歧異登入。

完整文字：[方法論與技能手冊](docs/methodology-and-skills.md)。

## 安裝路由

| 目標 | 實際載入方式 | 檔案 |
|---|---|---|
| ChatGPT | 桌面 Skills／支援的本地宿主；一般聊天使用 PORTABLE.md | [安裝](skills/chatgpt/preemptive-cybersecurity-chatgpt/INSTALL.md) |
| Claude | Customize > Skills ZIP；Claude Code 技能目錄 | [安裝](skills/claude/preemptive-cybersecurity-claude/INSTALL.md) |
| Grok | Grok Build `.grok/skills`／Bot 工作流程；一般聊天使用指令 | [安裝](skills/grok/preemptive-cybersecurity-grok/INSTALL.md) |
| Nemotron | NeMo `skills.paths` 或顯式 API 指令 | [安裝](skills/nemotron/preemptive-cybersecurity-nemotron/INSTALL.md) |
| DeepSeek v4 | Claude Code 宿主 + V4；或 V4 API | [安裝](skills/deepseek-v4/preemptive-cybersecurity-deepseek-v4/INSTALL.md) |

模型不等於技能宿主。安裝與帳號能力需按官方檔案核對；並未宣稱五平臺皆完成端到端模型推論測試。

## 維護與重建

Node.js 24+、Python 3.10+。使用 npm lockfile。
以下重建步驟在完整 GitHub 原始碼目錄執行；離線閱讀套件不包含網站開發工具。

```sh
npm ci
node scripts/generate-content.mjs
python scripts/package-skills.py
npm run typecheck
npm run lint
npm run build
node scripts/verify-delivery.mjs
python -m pip install 'jsonschema>=4.23,<5'
python -m unittest discover -s tests -v
python scripts/package-delivery.py
```

`dist/index.html` 為單檔成品；`releases/` 為可交付 ZIP。開發預覽使用 `npm run dev`。`build:server` 保留原始 Sites scaffold 的伺服器建置；此次交付按使用者選擇採私人離線套件，沒有啟用公開網站。

內容來源在 `lib/content.ts`、平臺說明在 `lib/platforms.ts`，技能共用流程在 `skills/workflow.md`。修改後需重跑產生器及打包；不要直接修改生成的 `lib/downloads.json`。

## 驗證與限制

詳見 [QA.md](docs/QA.md)。自動檢查涵蓋資料 schema、引用、零分母、未驗證卻報完成、乾跑不連網、五份 ZIP、離線 HTML 嵌入與編譯。平臺合成行為案例見各技能 `references/acceptance.md`；未執行的模型測試不列為透過。v1.0.1 已以 Chrome 實测離線啟動、導覽、下載及 JSON 檢查，並檢視桌面與手機版截圖。

## 研究來源與權利

主要研究：Gartner, *Emerging Tech Impact Radar: Preemptive Cybersecurity*, 2025-10-07, G00830315（使用者提供原始 PDF）。[官方摘要](https://www.gartner.com/en/documents/7034298)。原始付費 PDF、原圖及其他同步來源未收入此儲存庫。

SSDS 與 AMTD 的正文／圖表存在採用距離差異；手冊保留歧異，未擅自修正。工程流程、資料模型、技能與情境由本專案撰寫。Gartner 與各平臺商標屬原權利人；無認證、贊助或背書關係。
