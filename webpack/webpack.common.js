const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        bundle: path.resolve(__dirname, '../src/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'js/[name].js',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: false,
        },
        noEmitOnErrors: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({ patterns: [{ from: path.resolve(__dirname, '../public'), to: 'public' }] }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
        }),
    ],
    resolve: {
    },
    module: {
        rules: [
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                    },
                },
            },
        ],
    },
};
