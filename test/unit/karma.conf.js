// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('../../build/webpack.base.conf');
const utils = require('../../build/utils');
// const projectConfig = require('../../config');
const projectRoot = path.resolve(__dirname, '../../');

const webpackConfig = merge(baseConfig, {
    // use inline sourcemap for karma-sourcemap-loader
    devtool: '#inline-source-map',
    module: {
        loaders: utils.styleLoaders(),
    },
    vue: {
        loaders: {
            js: 'isparta',
        },
    },
});

// no need for app entry during tests
delete webpackConfig.entry;

// make sure isparta loader is applied before eslint
webpackConfig.module.preLoaders = webpackConfig.module.preLoaders || [];

webpackConfig.module.preLoaders.unshift({
    test: /\.js$/,
    loader: 'isparta',
    include: path.resolve(projectRoot, 'src'),
});


// only apply babel for test files when using isparta
webpackConfig.module.loaders.some((loader, i) => {
    if (loader.loader === 'babel') {
        loader.include = path.resolve(projectRoot, 'test/unit');
        return true;
    }
    return null;
});


const reportersConifg = ['spec', 'coverage'];
const coverageReporters = [
    { type: 'text-summary' },
];

if (process.env.TRAVIS) {
    coverageReporters.push({ type: 'lcovonly', subdir: '.' });
} else {
    coverageReporters.push({ type: 'html', subdir: '.' });
}

module.exports = config => {
    config.set({
        // to run in additional browsers:
        // 1. install corresponding karma launcher
        //    http://karma-runner.github.io/0.13/config/browsers.html
        // 2. add it to the `browsers` array below.
        browsers: ['PhantomJS'],
        frameworks: ['mocha', 'sinon-chai'],
        reporters: reportersConifg,
        files: ['./index.js'],
        preprocessors: {
            './index.js': ['webpack', 'sourcemap'],
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true,
        },
        coverageReporter: {
            dir: './coverage',
            reporters: coverageReporters,
        },
    });
};
