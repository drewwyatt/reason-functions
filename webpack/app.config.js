const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootDir = path.join(__dirname, '..');
const outputDir = path.join(rootDir, 'dist')

module.exports = {
  entry: path.join(rootDir, 'src/Index.bs.js'),
  output: {
    path: outputDir,
    filename: 'Index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: false
    })
  ],
  devServer: {
    compress: true,
    contentBase: rootDir,
    port: process.env.PORT || 8000,
    historyApiFallback: true
  }
};
