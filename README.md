# 🚀 Base Project Template (快速启动模板)

嗨！这是一个为你准备好的**全栈开发起点**。它已经帮你把最繁琐的配置（React、样式、动画、后端连接）都搞定了。你不需要从零开始配置环境，直接复制这个项目就能开始写你的业务代码。

---

## 🛠 里面都有什么好东西？

### 前端 (你看到的界面)
- **React 19**: 目前最流行的前端框架，性能更强。
- **Vite 7**: 超级快的开发工具，保存代码后界面秒更新。
- **TailwindCSS v4**: 写样式不用写 CSS 文件，直接在 HTML 里写类名（比如 `text-red-500`）。
- **Framer Motion**: 帮你轻松实现丝滑的动画效果。
- **Lucide React**: 几百个精美的图标库，随取随用。

### 后端 (存数据和跑逻辑)
- **Supabase**: 你的“云端数据库”，不用自己搭服务器。
- **Edge Functions**: 跑在云端的 JavaScript/TypeScript 代码，适合处理敏感逻辑。

---

## 📂 文件夹是干嘛用的？

```bash
├── src/
│   ├── design-system/      # ✨ 核心资产：这里有预设好的按钮、输入框、颜色和字体
│   │   ├── tokens/         # 调色板和间距规范（改这里，全站颜色跟着变）
│   │   ├── components/     # 已经写好的 UI 组件（Button, Card 等），直接用就行
│   ├── App.jsx             # 🏠 你的主页面，从这里开始写你的代码
│   └── main.jsx            # 核心入口，通常不需要动它
├── supabase/
│   ├── functions/          # ☁️ 云函数：写后端逻辑的地方
│   │   └── _shared/        # 共享代码：处理跨域和登录验证，新函数直接引用即可
├── .cursor/rules/          # 🤖 AI 助手规则：让 Cursor 里的 AI 更懂这个项目的规范
└── .env                    # 🔑 秘钥保险箱：存放你的 API 密钥（千万别传到网上）
```

---

## 🚀 怎么开始玩？

### 第一步：填入你的“钥匙”
打开项目根目录下的 `.env` 文件，把你在 Supabase 后台拿到的 URL 和 Key 填进去：
```env
VITE_SUPABASE_URL=你的项目地址
VITE_SUPABASE_ANON_KEY=你的匿名Key
```

### 第二步：跑起来！
在终端（Terminal）输入下面的命令：
```bash
npm run dev
```
然后点击终端里出现的链接（通常是 `http://localhost:5173`），你就能看到你的项目啦！

---

## ✨ 编写代码的小贴士

1. **别乱写颜色**: 尽量使用 `src/design-system/tokens/colors.js` 里定义好的颜色。
2. **多用现成组件**: 需要按钮？直接 `import { Button } from './design-system'`。
3. **问问 AI**: 如果你用的是 Cursor 编译器，它已经读过了 `.cursor/rules` 里的规则，你可以直接问它：“帮我用项目里的设计系统写一个登录页面”。

---

## ☁️ 想写后端逻辑？
项目已经帮你封装好了最简单的云函数模板。在 `supabase/functions` 下新建个文件夹，参考 `hello-world` 的写法，你就能拥有自己的 API 了！

祝你 coding 愉快！如果有任何问题，随时问我。
