const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common.js');

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
