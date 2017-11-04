# webpack 使用指南

---

# 入门

## 安装

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

## package.json

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

## webpack.config.js

### webpack配置文件 

```bash
# --progress 可选 显示进度 默认不显示
# --config webpack.prod.conf.js 可选 指定配置文件 默认webpack.config.js
$ webpack --progress --config webpack.prod.conf.js
```

### webpack 基本配置

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

### webpack 常用loader

处理js的loader

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
// 需在根目录新建babel配置文件 .babelrc 
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

处理css的loader和插件

- autoprefixer 自动添加浏览器厂商的前缀
- less-loader 将less编译成css
- css-loader  处理css中的url()等
- style-loader 将ccs插入页面中的style标签
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
处理图片和字体的loader

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

### webpack 常用插件

部分插件会详细展开

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

部分简单插件的用法
```js
const Merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

// 抽离css样式
const extractLess = new ExtractTextPlugin({
  filename: "css/[name].css", // .[contenthash]
  disable: process.env.NODE_ENV === "development"
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




