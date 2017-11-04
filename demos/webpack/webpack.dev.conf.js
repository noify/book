const path = require('path')
const webpack = require('webpack') // 引入 webpack 便于调用其内置插件
const Merge = require('webpack-merge')
const CommonConfig = require('./webpack.base.conf.js')

module.exports = Merge(CommonConfig, {
  devtool: 'inline-source-map', // 控制是否生成以及如何生成 source map
  devServer: { // 检测代码变化并自动重新编译并自动刷新浏览器
    contentBase: path.resolve(__dirname, 'dist'), // 设置静态资源的根目录
    hot: true, // 告诉 dev-server 我们在用 HMR
    hotOnly: true // 指定如果热加载失败了禁止刷新页面 (这是 webpack 的默认行为)，这样便于我们知道失败是因为何种错误
  },
  output: { // 输出，只可指定一个输出配置
    filename: 'js/[name].js',  // 根据入口起点名动态生成输出文件名，可以使用像 "js/[name]/bundle.js" 这样的文件夹结构
    chunkFilename: 'js/[name].js', // 指定非入口块文件输出的名字
  },
  plugins: [ // 插件属性，是插件的实例数组
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development') // 在编译的代码里设置了`process.env.NODE_ENV`变量
    }),
    new webpack.HashedModuleIdsPlugin(), // 替换掉原来的`module.id`
    new webpack.HotModuleReplacementPlugin(), // 启用 HMR
    new webpack.NamedModulesPlugin() // 打印日志信息时 webpack 默认使用模块的数字 ID 指代模块，不便于 debug，这个插件可以将其替换为模块的真实路径
  ],
})