[![npm version](https://img.shields.io/npm/v/hexo-theme-icarus.svg)](https://www.npmjs.com/package/hexo-theme-icarus)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14-brightgreen.svg)](https://nodejs.org/)
[![Hexo Version](https://img.shields.io/badge/hexo-%3E%3D7.0-blue.svg)](https://hexo.io/)

> [!danger]
>
> 此仓库用作`Efterklang.github.io`的 git submodule，拆分`blog source`和`theme`，方便个人维护
>
> theme可能存在硬编码

## Features

- Asoul live2d 
- Catppuccin theme
- callout, mermaid style，shiki(需要自行下载依赖)

## Installation

Step 1: Install hexo and initialize a new blog project:

```bash
$ mkdir blog
$ bun i -g hexo
$ bunx hexo init --no-clone
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
    "hexo-filter-mermaid-diagrams": "^1.0.5",
    "hexo-filter-titlebased-link": "^0.2.6",
    "hexo-generator-archive": "^2.0.0",
    "hexo-generator-category": "^2.0.0",
    "hexo-generator-feed": "^3.0.0",
    "hexo-generator-index-custom": "^1.0.1",
    "hexo-generator-sitemap": "^3.0.1",
    "hexo-generator-tag": "^2.0.0",
    "hexo-migrator-rss": "^1.1.0",
    "hexo-native-lazy-load": "^1.1.2",
    "hexo-pagination": "^3.0.0",
    "hexo-renderer-ejs": "^2.0.0",
    "hexo-renderer-inferno": "^1.0.2",
    "hexo-renderer-markdown-it-plus": "^1.0.6",
    "hexo-renderer-stylus": "^3.0.1",
    "hexo-server": "^3.0.0",
    "hexo-shiki-highlight": "^1.1.9",
    "hexo-theme-landscape": "^1.0.0",
    "hexo-util": "^3.3.0",
    "inferno": "^9.0.3",
    "inferno-create-element": "^9.0.3",
    "markdown-it-obsidian-callouts": "^0.3.1",
    "markdown-it-task-lists": "^2.1.1",
    "semver": "7.5.4"
  }
}
```

