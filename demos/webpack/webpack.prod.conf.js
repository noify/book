const path = require('path')
const webpack = require('webpack') // 引入 webpack 便于调用其内置插件
const Merge = require('webpack-merge')
const CommonConfig = require('./webpack.base.conf.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = Merge(CommonConfig, {
  devtool: 'cheap-module-source-map', // 控制是否生成以及如何生成 source map
  output: {
    filename: 'js/[name].js', // 根据入口起点名动态生成输出文件名，可以使用像 "js/[name].[chunkhash]/bundle.js" 这样的文件夹结构
    chunkFilename: 'js/[name].js', // 指定非入口块文件输出的名字
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production') // 在编译的代码里设置了`process.env.NODE_ENV`变量
    }),
    new webpack.HashedModuleIdsPlugin(), // 替换掉原来的`module.id`
    new webpack.optimize.UglifyJsPlugin(), //压缩 JS
    new CleanWebpackPlugin(['dist']), // 第一个参数是要清理的目录的字符串数组
  ]
})