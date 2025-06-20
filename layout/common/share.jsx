const { Component, view, logger, loadComponent, handleWidgetError } = require('../../include/util/common');

module.exports = class extends Component {
    render() {
        const { config, page, helper } = this.props;
        const { share } = config;
        if (!share || typeof share.type !== 'string') {
            return null;
        }

        const Share = loadComponent('share/' + share.type);
        if (!Share) {
            handleWidgetError(`share button "${share.type}"`);
            return null;
        }
        return <Share config={config} page={page} helper={helper} share={share} />;
    }
};
