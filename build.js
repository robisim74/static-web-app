const chalk = require('chalk');
const log = console.log;

const critical = require('critical');

const webpackCompiler = require('./scripts/webpack.compiler');
const { modernConfig, legacyConfig } = require('./webpack.config.prod');
const entries = require('./entries');
const { getHtmlSourceFiles } = require('./scripts/utils');

async function build() {
    log(chalk.blue('Start building...'));

    // Runs webpack
    log(chalk.blue('Run webpack es2015 version'));
    await webpackCompiler(modernConfig);
    log(chalk.blue('\nRun webpack es5 version'));
    await webpackCompiler(legacyConfig);

    // Runs critical
    log(chalk.blue('\nGenerate critical css'));
    for (const value of getHtmlSourceFiles(entries)) {
        critical.generate({
            inline: true,
            base: 'build/',
            src: value,
            target: {
                html: value
            },
            minify: true,
            extract: true,
            dimensions: [{
                height: 500,
                width: 300
            },
            {
                height: 720,
                width: 1280
            }]
        });
    }

    log(chalk.blue('End building'));
}

/**
 * Build production
 */
build();
