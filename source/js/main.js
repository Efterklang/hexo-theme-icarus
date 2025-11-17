/* eslint-disable node/no-unsupported-features/node-builtins */
(function ($) {
    if (typeof $.fn.lightGallery === 'function') {
        $('.article').lightGallery({ selector: '.gallery-item' });
    }
    if (typeof $.fn.justifiedGallery === 'function') {
        if ($('.justified-gallery > p > .gallery-item').length) {
            $('.justified-gallery > p > .gallery-item').unwrap();
        }
        $('.justified-gallery').justifiedGallery();
    }

    document.onkeydown = function (e) {
        // https://javascript.info/keyboard-events
        // ctrl/cmd + k
        if ((e.ctrlKey || e.metaKey) && e.code == "KeyK") {
            document.querySelector("a.navbar-item.search").click();
            setTimeout(() => {
                document.querySelector('.searchbox-input').focus();
            }, 100);
            e.preventDefault();
        } else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code == "KeyP") { // ctrl/cmd shift p
            document.querySelector("a.navbar-item.theme-selector-trigger").click();
        }
    };

    $('.article > .content > table').each(function () {
        if ($(this).width() > $(this).parent().width()) {
            $(this).wrap('<div class="table-overflow"></div>');
        }
    });

    function adjustNavbar() {
        const navbarWidth = $('.navbar-main .navbar-start').outerWidth() + $('.navbar-main .navbar-end').outerWidth();
        if ($(document).outerWidth() < navbarWidth) {
            $('.navbar-main .navbar-menu').addClass('justify-content-start');
        } else {
            $('.navbar-main .navbar-menu').removeClass('justify-content-start');
        }
    }
    adjustNavbar();
    $(window).resize(adjustNavbar);

    document.addEventListener("DOMContentLoaded", function () {
        mediumZoom('.article img', {
            background: 'rgba(30, 30, 46, 0.5)',
        });
    });

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
}(jQuery));
