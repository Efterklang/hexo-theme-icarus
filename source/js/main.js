// #region mdit@tab-plugin
/**
 * 初始化页面上所有的 Tab 组件
 */
function initializeTabs() {
  // 选取页面上所有的 Tab 容器
  const tabContainers = document.querySelectorAll(".tabs-tabs-wrapper");

  tabContainers.forEach(container => {
    // 为每个容器内的按钮添加点击事件监听
    const buttons = container.querySelectorAll(".tabs-tab-button");
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const tabContainer = button.closest(".tabs-tabs-wrapper");
        const targetIndex = button.getAttribute("data-tab");
        const syncId = button.getAttribute("data-id");
        activateTab(tabContainer, targetIndex);
        if (syncId) {
          syncRelatedTabs(syncId);
        }
      });
    });
  });
}

/**
 * 激活指定容器中的特定 Tab
 * @param {HTMLElement} container - Tab 容器元素
 * @param {string} targetIndex - 要激活的 Tab 的 data-tab 值
 */
function activateTab(container, targetIndex) {
  // 先重置该容器内所有 Tab 的状态
  resetTabsState(container);

  const buttonToActivate = container.querySelector(`.tabs-tab-button[data-tab="${targetIndex}"]`);
  const contentToActivate = container.querySelector(`.tabs-tab-content[data-index="${targetIndex}"]`);

  if (buttonToActivate) {
    buttonToActivate.classList.add("active");
    buttonToActivate.setAttribute("data-active", "");
  }
  if (contentToActivate) {
    contentToActivate.classList.add("active");
    contentToActivate.setAttribute("data-active", "");
  }
}

/**
 * 重置指定容器内所有 Tab 按钮和内容面板的状态
 * @param {HTMLElement} container - Tab 容器元素
 */
function resetTabsState(container) {
  const buttons = container.querySelectorAll(".tabs-tab-button");
  const contents = container.querySelectorAll(".tabs-tab-content");

  buttons.forEach(btn => {
    btn.classList.remove("active");
    btn.removeAttribute("data-active");
  });

  contents.forEach(content => {
    content.classList.remove("active");
    content.removeAttribute("data-active");
  });
}

/**
 * 同步所有具有相同 data-id 的关联 Tab
 * @param {string} syncId - 用于同步的 data-id
 */
function syncRelatedTabs(syncId) {
  const relatedButtons = document.querySelectorAll(`.tabs-tab-button[data-id="${syncId}"]`);

  relatedButtons.forEach(button => {
    const container = button.closest(".tabs-tabs-wrapper");
    // 在每个关联的容器中，激活与当前点击的 Tab 具有相同 data-tab 值的 Tab
    const targetIndex = button.getAttribute("data-tab");

    // 关键：这里的同步逻辑是激活各自对应的 tab，还是都激活成一样的 index？
    // 从原代码看，是各自激活自己 data-tab 对应的 content，我们遵循这个逻辑。
    // 如果希望所有 Tab 都同步到同一个 index，这里应该使用 activeIndex。
    activateTab(container, targetIndex);
  });
}
// #endregion
// #region Keyboard Shortcuts
function initKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.code === "KeyK") { // ctrl/cmd + k for search
        const searchBtn = document.querySelector(".navbar-main .search");
        if (searchBtn) searchBtn.click();
      } else if (e.shiftKey && e.code === "KeyP") { // ctrl/cmd + shift + p for theme selector
        const themeBtn = document.querySelector(
          "button.navbar-item.theme-selector-trigger",
        );
        if (themeBtn) themeBtn.click();
      }
    }
  })
}
// #endregion
// #region TOC
function initializeTableOfContents() {
  const tocContainer = document.getElementById("icarus-toc-container");
  if (tocContainer) {
    const tocButton = tocContainer.querySelector(".toc-button");
    const tocBody = tocContainer.querySelector(".toc-body");
    const tocLinks = tocContainer.querySelectorAll(".toc-link");

    // Mobile Toggle
    if (tocButton) {
      tocButton.addEventListener("click", (e) => {
        e.stopPropagation();
        tocContainer.classList.add("is-open");
      });
    }

    // Close when clicking a link
    tocLinks.forEach((link) => {
      link.addEventListener("click", () => {
        tocContainer.classList.remove("is-open");
      });
    });

    // Close when clicking the backdrop
    if (tocBody) {
      tocBody.addEventListener("click", (e) => {
        if (e.target === tocBody) {
          tocContainer.classList.remove("is-open");
        }
      });
    }

    // Scroll Spy
    const headers = [];
    tocLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      // 解码并移除 #
      const id = decodeURIComponent(href.replace(/^#/, ""));
      // 避免无效 ID 导致报错
      if (id) {
        const header = document.getElementById(id);
        if (header) {
          headers.push({ header, link });
        }
      }
    });

    if (headers.length > 0) {
      const onScroll = () => {
        const viewportHeight = window.innerHeight;
        let currentHeader = null;

        // 查找当前视口中最后一个位于屏幕中线上方的标题
        for (const h of headers) {
          const rect = h.header.getBoundingClientRect();
          if (rect.top < viewportHeight / 2) {
            currentHeader = h;
          } else {
            break;
          }
        }

        // 如果在页面顶部，高亮第一个
        if (!currentHeader && window.scrollY < 100) {
          currentHeader = headers[0];
        }

        // 清除旧的高亮
        for (const l of tocLinks) {
          l.closest(".toc-item").classList.remove("is-active");
        }

        // 设置新的高亮
        if (currentHeader) {
          currentHeader.link.closest(".toc-item").classList.add("is-active");
        }
      };

      // 使用 passive: true 提高滚动性能
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
  }
}
// #endregion
// #region Navbar
function handleNavbarToggle() {
  document.addEventListener("click", (e) => {
    const target = e.target;
    const navbarBurger = document.querySelector(".navbar-burger");
    const navbarMenu = document.querySelector(".navbar-menu");

    if (!navbarBurger || !navbarMenu) return;

    // Handle Burger Click
    if (target.closest(".navbar-burger")) {
      navbarBurger.classList.toggle("is-active");
      navbarMenu.classList.toggle("is-active");
      return; // 阻止后续逻辑
    }

    // After click navbar item, close the menu
    if (target.closest(".navbar-item")) {
      if (navbarBurger.classList.contains("is-active")) {
        navbarBurger.classList.remove("is-active");
        navbarMenu.classList.remove("is-active");
      }
    }
  });
}
// #endregion

function initLogic() {
  initKeyboardShortcuts();
  initializeTableOfContents();
  initializeTabs();
  handleNavbarToggle();
  if (typeof mediumZoom === "function") {
    mediumZoom(".article img", {
      background: "hsla(from var(--mantle) / 0.9)",
    });
  }
}

document.addEventListener("pjax:complete", () => initLogic());
document.addEventListener("DOMContentLoaded", () => initLogic());