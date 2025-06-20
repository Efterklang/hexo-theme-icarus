const { Component, view, logger, loadComponent, handleWidgetError } = require('../../include/util/common');

module.exports = class extends Component {
    render() {
        const { config, page, helper } = this.props;
        const { __ } = helper;
        const { comment } = config;
        if (!comment || typeof comment.type !== 'string') {
            return null;
        }

        return <div class="card" id="comments">
            <div class="card-content">
                <h3 class="title is-5">{__('article.comments')}</h3>
                {(() => {
                    const Comment = loadComponent('comment/' + comment.type);
                    if (!Comment) {
                        handleWidgetError(`comment "${comment.type}"`);
                        return null;
                    }
                    return <Comment config={config} page={page} helper={helper} comment={comment} />;
                })()}
            </div>
        </div>;
    }
};
