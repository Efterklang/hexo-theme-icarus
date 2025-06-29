# Hexo Theme Icarus

[![npm version](https://img.shields.io/npm/v/hexo-theme-icarus.svg)](https://www.npmjs.com/package/hexo-theme-icarus)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14-brightgreen.svg)](https://nodejs.org/)
[![Hexo Version](https://img.shields.io/badge/hexo-%3E%3D7.0-blue.svg)](https://hexo.io/)

> [!CAUTION]
>
> 仓库用作`Efterklang.github.io`的 git submodule，以便于分别为post和theme做版本控制

## Features Preview

[vluv's space](https://vluv.space/)

- 个人不用的文件直接删除了，比如`highlight.js` & `prism.js`，目前使用的为`hexo-shiki-highlight`
- 魔改icarus样式，包括tag, code, widget, card etc.
- 为一些插件加了自定义的样式，callout e.g
- 添加Asoul live2d model, 支持light/dark mode, use Catppuccin color scheme
- 默认字体换用`落霞孤鹜`, `Maple Mono NF CN`，这里使用fonttools移出了繁体，仅保留拉丁字母以及简体中文等的subset

### Light/Night Theme Support

| ![image](https://github.com/user-attachments/assets/da9c8019-9a0d-4eb8-927a-3c970947c371) | ![image](https://github.com/user-attachments/assets/466eab7e-208c-4bc6-9003-799809bfd6f8) |
| ---   | ---  |

### Shiki Highlight

> Require [Efterklang/hexo-shiki-highlight: shiki highlighter for hexo](https://github.com/Efterklang/hexo-shiki-highlight)

| ![image](https://github.com/user-attachments/assets/bc88dd30-e9f6-41d7-885c-b1c2a47cb45d) | ![image](https://github.com/user-attachments/assets/48a35dce-1304-4059-8ef1-6a929056e837) |
| ---   | ---  |

### Mermaid Filter

> Require [Efterklang/hexo-mermaid-diagram](https://github.com/Efterklang/hexo-mermaid-diagram)
> 🚧 Dark mode WIP...

![image](https://github.com/user-attachments/assets/3bd2d897-721d-4505-8194-6a592bbceb31)

### Floating TOC

为更好的阅读体验(主要体现在移动端)，这里将TOC改成浮动组件

```yaml
# _config.post.yml
sidebar:
  left:
    sticky: false
  right:
    sticky: true

widgets:
  - position: right
    type: toc
    index: true
    collapsed: false
```

| ![image](https://github.com/user-attachments/assets/81145544-ed01-4886-a340-9fd4533fbeca) | ![image](https://github.com/user-attachments/assets/02d3e616-5b5b-4b32-b5d4-dbf5e23f0a3a) |
| ---   | ---  |

### Table

| ![image](https://github.com/user-attachments/assets/f06ea615-a4eb-4e5f-b1ed-65823120b08e) | ![image](https://github.com/user-attachments/assets/d9a1ac05-aed7-4b0e-880e-0d5455b54e16) |
| -- | -- |

### Quote

| ![image](https://github.com/user-attachments/assets/648d7463-70a9-47c7-b364-56c8a26cca37) |
| -- |
| ![image](https://github.com/user-attachments/assets/bd1ac620-79b0-43da-aee9-a724cf40190e) |

## Installation

Step 1: Install hexo and initialize a new blog project:

```bash
mkdir blog
bun i -g hexo
bunx hexo init --no-clone
```

Step 2: Clone theme repository into `themes/icarus` directory:

```shell
$ git init
Initialized empty Git repository in /Users/gjx/Library/CloudStorage/OneDrive-Personal/Documents/vlu/.git/

$ git submodule add https://github.com/Efterklang/hexo-theme-icarus.git themes/icarus
Cloning into '/Users/gjx/Library/CloudStorage/OneDrive-Personal/Documents/vlu/themes/icarus'...
remote: Enumerating objects: 216, done.
remote: Counting objects: 100% (8/8), done.
remote: Compressing objects: 100% (8/8), done.
remote: Total 216 (delta 0), reused 0 (delta 0), pack-reused 208 (from 1)
Receiving objects: 100% (216/216), 30.15 MiB | 9.89 MiB/s, done.
Resolving deltas: 100% (21/21), done.
```

Step 3: Install dependencies for blog project

My `package.json`'s  dependencies section looks like this(some are optional)

```json
{
  "denpendencies": {
    "bulma-stylus": "^0.8.0",
    "gulp": "^5.0.0",
    "gulp-clean-css": "^4.3.0",
    "gulp-html-minifier-terser": "^7.1.0",
    "gulp-uglify-es": "^3.0.0",
    "hexo": "^7.2.0",
    "hexo-blog-encrypt": "^3.1.9",
    "hexo-cli": "^4.3.2",
    "hexo-component-inferno": "^3.1.2",
    "hexo-filter-titlebased-link": "^0.2.6",
    "hexo-generator-archive": "^2.0.0",
    "hexo-generator-category": "^2.0.0",
    "hexo-generator-feed": "^3.0.0",
    "hexo-generator-index-custom": "^1.0.1",
    "hexo-generator-sitemap": "^3.0.1",
    "hexo-generator-tag": "^2.0.0",
    "hexo-mermaid-diagram": "^1.0.0",
    "hexo-migrator-rss": "^1.1.0",
    "hexo-native-lazy-load": "^1.1.2",
    "hexo-pagination": "^3.0.0",
    "hexo-renderer-ejs": "^2.0.0",
    "hexo-renderer-inferno": "^1.0.2",
    "hexo-renderer-markdown-it-plus": "^1.0.6",
    "hexo-renderer-stylus": "^3.0.1",
    "hexo-server": "^3.0.0",
    "hexo-shiki-highlight": "^1.2.4",
    "hexo-util": "^3.3.0",
    "inferno": "^9.0.3",
    "inferno-create-element": "^9.0.3",
    "markdown-it-merge-cells": "^2.0.0",
    "markdown-it-obsidian-callouts": "^0.3.1",
    "markdown-it-task-lists": "^2.1.1",
    "semver": "7.5.4",
    "sharp": "^0.34.2"
  }
}
```
