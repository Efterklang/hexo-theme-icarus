# Hexo Theme Icarus

> [!danger]
>
> 以下内容均为AI生成，可能存在错误或不准确的地方，请谨慎参考
> 有时间的话会进行人工校对和修改

[![npm version](https://img.shields.io/npm/v/hexo-theme-icarus.svg)](https://www.npmjs.com/package/hexo-theme-icarus)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14-brightgreen.svg)](https://nodejs.org/)
[![Hexo Version](https://img.shields.io/badge/hexo-%3E%3D7.0-blue.svg)](https://hexo.io/)

> Second generation of Hexo theme Icarus, now with Catppuccin flavor and night mode support.

一个现代化、功能丰富的 Hexo 主题，采用 Catppuccin 色彩方案，支持夜间模式，提供优雅的阅读体验。

## ✨ 特性

### 🎨 视觉设计

- **Catppuccin 色彩方案** - 采用现代化的 Catppuccin 调色板，提供温暖舒适的视觉体验
- **夜间模式支持** - 智能切换日夜主题，保护眼睛健康
- **响应式设计** - 完美适配桌面、平板和移动设备
- **现代化 UI** - 基于 Bulma CSS 框架，界面简洁美观
- **自定义背景** - 支持动态星空背景效果

### 📝 内容展示

- **多布局支持** - 支持文章、页面、归档、分类、标签等多种布局
- **目录导航** - 自动生成文章目录，支持侧边栏显示
- **代码高亮** - 支持多种代码高亮主题
- **数学公式** - 内置 KaTeX 和 MathJax 支持
- **Callout 块** - 支持多种样式的提示框和警告块
- **图片优化** - 支持图片懒加载和画廊模式

### 🔧 功能组件

- **多样化小部件** - 个人资料、归档、分类、标签、最新文章、友情链接等
- **评论系统** - 支持 Twikoo 评论系统
- **搜索功能** - 内置 Insight 搜索引擎
- **分享功能** - 支持多平台文章分享
- **打赏功能** - 支持多种打赏方式
- **统计分析** - 集成多种网站统计工具

### 🚀 性能优化

- **PJAX 支持** - 页面无刷新跳转，提升用户体验
- **CDN 加速** - 支持多种 CDN 服务
- **懒加载** - 图片和组件延迟加载
- **代码压缩** - CSS 和 JS 自动压缩优化

### 🛠 开发工具

- **配置检查** - 自动检查主题配置文件
- **错误处理** - 完善的错误提示和处理机制
- **代码规范** - ESLint 代码规范检查
- **模块化设计** - 组件化开发，易于维护和扩展

## 📦 安装指南

### 方式一：Git Clone（推荐）

适用于需要自定义主题或参与主题开发的用户。

```bash
# 进入 Hexo 站点目录
cd your-hexo-site

# 克隆主题到 themes 目录
git clone https://github.com/Efterklang/hexo-theme-icarus.git themes/icarus

# 安装主题依赖
cd themes/icarus
npm install
```

### 方式二：Git Submodule

适用于使用 Git 管理 Hexo 站点且希望跟踪主题更新的用户。

```bash
# 进入 Hexo 站点目录
cd your-hexo-site

# 添加主题作为子模块
git submodule add https://github.com/Efterklang/hexo-theme-icarus.git themes/icarus

# 初始化并更新子模块
git submodule update --init --recursive

# 安装主题依赖
cd themes/icarus
npm install
```

### 激活主题

编辑站点根目录下的 `_config.yml` 文件：

```yaml
theme: icarus
```

### 生成配置文件

首次运行时，主题会自动生成配置文件：

```bash
# 返回站点根目录
cd ../..

# 生成站点（会自动创建主题配置文件）
hexo generate

# 启动本地服务器
hexo server
```

主题配置文件 `_config.icarus.yml` 将在站点根目录下自动生成。

## 🔧 配置说明

主题配置文件 `_config.icarus.yml` 包含了主题的所有配置选项：

- **基本设置** - 站点标题、描述、作者信息等
- **外观配置** - 主题变体、Logo、导航栏、页脚等
- **布局设置** - 侧边栏、小部件配置
- **功能开关** - 评论、搜索、分享、统计等
- **插件配置** - 各种插件的详细设置

详细配置说明请参考自动生成的配置文件中的注释。

## 🎯 主要组件

### 小部件 (Widgets)

- `profile` - 个人资料卡片
- `toc` - 文章目录
- `links` - 友情链接
- `categories` - 分类列表
- `recent_posts` - 最新文章
- `archives` - 归档列表
- `tags` - 标签云
- `subscribe_email` - 邮件订阅
- `twikoo_new` - Twikoo 评论组件

### 插件 (Plugins)

- `animejs` - 动画效果
- `back_to_top` - 返回顶部
- `busuanzi` - 不蒜子统计
- `netlify` - Netlify 部署
- `pjax` - 无刷新页面跳转

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个主题！

1. Fork 这个仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Hexo](https://hexo.io/) - 快速、简洁且高效的博客框架
- [Bulma](https://bulma.io/) - 现代化的 CSS 框架
- [Catppuccin](https://catppuccin.com/) - 舒缓的调色板
- [Inferno](https://infernojs.org/) - 快速的 React 类似库

## 📞 联系

- 作者: Efterklang
- 邮箱: <gaojiaxing0220@gmail.com>
- GitHub: [@Efterklang](https://github.com/Efterklang)
- 主页: <https://github.com/Efterklang/hexo-theme-icarus>
