# Grok 安裝與使用

核對日 2026-09-08；來源 X1、X2。Grok Build／Bot／可攜指令。

1. Grok Build：解壓 Grok ZIP，將完整資料夾放到專案 .grok/skills/ 或個人 ~/.grok/skills/。

2. 在支援使用者技能的 Grok Build 以 /preemptive-cybersecurity-grok 呼叫；若未發現，核對工作目錄與 name。

3. Grok Bot：先提供 PORTABLE.md 和合成案例，完成一次分析後要求「把這個流程存為 preemptive-cybersecurity-grok skill，保留資料、輸出和授許可權制」，再核對儲存內容。

4. 一般 Grok 聊天介面：貼入或附上 PORTABLE.md，明確要求執行；是否可附檔取決於帳號與介面，不假設聊天介面有 Build 的本地目錄。

## 第一次執行

請依 preemptive-cybersecurity-grok，分析此觀測視窗的前兆訊號。X 貼文僅作線索，回查官方來源並對應資產；沒有佐證的專案保持未證實。

附件：examples/input.json。驗收：references/acceptance.md。

## 成功判準

確認所需 SKILL.md／工作流程已載入、案例 scope_id 正確、缺口存在、validation.status=not_run，且沒有憑空產生驗證證據。

## 排錯與移除

若找不到技能，檢查宿主版本、資料夾層次、name 和組織許可權；不要將模型名稱當成宿主功能。原生 UI 可停用或刪除該技能；本地安裝移除對應的單一技能資料夾。移除 API 適配時，從宿主設定移除對應路徑及本次環境變數，不刪除其他技能。

## 限制

Bot 的 skill 不等於 routine；本套件沒有安裝排程，也不提供社群內容監控的自動授權。

X／社群內容必須分離事件時間、發布時間與轉傳時間；轉貼不算多個獨立來源。優先回查原廠／CERT 證據，不使用熱度代表可信度。即使能搜尋，也不能把公開 IP 或公司提及當成我方資產。

## 官方來源

- [G1] Gartner：Emerging Tech Impact Radar: Preemptive Cybersecurity（2025-10-07）
  https://www.gartner.com/en/documents/7034298
  使用者提供原始 PDF，ID G00830315；35 頁正文及附錄 1A（PDF 第 36 頁）。此連結為檔案識別入口，研究以本地原檔為準；未重製付費原文或圖表。
- [G2] Gartner：Preemptive Cybersecurity Solutions（2026-01-15）
  https://www.gartner.com/en/articles/preemptive-cybersecurity-solutions
  官方公開說明，佐證 Deny／Disrupt／Deceive 三種作用與 AMTD。
- [G3] Gartner：Preemptive capabilities are the future of cybersecurity（2025-09-18）
  https://www.gartner.com/en/newsroom/press-releases/2025-09-18-gartner-says-that-in-the-age-of-genai-preemptive-capabilities-not-detection-and-response-are-the-future-of-cybersecurity
  2030 年支出佔比為 Gartner 預測，並非已發生的市場實績。
- [O1] OpenAI：Build skills（2026-09-08）
  https://learn.chatgpt.com/docs/build-skills
  ChatGPT／Codex 的技能格式、觸發、載入與分發。平臺能力不等於每個帳號已開通。
- [A1] Anthropic：Use skills in Claude（2026-09-08）
  https://support.claude.com/en/articles/12512180-use-skills-in-claude
  Claude 網頁版 ZIP 上傳與啟用方式。
- [A2] Anthropic：Extend Claude with skills（2026-09-08）
  https://code.claude.com/docs/en/skills
  Claude Code 專案與個人技能目錄。
- [X1] xAI：Skills, Plugins & Marketplaces（2026-08-11）
  https://docs.x.ai/build/features/skills-plugins-marketplaces
  Grok Build 支援 SKILL.md 與 .grok/skills；一般聊天介面不可直接類推。
- [X2] xAI：Skills and routines（2026-09-08）
  https://docs.x.ai/grok-bot/skills-routines-and-automations
  Grok Bot 可將工作流程儲存成 skill；routine 是另外的排程功能。
- [N1] NVIDIA：About Agents（2026-09-08）
  https://docs.nvidia.com/nemo-platform/documentation/agents
  NeMo Platform 的 agent.yaml、模型繫結與 skills.paths；Nemotron 本身是模型家族。
- [D1] DeepSeek：Your First API Call（2026-09-08）
  https://api-docs.deepseek.com/
  已確認 deepseek-v4-pro／deepseek-v4-flash 及 OpenAI 相容 API。
- [D2] DeepSeek：Integrate with Claude Code（2026-09-08）
  https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/
  官方 Claude Code 整合路徑；技能由宿主載入，模型端處理指令。
