/* eslint-disable node/no-unsupported-features/node-builtins */

(($) => {
  // Keyboard shortcuts handler
  document.onkeydown = (e) => {
    // https://javascript.info/keyboard-events
    // ctrl/cmd + k for search
    if ((e.ctrlKey || e.metaKey) && e.code === "KeyK") {
      document.querySelector("a.navbar-item.search").click();
      setTimeout(() => {
        document.querySelector(".searchbox-input").focus();
      }, 100);
      e.preventDefault();
    } else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === "KeyP") {
      // ctrl/cmd + shift + p for theme selector
      document.querySelector("a.navbar-item.theme-selector-trigger").click();
    }
  };

  // Table overflow wrapper for wide tables
  $(".article > .content > table").each(function () {
    if ($(this).width() > $(this).parent().width()) {
      $(this).wrap('<div class="table-overflow"></div>');
    }
  });

  // DOM ready initializations
  document.addEventListener("DOMContentLoaded", () => {
    // Initialize medium-zoom
    mediumZoom(".article img", {
      background: "rgba(30, 30, 46, 0.5)",
    });

    // ========== 新增：向上滚动时显示/隐藏导航栏 ==========
    // const navbar = document.querySelector('.navbar-main');
    // if (!navbar) return; // 如果没有导航栏，则不执行

    // let lastScrollTop = 0; // 记录上一次滚动的位置

    // window.addEventListener("scroll", function() {
    //     let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    //     // 向下滚动时，隐藏导航栏
    //     if (scrollTop > lastScrollTop) {
    //         navbar.classList.add('navbar--hidden');
    //     } else { // 向上滚动时，显示导航栏
    //         navbar.classList.remove('navbar--hidden');
    //     }

    //     // 更新滚动位置 (处理 iOS 弹性滚动)
    //     lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    // }, false);
  });

  // TOC (Table of Contents) toggle logic
  const $toc = $("#toc");
  if ($toc.length > 0) {
    const $mask = $("<div>");
    $mask.attr("id", "toc-mask");
    $("body").append($mask);

    function toggleToc() {
      // eslint-disable-line no-inner-declarations
      $toc.toggleClass("is-active");
      $mask.toggleClass("is-active");
    }

    $toc.on("click", toggleToc);
    $mask.on("click", toggleToc);
    $(".navbar-main .catalogue").on("click", toggleToc);
  }

  // Navbar burger - use event delegation on document for PJAX compatibility
  $(document)
    .off("click.navburger")
    .on("click.navburger", ".navbar-burger", function () {
      $(this).toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
    });

  // Close navbar menu when a navbar item is clicked - use event delegation
  $(document)
    .off("click.navmenu")
    .on("click.navmenu", ".navbar-menu a.navbar-item", () => {
      if ($(".navbar-burger").hasClass("is-active")) {
        $(".navbar-burger").removeClass("is-active");
        $(".navbar-menu").removeClass("is-active");
      }
    });
  // Set it up for all my homies (multiple tabs)
  document.addEventListener("DOMContentLoaded", () => {
    // 获取所有 Tab 组件的包裹容器，支持页面存在多个组件
    const tabWrappers = document.querySelectorAll(".tabs-tabs-wrapper");

    tabWrappers.forEach((wrapper) => {
      // 在当前组件范围内查找元素
      const buttons = wrapper.querySelectorAll(".tabs-tab-button");
      const contents = wrapper.querySelectorAll(".tabs-tab-content");

      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          // 1. 获取当前点击按钮的目标索引
          const targetIndex = btn.getAttribute("data-tab");
          // 2. 重置所有按钮和内容的状态
          // 移除 active 类和 data-active 属性
          buttons.forEach((b) => {
            b.classList.remove("active");
            b.removeAttribute("data-active");
          });
          contents.forEach((c) => {
            c.classList.remove("active");
            c.removeAttribute("data-active");
          });

          // 3. 激活当前点击的按钮
          btn.classList.add("active");
          btn.setAttribute("data-active", "");

          // 4. 激活对应的内容区域
          // 根据 data-index 属性查找匹配的内容 div
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
  });

  // New TOC Logic
  document.addEventListener("DOMContentLoaded", () => {
    const tocContainer = document.getElementById("icarus-toc-container");
    if (!tocContainer) return;
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

    // Close when clicking the backdrop (tocBody)
    if (tocBody) {
      tocBody.addEventListener("click", (e) => {
        if (e.target === tocBody) {
          tocContainer.classList.remove("is-open");
        }
      });
    }

    // Desktop Scroll Spy
    const headers = [];
    tocLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const id = decodeURIComponent(href.replace(/^#/, ""));
      const header = document.getElementById(id);
      if (header) {
        headers.push({ header, link });
      }
    });

    if (headers.length > 0) {
      function onScroll() {
        const viewportHeight = window.innerHeight;
        let currentHeader = null;

        // Find the last header that is above the middle of the screen
        for (const h of headers) {
          const rect = h.header.getBoundingClientRect();
          if (rect.top < viewportHeight / 2) {
            currentHeader = h;
          } else {
            break;
          }
        }

        // If no header is above middle, maybe we are at the top?
        if (!currentHeader && headers.length > 0 && window.scrollY < 100) {
          currentHeader = headers[0];
        }

        for (const l of tocLinks) {
          l.closest(".toc-item").classList.remove("is-active");
        }

        if (currentHeader) {
          currentHeader.link.closest(".toc-item").classList.add("is-active");
        }
      }

      window.addEventListener("scroll", onScroll);
      onScroll(); // Initial check
    }
  });
})(jQuery);
