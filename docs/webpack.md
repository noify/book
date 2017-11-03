# webpack 使用指南

---

# 入门

## 安装

只需安装node.js，node.js自带npm。

有时npm比较卡，可使用淘宝镜像的cnpm

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

```json
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

