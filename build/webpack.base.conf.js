'use strict';
const path = require('path');
const utils = require('./utils');
const projectRoot = path.resolve(__dirname, '../');
const eslintFormatter = require('eslint-friendly-formatter');

module.exports = {
    entry: {
        app: './src/main.js',
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            src: path.resolve(__dirname, '../src'),
            assets: path.resolve(__dirname, '../src/assets'),
            components: path.resolve(__dirname, '../src/components'),
        },
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')],
    },
    module: {
        preLoaders: [
            {
                test: /\.vue$/,
                loader: 'eslint',
                include: projectRoot,
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                loader: 'eslint',
                include: projectRoot,
                exclude: /node_modules/,
            },
        ],
        loaders: [
            { test: /\.vue$/, loader: 'vue' },
            {
                test: /\.js$/,
                loader: 'babel',
                include: projectRoot,
                exclude: /node_modules/,
            },
            { test: /\.json$/, loader: 'json' },
            { test: /\.html$/, loader: 'vue-html' },
            {
                test: require.resolve('material-design-lite/material.js'),
                loader: 'exports?componentHandler',
            },
        ],
    },
    vue: {
        loaders: utils.cssLoaders(),
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime'],
        comments: false,
    },
    eslint: {
        formatter: eslintFormatter,
    },
};
