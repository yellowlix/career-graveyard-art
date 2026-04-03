export const statusMeta = {
  unworthy: { label: "UNWORTHY", zh: "廉价化", order: 1 },
  decaying: { label: "DECAYING", zh: "腐朽中", order: 2 },
  frozen: { label: "FROZEN", zh: "冻结", order: 3 },
  endangered: { label: "ENDANGERED", zh: "濒危", order: 4 },
  obsolete: { label: "OBSOLETE", zh: "过时", order: 5 }
};

export const careers = [
  {
    slug: "graphic-designer",
    name: "平面设计师",
    status: "unworthy",
    declineYear: 2023,
    slabHeight: 180,
    teaser: "人类在色彩与构图上的最后尊严，正被像素级算法无情拆解。",
    summary:
      "曾经被视为品牌审美守门人的岗位，在模板化工具、生成式模型与低价竞标的三重挤压下，逐渐失去议价权。",
    factors: [
      {
        title: "技术降维",
        text: "AI 不再需要繁琐的软件操作，意图理解取代了技能积累。"
      },
      {
        title: "价值归零",
        text: "当输出成本接近零，创意劳动的商业溢价也随之崩塌。"
      },
      {
        title: "审美趋同",
        text: "大数据驱动的流行，让个体风格的生存空间被进一步压缩。"
      }
    ],
    timeline: [
      {
        year: "2012",
        title: "黄金时代",
        text: "设计作为高门槛表达艺术，品牌愿意为风格与经验支付溢价。"
      },
      {
        year: "2018",
        title: "模板泛滥",
        text: "在线设计工具与廉价素材站兴起，审美逐渐工业化与同质化。"
      },
      {
        year: "2023",
        title: "算力入侵",
        text: "生成式 AI 爆发，像素级创意被秒级产出的算法彻底覆盖。"
      }
    ],
    voices: [
      {
        author: "前 4A 公司美术指导",
        date: "2024.03.12",
        text: "我花了十年学习如何掌控光影和色彩，结果现在只需要敲出几个关键词。那十年的努力，像是一场自作多情的告白。"
      },
      {
        author: "自由职业插画师",
        date: "2024.01.05",
        text: "客户不再关心什么是好设计，他们只关心快。快意味着廉价，廉价意味着死亡。"
      }
    ]
  },
  {
    slug: "junior-translator",
    name: "初级翻译",
    status: "decaying",
    declineYear: 2024,
    slabHeight: 140,
    teaser: "语言不再是桥梁，而是被流水线加工的原始物料。",
    summary:
      "机器翻译已经足以覆盖大量标准化文本，剩下的人工岗位逐渐滑向校对、润色与低价质检。",
    factors: [
      { title: "自动化成熟", text: "通用翻译场景中的机器可读性已经超过大多数基础岗位。" },
      { title: "质量外包", text: "翻译从生产变成纠错，职业自尊被切成小时计费。" },
      { title: "语感稀释", text: "追求速度的平台逻辑，让表达被压缩成可复制模板。" }
    ],
    timeline: [
      { year: "2015", title: "外包繁荣", text: "跨境业务增长，入门级翻译需求旺盛。" },
      { year: "2020", title: "平台压价", text: "大批项目转入众包市场，计价被持续向下拉平。" },
      { year: "2024", title: "机器主导", text: "人工角色被限定为最终审校与情绪修正。" }
    ],
    voices: [
      {
        author: "翻译从业者",
        date: "2024.03.12",
        text: "翻译不再是信达雅的博弈，而是对模型输出的纠偏。我们从跨越文明的信使，变成给 AI 打工的质检员。"
      }
    ]
  },
  {
    slug: "cram-school-teacher",
    name: "教培名师",
    status: "frozen",
    declineYear: 2021,
    slabHeight: 180,
    teaser: "知识的殿堂在一夜之间变成了沉默的废墟。",
    summary:
      "政策转向与在线智能辅导并行，明星教师模式被切断，行业被封存在一段骤然中止的时代叙事里。",
    factors: [
      { title: "监管冻结", text: "政策骤变直接切断商业模式，职业生态瞬间塌陷。" },
      { title: "在线替身", text: "直播课与智能题库让标准化辅导失去线下稀缺性。" },
      { title: "信任断裂", text: "家长从追逐名师转向追逐系统化提分工具。" }
    ],
    timeline: [
      { year: "2016", title: "扩张", text: "名师个人品牌带动机构规模化复制。" },
      { year: "2020", title: "线上加速", text: "直播和录播成为新的主战场。" },
      { year: "2021", title: "戛然而止", text: "整条赛道进入冻结状态，个体声望无处安放。" }
    ],
    voices: [
      {
        author: "某数学主讲老师",
        date: "2024.03.18",
        text: "孩子们也许还会记得那些周五晚上的热闹，但传授知识这件事，已经不再需要我们这些人的温度。"
      }
    ]
  },
  {
    slug: "content-editor",
    name: "内容编辑",
    status: "endangered",
    declineYear: 2024,
    slabHeight: 160,
    teaser: "当算法决定了阅读，文字便失去了它的灵魂与呼吸。",
    summary:
      "内容生产仍然存在，但编辑从结构与判断的中枢，退化为流量阈值下的即时排版与修改接口。",
    factors: [
      { title: "平台喂养", text: "选题与标题越发由平台算法而非编辑判断驱动。" },
      { title: "供给过剩", text: "生成式内容让基础编辑岗位陷入无限竞争。" },
      { title: "价值错位", text: "深度与耐心无法在短期点击回报中体现。" }
    ],
    timeline: [
      { year: "2018", title: "内容热潮", text: "编辑被视为内容工业中的关键调度者。" },
      { year: "2022", title: "爆款公式", text: "平台偏好把审美与节奏压成统一范式。" },
      { year: "2024", title: "文本流水线", text: "编辑的角色变成对模板化内容进行最终投喂。" }
    ],
    voices: [
      {
        author: "匿名内容运营",
        date: "2024.03.15",
        text: "算法根据点击率切碎了文章，灵魂在 Feed 流中被无声湮没。如果字数决定了价值，那思考本身便是多余。"
      }
    ]
  },
  {
    slug: "bank-teller",
    name: "银行柜员",
    status: "obsolete",
    declineYear: 2019,
    slabHeight: 180,
    teaser: "冰冷的数字屏幕，彻底取代了那层玻璃后的体温。",
    summary:
      "网银、自助机与远程服务把面对面金融服务变成残留仪式，岗位被留在正在撤离的支行里。",
    factors: [
      { title: "服务迁移", text: "绝大多数高频业务已被移动端和自助机吸收。" },
      { title: "成本淘汰", text: "实体网点被要求极限瘦身，柜台成为最先被压缩的成本。" },
      { title: "接触消失", text: "金融服务从关系转向接口，人的存在感被抹平。" }
    ],
    timeline: [
      { year: "2010", title: "排队大厅", text: "柜台仍是个人金融体验的核心入口。" },
      { year: "2016", title: "App 成熟", text: "移动支付与手机银行改写交易习惯。" },
      { year: "2019", title: "柜台退场", text: "线下被保留为兜底方案，而不再是默认服务。" }
    ],
    voices: [
      {
        author: "前柜面主管",
        date: "2023.12.04",
        text: "我们原本以为在处理数字，后来才发现自己也只是更大系统里可替换的一格。"
      }
    ]
  },
  {
    slug: "traditional-reporter",
    name: "传统记者",
    status: "obsolete",
    declineYear: 2022,
    slabHeight: 220,
    teaser: "现场的尘土早已远去，只剩下公关稿的寂静回声。",
    summary:
      "发布速度压倒了现场感，深度采访被压缩到无法维持的时间与预算中，记者逐渐变成转述接口。",
    factors: [
      { title: "事实外包", text: "平台与机构供稿替代了一线采访的成本结构。" },
      { title: "节奏失控", text: "新闻速度战让调查性报道没有生长空间。" },
      { title: "信任流失", text: "读者更早接触原始碎片，职业中介价值被削弱。" }
    ],
    timeline: [
      { year: "2008", title: "纸媒惯性", text: "职业记者仍拥有稳定的机构支持与身份光环。" },
      { year: "2016", title: "平台时代", text: "信息分发被算法平台主导，采写关系被重新切割。" },
      { year: "2022", title: "残响", text: "大量岗位退回到品牌内容与二次编译。" }
    ],
    voices: [
      {
        author: "前都市报记者",
        date: "2024.02.09",
        text: "我怀念采访本上的笔迹。如今发生的一切像先天就被压扁成了标题。"
      }
    ]
  },
  {
    slug: "architectural-drafter",
    name: "建筑绘图员",
    status: "decaying",
    declineYear: 2024,
    slabHeight: 120,
    teaser: "线条不再需要情感，只需要更快的自动补全。",
    summary:
      "参数化建模、自动出图与标准构件库，正在削弱重复绘图岗位存在的理由。",
    factors: [
      { title: "参数生成", text: "标准图纸由规则自动展开，人工调整需求下降。" },
      { title: "模型优先", text: "从二维制图向模型协作迁移，基础岗位被挤压。" },
      { title: "精度替代", text: "软件的稳定产出比人的疲劳更容易管理。" }
    ],
    timeline: [
      { year: "2014", title: "二维主导", text: "大量事务所依赖人工出图与细部修订。" },
      { year: "2021", title: "BIM 普及", text: "工作开始从画线变成维护标准化信息。" },
      { year: "2024", title: "脚本接管", text: "可重复的线稿任务被自动流程吞没。" }
    ],
    voices: [
      {
        author: "施工图绘图员",
        date: "2024.02.17",
        text: "我们曾靠细节吃饭，后来发现系统比人更愿意一遍又一遍地画线。"
      }
    ]
  },
  {
    slug: "community-group-buyer",
    name: "社区团购员",
    status: "unworthy",
    declineYear: 2023,
    slabHeight: 115,
    teaser: "流量与补贴散去后，剩下的只是无法结算的辛劳。",
    summary:
      "平台退潮后，最后一公里的临时职业被迅速抛弃，人与社区之间的关系也随之蒸发。",
    factors: [
      { title: "平台退场", text: "补贴结束后，整个岗位失去存在前提。" },
      { title: "关系断裂", text: "社区熟人网络被平台效率短暂借用后又抛弃。" },
      { title: "劳动碎片", text: "收入被拆成碎片，难以支撑稳定职业身份。" }
    ],
    timeline: [
      { year: "2020", title: "极速膨胀", text: "依靠补贴与流量，岗位在社区密集出现。" },
      { year: "2022", title: "补贴收缩", text: "平台开始选择性撤退，留下一地散碎劳动。" },
      { year: "2023", title: "价值蒸发", text: "职业本身失去长期存在的商业逻辑。" }
    ],
    voices: [
      {
        author: "团长",
        date: "2023.11.28",
        text: "当补贴停了，群还在，人却散了。原来所谓新职业只是一个促销窗口。"
      }
    ]
  },
  {
    slug: "junior-programmer",
    name: "初级程序员",
    status: "endangered",
    declineYear: 2025,
    slabHeight: 105,
    teaser: "逻辑正在被逻辑自身吞噬，入门门槛被重新定义。",
    summary:
      "会写基础 CRUD 已不再稀缺，模型辅助开发正在抬高新人的有效门槛。",
    factors: [
      { title: "能力重估", text: "企业需要的是能驾驭系统的人，而不是会补齐模板的人。" },
      { title: "自动生成", text: "基础代码生成让初级重复性任务大量缩减。" },
      { title: "竞争外溢", text: "全球化远程供给加剧了入门岗位拥挤。" }
    ],
    timeline: [
      { year: "2019", title: "扩招", text: "培训班与校招共同输送大量初级开发者。" },
      { year: "2023", title: "Copilot 普及", text: "基础编码速度被工具极大压缩。" },
      { year: "2025", title: "门槛抬升", text: "公司更看重系统理解、产品抽象与调度能力。" }
    ],
    voices: [
      {
        author: "应届开发者",
        date: "2025.01.18",
        text: "我学会了语法，但岗位要求我先学会如何与机器一起工作。"
      }
    ]
  },
  {
    slug: "ecommerce-support",
    name: "电商客服",
    status: "obsolete",
    declineYear: 2022,
    slabHeight: 130,
    teaser: "预设话术的空洞回响，终于覆盖了真人安抚的温度。",
    summary:
      "聊天机器人和工单系统把高频客服场景彻底流程化，人工客服只在失控时短暂出现。",
    factors: [
      { title: "回复模板化", text: "大量咨询都能由规则与机器人覆盖。" },
      { title: "情绪最小化", text: "平台优化的是关闭工单速度，而不是理解顾客情绪。" },
      { title: "人力压缩", text: "人工被保留为升级通道，而不再是主要触点。" }
    ],
    timeline: [
      { year: "2017", title: "旺季战争", text: "大促期间的人工客服仍是成交关键环节。" },
      { year: "2020", title: "机器人常态化", text: "自动应答开始接管主流程。" },
      { year: "2022", title: "人工退居后台", text: "真人客服成为故障补丁，而非服务本体。" }
    ],
    voices: [
      {
        author: "客服主管",
        date: "2024.01.08",
        text: "我们不再被要求理解用户，只被要求在更短时间里关闭更多窗口。"
      }
    ]
  },
  {
    slug: "newspaper-editor",
    name: "报刊编辑",
    status: "obsolete",
    declineYear: 2020,
    slabHeight: 145,
    teaser: "印刷机的最后叹息，被一块发光的屏幕轻轻盖住。",
    summary:
      "排版、标题与版面节奏的职业技艺，在纸媒收缩与数字即时分发前逐渐失去舞台。",
    factors: [
      { title: "版面消失", text: "屏幕分发打散了纸面的整体叙事。" },
      { title: "周期坍缩", text: "日报与周刊节奏无法匹配实时推送逻辑。" },
      { title: "工艺失效", text: "版式功夫不再构成商业竞争优势。" }
    ],
    timeline: [
      { year: "2010", title: "版面秩序", text: "纸面仍然掌握公众阅读节奏。" },
      { year: "2017", title: "转向屏幕", text: "大量内容先为移动端写作，后为纸面裁剪。" },
      { year: "2020", title: "出版残响", text: "编辑从职业主体退到文化记忆。" }
    ],
    voices: [
      {
        author: "资深版编",
        date: "2023.10.30",
        text: "我曾经为一个标题挪半毫米的位置，现在谁也不再关心这一页是否还存在。"
      }
    ]
  },
  {
    slug: "offline-tour-guide",
    name: "线下导游",
    status: "frozen",
    declineYear: 2020,
    slabHeight: 110,
    teaser: "风景先被录成素材，后来被压缩成路线模板。",
    summary:
      "旅行推荐、AI 语音讲解与标准化路线包，正在让导游的即时讲述能力被边缘化。",
    factors: [
      { title: "路线模板", text: "平台把旅程拆成可购买、可复制的固定产品。" },
      { title: "讲解替换", text: "语音导览与 AR 解释弱化了人的在场价值。" },
      { title: "波动巨大", text: "行业对外部环境极度敏感，职业稳定性极弱。" }
    ],
    timeline: [
      { year: "2015", title: "跟团仍稳", text: "线下导游在集体旅行中仍具稳定需求。" },
      { year: "2020", title: "行业停摆", text: "外部冲击让大量导游离开原本的工作链条。" },
      { year: "2024", title: "数字讲解", text: "重新恢复的旅行已不再需要同样数量的人。" }
    ],
    voices: [
      {
        author: "前导游",
        date: "2024.02.03",
        text: "我曾靠讲故事带队走路，后来故事被压进耳机里，而我被留在景点门口。"
      }
    ]
  },
  {
    slug: "wedding-photographer",
    name: "婚庆摄影",
    status: "unworthy",
    declineYear: 2024,
    slabHeight: 125,
    teaser: "滤镜越来越完美，真实的劳动却越来越廉价。",
    summary:
      "拍摄不再稀缺，后期模板、短视频偏好与成本竞争，使这类职业加速滑向低价化。",
    factors: [
      { title: "设备普及", text: "门槛降低后，大量低价供给涌入市场。" },
      { title: "后期模板", text: "统一滤镜与流水线修图让个体审美难以溢价。" },
      { title: "需求缩短", text: "纪念性消费被压缩成更快、更短、更可分享的内容。" }
    ],
    timeline: [
      { year: "2016", title: "风格崛起", text: "婚礼影像被视为可长期留存的情绪纪念。" },
      { year: "2021", title: "短视频主导", text: "需求从完整记录转向即时传播素材。" },
      { year: "2024", title: "价格塌缩", text: "劳动密度仍高，市场支付意愿却持续走低。" }
    ],
    voices: [
      {
        author: "独立摄影师",
        date: "2024.01.21",
        text: "我越来越像一个素材供应商，而不是替别人留下时间的人。"
      }
    ]
  },
  {
    slug: "delivery-rider",
    name: "外卖骑手",
    status: "decaying",
    declineYear: 2024,
    slabHeight: 135,
    teaser: "算法的秒表从未停下，而人只是在不断更换的制服里奔跑。",
    summary:
      "这不是消失最快的职业，却是被系统最深度吞噬的职业之一，价值与风险始终高度失衡。",
    factors: [
      { title: "算法规训", text: "每一次路线与时长都由系统决定。" },
      { title: "替代待命", text: "无人配送与站点自动化已在边缘逼近。" },
      { title: "身份脆弱", text: "高强度劳动与弱保障并存，职业尊严难以建立。" }
    ],
    timeline: [
      { year: "2018", title: "平台扩张", text: "即时配送成为城市基础设施。" },
      { year: "2022", title: "效率极限", text: "规则越来越细，个人越发像系统末梢。" },
      { year: "2024", title: "替代预演", text: "自动配送技术开始从实验走向真实运营。" }
    ],
    voices: [
      {
        author: "骑手",
        date: "2024.02.26",
        text: "导航每天都更聪明一点，我每天都只是更累一点。"
      }
    ]
  },
  {
    slug: "data-annotator",
    name: "数据标注",
    status: "endangered",
    declineYear: 2025,
    slabHeight: 100,
    teaser: "喂养未来模型的最后燃料，最终也会被模型自己吞下。",
    summary:
      "作为 AI 基础设施的一部分，标注岗位正在被主动学习、合成数据和自动审查逐步稀释。",
    factors: [
      { title: "自动标注", text: "模型开始参与生成并校验训练数据。" },
      { title: "隐形劳动", text: "岗位对系统关键，却被长期低价对待。" },
      { title: "阶段性存在", text: "它被设计成一种过渡性职业，而非长期职业身份。" }
    ],
    timeline: [
      { year: "2021", title: "需求激增", text: "大模型训练扩张带来海量标注任务。" },
      { year: "2024", title: "半自动化", text: "人工从主标注退向抽检与修正。" },
      { year: "2025", title: "自我取代", text: "模型开始吞掉自己成长路上的人工环节。" }
    ],
    voices: [
      {
        author: "标注员",
        date: "2025.02.11",
        text: "我在教会一个系统看世界，而它学会之后第一件事就是不再需要我。"
      }
    ]
  }
];

export const homeQuote = {
  text:
    "在这个时代，如果你不能像机器一样精准，或者不能像机器一样廉价，你的职业便是一座正在倒塌的纪念碑。",
  author: "Anonymous / 匿名吊唁者"
};

export const aboutData = {
  missionTitle: "在这个算法与效率至上的时代，我们记录那些正在消逝的职业灵魂。",
  missionBody:
    "职业墓场不仅是一个档案库，更是一种数字装置艺术。我们通过解构“职业”这一概念，讨论在技术降临、平台统治与算力霸权下，人类创造力的最后防线。",
  methodology: [
    {
      title: "01 / 存在定义",
      text: "界定该职业的核心价值是否能被标准化的 Prompt 或流水线完全替代。"
    },
    {
      title: "02 / 溢价消减",
      text: "追踪该行业的报酬趋势，判断是否出现不可逆的廉价化。"
    },
    {
      title: "03 / 情感剥离",
      text: "分析人与人之间的情绪连接，是否正在被冰冷接口彻底接管。"
    },
    {
      title: "04 / 历史定格",
      text: "一旦确认职业进入不可挽回状态，就将其封存为时代的见证。"
    }
  ],
  standards: [
    ["AI Replacement Risk / AI 替代率", "HIGH"],
    ["Market Demand Trend / 市场需求走势", "DECAYING"],
    ["Social Status Value / 职业社会溢价", "ZERO"],
    ["Creative Independence / 创意独立性", "VULNERABLE"]
  ],
  timeline: [
    ["2023.11 / 起源", "项目由三位前创意人发起，旨在记录大模型时代下的行业坍塌。"],
    ["2024.01 / 建立祭奠区", "开放社区贡献，收录超过 1,200 条来自各行各业的职业悼词。"],
    ["NOW / 持续观察", "通过算法与社会调研，不断扩充这片数字公墓的版图。"]
  ],
  stats: [
    ["128", "Slabs / 已入库职业"],
    ["42,901", "Voices / 悼词留言"],
    ["202", "Days / 运行天数"]
  ],
  contributors: [
    ["Elias Chen", "Founder / Curation"],
    ["Mavis Zhang", "Visual Designer"],
    ["Jun-Ho Lee", "Research Lead"],
    ["Sarah J.", "Data Engineer"],
    ["Anon User #21", "Lead Contributor"],
    ["Join Us", "Open Source"]
  ]
};

export const baseMemorialCount = 1248;

export const initialMemorials = [
  {
    career: "平面设计师",
    signature: "匿名悼词者 / 前资深视觉设计",
    date: "2024.03.20",
    text:
      "在这个一切皆可生成的年代，我怀念那些通宵改稿、为一像素的间距而争执的夜晚。那是我们作为“人”对审美的最后坚持。再见了，画笔。"
  },
  {
    career: "教培名师",
    signature: "某数学主讲老师",
    date: "2024.03.18",
    text:
      "屏幕另一端的孩子，也许还会想起那些充满激情的周五晚上。知识没变，但传授它的方式，已不再需要我们这些人的温度。"
  },
  {
    career: "内容编辑",
    signature: "匿名内容运营",
    date: "2024.03.15",
    text:
      "算法根据点击率切碎了文章，灵魂在 Feed 流中被无声湮没。如果字数决定了价值，那思考本身便是多余。"
  },
  {
    career: "初级翻译",
    signature: "翻译从业者",
    date: "2024.03.12",
    text:
      "翻译不再是信达雅的博弈，而是对模型输出的纠偏。我们从跨越文明的信使，变成了给 AI 打工的质检员。"
  }
];
