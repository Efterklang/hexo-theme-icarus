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

        return <html lang={language ? language.substr(0, 5) : ''}>
            <Head site={site} config={config} helper={helper} page={page} />
            <body class={`is-${columnCount}-column`}>


                <script type="text/javascript" src="/js/theme-selector.js"></script>
                {config.plugins.universe && <>
                    <canvas id="universe"></canvas>
                    <script type="text/javascript" src="/js/imaegoo/universe.js"></script>
                </>}


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
                <div _ngcontent-gid-c24="" class="squiggle"><svg _ngcontent-gid-c24="" aria-hidden="true" width="100%" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><pattern _ngcontent-gid-c24="" id="a" width="91" height="8" patternUnits="userSpaceOnUse"><g _ngcontent-gid-c24="" clip-path="url(#clip0_2426_11367)"><path _ngcontent-gid-c24="" d="M114 4c-5.067 4.667-10.133 4.667-15.2 0S88.667-.667 83.6 4 73.467 8.667 68.4 4 58.267-.667 53.2 4 43.067 8.667 38 4 27.867-.667 22.8 4 12.667 8.667 7.6 4-2.533-.667-7.6 4s-10.133 4.667-15.2 0S-32.933-.667-38 4s-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0" stroke="var(--lavender)" stroke-linecap="square"></path></g></pattern><rect _ngcontent-gid-c24="" width="100%" height="100%" fill="url(#a)"></rect></svg></div>
                <Footer config={config} helper={helper} />
                <Scripts site={site} config={config} helper={helper} page={page} />
                <Search config={config} helper={helper} />

                <script type="text/javascript" src="/js/imaegoo/imaegoo.js" defer></script>
                <script src="/js/host/medium-zoom/dist/medium-zoom.min.js" defer></script>
                {
                    config.plugins.live2d_Asoul && <>
                        <script src="/js/live2d_Asoul/TweenLite.js" defer></script>
                        <script src="/js/live2d_Asoul/live2dcubismcore.min.js" defer></script>
                        <script src="/js/live2d_Asoul/pixi.min.js" defer></script>
                        <script src="/js/live2d_Asoul/cubism4.min.js" defer></script>
                        <script src="/js/live2d_Asoul/pio.js" defer></script>
                        <script src="/js/live2d_Asoul/pio_sdk4.js" defer></script>
                        <script src="/js/live2d_Asoul/load.js" defer></script>
                        <link href="/js/live2d_Asoul/pio.css" rel="stylesheet" type="text/css" />
                    </>
                }
                {/* tianli_gpt */}
                {/* <link rel="stylesheet" href="https://cdn1.tianli0.top/gh/zhheo/Post-Abstract-AI@0.15.2/tianli_gpt.css"></link>
                <script let tianliGPT_postSelector='.article>.content'></script>
                <script let tianliGPT_key='5Q5mpqRK5DkwT1X9Gi5e'></script>
                <script src={url_for('https://cdn1.tianli0.top/gh/zhheo/Post-Abstract-AI@0.15.2/tianli_gpt.min.js')} defer></script> */}
            </body>
        </html >;
    }
};
