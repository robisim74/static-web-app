const path = require('path');
const critical = require('critical');

/**
 * Wrapper for https://github.com/addyosmani/critical
 */
class CriticalWebpackPlugin {
    constructor(options) {
        this.options = options;
    }

    emit(compilation, callback) {
        const css = Object.keys(compilation.assets)
            .filter(filename => /\.css$/.test(filename))
            .map(filename => path.join(compilation.outputOptions.path, filename));

        critical.generate(Object.assign({ css }, this.options), (err) => {
            callback(err);
        })
    }

    apply(compiler) {
        compiler.hooks.afterEmit.tapAsync('CriticalWebpackPlugin', (compilation, callback) => {
            this.emit(compilation, callback);
        });
    }
}

module.exports = CriticalWebpackPlugin;
