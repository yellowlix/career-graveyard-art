const l = (zh, en) => ({ zh, en });
const same = (value) => ({ zh: value, en: value });

export const statusMeta = {
  unworthy: { label: l("廉价化", "Commoditized"), order: 1 },
  decaying: { label: l("衰退中", "Decaying"), order: 2 },
  frozen: { label: l("冻结", "Frozen"), order: 3 },
  endangered: { label: l("濒危", "Endangered"), order: 4 },
  obsolete: { label: l("过时", "Obsolete"), order: 5 }
};

export const siteMeta = {
  siteName: l("职业墓场", "Career Graveyard"),
  siteUrl: "https://career-graveyard.com",
  contactEmail: "mahrovandrei@gmail.com",
  afdianUrl: "https://afdian.com/a/yellowaurora",
  kofiUrl: "https://ko-fi.com/yellowaurora",
  themeColor: "#ffffff",
  socialImage: "https://career-graveyard.com/favicon.svg",
  defaultDescription: l(
    "职业墓场以数字档案、时间线与悼词的形式，记录那些正在衰退、冻结、被替代或被重新定价的职业。",
    "Career Graveyard records professions being eroded, frozen, replaced, or repriced through archival entries, decline timelines, and memorial texts."
  )
};

export const siteCopy = {
  skipLink: l("跳到主要内容", "Skip to main content"),
  localeSwitch: {
    ariaLabel: l("语言切换", "Language switcher"),
    zh: "中文",
    en: "EN"
  },
  navigation: {
    back: l("返回", "Back"),
    archive: l("展览", "Exhibition"),
    memorial: l("祭奠", "Memorial"),
    about: l("关于", "About")
  },
  navigationHints: {
    archive: l(
      "浏览已收录职业与正在消逝的工作样本。",
      "Browse archived professions and disappearing work."
    ),
    memorial: l(
      "为消失中的职业留下悼词或提交新样本。",
      "Leave a memorial or submit a new profession sample."
    ),
    about: l(
      "查看项目方法、边界与协作方式。",
      "See the project's method, boundaries, and collaboration path."
    )
  },
  footer: {
    copyright: l("© 2026 职业墓场", "© 2026 Career Graveyard"),
    legal: l("使用说明", "Legal"),
    policy: l("内容说明", "Policy"),
    support: l("支持", "Support"),
    connect: l("联系", "Contact"),
    contactLabel: l("投稿与协作", "Submissions & Outreach")
  },
  pageDescriptions: {
    home: l(
      "职业墓场把那些正在被算法、平台与效率逻辑挤压的职业，整理成一座可以慢慢阅读的数字墓园。",
      "Career Graveyard turns professions being swallowed by algorithms, platforms, and efficiency into a navigable digital cemetery."
    ),
    archive: l(
      "查看全部展陈职业，按状态和时间线追踪它们被削弱、冻结或消失的路径。",
      "Browse every profession in the exhibition and track how each one has been weakened, frozen, or erased over time."
    ),
    memorial: l(
      "为正在消失的职业填写悼词邮件草稿，并通过项目邮箱提交祭奠留言或新增职业建议。",
      "Draft a memorial email for a disappearing profession and submit tributes or new profession suggestions through the project inbox."
    ),
    about: l(
      "了解职业墓场的项目目标、收录方法、内容边界，以及如何通过项目邮箱提交投稿或表达协作意向。",
      "Learn Career Graveyard's goals, curation method, boundaries, and how to submit work or reach out about collaboration through the project inbox."
    ),
    detail: l(
      "阅读职业墓场中的职业详情、时间线、消逝因素与悼词节录。",
      "Read the obituary, timeline, decline factors, and memorial excerpts for a profession collected by Career Graveyard."
    ),
    notFound: l(
      "你访问的页面不存在，或这座墓碑尚未被正式收入职业墓场。",
      "The page you requested does not exist, or this tombstone has not yet been formally catalogued by Career Graveyard."
    )
  },
  home: {
    subtitle: l("消逝职业展览", "Exhibition of Disappearing Work"),
    question: l("这个职业，还值得继续投入吗？", "Is this career still worth pursuing?"),
    quoteEyebrow: l("来自沉默者的回声", "Voices from the Silent"),
    cta: l("进入职业展览", "Enter the Exhibition")
  },
  archive: {
    title: l("展览", "Exhibition"),
    subtitle: l(
      "已收录职业与正在衰败岗位的完整展览索引",
      "A complete exhibition index of departed and decaying professions"
    ),
    filterEyebrow: l("按状态筛选", "Filter by status"),
    sortEyebrow: l("排序方式", "Sort by"),
    all: l("全部", "All"),
    alphabetical: l("按名称", "Alphabetical"),
    timeline: l("按时间线", "Timeline"),
    tail: l("更多记录仍在被挖掘中……", "More records are still being unearthed…"),
    searchEyebrow: l("搜索", "Search"),
    searchPlaceholder: l("按名称或摘要关键词…", "Search by name or keywords…"),
    searchAriaLabel: l("搜索展览条目", "Search the exhibition list"),
    searchSubmit: l("搜索", "Search"),
    searchSuggestionsLabel: l("匹配的职业", "Matching professions"),
    searchClearAriaLabel: l("清空搜索框", "Clear search field"),
    searchNoSuggestions: l("无匹配项", "No matches"),
    emptyResults: l(
      "没有匹配当前筛选与关键词的职业。",
      "No professions match the current filters and search."
    ),
    paginationPrev: l("上一页", "Previous"),
    paginationNext: l("下一页", "Next"),
    paginationNavAria: l("展览分页", "Exhibition pagination"),
    paginationSummary: l("第 {from}–{to} 条，共 {total} 条", "Showing {from}–{to} of {total}"),
    paginationPageStatus: l("第 {page} / {totalPages} 页", "Page {page} of {totalPages}")
  },
  detail: {
    statusEyebrow: l("状态", "Status"),
    timelineEyebrow: l("衰落轨迹", "Timeline"),
    profileEyebrow: l("职业讣告", "Obituary"),
    factorsEyebrow: l("消逝因素", "Factors"),
    voicesEyebrow: l("悼词节录", "Memorial Excerpts"),
    relatedEyebrow: l("同病相怜", "Similar Fates"),
    memorialCta: l("祭奠此职业", "Memorialize this profession"),
    memorialVoicesBlurb: l(
      "若你也曾亲历这份职业的消逝，可在此撰写悼词，经邮箱提交至项目收件箱。",
      "If you lived through this profession's decline, you can draft a memorial here and submit it by email."
    )
  },
  memorial: {
    title: l("祭奠", "Memorial"),
    channelEyebrow: l("投稿渠道", "Channel"),
    channelValue: l("邮箱投稿", "Email Submission"),
    noticeEyebrow: l("投稿说明", "Submission Note"),
    noticeText: l(
      "当前版本不提供在线留言存储。你可以在这里祭奠已收录职业，也可以为尚未收录的新职业提交带悼词的投稿邮件；如果邮件客户端没有自动打开，你仍可手动复制邮箱、主题和正文发送。",
      "This version does not store submissions online. Here you can memorialize an archived profession or submit a new profession with an accompanying memorial by email; if your mail client does not open automatically, you can still copy the address, subject, and body manually."
    ),
    switcherLabel: l("祭奠模式切换", "Memorial mode switcher"),
    modes: {
      existing: {
        tabLabel: l("祭奠已收录职业", "Memorialize Archived Profession"),
        introEyebrow: l("已收录职业祭奠示例", "Archived Profession Memorial Example"),
        introText: l(
          "基于已收录职业的祭奠样本。用于给既有职业档案补充一段带署名的告别。",
          "A memorial sample for a profession already in the archive. Use it to add a signed farewell to an existing career record."
        ),
        formHeading: l("留下悼词", "Leave a Memorial"),
        description: l(
          "为已收录职业留下悼词，系统会生成一封祭奠邮件供你发送。",
          "Leave a memorial for an already archived profession and the page will prepare an email draft for you."
        ),
        careerLabel: l("选择职业", "Career"),
        signatureLabel: l("署名", "Signature"),
        signaturePlaceholder: l("匿名 / 你的职业身份", "Anonymous / your role"),
        textLabel: l("悼词正文", "Memorial Text"),
        textPlaceholder: l(
          "写下你对这个消逝职业的最后告别……",
          "Write your final goodbye to this disappearing profession…"
        ),
        validationHint: l(
          "请至少填写署名与悼词后再生成邮件。",
          "Fill in at least the signature and memorial before generating the email."
        ),
        submitLabel: l("生成祭奠邮件", "Generate Memorial Email"),
        curatedEyebrow: l("已收录职业祭奠示例", "Archived Profession Memorial Examples"),
        curatedNote: l(
          "以下内容为静态示例，用于展示已收录职业的祭奠语气，并非当前访客的实时投稿。",
          "The entries below are static examples showing the tone for memorializing archived professions. They are not live visitor submissions."
        )
      },
      unlisted: {
        tabLabel: l("新增职业投稿", "Submit New Profession"),
        introEyebrow: l("新增职业投稿示例", "New Profession Submission Example"),
        introText: l(
          "为尚未收录的职业补充简介与悼词，让维护者能判断它是否应被纳入后续展览。",
          "Add a short introduction and memorial for an unlisted profession so the maintainers can assess whether it belongs in a future exhibition update."
        ),
        formHeading: l("提名并祭奠新职业", "Nominate and Memorialize a New Profession"),
        description: l(
          "这是“新增职业 + 悼词”一起提交的入口。请写清职业名称、职业简介与悼词，系统会生成一封结构化投稿邮件。",
          "This mode submits a new profession and a memorial together. Provide the profession name, a short introduction, and the memorial, and the page will prepare a structured submission email."
        ),
        careerNameLabel: l("职业名称", "Profession Name"),
        careerNamePlaceholder: l("例如：AI 标注审核员", "For example: AI Annotation Reviewer"),
        careerIntroLabel: l("职业简介", "Profession Introduction"),
        careerIntroPlaceholder: l(
          "用一两句话说明这个职业在做什么，以及它为什么值得被记录。",
          "Use one or two sentences to explain what this profession does and why it deserves to be recorded."
        ),
        signatureLabel: l("署名", "Signature"),
        signaturePlaceholder: l("匿名 / 你的职业身份", "Anonymous / your role"),
        textLabel: l("悼词正文", "Memorial Text"),
        textPlaceholder: l(
          "写下你对这个新职业样本的悼词，或它正在消逝的原因。",
          "Write a memorial for this new profession sample, or explain how it is disappearing."
        ),
        referencesLabel: l("参考资料（选填）", "References (Optional)"),
        referencesPlaceholder: l(
          "可粘贴链接、报告名或案例线索。",
          "Paste links, report names, or case references if you have them."
        ),
        validationHint: l(
          "请先填写职业名称、职业简介、署名与悼词后再生成邮件。",
          "Fill in the profession name, introduction, signature, and memorial before generating the email."
        ),
        submitLabel: l("生成投稿邮件", "Generate Submission Email"),
        curatedEyebrow: l("新增职业投稿示例", "New Profession Submission Examples"),
        curatedNote: l(
          "以下内容为静态示例，用于展示“职业简介 + 悼词”的投稿格式，并非当前访客的实时投稿。",
          "The entries below are static examples showing the expected format for a new profession submission with an introduction and memorial. They are not live visitor submissions."
        )
      }
    },
    fallbackTitle: l("手动发送", "Manual Fallback"),
    fallbackBody: l(
      "如果系统没有自动打开你的邮件客户端，请复制下面的邮箱、主题和正文内容后手动发送。",
      "If your system does not open a mail client automatically, copy the address, subject, and body below and send the message manually."
    ),
    fallbackHint: l(
      "邮箱、主题和正文预览会随着你填写内容实时更新；按钮会在必填项齐全后启用。",
      "The address, subject, and message preview update live as you edit the form, and the button only becomes active after the required fields are complete."
    ),
    emailLabel: l("邮箱", "Email"),
    subjectLabel: l("主题预览", "Subject Preview"),
    bodyLabel: l("正文预览", "Body Preview")
  },
  memorialEmail: {
    subjectPrefix: l("[职业墓场祭奠投稿]", "[Career Graveyard Memorial]"),
    bodyTemplate: l(
      ["职业：{career}", "署名：{signature}", "悼词：{text}", "来源页面：祭奠页"].join("\n"),
      [
        "Career: {career}",
        "Signature: {signature}",
        "Memorial: {text}",
        "Source page: Memorial"
      ].join("\n")
    ),
    emptySignature: l("匿名", "Anonymous"),
    emptyText: l("（请在这里写下你的悼词）", "(Write your memorial text here)")
  },
  contactEmail: {
    subjectPrefix: l("[职业墓场新增职业投稿]", "[Career Graveyard Submission]"),
    bodyTemplate: l(
      [
        "职业名称：{career}",
        "职业简介：{introduction}",
        "悼词：{text}",
        "署名：{signature}",
        "{referencesBlock}",
        "来源页面：祭奠页"
      ].join("\n"),
      [
        "Profession name: {career}",
        "Profession introduction: {introduction}",
        "Memorial: {text}",
        "Signature: {signature}",
        "{referencesBlock}",
        "Source page: Memorial"
      ].join("\n")
    ),
    referencesLabel: l("参考资料", "References"),
    emptySignature: l("匿名", "Anonymous"),
    emptyText: l("（请在这里写下你的悼词）", "(Write your memorial text here)"),
    emptyIntroduction: l(
      "（请在这里简要介绍这个职业）",
      "(Briefly introduce this profession here)"
    ),
    manualCopyHint: l(
      "新增职业与祭奠留言目前都通过项目邮箱处理。",
      "New profession suggestions and memorial submissions are currently handled through the project inbox."
    )
  },
  notFound: {
    eyebrow: l("404 / 未找到", "404 / Not Found"),
    heading: l("这座墓碑暂未找到", "This Tombstone Could Not Be Found"),
    body: l(
      "你访问的页面不存在，或者对应职业尚未被正式收入职业墓场。你可以返回展览继续浏览，也可以回到首页重新进入。",
      "The page you requested does not exist, or the related profession has not yet been formally included in the Career Graveyard exhibition. You can return to the exhibition or head back to the homepage."
    ),
    primaryLabel: l("返回展览", "Back to Exhibition"),
    secondaryLabel: l("回到首页", "Return Home"),
    detailTitle: l("未找到职业", "Career Not Found"),
    detailBodyTemplate: l(
      "没有找到 slug 为“{slug}”的职业条目。你可以返回展览继续浏览，或者从首页重新进入。",
      'No career entry was found for the slug "{slug}". You can return to the exhibition or go back to the homepage.'
    )
  },
  about: {
    heroEyebrow: l("关于项目", "Mission"),
    methodologyEyebrow: l("我们如何收录", "Methodology"),
    standardsEyebrow: l("当前判断维度", "Standards"),
    timelineEyebrow: l("项目简史", "Timeline"),
    contributorsEyebrow: l("这个版本包含什么", "This Version Includes"),
    supportEyebrow: l("支持这座墓园", "Support"),
    supportTitle: l("如果你愿意，可以为这座墓园添一束花。", "Support this archive."),
    supportBody: l(
      "你的支持会帮助新的职业档案、悼词与观察继续被写下去，也会让这座仍在扩建中的数字墓园有机会被维护得更久一点。",
      "Your support helps keep new entries, memorials, and observations alive."
    ),
    supportChannelNote: l(
      "你可以通过爱发电或 Ko-fi 支持这座墓园。",
      "You can support this archive through Afdian or Ko-fi."
    ),
    supportAfdianCta: l("通过爱发电支持", "Support via Afdian"),
    supportKofiCta: l("在 Ko-fi 上支持我", "Support on Ko-fi")
  },
  aboutInfo: {
    legal: {
      eyebrow: l("使用说明", "Legal"),
      title: l("它是一份公共叙事档案，不是职业裁决书", "This Is a Public-Facing Static Project"),
      paragraphs: [
        l(
          "职业墓场当前版本是一个公开展示的静态项目。这里的职业判断、状态标签和说明文字，目的是帮助人们讨论工作如何变化，而不是替任何人下最终结论。",
          "The current version of Career Graveyard is a public-facing static site. Its career judgments, status labels, and editorial notes exist to discuss changes in work, and should not be treated as legal, investment, employment, or education advice."
        ),
        l(
          "如果你在这里看到与你经历相似的职业描述，请把它视为一份观察样本、一种编辑立场，而不是对某个个人、公司或机构的盖棺定论。",
          "If you see a profession here that resembles your own experience, treat it as an observational archive rather than a final verdict on any individual, company, or institution."
        )
      ]
    },
    policy: {
      eyebrow: l("内容说明", "Policy"),
      title: l(
        "当前版本只做静态发布，不提供在线留言存储",
        "This Version Is Static and Does Not Store Live Submissions"
      ),
      paragraphs: [
        l(
          "站内的职业卡、时间线、项目说明和示例悼词都由维护者手动整理后发布。当前版本不接数据库，不保存在线投稿，也没有后台审核面板。",
          "Career cards, timelines, project notes, and static sample content are curated and published by the maintainers. This version does not connect to a database, does not store online submissions, and does not provide an admin review backend."
        ),
        l(
          "祭奠页现在既支持已收录职业祭奠，也支持未收录职业的提名式祭奠。这两类内容都会先进入项目邮箱，由维护者人工筛选、补充和整理，再决定是否进入后续的静态更新。",
          "The memorial page now supports both archived-profession memorials and nomination-style memorials for unlisted professions. Both kinds of submissions go to the project inbox first, where maintainers review, expand, and curate them before deciding whether to include them in later static updates."
        )
      ]
    },
    contact: {
      eyebrow: l("联系方式", "Contact"),
      title: l("投稿与协作入口", "Submissions and outreach"),
      paragraphs: [
        l(
          "如果你想给已收录职业留下悼词，或想为一个尚未收录的职业补充简介并发起投稿，请发送到项目邮箱：mahrovandrei@gmail.com。站点不会自动公开来稿，邮箱只是素材入口。",
          "If you want to leave a memorial for an archived profession, or introduce and submit an unlisted profession, send it to mahrovandrei@gmail.com. The site does not publish your submission automatically; the maintainers use the inbox as a raw material pool."
        ),
        l(
          "若你希望在代码、设计、文案、信息架构或测试方面提供支持，请先发送邮件说明意向与范围，维护者会视情况回复。",
          "If you can help with code, design, copy, information architecture, or testing, email first with your intent and scope—maintainers will respond when appropriate."
        )
      ],
      actions: [
        { label: l("邮箱投稿", "Email Submission"), href: `mailto:${siteMeta.contactEmail}` }
      ]
    }
  }
};

export const careers = [
  {
    slug: "graphic-designer",
    name: l("平面设计师", "Graphic Designer"),
    status: "unworthy",
    declineYear: 2023,
    slabHeight: 180,
    teaser: l(
      "人类在色彩与构图上的最后尊严，正被像素级算法无情拆解。",
      "Human dignity in color and composition is being dismantled by pixel-level algorithms."
    ),
    summary: l(
      "曾经被视为品牌审美守门人的岗位，在模板化工具、生成式模型与低价竞标的三重挤压下，逐渐失去议价权。",
      "Once treated as the gatekeeper of brand taste, this role is losing its leverage under the combined pressure of templates, generative models, and low-cost bidding."
    ),
    factors: [
      {
        title: l("技术降维", "Technical Compression"),
        text: l(
          "AI 不再需要繁琐的软件操作，意图理解取代了技能积累。",
          "AI no longer needs elaborate software rituals; intent interpretation is replacing accumulated craft."
        )
      },
      {
        title: l("价值归零", "Value Collapse"),
        text: l(
          "当输出成本接近零，创意劳动的商业溢价也随之崩塌。",
          "When output costs approach zero, the commercial premium on creative labor collapses with them."
        )
      },
      {
        title: l("审美趋同", "Aesthetic Convergence"),
        text: l(
          "大数据驱动的流行，让个体风格的生存空间被进一步压缩。",
          "Data-driven taste compresses the space where individual style can survive."
        )
      }
    ],
    timeline: [
      {
        year: same("2012"),
        title: l("黄金时代", "Golden Era"),
        text: l(
          "设计作为高门槛表达艺术，品牌愿意为风格与经验支付溢价。",
          "Design was still treated as a high-threshold expressive craft, and brands paid a premium for style and experience."
        )
      },
      {
        year: same("2018"),
        title: l("模板泛滥", "Template Flood"),
        text: l(
          "在线设计工具与廉价素材站兴起，审美逐渐工业化与同质化。",
          "Online design tools and bargain asset libraries pushed aesthetics toward industrial sameness."
        )
      },
      {
        year: same("2023"),
        title: l("算力入侵", "Compute Invasion"),
        text: l(
          "生成式 AI 爆发，像素级创意被秒级产出的算法彻底覆盖。",
          "Generative AI broke out, and pixel-level craft was covered over by second-scale algorithmic output."
        )
      }
    ],
    voices: [
      {
        author: l("前 4A 公司美术指导", "Former 4A Art Director"),
        date: same("2024.03.12"),
        text: l(
          "我花了十年学习如何掌控光影和色彩，结果现在只需要敲出几个关键词。那十年的努力，像是一场自作多情的告白。",
          "I spent ten years learning how to control light, shadow, and color. Now it takes only a few prompts. Those ten years feel like a confession nobody asked for."
        )
      },
      {
        author: l("自由职业插画师", "Freelance Illustrator"),
        date: same("2024.01.05"),
        text: l(
          "客户不再关心什么是好设计，他们只关心快。快意味着廉价，廉价意味着死亡。",
          "Clients no longer ask what good design is. They ask what is fast. Fast means cheap, and cheap means death."
        )
      }
    ]
  },
  {
    slug: "junior-translator",
    name: l("初级翻译", "Junior Translator"),
    status: "decaying",
    declineYear: 2024,
    slabHeight: 140,
    teaser: l(
      "语言不再是桥梁，而是被流水线加工的原始物料。",
      "Language is no longer a bridge, but raw material fed through an assembly line."
    ),
    summary: l(
      "机器翻译已经足以覆盖大量标准化文本，剩下的人工岗位逐渐滑向校对、润色与低价质检。",
      "Machine translation now covers vast amounts of standardized text, leaving human roles to slide toward proofreading, polish, and low-cost quality control."
    ),
    factors: [
      {
        title: l("自动化成熟", "Automation Maturity"),
        text: l(
          "通用翻译场景中的机器可读性已经超过大多数基础岗位。",
          "In many routine translation contexts, machine readability already exceeds what most entry roles can offer."
        )
      },
      {
        title: l("质量外包", "Quality Outsourcing"),
        text: l(
          "翻译从生产变成纠错，职业自尊被切成小时计费。",
          "Translation has shifted from production to correction, and professional dignity has been sliced into hourly billing."
        )
      },
      {
        title: l("语感稀释", "Erosion of Voice"),
        text: l(
          "追求速度的平台逻辑，让表达被压缩成可复制模板。",
          "Platforms optimized for speed compress expression into repeatable templates."
        )
      }
    ],
    timeline: [
      {
        year: same("2015"),
        title: l("外包繁荣", "Outsourcing Boom"),
        text: l(
          "跨境业务增长，入门级翻译需求旺盛。",
          "Cross-border business grew and demand for entry-level translation expanded with it."
        )
      },
      {
        year: same("2020"),
        title: l("平台压价", "Platform Price Compression"),
        text: l(
          "大批项目转入众包市场，计价被持续向下拉平。",
          "A growing share of projects moved into crowdsourced platforms, flattening rates downward."
        )
      },
      {
        year: same("2024"),
        title: l("机器主导", "Machine-Led"),
        text: l(
          "人工角色被限定为最终审校与情绪修正。",
          "Human work is increasingly confined to final review and tonal correction."
        )
      }
    ],
    voices: [
      {
        author: l("翻译从业者", "Working Translator"),
        date: same("2024.03.12"),
        text: l(
          "翻译不再是信达雅的博弈，而是对模型输出的纠偏。我们从跨越文明的信使，变成给 AI 打工的质检员。",
          "Translation is no longer a game of fidelity and grace. It is error correction on model output. We have gone from messengers between cultures to quality inspectors for AI."
        )
      }
    ]
  },
  {
    slug: "cram-school-teacher",
    name: l("教培名师", "Star Tutor"),
    status: "frozen",
    declineYear: 2021,
    slabHeight: 180,
    teaser: l(
      "知识的殿堂在一夜之间变成了沉默的废墟。",
      "The halls of knowledge turned into silent ruins overnight."
    ),
    summary: l(
      "政策转向与在线智能辅导并行，明星教师模式被切断，行业被封存在一段骤然中止的时代叙事里。",
      "Policy shifts and online tutoring systems severed the star-teacher model, freezing the industry inside an abruptly interrupted historical arc."
    ),
    factors: [
      {
        title: l("监管冻结", "Regulatory Freeze"),
        text: l(
          "政策骤变直接切断商业模式，职业生态瞬间塌陷。",
          "A sudden policy turn cut through the business model and collapsed the profession overnight."
        )
      },
      {
        title: l("在线替身", "Online Substitutes"),
        text: l(
          "直播课与智能题库让标准化辅导失去线下稀缺性。",
          "Livestream classes and intelligent exercise banks stripped standardized tutoring of its offline scarcity."
        )
      },
      {
        title: l("信任断裂", "Trust Fracture"),
        text: l(
          "家长从追逐名师转向追逐系统化提分工具。",
          "Parents moved from chasing star tutors to chasing systematic score-raising tools."
        )
      }
    ],
    timeline: [
      {
        year: same("2016"),
        title: l("扩张", "Expansion"),
        text: l(
          "名师个人品牌带动机构规模化复制。",
          "Celebrity tutors drove large-scale institutional replication."
        )
      },
      {
        year: same("2020"),
        title: l("线上加速", "Online Acceleration"),
        text: l(
          "直播和录播成为新的主战场。",
          "Livestreams and recorded lessons became the new core battleground."
        )
      },
      {
        year: same("2021"),
        title: l("戛然而止", "Abrupt Halt"),
        text: l(
          "整条赛道进入冻结状态，个体声望无处安放。",
          "The entire sector entered a frozen state, leaving individual prestige with nowhere to land."
        )
      }
    ],
    voices: [
      {
        author: l("某数学主讲老师", "Former Math Lecturer"),
        date: same("2024.03.18"),
        text: l(
          "孩子们也许还会记得那些周五晚上的热闹，但传授知识这件事，已经不再需要我们这些人的温度。",
          "The children may still remember those packed Friday nights, but the act of teaching no longer seems to require our human warmth."
        )
      }
    ]
  },
  {
    slug: "content-editor",
    name: l("内容编辑", "Content Editor"),
    status: "endangered",
    declineYear: 2024,
    slabHeight: 160,
    teaser: l(
      "当算法决定了阅读，文字便失去了它的灵魂与呼吸。",
      "When algorithms decide what gets read, text loses its soul and breath."
    ),
    summary: l(
      "内容生产仍然存在，但编辑从结构与判断的中枢，退化为流量阈值下的即时排版与修改接口。",
      "Content still gets produced, but editors have been demoted from structural decision-makers to rapid formatting and adjustment endpoints under traffic pressure."
    ),
    factors: [
      {
        title: l("平台喂养", "Platform Feeding"),
        text: l(
          "选题与标题越发由平台算法而非编辑判断驱动。",
          "Topics and headlines are increasingly driven by platform logic rather than editorial judgment."
        )
      },
      {
        title: l("供给过剩", "Supply Overflow"),
        text: l(
          "生成式内容让基础编辑岗位陷入无限竞争。",
          "Generative content has thrown basic editorial roles into an endless field of competition."
        )
      },
      {
        title: l("价值错位", "Mispriced Value"),
        text: l(
          "深度与耐心无法在短期点击回报中体现。",
          "Depth and patience do not register inside short-term click economics."
        )
      }
    ],
    timeline: [
      {
        year: same("2018"),
        title: l("内容热潮", "Content Boom"),
        text: l(
          "编辑被视为内容工业中的关键调度者。",
          "Editors were still treated as central coordinators inside the content economy."
        )
      },
      {
        year: same("2022"),
        title: l("爆款公式", "Formula Era"),
        text: l(
          "平台偏好把审美与节奏压成统一范式。",
          "Platform preference compressed taste and pacing into a narrow formula."
        )
      },
      {
        year: same("2024"),
        title: l("文本流水线", "Text Assembly Line"),
        text: l(
          "编辑的角色变成对模板化内容进行最终投喂。",
          "Editorial work became the final feeding stage for templated content."
        )
      }
    ],
    voices: [
      {
        author: l("匿名内容运营", "Anonymous Content Operator"),
        date: same("2024.03.15"),
        text: l(
          "算法根据点击率切碎了文章，灵魂在 Feed 流中被无声湮没。如果字数决定了价值，那思考本身便是多余。",
          "Algorithms chopped articles into click-sized fragments. Their soul drowned in the feed. If word count determines value, then thought itself becomes excess."
        )
      }
    ]
  },
  {
    slug: "bank-teller",
    name: l("银行柜员", "Bank Teller"),
    status: "obsolete",
    declineYear: 2019,
    slabHeight: 180,
    teaser: l(
      "冰冷的数字屏幕，彻底取代了那层玻璃后的体温。",
      "Cold digital screens have replaced the warmth once felt behind the glass."
    ),
    summary: l(
      "网银、自助机与远程服务把面对面金融服务变成残留仪式，岗位被留在正在撤离的支行里。",
      "Mobile banking, kiosks, and remote service turned face-to-face finance into a residual ritual, leaving the role behind in branches already being withdrawn."
    ),
    factors: [
      {
        title: l("服务迁移", "Service Migration"),
        text: l(
          "绝大多数高频业务已被移动端和自助机吸收。",
          "Most high-frequency transactions have already been absorbed by mobile and self-service channels."
        )
      },
      {
        title: l("成本淘汰", "Cost Elimination"),
        text: l(
          "实体网点被要求极限瘦身，柜台成为最先被压缩的成本。",
          "Physical branches are pushed into radical downsizing, and counters are among the first costs to be cut."
        )
      },
      {
        title: l("接触消失", "Disappearing Contact"),
        text: l(
          "金融服务从关系转向接口，人的存在感被抹平。",
          "Finance shifted from relationship to interface, flattening the human presence out of the service."
        )
      }
    ],
    timeline: [
      {
        year: same("2010"),
        title: l("排队大厅", "Queue Hall"),
        text: l(
          "柜台仍是个人金融体验的核心入口。",
          "The counter was still the main entry point into personal banking."
        )
      },
      {
        year: same("2016"),
        title: l("App 成熟", "App Maturity"),
        text: l(
          "移动支付与手机银行改写交易习惯。",
          "Mobile payments and banking apps rewrote everyday transaction habits."
        )
      },
      {
        year: same("2019"),
        title: l("柜台退场", "Counter Exit"),
        text: l(
          "线下被保留为兜底方案，而不再是默认服务。",
          "Offline service remained only as a fallback, no longer the default."
        )
      }
    ],
    voices: [
      {
        author: l("前柜面主管", "Former Counter Supervisor"),
        date: same("2023.12.04"),
        text: l(
          "我们原本以为在处理数字，后来才发现自己也只是更大系统里可替换的一格。",
          "We thought we were handling numbers. In the end, we discovered that we were just another replaceable square inside a much larger system."
        )
      }
    ]
  },
  {
    slug: "traditional-reporter",
    name: l("传统记者", "Traditional Reporter"),
    status: "obsolete",
    declineYear: 2022,
    slabHeight: 220,
    teaser: l(
      "现场的尘土早已远去，只剩下公关稿的寂静回声。",
      "The dust of the scene is long gone, leaving only the quiet echo of press releases."
    ),
    summary: l(
      "发布速度压倒了现场感，深度采访被压缩到无法维持的时间与预算中，记者逐渐变成转述接口。",
      "Publishing speed overran field presence. Deep reporting was compressed beyond sustainable time and budget, and reporters drifted toward becoming relay interfaces."
    ),
    factors: [
      {
        title: l("事实外包", "Facts Outsourced"),
        text: l(
          "平台与机构供稿替代了一线采访的成本结构。",
          "Platform feeds and institutional materials replaced the cost structure of frontline reporting."
        )
      },
      {
        title: l("节奏失控", "Rhythm Collapse"),
        text: l(
          "新闻速度战让调查性报道没有生长空间。",
          "The speed war in news left no room for investigative work to grow."
        )
      },
      {
        title: l("信任流失", "Trust Drain"),
        text: l(
          "读者更早接触原始碎片，职业中介价值被削弱。",
          "Readers reached raw fragments sooner, weakening the reporter’s mediating value."
        )
      }
    ],
    timeline: [
      {
        year: same("2008"),
        title: l("纸媒惯性", "Print Momentum"),
        text: l(
          "职业记者仍拥有稳定的机构支持与身份光环。",
          "Professional reporters still had stable institutional backing and a degree of public authority."
        )
      },
      {
        year: same("2016"),
        title: l("平台时代", "Platform Era"),
        text: l(
          "信息分发被算法平台主导，采写关系被重新切割。",
          "Information distribution fell under platform control, recutting the relationship between reporting and reading."
        )
      },
      {
        year: same("2022"),
        title: l("残响", "Afterimage"),
        text: l(
          "大量岗位退回到品牌内容与二次编译。",
          "Many roles retreated into branded content and second-hand compilation."
        )
      }
    ],
    voices: [
      {
        author: l("前都市报记者", "Former Metro Reporter"),
        date: same("2024.02.09"),
        text: l(
          "我怀念采访本上的笔迹。如今发生的一切像先天就被压扁成了标题。",
          "I miss the handwriting on my reporting notebook. Now everything seems born already flattened into a headline."
        )
      }
    ]
  }
];

careers.push(
  {
    slug: "architectural-drafter",
    name: l("建筑绘图员", "Architectural Drafter"),
    status: "decaying",
    declineYear: 2024,
    slabHeight: 120,
    teaser: l(
      "线条不再需要情感，只需要更快的自动补全。",
      "Lines no longer need emotion. They only need faster auto-complete."
    ),
    summary: l(
      "参数化建模、自动出图与标准构件库，正在削弱重复绘图岗位存在的理由。",
      "Parametric modeling, automated drafting, and standard component libraries are eroding the rationale for repetitive drawing roles."
    ),
    factors: [
      {
        title: l("参数生成", "Parametric Generation"),
        text: l(
          "标准图纸由规则自动展开，人工调整需求下降。",
          "Standard drawings now unfold automatically from rules, reducing the need for manual adjustment."
        )
      },
      {
        title: l("模型优先", "Model First"),
        text: l(
          "从二维制图向模型协作迁移，基础岗位被挤压。",
          "As workflows shift from 2D drafting to model collaboration, foundational roles are squeezed out."
        )
      },
      {
        title: l("精度替代", "Precision Replacement"),
        text: l(
          "软件的稳定产出比人的疲劳更容易管理。",
          "A stable software output is easier to manage than human fatigue."
        )
      }
    ],
    timeline: [
      {
        year: same("2014"),
        title: l("二维主导", "2D Dominance"),
        text: l(
          "大量事务所依赖人工出图与细部修订。",
          "Many studios still relied on manual drawing and detailed revision."
        )
      },
      {
        year: same("2021"),
        title: l("BIM 普及", "BIM Adoption"),
        text: l(
          "工作开始从画线变成维护标准化信息。",
          "The work began shifting from drawing lines to maintaining standardized information."
        )
      },
      {
        year: same("2024"),
        title: l("脚本接管", "Script Takeover"),
        text: l(
          "可重复的线稿任务被自动流程吞没。",
          "Repeatable drafting tasks were swallowed by automated pipelines."
        )
      }
    ],
    voices: [
      {
        author: l("施工图绘图员", "Construction Drawing Drafter"),
        date: same("2024.02.17"),
        text: l(
          "我们曾靠细节吃饭，后来发现系统比人更愿意一遍又一遍地画线。",
          "We used to live off detail. Then we discovered that systems are far more willing than people to draw the same line again and again."
        )
      }
    ]
  },
  {
    slug: "community-group-buyer",
    name: l("社区团购员", "Community Group Buyer"),
    status: "unworthy",
    declineYear: 2023,
    slabHeight: 115,
    teaser: l(
      "流量与补贴散去后，剩下的只是无法结算的辛劳。",
      "Once traffic and subsidies evaporate, only unpaid exhaustion remains."
    ),
    summary: l(
      "平台退潮后，最后一公里的临时职业被迅速抛弃，人与社区之间的关系也随之蒸发。",
      "When platforms retreated, this last-mile temporary profession was quickly discarded, and the social bond between people and neighborhood dissolved with it."
    ),
    factors: [
      {
        title: l("平台退场", "Platform Exit"),
        text: l(
          "补贴结束后，整个岗位失去存在前提。",
          "Once subsidies ended, the role lost the condition that made it possible."
        )
      },
      {
        title: l("关系断裂", "Broken Ties"),
        text: l(
          "社区熟人网络被平台效率短暂借用后又抛弃。",
          "Neighborhood trust networks were briefly borrowed by platform efficiency and then abandoned."
        )
      },
      {
        title: l("劳动碎片", "Fragmented Labor"),
        text: l(
          "收入被拆成碎片，难以支撑稳定职业身份。",
          "Income fragmented into pieces too small to sustain a stable professional identity."
        )
      }
    ],
    timeline: [
      {
        year: same("2020"),
        title: l("极速膨胀", "Rapid Expansion"),
        text: l(
          "依靠补贴与流量，岗位在社区密集出现。",
          "Fueled by subsidies and traffic, the role spread rapidly through neighborhoods."
        )
      },
      {
        year: same("2022"),
        title: l("补贴收缩", "Subsidy Retrenchment"),
        text: l(
          "平台开始选择性撤退，留下一地散碎劳动。",
          "Platforms began retreating selectively, leaving fragmented work behind."
        )
      },
      {
        year: same("2023"),
        title: l("价值蒸发", "Value Evaporates"),
        text: l(
          "职业本身失去长期存在的商业逻辑。",
          "The profession itself lost any long-term commercial logic."
        )
      }
    ],
    voices: [
      {
        author: l("团长", "Community Group Lead"),
        date: same("2023.11.28"),
        text: l(
          "当补贴停了，群还在，人却散了。原来所谓新职业只是一个促销窗口。",
          "When the subsidies stopped, the chat groups remained but the people scattered. The so-called new profession turned out to be only a promotional window."
        )
      }
    ]
  },
  {
    slug: "junior-programmer",
    name: l("初级程序员", "Junior Programmer"),
    status: "endangered",
    declineYear: 2025,
    slabHeight: 105,
    teaser: l(
      "逻辑正在被逻辑自身吞噬，入门门槛被重新定义。",
      "Logic is being consumed by logic itself, and the entry threshold is being rewritten."
    ),
    summary: l(
      "会写基础 CRUD 已不再稀缺，模型辅助开发正在抬高新人的有效门槛。",
      "Basic CRUD skills are no longer scarce, and model-assisted development is raising the effective threshold for newcomers."
    ),
    factors: [
      {
        title: l("能力重估", "Capability Repriced"),
        text: l(
          "企业需要的是能驾驭系统的人，而不是会补齐模板的人。",
          "Companies now want people who can steer systems, not just fill in templates."
        )
      },
      {
        title: l("自动生成", "Automatic Generation"),
        text: l(
          "基础代码生成让初级重复性任务大量缩减。",
          "Automatic code generation has sharply reduced the volume of repetitive junior work."
        )
      },
      {
        title: l("竞争外溢", "Overflowing Competition"),
        text: l(
          "全球化远程供给加剧了入门岗位拥挤。",
          "Global remote labor has intensified overcrowding at the entry level."
        )
      }
    ],
    timeline: [
      {
        year: same("2019"),
        title: l("扩招", "Mass Hiring"),
        text: l(
          "培训班与校招共同输送大量初级开发者。",
          "Bootcamps and campus hiring together produced a wave of junior developers."
        )
      },
      {
        year: same("2023"),
        title: l("Copilot 普及", "Copilot Spread"),
        text: l(
          "基础编码速度被工具极大压缩。",
          "Tools dramatically compressed the time needed for basic coding."
        )
      },
      {
        year: same("2025"),
        title: l("门槛抬升", "Raised Bar"),
        text: l(
          "公司更看重系统理解、产品抽象与调度能力。",
          "Firms increasingly value system thinking, product abstraction, and orchestration ability."
        )
      }
    ],
    voices: [
      {
        author: l("应届开发者", "Graduate Developer"),
        date: same("2025.01.18"),
        text: l(
          "我学会了语法，但岗位要求我先学会如何与机器一起工作。",
          "I learned the syntax, but the job now asks me to learn how to work with machines before I can work at all."
        )
      }
    ]
  },
  {
    slug: "ecommerce-support",
    name: l("电商客服", "E-commerce Support Agent"),
    status: "obsolete",
    declineYear: 2022,
    slabHeight: 130,
    teaser: l(
      "预设话术的空洞回响，终于覆盖了真人安抚的温度。",
      "The hollow echo of scripted replies has finally smothered the warmth of real reassurance."
    ),
    summary: l(
      "聊天机器人和工单系统把高频客服场景彻底流程化，人工客服只在失控时短暂出现。",
      "Chatbots and ticket systems have fully proceduralized high-volume service scenarios, leaving human agents to appear only when the system fails."
    ),
    factors: [
      {
        title: l("回复模板化", "Reply Templating"),
        text: l(
          "大量咨询都能由规则与机器人覆盖。",
          "A large share of inquiries can now be covered by rules and bots."
        )
      },
      {
        title: l("情绪最小化", "Emotion Minimized"),
        text: l(
          "平台优化的是关闭工单速度，而不是理解顾客情绪。",
          "Platforms optimize for ticket closure speed, not emotional understanding."
        )
      },
      {
        title: l("人力压缩", "Human Compression"),
        text: l(
          "人工被保留为升级通道，而不再是主要触点。",
          "Human labor remains only as an escalation path, no longer the main point of contact."
        )
      }
    ],
    timeline: [
      {
        year: same("2017"),
        title: l("旺季战争", "Peak-Season Battles"),
        text: l(
          "大促期间的人工客服仍是成交关键环节。",
          "During shopping festivals, human support still played a crucial role in closing sales."
        )
      },
      {
        year: same("2020"),
        title: l("机器人常态化", "Bots Become Normal"),
        text: l(
          "自动应答开始接管主流程。",
          "Automated replies began taking over the main service flow."
        )
      },
      {
        year: same("2022"),
        title: l("人工退居后台", "Humans Step Back"),
        text: l(
          "真人客服成为故障补丁，而非服务本体。",
          "Human agents became a patch for failures rather than the service itself."
        )
      }
    ],
    voices: [
      {
        author: l("客服主管", "Customer Support Lead"),
        date: same("2024.01.08"),
        text: l(
          "我们不再被要求理解用户，只被要求在更短时间里关闭更多窗口。",
          "We are no longer asked to understand users. We are only asked to close more windows in less time."
        )
      }
    ]
  },
  {
    slug: "newspaper-editor",
    name: l("报刊编辑", "Newspaper Editor"),
    status: "obsolete",
    declineYear: 2020,
    slabHeight: 145,
    teaser: l(
      "印刷机的最后叹息，被一块发光的屏幕轻轻盖住。",
      "The printing press gave one last sigh before a glowing screen quietly covered it."
    ),
    summary: l(
      "排版、标题与版面节奏的职业技艺，在纸媒收缩与数字即时分发前逐渐失去舞台。",
      "The craft of layout, headline writing, and page rhythm gradually lost its stage as print contracted and digital instant distribution took over."
    ),
    factors: [
      {
        title: l("版面消失", "Page Disappears"),
        text: l(
          "屏幕分发打散了纸面的整体叙事。",
          "Screen-based distribution broke apart the unified narrative of the printed page."
        )
      },
      {
        title: l("周期坍缩", "Cycle Collapse"),
        text: l(
          "日报与周刊节奏无法匹配实时推送逻辑。",
          "Daily and weekly publishing rhythms could not keep pace with real-time distribution."
        )
      },
      {
        title: l("工艺失效", "Craft Devalued"),
        text: l(
          "版式功夫不再构成商业竞争优势。",
          "Layout craftsmanship no longer counts as a meaningful commercial edge."
        )
      }
    ],
    timeline: [
      {
        year: same("2010"),
        title: l("版面秩序", "Page Order"),
        text: l(
          "纸面仍然掌握公众阅读节奏。",
          "Print still controlled the public rhythm of reading."
        )
      },
      {
        year: same("2017"),
        title: l("转向屏幕", "Shift to Screen"),
        text: l(
          "大量内容先为移动端写作，后为纸面裁剪。",
          "Much of the content was first written for mobile, then trimmed for print."
        )
      },
      {
        year: same("2020"),
        title: l("出版残响", "Publishing Afterimage"),
        text: l(
          "编辑从职业主体退到文化记忆。",
          "Editing slipped from a living profession into cultural memory."
        )
      }
    ],
    voices: [
      {
        author: l("资深版编", "Senior Page Editor"),
        date: same("2023.10.30"),
        text: l(
          "我曾经为一个标题挪半毫米的位置，现在谁也不再关心这一页是否还存在。",
          "I once moved a headline by half a millimeter. Now nobody cares whether the page itself still exists."
        )
      }
    ]
  },
  {
    slug: "offline-tour-guide",
    name: l("线下导游", "Offline Tour Guide"),
    status: "frozen",
    declineYear: 2020,
    slabHeight: 110,
    teaser: l(
      "风景先被录成素材，后来被压缩成路线模板。",
      "Landscapes were first captured as material, then compressed into route templates."
    ),
    summary: l(
      "旅行推荐、AI 语音讲解与标准化路线包，正在让导游的即时讲述能力被边缘化。",
      "Travel recommendation engines, AI audio guides, and standardized route packages are pushing the guide’s live storytelling ability to the margins."
    ),
    factors: [
      {
        title: l("路线模板", "Route Templates"),
        text: l(
          "平台把旅程拆成可购买、可复制的固定产品。",
          "Platforms break the trip into fixed, purchasable, repeatable products."
        )
      },
      {
        title: l("讲解替换", "Narration Replacement"),
        text: l(
          "语音导览与 AR 解释弱化了人的在场价值。",
          "Audio guides and AR interpretation weaken the value of a human presence."
        )
      },
      {
        title: l("波动巨大", "Extreme Volatility"),
        text: l(
          "行业对外部环境极度敏感，职业稳定性极弱。",
          "The sector is highly exposed to external shocks, leaving almost no professional stability."
        )
      }
    ],
    timeline: [
      {
        year: same("2015"),
        title: l("跟团仍稳", "Group Tours Hold"),
        text: l(
          "线下导游在集体旅行中仍具稳定需求。",
          "Offline guides still held steady demand inside group travel."
        )
      },
      {
        year: same("2020"),
        title: l("行业停摆", "Industry Halt"),
        text: l(
          "外部冲击让大量导游离开原本的工作链条。",
          "External shocks pushed many guides out of the work chain altogether."
        )
      },
      {
        year: same("2024"),
        title: l("数字讲解", "Digital Narration"),
        text: l(
          "重新恢复的旅行已不再需要同样数量的人。",
          "Travel returned, but it no longer needed the same number of people."
        )
      }
    ],
    voices: [
      {
        author: l("前导游", "Former Tour Guide"),
        date: same("2024.02.03"),
        text: l(
          "我曾靠讲故事带队走路，后来故事被压进耳机里，而我被留在景点门口。",
          "I used to lead groups by telling stories. Then the stories were compressed into headphones, and I was left at the gate."
        )
      }
    ]
  },
  {
    slug: "wedding-photographer",
    name: l("婚庆摄影", "Wedding Photographer"),
    status: "unworthy",
    declineYear: 2024,
    slabHeight: 125,
    teaser: l(
      "滤镜越来越完美，真实的劳动却越来越廉价。",
      "Filters grow more perfect while real labor grows cheaper by the day."
    ),
    summary: l(
      "拍摄不再稀缺，后期模板、短视频偏好与成本竞争，使这类职业加速滑向低价化。",
      "Shooting is no longer scarce. Post-production templates, short-form video preferences, and cost competition are pushing the profession rapidly toward commoditization."
    ),
    factors: [
      {
        title: l("设备普及", "Equipment Ubiquity"),
        text: l(
          "门槛降低后，大量低价供给涌入市场。",
          "As equipment barriers fell, low-cost supply flooded the market."
        )
      },
      {
        title: l("后期模板", "Post-Production Templates"),
        text: l(
          "统一滤镜与流水线修图让个体审美难以溢价。",
          "Standardized filters and assembly-line retouching made individual taste hard to price above the floor."
        )
      },
      {
        title: l("需求缩短", "Compressed Demand"),
        text: l(
          "纪念性消费被压缩成更快、更短、更可分享的内容。",
          "Commemorative consumption shrank into faster, shorter, more shareable content."
        )
      }
    ],
    timeline: [
      {
        year: same("2016"),
        title: l("风格崛起", "Style Ascends"),
        text: l(
          "婚礼影像被视为可长期留存的情绪纪念。",
          "Wedding imagery was treated as an emotional record meant to last."
        )
      },
      {
        year: same("2021"),
        title: l("短视频主导", "Short Video Leads"),
        text: l(
          "需求从完整记录转向即时传播素材。",
          "Demand moved from full documentation toward instantly shareable material."
        )
      },
      {
        year: same("2024"),
        title: l("价格塌缩", "Price Collapse"),
        text: l(
          "劳动密度仍高，市场支付意愿却持续走低。",
          "Labor intensity stayed high while willingness to pay continued to fall."
        )
      }
    ],
    voices: [
      {
        author: l("独立摄影师", "Independent Photographer"),
        date: same("2024.01.21"),
        text: l(
          "我越来越像一个素材供应商，而不是替别人留下时间的人。",
          "I increasingly feel like a raw-material supplier instead of someone who preserves time for other people."
        )
      }
    ]
  },
  {
    slug: "delivery-rider",
    name: l("外卖骑手", "Delivery Rider"),
    status: "decaying",
    declineYear: 2024,
    slabHeight: 135,
    teaser: l(
      "算法的秒表从未停下，而人只是在不断更换的制服里奔跑。",
      "The algorithmic stopwatch never stops; people just keep running in changing uniforms."
    ),
    summary: l(
      "这不是消失最快的职业，却是被系统最深度吞噬的职业之一，价值与风险始终高度失衡。",
      "This is not the fastest-disappearing profession, but it is among the ones most deeply consumed by the system, with value and risk permanently out of balance."
    ),
    factors: [
      {
        title: l("算法规训", "Algorithmic Discipline"),
        text: l(
          "每一次路线与时长都由系统决定。",
          "Every route and every minute is assigned by the system."
        )
      },
      {
        title: l("替代待命", "Replacement on Standby"),
        text: l(
          "无人配送与站点自动化已在边缘逼近。",
          "Autonomous delivery and station automation are already approaching from the edge."
        )
      },
      {
        title: l("身份脆弱", "Fragile Status"),
        text: l(
          "高强度劳动与弱保障并存，职业尊严难以建立。",
          "High-intensity labor and weak protection coexist, making dignity difficult to sustain."
        )
      }
    ],
    timeline: [
      {
        year: same("2018"),
        title: l("平台扩张", "Platform Expansion"),
        text: l(
          "即时配送成为城市基础设施。",
          "Instant delivery became part of urban infrastructure."
        )
      },
      {
        year: same("2022"),
        title: l("效率极限", "Efficiency Extreme"),
        text: l(
          "规则越来越细，个人越发像系统末梢。",
          "Rules became more granular, and individuals felt more like terminals of the system."
        )
      },
      {
        year: same("2024"),
        title: l("替代预演", "Replacement Rehearsal"),
        text: l(
          "自动配送技术开始从实验走向真实运营。",
          "Automated delivery began moving from experiment to real operations."
        )
      }
    ],
    voices: [
      {
        author: l("骑手", "Rider"),
        date: same("2024.02.26"),
        text: l(
          "导航每天都更聪明一点，我每天都只是更累一点。",
          "Navigation gets smarter every day. I only get more tired."
        )
      }
    ]
  },
  {
    slug: "data-annotator",
    name: l("数据标注", "Data Annotator"),
    status: "endangered",
    declineYear: 2025,
    slabHeight: 100,
    teaser: l(
      "喂养未来模型的最后燃料，最终也会被模型自己吞下。",
      "The final fuel feeding future models will eventually be consumed by the models themselves."
    ),
    summary: l(
      "作为 AI 基础设施的一部分，标注岗位正在被主动学习、合成数据和自动审查逐步稀释。",
      "As part of the AI infrastructure stack, annotation work is being diluted by active learning, synthetic data, and automated review."
    ),
    factors: [
      {
        title: l("自动标注", "Automatic Annotation"),
        text: l(
          "模型开始参与生成并校验训练数据。",
          "Models are starting to generate and validate their own training data."
        )
      },
      {
        title: l("隐形劳动", "Invisible Labor"),
        text: l(
          "岗位对系统关键，却被长期低价对待。",
          "The role is crucial to the system, yet consistently treated as low-value labor."
        )
      },
      {
        title: l("阶段性存在", "Transitional Existence"),
        text: l(
          "它被设计成一种过渡性职业，而非长期职业身份。",
          "It is designed as a transitional role rather than a long-term professional identity."
        )
      }
    ],
    timeline: [
      {
        year: same("2021"),
        title: l("需求激增", "Demand Surge"),
        text: l(
          "大模型训练扩张带来海量标注任务。",
          "Large-model training expansion created a huge wave of annotation tasks."
        )
      },
      {
        year: same("2024"),
        title: l("半自动化", "Semi-Automation"),
        text: l(
          "人工从主标注退向抽检与修正。",
          "Human workers shifted from primary annotation to spot checks and corrections."
        )
      },
      {
        year: same("2025"),
        title: l("自我取代", "Self-Replacement"),
        text: l(
          "模型开始吞掉自己成长路上的人工环节。",
          "Models began swallowing the human steps that helped them grow."
        )
      }
    ],
    voices: [
      {
        author: l("标注员", "Annotator"),
        date: same("2025.02.11"),
        text: l(
          "我在教会一个系统看世界，而它学会之后第一件事就是不再需要我。",
          "I am teaching a system how to see the world, and the first thing it will do after learning is stop needing me."
        )
      }
    ]
  }
);

export const homeQuote = {
  text: l(
    "在这个时代，如果你不能像机器一样精准，或者不能像机器一样廉价，你的职业便是一座正在倒塌的纪念碑。",
    "In this era, if you cannot be as precise as a machine, or as cheap as a machine, your career becomes a monument already falling down."
  ),
  author: l("匿名吊唁者", "Anonymous Tribute")
};

export const aboutData = {
  missionTitle: l(
    "在这个算法与效率至上的时代，我们记录那些正在消逝的职业灵魂。",
    "In this age of algorithms and efficiency above all else, we record the souls of professions now fading away."
  ),
  missionBody: l(
    "它不是职业预测器，也不是焦虑制造机，而是让那些正在无声退场的职业，也能拥有被记录、被阅读、被悼念的权利。",
    "It is neither a career predictor nor an anxiety machine, but a place where professions leaving the stage in silence may still claim the right to be recorded, read, and mourned."
  ),
  methodology: [
    {
      title: l("01 / 看核心价值", "01 / Core Value"),
      text: l(
        "先判断这个职业最重要的部分是什么，再看它是否已经被标准化流程、平台模板或 AI 输出覆盖。",
        "Define whether the core value of a profession can be fully replaced by standardized prompts or production pipelines."
      )
    },
    {
      title: l("02 / 看入口变化", "02 / Entry Pressure"),
      text: l(
        "观察新人是否还能以合理成本进入、学习并获得成长空间，而不是一开始就被压进低价竞争。",
        "Track compensation trends and determine whether an irreversible slide toward commoditization has begun."
      )
    },
    {
      title: l("03 / 看议价能力", "03 / Bargaining Power"),
      text: l(
        "跟踪收入、稳定性、话语权和工作边界是否持续下滑，确认它是不是正在走向廉价化和可替换化。",
        "Study whether the emotional link between people is being taken over by cold interfaces."
      )
    },
    {
      title: l("04 / 看人的剩余价值", "04 / Human Residue"),
      text: l(
        "最后再看这个职业还剩下多少必须依赖人的判断、关系、经验与现场感；如果这些部分也在收缩，它就值得被立碑记录。",
        "Once a profession is confirmed to have entered an irreversible state, archive it as evidence of the age."
      )
    }
  ],
  standards: [
    { label: l("替代压力", "Replacement Pressure"), value: l("持续上升", "Rising") },
    { label: l("岗位入口", "Entry Path"), value: l("持续收缩", "Narrowing") },
    { label: l("议价能力", "Bargaining Power"), value: l("持续下滑", "Falling") },
    { label: l("人的不可替代部分", "Human Advantage"), value: l("正在收缩", "Shrinking") }
  ],
  timeline: [
    {
      date: l("2026.3 / 概念立项", "2026.3 / Origin"),
      text: l(
        "项目最初只是一个关于“哪些工作正在被悄悄抽空”的内部备忘录，后来才发展成公开站点。",
        "The project was started by three former creatives to document professional collapse in the age of large models."
      )
    },
    {
      date: l("2026.4 / 静态页面上线", "2026.4 / Static Launch"),
      text: l(
        "展览、详情、祭奠和关于页逐步成形，项目从概念表达转向可浏览、可协作的前端成品。",
        "The exhibition, detail, memorial, and about pages gradually took shape as the project moved from concept expression to a browsable, collaborative frontend artifact."
      )
    },
    {
      date: l("现在", "Now"),
      text: l(
        "当前版本继续以静态发布和邮箱整理为主，优先把收录标准、项目语气和页面结构打磨清楚。",
        "The current version is centered on static publishing and inbox curation, with no promise of online storage, moderation, or real-time community flow."
      )
    }
  ],
  stats: [
    { value: same(String(careers.length)), label: l("已收录职业样本", "Catalogued Careers") },
    {
      value: l("邮箱", "Inbox"),
      label: l("主要投稿与协作入口", "Primary channel for submissions and collaboration")
    },
    { value: l("0 个", "0"), label: l("在线账户与后台系统", "Live Accounts / Admin") }
  ],
  contributors: [
    {
      name: l("展览页", "Exhibition Page"),
      role: l(
        "浏览展览中的职业、状态标签和衰落时间线。",
        "Browse professions in the exhibition, status labels, and decline timelines."
      )
    },
    {
      name: l("详情页", "Career Detail"),
      role: l(
        "查看每个职业的摘要、因素、节录与相关职业。",
        "Read each profession's summary, factors, excerpts, and related entries."
      )
    },
    {
      name: l("祭奠页", "Memorial"),
      role: l(
        "通过邮件草稿提交悼词或新增职业建议。",
        "Submit memorial text or new profession suggestions through an email draft."
      )
    },
    {
      name: l("关于页", "About"),
      role: l(
        "理解项目目标、收录方法、内容边界和协作方式。",
        "Understand the project's purpose, curation method, boundaries, and collaboration path."
      )
    },
    {
      name: l("当前限制", "Current Limits"),
      role: l(
        "没有账户系统、在线存储、后台审核或实时社区流。",
        "There are no accounts, online storage, admin moderation, or real-time community features."
      )
    },
    {
      name: l("欢迎协作", "Contribute"),
      role: l(
        "若希望改进代码、文案或站点结构，请先通过邮件联系；维护者会按情况回复。",
        "To propose improvements to code, copy, or structure, email the project inbox first—maintainers respond when appropriate."
      )
    }
  ]
};

export const initialMemorials = {
  existing: [
    {
      careerSlug: "graphic-designer",
      signature: l(
        "匿名悼词者 / 前资深视觉设计",
        "Anonymous Tribute / Former Senior Visual Designer"
      ),
      date: same("2024.03.20"),
      text: l(
        "在这个一切皆可生成的年代，我怀念那些通宵改稿、为了 1 像素的间距而争执的夜晚。那是我们作为“人”对审美的最后坚持。再见了，画笔。",
        "In an era where everything can be generated, I miss the nights of endless revisions and arguments over a single pixel. That was our final insistence on taste as humans. Goodbye, brush."
      )
    },
    {
      careerSlug: "cram-school-teacher",
      signature: l("某数学主讲老师", "Former Math Lecturer"),
      date: same("2024.03.18"),
      text: l(
        "屏幕另一端的孩子，也许还会想起那些充满激情的周五晚上。知识没变，但传授它的方式，已不再需要我们这些“人”的温度。",
        "The children on the other side of the screen may still remember those electric Friday nights. Knowledge remains, but the method of delivering it no longer seems to need the warmth of people like us."
      )
    },
    {
      careerSlug: "content-editor",
      signature: l("匿名内容运营", "Anonymous Content Operator"),
      date: same("2024.03.15"),
      text: l(
        "算法根据点击率切割了文章，灵魂在 Feed 流中被无声淹没。如果字数决定了价值，那思考本身便是多余。我决定离开这片名为“内容”的废墟。",
        "Algorithms sliced articles according to click-through rate, and their soul drowned quietly in the feed. If word count decides value, then thought itself becomes excess. I have decided to leave this ruin called content."
      )
    },
    {
      careerSlug: "junior-translator",
      signature: l("翻译从业者", "Working Translator"),
      date: same("2024.03.12"),
      text: l(
        "翻译不再是信达雅的博弈，而是对模型输出的纠偏。我们从跨越文明的信使，变成了给 AI 打工的质检员。这不仅是职业的衰落，更是母语的退化。",
        "Translation is no longer a contest of fidelity and grace, but a correction layer over model output. We have gone from messengers between civilizations to quality inspectors for AI. This is not only the decline of a profession, but the erosion of the mother tongue itself."
      )
    }
  ],
  unlisted: [
    {
      careerName: l("AI 标注审核员", "AI Annotation Reviewer"),
      introduction: l(
        "负责检查和修正模型训练前的标注结果，夹在平台速度与低价外包之间，很快变成一类被忽视的临时工劳动。",
        "A role responsible for checking and correcting annotations before model training, squeezed between platform speed and low-cost outsourcing until it becomes a disposable layer of temporary labor."
      ),
      signature: l("匿名数据承包者", "Anonymous Data Contractor"),
      date: same("2024.04.02"),
      text: l(
        "我们被要求教会机器如何理解世界，但没有人愿意记住是谁在深夜里一格格修正这些错误。这个职业还没来得及被命名，就已经开始消失。",
        "We were asked to teach machines how to read the world, yet no one cared who spent the night correcting these errors one box at a time. This profession began disappearing before it was ever properly named."
      ),
      references: l(
        "可参考：外包标注平台招募页面、生成式 AI 数据清洗案例。",
        "References: outsourced annotation platform postings and case studies on generative AI data cleaning."
      )
    },
    {
      careerName: l("直播脚本拼接师", "Livestream Script Stitcher"),
      introduction: l(
        "为直播电商或短视频团队快速拼接脚本段落、情绪节点和成交话术，是一种高度模板化却又被频繁消耗的内容劳动。",
        "A role that rapidly stitches together script beats, emotional cues, and conversion phrases for livestream commerce teams, combining extreme templating with relentless content churn."
      ),
      signature: l("前直播内容执行", "Former Livestream Content Executor"),
      date: same("2024.03.27"),
      text: l(
        "脚本越来越像算法生成前的垫片，我们只是把情绪和促销句子粘成一条流水线。等模型彻底接手后，连这层薄薄的人工痕迹也会被抹掉。",
        "The script increasingly feels like a spacer before full algorithmic generation. We merely glue emotion and sales lines into a conveyor belt, and once the model takes over, even this thin trace of human labor will disappear."
      ),
      references: l(
        "可参考：直播招聘 JD、带货脚本模板库。",
        "References: livestream job descriptions and commerce script template libraries."
      )
    }
  ]
};
