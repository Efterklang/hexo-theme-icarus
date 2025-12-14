/* eslint-disable node/no-unsupported-features/node-builtins */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // Keyboard shortcuts handler
  // ==========================================================================
  document.addEventListener("keydown", (e) => {
    // ctrl/cmd + k for search
    if ((e.ctrlKey || e.metaKey) && e.code === "KeyK") {
      const searchBtn = document.querySelector(".navbar-main .search");
      if (searchBtn) searchBtn.click();
    }
    // ctrl/cmd + shift + p for theme selector
    else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === "KeyP") {
      const themeBtn = document.querySelector(
        "a.navbar-item.theme-selector-trigger",
      );
      if (themeBtn) themeBtn.click();
    }
  });

  // ==========================================================================
  // Initialize medium-zoom
  // ==========================================================================
  if (typeof mediumZoom === "function") {
    mediumZoom(".article img", {
      background: "hsla(from var(--mantle) / 0.9)",
    });
  }

  // ==========================================================================
  // Navbar Burger & Menu Logic
  // ==========================================================================
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

    // Handle Menu Item Click (Auto close menu)
    if (target.closest(".navbar-menu a.navbar-item")) {
      if (navbarBurger.classList.contains("is-active")) {
        navbarBurger.classList.remove("is-active");
        navbarMenu.classList.remove("is-active");
      }
    }
  });

  // ==========================================================================
  // Tabs Logic
  // ==========================================================================
  const tabWrappers = document.querySelectorAll(".tabs-tabs-wrapper");
  tabWrappers.forEach((wrapper) => {
    const buttons = wrapper.querySelectorAll(".tabs-tab-button");
    const contents = wrapper.querySelectorAll(".tabs-tab-content");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetIndex = btn.getAttribute("data-tab");

        // Reset states
        buttons.forEach((b) => {
          b.classList.remove("active");
          b.removeAttribute("data-active");
        });
        contents.forEach((c) => {
          c.classList.remove("active");
          c.removeAttribute("data-active");
        });

        // Activate current
        btn.classList.add("active");
        btn.setAttribute("data-active", "");

        const targetContent = wrapper.querySelector(
          `.tabs-tab-content[data-index="${targetIndex}"]`,
        );
        if (targetContent) {
          targetContent.classList.add("active");
          targetContent.setAttribute("data-active", "");
        }
      });
    });
  });

  // ==========================================================================
  // TOC Logic
  // ==========================================================================
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
      onScroll(); // Initial check
    }
  }
});
