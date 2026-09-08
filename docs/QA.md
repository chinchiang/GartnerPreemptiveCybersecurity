# 交付驗證記錄

日期：2026-09-08。這份記錄區分自動檢查、來源查核與未執行的驗證，不將程式成功編譯等同模型成效。

## 已執行

| 類別 | 範圍與結果 |
|---|---|
| 原始研究 | 閱讀 G00830315 關鍵定義及完整技術列表；目視核對 p.3 雷達圖和附錄 1A，確認 SSDS／AMTD 正文與圖表歧異 |
| 平台來源 | 核對 ChatGPT／Claude／Grok／NVIDIA／DeepSeek 的官方技能或宿主文件；保留實際適用介面及限制 |
| 技能格式 | 五套 SKILL.md 均通過 skill-creator quick_validate；名稱、YAML、相對檔案引用完整 |
| 型別 | `npm run typecheck` 通過 |
| 本專案程式檢查 | `npm run lint` 通過；範圍為 app、lib、scripts、offline.tsx、vite.offline.config.ts |
| 資料與適配器 | 13 項 unittest 通過：schema、scope、資產與證據引用、重複 ID、不完整授權、零分母、未驗證狀態、V4 名稱、端點限制與離線準備 |
| API 乾跑 | DeepSeek v4 和 Nemotron 適配器均輸出 network_called=false、input_valid=true；沒有使用金鑰或發生付費呼叫 |
| 網站 | 離線建置成功；預覽頁 HTTP 200；單檔 HTML 與 JavaScript 語法檢查通過 |
| 離線下載 | 五份 ZIP 的 CRC 與內容完整；嵌入 HTML 的 base64 解碼後與 ZIP 原檔逐位元相同 |
| 內容清點 | 6 階段、10 類輸入、8 類輸出、11 技術、5 平台、11 項來源均納入 |

## 未宣稱完成的驗證

- 未於五個真實平台帳號進行端到端模型推論，未比較模型準確率、成本或速度。`references/acceptance.md` 的 10 個行為案例是待執行的驗收規格，不是已取得的模型成績。
- v1.0.0 未執行瀏覽器驗收，漏掉離線啟動錯誤。v1.0.1 已在 Chrome 以 file:// 實測並核對桌面與手機尺寸截圖；未宣稱其他瀏覽器均已實測。
- 未連接真實企業資產、掃描器、EDR、SIEM、DNS 或工單服務，未執行任何安全控制變更。合成報告是作者提供的教學範例。
- 來源中的市場預測與技術採用時間仍是研究主張，未當成實際市場結果。

## 保留的開發環境限制

Sites scaffold 所附、未被本網站使用的 UI 元件在全目錄 `lint:all` 下存在既有檢查問題。本專案沒有為使全目錄通過而改寫這些未使用元件；維護者擴充使用前需重新檢查。

2026-09-08 的 `npm audit --omit=dev` 對 scaffold 開發／伺服器依賴圖報告 6 項（5 high、1 low），涉及 vinext、react-server-dom-webpack、vite、image-size、undici、esbuild。沒有以強制升版改動 scaffold。交付的單檔 HTML 只在瀏覽器執行 React 用戶端，不執行這些伺服器或開發服務；這不是对整個原始碼依賴圖的「無漏洞」聲明。若日後改成對外伺服器部署，應先升級並重新驗證。此次未建立公開部署。

## 可重現

### v1.0.1 空白頁修正

直接開啟使用者的 v1.0.0 HTML 重現 `ReferenceError: process is not defined`，body 可見文字長度為 0。Vite library mode 保留了 React 套件對 `process.env.NODE_ENV` 的引用，而瀏覽器沒有 Node.js 的 process 全域物件。已在建置時固定替換為 production，不在頁面偽造 process。

新增 `scripts/test-offline-browser.mjs`，使用 Playwright 與已安裝 Chrome 執行：file:// 啟動、八個內容區、五個 ZIP 下載與檔案雜湊、有效／無效 JSON 輸入、390px 手機導覽與水平溢出檢查。測試通過，沒有頁面錯誤及 HTTP 請求。另檢視 1440px 桌面及 390px 手機截圖。靜態交付檢查也會拒絕殘留的 process.env.NODE_ENV。

瀏覽器測試需可匯入的 playwright 套件及 Chrome：`node scripts/test-offline-browser.mjs`。若使用外部 runtime，可將 PLAYWRIGHT_MODULE 設為其 index.mjs 的 file:// URL。

完整命令見根目錄 README.md。最終 ZIP 與單檔 HTML 的 SHA-256 記錄於發布資產 SHA256SUMS.txt。已知差異與未驗證項目保留在網站和完整文字手冊中。
