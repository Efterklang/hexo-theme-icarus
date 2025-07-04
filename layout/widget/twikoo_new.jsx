const { Component } = require('inferno');
const { cacheComponent } = require('hexo-component-inferno/lib/util/cache');

class TwikooNew extends Component {
  render() {
    const { envId } = this.props;
    const js = `window.twikooEnvId = '${envId}';`;
    return (
      <div class="card widget" id="twikoo-new">
        <div class="card-content">
          <div class="menu">
            <h3 class="menu-label">RECENT COMMENT</h3>
            <script dangerouslySetInnerHTML={{ __html: js }}></script>
            <div class="twikoo-new-container"></div>
          </div>
        </div>
      </div>
    );
  }
}

TwikooNew.Cacheable = cacheComponent(TwikooNew, 'widget.twikoonew', (props) => {
  const { widget } = props;

  return {
    envId: widget.env_id,
  };
});

module.exports = TwikooNew;
