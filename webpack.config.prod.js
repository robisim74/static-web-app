const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = require('./config');
const {
    getModernEntry,
    getLegacyEntry,
    MultipleModernHtmlWebpackPlugin,
    MultipleLegacyHtmlWebpackPlugin,
    getAssets
} = require('./scripts/utils');

// Naming
const MODERN_SUFFIX = 'es2015';
const LEGACY_SUFFIX = 'es5';

const FILENAME = `[name].[hash]`;
const MODERN_FILENAME = `[name]-${MODERN_SUFFIX}.[hash]`;
const LEGACY_FILENAME = `[name]-${LEGACY_SUFFIX}.[hash]`;

// Configs
const modernConfig = {
    mode: 'production',
    context: path.resolve(__dirname, 'src'),
    entry: getModernEntry(config.entries),
    output: {
        path: path.resolve(__dirname, config.buildDir),
        filename: `js/${MODERN_FILENAME}.js`,
        chunkFilename: `js/${MODERN_FILENAME}.js`,
        publicPath: '/'
    },
    optimization: {
        noEmitOnErrors: true,
        splitChunks: {
            chunks: 'all'
        }
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                ...getAssets(config.assets)
            ]
        }),
        ...MultipleModernHtmlWebpackPlugin(config.entries, config.baseHref),
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
                        envName: 'modern' // Points to env.modern in babel.config.js
                    }
                }
            },
            {
                test: /\.s?css/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 } // @import syntax
                    },
                    {
                        loader: 'postcss-loader' // Autoprefixer
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]',
                            outputPath: 'assets',
                            emitFile: false
                        }
                    }
                ]
            },
            {
                test: /\.woff$|\.woff2$|\.ttf$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                        outputPath: 'assets',
                        emitFile: false
                    }
                }
            },
        ]
    },
    stats: {
        colors: true,
        modules: false,
        entrypoints: false
    }
};

const legacyConfig = {
    mode: 'production',
    context: path.resolve(__dirname, 'src'),
    entry: getLegacyEntry(config.entries),
    output: {
        path: path.resolve(__dirname, config.buildDir),
        filename: `js/${LEGACY_FILENAME}.js`,
        chunkFilename: `js/${LEGACY_FILENAME}.js`,
        publicPath: '/'
    },
    optimization: {
        noEmitOnErrors: true,
        splitChunks: {
            chunks: 'all'
        }
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        ...MultipleLegacyHtmlWebpackPlugin(config.entries),
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
                        envName: 'legacy' // Points to env.legacy in babel.config.js
                    }
                }
            }
        ]
    },
    stats: {
        colors: true,
        modules: false,
        entrypoints: false
    }
};

module.exports = {
    modernConfig,
    legacyConfig
};
