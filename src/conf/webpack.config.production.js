/* eslint-env node */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: ['./lib/client/entry'],
  },
  output: {
    path: path.resolve(__dirname, '../../lib/static/js'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  mode: 'production',
  module: {
    rules: [{
      test: /\.less$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      },
        'css-loader',
        'less-loader',
      ]
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    })
  ],
};
