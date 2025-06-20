const { Component, view, logger, loadComponent, handleWidgetError } = require('../../include/util/common');

module.exports = class extends Component {
    render() {
        const { config, helper } = this.props;
        const { __ } = helper;
        const { donates = [] } = config;
        if (!Array.isArray(donates) || !donates.length) {
            return null;
        }
        return <div class="card">
            <div class="card-content">
                <h3 class="menu-label has-text-centered">{__('donate.title')}</h3>
                <div class="buttons is-centered">
                    {donates.map(service => {
                        const type = service.type;
                        if (typeof type === 'string') {
                            const Donate = loadComponent('donate/' + type);
                            if (!Donate) {
                                handleWidgetError(`donate button "${type}"`);
                                return null;
                            }
                            return <Donate helper={helper} donate={service} />;
                        }
                        return null;
                    })}
                </div>
            </div>
        </div>;
    }
};
