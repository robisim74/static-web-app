const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        bundle: [path.resolve(__dirname, 'src/index.ts'), path.resolve(__dirname, 'src/index.scss')]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].js',
    },
    optimization: {
        noEmitOnErrors: true
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    devServer: {
        inline: true,
        hot: true
    },
    plugins: [
        new CopyWebpackPlugin({ patterns: [{ from: path.resolve(__dirname, 'assets'), to: 'assets' }] }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            favicon: path.resolve(__dirname, 'src/favicon.ico')
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                include: path.resolve(__dirname, 'src'),
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
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        envName: 'modern' // Points to env.modern in babel.config.js
                    }
                }
            },
            {
                test: /\.s?css$/i,
                use: [
                    'style-loader',
                    'css-loader?sourceMap=true',
                    'sass-loader'
                ]
            }
        ]
    },
    stats: 'minimal'
};
