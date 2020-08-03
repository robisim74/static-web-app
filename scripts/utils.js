const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const getModernEntry = (entries) => {
    const entry = {};
    for (const value of entries) {
        entry[value.name] = [value.module, value.style];
    }
    return entry;
}

const getLegacyEntry = (entries) => {
    const entry = {};
    for (const value of entries) {
        entry[value.name] = value.module;
    }
    return entry;
}

const MultipleModernHtmlWebpackPlugin = (entries) => {
    return entries.map(value =>
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, `../build/${value.template}`),
            template: path.resolve(__dirname, `../src/${value.template}`),
            chunks: [value.name],
            favicon: path.resolve(__dirname, '../src/favicon.ico')
        })
    );
}

const MultipleLegacyHtmlWebpackPlugin = (entries) => {
    return entries.map(value =>
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, `../build/${value.template}`),
            template: path.resolve(__dirname, `../build/${value.template}`),
            chunks: [value.name]
        })
    );
}

const getHtmlSourceFiles = (entries) => {
    return entries.map(value =>
        value.template
    );
}

module.exports = {
    getModernEntry,
    getLegacyEntry,
    MultipleModernHtmlWebpackPlugin,
    MultipleLegacyHtmlWebpackPlugin,
    getHtmlSourceFiles
};
