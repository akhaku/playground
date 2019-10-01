/* eslint-env node */
/**
 * Webpack config for local development. Supports hotloading. Built on top of the
 * production webpack config.
 */
var _ = require('lodash');
var webpack = require('webpack');

var Config = require('./Config');
var ProdConfig = require('./webpack.config.production');
var WebpackConfig = ProdConfig;

WebpackConfig.devtool = 'inline-source-map';

// prepend dev server and hotloader to all entries
_.each(WebpackConfig.entry, function(n, key) {
  'use strict';
  WebpackConfig.entry[key] = [
    'webpack-dev-server/client?' + Config.webpackDevServerBaseUrl,
    'webpack/hot/only-dev-server',
  ].concat(WebpackConfig.entry[key]);
});

// work around bug in...MemoryFileSystem? Doesn't seem to be allowing paths containing '.'
WebpackConfig.output.publicPath = Config.baseJsUrl;

// configure plugins

WebpackConfig.plugins = WebpackConfig.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
]);

module.exports = WebpackConfig;
