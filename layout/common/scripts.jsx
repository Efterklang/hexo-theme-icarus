const { Component, Fragment } = require('inferno');
const { toMomentLocale } = require('hexo/dist/plugins/helper/date');
const Plugins = require('./plugins');

module.exports = class extends Component {
    render() {
        const { site, config, helper, page } = this.props;
        const { url_for, cdn } = helper;
        const language = toMomentLocale(page.lang || page.language || config.language || 'en');

        return <Fragment>
            <script defer src={cdn('jquery', '3.3.1', 'dist/jquery.min.js')}></script>
            <script defer src={cdn('moment', '2.22.2', 'min/moment-with-locales.min.js')} onload={`moment.locale("${language}");`}></script>
            {config.comment?.js_url && <script defer src={config.comment.js_url}></script>}
            <script async data-pjax src={url_for('/js/column.js')}></script>
            <Plugins site={site} config={config} page={page} helper={helper} head={false} />
            <script defer data-pjax src={url_for('/js/main.js')} ></script>
        </Fragment>;
    }
};
