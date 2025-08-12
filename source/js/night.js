(function (window, document, localStorage) {
  'use strict';

  const NIGHT_MODE_CLASS = 'night';
  const LIGHT_MODE_CLASS = 'light';
  const STORAGE_KEY = 'nightMode';
  const NIGHT_NAV_ID = 'night-nav';

  /**
   * 获取用户的主题偏好。
   * 顺序：localStorage -> 系统偏好 -> 默认（夜间）。
   * @returns {boolean} true 表示夜间模式。
   */
  function getThemePreference() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        return stored === 'true';
      }
    } catch (error) {
      console.warn('Could not access localStorage.', error);
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return false; // 系统为日间模式
    }
    return true; // 默认夜间模式
  }

  /**
   * 应用指定的主题到 <html> 元素。
   * @param {boolean} isNight - true 表示夜间模式。
   */
  function applyTheme(isNight) {
    const html = document.documentElement;
    html.classList.toggle(NIGHT_MODE_CLASS, isNight);
    html.classList.toggle(LIGHT_MODE_CLASS, !isNight);
  }

  /**
   * 切换日间/夜间模式，并保存偏好。
   */
  function toggleNightMode() {
    const isCurrentlyNight = document.documentElement.classList.contains(NIGHT_MODE_CLASS);
    const newIsNight = !isCurrentlyNight;
    applyTheme(newIsNight);
    try {
      localStorage.setItem(STORAGE_KEY, newIsNight.toString());
    } catch (error) {
      console.error('Error saving theme preference to localStorage:', error);
    }
  }

  applyTheme(getThemePreference());

  document.addEventListener('click', function (event) {
    const nightNavButton = event.target.closest('#' + NIGHT_NAV_ID);
    if (nightNavButton) {
      event.preventDefault();
      toggleNightMode();
    }
  });

  // 将 toggleNightMode 暴露到全局作用域，供 live2d 等其他组件使用
  window.toggleNightMode = toggleNightMode;

}(window, document, window.localStorage));
