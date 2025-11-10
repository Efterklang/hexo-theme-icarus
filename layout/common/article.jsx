const moment = require('moment');
const { Component, Fragment } = require('inferno');
const { toMomentLocale } = require('hexo/dist/plugins/helper/date');
const Share = require('./share');
const Comment = require('./comment');
const ArticleLicensing = require('hexo-component-inferno/lib/view/misc/article_licensing');

/**
 * Get the word count of text.
 */
function getWordCount(content) {
    if (typeof content === 'undefined') {
        return 0;
    }
    content = content.replace(/<\/?[a-z][^>]*>/gi, '');
    content = content.trim();
    return content ? (content.match(/[\u00ff-\uffff]|[a-zA-Z]+/g) || []).length : 0;
}

module.exports = class extends Component {
    render() {
        // index: true if in article list, false if in article page
        const { config, helper, page, index } = this.props;
        // const useResponsiveImages = process.env.RESPONSIVE_IMAGES === 'true';
        const useResponsiveImages = true;
        const { article, plugins } = config;
        const { url_for, date, date_xml, __, _p } = helper;

        const defaultLanguage = Array.isArray(config.language) && config.language.length ? config.language[0] : config.language;

        const indexLanguage = toMomentLocale(defaultLanguage || 'en');
        const language = toMomentLocale(page.lang || page.language || defaultLanguage || 'en');
        const cover = page.cover ? url_for(page.cover) : null;
        const updateTime = article && article.update_time !== undefined ? article.update_time : true;
        const isUpdated = page.updated && !moment(page.date).isSame(moment(page.updated));
        const shouldShowUpdated = page.updated && ((updateTime === 'auto' && isUpdated) || updateTime === true);

        return <Fragment>
            {/* Main content */}
            <div class="card">
                {/* Cover image */}
                {cover ? (() => {
                    const imageSrcset = useResponsiveImages ? `${cover}?w=128 128w, ${cover}?w=256 256w, ${cover}?w=800 800w, ${cover}?w=1500 1500w, ${cover}?w=2000 2000w, ${cover}?fmt=avif 6144w` : null;
                    const imageSizes = useResponsiveImages ? '(max-width: 768px) 100vw, 50vw' : null;
                    const coverLQIP = <img class="cover-lqip" alt="lqip" src={`${cover}?q=10&blur=25`} fetchpriority="high" />;
                    const CoverImage = <img class="fill" src={cover} alt={page.title || cover} onLoad={"this.classList.add('loaded')"} srcset={imageSrcset} sizes={imageSizes} referrerpolicy="no-referrer" />;
                    return <div class="card-image">
                        {index ? <a href={url_for(page.link || page.path)} class="image is-7by3">
                            {CoverImage}
                            {coverLQIP}
                        </a> : <span class="image is-7by3">
                            {CoverImage}
                            {coverLQIP}
                        </span>}
                    </div>;
                })() : null}
                <article class={`card-content article${'direction' in page ? ' ' + page.direction : ''}`} role="article">
                    {/* Metadata */}
                    {page.layout !== 'page' ? <div class="article-meta is-size-7 is-uppercase level is-mobile">
                        <div class="level-left">
                            {/* PIN Icon */}
                            {page.top ? <i class="fas fa-thumbtack level-item" title="Pinned"></i> : null}
                            {/* Creation Date */}
                            {page.date && <span class="level-item" dangerouslySetInnerHTML={{
                                __html: _p('article.created_at', `<time dateTime="${date_xml(page.date)}" title="${new Date(page.date).toLocaleString()}">${date(page.date)}</time>`)
                            }}></span>}
                            {/* Last Update Date */}
                            {shouldShowUpdated && <span class="level-item" dangerouslySetInnerHTML={{
                                __html: _p('article.updated_at', `<time dateTime="${date_xml(page.updated)}" title="${new Date(page.updated).toLocaleString()}">${date(page.updated)}</time>`)
                            }}></span>}
                            {/* author */}
                            {page.author ? <span class="level-item"> {page.author} </span> : null}
                            {/* Categories */}
                            {page.categories && page.categories.length ? <span class="level-item">
                                {(() => {
                                    const categories = [];
                                    page.categories.forEach((category, i) => {
                                        categories.push(<a class="link-muted" href={url_for(category.path)}>{category.name}</a>);
                                        if (i < page.categories.length - 1) {
                                            categories.push(<span>&nbsp;/&nbsp;</span>);
                                        }
                                    });
                                    return categories;
                                })()}
                            </span> : null}
                            {/* Read time */}
                            {article && article.readtime && article.readtime === true ? <span class="level-item">
                                {(() => {
                                    const words = getWordCount(page._content);
                                    const time = moment.duration((words / 150.0) * 60, 'seconds');
                                    return `${_p('article.read_time', time.locale(index ? indexLanguage : language).humanize())} (${_p('article.word_count', words)})`;
                                })()}
                            </span> : null}
                            {/* Visitor counter */}
                            {!index ? <span id={url_for(page.link || page.path)} class="level-item leancloud_visitors" data-flag-title={page.title} dangerouslySetInnerHTML={{
                                __html: _p('plugin.visit_count', '&nbsp;&nbsp;<span id="twikoo_visitors"><i class="fa fa-spinner fa-spin"></i></span>')
                            }}></span> : null}
                        </div>
                    </div> : null}
                    {/* Title */}
                    {page.title !== '' && index ? <p class="title is-3 is-size-4-mobile"><a class="link-muted" href={url_for(page.link || page.path)}>{page.title}</a></p> : null}
                    {page.title !== '' && !index ? <h1 class="title is-3 is-size-4-mobile">{page.title}</h1> : null}
                    {/* Content/Excerpt */}
                    <div class="content" dangerouslySetInnerHTML={{ __html: index && page.excerpt ? page.excerpt : page.content }}></div>
                    {/* Licensing block */}
                    {!index && article && article.licenses && Object.keys(article.licenses)
                        ? <ArticleLicensing.Cacheable page={page} config={config} helper={helper} /> : null}
                    {/* Tags */}
                    {!index && page.tags && page.tags.length ? <div class="article-tags">
                        {page.tags.map(tag => {
                            return <a class="tags has-addons mr-2" rel="tag" href={url_for(tag.path)}>
                                <span class="tag">{tag.name}</span>
                                <span class="tag">{tag.length}</span>
                            </a>;
                        })}
                    </div> : null}
                    {/* "Read more" button */}
                    {/* {index && page.excerpt ? <a class="article-more button is-small is-size-7" href={`${url_for(page.link || page.path)}#more`}>{__('article.more')}</a> : null} */}
                    {/* Share button */}
                    {!index ? <Share config={config} page={page} helper={helper} /> : null}
                </article>
            </div>
            {/* Post navigation */}
            {!index && (page.prev || page.next) ? <nav class="post-navigation level is-mobile card-content pl-0 pr-0 pb-0">
                {page.prev ?
                    <a class={`article-nav-prev level level-item${!page.prev ? ' is-hidden-mobile' : ''} link-muted`} href={url_for(page.prev.path)}>
                        <i class="fas fa-chevron-left pr-4"></i>{page.prev.title}
                    </a>
                    : null}
                {page.next ?
                    <a class={`article-nav-next level level-item${!page.next ? ' is-hidden-mobile' : ''} link-muted`} href={url_for(page.next.path)}>
                        {page.next.title}<i class="fas fa-chevron-right pl-2"></i>
                    </a>
                    : null}
            </nav> : null}
            {/* Comment */}
            {!index ? <Comment config={config} page={page} helper={helper} /> : null}
        </Fragment>;
    }
};
