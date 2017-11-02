const path = require('path');

module.exports = {
  entry: './src/index.js', // 入口起点，可以指定多个入口起点
  output: { // 输出，只可指定一个输出配置
    filename: 'bundle.js',  // 输出文件名
    path: path.resolve(__dirname, 'dist') // 输出文件所在的目录
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      { // 增加加载图片的规则
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};