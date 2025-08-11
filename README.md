# Hexo Theme Icarus

## Demo & Preview

[vluv's space](https://vluv.space/)

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

```shell
$ bun add git+https://github.com/Efterklang/hexo-theme-icarus
$ hexo config theme icarus
```