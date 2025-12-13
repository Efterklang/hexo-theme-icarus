const { Component, Fragment } = require('inferno');
const Plugins = require('./plugins');

module.exports = class extends Component {
    render() {
        const { site, config, helper, page } = this.props;
        const { url_for, cdn } = helper;

        return <Fragment>
            <script defer src={cdn('jquery', '3.3.1', 'dist/jquery.min.js')}></script>
            {config.comment?.js_url && <script defer src={config.comment.js_url}></script>}
            <Plugins site={site} config={config} page={page} helper={helper} head={false} />
            <script defer data-pjax src={url_for('/js/main.js')} ></script>
        </Fragment>;
    }
};
