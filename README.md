# 赛博朋克 2077 主题（cp2077-theme）

[![ci](https://github.com/lh15626127422-cloud/dsh-cp2077-theme/actions/workflows/ci.yml/badge.svg)](https://github.com/lh15626127422-cloud/dsh-cp2077-theme/actions/workflows/ci.yml)
[![license](https://img.shields.io/badge/license-MIT-FCEE0A)](LICENSE)
[![version](https://img.shields.io/badge/version-2.0.2-00E5FF)](https://github.com/lh15626127422-cloud/dsh-cp2077-theme/releases)
[![dsh](https://img.shields.io/badge/dsh-0.2.x-FF2E9A)](https://github.com/deepseek-ai)

给 DeepSeek Harness Web GUI 用的赛博朋克 2077 风格主题插件。**[English → README.en.md](README.en.md)**

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

## 卸载

删掉 profile `package.json` 里 `@local/cp2077-theme` 那一行、删掉 `node_modules/@local/cp2077-theme` 软链，重启 DSH 并刷新页面。配色、装饰层、光标与壁纸立刻回到默认，不留节点、定时器或残留 token。

也可以让 agent 先停用：`plugin_manager({ action: "set_plugin", target: "<entry id>", enabled: false })`，`<entry id>` 在 `list_plugins` 输出里（形如 `include:cp2077-theme`）。

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

## 2.0.2

| 问题 | 根因 | 修法 |
| --- | --- | --- |
| 停止按钮的提示卡被右边缘截断（`Esc` 只剩一半） | 输入框卡片的切角是用 `clip-path` 画在卡片本身上的，而 `clip-path` 会连子元素一起裁；停止按钮的提示卡是 DSH 直接渲染在卡片内部的（`side: top`，没有 portal），于是被卡片的右边界切掉 | 切角改由 `::before` 伪元素承载（`inset: 0` + 自身的 `clip-path`），卡片本体改成透明、`clip-path: none` —— 视觉完全不变，但不再裁切任何子元素 |

顺带说明：卡片因此多了 `position: relative` 与 `isolation: isolate`，让伪元素稳定地落在内容之下；壁纸模式下给输入框的实心底色也同步移到了伪元素上。

## 2.0.1

| 问题 | 根因 | 修法 |
| --- | --- | --- |
| 鼠标停在停止按钮上，按钮持续闪动 | 主按钮 hover 上有一段 0.26s 的一次性 `clip-path` 撕裂动画；回合进行中这个位置是停止按钮，前端每收到一段流式内容就重渲染一次，动画随之重启，看起来就是不停闪 | 删掉主按钮的 hover 动画（`@keyframes cp2077-glitch` 与对应规则），只保留 hover 的提亮与光晕 |

动画仍在别处：Logo wordmark 的像素级撕裂用的是 SVG `feTurbulence` + `feDisplacementMap` 滤镜，与这里的 keyframes 同名但互不相干，未受影响。

## 2.0.0

开箱可用：clone 下来就能装，壁纸库自动识别；没装 Wallpaper Engine 或 ffmpeg 也照常使用主题。

| 能力 | 说明 |
| --- | --- |
| 壁纸库自动探测 | 优先级：插件配置 `workshopRoot` → 环境变量 `CP2077_WORKSHOP_ROOT` → 枚举 Steam 库目录（Windows 读注册表 `HKCU\Software\Valve\Steam` 再展开 `libraryfolders.vdf`，macOS / Linux 走惯例路径） |
| 探测结果可见 | `/index` 返回 `rootSource`（`config` / `config-missing` / `env` / `env-missing` / `detected` / `fallback`）与 `ffmpeg`；库目录不是自动探测来的，面板会显示完整路径 |
| ffmpeg 可缺省 | 启动时探测一次 `ffmpeg -version`；缺失时「动态播放」显示「动态播放 · 需要 ffmpeg」并置灰，视频壁纸自动退回封面 |
| 安装与许可 | 无 npm 依赖，MIT；软链进 profile 即可，改文件立即生效 |

装到另一台机器：

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
