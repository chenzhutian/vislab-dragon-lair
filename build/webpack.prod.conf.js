'use strict';
const path = require('path');
const config = require('../config');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const cssLoaders = require('./css-loaders');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.build.assetsRoot,
        publicPath: config.build.assetsPublicPath,
        filename: path.join(config.build.assetsSubDirectory, '[name].[chunkhash].js'),
        chunkFilename: path.join(config.build.assetsSubDirectory, '[id].[chunkhash].js'),
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: `${config.dev.assetsSubDirectory}/[name].[hash:7].[ext]`,
                },
            },
        ],
    },
    vue: {
        loaders: cssLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
        }),
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        // extract css into its own file
        new ExtractTextPlugin(path.join(config.build.assetsSubDirectory,
            '[name].[contenthash].css')),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: process.env.NODE_ENV === 'testing'
                ? 'index.html'
                : config.build.index,
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
        }),
    ],
});
