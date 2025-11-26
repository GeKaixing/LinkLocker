
export type Language = 'en' | 'zh';

export const translations = {
  en: {
    appTitle: "LinkLocker",
    subtitleCreate: "Securely share content behind a password or paywall.",
    subtitleUnlock: "This content is locked by the owner.",
    footer: "LinkLocker. Powered by Gemini.",
    
    // Navigation
    navCreate: "Create",
    navLinks: "My Links",
    navAnalytics: "Analytics",
    navWallet: "Wallet",
    navLogout: "Logout",

    // Login
    loginTitle: "Welcome Back",
    loginSubtitle: "Sign in to manage your locked links and earnings.",
    emailLabel: "Email Address",
    passwordLabel: "Password",
    signInButton: "Sign In",
    noAccount: "Don't have an account?",
    signUp: "Sign Up",
    
    // Wallet
    walletTitle: "My Wallet",
    totalBalance: "Total Balance",
    availableWithdraw: "Available for Withdrawal",
    recentTrans: "Recent Transactions",
    withdrawBtn: "Withdraw Funds",
    transId: "ID",
    transAmount: "Amount",
    transDate: "Date",
    transStatus: "Status",
    statusCompleted: "Completed",
    statusPending: "Pending",
    // Wallet Withdrawal Modal
    withdrawModalTitle: "Withdraw Funds",
    withdrawNote: "Enter the amount you wish to withdraw to your connected account.",
    inputAmount: "Amount",
    feeLabel: "Platform Fee (10%)",
    finalAmount: "You Receive",
    confirmWithdraw: "Confirm Withdrawal",
    cancelBtn: "Cancel",
    feeDisclaimer: "* A 10% platform fee is applied to all withdrawals.",

    // Analytics
    analyticsTitle: "Performance Overview",
    totalViews: "Total Views",
    totalUnlocks: "Total Unlocks",
    conversionRate: "Conversion Rate",
    totalEarnings: "Total Earnings",
    topLinks: "Top Performing Links",
    views: "views",
    
    // Create Link Component
    tabUrl: "Link",
    tabImage: "Image",
    tabVideo: "Video",
    tabAudio: "Audio",
    tabArticle: "Article",
    urlLabel: "Destination URL",
    fileLabel: "Upload File",
    articleLabel: "Article Content",
    articlePlaceholder: "Write or paste your secret article here...",
    dropFile: "Click or Drag to upload",
    maxSizeWarning: "Note: Large files (>1MB) may cause the generated link to be too long for some browsers.",
    generateAi: "Generate title & description with AI",
    titleLabel: "Title",
    descLabel: "Description",
    lockMethod: "Lock Method",
    methodPassword: "Password",
    methodPayment: "Payment",
    setPassword: "Set Password",
    setPrice: "Set Price (USD)",
    passwordPlaceholder: "Enter a secure password...",
    createButton: "Create Locked Link",
    
    // Success View
    successTitle: "Link Created Successfully!",
    successDescPassword: "Share this link. Users will need to enter the password to access it.",
    successDescPayment: "Share this link. Users will need to pay to access it.",
    copyButton: "Copy",
    createAnother: "Create Another Link",
    
    // Privacy
    privacyTitle: "Privacy Note:",
    privacyText: "This is a client-side demo. The lock logic is encoded in the link itself. In a real production app, verification would happen on a secure backend server.",
    
    // Links Page
    linksTitle: "Managed Links",
    noLinks: "No links created yet. Go to Create to make your first one!",
    linkType: "Type",
    linkTitle: "Title",
    createdDate: "Date Created",
    actions: "Actions",
    delete: "Delete",
    copyLink: "Copy Link",
    copied: "Copied!",

    // Unlock Component
    passwordRequired: "Password Required",
    enterPassword: "Enter password...",
    accessCost: "Access Cost",
    incorrectPassword: "Incorrect password. Please try again.",
    unlockButton: "Unlock Content",
    payButton: "Pay to View",
    processing: "Processing...",
    securedBy: "Secured by LinkLocker. Don't share your password with anyone.",
    
    // Unlocked View
    contentUnlocked: "Content Unlocked!",
    accessDestination: "You can now access the content.",
    goToLink: "Open Link",
    downloadImage: "Download Image",
    downloadVideo: "Download Video",
    downloadAudio: "Download Audio",
    readArticle: "Read Article",
    
    // Defaults
    defaultTitle: "Locked Content",
    defaultDescription: "This link contains content securely locked by the user.",
    secretLink: "Secret Link",
    secretImage: "Secret Image",
    secretVideo: "Secret Video",
    secretAudio: "Secret Audio",
    secretArticle: "Secret Article",
    unlockToView: "Unlock to view content",
  },
  zh: {
    appTitle: "LinkLocker",
    subtitleCreate: "安全地分享受密码或付费墙保护的内容。",
    subtitleUnlock: "此内容已被所有者锁定。",
    footer: "LinkLocker. 由 Gemini 驱动。",
    
    // Navigation
    navCreate: "创建链接",
    navLinks: "我的链接",
    navAnalytics: "数据分析",
    navWallet: "我的钱包",
    navLogout: "退出登录",

    // Login
    loginTitle: "欢迎回来",
    loginSubtitle: "登录以管理您的加密链接和收益。",
    emailLabel: "电子邮箱",
    passwordLabel: "密码",
    signInButton: "登录",
    noAccount: "没有账号？",
    signUp: "注册",

    // Wallet
    walletTitle: "我的钱包",
    totalBalance: "总余额",
    availableWithdraw: "可提现金额",
    recentTrans: "最近交易",
    withdrawBtn: "提现资金",
    transId: "ID",
    transAmount: "金额",
    transDate: "日期",
    transStatus: "状态",
    statusCompleted: "已完成",
    statusPending: "处理中",
    // Wallet Withdrawal Modal
    withdrawModalTitle: "提现资金",
    withdrawNote: "输入您希望提现到关联账户的金额。",
    inputAmount: "金额",
    feeLabel: "平台手续费 (10%)",
    finalAmount: "实际到账",
    confirmWithdraw: "确认提现",
    cancelBtn: "取消",
    feeDisclaimer: "* 所有提现将收取 10% 的平台手续费。",

    // Analytics
    analyticsTitle: "数据概览",
    totalViews: "总访问量",
    totalUnlocks: "总解锁数",
    conversionRate: "转化率",
    totalEarnings: "总收益",
    topLinks: "热门链接",
    views: "次访问",

    // Create Link Component
    tabUrl: "链接",
    tabImage: "图片",
    tabVideo: "视频",
    tabAudio: "音频",
    tabArticle: "文章",
    urlLabel: "目标链接",
    fileLabel: "上传文件",
    articleLabel: "文章内容",
    articlePlaceholder: "在此输入或粘贴您的加密文章...",
    dropFile: "点击或拖拽上传",
    maxSizeWarning: "注意：过大文件 (>1MB) 可能导致生成的链接过长而无法在某些浏览器中使用。",
    generateAi: "使用 AI 生成标题和描述",
    titleLabel: "标题",
    descLabel: "描述",
    lockMethod: "锁定方式",
    methodPassword: "密码",
    methodPayment: "付费",
    setPassword: "设置密码",
    setPrice: "设置价格 (USD)",
    passwordPlaceholder: "输入安全密码...",
    createButton: "创建加密链接",
    
    // Success View
    successTitle: "链接创建成功！",
    successDescPassword: "分享此链接。用户需要输入密码才能访问。",
    successDescPayment: "分享此链接。用户需要付费才能访问。",
    copyButton: "复制",
    createAnother: "创建另一个链接",
    
    // Privacy
    privacyTitle: "隐私提示：",
    privacyText: "这是一个客户端演示。锁定逻辑编码在链接中。在实际生产应用中，验证将在安全的后端服务器上进行。",

    // Links Page
    linksTitle: "链接管理",
    noLinks: "暂无创建的链接。去“创建链接”制作您的第一个链接吧！",
    linkType: "类型",
    linkTitle: "标题",
    createdDate: "创建日期",
    actions: "操作",
    delete: "删除",
    copyLink: "复制链接",
    copied: "已复制",
    
    // Unlock Component
    passwordRequired: "需要密码",
    enterPassword: "输入密码...",
    accessCost: "访问费用",
    incorrectPassword: "密码错误，请重试。",
    unlockButton: "解锁内容",
    payButton: "付费查看",
    processing: "处理中...",
    securedBy: "由 LinkLocker 提供安全保障。请勿与他人分享您的密码。",
    
    // Unlocked View
    contentUnlocked: "内容已解锁！",
    accessDestination: "您现在可以访问目标内容。",
    goToLink: "打开链接",
    downloadImage: "下载图片",
    downloadVideo: "下载视频",
    downloadAudio: "下载音频",
    readArticle: "阅读文章",
    
    // Defaults
    defaultTitle: "加密内容",
    defaultDescription: "此链接包含用户加密锁定的内容。",
    secretLink: "秘密链接",
    secretImage: "加密图片",
    secretVideo: "加密视频",
    secretAudio: "加密音频",
    secretArticle: "加密文章",
    unlockToView: "解锁以查看内容",
  }
};