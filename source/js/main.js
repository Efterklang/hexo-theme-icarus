/* eslint-disable node/no-unsupported-features/node-builtins */

(function ($) {
    // lightGallery initialization
    if (typeof $.fn.lightGallery === 'function') {
        $('.article').lightGallery({ selector: '.gallery-item' });
    }

    // justifiedGallery initialization
    if (typeof $.fn.justifiedGallery === 'function') {
        if ($('.justified-gallery > p > .gallery-item').length) {
            $('.justified-gallery > p > .gallery-item').unwrap();
        }
        $('.justified-gallery').justifiedGallery();
    }

    // Keyboard shortcuts handler
    document.onkeydown = function (e) {
        // https://javascript.info/keyboard-events
        // ctrl/cmd + k for search
        if ((e.ctrlKey || e.metaKey) && e.code == "KeyK") {
            document.querySelector("a.navbar-item.search").click();
            setTimeout(() => {
                document.querySelector('.searchbox-input').focus();
            }, 100);
            e.preventDefault();
        } else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code == "KeyP") { // ctrl/cmd + shift + p for theme selector
            document.querySelector("a.navbar-item.theme-selector-trigger").click();
        }
    };

    // Table overflow wrapper for wide tables
    $('.article > .content > table').each(function () {
        if ($(this).width() > $(this).parent().width()) {
            $(this).wrap('<div class="table-overflow"></div>');
        }
    });

    // DOM ready initializations
    document.addEventListener("DOMContentLoaded", function () {

        // Initialize medium-zoom
        mediumZoom('.article img', {
            background: 'rgba(30, 30, 46, 0.5)',
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
    const $toc = $('#toc');
    if ($toc.length > 0) {
        const $mask = $('<div>');
        $mask.attr('id', 'toc-mask');
        $('body').append($mask);

        function toggleToc() { // eslint-disable-line no-inner-declarations
            $toc.toggleClass('is-active');
            $mask.toggleClass('is-active');
        }

        $toc.on('click', toggleToc);
        $mask.on('click', toggleToc);
        $('.navbar-main .catalogue').on('click', toggleToc);
    }

    // Navbar burger - use event delegation on document for PJAX compatibility
    $(document).off('click.navburger').on('click.navburger', '.navbar-burger', function () {
        $(this).toggleClass('is-active');
        $('.navbar-menu').toggleClass('is-active');
    });

    // Close navbar menu when a navbar item is clicked - use event delegation
    $(document).off('click.navmenu').on('click.navmenu', '.navbar-menu a.navbar-item', function () {
        if ($('.navbar-burger').hasClass('is-active')) {
            $('.navbar-burger').removeClass('is-active');
            $('.navbar-menu').removeClass('is-active');
        }
    });

}(jQuery));
