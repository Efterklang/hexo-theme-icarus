(function (window, document, localStorage) {
    'use strict';

    const STORAGE_KEY = 'themePreference';
    const THEME_SELECTOR_ID = 'theme-selector';
    const DEFAULT_THEME = 'system';
    const TRANSITION_DURATION = 500;
    const TRANSITION_CSS = 'background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease';

    const THEME_MAP = {
        'mocha': 'night',
        'macchiato': 'night',
        'frappe': 'night',
        'latte': 'light'
    };

    function getThemePreference() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return (stored && stored in THEME_MAP) ? stored : DEFAULT_THEME;
        } catch (error) {
            console.warn('Could not access localStorage.', error);
            return DEFAULT_THEME;
        }
    }

    function getThemeClass(theme) {
        // 如果在 THEME_MAP 中，直接返回
        if (theme in THEME_MAP) return THEME_MAP[theme];

        // 'system' 主题根据系统偏好选择
        return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'night' : 'light';
    }

    function applyTheme(theme, animated = false) {
        const html = document.documentElement;

        if (animated) {
            html.style.transition = TRANSITION_CSS;
        }

        html.setAttribute('data-theme', theme);
        html.classList.remove('night', 'light');
        html.classList.add(getThemeClass(theme));

        if (animated) {
            setTimeout(() => {
                html.style.transition = '';
            }, TRANSITION_DURATION);
        }
    }

    function switchTheme(theme) {
        applyTheme(theme, true);
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (error) {
            console.error('Error saving theme preference to localStorage:', error);
        }
    }

    // 初始化主题
    applyTheme(getThemePreference(), false);

    // 监听系统主题改变
    window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (getThemePreference() === 'system') {
            applyTheme('system', true);
        }
    });

    // 监听主题选择框变化
    document.addEventListener('change', event => {
        if (event.target.id === THEME_SELECTOR_ID) {
            switchTheme(event.target.value);
        }
    });

    // 关闭所有下拉菜单
    const closeAllDropdowns = () => {
        document.querySelectorAll('.navbar-item.has-dropdown.is-active').forEach(el => {
            el.classList.remove('is-active');
        });
    };

    // 监听主题菜单点击
    document.addEventListener('click', event => {
        const themeItem = event.target.closest('[data-theme-option]');
        if (themeItem) {
            event.preventDefault();
            switchTheme(themeItem.getAttribute('data-theme-option'));
            closeAllDropdowns();
            return;
        }

        const dropdownParent = event.target.closest('.navbar-item.has-dropdown');
        if (dropdownParent && !event.target.closest('.navbar-dropdown')) {
            event.preventDefault();
            closeAllDropdowns();
            dropdownParent.classList.add('is-active');
            return;
        }

        closeAllDropdowns();
    });
}(window, document, window.localStorage));
