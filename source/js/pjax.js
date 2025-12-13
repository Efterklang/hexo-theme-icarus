(() => {
  // eslint-disable-next-line no-unused-vars
  let pjax;

  function initPjax() {
    try {
      const Pjax = window.Pjax || (() => {});
      pjax = new Pjax({
        selectors: [
          "[data-pjax]",
          ".pjax-reload",
          "head title",
          ".main-content",
          ".navbar-start",
          ".navbar-end",
          ".searchbox link",
          ".searchbox script",
          "#back-to-top",
          "#comments link",
          "#comments script",
        ],
        cacheBust: false,
      });
    } catch (e) {
      console.warn("PJAX error: " + e);
    }
  }

  document.addEventListener("pjax:complete", () => {
    // Plugin [Busuanzi] reload logic
    if (window.bszCaller && window.bszTag) {
      window.bszCaller.fetch(
        "//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback",
        (a) => {
          window.bszTag.texts(a);
          window.bszTag.shows();
        },
      );
    }
    mediumZoom(".article img", {
      background: "hsla(from var(--mantle) / 0.9)",
    });
  });

  document.addEventListener("DOMContentLoaded", () => initPjax());
})();
