const webpack = require('webpack');
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Naming
const MODERN_SUFFIX = 'es2015';
const LEGACY_SUFFIX = 'es5';

const FILENAME = `[name].[hash]`;
const MODERN_FILENAME = `[name]-${MODERN_SUFFIX}.[hash]`;
const LEGACY_FILENAME = `[name]-${LEGACY_SUFFIX}.[hash]`;

// Configs
const modernConfig = {
    mode: 'production',
    entry: {
        bundle: [path.resolve(__dirname, 'src/index.ts'), path.resolve(__dirname, 'src/index.scss')]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: `js/${MODERN_FILENAME}.js`,
    },
    optimization: {
        noEmitOnErrors: true
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({ patterns: [{ from: path.resolve(__dirname, 'public'), to: 'public' }] }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html')
        }),
        new ScriptExtHtmlWebpackPlugin({
            module: MODERN_SUFFIX
        }),
        new MiniCssExtractPlugin({
            filename: `css/${FILENAME}.css`
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        envName: "modern" // Points to env.modern in babel.config.js
                    }
                }
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
    },
    stats: {
        colors: true
    }
};

const legacyConfig = {
    mode: 'production',
    entry: {
        bundle: path.resolve(__dirname, 'src/index.ts')
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: `js/${LEGACY_FILENAME}.js`,
    },
    optimization: {
        noEmitOnErrors: true
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'build/index.html') // Points to the result of prod.modern
        }),
        new ScriptExtHtmlWebpackPlugin({
            custom: [
                {
                    test: LEGACY_SUFFIX,
                    attribute: 'nomodule',
                }
            ],
            defaultAttribute: 'defer'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        envName: "legacy" // Points to env.legacy in babel.config.js
                    }
                }
            }
        ]
    },
    stats: {
        colors: true
    }
};

module.exports = {
    modernConfig,
    legacyConfig
};
