/**
 * Google Analytics plugin JSX component.
 * @module view/plugin/google_analytics
 */
const { Component } = require('inferno');
const { cacheComponent } = require('../../util/cache');

/**
 * Google Analytics plugin JSX component.
 *
 * @see https://developers.google.com/tag-platform/tag-manager/web
 * @example
 * <GoogleAnalytics trackingId="GTM-******" head={true} />
 * <GoogleAnalytics trackingId="GTM-******" head={false} />
 */
class GoogleAnalytics extends Component {
  render() {
    const { trackingId, head } = this.props;

    if (head) {
      const js = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${trackingId}');`;
      return <script dangerouslySetInnerHTML={{ __html: js }}></script>;
    }

    return (
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${trackingId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        }}></noscript>
    );
  }
}

/**
 * Cacheable Google Analytics plugin JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @example
 * <GoogleAnalytics.Cacheable
 *     head={true}
 *     plugin={{ tracking_id: '*******' }} />
 */
GoogleAnalytics.Cacheable = cacheComponent(GoogleAnalytics, 'plugin.google_tag_manager', (props) => {
  const { head, plugin } = props;
  if (!plugin || !plugin.tracking_id) {
    return null;
  }
  return {
    trackingId: plugin.tracking_id,
    head: Boolean(head),
  };
});

module.exports = GoogleAnalytics;
