# ChatGPT 安裝與使用

核對日 2026-09-08；來源 O1。原生技能／可攜指令。

1. 下載 ChatGPT ZIP。若使用具 Skills 功能的 ChatGPT 桌面環境，開啟 Skills；可交由 @skill-creator 依所附 SKILL.md 與 references 建立相同技能，保留檔案關係。

2. 在 Codex／支援本地技能的宿主，將完整 preemptive-cybersecurity-chatgpt 資料夾複製到專案 .agents/skills/；不要只複製 SKILL.md。

3. ChatGPT 使用 @ 選取技能；Codex 使用 $preemptive-cybersecurity-chatgpt。若技能未出現，確認宿主、資料夾層次與 name，再重開工作階段。

4. 一般聊天或尚無原生入口的帳號：解壓後上傳 PORTABLE.md 與合成或已去識別資料，明確要求依其執行。這是當次指令載入，不等於原生安裝或永久記憶。

## 第一次執行

請使用 preemptive-cybersecurity-chatgpt，依附件合成案例做先制式資安評估。先列資料缺口，再產出證據、假說、三種控制作用及重測計畫；只做檔案分析。

附件：examples/input.json。驗收：references/acceptance.md。

## 成功判準

確認所需 SKILL.md／工作流程已載入、案例 scope_id 正確、缺口存在、validation.status=not_run，且沒有憑空產生驗證證據。

## 排錯與移除

若找不到技能，檢查宿主版本、資料夾層次、name 和組織許可權；不要將模型名稱當成宿主功能。原生 UI 可停用或刪除該技能；本地安裝移除對應的單一技能資料夾。移除 API 適配時，從宿主設定移除對應路徑及本次環境變數，不刪除其他技能。

## 限制

Web／desktop／Work／Codex 及外掛分發具有不同能力；不保證所有 ChatGPT 帳號能直接上傳任意 ZIP。

先列可存取檔案與實際可用工具；網頁檢索引用原始來源，資料分析使用穩定識別碼。沒有聯結器時接受附件快照，標明視窗；沒有執行工具時交付可審查文字，不聲稱已掃描。

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
