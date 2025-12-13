!(() => {
  const t = ["site_pv", "site_uv", "page_pv", "page_uv"],
    e = document.currentScript,
    a = e.hasAttribute("pjax"),
    n = e.getAttribute("data-api") || "https://bsz.dusays.com:9001/api",
    o = "bsz-id",
    // 原始值设置
    originalValues = {
      site_pv: 12801, // page view
      site_uv: 2450, // unique visitor
      page_pv: 0,
      page_uv: 0,
    },
    s = () => {
      const e = new XMLHttpRequest();
      e.open("POST", n, !0);
      const a = localStorage.getItem(o);
      null != a && e.setRequestHeader("Authorization", "Bearer " + a),
        e.setRequestHeader("x-bsz-referer", window.location.href),
        (e.onreadystatechange = () => {
          if (4 === e.readyState && 200 === e.status) {
            const a = JSON.parse(e.responseText);
            if (!0 === a.success) {
              t.map((t) => {
                const e = document.getElementById(`busuanzi_${t}`);
                if (null != e) {
                  const finalValue =
                    (originalValues[t] || 0) + (a.data[t] || 0);
                  e.innerHTML = finalValue;
                }
                const n = document.getElementById(`busuanzi_container_${t}`);
                null != n && (n.style.display = "inline");
              });
              const n = e.getResponseHeader("Set-Bsz-Identity");
              null != n && "" != n && localStorage.setItem(o, n);
            }
          }
        }),
        e.send();
    };
  if ((s(), a)) {
    const t = window.history.pushState;
    (window.history.pushState = function () {
      t.apply(this, arguments), s();
    }),
      window.addEventListener(
        "popstate",
        (t) => {
          s();
        },
        !1,
      );
  }
})();
