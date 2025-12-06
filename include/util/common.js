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

module.exports = {
  // 导出常用的依赖
  Component,
  Fragment,
  view,
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
