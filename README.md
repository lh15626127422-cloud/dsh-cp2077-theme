# 赛博朋克 2077 主题（cp2077-theme）

[![ci](https://github.com/lh15626127422-cloud/dsh-cp2077-theme/actions/workflows/ci.yml/badge.svg)](https://github.com/lh15626127422-cloud/dsh-cp2077-theme/actions/workflows/ci.yml)
[![license](https://img.shields.io/badge/license-MIT-FCEE0A)](LICENSE)
[![version](https://img.shields.io/badge/version-2.0.0-00E5FF)](https://github.com/lh15626127422-cloud/dsh-cp2077-theme/releases)
[![dsh](https://img.shields.io/badge/dsh-0.2.x-FF2E9A)](https://github.com/deepseek-ai)

给 DeepSeek Harness Web GUI 用的赛博朋克 2077 风格主题插件。

夜之城配色：黑紫底 + 2077 黄（`#FCEE0A`）+ 霓虹青（`#00E5FF`）+ 品红；切角面板、HUD 字体、全高渐隐网格、CRT 扫描线、四角青色角标。

---

![控制面板](docs/screenshots/panel.jpg)

| 暗色 · 壁纸模式 | 浅色 | 光标与菜单 |
| --- | --- | --- |
| ![暗色](docs/screenshots/dark.jpg) | ![浅色](docs/screenshots/light.jpg) | ![光标](docs/screenshots/cursors.jpg) |

## 功能

- **夜之城配色**：黑紫底 + 2077 黄 `#FCEE0A` + 霓虹青 `#00E5FF` + 品红，覆盖 130+ 个主题 token，暗色与浅色各一套
- **切角与 HUD**：输入框、代码块、气泡、发送按钮统一切角；四角青色角标、全高渐隐网格、CRT 扫描线、低频扫描光束（都可在面板关掉）
- **赛博朋克光标**：箭头 / 指针 / 文本插入符三套 SVG，尺寸可调，浅色背景下带深色描边保证可见
- **Logo 动效**：鲸鱼呼吸辉光 + wordmark 的像素级撕裂（SVG `feTurbulence` + `feDisplacementMap`，不是整块平移）
- **Wallpaper Engine 壁纸背景**：自动识别 Steam 创意工坊库，一键把壁纸铺成整窗背景；视频类壁纸可生成动态 WebP 循环，另有透明度、缓存上限与清理
- **控制面板**：设置 → 赛博朋克主题，光标大小、网格/扫描线强度、切角尺寸、动画总闸、壁纸选择与缓存，全部即时生效并记忆
- **不会拖垮核心**：所有自愈与动画都有生命周期守卫，卸载后不复活；`test/harness-test.mjs`（19 项）与 `test/wallpaper-route.mjs`（17 项）覆盖异常输入、销毁顺序与路由

## 安装

需要已经装好的 DeepSeek Harness（Web GUI，`0.2.x`）。本项目零 npm 依赖。

```bash
git clone https://github.com/<you>/<repo>.git ~/dsh-plugins/cp2077-theme
cd ~/dsh-plugins/cp2077-theme
node scripts/install.mjs            # 链接进 ~/.dsh/profiles/web
```

脚本会把整个目录软链到 `~/.dsh/profiles/web/node_modules/@local/cp2077-theme`，并打印需要写进 profile `package.json` 的那一行：

```json
{
  "dependencies": {
    "@local/cp2077-theme": "link:<克隆下来的绝对路径>"
  }
}
```

然后重启 DeepSeek Harness，刷新页面；打开 **设置 → 赛博朋克主题** 即可调参数。

## 配置

唯一需要配置的是壁纸库位置，其余都能在面板里调。默认会自动探测 Steam（Windows 读注册表 `HKCU\Software\Valve\Steam` 再展开 `libraryfolders.vdf`；macOS / Linux 走惯例路径），探测不到时才需要手动指定：

`cordis.patch.yml`：

```yaml
- insert:
    - id: cp2077-theme
      name: '@local/cp2077-theme'
      config:
        workshopRoot: 'D:/Steam/steamapps/workshop/content/431960'
```

也可以用环境变量 `CP2077_WORKSHOP_ROOT` 覆盖。优先级：插件配置 → 环境变量 → 自动探测。

## 依赖与限制

- **ffmpeg 可选**：只用于「视频壁纸抽帧」与「动态 WebP 循环」。没有 ffmpeg 时视频壁纸显示封面图，开关会自动置灰并提示。
- **Wallpaper Engine 可选**：没装也能用整个主题，只是壁纸功能为空，面板会显示「未检测到 Wallpaper Engine 创意工坊目录」。
- **样式依赖 DSH 内部类名后缀**（`centerCol` / `sessionRow` / `data-menu-material` / `data-slot` 等）。DSH 改版后个别选择器可能失效，后果是某块样式没打上，不会报错也不影响使用；`data-*` 属性选择器比哈希类名更稳定，所以优先用它们。

---

## 更新日志


## 2.0.0

可移植性：不再是「只在我这台机器上能用」。之前壁纸库路径写死成 `G:/steam/...`，别人的 Steam 装在 C 盘、或者根本没装 Wallpaper Engine，插件就只会返回空列表。

| 问题 | 原因 | 处理 |
| --- | --- | --- |
| 换台机器就找不到壁纸 | `DEFAULT_ROOT` 硬编码了本机 G 盘路径 | 改为三级探测：插件配置 `workshopRoot` → 环境变量 `CP2077_WORKSHOP_ROOT` → 从 Steam 注册表 + `libraryfolders.vdf` 枚举所有库目录（Windows 走注册表，macOS/Linux 走惯例路径） |
| 探测结果看不见，不知道是自己填错还是没装 | 面板只显示「共 N 张」 | `/index` 增加 `rootSource`（`config` / `config-missing` / `env` / `env-missing` / `detected` / `fallback`）与 `ffmpeg`；库目录不是自动探测来的就在面板里显示完整路径 |
| 没有 ffmpeg 的机器上「动态播放」开关形同虚设 | `execFile("ffmpeg")` 只在编码时才失败 | 启动时异步探测一次 `ffmpeg -version`，缺失时开关显示「动态播放 · 需要 ffmpeg」并置灰，视频壁纸自动退回封面 |
| 别人没法安装 | `private: true` + `@local/` 私有 scope | 去掉 `private`、补 `license`/`keywords`；`cordis.patch.yml` 里写了 `workshopRoot` 的配置示例；README 补安装步骤 |

安装到另一台机器：

```bash
# 1) 把整个目录放到任意位置，例如 ~/dsh-plugins/cp2077-theme
# 2) 让它进 profile（软链，改文件立即生效）
ln -s ~/dsh-plugins/cp2077-theme ~/.dsh/profiles/web/node_modules/@local/cp2077-theme
# 3) 在 ~/.dsh/profiles/web/package.json 里加一行
#    "@local/cp2077-theme": "link:~/dsh-plugins/cp2077-theme"
# 4) 重启 DSH，刷新页面
```

壁纸库没有自动认出来时，在 `cordis.patch.yml` 里指名：

```yaml
config:
  workshopRoot: 'D:/Steam/steamapps/workshop/content/431960'
```

依赖说明：无需任何 npm 依赖；ffmpeg 可选（只影响视频壁纸的抽帧与动态循环）。DSH 侧用到 `webServer` 服务与 `theme` / `slots` 两个 client 服务，`0.2.x` 可用。



## 1.9.5

| 问题 | 原因 | 处理 |
| --- | --- | --- |
| 换过的壁纸在系统临时目录里越攒越多（实测已 60 MB，单个 21.6 MB） | `cp2077-anim` / `cp2077-stills` 只写不删，按用过的张数累积 | 加 200 MB 上限，写入后按最后使用时间淘汰最旧的文件（`pruneCache`） |
| 不清楚占了多少、也没法清 | 缓存只存在于磁盘里，界面看不到 | 控制面板新增「壁纸缓存」行：已用容量 / 文件数 / 上限，带「清理」按钮（`GET`、`POST` `/cp2077-wallpaper/cache`） |
| 一张 8K 源能压出 20 MB+ 的循环 | 编码规格固定，超大源片没有二次收缩 | 改成两级编码：先 1600px/12fps/q68，产物超过 8 MB 再用 1280px/10fps/q52 重编一遍；`scale=min(1600,iw)` 也不再放大小尺寸源 |

内存结论（实测同一渲染进程 A/B）：插件本体约 14 MB，静态封面壁纸再加约 28 MB，动态壁纸再加约 40 MB；缓存上限只作用于磁盘，不改变运行内存。
## 1.9.4

稳定性收口：把「每帧都在重复做的写入」和「卸载后还留在队列里的任务」都收掉。

| 隐患 | 为什么会发生 | 修法 |
| --- | --- | --- |
| 流式回答时 CPU 占用偏高 | self-heal 由 MutationObserver + rAF 驱动，写作过程中每秒约 60 次；它每次都会调 `applyOptions()`，而后者无条件重写四个 `--cp-opt-*` 变量并重建光标样式表（含 data URI），每次写入都触发整页样式重算 | `applyOptions` 改为按选项签名比对：值没变、节点还在就直接返回；光标样式表内容相同也不再赋值 |
| 壁纸变量被反复改写 | `ensureWallpaper()` 每次 heal 都重设 `--cp-wallpaper-image` 与 `data-cp2077-wallpaper`，而画布背景依赖这个变量，等于每帧让整页重新绘制 | 记住当前图源 key（`a:` 动态 / `s:` 静态 / `off`），同一张图只做「标记丢失才补」；body 重建换到新节点时才重画一次 |
| 插件卸载后仍有延迟任务在跑 | 220/700/1600/3200ms 的壁纸补画与洗白重试都是裸 `setTimeout`，卸载时没人清 | 统一走 `later()` 注册表；卸载时 `cancelPending()` 一次性 `clearTimeout` + 移除监听 |
| DOM 监听散落注册 | `pointerdown` / `resize` / `visibilitychange` 各自 `addEventListener`，卸载后残留并把闭包钉住 | `on()` 注册表，卸载时一并 `removeEventListener` |
| 页面还在预热时警告可能刷屏 | 每次 heal 失败都 `console.warn` | `warnOnce(key, …)` 按来源去重，每类只报一次 |

自愈语义不变：节点丢了照旧重建（光标表、装饰层、filter host、壁纸宿主节点），只是**值没变时不再重复写**。

## 1.9.3
快捷键提示里的键帽统一收平。

| 现象 | 原因 | 修法 |
| --- | --- | --- |
| 菜单、对话框里的 `Ctrl` `+` `Alt` `+` `N` 是一串互相争抢的黄色方块 | DSH 把每个修饰键与 `+` 都渲染成独立 `kbd`，主题第 8 节给 `kbd` 的黄底黄框在这里变成并排色块 | 第 8 节改为全局收平：`body kbd` 无背景、无边框、无圆角、无阴影，只留等宽黄字 `padding: 0 1px`；浅色用 `#7A5C00` 保证浅底可读 |
| 1.9.2 里针对菜单的 `kbd` 覆盖 | 全局规则生效后它变成冗余 | 删除，减少选择器冲突 |

侧边栏「新建会话」右上角那张悬停卡里的键帽不在此列：它渲染在独立浮层文档里，主题样式表作用不到。已验证的手段包括给 `html body *` 全量染色、对 `keycap` / `shortcut` / `chord` / `badge` / `pill` 等十余个类名做探针、以及用 `--dsw-alias-brand-primary` 等 token 覆盖，全部无效，且该卡在整页刷新后依旧停在那里。

## 1.9.2

修掉壁纸模式带出的一串「表面材质」问题：弹出层半透明导致文字互穿，侧栏浮层还会残留成一张透明的鬼影。

| 现象 | 原因 | 修法 |
| --- | --- | --- |
| 账号菜单、工作区菜单弹出后文字重叠 | 1.8.0 为了让壁纸透出来，把 `--dsw-alias-bg-base` 与 `--dsw-specific-sidebar-fill` 覆盖成半透明 rgba；1.8.1 又为治「设置界面变糊」把 `--dsw-menu-backdrop-filter` 设成 `none`。菜单原先靠 blur 磨砂遮住下层，blur 一撤、底色又半透，下层会话名与工作区名直接穿透上来 | 菜单表面强制实心 `body [data-menu-material]` → `#12101A`（浅色 `#FFFFFF`）；同时把侧栏 token 钉成 alpha=1（内容列仍半透，照片只从正文区透出） |
| 菜单快捷键被拆成五个争抢的黄块 | DSH 把 `Ctrl`、`+`、`Alt`、`+`、`，` 都渲染成独立 `kbd`，主题给 kbd 的黄底黄框在菜单里变成并排色块 | 菜单内的 `kbd` 收平为纯等宽黄字：无背景、无边框、无圆角、`padding: 0 1px` |
| 页面中部浮着一块半透明的「侧栏幽灵」，跨刷新不消失 | 画布背景用了 `background-attachment: fixed`，WebView2 为全视口固定背景单独合成一层，再叠加带 `backdrop-filter` 的玻璃面板时留下过期瓦片 | 改回 `scroll`。聊天区本来就滚动在内部容器里，`scroll` 与 `fixed` 视觉完全一致，但不再触发独立合成层 |
| 玻璃面板失去磨砂 | 上一版把 `--dsw-menu-backdrop-filter` 整体设为 `none`，浮层少了 blur 就更透 | 恢复 `blur(20px) saturate(140%)`；只有遮罩 `--dsw-mask-blur` 保持 `none`，避免设置页把壁纸糊掉 |

弹层本身是原生组件，这里只改表面材质，不动它的定位与开合逻辑。

## 1.9.1

壁纸模式再往「沉浸」推一档：内容区收成杂志版心，照片从顶部淡入。

- **版心**：壁纸模式下把 `--dsh-chat-content-width` 与 `--dsh-composer-card-max-width` 改成 `min(calc(100% - 76px), 840px)`。窗口宽时两侧各留出 190px 以上的照片带，窗口窄时至少保留 38px/边的呼吸位；输入框与正文同宽，不破坏对齐。
- **顶部淡入**：画布背景从 3 层变 4 层，最上面加一条 `linear-gradient(180deg, rgba(10,9,16,.94) 0, rgba(10,9,16,.88) 54px, transparent 170px)`（浅色对应米白）。标题栏因此有一条实心压底，照片在其下方 170px 内渐显，不再与标签栏硬碰。
- 只在 `html[data-cp2077-wallpaper="on"]` 下生效，关掉壁纸即回到原本的全宽版式。
## 1.9.0

壁纸模式整体打磨，顺手换掉了整套「把照片画在哪里」的实现。

| 现象 | 原因 | 修法 |
| --- | --- | --- |
| 壁纸只出现一会儿 / 完全不出现 | 照片画在 `z-index:-1` 的子节点上，能否透出来取决于有多少祖先各自刷了不透明底色、谁开了堆叠上下文，完全不可控 | 改画到**文档画布**：`html` 保持透明，照片与遮罩都放在 `body` 的 `background-image` 上（CSS 会把 body 背景传播到 canvas），永远在所有内容之下 |
| 壁纸模式下正文压在照片上、读不清 | 白字落在人物亮发、亮沙上，对比不足 | 壁纸模式给正文加双 `text-shadow`（可继承，正文/表格/列表一次覆盖）+ 中部径向光晕；不做整列不透明底板，边缘保留照片质感 |
| 装饰层和照片纹理打架 | 网格 / 扫描线 / 地面网格 / 角标 / 光束全亮度叠加在照片上 | 壁纸模式下统一降透明度：网格 .38 / 扫描线 .40 / 地面 .20 / 光束 .50 / 角标 .46 |
| 代码块、表格、输入框透出照片 | 这些面本该是实心的 | 壁纸模式强制实心：输入框 `rgba(10,9,16,.88)`、`pre` `.84`、表头 `.72`（浅色各有对应值） |
| 面板缩略图第 4 列被裁掉、「动态播放」被挤出面板 | `.cp2077-row-pick` 是横向 flex（原本放控件+值），壁纸选择器把网格塞进去后变成并排 | `:has()` 命中后改成纵向铺满，子项 `width:100%; min-width:0` |

结构变化：`ensureWallpaper()` 现在只负责写 `--cp-wallpaper-image` 与 `data-cp2077-wallpaper`，照片的绘制全部交给 CSS 第 29 节；旧的挂载节点保留但不再显示，仅用于老版本自清理。
## 1.8.4

动态壁纸改用 **animated WebP**：Wallpaper Engine 的 video 类壁纸不再只有静止封面。

| 现象 | 原因 | 修法 |
| --- | --- | --- |
| 壁纸不会动 | 这套内嵌 WebView 从不合成 `<video>` 图层（`drawImage` 取帧正常、画面却不出现），1.8.3 只能退回静态抽帧 | host 新增 `/anim/<id>`，用 ffmpeg `libwebp_anim` 把原片编码成 1600×900 / 12fps / 8s 的动画 WebP 并缓存；client 对 video 类壁纸改用它。实测该 WebView 的 `background-image` 能正常播放动画 WebP |
| 面板没有「动态播放」开关 | 1.7.9 移除 video 路径时一并删掉了 | 恢复开关，仅对 video 类条目显示；关掉则退回静态抽帧 `/still/<id>` |
| 老用户开关恒为关 | 1.7.x 把 `wallpaperMotion: false` 存进了 localStorage | 加 `wallpaperMotionV2` 迁移标记，读取到旧值时忽略一次并回写 |

编码参数：`-ss 2 -t 8 -vf fps=12,scale=1600:-2:flags=lanczos -c:v libwebp_anim -lossless 0 -q:v 68 -loop 0 -an`，缓存到 `%TEMP%/cp2077-anim/<id>.webp`（4K 源约 4.4MB，首次编码约 5–8s，之后直接命中）。
## 1.8.3

视频类壁纸改用视频原片抽帧，同时把叠了两层的暗罩砍掉一层。

| 现象 | 原因 | 修法 |
| --- | --- | --- |
| 视频类壁纸看着糊 | 背景用的是 `preview.jpg` / `preview.gif`，多数只有 1024px，铺满 1418 CSS 宽（1772 设备像素）要放大 1.7 倍 | Host 新增 `GET /cp2077-wallpaper/still/<id>`，用 ffmpeg 从原视频抽一帧（`-ss 1.5 -frames:v 1 -vf scale=min(2560,iw)`），缓存到 `%TEMP%/cp2077-stills/<id>.jpg` |
| 抽帧失败 | 系统里可能没有 ffmpeg | 端口内部回落：返回原封面图，client 无需感知 |
| 抽帧慢 | 4K 片源解码要几百毫秒 | 按 id + 源文件 mtime 缓存，第二次直接命中；抽取期间背景仍是封面 |
| 画面发灰发闷 | 主题底色洗白（wash）与壁纸 veil 两层暗罩叠加，合计压掉约 80% 亮度 | veil 从 `.58/.80` 降到 `.08/.26`；`washAlpha()` 改为 `0.92 - t * 0.58` |

启动后 client 只请求一次索引拿到 `hasVideo` 集合：视频类壁纸走 `/still/`，静态图类仍走 `/file/`，取不到索引时退回封面。

## 1.8.2

壁纸「一直很糊」的真正原因找到了。

- `cp2077-v12.css` 第 22 节还留着 1.5.x 时代的 `.cp2077-wallpaper::before { inset: -16px; filter: blur(3px) brightness(.78) saturate(.92) }`。它是伪元素，画在图层背景之上 —— 所以无论后面怎么调，屏幕上看到的永远是那张被糊掉、压暗 22% 的图。
- 修法：整段删掉这个伪元素，只保留第 25 节「容器自身 background-image + cover」。为兼顾正文可读性，把无模糊的遮罩从 .16/.44 加深到 .24/.52（浅色 .26/.56）—— 变暗但不失细节。
- 顺带：1.8.1 关掉的设置遮罩 `backdrop-filter: blur(10px)` 与菜单 `blur(40px)` 也属于同一类问题。

封面分辨率提醒：Wallpaper Engine 的 `preview.jpg` 只有 1024x1024，铺到 1408 宽的视口会放大 1.375×，边缘略软 —— 这是素材上限，不是渲染问题。

## 1.8.1

设置界面与壁纸选择器的收尾。

| 问题 | 根因 | 修法 |
| --- | --- | --- |
| 进设置后壁纸变模糊 | 设置遮罩带 backdrop-filter: blur(10px)，把背后的壁纸糊掉 | 关掉 mask 与 menu 的 blur，改用更实的遮罩色（0.82 / 0.88） |
| 壁纸选择器是几个巨大空块 | 缩略图网格的 CSS 在一次截断里丢了，只剩 JSX 类名 | 补回第 27 节：96px 最小列宽、76px 高、黄框选中、VIDEO 角标、标题渐隐 |
| 选择器挤在右半边 | 该行沿用「左标签右控件」的横排 | 用 :has() 定位到含网格的行，改成纵向堆叠并铺满整行 |
| 残留「动态播放」开关 | 视频路径已移除，开关没了意义 | 删掉该开关 |
## 1.8.0

壁纸渲染机制整体替换。旧机制（找宿主 + 逐个打穿容器底色）在这套多层外壳上不成立，改为「一个底层图层 + 让外壳自己变透」。

| 问题 | 根因 | 现在的做法 |
| --- | --- | --- |
| 壁纸几乎从不显示 | 外壳每一层都用 bg-base token 实心填充，压在背景图层之上 | 把该 token 覆盖成半透明 rgba，alpha 随透明度滑块在 0.94-0.40 之间变化 |
| 覆盖不全 / 时有时无 | 宿主探测依赖布局，右栏或侧栏一变就选错元素 | 不再探测宿主：position fixed、inset 0、z-index -1 的图层挂在 body 下 |
| 切换会话后消失 | 宿主节点随路由重建 | 图层与宿主无关，挂载、自愈、改设置、切换后都幂等重放 |
| 跟内容一起滚 | 图层原先挂在滚动容器内部 | fixed 定位 + html/body 背景透明，滚动只动内容 |

- 侧栏 alpha 额外提高 0.50，避免图标文字压在亮部画面上。
- 壁纸透明度滑块语义：100 = 最清晰，0 = 几乎压掉，默认 72。
- 视频类壁纸不再播放：该 WebView 不合成 video 图层（canvas 能取帧，屏幕上是黑的），统一用封面图。
- 旧实现保留为 ensureWallpaperLegacy()，不再调用。
## 1.7.7

修掉「壁纸消失后不再出现」。

| 问题 | 根因 | 修法 |
| --- | --- | --- |
| 切会话 / 开关设置页后壁纸不再回来 | 对话列在切换瞬间会塌成 0x0，图层被隐藏只靠 `requestAnimationFrame` 重试；窗口在后台或标签隐藏时 rAF 被节流，重试链断掉就永久不可见 | 改用有界的 `setTimeout` 链（240ms）重试，隐藏方式从 `display: none` 换成 `visibility: hidden`（不触发重排、可逆），并给对话列挂 `ResizeObserver`，尺寸恢复时立刻同步 |

## 1.7.6

壁纸终于能稳定铺满对话列，切换会话、滚动、窗口缩放都不再丢失。

| 问题 | 根因 | 修法 |
| --- | --- | --- |
| 壁纸看不见 | 对话列的每个大容器都自己刷了一层不透明底色，画在祖先上的背景全被盖住 | `punchThrough()` 遍历列子树，把宽度 ≥ 列宽 80% 且底色不透明的容器逐个改成 `transparent`，并记录原值以便关闭时还原 |
| 壁纸跟内容一起滚 | 壁纸挂在使用 `overflow: auto` 的滚动容器里 | 壁纸层改为 `position: absolute; inset: 0`，锚点改成 `[data-composer-input]` 向上找到的对话列，不再依赖会滚动的祖先 |
| 壁纸盖住侧边栏 | 早期用视口定位，越过了列的裁剪范围 | 只覆盖 `pI_x6G_centerCol`（对话列）矩形，`syncVideoRect()` 不再写几何，只维护 `relative` / `isolation` 与零尺寸时隐藏 |
| 切换会话后消失 | 宿主被换成新的 DOM 节点，旧的壁纸层留在废节点上 | 每次自愈都重新锚定；壁纸节点在宿主改变时迁移而不是重建，播放进度保留 |

调试过程中确认的另一件事：`bsk_page reload`（含 `hard`）拿不到新 bundle，必须 `navigate` 到 `http://localhost:3080/?cpbust=N` 才能让浏览器重新拉取最新的 client 资源。

## 1.6.7

- 壁纸不再挑单一宿主：把所有覆盖视口 50% 以上的祖先容器全部铺上壁纸，切换对话后无论留下哪一层都在。
- 设置页恢复一行状态，显示已铺层数与视频播放状态。

## 1.6.6

- 壁纸宿主改为 **最内层**的大不透明容器（此前取最外层，画上去会被自己的子元素盖住，导致切换对话后壁纸消失）。
- 移除设置页里的开发者诊断行。

## 1.6.5

- 宿主健康判定：节点必须在文档里，且宽高都不小于视口的 50%。
- 一旦认下宿主，不再移交给兄弟候选节点。

## 1.5.4

真正让壁纸显示出来的一版。前四版都把壁纸画在 `body` 的背景上，但 DSH 的布局外壳
（`.pI_x6G_frame`、`.pI_x6G_centerCol`、`.pI_x6G_rightbarCol`、`.pI_x6G_bottomRow`、
`.wSkVaW_root`）全都用不透明的 `--dsw-alias-bg-base` 打底，把 body 背景整个盖住。

- 新增第 23 节：把 `[class*="_frame"]` / `centerCol` / `rightbarCol` / `bottomRow` /
  `embeddedBody` 的 `background` 设为 `transparent !important`，让底下的壁纸透出来。
- 壁纸本身仍写在 `body` 的内联 `background-image` 上（含 `.58`→`.80` 的压暗遮罩），
  所以透出的是「已压暗的壁纸」，正文对比度不变。
- 设置面板「壁纸背景」下方的诊断行保留：`已写入 / 已生效 / body 底色`。

## 1.5.3

壁纸改为直接写 `body` 的行内样式（带 `!important`），并在面板里暴露一行渲染诊断。

| 改动 | 原因 |
| --- | --- |
| `paintWallpaper()` 用 `document.body.style.setProperty(..., 'important')` 直接落背景 | 走 CSS 变量时要靠一条规则赢得级联；行内 `!important` 无条件生效 |
| `clearWallpaperPaint()` 在关闭/卸载时清掉这组行内属性 | 避免残留 |
| 设置面板「壁纸背景」下方新增诊断行 `背景：已写入 · 已生效 · body 底色 rgba(...)` | 一眼区分「JS 没写进去」「写进去了但被上层盖住」「body 底色本身不透明」 |
## 1.5.2

壁纸从「JS 建的叠层节点」改成「body 的真正背景层」，解决某些情况下完全看不见的问题。

| 问题 | 原因 | 修法 |
| --- | --- | --- |
| 壁纸节点 `.cp2077-wallpaper` 明明存在却看不见 | 它靠 `position:fixed; z-index:-1` 叠在 body 之下，会被 body 自己的绘制层盖掉 | 直接把图放进 `body` 的 `background-image` 第一层（遮罩渐变之下），不参与任何层叠竞争 |
| 「关掉壁纸」只是去掉了属性，变量还留着 | 只 `removeAttribute` 不改变量 | 关闭时把 `--cp-wallpaper-image` 设成 `none` |
| 全新 WebView 里没有任何选项时该显示什么 | 之前什么都不显示 | `background-image` 里带硬编码兜底封面，变量为空时它自动生效 |
## 1.5.1

壁纸背景默认开启，并修掉一个会让功能看起来「完全没反应」的默认值问题。

| 问题 | 原因 | 修法 |
| --- | --- | --- |
| 全新 WebView 里壁纸永远不出现 | `wallpaperOn` 默认 `false`，且 `wallpaperId` 为空时会被强制关回 `false` | 默认改为 `true`，去掉「空 id 就强制关闭」的逻辑 |
| 开了开关但没选过图，什么也不发生 | 只能靠用户手动在下拉里挑一张 | `ensureWallpaper()` 发现「开着但没选」时自动取库中第一张并持久化 |
| Host 侧插件从未激活 | `export const inject = { required: ['webServer'] }` 不是 Cordis 认的形状，Loader 把 `required` 当服务名，永远 pending | 改成 `export const inject = ['webServer']`，并用 `ctx.webServer` 直接取服务 |

注：`localStorage` 是按 WebView 独立的。在外部 Chromium 里设置过的选项不会同步到 DSH 桌面端的 Tauri WebView，所以「在浏览器里看到过效果、桌面端却什么都没有」是正常的，现在由默认值兜底。
## 1.5.0

壁纸背景上线。设置 → 赛博朋克主题 → 壁纸背景。

- 从 Wallpaper Engine 创意工坊目录读取项目封面（默认 `G:/steam/steamapps/workshop/content/431960`），下拉选一张，开关打开即铺满整个应用。
- 封面先做 4px 模糊 + 降亮（`brightness(.60)`），再压一层渐变遮罩（暗色 86%→95%，浅色 88%→95%），保证正文对比度不被吃掉。
- Host 半（`index.js`）通过 `webServer` 服务注册两条只读路由：`GET /cp2077-wallpaper/index` 返回 `{ ok, root, count, items }`，`GET /cp2077-wallpaper/file/<id>` 直接吐图片字节（带 `cache-control: public, max-age=86400`）。Client 半只发 fetch、设置 `--cp-wallpaper-image`，不碰文件系统。
- 路由做了白名单校验：`<id>` 必须出现在本次扫描结果里，路径必须落在扫描根目录内，跨目录穿越返回 404；除 GET/HEAD 一律 405。扫描结果缓存 60 秒。
- 扫描根目录可用插件配置 `workshopRoot` 覆盖（`cordis.patch.yml` 的 `config`）。
- **升级后需要重启一次 DSH**：Host 插件不走热重载，重启前壁纸路由不存在，面板会提示「壁纸路由未就绪：重启 DSH 后可用」。重启后不需要再做任何配置。

## 1.4.0

控制面板上线。设置 → 赛博朋克主题。

| 项 | 范围 | 默认 | 说明 |
| --- | --- | --- | --- |
| 光标大小 | 14–40px | 24px | 箭头与准星同尺寸；输入光标按 75% 跟随 |
| 赛博朋克光标 | 开/关 | 开 | 关闭后回退系统指针 |
| 网格强度 | 0–200% | 100% | 同时驱动背景网格与地面网格 |
| 扫描线 | 0–200% | 100% | CRT 行条纹浓淡 |
| 切角 | 0–20px | 10px | 面板、气泡、输入框的斜切尺寸 |
| 动画 | 开/关 | 开 | 扫描光束、logo 抖动与呼吸 |

实现要点：

- 面板通过 `settings.section` slot 注册，不自己画浮层，开合与定位由宿主负责。
- 数值经 `--cp-opt-grid` / `--cp-opt-scan` / `--cp-opt-floor` / `--cp-opt-chamfer` 写进 `<html>`，样式表用 `calc()` 读取，所以拖动滑块是实时重算，不需要重建样式表。
- 光标尺寸在 SVG data URI 里，无法变量化，因此由 JS 重建 `<style data-cp2077-cursor>`；该 style 挂在 `<body>`，body 重建时会跟着消失，自愈流程再挂回去，保证卸载后不会残留。
- 选项存在 `localStorage['cp2077-theme:options']`，坏 JSON 与越界值静默回退默认值。
- 面板的 React 依赖用 try/catch 取，取不到时组件返回 null，不会让宿主崩。

## 效果

| 暗色（默认） | 浅色 |
| --- | --- |
| ![dark](screenshots/dark.png) | ![light](screenshots/light.png) |

---

## 环境要求

- DeepSeek Harness（Web GUI 或桌面版，版本需支持 `dsh.client` 插件模块，即 `engines.dsh >= 0.1.x`）
- profile 为 `web`（默认 profile 名，实际以 `~/.dsh/profiles/<name>` 为准）
- 无需安装任何额外 npm 依赖（本插件零依赖）

## 安装

### 方式一：让 DSH 里的 agent 装（推荐）

1. 把本 zip 解压到任意目录，例如 `D:\plugins\cp2077-theme`
2. 打开 DSH，新建一个会话，把下面这句发给它：

```
把 D:\plugins\cp2077-theme 这个本地插件目录安装到当前 profile 并启用
```

agent 会调用 `plugin_manager install_bundle` 完成安装。
3. 刷新页面（F5）。

### 方式二：手动装

在 DSH 会话里让 agent 直接执行（把路径换成你的解压路径）：

```js
plugin_manager({ action: "install_bundle", target: "D:\\plugins\\cp2077-theme" })
```

返回 `application: "applied"` 即成功。若返回 `already-installed`，说明之前装过，改文件会自动生效（目录是 link 进去的）。

### 验证装上了

浏览器控制台里执行：

```js
document.querySelector('style[data-cp2077-theme]')          // 非 null
getComputedStyle(document.body).getPropertyValue('--dsw-alias-brand-primary')  // #FCEE0A
```

## 卸载

```js
plugin_manager({ action: "set_plugin", target: "@local/cp2077-theme", enabled: false })
```

或 `action: "remove_bundle"`。卸载后页面配色立即回到默认，不留残留节点。

## 这个插件做了什么

- 覆盖 **约 130 个设计 token**（`--dsw-alias-*`），通过 `ctx.theme.overrideTokens()` 注入，**不改动用户的 light/dark/system 偏好**，可逆、可热卸载
- 注入一层装饰：渐隐网格、CRT 扫描线、顶部滑动光束、四角 L 形角标（纯 CSS，`prefers-reduced-motion` 下自动隐藏）
- 排版：表头用 Bahnschrift（大写 + 字距）、正文 Segoe UI Variable、代码 Cascadia Mono；代码块切角 + 左侧黄条，表格斑马纹，输入框直角青边
- 抗崩溃加固：幂等挂载、DOM 未就绪自动重试、`MutationObserver` 自愈、全链路 try/catch —— 切换内核 / HMR / 重复启用都不会崩

## 已知限制

- 字体依赖系统自带的 **Bahnschrift** 与 **Cascadia Mono**（Windows 10+）。非 Windows 或未装这些字体时会回落到后备字体，观感略有差别
- 浅色模式（`#EFEBE1` 米白 + 黄 CTA）做了配色与对比度校验，但浅色下的实机观感验证不如暗色充分
- 主题跟随系统深浅色，插件不提供额外的「切换主题」按钮
- 未覆盖 `onboarding`、`file-diff`、`document-preview` 等低频区域的 token，这些区域会沿用基座默认配色

## 版本

`1.1.0` —— 视觉升级：
- 发送按钮 / 主 CTA 改为 2077 黄底黑字 + 切角 + 黄色辉光（按 `[class*="_primary"]` 匹配，禁用态保持暗灰）
- 用户消息气泡：切角 + 左侧黄条 + 黄色斜向渐变
- 侧边栏会话行：hover 半透明黄条、选中态 3px 黄条 + 辉光
- 装饰层新增透视地平网格（`.cp2077-floor`）与地平线（`.cp2077-horizon`），背景网格加密到 56px 并提高可见度；顶部黄→青 2px 霓虹线
- 浅色模式也显示网格与四角角标（降低透明度），扫描线 / 光束 / 地平网格仅暗色
- Lexical 输入框（`[data-composer-input]`）光标改为黄色

`1.0.0` —— 初始公开版。可自由使用、修改、再分发。
```

## 1.2.2

浅色模式实机校准（此前只验证过暗色）：

- 发送按钮的黄色：浅色 token `--cy-yellow` 是 `#8A6400` 暗棕金，在米白背景上像一块脏黄铜。新增 `--cy-yellow-fill`（浅色 `#F9E300`、暗色 `#FCEE0A`），按钮改用它，并给浅色加 1px 黑描边 + 2px 硬投影，接近 2077 海报那种「纯黄底配黑」。
- 顶部霓虹线：暗色下是 2px 的黄/红/青三段，放在浅色里就是一条横贯标签栏的彩色缎带。浅色改成 1px，只留左右两端一小段（青 + 红），中间透明，读起来像 HUD 角标而不是分割线。
- 背景网格：浅色下从 56px 加密到 48px、透明度提到 .095，遮罩收在 58%，米白底不再是一片空白纸。

## 1.2.1

- 去掉输入框上方那条横线：DSH 的运行状态条（`runningDivider`，100% 宽、0.5px 高）正好压在「深度求索中，用时 X」那一行下面，画面里像一根长线横在输入框右侧。已隐藏。
- 同时去掉「已完成，用时 X」那一行下面的 0.5px 分割线，两种状态的轮次过程条都不再画横线。
- 输入框上方条带的背景改成 4 段平滑过渡，装饰网格在到达输入区之前就完全淡出，避免出现色阶硬边。

## 1.2.0

- 扫光改成细线：从 180px 宽的光带缩成 1px 的细线，32 秒才扫一次（每次约 7 秒，其余时间不显示），扫描线不再滚动。
- 按游戏 UI 调研调整：按钮只切右下角；装饰元素（四角角标、顶部线里的红色小段）用 2077 红 #FF003C 并调暗，和功能性的黄色分开；h1 加红青色差；当前会话加黄黑警示条；鼠标悬停发送按钮时故障闪一下（只闪一次）；引用块加 `// DATA` 标签；行内代码用边缘行者的粉色。
## 1.2.3

- 输入框卡片改成切角：左上、右下各 10px 斜切，圆角归零，和消息气泡、发送按钮的语言统一。
- 浅色用 1px 深色内描边；暗色换成青色内描边 + 微弱外发光。切角处不再露出白边。
- 切角用 `clip-path` 实现，会裁掉卡片外部投影，所以阴影改成内描边。已确认卡片内的模型/推理等级浮层不受影响（菜单渲染在 body 上）。
- 选择器用 `[data-composer-seat] [class*="_card"]:not([class*="Workspace"])`，不依赖 DSH 的哈希前缀。
## 1.2.4

- 切角的斜边上加了一段黄色 HUD 高光：左上 13px、右下 15px 两个方形渐变贴片。
- 用两层 `background-image` 贴在卡片角上，不用伪元素、不改定位上下文，所以不会影响 DSH 自己的绝对定位子元素。
- 颜色走 `--cp-cut-accent`：暗色 `#FCEE0A`，浅色 `#C9A200`（比 `#8A6400` 亮一档，在米白上能看出来）。
- 卡片背景从 `background` 拆成 `background-color` + `background-image`，否则高光会被背景色一起覆盖。
## 1.3.0

- 对话区背景加了夜之城天际线：远 / 中 / 近三层楼群剪影，带楼顶边缘光、天线、红点警示灯和一格一格的窗户灯。
- 楼群用内联 SVG data URI 画。随机种子固定（`20271024`），三层尺寸分别是 900x124 / 1150x164 / 1400x218，各自 `repeat-x`。
- 挂在 `div:has(> [data-slot="conversation.input.dock"])::before` 上。这个容器同时装着消息区和输入区，所以 `bottom: 131px` 正好把地平线放在输入框上沿。
- `mask-image` 让楼群顶部渐隐，越往上越淡，不会在消息区中间出现硬边。
- 动态两条：楼群 150s 极慢水平漂移（三层速度不同，做出一点视差），地平线 13s 明暗呼吸。`prefers-reduced-motion` 下两条都不跑。
- 楼色 `#171320` / `#1D1830` / `#241D3A`，和背景 `#0A0910` 只差十来个色阶，整体 `opacity: .78`，所以只是氛围，正文对比度不受影响。
- 浅色模式不出城市（`content: none`），保持纸张感。
## 1.3.1

- 城市下压，不再压正文：高度 `27vh → 16vh`，`bottom: 131px → 116px`，`opacity: .78 → .42`，遮罩上沿收紧到 72%。
- 现在楼群只露在输入框上方一条窄带里，正文区的对比度不再被影响。
- `background-size` 从固定像素改成 `auto 100%`，跟着视口高度等比缩放，换屏幕不会出现楼顶错位。
- 天空渐变同步减弱（青色 .14 → .08，紫色 .10 → .06，品红 .06 → .04）。
- 取舍说明：城市和正文在同一个平面，只要铺满宽度就必然与文字重叠。所以这里的做法是「压到最底部 + 极低不透明度」，宁可淡一点，不牺牲可读性。

## 1.3.2

- 删掉天际线楼群，只保留地平线：一条 1px 的青 → 品红 → 青霓虹线，加上往上渐隐的 11vh 光晕，13 秒呼吸一次。
- 对话区不再有任何压在文字上的图案，正文对比度回到干净状态。
- `client.js` 体积 64.3KB → 44.2KB（省掉约 22KB 内联 SVG）。
- 浅色模式下地平线仍是 `content: none`，米白底上不显示。
## 1.3.3

- 地平线整个移除。对话区的背景回到完全干净的状态，输入框上沿不再有任何霓虹线或光晕。
- 留下来的氛围元素全部在正文区之外，不参与阅读：56px 网格、四角 L 形角标、顶部 2px 黄/红/青渐变条、32 秒一次的 1px 细扫光。
- `client.js` 42.6KB → 41.1KB。
- 经验：全宽背景图和正文在同一平面，任何「有存在感」的图都会干扰阅读。要氛围就得找没有文字的位置（空状态页、侧边栏），不要在消息流下面铺东西。

## 1.3.4

侧边栏品牌标识重新做了一遍配色与光效，对应 CSS 第 18 节：

- 鲸鱼图标改青色 `var(--cy-cyan)` 并加 `drop-shadow(0 0 5px)` 辉光，悬停时加强到 9px。
- wordmark 白色不变，叠一层 0.7px 的红/青色差（chromatic aberration），做出 CRT 义眼叠层的观感。
- 标识左侧加一条 3px 宽的黄色切角竖条（上下各切 5px），带 10px 黄色辉光。
- 悬停时整块加 `rgba(252,238,10,.06)` 背光，色差同时加深。
- **踩过的坑**：曾把整个 wordmark 染成 2077 黄色，但 `HARNESS` 徽章和 "deepseek" 字形在同一个 SVG 里，无法单独着色，全黄之后徽章的黄框与黄字糊成一团。所以字色保持白色，只靠光效和色差表达。
- 浅色模式下色差与辉光都关掉（米白底上红蓝边缘会显脏），只保留青色图标。
## 1.3.5

logo 加两个动作，对应 CSS 第 18b 节：

- **悬停 glitch**：`cp2077-brand-glitch`，0.34s、`steps(2, end)`、播放一次，整块横向 ±1.6px 抖两帧再回正。
- **鲸鱼呼吸**：`cp2077-mark-breathe`，6.5s 循环、`ease-in-out`，辉光在 `4px / alpha .45` 与 `11px / alpha .95` 之间起伏。只动光，不动位置和尺寸。
- 冲突处理：悬停时把呼吸设成 `animation: none` 并固定在 9px，否则两套动画会抢同一个 `filter` 属性。
- `prefers-reduced-motion` 下两个动画都关；浅色模式下呼吸与辉光一起关。
- 实测：间隔 3.3 秒截两张，鲸鱼辉光扩散范围肉眼可辨地不一样。
## 1.3.6

glitch 从「鼠标悬停触发一次」改成**常驻循环**，并且从整块平移换成像素级撕裂。

- **节奏**：6 秒一轮，每轮两次撕裂，各持续 0.29 秒，其余 5.4 秒完全静止。常驻但不吵。
- **原理**：client.js 往 body 注入一个零尺寸 SVG，里面是 `feTurbulence baseFrequency="0.014 0.34"` —— 横向宽、纵向密的噪声，所以出来的是**水平条带**；再交给 `feDisplacementMap` 把每一行像素按噪声横向推开。结果是笔画内部错位、字与字之间错位，不是整体平移。
- **幅度**：`scale` 由 SVG 的 `<animate>` 控制，静止期恒为 0（不产生撕裂也不额外开销），撕裂期在 6.2 和 4.2 两档之间跳。
- **配合动作**：整体平移 ≤1.5px（`cp2077-brand-live`，`steps(1,end)` 硬切，不做补间）；CRT 扫描蒙版在撕裂帧降到 `.10`（`cp2077-brand-scan`），让字形"亮"出来。
- **降级**：`prefers-reduced-motion` 时不注入 filter，并在 `<html>` 写 `data-cp2077-glitch="off"`，CSS 回退成纯红青色差——否则元素会引用一个不存在的 filter，连色差一起丢掉。
- 验证方式：录 7 秒屏、按 12fps 抽帧拼图，能清楚看到「静 → 撕 → 碎 → 复原」四拍。
## 1.3.7

一层「不崩」的加固，配一套可重跑的崩溃演练。

### client 侧防御

- **`apply(ctx)` 前置校验**：`ctx` 或 `ctx.effect` 不是函数就 warn 后直接返回。以前这里会抛 TypeError，而 client bring-up 期间的异常会把整页拖白。
- **effect 注册走 `step()` 包装**：三个作用域各自独立注册，注册本身抛错只 warn，不影响另外两个。
- **模块级 `active` 开关**：`ensureStyle` / `ensureLayer` / `ensureGlitchFilter` / `heal` 都先看它；dispose 时先置 `false` 再删节点。否则会出现「删节点 → MutationObserver 触发 → 又挂回去」，插件在卸载后自己复活。
- **`removeMounted()` 清理 `<html data-cp2077-glitch>`**，避免标记残留。
- **滤镜开关动态重算**：`ensureGlitchFilter()` 每次 self-heal 都重新判断 `prefers-reduced-motion` 与 CPU 核数（≤ 2 跳过）。中途改系统动效设置、或换到弱机也能即时落到廉价分支。
- 所有 DOM 访问都包在 `try` 里；`document.body` / `documentElement` 为空时静默返回，等下一次 MutationObserver 再补。

### 崩溃演练 `test/harness-test.mjs`

手写 DOM stub + `vm` 沙箱，把真实 `client.js` 跑在各种恶劣条件下：

| 场景 | 断言 |
| --- | --- |
| 工厂导出 | `inject` 含 `theme`、`apply` 是函数 |
| 正常环境 | style / 装饰层 / filter host 三件都挂上 |
| `apply({})`、`apply(undefined)` | 不抛 |
| `ctx.effect` 抛错 | 不抛 |
| theme 服务缺失 | 不抛，装饰层照常挂 |
| `overrideTokens` 抛错 | 不抛，后续作用域照常注册 |
| `document.body === null` | 不抛，body 出现后自愈补回 |
| 销毁后触发 MutationObserver | 装饰层与 filter host 都不复活 |
| 逆序销毁 | 同样不复活 |
| `prefers-reduced-motion` | 不注入 filter，写 `off` 标记 |
| 2 核机器 | 不注入 filter |
| 重复 `apply()` | style / layer / host 各只有一份 |
| 连续 8 轮 mutation 风暴 | 不产生重复节点 |
| `<body>` 整体重建 | 自愈在新 body 里重建 |
| 正常态 | `<html>` 上没有残留 `off` 标记 |
| 卸载 | 队列里的延迟任务全部清空，不再有 `setTimeout` 残留 |
| 连续 6 轮 heal（选项不变） | 光标样式表一次都不重写 |
| 连续 6 轮 heal（壁纸不变） | 画布变量与 `data-cp2077-wallpaper` 都不重写 |

跑法：`node test/harness-test.mjs`，全绿时退出码为 0。

## 1.3.8

### 赛博朋克光标

三个光标换成内联 SVG（`data:image/svg+xml,` + `encodeURIComponent`，尺寸压在 32×32 以内——更大的图 Chromium 会整条忽略）：

| 光标 | 形状 | 用在哪 |
| --- | --- | --- |
| 箭头 | 黑填充楔形 + 2077 黄描边 + 青色外光 | 全局默认 |
| 准星 | 黄环 + 四向 ticks + 青色芯点 | 链接、按钮、`[role=button|tab|treeitem|menuitem]`、`summary`、`label[for]`、下拉、勾选框 |
| I-beam | 黄括号形 | 输入框、`textarea`、`contenteditable`、`[data-composer-input]` |

禁用态（`button:disabled` / `select:disabled` / `[aria-disabled="true"]`）保留系统 `not-allowed`——自定义的禁用光标会让人以为还能点。

两个要点：

- **每个字形画两遍**：先铺一层 `#0A0910` 粗描边，再叠黄细描边。纯黄在浅色主题的 `#EFEBE1` 上对比度约 1.3:1，几乎看不见。
- **热点坐标**：箭头 `4 3`，准星 `16 16`（正中），I-beam `12 12`。

## 1.3.9

### 光标尺寸收小一档

上一版把光标画满了画布，观感比系统指针大一圈。现在按比例缩小：

| 光标 | 1.3.8 | 1.3.9 |
| --- | --- | --- |
| 箭头 | 32px | 24px |
| 准星 | 32px | 24px |
| I-beam | 24px | 18px |

热点坐标同步缩放：箭头 `3 2`、准星 `12 12`、I-beam `9 9`。`viewBox` 保持不动，只改 `width`/`height` 等比缩放，所以描边粗细和外光比例不变。
