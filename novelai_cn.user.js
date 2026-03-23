// ==UserScript==
// @name         NovelAI 简体中文汉化脚本
// @namespace    https://novelai.net/
// @version      2.9
// @author       W是包子N不理
// @match        https://novelai.net/stories*
// @match        https://novelai.net/story*
// @icon         https://novelai.net/icons/novelai-round.png
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 文本替换映射表
    const storiesTranslationMap = {
        // --- 右键上下文菜单 (Context Menu) ---
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

        // 特殊字符子菜单
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

        // 添加到... 子菜单
        'New Lore Entry as Text': '作为正文创建新条目',
        'New Lore Entry as Key': '作为关键词创建新条目',

        // --- 行内文本编辑工具 (Inline Editor Toolbar) ---
        'Transform': '转换',
        'Expand': '扩写',
        'Condense': '精简',
        'Rewrite Style': '重写风格',
        'Custom': '自定义',
        
        // 游离连接词终极修复
        ' by ': '：',
        ' by': '：',
        'by ': '：',
        'by': '：', // 击杀完全孤立的 by
        
        'Expand by ': '扩写：',
        'Expand by': '扩写：',
        'Condense by ': '精简：',
        'Condense by': '精简：',
        
        'Make the text ': '让文本变得 ',
        'Make the text': '让文本变得',
        
        // 程度词碎片（斜体部分）
        'not much': '不多',
        'a little': '稍微',
        'kinda': '有点',
        'quite a bit': '不少',
        'a lot': '大量',
        'very': '非常',
        
        // 占位符与按钮
        'Enter a term': '输入词汇',
        'Adjust >': '调整 >',
        'Save': '保存',
        'Cancel': '取消',
        
        'Rewrite to match the style.': '重写以匹配此风格。',
        'Enter a custom instruction.': '输入自定义指令。',

        // --- 侧边栏菜单与设置项大全 ---
        'User Settings': '用户设置',
        'AI Settings': 'AI 设置',
        'Interface': '界面',
        'Theme': '主题',
        'Account': '账号',
        'Text To Speech': '文字转语音', 
        'Defaults': '默认设置',
        'Hotkeys': '快捷键',
        'Support': '支持',
        'Change Log': '更新日志',
        'Logout': '退出登录',

        // --- AI Settings (AI 设置) ---
        'AI Responses': 'AI 响应',
        'Stream AI Responses': '流式传输 AI 响应',
        'AI responses will be streamed, appearing token by token.': 'AI 的响应将以流式传输，逐字呈现在屏幕上。',
        'Continue Response to End of Sentence': '续写至句末',
        'Responses will attempt to continue until the end of a sentence is found.': '生成响应时会尝试一直续写，直到找到一个完整的句子结尾。',
        'Streamed Response Delay': '流式响应延迟',
        'Hypebot': '气氛组机器人',
        'Comment Output': '评论输出模式',
        'Off': '关闭',
        'Automatic': '自动',
        'Permanent': '永久显示',
        'Comment Avatar': '评论者头像',
        'Auto-Select': '自动选择',
        'Comment Chance': '评论概率',
        'Comment Streamed Response Delay': '评论流式响应延迟',
        'Experimental': '实验性功能',
        'Preamble': '预引导词',
        'The context will have a small preamble prepended to improve generations on low context. The exact behaviour varies per model.': '在文本内容较少的情况下，会在发送给 AI 的上下文前添加一小段预引导词以改善生成质量。具体效果因模型而异。',
        'Default Bias': '默认概率偏移',
        'A default bias will be applied, reducing the likelihood of dinkus (***) and asterism (⁂) to be generated.': '系统将应用默认的概率偏移，降低 AI 生成章节分隔符 (***) 和星号组合 (⁂) 的可能性。',
        'Enable Token Probabilities': '启用 Token 概率',
        'Token probabilities will not be returned with generation requests.': '生成请求将不会在后台返回 Token 概率数据。',

        // --- Interface (界面设置) ---
        'UI Language': '界面语言',
        'English': '英文',
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
        'Swap Context Menu Controls': '反转右键菜单控制',
        'Right click will open the NAI context menu. Ctrl+right click will open the standard context menu.': '点击右键将打开 NovelAI 专属菜单。按住 Ctrl+右键 单击将打开浏览器标准菜单。',
        'Other Settings': '其他设置',
        'Input Box': '底部输入框',
        'The input box is hidden.': '隐藏底部的默认输入框。',
        'Editor Highlighting': '编辑器文本高亮',
        'Text in the editor will be highlighted based on origin.': '编辑器中的文本将根据来源（你写的/AI写的）以不同颜色高亮显示。',
        'Editor Spellcheck': '编辑器拼写检查',
        'Spellcheck is enabled in the editor (on supported browsers)': '在编辑器中启用浏览器自带的拼写检查功能。',
        'Context Viewer Colors': '上下文查看器着色',
        'Text in the context viewer will be color coded based on origin.': '上下文查看器里的文本将根据来源着色。',
        'Editor Lorebook Keys': '编辑器世界书关键词提示',
        'No special styling will be applied to Lorebook keys in the editor.': '在编辑器中，不对触发了世界书设定的关键词应用特殊高亮样式。',
        'Show Story Title': '显示故事标题',
        'The story title will be shown above the editor.': '故事标题将固定显示在编辑器正上方。',
        'Show Tips': '显示小贴士',
        'Tips will be shown below the editor.': '使用小贴士将显示在编辑器下方。',
        'Show Editor Toolbar': '悬停编辑工具栏',
        'A toolbox with options to change text formatting and more will appear when selecting text in Editor V2.': '在 V2 版本编辑器中选中文本时，将自动弹出一个用于更改文本格式的快捷工具栏。',
        'Auto Format Text': '自动格式化文本',
        'Text—both user and generated—will be automatically formatted in the editor.': '编辑器中的文本（包括用户输入和 AI 生成的内容）将被自动排版格式化。',
        'Keyboard Displaces Content': '键盘推挤页面内容',
        'The onscreen keyboard of some mobile devices will displace the content of the page.': '在某些移动设备上，唤出屏幕键盘时会往上推挤页面内容。',
        'Paragraph Visibility Range': '段落渲染可见范围',
        'Paragraphs scrolled out-of-view past the set range will be unloaded in Editor V2. This improves editing performance especially with larger stories.': '在 V2 版本编辑器中，滚动出设定范围的段落将被从内存中卸载。这能大幅提高编辑超长篇故事时的网页流畅度。',
        'Highlight Speech': '高亮对话内容',
        'Choose if speech (text between quotation marks) in the editor should be highlighted in italic and slightly less opaque. When choosing Inverted, non-speech is shown in italic and slightly less opaque instead.': '选择是否将编辑器中的角色对话（引号之间的文本）以斜体并稍微降低透明度的方式高亮显示。如果选择“反转”，则非对话的旁白部分会被处理。',
        'Only available in Editor V2.': '仅在使用 V2 版本编辑器时生效。',
        'Show Identicon': '显示默认生成头像',
        'A theme-specific default avatar will be shown for your account.': '将为你未设置头像的账号显示一个特定主题的默认头像。',
        'Show Minibar (Desktop Only)': '显示迷你状态栏（仅限电脑端）',
        'The minibar will not be displayed.': '底部的迷你状态栏将不会显示。',

        // --- Account (账号设置 & 账号信息修改) ---
        'Current Tier': '当前订阅层级',
        'Manage': '管理订阅',
        'Your subscription renews around ': '你的订阅预计将在 ',
        'Your subscription renews around': '你的订阅预计将在',
        ' @ ': ' 更新。',
        'Pen Name': '笔名',
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

        // --- 首页引导与欢迎页 ---
        'Welcome back, Author': '欢迎回来，作者',
        'Start your first Story': '开始你的第一个故事',
        'Continue a Story': '继续创作',
        'Continue a ': '继续',
        'Visualize your favorite characters.': '将你最爱的角色具象化。',
        'Image Generator': '图像生成器',
        'Generate Anime and Furry imagery with our SOTA image gen model!': '使用我们最先进的模型生成二次元和Furry图像！',
        'Director Tools': '导演工具',
        'Use a variety of AI tools to edit your images.': '使用各种 AI 工具来编辑你的图像。',
        'Last Edited: ': '最后编辑：',

        // --- 引导页与状态提示 ---
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

        // --- 侧边栏与基础 UI ---
        'Your Stories': '你的故事',
        'New Shelf': '新建书架',
        ' Stories': ' 个故事',
        '+ New Story': '+ 新建故事',
        'Import File': '导入文件',
        'New Story': 'New Story',

        'Enter your prompt here...': '在此处输入你的正文或提示词...',
        'Send >': '发送 >',
        'What do you want to do?': '你想做什么？',
        'What do you want to say?': '你想说什么？',
        'DO': '行动',
        'SAY': '说话',

        'Story': '故事',
        'Advanced': '高级',

        // --- 故事设置与模型 ---
        'Story Mode': '故事模式',
        'Storyteller': '小说创作',
        'Text Adventure': '文字冒险',
        'AI Model': 'AI 模型',
        'Change Default': '更改默认',
        'Config Preset': '配置预设',
        'Edit Preset': '编辑预设',
        'Default': '默认',
        'Changes the settings of the AI model.': '更改当前 AI 模型的生成参数。',

        'Editor Token Probabilities': '编辑器 Token Probabilities',
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
        'Export Story': '导出故事',
        'To File': '导出为文件',
        'As Scenario': '导出为场景',
        'As Plaintext': '导出为纯文本',
        'To Clipboard': '复制到剪贴板',
        'As Image': '导出为长图',
        'Delete Story': '删除当前故事',
        '(cannot be undone)': '删除后无法恢复',
        'Delete': '删除',

        // --- 上下文 (Context) 面板 ---
        'Context': '上下文',
        'Last Context': '上次上下文',
        'Current Context': '当前上下文',
        'Get a full view of what’s sent to the AI.': '全面查看发送给 AI 的所有内容。',
        'Get a full view of what\'s sent to the AI.': '全面查看发送给 AI 的所有内容。',

        // --- 高级设置与滑块 ---
        'Edit System Prompt': '编辑系统提示词',
        'User Scripts': '用户脚本',
        'Extend NovelAI with custom scripts.': '使用自定义脚本来扩展 NovelAI 的功能。',
        'Edit User Scripts': '编辑自定义脚本',
        'Logit Bias': '词汇概率干预',
        'Export': '导出',
        'Weigh the AI\'s chance of generating specific tokens.': '人为干预 AI 生成特定词汇的概率。',
        'Type in the area below, then press enter to save.': '在下方输入想干预的词，然后按回车键保存。',
        'Enter the text you want to bias': '输入文本...',
        'Bias: ': '概率偏移: ',
        'Default: ': '默认: ',
        'LESS': '降低概率',
        'MORE': '提高概率',
        'Tokens': 'Tokens',
        'Click a token to edit it.': '点击下方 Token 即可进行编辑。',
        'Enabled': '已启用',
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
        '(off)': '关闭',
        'Applies a static penalty to the generation of tokens that appear within the Repetition Penalty Range.': '对出现在“重复惩罚范围”内的 Token 的生成应用静态惩罚。',
        'Applies a static penalty to the generation of ↑ Token that appear within the Repetition Penalty Range.': '对出现在“重复惩罚范围”内的 Token 的生成应用静态惩罚。',
        'Applies a penalty to the generation of tokens based on the number of occurrences of that token within the Repetition Penalty Range.': '根据 Token 在“重复惩罚范围”内出现的次数，对其生成应用惩罚。',
        'Applies a penalty to the generation of ↑ Token based on the number of occurrences of that token within the Repetition Penalty Range.': '根据 Token 在“重复惩罚范围”内出现的次数，对其生成应用惩罚。',
        
        'Set a bias on specific tokens to increase or decrease their chance of being generated. Surround with [square brackets] to input token ids (tokenizer specific). If a sequence of tokens is given, only the first will have the bias applied.': '对特定的 Token 设置概率偏移，以增减其生成的几率。用 [方括号] 括起来输入 token ID。',
        'Set a bias on specific ↑ Token to increase or decrease their chance of being generated. Surround with [square brackets] to input token ids (tokenizer specific). If a sequence of ↑ Token is given, only the first will have the bias applied.': '对特定的 Token 设置概率偏移，以增减其生成的几率。用 [方括号] 括起来输入 token ID。',

        // --- 世界书 (Lorebook) ---
        'Lorebook': '世界书',
        'New Lorebook Entry': '新条目',
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
        'Entry has no keys.': '该条目未设置关键词。',
        'Conditions': '触发条件',
        
        'Let the AI fill in the blanks for you! Choose the type of entry from the list, enter what you want to generate, and hit generate. You can also have the AI add to text written in the Lore entry just like in the Story.': '让 AI 帮你填补空白！选择类型，输入要求，然后点击生成。你也可以让 AI 直接续写条目，就像在故事正文中一样。',
        'A Lorebook entry is activated and its text placed in context whenever one of its keys is found in the recent story. Keys are case-insensitive.': '每当在最近的故事正文中找到对应的激活关键词时，该条目就会被激活，其文本将被放入上下文中。关键词不区分大小写。',
        'Keys that begin and end with "/" are evaluated as regex. These regex keys are case-sensitive and support the following flags: i, s, m, and u.': '以 "/" 开头和结尾的关键词将被作为正则表达式(regex)解析。区分大小写，支持标志: i, s, m, u。',
        'Advanced conditions allow more complex logic for when this lore entry should activate.': '高级触发条件允许使用更复杂的逻辑来决定该条目何时激活。',
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
        'Lore Entry Active': '世界书条目激活',
        'Random Chance': '随机概率',
        'Numeric Comparison': '数值比较',
        'String Comparison': '文本比较',
        'AND Group': '满足全部条件',
        'OR Group': '满足任一条件',
        'NOT': '条件取反',

        'Dock active tab to side': '将当前标签页停靠到侧边',
        'Entry Text': '条目设定文本',
        'Generator': '生成器',
        'The following text will be referenced when the Keys are activated.': '当关键词被激活时，AI 将自动参考下方框内的设定文本。',
        'Activation Keys': '激活关键词',
        'Activates the entry when found within the recent story.': '当在最近的故事正文中发现这些词时，将唤醒该条目设定。',
        'Always On': '始终激活',
        'No Keys set.': '未设置关键词。',
        'Category': '所属分类',
        'No Category': '无分类'
    };

    const sortedKeys = Object.keys(storiesTranslationMap).sort((a, b) => b.length - a.length);
    const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(sortedKeys.map(escapeRegExp).join('|'), 'g');

    // 处理普通文本节点
    function replaceText(node) {
        if (node.nodeType !== Node.TEXT_NODE || !node.nodeValue.trim()) return;

        // 排除真实输入区域，保护小说正文内容
        if (node.parentElement) {
            if (node.parentElement.tagName === 'CODE' ||
                node.parentElement.tagName === 'TEXTAREA' ||
                node.parentElement.tagName === 'INPUT' ||
                node.parentElement.closest('.ProseMirror, textarea, input, [contenteditable="true"]')) {
                return;
            }
        }

        let replacedValue = node.nodeValue.replace(regex, (match) => storiesTranslationMap[match]);
        if (node.nodeValue !== replacedValue) {
            node.nodeValue = replacedValue;
        }
    }

    // 处理元素属性
    function translateAttributes(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            const attributesToTranslate = ['placeholder', 'title', 'aria-label'];
            
            attributesToTranslate.forEach(attr => {
                if (node.hasAttribute(attr)) {
                    const val = node.getAttribute(attr);
                    let replacedValue = val.replace(regex, (match) => storiesTranslationMap[match]);
                    if (val !== replacedValue) {
                        node.setAttribute(attr, replacedValue);
                    }
                }
            });

            const children = node.querySelectorAll('[placeholder], [title], [aria-label]');
            children.forEach(child => {
                attributesToTranslate.forEach(attr => {
                    if (child.hasAttribute(attr)) {
                        const val = child.getAttribute(attr);
                        let replacedValue = val.replace(regex, (match) => storiesTranslationMap[match]);
                        if (val !== replacedValue) {
                            child.setAttribute(attr, replacedValue);
                        }
                    }
                });
            });
        }
    }

    function translateNode(node) {
        const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
        let currentNode;
        while (currentNode = walker.nextNode()) {
            replaceText(currentNode);
        }
        translateAttributes(node);
    }

    let observer;
    let isTranslating = false;

    function startTranslation() {
        translateNode(document.body);

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
                        let replacedValue = val.replace(regex, (match) => storiesTranslationMap[match]);
                        if (val !== replacedValue) {
                            mutation.target.setAttribute(mutation.attributeName, replacedValue);
                        }
                    }
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true,
                characterData: true,
                attributes: true,
                attributeFilter: ['placeholder', 'title', 'aria-label']
            });
            isTranslating = false;
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true,
            attributeFilter: ['placeholder', 'title', 'aria-label']
        });
    }

    const checkReady = setInterval(() => {
        if (document.querySelector('.ProseMirror') || document.querySelector('textarea') || document.querySelector('button') || document.querySelector('.welcome-message') || document.querySelector('[class*="Modal"]')) {
            clearInterval(checkReady);
            startTranslation();
        }
    }, 500);

})();
