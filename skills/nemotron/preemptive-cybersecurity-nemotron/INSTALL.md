# Nemotron 安裝與使用

核對日 2026-09-08；來源 N1。NeMo 宿主技能／API 指令。

1. 解壓 Nemotron ZIP。在已有的 NeMo Platform 專案，將完整技能資料夾放在 agent.yaml 同層的 skills/ 下。

2. 在 agent.yaml 的 skills.paths 加入 ./skills/preemptive-cybersecurity-nemotron，保留既有 harness、模型與環境設定；先確認此宿主支援該 contract。

3. 選定實際可用的 Nemotron model ID 與端點，依官方模型頁設定。不要把 Nemotron 當成唯一固定模型名稱。

4. 不使用 NeMo 時，執行套件 scripts/run_api.py 的 --dry-run 先檢查輸入；確認後再依安裝手冊用自有 OpenAI 相容端點執行。runner 會把 PORTABLE.md 加入 system 訊息，不假設服務會讀本地資料夾。

## 第一次執行

使用 preemptive-cybersecurity-nemotron 分析提供的 JSON。逐筆整理 evidence，再建立 findings；只回傳符合 output.schema.json 的 JSON，未知欄位使用 null。

附件：examples/input.json。驗收：references/acceptance.md。

## 成功判準

確認所需 SKILL.md／工作流程已載入、案例 scope_id 正確、缺口存在、validation.status=not_run，且沒有憑空產生驗證證據。

## 排錯與移除

若找不到技能，檢查宿主版本、資料夾層次、name 和組織許可權；不要將模型名稱當成宿主功能。原生 UI 可停用或刪除該技能；本地安裝移除對應的單一技能資料夾。移除 API 適配時，從宿主設定移除對應路徑及本次環境變數，不刪除其他技能。

## 限制

skills.paths 是 NeMo 宿主能力，並非任一 Nemotron 推論端點都能原生安裝 skills。未提供帳號金鑰的套件驗證不包含實際模型推論。

對自管環境明確分離模型、檢索與工具執行。若上下文有限，以服務／資產分批並保留穩定 ID，再整併重複 finding。宿主執行 schema 驗證；需要修正時回傳具體錯誤，不要求揭露內部思考過程。

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
python scripts/run_api.py --provider nemotron --model YOUR_NEMOTRON_MODEL_ID --input examples/input.json --dry-run
```

正式呼叫會將指令與輸入送到你指定的 API。只在資料政策允許時執行。用作業系統或秘密管理器設定 NVIDIA_API_KEY；不把金鑰寫進命令歷史或檔案。

```sh
python scripts/run_api.py --provider nemotron --model YOUR_NEMOTRON_MODEL_ID --base-url https://integrate.api.nvidia.com/v1 --input examples/input.json --output report.json
```

YOUR_NEMOTRON_MODEL_ID 必須換成你實際端點支援的模型；此處不假設某一個固定模型。

runner 不附加任何掃描或變更工具；回應無法解析或驗證失敗時退出並保留原始回應供本地檢查，不自動重送或計費重試。

## NeMo Platform 增量設定

以下合併到既有 agent.yaml，不是完整部署設定；保留原有模型、harness、許可權與環境。

```yaml
skills:
  paths:
    - ./skills/preemptive-cybersecurity-nemotron
```

若有其他 skill paths，保留它們。啟動命令依安裝的 NeMo Platform 版本與現有專案；先確認宿主已解析 skill，再套用合成驗收案例。
