/**
 * 样式相关的工具函数
 */

// 常用的CSS类名映射
const COMMON_CLASSES = {
    // 布局相关
    container: 'container',
    section: 'section',
    columns: 'columns',
    column: 'column',
    
    // 卡片相关
    card: 'card',
    cardContent: 'card-content',
    cardHeader: 'card-header',
    cardHeaderTitle: 'card-header-title',
    
    // 按钮相关
    button: 'button',
    buttons: 'buttons',
    buttonPrimary: 'button is-primary',
    buttonSecondary: 'button is-secondary',
    
    // 文本相关
    title: 'title',
    subtitle: 'subtitle',
    content: 'content',
    
    // 响应式相关
    isHiddenMobile: 'is-hidden-mobile',
    isHiddenTablet: 'is-hidden-tablet',
    isHiddenDesktop: 'is-hidden-desktop',
    isHiddenWidescreen: 'is-hidden-widescreen',
    
    // 间距相关
    mb2: 'mb-2',
    mt2: 'mt-2',
    p2: 'p-2',
    m2: 'm-2'
};

// 生成响应式列宽类名
function getResponsiveColumnClass(mobile, tablet, desktop, widescreen) {
    const classes = [];
    if (mobile) classes.push(`is-${mobile}-mobile`);
    if (tablet) classes.push(`is-${tablet}-tablet`);
    if (desktop) classes.push(`is-${desktop}-desktop`);
    if (widescreen) classes.push(`is-${widescreen}-widescreen`);
    return classes.join(' ');
}

// 生成按钮类名
function getButtonClass(type = 'default', size = 'normal', options = {}) {
    const classes = ['button'];
    
    if (type !== 'default') {
        classes.push(`is-${type}`);
    }
    
    if (size !== 'normal') {
        classes.push(`is-${size}`);
    }
    
    if (options.outlined) classes.push('is-outlined');
    if (options.inverted) classes.push('is-inverted');
    if (options.rounded) classes.push('is-rounded');
    if (options.loading) classes.push('is-loading');
    if (options.fullwidth) classes.push('is-fullwidth');
    
    return classes.join(' ');
}

// 生成标题类名
function getTitleClass(level = 1, options = {}) {
    const classes = ['title'];
    
    if (level >= 1 && level <= 6) {
        classes.push(`is-${level}`);
    }
    
    if (options.subtitle) {
        classes[0] = 'subtitle';
    }
    
    if (options.spaced) classes.push('is-spaced');
    
    return classes.join(' ');
}

module.exports = {
    COMMON_CLASSES,
    getResponsiveColumnClass,
    getButtonClass,
    getTitleClass,
    
    // 常用的组合类名
    cardWithContent: `${COMMON_CLASSES.card}`,
    centeredButtons: `${COMMON_CLASSES.buttons} is-centered`,
    stickyColumn: 'column is-sticky',
    
    // 主题相关的类名
    themeClasses: {
        darkMode: 'theme-dark',
        lightMode: 'theme-light',
        nightMode: 'night-mode'
    }
};
