const { Component, classname } = require('../include/util/common');
const Head = require('./common/head');
const Navbar = require('./common/navbar');
const Widgets = require('./common/widgets');
const Footer = require('./common/footer');
const Scripts = require('./common/scripts');
const Search = require('./common/search');

module.exports = class extends Component {
    render() {
        const { site, config, page, helper, body } = this.props;

        const language = page.lang || page.language || config.language;
        const columnCount = Widgets.getColumnCount(config.widgets, config, page);

        return <html lang={language ? language.substr(0, 2) : ''}>
            <Head site={site} config={config} helper={helper} page={page} />
            <body class={`is-${columnCount}-column`}>
                <script type="text/javascript" src="/js/night.js"></script>
                <canvas id="universe"></canvas>

                <Navbar config={config} helper={helper} page={page} />
                <section class="section">
                    <div class="container">
                        <div class="columns">
                            <div class={classname({
                                column: true,
                                'order-2': true,
                                'column-main': true,
                                'is-12': columnCount === 1,
                                // 'is-8-tablet is-8-desktop is-8-widescreen': columnCount === 2,
                                'is-8-tablet is-9-desktop is-9-widescreen': columnCount === 2,
                                'is-8-tablet is-8-desktop is-6-widescreen': columnCount === 3
                            })} dangerouslySetInnerHTML={{ __html: body }}></div>
                            {/* imaegoo fix: 防止左边栏已加载，右边栏未加载时，内容区不居中的问题，注意禁止用 js 解决，用两组 style 来控制它们加载完成后再显示 */}
                            <style dangerouslySetInnerHTML={{ __html: '.column.column-left,.column.column-right{display:none}' }}></style>
                            <Widgets site={site} config={config} helper={helper} page={page} position={'left'} />
                            <Widgets site={site} config={config} helper={helper} page={page} position={'right'} />
                            {/* imaegoo fix: 到这里时 widgets 已经加载完毕，显示 widgets */}
                            <style dangerouslySetInnerHTML={{ __html: '.column.column-left,.column.column-right{display:block}' }}></style>
                        </div>
                    </div>
                </section>
                <Footer config={config} helper={helper} />
                <Scripts site={site} config={config} helper={helper} page={page} />
                <Search config={config} helper={helper} />

                <script type="text/javascript" src="/js/imaegoo/imaegoo.js"></script>
                <script type="text/javascript" src="/js/imaegoo/universe.js"></script>
                {/* live2d_Asoul */}
                <script src="https://cdn.jsdelivr.net/npm/medium-zoom@latest/dist/medium-zoom.min.js"></script>
                <script src="/js/live2d_Asoul/TweenLite.js" defer></script>
                <script src="/js/live2d_Asoul/live2dcubismcore.min.js" defer></script>
                <script src="/js/live2d_Asoul/pixi.min.js" defer></script>
                <script src="/js/live2d_Asoul/cubism4.min.js" defer></script>
                <script src="/js/live2d_Asoul/pio.js" defer></script>
                <script src="/js/live2d_Asoul/pio_sdk4.js" defer></script>
                <script src="/js/live2d_Asoul/load.js" defer></script>
                <link href="/js/live2d_Asoul/pio.css" rel="stylesheet" type="text/css" />
                {/* tianli_gpt */}
                {/* <link rel="stylesheet" href="https://cdn1.tianli0.top/gh/zhheo/Post-Abstract-AI@0.15.2/tianli_gpt.css"></link>
                <script let tianliGPT_postSelector='.article>.content'></script>
                <script let tianliGPT_key='5Q5mpqRK5DkwT1X9Gi5e'></script>
                <script src={url_for('https://cdn1.tianli0.top/gh/zhheo/Post-Abstract-AI@0.15.2/tianli_gpt.min.js')} defer></script> */}
            </body>
        </html >;
    }
};
