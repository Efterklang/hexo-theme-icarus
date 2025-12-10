const { Component } = require('inferno');
const gravatrHelper = require('hexo-util').gravatar;
const { cacheComponent } = require('../../util/cache');

class Profile extends Component {
    renderSocialLinks(links) {
        if (!links.length) {
            return null;
        }
        return <div class="level is-mobile is-multiline">
            {links.filter(link => typeof link === 'object').map(link => {
                return <a class="level-item button is-marginless"
                    target="_blank" rel="me noopener" title={link.name} href={link.url}>
                    {'icon' in link ? <iconify-icon icon={link.icon}></iconify-icon> : link.name}
                </a>;
            })}
        </div>;
    }

    render() {
        const {
            avatar,
            author,
            authorTitle,
            location,
            counter,
            socialLinks
        } = this.props;
        return <div class="card widget" data-type="profile">
            <div class="card-content">
                <nav class="level">
                    <div class="level-item has-text-centered flex-shrink-1">
                        <div>
                            <img class="avatar" style={"border-radius: 290486px; width: 128px; padding-bottom: 5px;"} src={avatar} alt={author} />
                            {author ? <p class="is-size-4" style={{ 'line-height': 'inherit', 'display': 'block' }}>{author}</p> : null}
                            {authorTitle ? <p class="is-size-6" style={{ 'display': 'block' }}>{authorTitle}</p> : null}
                            {location ? <p class="is-size-6" style={{ 'display': 'flex', 'justify-content': 'center' }}>
                                <span>{location}</span>
                            </p> : null}
                        </div>
                    </div>
                </nav>
                <nav class="level is-mobile">
                    <div class="level-item has-text-centered is-marginless">
                        <div>
                            <p class="heading">{counter.post.title}</p>
                            <a href={counter.post.url}>
                                <p class="title">{counter.post.count}</p>
                            </a>
                        </div>
                    </div>
                    <div class="level-item has-text-centered is-marginless">
                        <div>
                            <p class="heading">{counter.category.title}</p>
                            <a href={counter.category.url}>
                                <p class="title">{counter.category.count}</p>
                            </a>
                        </div>
                    </div>
                    <div class="level-item has-text-centered is-marginless">
                        <div>
                            <p class="heading">{counter.tag.title}</p>
                            <a href={counter.tag.url}>
                                <p class="title">{counter.tag.count}</p>
                            </a>
                        </div>
                    </div>
                </nav>
                {socialLinks ? this.renderSocialLinks(socialLinks) : null}
            </div>
        </div>;
    }
}

Profile.Cacheable = cacheComponent(Profile, 'widget.profile', props => {
    const { site, helper, widget } = props;
    const {
        avatar,
        gravatar,
        author = props.config.author,
        author_title,
        location,
        social_links
    } = widget;
    const { url_for, _p, __ } = helper;

    function getAvatar() {
        if (gravatar) {
            return gravatrHelper(gravatar, 128);
        }
        if (avatar) {
            return url_for(avatar);
        }
        return url_for('/img/avatar.webp');
    }

    const postCount = site.posts.length;
    const categoryCount = site.categories.filter(category => category.length).length;
    const tagCount = site.tags.filter(tag => tag.length).length;

    const socialLinks = social_links ? Object.keys(social_links).map(name => {
        const link = social_links[name];
        if (typeof link === 'string') {
            return {
                name,
                url: url_for(link)
            };
        }
        return {
            name,
            url: url_for(link.url),
            icon: link.icon
        };
    }) : null;

    return {
        avatar: getAvatar(),
        author,
        authorTitle: author_title,
        location,
        counter: {
            post: {
                count: postCount,
                title: _p('common.post', postCount),
                url: url_for('/archives/')
            },
            category: {
                count: categoryCount,
                title: _p('common.category', categoryCount),
                url: url_for('/categories/')
            },
            tag: {
                count: tagCount,
                title: _p('common.tag', tagCount),
                url: url_for('/tags/')
            }
        },
        socialLinks
    };
});

module.exports = Profile;
