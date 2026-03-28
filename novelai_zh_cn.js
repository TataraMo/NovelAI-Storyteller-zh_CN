// ==UserScript==
// @name         NovelAI 简体中文全局汉化
// @namespace    https://github.com/TataraMo/NovelAI-Localization-zh_CN
// @version      3.47
// @description  NovelAI Full Site Localization into Simplified Chinese
// @author       W是包子N不理
// @match        https://novelai.net/*
// @icon         https://novelai.net/icons/novelai-round.png
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @updateURL    https://raw.githubusercontent.com/TataraMo/NovelAI-Localization-zh_CN/main/novelai_zh_cn.js
// @downloadURL  https://raw.githubusercontent.com/TataraMo/NovelAI-Localization-zh_CN/main/novelai_zh_cn.js
// @license      GPL-3.0-or-later
// ==/UserScript==

(function () {
    'use strict';

    // ==========================================
    // 1. 设置与功能初始化
    // ==========================================
    
    document.documentElement.lang = 'zh-CN';

    let isTitleModificationEnabled = true;
    if (typeof GM_getValue === 'function') {
        isTitleModificationEnabled = GM_getValue('isTitleModificationEnabled', true);
    }

    function updateMenuText() {
        if (typeof GM_registerMenuCommand !== 'function' || typeof GM_unregisterMenuCommand !== 'function' || typeof GM_setValue !== 'function') return;
        let menuText = isTitleModificationEnabled ? '禁用图像页标题修改' : '启用图像页标题修改';
        if (window.myMenuCommandId) GM_unregisterMenuCommand(window.myMenuCommandId);
        window.myMenuCommandId = GM_registerMenuCommand(menuText, function () {
            isTitleModificationEnabled = !isTitleModificationEnabled;
            GM_setValue('isTitleModificationEnabled', isTitleModificationEnabled);
            alert('标题修改功能' + (isTitleModificationEnabled ? '已启用' : '已禁用') + '。\n提示：刷新前请确保生成的图像、参数等已经被保存！');
            updateMenuText();
        });
    }

    function modifyPageTitle(pathname) {
        if (!isTitleModificationEnabled) return;
        if (pathname.includes('/inspect')) {
            document.title = '检视图像参数 - NovelAI';
        } else if (pathname.includes('/image') || pathname.includes('/imagetools')) {
            const originalTitle = document.title;
            document.title = '图像生成 - NovelAI';
            Object.defineProperty(document, 'title', {
                get: function () { return originalTitle; },
                set: function (value) { }
            });
        } else if (pathname.includes('/stor')) {
            document.title = '故事写作 - NovelAI';
        }
    }

    // ==========================================
    // 2. 翻译字典库 (保持不变)
    // ==========================================

    const commonTranslationMap = {
        // --- 侧边栏与全局通用菜单 ---
        'Account Settings': '账号设置',
        'User Settings': '用户设置',
        'AI Settings': 'AI 设置',
        'Other': '其他',
        'Settings': '设置', // 补充提升至全局
        'Adjust': '调整',   // 补充提升至全局
        'Adjust >': '调整 >', // 补充提升至全局
        'Looks like your Library is empty.': '你的书库似乎是空的。', // 补充空白页状态
        'Image Generation': '图像生成',
        'Image Gen': '图像生成',
        'Text Generation': '文本生成',
        'Tokenizer': '分词器',
        'User Scripts': '用户脚本',
        'Help': '帮助',
        'Interactive Tutorials': '互动教程',
        'Tutorial': '教程',
        'Documentation': '文档',
        'NovelAI Discord': 'NovelAI Discord 社区',
        'Opus Tier': 'Opus 订阅',
        'Scroll Tier': 'Scroll 订阅',
        'Tablet Tier': 'Tablet 订阅',
        'Paper Tier': 'Paper 订阅',
        'Free Tier': '免费层级',
        'History': '历史记录',

        'Interface': '界面',
        'Theme': '主题',
        'Theme Editor': '主题编辑器',
        'Apply & Save Theme': '应用并保存主题',
        'Default Themes': '默认主题',
        'Import': '导入',
        'Export': '导出',
        'This is paragraph text. Nice!': '这是段落正文示例。看起来不错！',
        'This is a prompt.': '这是提示词示例。',
        'This is AI text.': '这是 AI 生成的文本。',
        'This is edited text.': '这是已编辑的文本。',
        'This is new user text.': '这是用户新输入的文本。',
        'This is highlighted text.': '这是高亮显示的文本。',
        'Header Font': '标题字体',
        'Paragraph Font': '段落字体',
        'Header': '标题',
        'Paragraph': '段落',
        'Warning/Error': '警告/错误',
        'Foreground': '前景色',
        'Background': '背景色',
        'Dark Background': '深色背景',
        'Input Background': '输入框背景',
        'Low Intensity Color': '低强度颜色',
        'Mid Intensity Color': '中强度颜色',
        'High Intensity Color': '高强度颜色',
        'Account': '账号',
        'Text To Speech': '文字转语音', 
        'Defaults': '默认设置',
        'Hotkeys': '快捷键',
        'Support': '支持',
        'Change Log': '更新日志',
        'Logout': '退出登录',
        'Current Tier': '当前订阅层级',
        'Manage': '管理订阅',
        'Your subscription renews around ': '你的订阅预计将在 ',
        'Your subscription renews around': '你的订阅预计将在',
        ' @ ': ' 更新。',
        'Pen Name': '笔名',
        'Change Settings': '更改设置', 
        'Change': '更改',
        'Email': '绑定邮箱',
        'Password': '账号密码',
        'Current Email': '当前邮箱',
        'Old Email': '原邮箱',
        'New Email': '新邮箱',
        'Current Password': '当前密码',
        'New Password': '新密码',
        'Confirm New Password': '确认新密码',
        'Delete Account': '永久注销账号',
        'Not possible while subscribed.': '在拥有激活的订阅期间无法注销账号。',
        'Request': '提交申请',
        'Show Account ID': '显示账号 ID',
        'Get Persistent API Token': '获取永久 API 密钥',
        'Stay Informed.': '掌握最新动态。',
        'Subscribe to our newsletter.': '订阅我们的新闻邮件，获取更新情报。',
        'Subscribe': '订阅推送',
        'Manage Cookie Preferences': '管理 Cookie 偏好设置',
        'Welcome back, Author': '欢迎回来，作者',
        'Save': '保存',
        'Cancel': '取消',
        'Enabled': '已启用',
        'Disabled': '已禁用',
        'English': '英文',
        'UI Language': '界面语言',
        'Default': '默认',
        'Experimental': '实验性功能',
        'Off': '关闭',
        'Automatic': '自动',
        'Permanent': '永久显示',
        'NovelAI Dark': 'NovelAI 深色',
        'NovelAI Light': 'NovelAI 浅色',
        'Slate': '石板灰',
        'Midnight Doll': '午夜人偶',
        'Ink': '墨水黑',
        'Wine': '酒红',
        'Vibrowave': '迷幻波',
        'Sand': '沙黄',
        'Subtle Terminal': '柔和终端',
        'Bubblegum': '泡泡糖',
        'Matrix': '黑客帝国',
        'Purple Noir': '暗夜紫',
        'Gruvbox Dark': 'Gruvbox 深色',
        'Counter Militant': '反恐迷彩',
        'Amber': '琥珀棕',
        'Frog': '青蛙绿',
        'Sagiri': '纱雾粉',
        'Monkey': '猴子蓝',
        'NovelAI Dark (Legacy)': 'NovelAI 深色 (旧版)',
        'Eczar': 'Eczar (默认衬线)',
        'Kanit': 'Kanit (现代无衬线)',
        'Josefin Sans': 'Josefin Sans (优雅无衬线)',
        'Playfair Display': 'Playfair (古典衬线)',
        'Atkinson Hyperlegible': 'Atkinson (高易读)',
        'OpenDyslexic': 'OpenDyslexic (阅读障碍)',
        'Source Sans Pro': 'Source Sans Pro (默认无衬线)',
        'Montserrat': 'Montserrat (几何无衬线)',
        'EB Garamond': 'EB Garamond (传统衬线)',
        'Exo': 'Exo (科幻风)',
        'Comic Neue': 'Comic Neue (手写风)',
        'Inconsolata': 'Inconsolata (代码等宽)',
        'Times New Roman': 'Times New Roman (新罗马)',
        'Iosevka': 'Iosevka (紧凑等宽)',
        
        // --- 新增图像格式与图库选项 ---
        'Image Format for Generated Images': '生成图像的文件格式',
        'WebP (Lossless)': 'WebP (无损)',
        'Hide Quickstart Gallery': '隐藏快速上手图库',
        'The quickstart gallery will be shown on the image generation page.': '快速上手图库将显示在图像生成页面上。',
        'The quickstart gallery will be hidden on the image generation page.': '快速上手图库将在图像生成页面上隐藏。',
        
        // --- 存储相关设置全局化 ---
        'Default Storage Location': '默认存储位置',
        'Local': '本地',
        'Server': '服务器',
        'New & imported stories will be saved locally only.': '新生成的故事和导入的故事只会保存在本地。',
        'New & imported stories will be saved locally and stored encrypted remotely.': '新生成的故事和导入的故事将保存在本地，并在加密后传输到远程服务器。',
        'Exporting and backing up your stories is highly recommended, should your browser cache get cleared, or if you lose access to your account.': '强烈建议导出并备份您的故事。',
        
        // --- TTS 全局设置与修正 ---
        'Text to Speech Source': 'TTS 语音源',
        'Local TTS uses your browsers available speech synthesis capabilities.': '本地 TTS 使用您浏览器自带的语音合成功能。',
        'Streamed TTS is higher quality, uses a model hosted by NovelAI, and requires an active subscription. 100 free generations given for trial purposes.': '流式 TTS 质量更高，使用由 NovelAI 托管的模型，需要有激活的订阅。提供 100 次免费生成用于试用。',
        'Streamed': '流式',
        'TTS will use NovelAI\'s remote TTS service.': 'TTS 将使用 NovelAI 的远程语音合成服务。',
        'Speak Outputs': '朗读输出',
        'Outputs will not be read.': '将不会朗读输出内容。',
        'Speak Inputs': '朗读输入',
        'Inputs will not be read.': '将不会朗读输入内容。',
        'Speak HypeBot Comments': '朗读气氛组评论',
        'HypeBot comments will not be read.': '将不会朗读气氛组评论。',
        'Streamed TTS Settings': '流式 TTS 设置',
        'Model': '模型',
        'Story Voice': '故事语音',
        'Text entered here will be used for the test/download buttons.': '此处输入的文本将用于测试/下载按钮。',
        'This is a test for text to speech. A little harsh, a little slow, but always on point.': '这是一段语音合成测试。有点刺耳，有点慢，但总是恰到好处。',
        'Saved Voices': '已保存的语音',
        'Name': '名称',
        'Save Voice': '保存语音',
        'Delete Voice': '删除语音',
        'Volume': '音量',
        'Default: 1': '默认值: 1',
        'Speed': '语速',
        'Note: Will not affect the speed of downloaded audio.': '注意：不会影响下载音频的语速。',
        'Test Voice': '测试语音',
        'Local TTS Settings': '本地 TTS 设置',
        'TTS will use the browsers Speech Synthesis API.': 'TTS 将使用浏览器的语音合成 API。',
        'Outputs will be read by TTS.': '将通过 TTS 朗读输出内容。',
        'Outputs will be read.': '将朗读输出内容。',
        'Outputs will be read:': '将朗读输出内容：',
        'In addition to outputs, Inputs will be read by TTS.': '除输出内容外，也将通过 TTS 朗读输入内容。',
        'In addition to outputs, Inputs will be read.': '除输出内容外，也将朗读输入内容。',
        'In addition to outputs, Inputs will be read:': '除输出内容外，也将朗读输入内容：',
        'Has no effect if speak outputs is disabled': '如果禁用了“朗读输出”，则此项无效。',
        'HypeBot comments will be read by TTS.': '将通过 TTS 朗读气氛组评论。',
        'HypeBot comments will be read.': '将朗读气氛组评论。',
        'HypeBot comments will be read:': '将朗读气氛组评论：',
        
        // --- 默认参数预设全局化与碎句拼合 ---
        'Default AI Model': '默认 AI 模型',
        'New stories will use this model by default.': '新故事将默认使用此模型。',
        'New stories will use this model:': '新故事将使用此模型：',
        'New stories': '新故事',
        'New Stories': '新故事',
        ' will use this model by default.': ' 将默认使用此模型。',
        'will use this model by default.': '将默认使用此模型。',
        'A massive and versatile 355B Mixture of Experts model.': '一个庞大且多功能，包含 355B 参数的混合专家模型。',
        'Our largest and most formidable, built with Meta Llama 3 70B.': '我们最庞大、最强大的模型，基于 Meta Llama 3 70B 构建。',
        'A fierce contender, now second best, crafted from the ground up.': '强有力的竞争者，现居第二，从零开始精心打造。',
        'Our veteran powerhouse, still fast and reliable.': '我们经验丰富的主力模型，依然快速可靠。',
        'A legacy Japanese language model - use is no longer recommended.': '旧版日语模型 - 不再推荐使用。',
        'A legacy python code model - use is no longer recommended.': '旧版 Python 代码模型 - 不再推荐使用。',
        'A legacy model - use is no longer recommended.': '旧版模型 - 不再推荐使用。',
        'Previously powerful, now legacy model - use is no longer recommended.': '曾经强大的模型，现已作为旧版 - 不再推荐使用。',
        'Default Preset': '默认预设',
        'New stories will use the selected preset as a default.': '新故事将默认使用所选预设。',
        ' will use the selected preset as a default.': ' 将默认使用所选预设。',
        'will use the selected preset as a default.': '将默认使用所选预设。',
        'Default AI Module': '默认 AI 模块',
        'The selected AI Model does not support Modules.': '所选的 AI 模型不支持模块。',
        'Lorebook Generation Settings': '世界书生成设置',
        'Change the Model and settings preset used by the Lorebook Generator.': '更改世界书生成器所使用的模型和设置预设。',
        'Change the model and settings preset used by the Lorebook Generator.': '更改世界书生成器所使用的模型和设置预设。',
        'Change the Model and settings preset used:': '更改所使用的模型和设置预设：',
        'Change the model and settings preset used:': '更改所使用的模型和设置预设：',
        'Change the ': '更改 ',
        ' and settings preset used by ': ' 及其设置预设，作用于 ',
        'and settings preset used by ': '及其设置预设，作用于 ',
        ' and settings preset used by the ': ' 及其设置预设，作用于 ',
        'and settings preset used by the ': '及其设置预设，作用于 ',
        'the Lorebook Generator.': '世界书生成器。',
        'Lorebook Generator': '世界书生成器',
        'Lorebook Generation Model': '世界书生成模型',
        'Lore Generation Preset': '世界书生成预设',
        'Lore Generation': '世界书生成',
        'Legacy Lore Generation': '旧版世界书生成',
        'A bespoke module will be used for Lore Generation.': '将为世界书生成使用定制模块。',
        'A bespoke module will be used for Lore Generator.': '将为世界书生成器使用定制模块。',
        'A bespoke module will be used for ': '将使用定制模块进行 ',
        'The less consistent fewshot prompt based Lore Generation will be used.': '将使用一致性较低的、基于 fewshot 提示词的旧版世界书生成。',
        'The less consistent fewshot prompt based Lore Generator will be used.': '将使用一致性较低的、基于 fewshot 提示词的旧版世界书生成器。',
        'The less consistent fewshot prompt based Lore ': '一致性较低的基于 fewshot 的旧版世界书',
        'The less consistent fewshot prompt based Lore': '一致性较低的基于 fewshot 的旧版世界书',
        'The less consistent fewshot prompt based ': '一致性较低的基于 fewshot 的旧版 ',
        ' will be used.': ' 将被使用。',
        'will be used.': '将被使用。',
        'The module of the selected story will be used for generation if available for the selected model. Arbitrary generation types are not supported.': '如果所选模型支持，将使用所选故事的模块进行生成。不支持任意生成类型。',
        'Seed': '种子',
        'Randomize': '随机生成'
    };

    const imageTranslationMap = {
        // --- 生成首张图片后的恭喜提示 ---
        'Congratulations!': '恭喜！',
        'You\'ve successfully generated your first NovelAI image!': '您已成功生成了第一张 NovelAI 图像！',
        'You’ve successfully generated your first NovelAI image!': '您已成功生成了第一张 NovelAI 图像！',
        'Now let\'s explore how to customize and improve your creations with a quick tutorial.': '现在，让我们通过一个简短的教程来探索如何自定义和改进您的作品。',
        'Now let’s explore how to customize and improve your creations with a quick tutorial.': '现在，让我们通过一个简短的教程来探索如何自定义和改进您的作品。',
        'Now let\'s explore how to customize and improve your creations with a quick ': '现在，让我们探索如何自定义和改进您的作品，请看这个简短的',
        'Now let’s explore how to customize and improve your creations with a quick ': '现在，让我们探索如何自定义和改进您的作品，请看这个简短的',
        'Now let\'s explore how to customize and improve your creations with a quick': '现在，让我们探索如何自定义和改进您的作品，请看这个简短的',
        'Now let’s explore how to customize and improve your creations with a quick': '现在，让我们探索如何自定义和改进您的作品，请看这个简短的',
        'tutorial.': '教程。',
        'tutorial': '教程',
        'Start tutorial': '开始教程',
        'Start Tutorial': '开始教程',
        'Start ': '开始 ',
        'I know what I’m doing, skip this!': '我知道该怎么做，跳过此步！',
        'I know what I\'m doing, skip this!': '我知道该怎么做，跳过此步！',
        
        'This website utilizes technologies such as cookies to enable essential site functionality, as well as for analytics, personalization, and targeted advertising.': '本网站使用 Cookie 等技术来实现网站的基本功能，以及进行分析、个性化和有针对性的广告。',
        'To learn more, view the following link:': '要了解更多信息，请查看以下链接：',
        'Manage Preferences': '管理偏好',
        'When you visit websites, they may store or retrieve data about you using cookies and similar technologies ': '当您访问网站时，网站可能会使用 Cookie 和类似技术',
        '. Cookies may be necessary for the basic functionality of the website as well as other purposes. You have the option of disabling certain types of cookies, though doing so may impact your experience on the website.': '存储或检索有关您的数据。网站的基本功能和其他目的可能都需要 Cookie。您可以选择禁用某些类型的 Cookie，但这样做可能会影响您在网站上的体验。',
        'Essential': '必要',
        'Required to enable basic website functionality. You may not disable essential cookies.': '为实现网站基本功能所必需。您不得禁用基本 Cookie。',
        'View Cookies': '查看 Cookie',
        'Targeted Advertising': '有针对性的广告',
        'Used to deliver advertising that is more relevant to you and your interests. May also be used to limit the number of times you see an advertisement and measure the effectiveness of advertising campaigns.  Advertising networks usually place them with the website operator’s permission.': '用于提供与您和您的兴趣更相关的广告。也可用于限制您看到广告的次数和衡量广告活动的效果。广告网络通常在征得网站运营者的同意后投放广告。',
        'Personalization': '个性化',
        'Allow the website to remember choices you make ': '允许网站记住您所做的选择',
        'such as your username, language, or the region you are in': '如您的用户名、语言或您所在的地区',
        ' and provide enhanced, more personal features. For example, a website may provide you with local weather reports or traffic news by storing data about your general location.': '，并提供更强、更个性化的功能。例如，网站可以通过存储有关您的大致位置的数据，为您提供当地天气预报或交通新闻。',
        'Analytics': '分析',
        'Help the website operator understand how its website performs, how visitors interact with the site, and whether there may be technical issues.': '帮助网站运营商了解其网站的运行情况、访客与网站的互动情况以及是否存在技术问题。',
        'There are issues connecting to the backend right now, please check your connection or try again...': '连接到后台时出现问题，请检查您的连接或重试...',
        'Welcome to NovelAI!': '欢迎来到 NovelAI！',
        'Your ': '你的',
        ' includes:': '包括：',
        '30 free high quality image generations': '免费生成30张高质量图像',
        'Full access to our latest model': '我们最新模型的完全访问权限',
        'No credit card required': '无需信用卡',
        'Start Free Trial': '开始免费体验',
        'Create an account and start for free': '创建一个账号开始免费体验',
        'Sign Up': '注册',
        'Log In': '登录',
        'Welcome back!': '欢迎回来！',
        'Ready to create your first masterpiece': '准备好开始创作您的第一幅杰作了吗',
        'Register for free and unlock ': '免费注册并解锁',
        '30 high quality': '30张高质量',
        ' generations.': '图像生成。',
        'Already have an account': '已经有账号了吗',
        'Remember me': '记住我',
        'Login is remembered for 30 days': '保持登录30天',
        'Login will not be remembered': '登录不会被记住',
        'Repeat Password': '确认密码',
        'Would you like to receive emails about updates from us in the future': '您希望今后收到有关我们更新信息的电子邮件吗',
        'Reset Password': '忘记密码',
        'NOTE:': '注意：',
        'Please take good care of your login credentials. Due to local encryption, losing your email or password results in permanently losing access to your remotely stored stories.': '请妥善保管您的登录凭证。由于数据在本地加密保存，丢失电子邮件或密码将导致永久无法访问远程存储的故事。',
        'By registering, you agree to consent to the NovelAI ': '注册即表示您同意 NovelAI ',
        'Privacy Policy and Terms of Service': '隐私政策和服务条款',
        'This site is protected by reCAPTCHA and the Google': '本网站受 reCAPTCHA 保护， Google ',
        'Privacy Policy': '隐私政策',
        'Terms of Service': '服务条款',
        'apply.': '适用。',
        'History': '历史记录',
        'Click on an image to set your settings to the ones used to generate it': '左键点击图像可以快速应用生成该图像时的原始设置',
        'except for any init image': '种子和原始图像不会被复制',
        'Delete this image': '确定要删除这张图片吗',
        'Delete it': '确认删除',
        'No, keep it': '不，取消',
        'Download ZIP': '打包下载全部图片',
        'Download all images': '确定要下载所有图像吗',
        ' This could take a while, or fail entirely, with large numbers of images.': '如果图像数量较多，可能会需要一些时间，或导致下载失败。',
        'Downloading': '正在下载',
        'images...': '张图片...',
        'Images downloaded': '图片已开始下载',
        'Author': '作者',
        'Anonymous Trial': '游客试用',
        'Not Subscribed': '未订阅',
        'End Session': '结束会话',
        'Quick Start Gallery': '快速上手图库',
        'Director Tools': '导演工具',
        'Help': '帮助',
        'Tutorial': '教程',
        'Documentation': '文档',
        'Version ': '版本 ',
        'Get Started': '让我们开始吧',
        'Get Inspiration from our quick start gallery!': '从我们的快速上手图库中获取灵感！',
        'Click an image to copy the prompt.': '点击图片以复制提示词。',
        'Copied!': '已复制！',
        'New': '新增',
        'A version of our newest model trained on a curated subset of images. Recommended for streaming.': '我们最新模型的一个版本，建议用于流式传输。',
        'Our newest and best model.': '我们最新、最好的模型。',
        'Legacy': '旧版',
        'Our V4 model trained on a curated subset of images. No longer recommended for use.': '我们V4模型的一个版本。不再推荐使用。',
        'Our V4 model. No longer recommended for use.': '我们的V4模型。不再推荐使用。',
        'Our previous model. No longer recommended for use.': '我们以前的模型。不再推荐使用。',
        'One of our older models. No longer recommended for use.': '我们以前的模型之一。不再推荐使用。',
        'Prompt': '提示词',
        'You are currently using Anime mode.': '您当前使用的是动漫模式。',
        'The mode changes the tag suggestions and adds a dataset tag to the prompt. You can click the icon to switch.': '切换模式会更改Tag建议，并在提示中添加数据集Tag。',
        'You are currently using Furry mode.': '您当前使用的是Furry模式。',
        'Randomize': '随机生成',
        'Random Prompt': '随机提示词',
        'Added to the end of the prompt:': '会在输入的提示词结尾添加以下提示词：',
        'Undesired Content': '负面提示词',
        'Reattach Undesired Content': '拼接负面提示词',
        'Detach Undesired Content': '拆分负面提示词',
        'Added to the beginning of the UC:': '会在输入的负面提示词前面添加以下提示词：',
        'This prompt is using ': '输入的部分占',
        ' of the currently used ': '个Token，共使用了',
        ' tokens. Max total tokens: ': '个。该部分最大Token数：',
        'Prompt Settings': '提示词设置',
        'Add Quality Tags': '添加质量优化Tag',
        'The prompt will be used unmodified.': '不会修改提示词。',
        'Tags to increase quality will be prepended to the prompt.': '会在提示词中添加能够提高质量的Tag。',
        'Undesired Content Preset': '负面提示词预设',
        'Heavy': '全面',
        'Light': '精简',
        'Human Focus': '以人为本',
        'None': '无',
        'Disable Tag Suggestions': '禁用Tag建议',
        'Highlight Emphasis': '高亮强调部分',
        'Add a Base Img': '上传基准图片',
        'Optional': '可选',
        'What do you want to do with this image': '您想要怎样处理这张图片',
        'Image2Image': '图生图',
        'Transform your image.': '改变您的图片。',
        'Strength': '强度',
        'Noise': '噪声',
        'Inpaint Image': '重绘图像',
        'This image has metadata': '这张图片带有元数据',
        'Did you want to import that instead': '您想要怎样导入它',
        'Characters': '角色',
        'Append': '附加',
        'Import Metadata': '导入元数据',
        'Clean Imports': '清除增益',
        'Remove': '移除',
        ', add spaces after commas': '，在逗号后添加空格',
        'Character Prompts': '角色提示词',
        'Customize separate characters.': '自定义每个角色。',
        'Click to edit a character.': '点击以编辑一个角色。',
        'Clear Random Prompt Characters': '清除随机提示词角色',
        'Add Character': '添加角色',
        'Female': '女性',
        'Male': '男性',
        'Character': '角色',
        'Position': '位置',
        'AI’s Choice': '由AI决定',
        'Character Positions': '角色位置',
        'Global': '全局',
        'Set Character ': '调整角色',
        '’s Position': '的位置',
        'Done': '完成',
        'Vibe Transfer': '氛围转移',
        'Change the image, keep the vision.': '改变图像，保留视觉。',
        'Use a variety of AI tools to edit your images.': '使用各种AI工具编辑你的图像。',
        'Normalize Reference Strength Values': '标准化参考强度值',
        'Imported': '已导入',
        'Vibe Transfer reference image': '张氛围转移参考图片',
        'Enable/Disable Vibe Transfer Reference Image': '启用/禁用氛围转移参考图片',
        'Reference Strength': '参考强度',
        'Information Extracted': '信息提取度',
        'Encoding required. This will cost': '需要编码。这将使下一次生成的成本增加',
        'on the next generation.': '。',
        'Learn more here.': '点击此处了解更多信息。',
        'Image Settings': '图像设置',
        'Normal': '中等尺寸',
        'Large': '大型尺寸',
        'Wallpaper': '壁纸（特大尺寸）',
        'Small': '小型尺寸',
        'Custom': '自定义',
        'Portrait': '竖向',
        'Landscape': '横向',
        'Square': '方形',
        'Number of Images': '生成数量',
        'Reset Settings': '重置设置',
        'Reset all settings to default': '确实要恢复所有设置为默认状态吗',
        'Yes': '确定',
        'Steps': '步数',
        'Guidance': '引导值',
        'Prompt Guidance': '提示词引导值',
        'Variety': '多样性',
        'Enable guidance only after body has been formed, to improve diversity and saturation of samples. May reduce relevance.': '只应在身体形成后再启用引导功能，可以提高样本的多样性和饱和度。可能会降低相关性。',
        'Seed': '种子',
        'Sampler': '采样器',
        'Recommended': '推荐',
        'Advanced Settings': '高级设置',
        'Prompt Guidance Rescale': '缩放提示词引导值',
        'Noise Schedule': '噪声计划表',
        'N/A': '随机',
        'Free Trial': '免费体验',
        'image generations remaining.': '张图片可生成。',
        'Seen enough': '没用够吗',
        'Check out our plans': '查看我们的计划',
        'Generate 1 Image': '生成1张图像',
        'Generate 2 Images': '生成2张图像',
        'Generate 3 Images': '生成3张图像',
        'Generate 4 Images': '生成4张图像',
        'You are not subscribed!': '你还没有开通订阅！',
        'Take me there': '带我去开通',
        'The paint’s run dry.': '颜料已经干了。',
        'You need a subscription or to purchase Anlas to continue.': '您需要订阅或购买Anlas才能继续使用。',
        'Compare and pick the right plan for you.': '比较并选择适合您的计划。',
        'Explore': '探索',
        'Our Plans': '我们的计划',
        '/mo': '/月',
        'Unlimited Images': '无限图片',
        'Image Gen Access': '图片生成权限',
        'Access to our image generation features.': '能够使用我们的图像生成功能。',
        'Pay As You Go': '按量付费',
        'Unlimited': '无限',
        'Purchase Discount': '购买折扣',
        'The amount taken off our on-demand Anlas pricing.': '在额外购买按量付费的Anlas时享受折扣。',
        'Discount': '折扣',
        'Bonus': '奖励',
        'Free extra monthly currency for use in generating images on NovelAI.': '每月免费提供用于在NovelAI上生成图片的货币。',
        'For images of up to 1024x1024 pixels and up to 28 steps when generating a single image.': '适用于生成单幅最大1024x1024像素、最多28步数的图像。',
        'A pool of Anlas that refills each month to the amount for your subscription tier. It will only refill if you have less than the amount for your subscription tier.': 'Anlas会在每次订阅续费时按照您的层级充值。只有当您剩余的Anlas少于赠送数量时才会被重新充值。',
        'Activate a Gift Key': '激活礼品码',
        'Anlas are a form of digital currency used to enhance your image generation experience for things like higher resolutions, faster generation times, and more.': 'Anlas 是一种用于增强图像生成体验的货币，如更高分辨率、更快的生成时间等。',
        ' images†': '张图片†',
        '† At the default resolution and settings.': '†使用默认分辨率和设置。',
        'Purchase ': '购买 ',
        'Here you can purchase additional Anlas for training your AI Modules and for Image Generation.': '您可以在这里购买额外的Anlas，用于训练你的AI模块或生成图像。',
        'Subscription Anlas will be refilled according to your subscription every month.': '订阅Anlas会在每次订阅续费时按照您的层级充值。',
        'The discounted Anlas pricing does not undefinedto accounts with canceled or non-renewing subscriptions.': '订阅已取消或已过期的帐户不能享受Anlas折扣。',
        'Your Subscription Anlas:': '您的订阅Anlas：',
        'Your Paid Anlas:': '您的付费Anlas：',
        'Stream Image Generation': '流式图像生成',
        'Intermediates of generating images will be streamed.': '流式传输生成图像的过程。',
        'Intermediates of generating images will not be streamed.': '生成图像的过程不会被传输。',
        'Show Streamed Images Unprocessed': '显示未完成的流式图像',
        'All streamed images will be shown unprocessed.': '显示流式传输生成图像的所有步骤。',
        'In progress streamed images will be blurred and the first few steps will not be shown.': '生成中的流式传输图像将变得模糊，并且不会显示最初的几个步骤。',
        'Automatic Download': '自动下载',
        'Images will automatically download after generation.': '图像生成完后将自动下载。',
        'Images will not automatically download after generation.': '图像生成完后不会自动下载。',
        'Your subscription expired on ': '你的订阅已结束于',
        'Your subscription ends on ': '你的订阅将在',
        ' and does not renew.': '到期且不会续订。',
        'Download All Stories': '下载所有故事',
        'Gift Key ': '礼品码',
        'Purchasing Disabled': '购买已禁用',
        'Gift key purchases have been removed indefinitely due to abuse.': '由于遭到滥用，购买礼品码已被无限期禁用。',

        // ================= Director Tools (导演工具) =================
        'Remove backgrounds from images, leaving only the characters.': '移除图像背景，仅保留角色。',
        'Remove Background': '移除背景',
        'Remove...': '移除...',
        'Line Art': '线稿',
        'Sketch': '草图',
        'Colorize': '上色',
        'Emotion': '表情',
        'Declutter': '清理',
        'Transform': '转换',
        'Invalid': '无效',
        'Draw an outline of your image.': '绘制图像的轮廓。',
        'Revert your image to a sketch stage.': '将图像还原为草图阶段。',
        'Turn your sketch or line art picture into something colorful. You can also guide your colorization with a prompt and even make slight modifications to the image.': '将草图或线稿变成彩图。您还可以使用提示词引导上色，甚至对图像进行轻微修改。',
        'Removes clutter like text, speech bubbles or other things drawn on top of the image.': '移除杂乱元素，如文本、对话气泡或其他画在图像上的内容。',
        'Defry': '画质修复',
        'Prompt (Optional)': '提示词 (可选)',
        'Anime Only. Start with a neutral emotion image. ': '仅限动漫。请从表情中性的图像开始。 ',
        'Anime Only. Start with a neutral emotion image.': '仅限动漫。请从表情中性的图像开始。',
        'Learn More': '了解更多',
        'Neutral': '中立',
        'Change the expression of any given character.': '更改任意指定角色的表情。',
        'Quality Tags Enabled': '已启用质量优化标签',
        'Add a Base Img (Optional)': '添加基础图像 (可选)',
        'Precise Reference': '精准参考',
        'Add a reference image for a character or style.': '为角色或风格添加参考图像。',
        'Normal Landscape': '中等尺寸 (横向)',
        'Normal Portrait': '中等尺寸 (竖向)',
        'Normal Square': '中等尺寸 (方形)',
        'Large Landscape': '大型尺寸 (横向)',
        'Large Portrait': '大型尺寸 (竖向)',
        'Large Square': '大型尺寸 (方形)'
    };

    const inspectTranslationMap = {
        'Click the upload button or drag an image into the window to check its metadata.': '点击上传按钮或将图片拖入窗口以检视其元数据。',
        'Upload Image': '上传图像',
        'This image contains no metadata.': '这张图片没有元数据。',
        'Title': '标题',
        'Description': '提示词',
        'Software': '软件',
        'Source': '模型',
        'Request Type': '请求类型',
        'Text to Image': '文生图',
        'Image to Image': '图生图',
        'Simplified': '简略',
        'Prompt': '提示词',
        'Undesired Content': '负面提示词',
        'Resolution': '分辨率',
        'Steps': '步数',
        'Prompt Guidance': '提示词引导值',
        'Prompt Guidance Rescale': '缩放提示词引导值',
        'Undesired Content Strength': '负面提示词强度',
        'Raw Parameters': '原始参数',
    };

    const storiesTranslationMap = {
        // --- 快捷键汉化补全 (来自 3.25) ---
        'Toggle Menu Bar': '切换菜单栏',
        'Toggle Info Bar': '切换信息栏',
        'Toggle Bars': '切换侧边栏',
        'Focus Editor': '聚焦编辑器',
        'Request AI Generation': '请求 AI 生成',
        'Cancel AI Generation': '取消 AI 生成',
        'Focus Input Field': '聚焦输入框',
        'Redo': '重做',
        'Open Redo List': '打开重做列表',
        'Undo': '撤销',
        'Retry AI Generation': '重试 AI 生成',
        'Open Lorebook': '打开世界书',
        'Open Context Viewer': '打开上下文查看器',
        'Open User Scripts Modal': '打开用户脚本菜单',
        'Open Tokenizer': '打开分词器',
        'Open Token Probabilities': '打开 Token 概率',
        'Toggle Editor Token Probabilities': '切换编辑器 Token 概率',
        'Close Modal': '关闭弹窗',
        'Toggle Input Box': '切换底部输入框',
        'Toggle Highlighting': '切换高亮显示',
        'Toggle Spellcheck': '切换拼写检查',
        'Create New Story': '创建新故事',
        'Reset Theme': '重置主题',
        'Delete Current Story': '删除当前故事',
        'Stop TTS': '停止语音播报',
        'Toggle Bold': '切换加粗',
        'Toggle Italic': '切换斜体',
        'Toggle Underline': '切换下划线',
        'Toggle Strikethrough': '切换删除线',

        // --- 悬浮操作按钮与小贴士 ---
        'Find in Story': '在故事中查找',
        'Token Probabilities': 'Token 概率',
        'Turn off Tips?': '关闭小贴士？',
        'Are you sure you want to disable tips for this session?': '您确定要在此会话中禁用小贴士吗？',
        'You can re-enable or permanently turn off tips in the ': '您可以在此处重新启用或永久关闭小贴士：',
        'You can re-enable or permanently turn off tips in the': '您可以在此处重新启用或永久关闭小贴士：',
        'Interface Settings.': '界面设置。',
        'Turn off Tips for this session': '在此会话中关闭小贴士',
        'I changed my mind.': '我改变主意了。',

        // --- 修复未选择时的碎片化提示 ---
        'No Entry selected.': '未选择条目。',
        'Select an Entry from the left to edit it.': '从左侧选择一个条目进行编辑。',
        'No Category selected.': '未选择分类。',
        'Select a Category from the left to edit it.': '从左侧选择一个分类进行编辑。',

        // --- 生成器 (Generator) ---
        'Add Context (advanced)': '添加上下文 (高级)',
        'Include Memory, Author\'s Note, the most recent story text (~2500 characters), or other Lorebook entries in context so that information can be used in generating entries.': '在上下文中包含记忆库、作者留言、最近的故事正文（约 2500 字符）或其他世界书条目，以便在自动生成设定时参考这些信息。',
        'Influences the generator towards generating a specific type of entry. A custom type can be set by typing with the dropdown open and hitting enter.': '引导生成器生成特定类型的条目。可以在下拉菜单打开时直接打字并按回车键来设置自定义类型。',
        'This is where you put what you want to be generated. Proper nouns like "Geometry Incorporated" or short descriptions like "an enthusiastic merchant" work best.': '在这里输入你想要生成的内容。建议使用专有名词（如“几何公司”）或简短的描述（如“热情的商人”），效果最佳。',
        'You can add tags in parenthesis to further describe the entry, e.g. "Stalagmal (prison, space)"': '你可以在括号中添加标签来进一步描述该条目，例如 "Stalagmal (prison, space)"。',
        'Always evaluates to true': '始终判断为真',

        'Generation Type': '生成类型',
        'Input Text': '输入文本',
        'Generate >': '生成 >',
        'Generate': '生成', // 修复独立图标按钮
        'Generation History': '生成历史',
        'General': '通用',
        'Person': '人物',
        'Place': '地点',
        'Thing': '物品',
        'Life': '生物',
        'Faction': '派系',
        'Role': '身份',
        'Concept': '概念',

        // 右键菜单与特殊字符
        'Cut': '剪切',
        'Copy': '复制',
        'Paste': '粘贴',
        'Special Character': '特殊字符',
        'Find': '查找',
        'Add to...': '添加到...',
        'Generate Inline': '行内生成',
        'Writer\'s Toolbox': '作家工具箱',
        'Tokenize': '查看 Token 分词',
        'Screenshot': '网页截图',
        'Speak with TTS': '使用 TTS 朗读',
        'Hint: Ctrl + Right-Click to open the regular browser context menu.': '提示：按住 Ctrl + 右键单击 可打开浏览器默认菜单。',
        'LitRPG game text': 'LitRPG 游戏文本',
        'quotations/excerpts': '引用 / 摘录',
        'poetry/lyrics': '诗歌 / 歌词',
        'scene/chapter break': '场景 / 章节分隔',
        '" " (En Space)': '" " (En 空格)',
        '"  " (Em Space)': '"  " (Em 空格)',
        '• (Bullet)': '• (项目符号)',
        '… (Ellipsis)': '… (省略号)',
        '— (Em Dash)': '— (破折号)',
        '*** (Dinkus)': '*** (章节分隔符)',
        '⁂ (Asterism)': '⁂ (星号组合)',
        'New Lore Entry as Text': '作为正文创建新条目',
        'New Lore Entry as Key': '作为关键词创建新条目',
        
        // 行内工具栏碎句
        'Transform': '转换',
        'Expand': '扩写',
        'Condense': '精简',
        'Rewrite Style': '重写风格',
        'Rewrite Style by ': '重写风格：',
        'Rewrite Style by': '重写风格：',
        'Custom': '自定义',
        ' by ': '：',
        ' by': '：',
        'by ': '：',
        'by': '：', 
        'Expand by ': '扩写：',
        'Expand by': '扩写：',
        'Condense by ': '精简：',
        'Condense by': '精简：',
        'Make the text ': '让文本变得 ',
        'Make the text': '让文本变得',
        'not much': '不多',
        'a little': '稍微',
        'kinda': '有点',
        'quite a bit': '不少',
        'a lot': '大量',
        'very': '非常',
        'Enter a term': '输入词汇',
        'Adjust >': '调整 >',
        'Rewrite to match the style.': '重写以匹配此风格。',
        'Enter a custom instruction.': '输入自定义指令。',

        // 设置与提示 (结合3.25与3.30优势)
        'AI Responses': 'AI 响应',
        'Stream AI Responses': '流式传输 AI 响应',
        'AI responses will be streamed, appearing token by token.': 'AI 的响应将以流式传输，逐字呈现在屏幕上。',
        'Text will appear all at once when generation has finished.': '生成完成后，文本将一次性全部显示。',
        'Continue Response to End of Sentence': '续写至句末',
        'Responses will attempt to continue until the end of a sentence is found.': '生成响应时会尝试一直续写，直到找到一个完整的句子结尾。',
        'Responses will end normally.': '响应将正常结束（不会强制续写至句末）。',
        'Streamed Response Delay': '流式响应延迟',
        'Hypebot': '气氛组机器人',
        'Comment Output': '评论输出模式',
        'Comment Avatar': '评论者头像',
        'Auto-Select': '自动选择',
        'Comment Chance': '评论概率',
        'Comment Streamed Response Delay': '评论流式响应延迟',
        'Preamble': '预引导词',
        'The context will have a small preamble prepended to improve generations on low context. The exact behaviour varies per model.': '在文本内容较少的情况下，会在发送给 AI 的上下文前添加一小段预引导词以改善生成质量。具体效果因模型而异。',
        'The context will not have a preamble prepended.': '上下文前将不会添加预引导词。',
        'Default Bias': '默认概率偏移',
        'A default bias will be applied, reducing the likelihood of dinkus (***) and asterism (⁂) to be generated.': '系统将应用默认的概率偏移，降低 AI 生成章节分隔符 (***) 和星号组合 (⁂) 的可能性。',
        'No default bias will be applied.': '不会应用默认概率偏移。',
        'A bias of zero will have no effect.': '偏移量为 0 时不会产生任何影响。',
        'Enable Token Probabilities': '启用 Token 概率',
        'Token probabilities will not be returned with generation requests.': '生成请求将不会在后台返回 Token 概率数据。',
        'Text Settings': '文本排版设置',
        'Interface Font Size': '界面字体大小',
        'Output Font Size': '正文字体大小',
        'Line Spacing': '行距',
        'Paragraph Indent': '段落首行缩进',
        'Paragraph Spacing': '段落间距',
        'Button Scale': '界面按钮缩放比例',
        'Max Line Width': '正文最大显示宽度',
        'Interaction Settings': '交互设置',
        'Gesture Controls': '触控手势控制',
        'Swiping on touch devices will open and close the sidebars.': '在触屏设备上左右滑动可打开或关闭两侧的边栏。',
        'Gesture controls are disabled.': '触控手势控制已禁用。',
        'Swap Context Menu Controls': '反转右键菜单控制',
        'Right click will open the NAI context menu. Ctrl+right click will open the standard context menu.': '点击右键将打开 NovelAI 专属菜单。按住 Ctrl+右键 单击将打开浏览器标准菜单。',
        'Right click will open the standard context menu. Ctrl+right click will open the NAI context menu.': '右键单击将打开标准上下文菜单。按住 Ctrl+右键单击将打开 NAI 专属菜单。',
        'Other Settings': '其他设置',
        'Input Box': '底部输入框',
        'The input box is hidden.': '隐藏底部的默认输入框。',
        'The input box is visible.': '底部输入框可见。',
        'Editor Highlighting': '编辑器文本高亮',
        'Text in the editor will be highlighted based on origin.': '编辑器中的文本将根据来源（你写的/AI写的）以不同颜色高亮显示。',
        'Text in the editor will not be highlighted.': '编辑器中的文本将不会高亮显示。',
        'Editor Spellcheck': '编辑器拼写检查',
        'Spellcheck is enabled in the editor (on supported browsers)': '在编辑器中启用浏览器自带的拼写检查功能。',
        'Spellcheck is disabled in the editor.': '编辑器中的拼写检查已禁用。',
        'Context Viewer Colors': '上下文查看器着色',
        'Text in the context viewer will be color coded based on origin.': '上下文查看器里的文本将根据来源着色。',
        'Text in the context viewer will use the default color.': '上下文查看器中的文本将使用默认颜色。',
        'Editor Lorebook Keys': '编辑器世界书关键词提示',
        'No special styling will be applied to Lorebook keys in the editor.': '在编辑器中，不对触发了世界书设定的关键词应用特殊高亮样式。',
        'Keys of currently active Lorebook entries will be bolded in the editor. Disabling this setting may improve performance on very large stories or stories with large Lorebooks.': '当前激活的世界书条目关键词将在编辑器中加粗显示。禁用此项可提升性能。',
        'Show Story Title': '显示故事标题',
        'The story title will be shown above the editor.': '故事标题将固定显示在编辑器正上方。',
        'The story title will not be shown above the editor.': '故事标题将不会显示在编辑器上方。',
        'Show Tips': '显示小贴士',
        'Tips will be shown below the editor.': '使用小贴士将显示在编辑器下方。',
        'Tips will not be shown.': '小贴士将不会显示。',
        'Show Editor Toolbar': '悬停编辑工具栏',
        'A toolbox with options to change text formatting and more will appear when selecting text in Editor V2.': '在 V2 版本编辑器中选中文本时，将自动弹出一个用于更改文本格式的快捷工具栏。',
        'Selecting text in Editor V2 will not open the toolbox to change text formatting and more.': '在 V2 版本编辑器中选中文本不再弹出格式更改工具栏。',
        'Auto Format Text': '自动格式化文本',
        'Text—both user and generated—will be automatically formatted in the editor.': '编辑器中的文本将被自动排版格式化。',
        'Text—both user and generated—will not be automatically formatted in the editor.': '用户和生成的文本都不会在编辑器中自动格式化。',
        'Keyboard Displaces Content': '键盘推挤页面内容',
        'The onscreen keyboard of some mobile devices will displace the content of the page.': '在某些移动设备上，唤出屏幕键盘时会往上推挤页面内容。',
        'The onscreen keyboard of some mobile devices will overlay the content of the page.': '某些移动设备的屏幕键盘将覆盖在页面内容之上（而非推挤）。',
        'Paragraph Visibility Range': '段落渲染可见范围',
        'Paragraphs scrolled out-of-view past the set range will be unloaded in Editor V2. This improves editing performance especially with larger stories.': '在 V2 版本编辑器中，滚动出设定范围的段落将被从内存中卸载。这能大幅提高编辑超长篇故事时的网页流畅度。',
        'Highlight Speech': '高亮对话内容',
        'Choose if speech (text between quotation marks) in the editor should be highlighted in italic and slightly less opaque. When choosing Inverted, non-speech is shown in italic and slightly less opaque instead.': '选择是否将编辑器中的角色对话以斜体并降低透明度高亮显示。选择“反转”则高亮非对话部分。',
        'Only available in Editor V2.': '仅在使用 V2 版本编辑器时生效。',
        'Show Identicon': '显示默认生成头像',
        'A theme-specific default avatar will be shown for your account.': '将为你未设置头像的账号显示一个特定主题的默认头像。',
        'A unique identicon will be shown for your account.': '将为您的账号显示一个独特的随机头像。',
        'Show Minibar (Desktop Only)': '显示迷你状态栏（仅限电脑端）',
        'The minibar will not be displayed.': '底部的迷你状态栏将不会显示。',
        'The minibar will display on the left side of the screen.': '迷你状态栏将显示在屏幕左侧。',
        'Clear Comments': '清除评论',
        'Automatically clear comments on generating story text.': '生成故事文本时自动清除评论。',

        // 首页及基础文本
        'Start your first Story': '开始你的第一个故事',
        'Continue a Story': '继续创作',
        'Continue a ': '继续',
        'Visualize your favorite characters.': '将你最爱的角色具象化。',
        'Image Generator': '图像生成器',
        'Generate Anime and Furry imagery with our SOTA image gen model!': '使用我们最先进的模型生成二次元和Furry图像！',
        'Director Tools': '导演工具',
        'Use a variety of AI tools to edit your images.': '使用各种 AI 工具来编辑你的图像。',
        'Last Edited: ': '最后编辑：',
        'A text adventure is an interactive quest, where you have to use Do or Say to interact with the world.': '文字冒险是一个互动的任务，你必须使用“行动”或“说话”与世界互动。',
        'Write alongside the AI to flesh out your writing and ideas.': '与 AI 一同写作，充实你的文笔与创意。',
        'Begin an AI-generated quest using words and actions.': '通过语言和行动，展开一场 AI 生成的冒险之旅。',
        'Let\'s start writing!': '让我们开始创作吧！',
        'Let’s start writing!': '让我们开始创作吧！',
        'Select an option to continue.': '选择一个选项以继续。',
        'Can\'t think of any ideas? Pick one of ours to get started.': '暂时没有头绪？从我们的预设中选一个开始吧。',
        'Can’t think of any ideas? Pick one of ours to get started.': '暂时没有头绪？从我们的预设中选一个开始吧。',
        'Can\'t think of any ideas? ': '暂时没有头绪？',
        'Can’t think of any ideas? ': '暂时没有头绪？',
        'Can\'t think of any ideas?': '暂时没有头绪？',
        'Can’t think of any ideas?': '暂时没有头绪？',
        'Pick one of ours to get started.': '从我们的预设中选一个开始吧。',
        'Use the browser below to select a scenario that tickles your fancy, you\'ll be able to view the contents before starting.': '在下方浏览并选择一个让你心动的场景，开始前可以先预览具体内容。',
        'Use the browser below to select a scenario that tickles your fancy, you’ll be able to view the contents before starting.': '在下方浏览并选择一个让你心动的场景，开始前可以先预览具体内容。',
        'To view information about this Scenario, click here.': '查看关于此场景的信息，请点击这里。',
        'Start Scenario': '开始场景',
        'Shuffle': '换一批',
        'Generate Images': '生成图像',
        'This scenario has no steps.': '这个场景还没有文本生成。',
        'This shelf is empty.': '这个书架是空的。',
        'Your Stories': '你的故事',
        'New Shelf': '新建书架',
        ' Stories': ' 个故事',
        '+ New Story': '+ 新建故事',
        'Import File': '导入文件',
        'New Story': '新建故事',
        'Enter your prompt here...': '在此处输入你的正文或提示词...',
        'Send >': '发送 >',
        'Send': '发送', 
        'What do you want to do?': '你想做什么？',
        'What do you want to say?': '你想说什么？',
        'DO': '行动',
        'SAY': '说话',
        'Story': '故事',
        'Advanced': '高级',
        'Story Mode': '故事模式',
        'Storyteller': '小说创作',
        'Text Adventure': '文字冒险',
        'AI Model': 'AI 模型',
        'Change Default': '更改默认',
        'Config Preset': '配置预设',
        'Edit Preset': '编辑预设',
        'Changes the settings of the AI model.': '更改当前 AI 模型的生成参数。',
        'Editor Token Probabilities': '编辑器 Token 概率',
        'Enable to show selectable alternate tokens and probabilities in the editor.': '启用后，在编辑器中显示 AI 的备选词及概率。',
        'Memory': '记忆库',
        'The AI will better remember info placed here.': 'AI 会牢记放置在这里的背景设定。',
        ' tokens': ' 个 Token',
        'Author\'s Note': '作者留言',
        'Info placed here will strongly influence AI output.': '此处的文字将强力干预 AI 的后续生成。',
        'Lorebook Quick Access': '世界书快速检索',
        'Search for an entry': '搜索世界书条目...',
        'Story Options': '故事选项',
        'View Story Stats': '查看故事数据统计',
        'Remote Storage': '云端同步存储',
        'Story is currently stored locally. Locally stored stories may be deleted by your browser after a period of non-use.': '当前故事仅保存在本地。',
        
        // --- Remote Storage 模态弹窗及碎句补全 ---
        'Your account is set to store stories only on your local device. Local storage is not meant to be persistent, and a loss of your stories can occur for a number of reasons and at any time.': '您的账号设置为仅在本地设备上存储故事。本地存储并非永久性存储，在任何时候都可能因各种原因导致故事丢失。',
        'Your account is set to store stories ': '您的账号设置为将故事',
        'only on your local device.': '仅限本地设备。',
        'only on your local device': '仅限本地设备',
        ' only on your local device.': ' 仅限本地设备。',
        ' only on your local device': ' 仅限本地设备',
        '. Local storage is not meant to be persistent, and a loss of your stories can occur for a number of reasons and at any time.': '。本地存储并非永久性存储，在任何时候都可能因各种原因导致故事丢失。',
        ' Local storage is not meant to be persistent, and a loss of your stories can occur for a number of reasons and at any time.': ' 本地存储并非永久性存储，在任何时候都可能因各种原因导致故事丢失。',
        'Local storage is not meant to be persistent, and a loss of your stories can occur for a number of reasons and at any time.': '本地存储并非永久性存储，在任何时候都可能因各种原因导致故事丢失。',
        'We recommend storing your stories on our servers. They are locally encrypted and inaccessible to anyone but you. This setting can also be changed for each story individually.': '我们建议您将故事存储在我们的服务器上。它们在本地加密，除您之外的任何人均无法访问。此设置也可在各个故事的设置中单独更改。',
        'We recommend storing your stories on our servers.': '我们建议您将故事存储在我们的服务器上。',
        ' They are locally encrypted and inaccessible to anyone but you. This setting can also be changed for each story individually.': '它们将在本地加密，除您之外的任何人均无法访问。此设置也可在各个故事中单独更改。',
        'Switch to Remote Storage': '切换至云端同步存储',
        'Keep Local Storage': '保持本地存储',
        
        'Make sure to export and manually back up your stories if you store them locally. You can export all stories in the Account Settings. Switching to remote storage does not move existing stories to our servers automatically, this can be changed in each stories settings individually.': '如果使用本地存储，请务必导出并手动备份您的故事。您可以在账号设置中导出所有故事。切换到云端同步存储不会自动将现有故事移动到服务器上，此操作需要在每个故事的设置中单独进行更改。',
        'Make sure to export and manually back up your stories if you store them locally. ': '如果使用本地存储，请务必导出并手动备份您的故事。',
        'Make sure to export and manually back up your stories if you store them locally.': '如果使用本地存储，请务必导出并手动备份您的故事。',
        'You can export all stories in the ': '您可以在',
        'You can export all stories in the': '您可以在',
        '. Switching to remote storage does not move existing stories to our servers automatically, this can be changed in each stories settings individually.': '中导出所有故事。切换到云端同步存储不会自动将现有故事移动到服务器上，此操作需要在各个故事的设置中单独进行更改。',
        ' Switching to remote storage does not move existing stories to our servers automatically, this can be changed in each stories settings individually.': '切换到云端同步存储不会自动将现有故事移动到服务器上，此操作需要在各个故事的设置中单独进行更改。',
        'Switching to remote storage does not move existing stories to our servers automatically, this can be changed in each stories settings individually.': '切换到云端同步存储不会自动将现有故事移动到服务器上，此操作需要在各个故事的设置中单独进行更改。',

        'Export Story': '导出故事',
        'To File': '导出为文件',
        'As Scenario': '导出为场景',
        'As Plaintext': '导出为纯文本',
        'To Clipboard': '复制到剪贴板',
        'As Image': '导出为长图',
        'Delete Story': '删除当前故事',
        '(cannot be undone)': '删除后无法恢复',
        'Delete': '删除',
        'Context': '上下文',
        'Last Context': '上次上下文',
        'Current Context': '当前上下文',
        'Context Viewer': '上下文查看器',
        'Get a full view of what’s sent to the AI.': '全面查看发送给 AI 的所有内容。',
        'Get a full view of what\'s sent to the AI.': '全面查看发送给 AI 的所有内容。',
        
        // --- 系统提示词 ---
        'Edit System Prompt': '编辑系统提示词',
        'System Prompt': '系统提示词',
        'The system prompt is the initial system message given to the model. Leave blank for the default system message.': '系统提示词是提供给模型的初始系统消息。留空则使用默认系统消息。',
        'Reset to Default': '恢复默认',
        'Copy Default': '复制默认',
        'Prefill': '预填充',
        'The prefill is inserted at the beginning of the most recent assistant message. Leave blank to use the default prefill.': '预填充将插入到最新一条助手消息的开头。留空则使用默认预填充。',
        
        'User Scripts': '用户脚本',
        'Extend NovelAI with custom scripts.': '使用自定义脚本来扩展 NovelAI 的功能。',
        'Edit User Scripts': '编辑自定义脚本',
        'Logit Bias': '词汇概率干预',
        'Export': '导出',
        'Weigh the AI\'s chance of generating specific tokens.': '人为干预 AI 生成特定词汇的概率。',
        'Weigh the AI’s chance of generating specific tokens.': '人为干预 AI 生成特定词汇的概率。',
        'Type in the area below, then press enter to save.': '在下方输入想干预的词，然后按回车键保存。',
        'Enter the text you want to bias': '输入文本...',
        'Bias: ': '概率偏移: ',
        'Default: ': '默认: ',
        'LESS': '降低概率',
        'MORE': '提高概率',
        'Tokens': 'Tokens',
        'Click a token to edit it.': '点击下方 Token 即可进行编辑。',
        'Avoid Overused Words': '避免陈词滥调',
        'Reduces the chance of generating words and phrases overused by AI models.': '开启后，可降低 AI 频繁使用某些“套话”的几率。',
        'Stop Sequences': '停止生成序列',
        'Type here and hit enter to add a stop sequence': '输入特定字符并按回车，遇到该字符时将立即停止',
        'Cuts generation short upon reaching a specified string.': '当遇到指定的字符串时，立即停止生成。',
        'Enable or disable this phrase group.': '启用或禁用此短语组。',
        'Duplicate and Start as Scenario': '复制并作为新场景开始',
        'Imports current story as a scenario with placeholders': '将当前故事带入占位符，转换为新的模板场景。',
        'Import': '导入',
        'Choose from a selection of generation settings.': '从下拉列表中选择生成参数配置。',
        'Generation Options': '生成选项',
        'Randomness': '随机性',
        'The higher the value, the more random the output!': '该数值越高，AI 生成的内容就越发散和随机！',
        'Output Length': '单次输出长度',
        'Increase the length of the generated responses': '增加 AI 每次生成的文本长度限制',
        '~ 1024 Characters': '~ 1024 个字符',
        'Advanced Options': '进阶选项',
        'Experimentation with these settings is encouraged, but be warned that their effects aren\'t always obvious.': '鼓励尝试调整，但效果并不总是立竿见影。',
        'This guide explains these settings.': '点击此处查看参数设置指南。',
        'Sampling': '采样方式',
        'Change Samplers': '调整采样器顺序',
        '1 hidden': '1个已隐藏',
        'Keeps this many tokens, and deletes the rest.': '仅保留指定数量的 Token，并删除其余的。',
        'Keeps this many ↑ Token, and deletes the rest.': '仅保留指定数量的 Token，并删除其余的。',
        'Adds the largest token probabilities until the sum reaches this value, then deletes the leftover tokens. Higher settings preserve more tokens.': '将最大的 Token 概率相加，直到总和达到此值，然后删除剩余的。设置值越高，保留的 Token 越多。',
        'Adds the largest token probabilities until the sum reaches this value, then deletes the leftover ↑ Token. Higher settings preserve more ↑ Token.': '将最大的 Token 概率相加，直到总和达到此值，然后删除剩余的。设置值越高，保留的 Token 越多。',
        'Alternate Repetition Penalty': '备选重复惩罚',
        'These options will strongly impact generation and are not recommended to set to high values.': '注意：这些选项会极大地改变生成逻辑，不建议设置过高。',
        'Presence: ': '存在惩罚: ',
        'Frequency: ': '频率惩罚: ',
        'Applies a static penalty to the generation of tokens that appear within the Repetition Penalty Range.': '对出现在“重复惩罚范围”内的 Token 的生成应用静态惩罚。',
        'Applies a static penalty to the generation of ↑ Token that appear within the Repetition Penalty Range.': '对出现在“重复惩罚范围”内的 Token 的生成应用静态惩罚。',
        'Applies a penalty to the generation of tokens based on the number of occurrences of that token within the Repetition Penalty Range.': '根据 Token 在“重复惩罚范围”内出现的次数，对其生成应用惩罚。',
        'Applies a penalty to the generation of ↑ Token based on the number of occurrences of that token within the Repetition Penalty Range.': '根据 Token 在“重复惩罚范围”内出现的次数，对其生成应用惩罚。',
        'Set a bias on specific tokens to increase or decrease their chance of being generated. Surround with [square brackets] to input token ids (tokenizer specific). If a sequence of tokens is given, only the first will have the bias applied.': '对特定的 Token 设置概率偏移，以增减其生成的几率。用 [方括号] 括起来输入 token ID。',

        // !!! 完整合并的世界书(Lorebook)及全量字典 !!!
        'Lorebook': '世界书',
        'New Lorebook Entry': '新世界书条目',
        'New Lorebook Entry:': '新世界书条目：',
        'Welcome to\n': '欢迎来到\n',
        'Welcome to ': '欢迎来到 ',
        'Welcome to': '欢迎来到',
        'the Lorebook!': '世界书！',
        'The perfect place to flesh out your story’s world, events, locations, characters, and environments. There are lots of settings, but you only need to worry about the ': '这里是丰富故事世界观、事件、地点、角色和环境的绝佳地点。如果刚入门，只需关注“',
        'The perfect place to flesh out your story\'s world, events, locations, characters, and environments. There are lots of settings, but you only need to worry about the ': '这里是丰富故事世界观、事件、地点、角色和环境的绝佳地点。如果刚入门，只需关注“',
        ' tab if you’re just getting started.': '”标签页即可。',
        ' tab if you\'re just getting started.': '”标签页即可。',
        'Simply place the info about your subject in the Entry Text field, and specify what Activation Keys should be looked for to show the entry to the AI.': '只需将设定的信息放入“条目文本”中，并指定“激活关键词”，当正文中出现关键词时，设定就会自动展示给 AI。',
        'You can get started by clicking the “+ Entry” button.': '点击“+ 新建条目”按钮即可开始。',
        'Entries': '条目列表',
        '+ Entry': '+ 新建条目',
        '+ Category': '+ 新建分类',
        'Entry': '条目',
        'Entry has no keys': '该条目未设置关键词',
        'Entry has no keys.': '该条目未设置关键词。',
        'The text here will be searched for Lorebook activation keys, and the matching Lore placed in context.': '将在此处的文本中搜索世界书激活关键词，并将匹配的设定放入上下文中。',
        'Conditions': '触发条件',
        'Let the AI fill in the blanks for you! Choose the type of entry from the list, enter what you want to generate, and hit generate. You can also have the AI add to text written in the Lore entry just like in the Story.': '让 AI 帮你填补空白！选择类型，输入要求，然后点击生成。你也可以让 AI 直接续写条目，就像在故事正文中一样。',
        'A Lorebook entry is activated and its text placed in context whenever one of its keys is found in the recent story. Keys are case-insensitive.': '每当在最近的故事正文中找到对应的激活关键词时，该条目就会被激活，其文本将被放入上下文中。关键词不区分大小写。',
        'Keys that begin and end with "/" are evaluated as regex. These regex keys are case-sensitive and support the following flags: i, s, m, and u.': '以 "/" 开头和结尾的关键词将被作为正则表达式(regex)解析。区分大小写，支持标志: i, s, m, u。',
        'Advanced conditions allow more complex logic for when this lore entry should activate.': '高级触发条件允许使用更复杂的逻辑来决定该条目何时激活。',
        'Advanced conditions': '高级触发条件',
        'Advanced Conditions': '高级触发条件',
        'Add Condition': '添加条件',
        'No advanced conditions configured. Click "Add Condition" to create one.': '尚未配置高级条件。点击“添加条件”以创建一个。',
        'Note: ': '注意：',
        'Note:': '注意：',
        'Multiple top-level conditions use OR logic. The entry will activate if any condition evaluates to true.': '多个顶级条件使用 OR(或) 逻辑。若任一条件为真，则激活条目。',
        ' Multiple top-level conditions use OR logic. The entry will activate if any condition evaluates to true.': ' 多个顶级条件使用 OR(或) 逻辑。若任一条件为真，则激活条目。',
        'Type information about the entry here.': '在此处输入该条目的设定信息。',
        'Type a key here and hit enter to save it': '在此输入关键词，按回车键保存',
        'True': '始终生效',
        'Keyword Match': '关键词匹配',
        'Keyword match': '关键词匹配',
        'Keyword': '关键词',
        'Lore Entry Active': '世界书条目激活',
        'Random Chance': '随机概率',
        'Numeric Comparison': '数值比较',
        'String Comparison': '文本比较',
        'AND Group': '满足全部条件',
        'OR Group': '满足任一条件',
        'NOT': '条件取反',
        'Dock active tab to side': '停靠至侧边',
        'Entry Text': '条目设定文本',
        'Generator': '生成器',
        'The following text will be referenced when the Keys are activated.': '当关键词被激活时，AI 将自动参考下方框内的设定文本。',
        'Activation Keys': '激活关键词',
        'Activates the entry when found within the recent story.': '当在最近的故事正文中发现这些词时，将唤醒该条目设定。',
        'Always On': '始终激活',
        'No Keys set.': '未设置关键词。',
        'Category': '所属分类',
        'No Category': '无分类',
        ' Tokens': ' 个 Token',
        ' tokens (': ' Token (',

        // --- 补充设置标题与杂项 ---
        'Lorebook Entry Header': '世界书条目标题',
        'Entry Header': '条目标题',
        'The text entered here will be automatically placed above any entry in this category.': '此处输入的文本将自动放置在该分类下所有条目的正文上方。',
        'Enter default entry header...': '输入默认条目标题...',
        'Delete Category?': '删除分类？',
        'Delete Story?': '删除故事？',
        'Are you sure you want to delete the category "': '是否确认删除分类 "',
        'Are you sure you want to delete "': '是否确认删除 "',
        'This cannot be reversed.': '此操作无法恢复。',
        'Delete Containing Entries': '连同包含的条目一起删除',
        'Deleting the category will move all entries out of the category.': '删除分类将会把所有条目移出该分类（保留条目本身）。',
        'Deleting the category will also delete all entries within it.': '删除分类的同时也将彻底删除其中的所有条目。',
        'Delete it!': '确认删除！',
        
        'Story Statistics': '故事统计',
        'Get a perspective on your writing.': '全方位了解你的写作数据。',
        'Generate Additional Stats': '生成额外统计数据',
        'WARNING: The following options are experimental and could result in permanent corruption of your story. Creating a backup first is heavily advised.': '警告：以下选项为实验性功能，可能导致你的故事永久损坏。强烈建议先创建备份。',
        'Trim Story': '修剪故事',
        'Flatten Story': '展平故事',
        'Reset to Prompt': '重置为提示词',
        'Excludes pronouns, conjunctions, prepositions, articles, and determiners': '排除代词、连词、介词、冠词和限定词',
        'Most Used Words': '最常用词',
        'Save to new Preset?': '保存为新预设？',
        'Settings saved to story.': '设置已保存至故事。',
        'Other Options': '其他选项',
        'Reset Changes': '重置所有更改',
        'Changes': '更改',
        'Paragraphs': '段落',
        'Samplers': '采样器',
        'You can reorder samplers here.': '你可以在这里对采样器进行重新排序。',
        'Disabled samplers will be hidden from the sidebar.': '被禁用的采样器将从侧边栏中隐藏。',
        'Temperature': '温度',
        'Top-K Sampling': 'Top-K 采样',
        'Nucleus Sampling': 'Nucleus 采样',
        'Tail-Free Sampling': 'Tail-Free 采样',
        'Typical Sampling': 'Typical 采样',
        'Min-P (disabled)': 'Min-P (已禁用)',
        '(disabled)': '(已禁用)',
        'disable': '禁用',
        'enable': '启用',
        'Message Scaffolding & System Prompt:': '消息构建 & 系统提示词：',
        'Message Scaffolding & System Prompt': '消息构建 & 系统提示词',
        'Search your stories': '搜索你的故事...',
        'Filters': '筛选',
        'Display': '显示',
        'Compact View': '紧凑视图',
        'Show On Top': '置顶显示',
        'Shelves': '书架',
        'Shelf': '所属书架',
        'No Shelf': '无书架',
        'Favorites': '收藏夹',
        'Sort By': '排序方式',
        'Most Recent': '最近使用',
        'Story Title': '故事标题',
        'Story is currently stored encrypted on the server.': '当前故事已加密存储在云端服务器上。',
        'Description': '故事简介',
        'Search Tags': '搜索标签',
        'Type in the box below and press enter to save.': '在下方输入并按回车键保存。',
        'Type here and hit enter to save': '在此输入并按回车键保存',
        'Click a tag to delete it.': '点击标签即可将其删除。',
        'Prompt Chunks': '提示词区块',
        'No custom prompt chunks yet. Click + to add one.': '暂无自定义提示词区块。点击 + 号添加。',
        
        // --- 特殊长句切分修复 ---
        'A default bias will be applied, reducing the likelihood of dinkus': '系统将应用默认概率偏移，降低生成章节分隔符',
        'A default bias will be applied, reducing the likelyhood of dinkus': '系统将应用默认概率偏移，降低生成章节分隔符',
        'A default bias will be applied, reducing the likelihood of dinkus ': '系统将应用默认概率偏移，降低生成章节分隔符 ',
        'A default bias will be applied, reducing the likelyhood of dinkus ': '系统将应用默认概率偏移，降低生成章节分隔符 ',
        'A default bias will be applied, reducing the likelihood of dinkus (': '系统将应用默认概率偏移，降低生成章节分隔符 (',
        'A default bias will be applied, reducing the likelyhood of dinkus (': '系统将应用默认概率偏移，降低生成章节分隔符 (',
        ') and asterism (': ') 和星号组合 (',
        ') to be generated.': ') 的可能性。',
        'Generation requests will return token probabilities for the response which can be examined by clicking the': '生成请求将后台返回响应的 Token 概率，可通过点击',
        'Generation requests will return token probabilities for the response which can be examined by clicking the ': '生成请求将后台返回响应的 Token 概率，可通过点击 ',
        'button next to Retry.': '图标（位于重试按钮旁）进行查看。',
        ' button next to Retry.': ' 图标（位于重试按钮旁）进行查看。',
        'Selectable alternate tokens and probabilities will be shown in the editor.': '编辑器中将显示可选的备选词及其概率。',
        'Words will be chosen solely based on their natural likelihood of being generated.': '将完全根据词汇生成的自然概率来选择词汇。'
    };

    // ==========================================
    // 3. 核心翻译引擎与逻辑
    // ==========================================

    let activeTranslationMap = {};
    let regex;

    // 动态更新词典的方法（修复 SPA 路由切换问题的核心）
    function updateDictionary() {
        const pathname = window.location.pathname;
        if (pathname.includes('/image') || pathname.includes('/imagetools')) {
            activeTranslationMap = Object.assign({}, commonTranslationMap, imageTranslationMap);
        } else if (pathname.includes('/inspect')) {
            activeTranslationMap = Object.assign({}, commonTranslationMap, inspectTranslationMap);
        } else if (pathname.includes('/stor')) {
            activeTranslationMap = Object.assign({}, commonTranslationMap, storiesTranslationMap);
        } else {
            // 全局包含防漏
            activeTranslationMap = Object.assign({}, commonTranslationMap, imageTranslationMap, storiesTranslationMap, inspectTranslationMap); 
        }

        if (Object.keys(activeTranslationMap).length > 0) {
            const sortedKeys = Object.keys(activeTranslationMap).sort((a, b) => b.length - a.length);
            const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            regex = new RegExp(sortedKeys.map(escapeRegExp).join('|'), 'g');
        }
    }

    function replaceText(node) {
        if (!regex || node.nodeType !== Node.TEXT_NODE || !node.nodeValue.trim()) return;

        if (node.parentElement) {
            const tagName = node.parentElement.tagName;
            // 修复 Bug：去除了过度匹配的 .prompt-input-box-prompt，仅保护真正的输入控件 ProseMirror 和 textarea，解放外围 UI 按钮
            if (tagName === 'CODE' || tagName === 'TEXTAREA' || tagName === 'INPUT' ||
                node.parentElement.closest('.image-prompt-suggestions, .ProseMirror, textarea, input, [contenteditable="true"]')) {
                return;
            }
        }

        let text = node.nodeValue;
        
        // 孤立碎词精准匹配，防止误伤（如 Expand by a little 中的 by，绝对不会影响 probabilities）
        if (text.trim() === 'by') {
            node.nodeValue = text.replace('by', '：');
            return;
        }

        let replacedValue = text.replace(regex, (match) => activeTranslationMap[match]);
        if (node.nodeValue !== replacedValue) {
            node.nodeValue = replacedValue;
        }
    }

    function translateAttributes(node) {
        if (!regex || node.nodeType !== Node.ELEMENT_NODE) return;
        
        // 加入了 data-placeholder, data-empty-text 和 value 属性进行深层拦截扫描，搞定富文本顽固占位符
        const attributesToTranslate = ['placeholder', 'title', 'aria-label', 'data-placeholder', 'data-empty-text', 'value'];
        
        attributesToTranslate.forEach(attr => {
            if (node.hasAttribute(attr)) {
                const val = node.getAttribute(attr);
                let replacedValue = val.replace(regex, (match) => activeTranslationMap[match]);
                if (val !== replacedValue) {
                    node.setAttribute(attr, replacedValue);
                }
            }
        });

        const children = node.querySelectorAll(attributesToTranslate.map(attr => `[${attr}]`).join(', '));
        children.forEach(child => {
            attributesToTranslate.forEach(attr => {
                if (child.hasAttribute(attr)) {
                    const val = child.getAttribute(attr);
                    let replacedValue = val.replace(regex, (match) => activeTranslationMap[match]);
                    if (val !== replacedValue) {
                        child.setAttribute(attr, replacedValue);
                    }
                }
            });
        });
    }

    function translateNode(node) {
        const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
        let currentNode;
        while (currentNode = walker.nextNode()) {
            replaceText(currentNode);
        }
        translateAttributes(node);
    }

    let observer = null;
    let isTranslating = false;

    function startTranslation() {
        translateNode(document.body);
        modifyPageTitle(window.location.pathname);

        observer = new MutationObserver(mutations => {
            if (isTranslating) return;
            
            isTranslating = true;
            observer.disconnect(); 

            mutations.forEach(mutation => {
                if (mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            translateNode(node);
                        } else if (node.nodeType === Node.TEXT_NODE) {
                            replaceText(node);
                        }
                    });
                }
                if (mutation.type === 'characterData' && mutation.target.parentNode) {
                    replaceText(mutation.target);
                }
                if (mutation.type === 'attributes') {
                    const val = mutation.target.getAttribute(mutation.attributeName);
                    if (val) {
                        let replacedValue = val.replace(regex, (match) => activeTranslationMap[match]);
                        if (val !== replacedValue) {
                            mutation.target.setAttribute(mutation.attributeName, replacedValue);
                        }
                    }
                }
            });

            // 监听器中也补充了遗漏的深层属性监控
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                characterData: true,
                attributes: true,
                attributeFilter: ['placeholder', 'title', 'aria-label', 'data-placeholder', 'data-empty-text', 'value']
            });
            isTranslating = false;
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true,
            attributeFilter: ['placeholder', 'title', 'aria-label', 'data-placeholder', 'data-empty-text', 'value']
        });
    }

    // ==========================================
    // 4. 监听 SPA 路由切换 (修复多页面切换不翻译问题)
    // ==========================================
    
    let lastPathname = window.location.pathname;

    function handleRouteChange() {
        const currentPathname = window.location.pathname;
        if (currentPathname !== lastPathname) {
            lastPathname = currentPathname;
            // 1. 网址变更时，重新匹配并更新词典库
            updateDictionary();
            // 2. 更新网页标题
            modifyPageTitle(currentPathname);
            // 3. 延迟一小段时间，等待新页面的 DOM 框架渲染出来后，手动触发一次全量大扫除翻译
            setTimeout(() => {
                if (document.body) {
                    translateNode(document.body);
                }
            }, 500); // 500ms 延迟足以应对大部分框架的渲染
        }
    }

    // 拦截原生的路由跳转 API
    const originalPushState = history.pushState;
    history.pushState = function () {
        originalPushState.apply(this, arguments);
        handleRouteChange();
    };

    const originalReplaceState = history.replaceState;
    history.replaceState = function () {
        originalReplaceState.apply(this, arguments);
        handleRouteChange();
    };

    // 监听浏览器的前进、后退按钮
    window.addEventListener('popstate', handleRouteChange);

    // ==========================================
    // 5. 脚本入口点
    // ==========================================
    
    updateDictionary(); // 初始加载时分配词典
    updateMenuText();

    const checkReady = setInterval(() => {
        const readyElements = [
            '.prompt-input-box-prompt',
            'button.button',           
            '.ProseMirror',            
            'textarea', 
            '.welcome-message',         
            '[class*="Modal"]'          
        ];
        
        if (readyElements.some(selector => document.querySelector(selector))) {
            clearInterval(checkReady);
            startTranslation();
        }
    }, 500);

})();
