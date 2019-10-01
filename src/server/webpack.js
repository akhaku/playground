import _ from 'lodash';
import WebpackDevServer from 'webpack-dev-server';
import Webpack from 'webpack';

import Config from 'app/conf/Config';
import WebpackConfig from 'app/conf/webpack.config.dev';

var server = new WebpackDevServer(Webpack(WebpackConfig), {
  publicPath: WebpackConfig.output.publicPath,
  sockPort: Config.webpackDevServerPort,
  hot: true,
  stats: {colors: true},
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
  },
});

server.listen(Config.webpackDevServerPort, Config.webpackDevServerHost, _.noop);
