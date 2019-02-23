module.exports = {
  css: {
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
        options: {
          // 开启 CSS Modules
          modules: true,
          // 自定义生成的类名
          localIdentName: '[local]_[hash:base64:8]'
        }
      }
    }
  }
}