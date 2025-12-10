/**
 * 共享的工具函数和常量
 */
const createLogger = require("hexo-log");
const { Component, Fragment } = require("inferno");
const view = require("../hexo/view");
const classname = require("../../util/classname");
const { cacheComponent } = require("../../util/cache");

// 创建单例logger实例
const logger = createLogger.default();

function lazy_load_css(href) {
  script_str = `var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '${href}';
  document.getElementsByTagName('head')[0].appendChild(link);`;
  return script_str;
}

module.exports = {
  // 导出常用的依赖
  Component,
  Fragment,
  view,
  lazy_load_css,
  classname,
  cacheComponent,
  logger,

  // 常用的工具函数
  createLogger: () => logger, // 返回单例logger

  // 通用的错误处理函数
  handleWidgetError: (widgetType, error) => {
    logger.w(`Icarus cannot load widget "${widgetType}"`);
    if (process.env.NODE_ENV === "development") {
      logger.error(error);
    }
  },

  // 通用的组件加载函数
  loadComponent: (componentPath, fallback = null) => {
    try {
      let Widget = view.require(componentPath);
      return Widget.Cacheable ? Widget.Cacheable : Widget;
    } catch (e) {
      logger.w(`Cannot load component "${componentPath}"`);
      return fallback;
    }
  },
};
