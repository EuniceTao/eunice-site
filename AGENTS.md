# 项目说明

## 项目概述

- 本项目是 Eunice 的个人网站，使用 React 19、React Router 7、Vite 7 与 Tailwind CSS 4。
- 前台内容包括首页、About、Experience、Work、Projects、Notes、Now 与 Contact。
- Supabase 用于站点内容、Notes、Now 与后台编辑数据；前台保留本地 fallback 数据。

## 核心目录职责

- `src/app/`：应用级布局与路由出口动画。
- `src/design-system/`：全站 tokens、基础组件、布局与动效；UI 改动优先扩展这里。
- `src/pages/`：按页面或业务域组织的页面、数据 hooks 与局部组件。
- `src/lib/`：Supabase、资源 URL 与图片处理等通用能力。
- `public/`：Vite 静态资源、简历与 GitHub Pages文件。
- `supabase/`：数据库迁移与 Edge Functions。

## 架构与依赖方向

- 页面组件可以依赖 `design-system`、对应业务域 hooks 与 `lib`。
- `design-system` 不依赖具体页面业务；现有 `Page`、`SiteFooter` 对 Markdown 与站点内容存在历史依赖，暂不扩大。
- 内容优先读取 Supabase 已发布数据，读取失败时使用本地数据或组件 fallback。
- 不改变现有路由、site block key 或数据格式，除非方案明确授权。

## 首页房间探索

- `HomePage.jsx` 在 lazy 场景加载前判断桌面尺寸与减少动态效果偏好；不满足条件时保留静态入口，不挂载 3D。
- `pages/home/room/RoomScene.jsx` 编排物件选择、镜头返回和键盘焦点；`scene/` 管理空间、物件绑定与镜头，`scene/furniture/` 管理家具与本地生成材料。
- `scene/roomNavigation.js` 保存真实镜头位置、约束墙面边界与最短转角；`RoomCamera.jsx` 连接已有 CameraControls。位置单位为米，旋转单位为弧度。场景 Html 标签挂载到独立 `room-html-layer` 容器，避免与 Canvas 的 React DOM 子节点争用父级。
- `design-system/room/` 提供场景调色板、导航控件、非模态内容卡和场景样式；页面数据继续来自 `roomItems.js`，不在场景内复制内容或路由。
- 个人相框经用户确认使用本地 `profile.png` 纹理；其他家具不新增外部模型或纹理请求。
- `pages/home/spaces/` 承载相片空间、独立工作室与个人作品；`design-system/room/spaces/` 提供原生 dialog 焦点边界与响应式样式。首页保留客厅 Canvas，返回时恢复进入前镜头。
- 目录与移动端使用同一空间入口配置；其他原详情链接保持不变。作品外链在新标签页打开。
- 个人空间复用 `home.hero` / `home.quote` 内容，照片支持手动切换和滚动相册，减少动态效果时不挂载 3D 场景。

## 房间猫咪（Q 版地面慢走）

- 用户已批准 Q 版静态模型入屋。`scene/cats/RoomCats.jsx` 加载 `public/cats/q-blue-white.glb` 与 `q-tabby.glb`，保持审阅稿外形。
- 蓝白放在沙发座面，虎斑放在地毯；按模型包围盒对齐爪底，使用 0.4 倍缩放。
- 用户已授权加动作。`catIdlePose.js` / `createIdleRig.js` 实现呼吸、眨眼、转头、摆尾和轻量四足步态。`locomotion/standingPose.js` 生成同拓扑四足站姿与法线，抬起腹部及骨盆并锚定后爪，避免坐姿拖行。蓝白仍在沙发休息；虎斑由 `catWander.js` 控制起身、转向、慢走、坐下和停留，复用 `catNavigation` 的地面节点与障碍边界，只允许地面邻接边。旧 `CatModel`、`catMotion` 和跳跃采样不接入。
- `useCatActivity` 在页面隐藏、离开视口、打开空间或手动暂停时停止帧调度；动作使用活动时间，恢复时不跳到后台累计时间。
- 模型独立 Suspense，使用已有方向光阴影；接触阴影随需求帧刷新，避免移动后留下烘焙残影；合照与键盘相册入口继续保留，移动端沿用静态页面策略。
- GLB 只增补眼睛/尾巴节点名，原模型几何与材质不变。动画网格和材质独立克隆；释放时不可销毁 useGLTF 缓存。可见材质与深度阴影共享动作参数。
- 动作回归：`node --test tests/cat-idle.test.mjs tests/cat-wander.test.mjs tests/cat-standing.test.mjs tests/room-spaces.test.mjs`。

## 编码约定

- 遵循 `.cursor/rules/main.mdc`，UI 必须优先使用或扩展 `src/design-system/`。
- JavaScript/JSX 文件尽量不超过 200 行；组件按单一职责拆分。
- 修改文件时保留或补充文件职责注释，不批量调整无关格式。
- 不新增图标包；使用项目已有的 `lucide-react`。

## 构建与验证

```bash
npm ci
npm run lint
npm run build
npm run dev
```

- 空间回归：`node --test tests/room-spaces.test.mjs`（从项目根目录运行）。
- UI 改动需要检查桌面端、移动端、键盘焦点与 `prefers-reduced-motion`。
- 当前 3D 工作副本复用正式目录的 `node_modules`；验证构建用 `npm run build -- --configLoader native`，避免向共享依赖目录写 Vite 临时配置。
- GitHub Pages 自定义域部署方式见 `.github/` 与 `scripts/guard-pages.mjs`；具体发布流程待确认。
