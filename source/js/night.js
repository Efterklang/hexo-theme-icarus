(function(window, document, localStorage) {
  'use strict';

  const NIGHT_MODE_CLASS = 'night';
  const LIGHT_MODE_CLASS = 'light';
  const STORAGE_KEY = 'nightMode';
  const NIGHT_NAV_ID = 'night-nav';
  const FIND_NAV_TIMEOUT_MS = 100;
  const MAX_FIND_NAV_ATTEMPTS = 50; // 限制查找次数，防止无限循环 (50 * 100ms = 5s)

  let nightNavElement = null;
  let findNavAttempts = 0;
  let initialThemeApplied = false;

  /**
   * 获取初始主题偏好设置
   * @returns {boolean} true 表示夜间模式，false 表示日间模式
   */
  function getInitialThemePreference() {
    let initialIsNight = true; // 默认使用夜间模式
    try {
      const storedNightMode = localStorage.getItem(STORAGE_KEY);
      if (storedNightMode !== null) {
        initialIsNight = storedNightMode === 'true';
      }
    } catch (error) {
      console.warn('Warning: Could not access localStorage to get night mode preference. Using default night mode.', error);
    }
    return initialIsNight;
  }

  /**
   * 应用夜间或日间模式到 body 元素。
   * @param {boolean} isNight - true 表示夜间模式，false 表示日间模式。
   */
  function applyTheme(isNight) {
    const targetElement = document.documentElement;
    
    if (!targetElement) {
      console.error('Error: Neither document.body nor document.documentElement is available.');
      return;
    }
    
    // 仅在需要时切换 class，减少 DOM 操作
    if (isNight) {
      if (!targetElement.classList.contains(NIGHT_MODE_CLASS)) {
        targetElement.classList.remove(LIGHT_MODE_CLASS);
        targetElement.classList.add(NIGHT_MODE_CLASS);
      }
    } else {
      if (!targetElement.classList.contains(LIGHT_MODE_CLASS)) {
        targetElement.classList.remove(NIGHT_MODE_CLASS);
        targetElement.classList.add(LIGHT_MODE_CLASS);
      }
    }
  }

  /**
   * 早期应用主题，防止闪烁
   */
  function applyInitialTheme() {
    if (initialThemeApplied) return;
    
    const initialIsNight = getInitialThemePreference();
    applyTheme(initialIsNight);
    initialThemeApplied = true;
    
    // 保存偏好设置到 localStorage（如果之前没有保存过）
    try {
      if (localStorage.getItem(STORAGE_KEY) === null) {
        localStorage.setItem(STORAGE_KEY, initialIsNight.toString());
      }
    } catch (error) {
      console.warn('Warning: Could not save initial theme preference to localStorage.', error);
    }
  }

  /**
   * 查找夜间模式切换按钮。
   * 如果未找到，则在短时间后重试，直到达到最大尝试次数。
   */
  function findNightNavButton() {
    nightNavElement = document.getElementById(NIGHT_NAV_ID);
    findNavAttempts++;

    if (nightNavElement) {
      nightNavElement.addEventListener('click', toggleNightMode);
    } else if (findNavAttempts < MAX_FIND_NAV_ATTEMPTS) {
      setTimeout(findNightNavButton, FIND_NAV_TIMEOUT_MS);
    } else {
      console.warn(`Warning: Night navigation button with ID '${NIGHT_NAV_ID}' not found after ${MAX_FIND_NAV_ATTEMPTS} attempts.`);
    }
  }

  /**
   * 切换夜间/日间模式。
   * 更新 localStorage 中的状态并应用主题。
   */
  function toggleNightMode() {
    try {
      let currentIsNight = localStorage.getItem(STORAGE_KEY) === 'true';
      const newIsNight = !currentIsNight;
      applyTheme(newIsNight);
      localStorage.setItem(STORAGE_KEY, newIsNight.toString());
    } catch (error) {
      console.error('Error accessing localStorage or applying theme:', error);
      // 如果 localStorage 不可用，至少尝试应用主题（非持久化）
      const targetElement = document.documentElement;
      const currentBodyIsNight = targetElement.classList.contains(NIGHT_MODE_CLASS);
      applyTheme(!currentBodyIsNight);
    }
  }

  /**
   * 初始化夜间模式按钮绑定
   */
  function initializeNightModeButton() {
    findNightNavButton();
  }

  // 立即应用初始主题，防止闪烁
  applyInitialTheme();

  // DOM 加载完成后绑定按钮事件
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      // 确保主题已应用（防止某些情况下初始应用失败）
      applyInitialTheme();
      initializeNightModeButton();
    });
  } else {
    // DOMContentLoaded 已经触发
    applyInitialTheme();
    initializeNightModeButton();
  }


  // Expose toggleNightMode to global scope
  window.toggleNightMode = toggleNightMode;

}(window, document, window.localStorage));
