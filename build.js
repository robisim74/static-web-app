const chalk = require('chalk');
const log = console.log;

const critical = require('critical');

const webpackCompiler = require('./webpack.compiler');
const webpackConfigProd = require('./webpack.config.prod');

async function build() {
    log(chalk.blue('Start building...'));

    // Runs webpack
    log(chalk.blue('Run webpack es2015 version'));
    await webpackCompiler(webpackConfigProd.modernConfig);
    log(chalk.blue('\nRun webpack es5 version'));
    await webpackCompiler(webpackConfigProd.legacyConfig);

    // Runs critical
    log(chalk.blue('\nGenerate critical css'));
    critical.generate({
        inline: true,
        base: 'build/',
        src: 'index.html',
        target: {
            html: 'index.html'
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

    log(chalk.blue('End building'));
}

build();
