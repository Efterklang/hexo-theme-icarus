const { Component, cacheComponent } = require('../../include/util/common');

class Footer extends Component {
    render() {
        const {
            siteTitle,
            siteYear,
            author,
            links,
            subdomains,
            archives,
            copyright,
            showVisitorCounter,
            visitorCounterTitle,
            ICPRecord
        } = this.props;
        return <footer class="footer">
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-column footer-brand">
                        <p class="footer-title">{author || siteTitle}</p>
                        <p class="footer-meta is-size-7">
                            <span dangerouslySetInnerHTML={{ __html: `&copy; ${siteYear} ${author || siteTitle}` }}></span>
                            &nbsp;Powered by Hexo&nbsp;& <a href="https://github.com/Efterklang/hexo-theme-icarus" target="_blank" rel="noopener">Icarus</a>
                            {showVisitorCounter ? <><br /><span id="busuanzi_container_site_uv" dangerouslySetInnerHTML={{ __html: visitorCounterTitle }}></span></> : null}
                            {/* 备案 */}
                            {ICPRecord ? <><br /><a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener" dangerouslySetInnerHTML={{ __html: ICPRecord }}></a></> : null}
                        </p>
                        {copyright ? <p class="footer-meta" dangerouslySetInnerHTML={{ __html: copyright }}></p> : null}
                    </div>
                    <div class="footer-column footer-social">
                        <p class="footer-heading">Social Media</p>
                        <div class="footer-links">
                            {Object.keys(links).length ? Object.keys(links).map(name => {
                                const link = links[name];
                                return <a class="footer-link" target="_blank" rel="noopener" title={name} href={link.url}>
                                    {link.icon ? <iconify-icon icon={link.icon}></iconify-icon> : name}
                                </a>;
                            }) : null}
                        </div>
                    </div>
                    <div class="footer-column footer-subdomains">
                        <p class="footer-heading">Sub Domains</p>
                        <div class="footer-links">
                            {Object.keys(subdomains).length ? Object.keys(subdomains).map(name => {
                                const link = subdomains[name];
                                return <a class="footer-link" target="_blank" rel="noopener" title={name} href={link.url}>{name}</a>;
                            }) : null}
                        </div>
                    </div>
                    <div class="footer-column footer-archives">
                        <p class="footer-heading">Archives</p>
                        <div class="footer-archive-list">
                            {archives && archives.length ? archives.map(item => (
                                <span class="footer-archive-pill">
                                    <a class="footer-link" href={item.url}>{item.year}</a>
                                </span>
                            )) : null}
                        </div>
                    </div>
                </div>
            </div>
        </footer>;
    }
}

module.exports = cacheComponent(Footer, 'common.footer', props => {
    const { config, helper, site } = props;
    const { url_for, _p, date } = helper;
    const { title, author, footer, plugins } = config;


    const links = {};
    if (footer && footer.links) {
        Object.keys(footer.links).forEach(name => {
            const link = footer.links[name];
            links[name] = {
                url: url_for(typeof link === 'string' ? link : link.url),
                icon: link.icon
            };
        });
    }

    const subdomains = {};
    if (footer && footer.subdomains) {
        Object.keys(footer.subdomains).forEach(name => {
            const link = footer.subdomains[name];
            const targetUrl = typeof link === 'string' ? link : link.url;
            subdomains[name] = {
                url: url_for(targetUrl)
            };
        });
    }

    // Build archives grouped by year from site posts
    let archives = [];
    if (site && site.posts && site.posts.length) {
        const archiveDir = config.archive_dir || 'archives';
        const byYear = {};
        const posts = site.posts.sort('date', -1);

        posts.forEach(post => {
            let d = post.date.clone();
            if (config.timezone) {
                d = d.tz(config.timezone);
            }
            const year = d.year();
            byYear[year] = (byYear[year] || 0) + 1;
        });

        archives = Object.keys(byYear)
            .sort((a, b) => Number(b) - Number(a))
            .map(year => ({ year, url: url_for(`${archiveDir}/${year}/`) }));
    }

    return {
        siteUrl: url_for('/'),
        siteTitle: title,
        siteYear: date(new Date(), 'YYYY'),
        author,
        links,
        subdomains,
        archives,
        copyright: footer?.copyright ?? '',
        showVisitorCounter: plugins && plugins.busuanzi === true,
        visitorCounterTitle: _p('plugin.visitor_count', '<span id="busuanzi_value_site_uv">0</span>'),
        ICPRecord: footer?.ICPRecord || ''
    };
});
