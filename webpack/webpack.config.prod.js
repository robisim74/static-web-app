const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common.js');
const CriticalWebpackPlugin = require('./plugins/critical-webpack-plugin');

const FILENAME = '[name].[chunkhash:8]';

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    output: {
        filename: `js/${FILENAME}.js`,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `css/${FILENAME}.css`
        }),
        new CriticalWebpackPlugin({
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
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.s?css/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
});
