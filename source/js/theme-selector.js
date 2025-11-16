(function (window, document, localStorage) {
    "use strict";

    const STORAGE_KEY = "themePreference";
    const THEME_SELECTOR_ID = "theme-selector";
    const DEFAULT_THEME = "system";
    const colorSchemeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
    );

    const THEME_MAP = {
        mocha: "night",
        macchiato: "night",
        frappe: "night",
        tokyo_night: "night",
        latte: "light",
    };

    function getThemePreference() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored && stored in THEME_MAP ? stored : DEFAULT_THEME;
    }

    function applyTheme(theme, animated = false, persist = false) {
        const html = document.documentElement;
        const resolvedTheme =
            theme === "system"
                ? colorSchemeMediaQuery.matches
                    ? "mocha"
                    : "latte"
                : theme;
        if (animated) {
            html.style.transition =
                "background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease";
        }

        html.setAttribute("data-theme", resolvedTheme);
        html.classList.remove("night", "light");
        html.classList.add(THEME_MAP[resolvedTheme]);

        if (animated) {
            setTimeout(() => {
                html.style.transition = "";
            }, 300);
        }
        if (persist) {
            localStorage.setItem(STORAGE_KEY, theme);
        }
    }

    // 初始化主题
    applyTheme(getThemePreference(), false);

    // 监听系统主题改变
    colorSchemeMediaQuery.addEventListener("change", () => {
        if (getThemePreference() === "system") {
            applyTheme("system", true);
        }
    });

    // 监听主题选择框变化
    document.addEventListener("change", (event) => {
        if (event.target.id === THEME_SELECTOR_ID) {
            applyTheme(event.target.value, true, true);
        }
    });

    // 监听主题菜单点击
    document.addEventListener("click", (event) => {
        const themeItem = event.target.closest("[data-theme-option]");
        if (themeItem) {
            event.preventDefault();
            applyTheme(themeItem.getAttribute("data-theme-option"), true, true);
            return;
        }
    });
})(window, document, window.localStorage);
