const path = require('path');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /.ts?$/,
        loader: 'ts-loader',
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: [
      path.join(__dirname, "./src/"),
      path.join(__dirname, "./src/navbar"),
      path.join(__dirname, "./src/framework"),
      path.join(__dirname, "./src/services"),
    ],
    port: 8080,
    historyApiFallback: {
      rewrites: [
        { from: /./, to: '/index.html' },
      ]
    },
    watchContentBase: true
  }
};