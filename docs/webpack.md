# webpack 使用指南

查看[demo](https://github.com/noify/webpackify)

---

# 安装

只需安装node.js，node.js自带npm。

有时npm比较卡，可使用淘宝镜像的cnpm。

```bash
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```

```bash
//全局安装
$ npm install -g webpack

//安装到你的项目目录
$ npm install --save-dev webpack
```

# package.json

项目的描述文件，配置项目相关的元数据和依赖项

```js
{
  // ......
  "scripts": {
    "build": "webpack", // 命令行脚本 使用方法`npm run build`
    // ......
  },
  "devDependencies": { // 项目开发所需要的模块
    "webpack": "^3.8.1", // 模块：版本 可通过`npm install`全部安装
     // ......
  },
  "dependencies": { // 项目正常运行所依赖的模块
    "jquery": "^3.0.1", //  模块：版本 可通过`npm install`全部安装
     // ......
  },
  // ......
}
```

# webpack.config.js

webpack配置文件

## 如何使用

```bash
# --progress 可选 显示进度 默认不显示
# --config webpack.prod.conf.js 可选 指定配置文件 默认webpack.config.js
$ webpack --progress --config webpack.prod.conf.js
```

## 基本配置

查看[完整配置](https://webpack.js.org/configuration/#options)

```js
module.exports = {
  entry:{ // 入口js 可设置多个
    app: './index.js',
    other: './other.js',
    vendor: [ // 可放入第三方库进行合并
      'lodash'
    ]
  },
  output: { // 输出，只可指定一个输出配置
    filename: '[name].js', // 根据入口起点名动态生成输出文件名，可以使用像 "js/[name].[chunkhash]/bundle.js" 这样的文件夹结构
    chunkFilename: '[name].js', // 指定非入口块文件输出的名字
    path: path.resolve(__dirname, 'dist') // 输出文件所在的目录
    publicPath: "", // 静态资源的url
  },
  module: { // 使用xx-loader处理项目中不同类型文件
    rules: [
      {
        test: /\.js$/, // 使用babel-loader处理js 将es6转成es5
        use: [{
          loader: 'babel-loader'
        }],
        exclude: /(node_modules|bower_components)/,
      },
      // .....
    ]
  },
  plugins: [] // 使用webpack插件
}
```

## 常用loader

### 预处理js的loader

```js
// padckage.json
"devDependencies": {
  "babel-core": "^6.22.1",
  "babel-loader": "^7.1.2",
  "babel-plugin-transform-runtime": "^6.22.0",
  "babel-preset-env": "^1.6.1",
  "babel-preset-stage-2": "^6.22.0",
  "babel-register": "^6.22.0"
}
```

```js
// webpack.config.js module rules
// 使用babel-loader处理js 将es6转成es5
{
  test: /\.js$/, 
  use: [{
    loader: 'babel-loader'
  }],
  exclude: /(node_modules|bower_components)/, // 排除node_modules和bower_components文件夹
}
```

```js
// 在根目录新建babel配置文件 .babelrc 
{
  "presets": [
    ["env", { // 总是最新的转码规则
      "modules": false
      // "targets": { // 需要支持的环境
      //   "browsers": ["last 2 versions", "safari >= 7"]
      // }
    }],
    "stage-2" // 提案阶段 stage-2
  ],
  "plugins": ["transform-runtime"], // 使用到新特性 会自动polyfill
  "comments": true // 保留注释 清除注释会影响import()
}
```

### 预处理css的loader和插件

- autoprefixer 自动添加浏览器厂商的前缀
- less-loader 将less编译成css
- css-loader  处理css中的@import/url()等
- style-loader 通过插入style标签将css加入页面
- extract-text-webpack-plugin 提取css文件

```js
// padckage.json
"devDependencies": {
  "css-loader": "^0.28.7",
  "style-loader": "^0.19.0",
  "less": "^2.7.3", // less-loader 依赖
  "less-loader": "^4.0.5",
  "postcss-loader": "^2.0.8", // autoprefixer 依赖
  "autoprefixer": "^7.1.6",
  "extract-text-webpack-plugin": "3.0.2",
}
```

```js
// webpack.config.js
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const autoprefixer = require('autoprefixer')

const extractLess = new ExtractTextPlugin({
  filename: "css/[name].css", // .[contenthash]
  disable: process.env.NODE_ENV === "development"
})

// module rules
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
}

// plugins
plugins: [
  autoprefixer,
  extractLess
  // ......
]
```

```js
// 在根目录新建postcss配置文件 postcss.config.js 
module.exports = {
  plugins: { // 兼容浏览器5个版本
    'autoprefixer': {browsers: 'last 5 version'}
  }
}
```
### 预处理图片和字体的loader

```js
// padckage.json
"devDependencies": {
  "file-loader": "^1.1.5", // url-loader依赖
  "url-loader": "^0.6.2",
}
```

```js
// webpack.config.js module rules
{ // 处理图片的规则
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  use: [{
      loader: 'url-loader',
      options: {
        limit: 8192, //小于8kb的图片以base64的形式内联在代码中
        name: 'img/[name].[ext]'
      }
    }],
},
{ // 处理字体的规则
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
  use: [{
      loader: 'url-loader',
      options: {
        limit: 8192,
        name: 'fonts/[name].[ext]'
      }
    }]
}
```

## 常用自带插件和配置

### 配置

[source-map](http://cheng.logdown.com/posts/2016/03/25/679045)用于还原打包之前的代码 方便查找错误

```js
// webpack.config.js
// ......
devtool: 'cheap-module-source-map', // 控制是否生成以及如何生成 source map
devtool: 'inline-source-map', // 控制是否生成以及如何生成 source map
// ......
```

### 自带插件

```js
// webpack.config.js plugins
plugins: [
  new webpack.ProvidePlugin({ // 设置全局变量
    _: 'lodash',
  }),
  new webpack.HashedModuleIdsPlugin(), // 替换掉原来的`module.id`
  // 提取公共代码
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
  // webpack会在最后一个CommonsChunkPlugin产出的chunk注入webpackJsonp的定义及异步加载相关的定义(webpack调用CommonsChunkPlugin处理后模块管理的核心,因为是核心,所以要第一个进行加载,不然会报错)
  // 因为会经常变动，所以隔离在vendor之外
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest', // 将 webpack 自身的运行时代码放在 manifest 模块
    chunks: ['vendor']
  }),
  new webpack.optimize.UglifyJsPlugin(), //压缩 JS
  new webpack.HotModuleReplacementPlugin(), // 启用 HMR
  new webpack.NamedModulesPlugin() // 打印日志信息时 webpack 默认使用模块的数字 ID 指代模块，不便于 debug，这个插件可以将其替换为模块的真实路径
]
```

## 常用插件

```js
// padckage.json
"devDependencies": {
  "webpack-dev-server": "^2.9.4", // 小型Node.js Express服务器
  "webpack-merge": "^4.1.1", // 合并配置
  "html-webpack-plugin": "^2.30.1", // 自动生产html
  "clean-webpack-plugin": "^0.1.17", // 清空文件夹
  "extract-text-webpack-plugin": "3.0.2", //抽离css样式
}
```

### 部分插件的用法

```js
const Merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

// 抽离css样式
const extractLess = new ExtractTextPlugin({
  filename: "css/[name].css", // .[contenthash]
  disable: process.env.NODE_ENV === "development" //开发环境 不使用该插件
})

// 合并配置
module.exports = Merge(CommonConfig,{
  // ......
  plugins:[
    extractLess,// 抽离css样式
    new CleanWebpackPlugin(['dist']), // 清空dist文件夹
  ]
}
)}
```

### webpack-dev-server

使用node.js 服务器构建开发环境，实现实时加载代码

```js
// package.json
{
  // ......
  "scripts": {
    "dev": "webpack-dev-server --open --config webpack.dev.conf.js",
    // ......
  },
  // ......
  "devDependencies": {
    "webpack-dev-server": "^2.9.4",
    // ......
  }
  // ......
}
```

```js
// webpack.config.js
devServer: { // 检测代码变化并自动重新编译并自动刷新浏览器
  contentBase: path.resolve(__dirname, 'dist'), // 设置静态资源的根目录
  hot: true, // 告诉 dev-server 我们在用 HMR
  hotOnly: true // 指定如果热加载失败了禁止刷新页面 (这是 webpack 的默认行为)，这样便于我们知道失败是因为何种错误
},
```

### 模块热替换

模块热替换（HMR）只更新发生变更（替换、添加、删除）的模块，而无需重新加载整个页面（实时加载，LiveReload），这样可以显著加快开发速度，一旦打开了 webpack-dev-server 的 hot 模式，在试图重新加载整个页面之前，热模式会尝试使用 HMR 来更新。

```js
// webpack.config.js plugins
new webpack.HotModuleReplacementPlugin(), // 启用 HMR [chunkhash]不能和 HMR 一起使用
new webpack.NamedModulesPlugin() // 打印日志信息时 webpack 默认使用模块的数字 ID 指代模块，不便于 debug，这个插件可以将其替换为模块的真实路径
```

我们已经开启了 HMR 的功能，HMR 的接口已经暴露在module.hot属性之下，我们只需要调用 [HMR API](https://webpack.js.org/api/hot-module-replacement/) 即可实现热加载。当“被加载模块”发生改变时，依赖该模块的模块便能检测到改变并接收改变之后的模块。

```js
// index.js
if(module.hot) { // 习惯上我们会检查是否可以访问 `module.hot` 属性
  module.hot.accept('./print.js', function() { // 接受给定依赖模块的更新，并触发一个回调函数来对这些更新做出响应
    console.log('Accepting the updated printMe module!');
    printMe();
  });
}
```

### html-webpack-plugin

自动生成 html 文件

```js
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')

plugins: [
  new HtmlWebpackPlugin({
    title: 'webpack demo',  // 生成 HTML 文档的标题
    filename: 'index.html' // 写入 HTML 文件的文件名，默认 `index.html`
  })
]
```

### webpack.DefinePlugin

将变量设置为全局变量

```js
// webpack.config.js
plugins: [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development') // 在编译的代码里设置了`process.env.NODE_ENV`变量
  }),
]
```

```js
// index.js
console.log(process.env.NODE_ENV)
// development
```

## 常用函数

### import()

用于动态加载/懒加载

```js
// 使用该方法后 login模块会自动分离出一个js 并且只有执行到该方法时才会引入login模块的js 实现懒加载 亦可用于动态加载
import(/* webpackChunkName: "login" */ './login') // /* webpackChunkName: "login" */ 注释不能省略 用于命名分离出来的js 所以babel编译js时要保留注释 注释留到最后压缩js时去除
.then(module => {
  module.default // 引入模块的默认函数
})
.catch(error => {
    console.log(error)
})
```

## 其他配置

### resolve

```js
// webpack.config.js
resolve: {
  // 默认解析扩展路径，引入文件可节约后缀名
  extensions: ['.js', '.less', '.css', '.json'],
  // 设置解析器查找模块的目录，默认node_modules
  modules: ['node_modules'],
  // 设置模块别名，便于我们更方便引用
  alias: {
    'src': path.resolve(__dirname, 'src'),
  }
}
```

## 其他

###  关于 output.publicPath、devServer.contentBase、devServer.publicPath的区别

- output.publicPath: 对于这个选项，我们无需关注什么绝对相对路径，因为两种路径都可以。我们只需要知道一点：这个选项是指定 HTML 文件中资源文件 (字体、图片、JS文件等) 的文件名的公共 URL 部分的。在实际情况中，我们首先会通过output.filename或有些 loader 如file-loader的name属性设置文件名的原始部分，webpack 将文件名的原始部分和公共部分结合之后，HTML 文件就能获取到资源文件了。
- devServer.contentBase: 设置静态资源的根目录，html-webpack-plugin生成的 html 不是静态资源。当用 html 文件里的地址无法找到静态资源文件时就会去这个目录下去找。
- devServer.publicPath: 指定浏览器上访问所有 打包(bundled)文件 (在dist里生成的所有文件) 的根目录，这个根目录是相对服务器地址及端口的，比devServer.contentBase和output.publicPath优先。