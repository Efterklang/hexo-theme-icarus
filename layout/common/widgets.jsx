const { Component, classname, loadComponent, handleWidgetError } = require('../../include/util/common');

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
                            <h3 class="menu-label">{helper.__('widget.catalogue')}</h3>
                            <div dangerouslySetInnerHTML={{ __html: tocContent }} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function formatWidgets(widgets) {
    const result = {};
    if (Array.isArray(widgets)) {
        widgets.filter(widget => typeof widget === 'object').forEach(widget => {
            if ('position' in widget && (widget.position === 'left' || widget.position === 'right')) {
                if (!(widget.position in result)) {
                    result[widget.position] = [widget];
                } else {
                    result[widget.position].push(widget);
                }
            }
        });
    }
    return result;
}

function hasColumn(widgets, position, config, page) {
    if (Array.isArray(widgets)) {
        return typeof widgets.find(widget => {
            // Exclude TOC from column calculation
            if (widget.type === 'toc') {
                return false;
            }
            return widget.position === position;
        }) !== 'undefined';
    }
    return false;
}

function getColumnCount(widgets, config, page) {
    return [hasColumn(widgets, 'left', config, page), hasColumn(widgets, 'right', config, page)].filter(v => !!v).length + 1;
}

function getColumnSizeClass(columnCount) {
    switch (columnCount) {
        case 2:
            return 'is-4-tablet is-4-desktop';
        case 3:
            return 'is-4-tablet is-4-desktop';
    }
    return '';
}

function getColumnOrderClass(position) {
    return position === 'left' ? 'order-1' : 'order-3';
}

function isColumnSticky(config, position) {
    return typeof config.sidebar === 'object'
        && position in config.sidebar
        && config.sidebar[position].sticky === true;
}

class Widgets extends Component {
    render() {
        const { site, config, helper, page, position } = this.props;
        const widgets = formatWidgets(config.widgets)[position] || [];
        const columnCount = getColumnCount(config.widgets, config, page);
        const showToc = (page.toc !== false && config.toc !== false) && ['page', 'post'].includes(page.layout) && helper.toc(page.content);

        const columnWidgets = widgets.filter(widget => widget.type !== 'toc');

        if (!columnWidgets.length && !(position === 'left' && showToc)) {
            return null;
        }

        return <>
            {showToc ? <FloatingToc {...this.props} /> : null}

            {columnWidgets.length ? <div class={classname({
                'column': true,
                ['column-' + position]: true,
                [getColumnSizeClass(columnCount)]: true,
                [getColumnOrderClass(position)]: true,
                'is-sticky': isColumnSticky(config, position)
            })}>
                {columnWidgets.map(widget => {
                    if (!widget.type) {
                        return null;
                    }
                    const Widget = loadComponent('widget/' + widget.type);
                    if (!Widget) {
                        handleWidgetError(widget.type);
                        return null;
                    }
                    return <Widget site={site} helper={helper} config={config} page={page} widget={widget} />;
                })}
                {position === 'left' && hasColumn(config.widgets, 'right', config, page) ? <div class={classname({
                    'column-right-shadow': true,
                    'is-hidden-widescreen': true,
                    'is-sticky': isColumnSticky(config, 'right')
                })}></div> : null}
            </div> : null}
        </>;
    }
}

Widgets.getColumnCount = getColumnCount;

module.exports = Widgets;
