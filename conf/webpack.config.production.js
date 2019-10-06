/* eslint-env node */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: ['./src/client/entry'],
  },
  output: {
    path: path.resolve(__dirname, '../lib/static/js'),
    filename: '[name].js',
  },
  resolve: {
    alias: {
      app: path.resolve(__dirname, '../src'),
    },
    extensions: ['.jsx', '.js'],
  },
  mode: 'production',
  module: {
    rules: [{
      test: /\.less$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      }, 'css-loader', 'less-loader',
      ],
    }, {
      test: /\.jsx?$/,

      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
