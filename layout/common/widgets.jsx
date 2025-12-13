const { Component } = require('../../include/util/common');

class FloatingToc extends Component {
    render() {
        const { helper, page } = this.props;
        const tocContent = helper.toc(page.content, {
            class: 'menu-list',
            list_number: false
        });

        if (!tocContent) {
            return null;
        }

        return (
            <div class="floating-toc-container">
                <div class="floating-toc-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.3rem" height="1.3rem" viewBox="0 0 512 512"><path fill="currentColor" d="M48 144a48 48 0 1 0 0-96a48 48 0 1 0 0 96m144-80c-17.7 0-32 14.3-32 32s14.3 32 32 32h288c17.7 0 32-14.3 32-32s-14.3-32-32-32zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32h288c17.7 0 32-14.3 32-32s-14.3-32-32-32zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32h288c17.7 0 32-14.3 32-32s-14.3-32-32-32zM48 464a48 48 0 1 0 0-96a48 48 0 1 0 0 96m48-208a48 48 0 1 0-96 0a48 48 0 1 0 96 0" /></svg>
                </div>
                <div class="card widget">
                    <div class="card-content">
                        <div class="menu">
                            <h3 class="menu-label">TOC</h3>
                            <div dangerouslySetInnerHTML={{ __html: tocContent }} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class Widgets extends Component {
    render() {
        const { site, config, helper, page } = this.props;
        const showToc = (page.toc !== false && config.toc !== false) && ['page', 'post'].includes(page.layout) && helper.toc(page.content);

        return <>
            {showToc ? <FloatingToc {...this.props} /> : null}
        </>;
    }
}

module.exports = Widgets;
