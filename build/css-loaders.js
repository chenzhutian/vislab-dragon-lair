'use strict';
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (options = {}) => {
    const tempOption = options || {};
    // generate loader string to be used with extract text plugin
    function generateLoaders(loaders) {
        const sourceLoader = loaders.map(loader => {
            let extraParamChar;
            let newLoader = loader;
            if (/\?/.test(newLoader)) {
                newLoader = loader.replace(/\?/, '-loader?');
                extraParamChar = '&';
            } else {
                newLoader = `${newLoader}-loader`;
                extraParamChar = '?';
            }
            return `${newLoader}${tempOption.sourceMap ? `${extraParamChar}sourceMap` : ''}`;
        }).join('!');

        if (tempOption.extract) {
            return ExtractTextPlugin.extract('vue-style-loader', sourceLoader);
        }
        return ['vue-style-loader', sourceLoader].join('!');
    }

    // http://vuejs.github.io/vue-loader/configurations/extract-css.html
    return {
        css: generateLoaders(['css']),
        postcss: generateLoaders(['css']),
        less: generateLoaders(['css', 'less']),
        sass: generateLoaders(['css', 'sass?indentedSyntax']),
        scss: generateLoaders(['css', 'sass']),
        stylus: generateLoaders(['css', 'stylus']),
        styl: generateLoaders(['css', 'stylus']),
    };
};
