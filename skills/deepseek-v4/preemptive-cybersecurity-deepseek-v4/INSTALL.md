# DeepSeek v4 安裝與使用

核對日 2026-09-08；來源 D1、D2。Claude Code 宿主／V4 API。

1. 解壓 DeepSeek v4 ZIP。若使用 Claude Code，完整技能放到專案 .claude/skills/，由宿主載入。

2. 依官方整合檔案將 ANTHROPIC_BASE_URL 指向 https://api.deepseek.com/anthropic；透過環境提供自己的 API 金鑰，選用 deepseek-v4-pro[1m] 等官方宿主設定。完整可複製命令在下載套件 INSTALL.md。

3. 重開該工作階段並核對實際模型，再以 /preemptive-cybersecurity-deepseek-v4 呼叫。這是 Claude Code 作為宿主、DeepSeek 作為模型，不是 Claude 模型。

4. 直接 API：以 scripts/run_api.py，指定 --provider deepseek-v4、--model deepseek-v4-pro 或 deepseek-v4-flash；預設端點為 https://api.deepseek.com。先 --dry-run，再以自有金鑰執行。

## 第一次執行

請依 preemptive-cybersecurity-deepseek-v4，將合成輸入轉成 JSON 證據報告。先核對資料視窗與缺口，不填造版本或百分比；再附上三項可驗證的下一步。

附件：examples/input.json。驗收：references/acceptance.md。

## 成功判準

確認所需 SKILL.md／工作流程已載入、案例 scope_id 正確、缺口存在、validation.status=not_run，且沒有憑空產生驗證證據。

## 排錯與移除

若找不到技能，檢查宿主版本、資料夾層次、name 和組織許可權；不要將模型名稱當成宿主功能。原生 UI 可停用或刪除該技能；本地安裝移除對應的單一技能資料夾。移除 API 適配時，從宿主設定移除對應路徑及本次環境變數，不刪除其他技能。

## 限制

官方 API 別名可能指向更新版本，記錄回傳模型與執行日期；本次未使用付費 API 做端到端推論測試。一般聊天指令載入不等於原生 skill 管理器。

固定本次 run 的模型名稱、端點和視窗。區分自然語言摘要與 JSON 結構驗證；若採分批處理，以 asset_id、signal_id 和 evidence_id 合併，保留衝突而非用最新一句話覆寫。未知值用 null，結果不合法時明確報錯。

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

## API：可重現執行

需 Python 3.10+，在此技能資料夾內執行。dry-run 完全離線，不需要金鑰。

```sh
python -m pip install -r requirements.txt
python scripts/run_api.py --provider deepseek-v4 --model deepseek-v4-pro --input examples/input.json --dry-run
```

正式呼叫會將指令與輸入送到你指定的 API。只在資料政策允許時執行。用作業系統或秘密管理器設定 DEEPSEEK_API_KEY；不把金鑰寫進命令歷史或檔案。

```sh
python scripts/run_api.py --provider deepseek-v4 --model deepseek-v4-pro --input examples/input.json --output report.json
```

V4 別名會依供應商更新；指令碼另存 .run.json 紀錄模型及時間。

runner 不附加任何掃描或變更工具；回應無法解析或驗證失敗時退出並保留原始回應供本地檢查，不自動重送或計費重試。

## Claude Code 的 V4 宿主設定

在獨立工作階段依官方 D2 檔案設定。以下為 PowerShell；API 金鑰先以安全方式放入 DEEPSEEK_API_KEY。

```powershell
$env:ANTHROPIC_BASE_URL="https://api.deepseek.com/anthropic"
$env:ANTHROPIC_AUTH_TOKEN=$env:DEEPSEEK_API_KEY
$env:ANTHROPIC_MODEL="deepseek-v4-pro[1m]"
$env:ANTHROPIC_DEFAULT_OPUS_MODEL="deepseek-v4-pro[1m]"
$env:ANTHROPIC_DEFAULT_SONNET_MODEL="deepseek-v4-pro[1m]"
$env:ANTHROPIC_DEFAULT_HAIKU_MODEL="deepseek-v4-flash"
claude
```

Linux／macOS 將每個 `$env:NAME=value` 改成 `export NAME=value`。不要覆寫其他工作階段的全域設定；結束該 shell 即清除此程式環境。
