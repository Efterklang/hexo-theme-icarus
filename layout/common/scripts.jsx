const { Component, Fragment } = require('inferno');
const { toMomentLocale } = require('hexo/dist/plugins/helper/date');
const Plugins = require('./plugins');

module.exports = class extends Component {
    render() {
        const { site, config, helper, page } = this.props;
        const { url_for, cdn } = helper;
        const language = toMomentLocale(page.lang || page.language || config.language || 'en');

        return <Fragment>
            <script src={cdn('jquery', '3.3.1', 'dist/jquery.min.js')}></script>
            <script src={cdn('moment', '2.22.2', 'min/moment-with-locales.min.js')}></script>
            {config.comment?.js_url && <script src={config.comment.js_url}></script>}
            <script dangerouslySetInnerHTML={{ __html: `moment.locale("${language}");` }}></script>
            <script data-pjax src={url_for('/js/column.js')}></script>
            <Plugins site={site} config={config} page={page} helper={helper} head={false} />
            <script data-pjax src={url_for('/js/main.js')} defer></script>
        </Fragment>;
    }
};
