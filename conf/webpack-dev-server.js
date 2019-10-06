const WebpackDevServer = require('webpack-dev-server');
const Webpack = require('webpack');

const Config = require('./Config');
const WebpackConfig = require('./webpack.config.dev');

const server = new WebpackDevServer(Webpack(WebpackConfig), {
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

server.listen(Config.webpackDevServerPort, Config.webpackDevServerHost, err => {
  if (err) {
    console.error(err);
  }
});
