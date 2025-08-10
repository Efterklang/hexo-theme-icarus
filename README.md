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
$ mkdir blog
$ cd blog
$ hexo init --no-clone
INFO  Cloning hexo-starter https://github.com/hexojs/hexo-starter.git
INFO  Install dependencies
INFO  Start blogging with Hexo
```

Step 2: Clone theme repository into `themes/icarus` directory:

```shell
$ git init
Initialized empty Git repository in /Users/gjx/Projects/blog/.git/
$ git submodule add https://github.com/Efterklang/hexo-theme-icarus.git themes/icarus
Cloning into '/Users/gjx/Projects/blog/themes/icarus'...
remote: Enumerating objects: 433, done.
remote: Counting objects: 100% (225/225), done.
remote: Compressing objects: 100% (156/156), done.
remote: Total 433 (delta 122), reused 147 (delta 69), pack-reused 208 (from 1)
Receiving objects: 100% (433/433), 33.33 MiB | 10.11 MiB/s, done.
Resolving deltas: 100% (143/143), done.
```

Step 3: Install dependencies for blog project

```shell
$ cd themes/icarus
$ bun install
```

### Configs

```yaml

```