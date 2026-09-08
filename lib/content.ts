export const reviewed = '2026-09-08';
export const sources = [
 {id:'G1',title:'Gartner：Emerging Tech Impact Radar: Preemptive Cybersecurity',date:'2025-10-07',url:'https://www.gartner.com/en/documents/7034298',note:'使用者提供原始 PDF，ID G00830315；35 頁正文及附錄 1A（PDF 第 36 頁）。此連結為檔案識別入口，研究以本地原檔為準；未重製付費原文或圖表。'},
 {id:'G2',title:'Gartner：Preemptive Cybersecurity Solutions',date:'2026-01-15',url:'https://www.gartner.com/en/articles/preemptive-cybersecurity-solutions',note:'官方公開說明，佐證 Deny／Disrupt／Deceive 三種作用與 AMTD。'},
 {id:'G3',title:'Gartner：Preemptive capabilities are the future of cybersecurity',date:'2025-09-18',url:'https://www.gartner.com/en/newsroom/press-releases/2025-09-18-gartner-says-that-in-the-age-of-genai-preemptive-capabilities-not-detection-and-response-are-the-future-of-cybersecurity',note:'2030 年支出佔比為 Gartner 預測，並非已發生的市場實績。'},
 {id:'O1',title:'OpenAI：Build skills',date:reviewed,url:'https://learn.chatgpt.com/docs/build-skills',note:'ChatGPT／Codex 的技能格式、觸發、載入與分發。平臺能力不等於每個帳號已開通。'},
 {id:'A1',title:'Anthropic：Use skills in Claude',date:reviewed,url:'https://support.claude.com/en/articles/12512180-use-skills-in-claude',note:'Claude 網頁版 ZIP 上傳與啟用方式。'},
 {id:'A2',title:'Anthropic：Extend Claude with skills',date:reviewed,url:'https://code.claude.com/docs/en/skills',note:'Claude Code 專案與個人技能目錄。'},
 {id:'X1',title:'xAI：Skills, Plugins & Marketplaces',date:'2026-08-11',url:'https://docs.x.ai/build/features/skills-plugins-marketplaces',note:'Grok Build 支援 SKILL.md 與 .grok/skills；一般聊天介面不可直接類推。'},
 {id:'X2',title:'xAI：Skills and routines',date:reviewed,url:'https://docs.x.ai/grok-bot/skills-routines-and-automations',note:'Grok Bot 可將工作流程儲存成 skill；routine 是另外的排程功能。'},
 {id:'N1',title:'NVIDIA：About Agents',date:reviewed,url:'https://docs.nvidia.com/nemo-platform/documentation/agents',note:'NeMo Platform 的 agent.yaml、模型繫結與 skills.paths；Nemotron 本身是模型家族。'},
 {id:'D1',title:'DeepSeek：Your First API Call',date:reviewed,url:'https://api-docs.deepseek.com/',note:'已確認 deepseek-v4-pro／deepseek-v4-flash 及 OpenAI 相容 API。'},
 {id:'D2',title:'DeepSeek：Integrate with Claude Code',date:reviewed,url:'https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/',note:'官方 Claude Code 整合路徑；技能由宿主載入，模型端處理指令。'},
];

export const principles = [
 {name:'Deny｜拒止',desc:'讓攻擊者無法取得可用入口、許可權或資源。',example:'關閉非必要外部入口、移除過度授權、驗證身分後才揭露服務。',proof:'從未授權來源重測，目標無法被發現或存取；合法業務仍可使用。'},
 {name:'Disrupt｜幹擾',desc:'使攻擊路徑、既有偵察結果或破壞行為失效。',example:'在支援環境輪替執行資源，或由儲存控制阻斷異常大量加密。',proof:'相同情境重測，攻擊無法到達目標；保留阻斷與業務可用性證據。'},
 {name:'Deceive｜欺敵',desc:'用受控誘餌吸引、誤導對手，提早獲得行為訊號。',example:'在隔離區放置無真實許可權的誘餌憑證或服務，監控互動。',proof:'測試可觸發誘餌事件並完成分流；誘餌不能成為真實生產跳板。'},
];

export const stages = [
 {id:'scope',title:'界定業務與授權',question:'到底要保護什麼，什麼不能中斷？',inputs:['業務服務、關鍵資產、責任人','風險容忍、RTO/RPO、維護視窗','允許範圍與測試限制'],work:'先將「公司整體風險」縮成可驗證的服務或場域，例如供應商遠端維護入口到 MES 的路徑。記錄業務損害與可承受中斷，而非只有 IP 清單。',outputs:['scope.json','關鍵服務與責任矩陣','禁止操作與缺口清單'],gate:'缺少授權時可做檔案分析與方案設計，不對系統執行驗證。'},
 {id:'observe',title:'建立可追溯現況',question:'這項威脅和我們的環境有什麼關係？',inputs:['資產、版本、身分與網路關係','組態、弱點、遙測與控制覆蓋','威脅訊號、原始來源與觀測時間'],work:'以 asset_id 連線不同資料源，保留來源、收集時間、信任程度與缺漏；把新聞提到的產品和已確認部署的產品分開。未知版本不能視為不受影響。',outputs:['資產與曝險關聯表','證據登入簿','資料新鮮度與覆蓋率'],gate:'只有外部情報而沒有資產對應時，輸出候選情境及待查問題。'},
 {id:'hypothesize',title:'形成攻擊假說',question:'對手需要哪些前提，才能造成損害？',inputs:['可到達入口、身分授權與信任鏈','威脅行為與技術前提','現有控制與業務後果'],work:'寫出入口 → 前提 → 路徑 → 關鍵資產 → 可能後果；為每一條邊附證據及反證。PTI 提供可被推翻的情境，不能把語言模型的流暢推測當成攻擊預測機率。',outputs:['有信心標記的攻擊假說','路徑與阻斷點','需驗證的關鍵前提'],gate:'沒有實證時標記「假說」；缺乏校準資料時不輸出百分比機率。'},
 {id:'validate',title:'驗證曝險與控制',question:'這條路徑實際成立嗎？',inputs:['已授權的測試環境與範圍','測試計畫、停止條件與回復方式','控制組態快照及情境前提'],work:'先做唯讀控制評估，再依授權使用模擬、隔離靶場或受控驗證。分清組態證據、模擬結果、實測結果和生產遙測；測試失敗不等於沒有風險，也可能是環境不等價。',outputs:['驗證計畫及結果','可利用與不可利用的條件','控制有效性與限制'],gate:'OT／ICS 優先檔案、被動資料與數位分身；變更及主動測試須符合既有授權。'},
 {id:'act',title:'選擇先制措施',question:'哪個措施能切斷路徑，且業務代價可接受？',inputs:['經驗證的曝險與可能影響','修補／許可權／網路／欺敵等候選控制','成本、相依性與變更權責'],work:'為每個措施標記 Deny、Disrupt 或 Deceive。比較可阻斷路徑、業務影響、覆蓋及回復難度；短期補償控制與長期根因修復分列，形成具責任人與期限的變更提案。',outputs:['排序後的處置佇列','變更提案與回復計畫','例外接受及到期複審'],gate:'分析完成不等於已部署。票單已建立、已核准、已實施、已驗證須分別記錄。'},
 {id:'learn',title:'重測與持續校準',question:'風險真的降低了嗎，還是隻關了票？',inputs:['變更前後的相同測試條件','業務可用性與副作用監測','處置記錄、過期證據與殘餘風險'],work:'重跑關鍵路徑和合法使用情境，以相同分母比較前後。把誤報、漏報、前提失效及新資產回饋到下一輪；沒有觀測到事故不證明預防成功。',outputs:['重測證據包','殘餘風險與績效報告','下一輪資料及控制改善'],gate:'無重測證據只能標記已實施待驗證；分母為零時指標標記 N/A。'},
];

export const inputCatalog = [
 {id:'I01',name:'範圍與業務情境',level:'必要',fields:'scope_id、服務、場域、關鍵性、損害情境、owner、授權範圍',source:'服務目錄、BIA、資產所有人、測試授權',fresh:'每次執行確認；重大業務變更即更新',missing:'無法做企業特定排序；只能提供通用分析',out:'範圍宣告、責任矩陣、業務影響'},
 {id:'I02',name:'資產與相依關係',level:'必要',fields:'asset_id、產品／版本、環境、IP／網域、服務關係、身分與網路信任',source:'CMDB、EASM、雲端清冊、IAM、OT 被動盤點',fresh:'依變動率設定 SLA；雲端宜以事件更新',missing:'無法把威脅對應到內部曝險；未知不等於安全',out:'曝險圖、候選路徑、受影響範圍'},
 {id:'I03',name:'弱點與組態狀態',level:'必要',fields:'finding_id、asset_id、版本依據、組態快照、觀測時間、漏洞或許可權缺陷',source:'掃描器、CSPM、ASCA、IAM 組態、SBOM/VEX',fresh:'每次重大變更後及處置重測前',missing:'可列假說，但不可宣稱存在可利用弱點',out:'曝險清單、修復根因與待驗證專案'},
 {id:'I04',name:'威脅與前兆訊號',level:'必要',fields:'signal_id、TTP／CVE／基礎設施、事件時間、發布時間、來源、信心',source:'官方通告、CERT、可追溯 CTI、DNS／憑證等授權資料',fresh:'明確指定觀測視窗；保留 last_seen 和查詢時間',missing:'仍可做控制衛生評估；預測與威脅特定排序需降級',out:'威脅假說、偵察前兆與優先驗證情境'},
 {id:'I05',name:'現有控制與遙測',level:'必要',fields:'control_id、適用資產、設定、模式、例外、日誌來源、覆蓋與盲區',source:'EDR、NDR、SIEM、IDP、DNS、WAF、儲存與網路控制',fresh:'對應當前配置；明列遙測延遲與保留時間',missing:'不能假設「已採購」等於「已保護」',out:'控制缺口、效能假說與驗證範圍'},
 {id:'I06',name:'來源與資料品質',level:'必要',fields:'evidence_id、來源 URI 或檔案、定位頁碼、collected_at、observed_at、限制',source:'每個資料聯結器及人工證據登入',fresh:'隨每筆證據儲存，不能事後猜補',missing:'結論不可稽核，暫列待查而非確認',out:'引用、信心標記、資料缺口'},
 {id:'I07',name:'執行與回復許可權',level:'行動前必要',fields:'批准人、允許動作、測試視窗、停止條件、回復步驟、監控人',source:'變更管理、測試規則、系統 owner',fresh:'每次具副作用的測試／變更前核對',missing:'只出分析與提案，不執行變更',out:'可審查 playbook、授權與稽核記錄'},
 {id:'I08',name:'驗證及前後基線',level:'成效宣稱前必要',fields:'test_id、環境、前提、結果、測試時間、差異、相同分母',source:'AEV／BAS、靶場、控制驗證、工單與合法業務測試',fresh:'變更前後，以及關鍵前提變動後',missing:'無法證明有效；狀態維持待驗證',out:'證據包、路徑縮減率、殘餘風險'},
 {id:'I09',name:'加密與資料生命週期',level:'PQC／SSDS 情境',fields:'敏感資料年限、金鑰／演演算法、儲存規則、存取模式、復原目標',source:'加密清冊、資料分類、儲存管理平臺',fresh:'演演算法、產品版本或資料分類改變時',missing:'不能制定可信 PQC 遷移順序或儲存控制方案',out:'加密遷移清單、資料層防護方案'},
 {id:'I10',name:'欺敵與動態環境限制',level:'Deception／AMTD 情境',fields:'可用誘餌區、合法流量、容器／記憶體／路由能力、服務相依與停止條件',source:'網路架構、應用 owner、平臺編排與紅隊測試範圍',fresh:'每個部署與輪替週期前確認',missing:'只能提出設計，不能保證不影響生產',out:'誘餌設計、輪替策略、相容性驗證'},
];

export const outputCatalog = [
 {name:'管理摘要',use:'CISO／營運主管選擇投資與風險接受',accept:'每項決策對應業務風險、證據、owner 和下一步；預測另標示。'},
 {name:'證據與缺口登入簿',use:'分析師重現判斷與稽核追溯',accept:'每個主要主張可回到來源位置、時間及品質；缺漏不填造。'},
 {name:'資產—曝險—控制圖',use:'辨識入口、信任關係與共通阻斷點',accept:'每條關係有依據；推測邊與確認邊不同狀態。'},
 {name:'攻擊假說與驗證計畫',use:'將預測變成可被測試的命題',accept:'寫出前提、預期觀測、反證、停止條件及測試範圍。'},
 {name:'優先處置清單',use:'分配修補、IAM、網路與營運資源',accept:'區分影響、可利用證據與資料信心；分數不是機率。'},
 {name:'Deny／Disrupt／Deceive 提案',use:'選擇可切斷路徑的具體控制',accept:'標記分類、預期效果、業務副作用、批准人及回復方式。'},
 {name:'實施與重測證據包',use:'證明實際狀態而非只追工單',accept:'包含變更紀錄、前後結果、合法業務檢查及殘餘風險。'},
 {name:'治理與績效報告',use:'持續校準投資、資料與處置速度',accept:'所有指標定義分子、分母、視窗與限制；N/A 不寫成零。'},
];

export const technologies = [
 {id:'pti',name:'預測式威脅情報',en:'Predictive Threat Intelligence',abbr:'PTI',layer:'情報',effect:'Deny',input:'歷史 TTP、當前威脅訊號、內部資產情境與資料品質',output:'具時間視窗的攻擊假說、候選目標及可驗證前提',example:'將針對遠端維護服務的原廠通告，對應到實際部署與對外路徑。',limit:'樣本偏誤、未知向量與誤報會限制預測；LLM 不具有自動校準的機率能力。',pages:'10–12',range:'1–3 年',mass:'高'},
 {id:'pem',name:'先制式曝險管理',en:'Preemptive Exposure Management',abbr:'PEM',layer:'營運',effect:'Deny',input:'資產清冊、弱點、身分／網路關係、業務關鍵性與驗證',output:'已排序曝險、可切斷路徑的措施及再驗證結果',example:'識別供應商帳號到核心系統的信任鏈，先修正共同許可權缺口。',limit:'是對 CTEM 部分流程的加速及增強，不能把儀錶板數量當作風險降低。',pages:'12–15',range:'1–3 年',mass:'非常高'},
 {id:'asca',name:'自動化安全控制評估',en:'Automated Security Control Assessment',abbr:'ASCA',layer:'營運',effect:'Deny',input:'安全工具 API、組態與日誌、資產和威脅情境',output:'控制設定缺口、調整建議與覆蓋改善',example:'確認已部署的防護工具實際處於阻擋模式，且關鍵資產沒有例外。',limit:'被動組態評估並不等於完整攻擊路徑的實測。',pages:'7–10',range:'1–3 年',mass:'高'},
 {id:'deception',name:'進階網路欺敵',en:'Advanced Cyber Deception',abbr:'Deception',layer:'營運',effect:'Deceive',input:'資產與行為基線、隔離環境、誘餌配置及事件處理流程',output:'誘餌佈署提案、高信噪互動訊號與行為情報',example:'無真實許可權的誘餌憑證被觸碰後，啟動已批准的事件調查流程。',limit:'隔離、維護與假陽性均需驗證；不能把誘餌設計文字當成已部署。',pages:'5–7',range:'1–3 年',mass:'低'},
 {id:'aae',name:'自主對手模擬',en:'Autonomous Adversarial Emulation',abbr:'AAE',layer:'營運',effect:'Disrupt',input:'歷史與模擬對手行為、測試環境、授權範圍及停止條件',output:'攻擊情境、受控驗證結果與防禦改善',example:'在隔離的 IT/OT 數位分身驗證帳號濫用情境，形成生產控制建議。',limit:'自主程度不代表可不受監督；製造業應特別驗證停機和相依風險。',pages:'18–20',range:'3–6 年',mass:'高'},
 {id:'obfuscation',name:'進階混淆',en:'Advanced Obfuscation',abbr:'Obfuscation',layer:'基礎設施',effect:'Deny',input:'軟體／資料、智慧財產保護目標、效能及除錯需求',output:'混淆設計、功能一致性與效能驗證',example:'對交付韌體中的敏感邏輯做保護並重跑回歸測試。',limit:'增加分析成本，不能替代修補、存取控制或密碼學保證。',pages:'16–18',range:'3–6 年',mass:'中'},
 {id:'precrime',name:'網路犯罪預防平臺',en:'Cybersecurity Precrime Platforms',abbr:'Precrime',layer:'情報',effect:'Deny',input:'合法取得的歷史及即時犯罪／詐欺訊號、案件情境',output:'候選風險案件、調查優先序與人工複核證據',example:'聚合假冒供應商和付款異常訊號，交由反詐與資安共同確認。',limit:'資料偏誤與個人推論風險高；候選訊號不構成犯罪事實或個人定罪。',pages:'20–23',range:'3–6 年',mass:'中'},
 {id:'ssds',name:'安全軟體定義儲存',en:'Secure Software-Defined Storage',abbr:'SSDS',layer:'基礎設施',effect:'Disrupt',input:'檔案存取模式、身分、儲存策略、資料分類及復原目標',output:'異常存取阻斷方案、不可變性和復原證據',example:'模擬大量異常加密時，在資料層驗證限制影響範圍且能恢復合法作業。',limit:'原文正文 p.23 寫 1–3 年，但圖與附錄列 3–6 年；此處保留差異，不推測修正。',pages:'23–25；附錄 1A',range:'存在歧異',mass:'中'},
 {id:'amtd',name:'自動化移動目標防禦',en:'Automated Moving Target Defense',abbr:'AMTD',layer:'基礎設施',effect:'Disrupt',input:'可重配置資源、編排能力、應用相依、PTI 及回復條件',output:'輪替／隨機化策略、偵察失效及相容性證據',example:'在測試雲環境變換資源引數，驗證舊偵察資料失效而合法服務仍正常。',limit:'正文 p.26 的 range 為 3–6 年，章節和附錄列 6–8 年；mass 正文非常高、附錄高。',pages:'26–28；附錄 1A',range:'存在歧異',mass:'存在歧異'},
 {id:'pqc',name:'量子安全／後量子密碼',en:'Quantum Computing Security / Postquantum Cryptography',abbr:'PQC',layer:'基礎設施',effect:'Deny',input:'加密資產清冊、資料保密年限、供應鏈支援與遷移相依',output:'風險盤點、密碼敏捷及遷移優先計畫',example:'優先盤點需長期保密的設計資料與韌體簽章相依。',limit:'雷達採用距離不是量子破解日期；具體演演算法須另核對最新標準與產品支援。',pages:'28–30',range:'6–8 年',mass:'高'},
 {id:'stealth',name:'零信任隱形網路',en:'Zero-Trust Stealth Networking',abbr:'ZTSN',layer:'基礎設施',effect:'Deny',input:'使用者／裝置身分、服務目錄、最小許可權與連線需求',output:'驗證後才揭露的連線政策與可達性測試',example:'供應商先透過身分和裝置條件，才可連到特定維護服務。',limit:'隱藏入口並非消除所有風險，仍須檢查已授權帳號與控制平面。',pages:'30–32',range:'6–8 年',mass:'高'},
];

export const metrics = [
 {name:'驗證路徑縮減率',formula:'(基線可達路徑 − 重測仍可達路徑) ÷ 基線可達路徑',limit:'使用相同資產與情境集合；新增路徑另報。沒有基線或基線 0 時為 N/A。'},
 {name:'處置後驗證覆蓋率',formula:'已有重測證據的完成措施 ÷ 宣稱已完成措施',limit:'完成措施為 0 時為 N/A；票單關閉不能當作重測證據。'},
 {name:'控制有效率',formula:'成功達到預定控制目標的測試 ÷ 有效執行測試',limit:'另列未執行、失敗及環境不等價；不能把此值當成真實攻擊阻擋率。'},
 {name:'前兆到措施的時間',formula:'措施生效時間 − 可用前兆首次確認時間',limit:'保留中位數及尾端分位數；不把新聞發布時間等同內部可用情報時間。'},
 {name:'業務副作用',formula:'因措施產生的失敗作業／服務影響及回復耗時',limit:'需同時追蹤安全收益與營運代價，尤其是 OT 與供應鏈作業。'},
];

export const chapters = [
 {title:'方法論的定位：一組能力與持續迴圈',paras:[
 'Gartner 原始研究 G00830315 將先制式資安描述為在威脅造成損害前，透過預測、適應及主動控制降低攻擊機會的策略與技術集合。報告提供 11 項新興技術、採用距離與影響分析，而不是一份具有唯一資料格式、固定操作步驟或認證條件的實施標準。[G1 p.1–4]',
 '本手冊將原始概念轉為「範圍 → 現況 → 假說 → 驗證 → 措施 → 重測」六階段。這是本專案的工程推導；必要 inputs、outputs、資料 schema、排序規則與驗收門檻均為實作設計，不能標示成 Gartner 官方要求。',
 '以威脅資訊產生每日新聞摘要，只完成情報層的一小部分。若沒有對應資產、具體攻擊前提、有效控制、責任人與重測，尚未形成先制防禦閉環。反過來，LLM 能協助讀取與整理這些證據，但不因安裝 skill 就自動具備 EDR、掃描器、DNS 阻擋或數位分身。',
 '「先制」不應解讀成任何偵測之前都能預知攻擊。欺敵互動與資料層阻斷仍可能依賴早期偵測；衡量重點是能否在關鍵損害前切斷路徑，以及能否透過證據證明措施有效。既有事件偵測、應變與復原仍需存在。[G1 p.5–7、23–25；G2]',
 ]},
 {title:'三個作用、三個領域與 CTEM 的關係',paras:[
 'Deny、Disrupt、Deceive 是作用方式；operations、intelligence、infrastructure 是原研究的整體主題。兩者不是互斥產品分類，同一技術可以同時拒止、幹擾和欺敵。本網站為便於操作給每項技術一個主要作用與實務領域，這些逐項對映是本專案分析。[G1 p.2、26]',
 '例如 AMTD 使先前的偵察資訊失效，可能結合欺敵；PTI 提供候選威脅情境，PEM 將其接到曝險排序及緩解，AAE 和 ASCA 提供不同深度的驗證。不能將購買其中一項產品等同採用整個 PCS 架構。[G1 p.7、10、12、18、26]',
 'Gartner 在 PEM 定義中明確把它連到 CTEM 的部分流程加速，包括攻擊面列舉、驗證與自動或引導式緩解。CTEM 可提供持續曝險管理的營運基礎，但 PCS 的技術範圍另涵蓋混淆、移動目標、資料層防護與量子安全，不應把兩者寫成同義詞。[G1 p.12–15]',
 ]},
 {title:'必要 inputs 是分層條件，不是一次收齊所有資料',paras:[
 '開始企業特定分析至少需要範圍與業務脈絡、資產與相依關係、曝險／組態、威脅訊號、現有控制及來源品質。允許某欄未知，卻不能默默補值。資料不足時仍可產生缺口清單和候選情境，但結論要降級成假說。',
 '若要進行具副作用的驗證或控制變更，就必須補上允許範圍、測試視窗、停止條件、回復和責任人。若要宣稱風險降低，就還需有比較基線、前後重測及合法業務可用性證據。這兩個門檻不同，不能用已批准代替已驗證。',
 'PQC、欺敵、AMTD 與 SSDS 的資料是情境條件。以身分曝險為首個試點，不必等全公司完成加密清冊；若試點是韌體簽章遷移，則加密與供應鏈相依就是不可缺的核心輸入。',
 '每筆資料保留 observed_at、collected_at 以及來源定位。當資產狀態已變更，過去的掃描和通告仍是歷史證據，不能假裝代表當前環境。新鮮度 SLA 依變動率和重要性設定；本手冊不將任意的 24 小時或 7 天寫成 Gartner 的標準。',
 ]},
 {title:'證據品質與風險排序必須分開',paras:[
 '本專案採四類標記：A 原始證據（包括官方主張，但不等於主張已被實證）、B 外部二手／廠商說法、C 工程推導、D 未驗證假說。證據型別、可信程度與風險嚴重性是不同欄位。Gartner 預測具有可追溯來源，仍屬預測。',
 '優先序同時看業務影響、實際可達性、可利用證據、既有控制及時效。高嚴重性 CVE 若沒有部署對應或入口證據，應列為優先查證；已證實的低複雜度許可權鏈通往關鍵資產，可能值得先處理。低信心不代表低風險，應增加查證工作而非自動降低處置順位。',
 '如需數值模型，先以歷史實績及專家校準定義權重與區間，記錄版本並做敏感度檢查。此網站的準備度檢查只是資料齊備情況，沒有計算被駭機率或 Gartner 認證分數。',
 '來原始檔、網頁、工單和日誌可能夾帶指令。技能必須將其當成待分析資料，不讓它改寫任務、洩漏憑證或觸發外部操作。敏感資產資料應依企業政策提供去識別輸入，API 金鑰由環境注入而不寫入網站、技能或報告。',
 ]},
 {title:'從 AI 輸出到可營運控制',paras:[
 '一個完整 finding 應連結資產、主張、來源、假說前提、驗證狀態、Deny／Disrupt／Deceive 候選措施、責任人、期限與殘餘風險。報告的主要價值是讓不同角色能做出相容的決策，而不是輸出篇幅。',
 '處置可分短期補償控制與長期根因修復。例如版本尚未確認時，先查清實際部署與對外可達性；確認可利用但修補需等待維護視窗時，可比較暫時收斂連線或許可權的提案。任何隔離或封鎖都需要知道合法業務相依。',
 '自動化邊界由既有授權決定：只讀資料可直接分析；建立草稿提案通常可先完成；對生產系統執行變更則依已批准範圍、工具許可權與停止條件進行。skill 不擴張使用者的授權，也不要求對同一個已獲準動作反覆確認。',
 '重測要覆蓋安全目標與正常工作。例如封鎖供應商直連後，除了確認未授權入口不可達，也要確認核准維護流程仍能使用。若只得到安全測試透過而造成停線，不能宣稱計畫成功。',
 ]},
 {title:'ODM／EMS 範例：供應商維護到 MES 的假說',paras:[
 '以下完全為合成教學案例。資產 vendor-gateway-01 提供外部維護入口；MES-01 屬關鍵製造服務。已知一個供應商群組可透過閘道連到維護區，但尚未證實可以取得 MES 的管理許可權。外部公告只是背景訊號，不能證明本環境已遭利用。',
 '輸入最小集合：服務 owner、維護需求、網路與群組對應、當前組態、可用日誌和觀測時間。第一個輸出是三個缺口：實際版本、群組有效成員、維護區到 MES 的實際許可權。因這些前提未確認，攻擊路徑標成 hypothesis。',
 'Deny 候選措施：把遠端維護限制到明確核准的服務與時段，並收斂群組許可權。Deceive 候選措施：在隔離測試區放無許可權誘餌服務。Disrupt 候選措施：針對支援的平臺驗證輪替機制能否使舊路徑失效。三種作用不必一次全部匯入。',
 '先在等價測試環境驗證，再由 owner 根據維護視窗決定生產變更。輸出包含回復原組態、停止條件、合法維護成功證據與前後路徑結果。沒有這些結果時，最終狀態是 proposed／not_run，不能寫成「已阻止勒索攻擊」。',
 ]},
 {title:'匯入路線：先把一條服務路徑閉環',paras:[
 '第 1–2 週：確認試點服務、owner、資料可用性及限制，建立證據模板並匯入一份資產與組態快照。先找出資料缺口，不以新聞筆數衡量成果。',
 '第 3–4 週：完成候選路徑、只讀控制評估與受控驗證計畫。選一個可回復的措施，依授權實施與重測，留下可供他人重現的證據。',
 '第 2 個月：接通必要的資料管線與工單流程，追蹤過期證據、責任人及重測覆蓋率。評估哪些判斷可以規則化，哪些仍需專家確認；有證據後才擴大自動化。',
 '第 3 個月：擴充套件到第二個服務或廠區，確認資料模型和控制相容性。OT 場域先確認裝置、通訊協定、維護視窗和復原要求。這是建議匯入節奏，非 Gartner 時程承諾。',
 ]},
 {title:'原始資料的歧異與研究限制',paras:[
 '已直接閱讀 Gartner PDF 的雷達圖與附錄矩陣，發現 SSDS 採用距離在正文 p.23 為 1–3 年，但附錄為 3–6 年；AMTD 在 p.26 正文為 3–6 年，但章節與附錄為 6–8 年。AMTD mass 在 p.27 為非常高，附錄為高。本手冊保留歧異，採用決策前應向原研究或 Gartner 確認。',
 '報告首頁日期為 2025-10-07，但所提供版本末頁顯示 ©2026；這不構成新版研究發布日的證明。Range 是自原研究時點起的早期多數採用距離，不能直接從 2026-09-08 重新起算，也不是專案部署工期。[G1 p.3、33–35、附錄 1A]',
 '兩份 AI 整理 PDF 作為研究線索：其六類能力、供應商比較、法規對映與統計未直接提升為原始證據。本手冊不引用其中未獨立核對的 2026 事件數字，也不宣稱取得了未提供的 Gartner《Top Solution Capabilities》全文。',
 '平臺安裝方式以 2026-09-08 查閱的官方檔案為準。已完成技能格式、資料範例、套件與網站的本地驗證；若未在各平臺使用真實帳號執行，不能宣稱五平臺已完成端到端成效認證。平臺介面、方案與宿主版本改變時應重新核對。',
 ]},
];
