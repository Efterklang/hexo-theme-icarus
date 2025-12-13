const { Component } = require('inferno');
const Article = require('./common/article');
const Widgets = require('./common/toc');

module.exports = class extends Component {
    render() {
        const { config, page, helper } = this.props;

        return (
            <>
                <Article config={config} page={page} helper={helper} index={false} />
                <Widgets {...this.props} />
            </>
        );
    }
};
