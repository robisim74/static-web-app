const path = require('path');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        inline: true,
        hot: true
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                include: path.resolve(__dirname, '../src'),
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    emitWarning: true,
                },
            },
            {
                test: /\.(js|ts)$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
            {
                test: /\.(js|ts)$/,
                include: path.resolve(__dirname, '../src'),
                loader: 'babel-loader'
            },
            {
                test: /\.s?css$/i,
                use: ['style-loader', 'css-loader?sourceMap=true', 'sass-loader']
            }
        ]
    },
    stats: "minimal"
});
