const { Component, Fragment } = require('inferno');
const Comment = require('./comment');
const ArticleLicensing = require('../misc/article_licensing')
const ArticleCover = require('./article_cover');

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

    const { article } = config;
    const { url_for, date, date_xml, __, _p } = helper;

    const cover = page.cover ? url_for(page.cover) : null;

    return <Fragment>
      {/* Main content */}
      <div class="card">
        {/* Cover image */}
        {cover ? <ArticleCover page={page} cover={cover} index={index} helper={helper} /> : null}
        <article class={`card-content article${'direction' in page ? ' ' + page.direction : ''}`} role="article">
          {/* Metadata */}
          {page.layout !== 'page' ? <div class="article-meta">
            <p>
              {page.date && <span>{date(page.date)}</span>}
              {/* Categories */}
              {page.categories && page.categories.length ? <span>
                {(() => {
                  const categories = [];
                  page.categories.forEach((category, i) => {
                    categories.push(<a class="link-muted" href={url_for(category.path)}>{category.name}</a>);
                    if (i < page.categories.length - 1) {
                      categories.push("/");
                    }
                  });
                  return categories;
                })()}
              </span> : null}
              <span dangerouslySetInnerHTML={{
                __html: _p('article.word_count', getWordCount(page._content))
              }}></span>
              {/* Visitor counter */}
              {!index ? <span id={url_for(page.link || page.path)} data-flag-title={page.title} dangerouslySetInnerHTML={{
                __html: _p('plugin.visit_count', '<span id="twikoo_visitors"></span>')
              }}></span> : null}
            </p>
          </div> : null}
          {/* Title */}
          {page.title !== '' && index ? <p class="title"><a href={url_for(page.link || page.path)}>{page.title}</a></p> : null}
          {page.title !== '' && !index ? <h1 class="title">{page.title}</h1> : null}
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
        </article>
      </div>
      {/* Post navigation */}
      {!index && (page.prev || page.next) ? <nav class="post-navigation level is-mobile card-content pl-0 pr-0 pb-0">
        {page.prev ?
          <a class={`article-nav-prev level level-item${!page.prev ? ' is-hidden-mobile' : ''} link-muted`} href={url_for(page.prev.path)}>
            <iconify-icon icon="mingcute:left-fill" class="pr-4"></iconify-icon>{page.prev.title}
          </a>
          : null}
        {page.next ?
          <a class={`article-nav-next level level-item${!page.next ? ' is-hidden-mobile' : ''} link-muted`} href={url_for(page.next.path)}>
            {page.next.title}<iconify-icon icon="mingcute:right-fill" class="pl-2"></iconify-icon>
          </a>
          : null}
      </nav> : null}
      {/* Comment */}
      {!index ? <Comment config={config} page={page} helper={helper} /> : null}
    </Fragment>;
  }
};
