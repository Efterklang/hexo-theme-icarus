/* eslint no-process-exit: "off" */
const fs = require('fs');
const path = require('path');
const util = require('util');
const createLogger = require('hexo-log');
const yaml = require('../util/yaml');
const { SchemaLoader } = require('./hexo/core/schema');
const { yellow } = require('./util/console');

const logger = createLogger.default();

function loadThemeConfig(hexo, cfgPaths) {
    const configs = cfgPaths.map(cfgPath => fs.readFileSync(cfgPath))
        .map(cfgPath => yaml.parse(cfgPath));
    return Object.assign({}, ...configs, hexo.config.theme_config);
}

function generateThemeConfigFile(schema, cfgPath) {
    const defaultValue = schema.getDefaultValue();
    fs.writeFileSync(cfgPath, defaultValue.toYaml());
}

function checkConfig(hexo) {
    if (!process.argv.includes('--icarus-dont-check-config')) {
        logger.info('=== Checking theme configurations ===');

        const siteCfgFile = path.join(hexo.base_dir, '_config.yml');
        const themeSiteCfg = path.join(hexo.base_dir, '_config.icarus.yml');
        const themeDirCfg = path.join(hexo.theme_dir, '_config.yml');
        const themeCfgPaths = [themeDirCfg, themeSiteCfg].filter(cfgPath => fs.existsSync(cfgPath));

        const schemaDir = path.join(hexo.theme_dir, 'include/schema/');
        const loader = SchemaLoader.load(require(path.join(schemaDir, 'config.json')), schemaDir);
        const schema = loader.getSchema('/config.json');

        if (!process.argv.includes('--icarus-dont-generate-config')) {
            if (!themeCfgPaths.length) {
                logger.warn('None of the following configuration files is found:');
                logger.warn(`- ${yellow(themeSiteCfg)}`);
                logger.warn(`- ${yellow(themeDirCfg)}`);
                logger.info('Generating theme configuration file...');
                generateThemeConfigFile(schema, themeSiteCfg);
                themeCfgPaths.push(themeSiteCfg);
                logger.info(`${yellow(themeSiteCfg)} created successfully.`);
                logger.info('To skip configuration generation, use "--icarus-dont-generate-config".');
            }
        }

        let cfg = loadThemeConfig(hexo, themeCfgPaths);

        const validation = schema.validate(cfg);
        if (validation !== true) {
            logger.warn('Theme configurations failed one or more checks.');
            logger.warn('Icarus may still run, but you will encounter unexcepted results.');
            logger.warn('Here is some information for you to correct the configuration file.');
            logger.warn(util.inspect(validation));
        }

        const rootCfg = yaml.parse(fs.readFileSync(siteCfgFile));
        if (rootCfg.theme_config) {
            logger.warn(`"theme_config" found in ${yellow(siteCfgFile)}.`);
            logger.warn(`Please remove theme configurations from ${yellow(siteCfgFile)}.`);
        }
    }
}

module.exports = hexo => {
    try {
        checkConfig(hexo);
    } catch (e) {
        logger.error(e);
        logger.error('Theme configuration checking failed.');
        logger.info('You may use \'--icarus-dont-check-config\' to skip configuration checking.');
        process.exit(-1);
    }
};
