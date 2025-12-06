/**
 * Article media component, used in article lists such as archive page and recent posts widget
 */
const { Component } = require('inferno');
const moment = require('moment');

module.exports = class extends Component {
  render() {
    const { thumbnail, url, title, date, dateXml, categories } = this.props;
    // Formatted like May.15
    const formattedDate = moment(date).format('MMM.DD');
    const categoryTags = [];
    categories.forEach((category, i) => {
      categoryTags.push(<a href={category.url}>{category.name}</a>);
      if (i < categories.length - 1) {
        categoryTags.push('/');
      }
    });

    return (
      <article class="media">
        {thumbnail ? (
          <figure class="media-left">
            <a class="image" href={url}>
              <img src={thumbnail} loading='lazy' decoding='async' alt={title} />
            </a>
          </figure>
        ) : null}
        <div>
          <p class="article-meta">
            <span>{formattedDate}</span>
            {categoryTags.length ? <span>{categoryTags}</span> : null}
          </p>
          <p class="title">
            <a href={url}>{title}</a>
          </p>
        </div>
      </article>
    );
  }
};
