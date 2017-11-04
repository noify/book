const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack') // 引入 webpack 便于调用其内置插件
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const autoprefixer = require('autoprefixer')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const extractLess = new ExtractTextPlugin({
  filename: "css/[name].css", // .[contenthash]
  disable: process.env.NODE_ENV === "development"
})

module.exports = {
  entry: { // 入口起点，可以指定多个入口起点
    app: './src/js/index.js',
    // print: './src/print.js'
    another: './src/js/another.js',
    vendor: [ // 第三方库可以统一放在这个入口一起合并
      'lodash'
    ]
  },
  output: { // 输出，只可指定一个输出配置
    path: path.resolve(__dirname, 'dist') // 输出文件所在的目录
  },
  module: { // 如何处理项目中不同类型的模块
    rules: [ // 用于规定在不同模块被创建时如何处理模块的规则数组
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader'
        }],
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.(less|css)$/, // 匹配特定文件的正则表达式或正则表达式数组
        use: extractLess.extract({
          use: [ // 应用于模块的 loader 使用列表
            {
              loader: "css-loader"
            }, {
              loader: "postcss-loader"
            }, {
              loader: "less-loader"
            }
          ],
          // use style-loader in development 
          fallback: "style-loader",
          publicPath: '../'
        })
      },
      { // 增加加载图片的规则
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'img/[name].[ext]'
            }
          }],
      },
      { // 增加加载字体的规则
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [{
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'fonts/[name].[ext]'
            }
          }]
      }
    ]
  },
  plugins: [ // 插件属性，是插件的实例数组
    autoprefixer,
    extractLess,
    new HtmlWebpackPlugin({
      title: 'webpack',  // 生成 HTML 文档的标题
      filename: 'index.html' // 写入 HTML 文件的文件名，默认 `index.html`
    }),
    new webpack.ProvidePlugin({ // 设置全局变量
      _: 'lodash',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest', // 将 webpack 自身的运行时代码放在 manifest 模块
      chunks: ['vendor']
    }),
  ],
};