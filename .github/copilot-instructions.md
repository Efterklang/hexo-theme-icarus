# Hexo Theme Icarus - AI Coding Instructions

## Project Overview

**Icarus** is a modern Hexo theme with Catppuccin color palette support and night mode. It uses **Inferno** (React alternative) for component rendering and **Stylus** for styling.

**Tech Stack:**

- **Framework**: Hexo 7.x + Inferno 9.x (JSX components)
- **Styling**: Stylus with Bulma CSS framework
- **Configuration**: JSON schema-based validation in `include/schema/`
- **Rendering**: Server-side JSX → HTML (no client-side React)

## Architecture Overview

### Core Directory Structure

```
layout/          → Hexo page templates (*.jsx) + common components
include/
  ├─ schema/     → JSON Schema definitions for config validation
  ├─ util/       → Shared utilities (logger, Component, classname, cacheComponent)
  └─ style/      → Stylus files (Bulma + custom, theme variants)
source/          → Static assets (CSS, JS, images, fonts)
```

### Data Flow

1. **Hexo** loads `scripts/index.js` → runs config validation + registers extensions
2. **Config schema** (`include/schema/config.json`) validates `_config.icarus.yml`
3. **Components** in `layout/` receive props: `{ site, config, page, helper, body }`
4. **Helper functions** (`hexo.helper`) provide utilities: `url_for()`, `__()` (i18n), `_p()`
5. **Widgets system** (`layout/common/widgets.jsx`) renders conditional sidebar components

### Key Components

| Component                   | Purpose                             | Notes                                                           |
| --------------------------- | ----------------------------------- | --------------------------------------------------------------- |
| `layout/layout.jsx`         | Root template                       | Sets HTML lang, renders navbar/sidebar/footer                   |
| `layout/common/navbar.jsx`  | Navigation + theme selector         | Multiple theme options (Catppuccin variants, Tokyo Night, Nord) |
| `layout/common/widgets.jsx` | Dynamic widget loader               | Supports left/right sidebars; excludes TOC from column count    |
| `layout/common/head.jsx`    | Meta tags, fonts, styles            | Theme CSS loaded here                                           |
| `include/util/common.js`    | Singleton logger, Component exports | Re-export Inferno, cacheComponent, classname                    |

## Development Patterns

### Component Lifecycle & Caching

All page components use the **cacheComponent wrapper** to avoid re-rendering:

```javascript
// Example: navbar.jsx
module.exports = cacheComponent(Navbar, 'common.navbar', props => {
    // Transform props here (expensive operations)
    return { logo, siteTitle, menu, links, ... };
});
```

**Why**: Props contain large objects (site, page). Transformation logic is isolated in the wrapper, reducing re-renders when content hasn't changed.

### Widget Discovery & Loading

Widgets are defined in config as objects with `{ position, type, ... }`:

```javascript
// layout/common/widgets.jsx - dynamic loading pattern
const Widget = loadComponent(`widgets/${widget.type}`, fallback);
// Widget must export: cacheComponent(WidgetClass, 'widget.name', propsTransformer)
```

**Key constraint**: TOC widget is excluded from column count calculation (`widget.type === 'toc'`).

### Styling Architecture

- **Base**: Bulma framework imported first (`include/style/bulma/`)
- **Variables**: Defined in `base.styl` (colors, sizes, gaps)
- **Theme variants**: CSS custom properties override via `night.styl` and theme selector JS
- **Responsive**: Bulma's breakpoints (tablet, desktop, widescreen)

**Layout classes**:

```javascript
// layout/layout.jsx column system
'is-12': columnCount === 1,           // Full width
'is-8-tablet is-9-desktop is-9-widescreen': columnCount === 2,  // Main + 1 sidebar
'is-8-tablet is-8-desktop is-6-widescreen': columnCount === 3   // Main + 2 sidebars
```

### Configuration & Validation

Config uses **JSON Schema** (`include/schema/`):

```javascript
// include/config.js validates against schema
const schema = loader.getSchema("/config.json");
const validation = schema.validate(cfg);
```

**Config resolution order**:

1. Theme default: `include/schema/` (generates defaults)
2. Theme config: `_config.icarus.yml` (in site root)
3. Hexo's `theme_config` (in main `_config.yml` - DISCOURAGED, logged as warning)

**Adding new config sections**: Create `.json` schema files and reference via `$ref` in `config.json`.

## Common Tasks

### Adding a New Theme Variant

1. Define color variables in `include/style/` (e.g., `cyberpunk.styl`)
2. Add to schema enum: `include/schema/config.json` → `variant` property
3. Export CSS in `layout/common/head.jsx` or inject via theme selector JS

### Creating a New Widget

1. Create `layout/widget/{type}.jsx` with cacheComponent export
2. Define schema in `include/schema/widget/{type}.json`
3. Reference in `include/schema/common/widgets.json` allowed types

### Modifying Layout Structure

- Edit `layout/layout.jsx` (main template structure)
- Column logic in `layout/common/widgets.jsx` (getColumnCount, getColumnSizeClass)
- Update Bulma classes if breakpoints change

## Important Conventions

- **JSX files use Inferno, not React**: No hooks. Use `class` components extending `Component`.
- **Singular `logger` instance**: Import via `require('./include/util/common')`.
- **Helper functions via props**: `{ helper }` contains `url_for()`, `__()`, `_p()` (don't require separately).
- **CSS custom properties for themes**: Theme switching JS modifies `--lavender`, etc., in `:root`.
- **NO client-side build step**: Hexo renders JSX server-side; static JS in `source/js/` for DOM manipulation only.

## Build & Debug

```bash
npm run lint                              # ESLint (JS, JSX, JSON)
hexo generate                             # Build site to public/
hexo server                               # Preview on localhost:4000
```

**Config validation issues?** Run with `--icarus-dont-check-config` to skip (see `include/config.js` for details).

## External Dependencies

- **hexo-component-inferno**: Provides JSX rendering, cache utilities, Hexo generators
- **hexo-renderer-stylus**: Compiles `.styl` files
- **deepmerge**: Config merging in validation
- **moment**: Date formatting in templates

---

For detailed codebase patterns, reference:

- Component structure: `layout/common/navbar.jsx`
- Config validation: `include/config.js`
- Widget system: `layout/common/widgets.jsx`
