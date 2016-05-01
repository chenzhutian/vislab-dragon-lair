const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('../config');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach((name) => {
    baseWebpackConfig.entry[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true']
        .concat(baseWebpackConfig.entry[name]);
});

module.exports = merge(baseWebpackConfig, {
    // eval-source-map is faster for development
    devtool: '#eval-source-map',
    output: {
        path: config.dev.assetsRoot,
        publicPath: config.dev.assetsPublicPath,
        filename: '[name].js',
    },
    module: {
        loaders: [
            { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
            {
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: path.join(config.dev.assetsSubDirectory, '[name].[hash:7].[ext]'),
                },
            },
        ],
    },
    plugins: [
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
        }),
    ],
});
