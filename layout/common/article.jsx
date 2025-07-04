const moment = require('moment');
const { Component, Fragment } = require('inferno');
const { toMomentLocale } = require('hexo/dist/plugins/helper/date');
const Share = require('./share');
const Donates = require('./donates');
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
        const { config, helper, page, index } = this.props;
        const useResponsiveImages = process.env.RESPONSIVE_IMAGES === 'true';
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
                    const imageSrcset = useResponsiveImages ? `${cover.replace(/\.(webp|jpg|jpeg|png)$/, '-128w.$1')} 128w, ${cover.replace(/\.(webp|jpg|jpeg|png)$/, '-256w.$1')} 256w, ${cover.replace(/\.(webp|jpg|jpeg|png)$/, '-800w.$1')} 800w, ${cover.replace(/\.(webp|jpg|jpeg|png)$/, '-1500w.$1')} 1500w, ${cover.replace(/\.(webp|jpg|jpeg|png)$/, '-2000w.$1')} 2000w, ${cover} 6144w` : null;
                    const imageSizes = useResponsiveImages ? '(max-width: 768px) 100vw, 50vw' : null;
                    const CoverImage = <img class="fill" src={cover} alt={page.title || cover} srcset={imageSrcset} sizes={imageSizes} fetchpriority="high" referrerpolicy="no-referrer" />;
                    return <div class="card-image">
                        {index ? <a href={url_for(page.link || page.path)} class="image is-7by3">
                            {CoverImage}
                        </a> : <span class="image is-7by3">
                            {CoverImage}
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
                                __html: '<i class="far fa-eye"></i>' + _p('plugin.visit_count', '&nbsp;&nbsp;<span id="twikoo_visitors"><i class="fa fa-spinner fa-spin"></i></span>')
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
                    {!index && page.tags && page.tags.length ? <div class="article-tags is-size-7 mb-4">
                        <span class="mr-2">#</span>
                        {page.tags.map(tag => {
                            return <a class="link-muted mr-2" rel="tag" href={url_for(tag.path)}>{tag.name}</a>;
                        })}
                    </div> : null}
                    {/* "Read more" button */}
                    {index && page.excerpt ? <a class="article-more button is-small is-size-7" href={`${url_for(page.link || page.path)}#more`}>{__('article.more')}</a> : null}
                    {/* Share button */}
                    {!index ? <Share config={config} page={page} helper={helper} /> : null}
                </article>
            </div>
            {/* Donate button */}
            {!index ? <Donates config={config} helper={helper} /> : null}
            {/* Post navigation */}
            {!index && (page.prev || page.next) ? <div class="card"><nav class="post-navigation mt-4 level is-mobile card-content">
                {page.prev ? <div class="level-start">
                    <a class={`article-nav-prev level level-item${!page.prev ? ' is-hidden-mobile' : ''} link-muted`} href={url_for(page.prev.path)}>
                        <i class="level-item fas fa-chevron-left"></i>
                        <span class="level-item">{page.prev.title}</span>
                    </a>
                </div> : null}
                {page.next ? <div class="level-end">
                    <a class={`article-nav-next level level-item${!page.next ? ' is-hidden-mobile' : ''} link-muted`} href={url_for(page.next.path)}>
                        <span class="level-item">{page.next.title}</span>
                        <i class="level-item fas fa-chevron-right"></i>
                    </a>
                </div> : null}
            </nav></div> : null}
            {/* Comment */}
            {!index ? <Comment config={config} page={page} helper={helper} /> : null}
        </Fragment>;
    }
};
