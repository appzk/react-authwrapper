const path = require('path')
// 导入每次删除文件夹的插件
const cleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
// 导入抽取CSS的插件
const ExtractTextPlugin = require("extract-text-webpack-plugin")
// 导入压缩CSS的插件
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 导入抽取CSS的插件
// const ExtractTextPlugin = require("extract-text-webpack-plugin")
// 导入压缩CSS的插件
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const optimizeCss = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry:  path.join(__dirname, '../src/index.js'),
  devtool: 'cheap-module-source-map',
  output: {
    path: path.join(__dirname, '../lib'),
    filename: 'index.js',
    libraryTarget: 'umd',  //发布组件专用
    library: 'ReactCmp',
  },
  plugins: [ // 插件
    new cleanWebpackPlugin(['./lib']),
    
    new ExtractTextPlugin("css/styles.css"), // 抽取CSS文件
    // new OptimizeCssAssetsPlugin()// 压缩CSS的插件
  ],
  module: {
    rules: [
      {
        test: /\.css$/, use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
          publicPath: '../' // 指定抽取的时候，自动为我们的路径加上 ../ 前缀
        })
      },
      {
        test: /\.styl$/, use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'stylus-loader'],
          publicPath: '../' // 指定抽取的时候，自动为我们的路径加上 ../ 前缀
        })
      },
      { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=5000&name=images/[hash:8]-[name].[ext]' },
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader?limit=5000&name=images/[hash:8]-[name].[ext]' },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  //这个配置是用来处理优化配置的，它将会覆盖webpack默认的js压缩（其他测试中），
  //所以这里要使用UglifyJsPlugin()重新压缩一下js，optimizeCss({})压缩抽离出来的css
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin(), new optimizeCss()]
  }
}