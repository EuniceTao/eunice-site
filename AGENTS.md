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

## 个人作品墙

- 沙发主墙的 `furniture/ArtworkWall.jsx` 替代窗帘后的单幅展签，正面朝向屋内。点击后仍使用 `experiments` 空间 ID，聚焦镜头朝向主墙。
- `room/artworks.js` 是挂画与 `ExperimentSpace` 的共同作品清单。当前真实作品为“吵吵艺术馆”，空画框明确标记“待上墙”，不能当作真实作品。
- 主墙最多展示六幅，超过三幅时排成两行；作品空间展示清单内全部作品，外链在新标签页打开。
- 猫咪继续保持完全静态。

## 房间猫咪（静态坐姿）

- 用户已明确要求两只猫保持静态。`scene/cats/RoomCats.jsx` 不注册动画帧，不调用任何姿态更新或巡游逻辑；呼吸、眨眼、转头、摆尾、走动和起坐全部停用。
- 蓝白固定在沙发座面，虎斑固定在地毯原位，使用 0.4 倍缩放并对齐爪底。
- 沿用 Q 版模型和已分离的尾巴曲线；`createIdleRig` 仅创建默认零参数的静态坐姿，资源独立克隆，不销毁 GLTF 缓存。
- 点击猫咪及键盘相册入口保留。动作暂停/继续控件已移除，开关相册不会恢复猫咪动作。
- 旧动画模块暂留源码但不接入页面；未得到新的明确要求不得恢复动作。

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
