const critical = require('critical');

const webpackCompiler = require('./webpack.compiler');
const webpackConfigProd = require('./webpack.config.prod');

async function build() {
    // Runs webpack
    await webpackCompiler(webpackConfigProd.modernConfig);
    await webpackCompiler(webpackConfigProd.legacyConfig);

    // Runs critical
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
}

build();
