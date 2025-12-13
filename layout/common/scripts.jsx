const { Component, Fragment } = require("inferno");
const Plugins = require("./plugins");

module.exports = class extends Component {
  render() {
    const { site, config, helper, page } = this.props;
    const { url_for, cdn } = helper;

    return (
      <Fragment>
        <script
          defer
          src={cdn("jquery", "3.3.1", "dist/jquery.min.js")}
        ></script>
        {config.comment?.js_url && (
          <script defer src={config.comment.js_url}></script>
        )}
        <Plugins
          site={site}
          config={config}
          page={page}
          helper={helper}
          head={false}
        />
        <script defer data-pjax src={url_for("/js/main.js")}></script>
        <script
          src="/js/host/medium-zoom/dist/medium-zoom.min.js"
          defer
        ></script>
        <script src="/js/instant-page.min.js" type="module">
          {" "}
        </script>
        {config.plugins.live2d_Asoul && (
          <>
            <script src="/js/live2d_Asoul/TweenLite.js" defer></script>
            <script
              src="/js/live2d_Asoul/live2dcubismcore.min.js"
              defer
            ></script>
            <script src="/js/live2d_Asoul/pixi.min.js" defer></script>
            <script src="/js/live2d_Asoul/cubism4.min.js" defer></script>
            <script src="/js/live2d_Asoul/pio.js" defer></script>
            <script src="/js/live2d_Asoul/pio_sdk4.js" defer></script>
            <script src="/js/live2d_Asoul/load.js" defer></script>
            <link
              href="/js/live2d_Asoul/pio.css"
              rel="stylesheet"
              type="text/css"
            />
          </>
        )}
      </Fragment>
    );
  }
};
