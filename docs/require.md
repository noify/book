# 构思

## 实现功能

首先加载主模块 data-main
```html
<script src="js/require.js" data-main="js/main"></script>
```

可以简写省略.js,考虑2种情况

第一个参数是一个数组，表示所依赖的模块
第二个参数是一个回调函数，当前面指定的模块都加载成功后，它将被调用。加载的模块会以参数形式传入该函数
```js
require(['moduleA', 'moduleB', 'moduleC'], function (moduleA, moduleB, moduleC){
　　　　// some code here
});
```

require.config()就写在主模块（main.js）的头部
```js
require.config({
	baseUrl: "js/lib", // 改变基目录
	paths: { // paths属性指定各个模块的加载路径
		"jquery": "jquery.min",
		"underscore": "underscore.min",
		"backbone": "backbone.min",
		"jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min" // 可以直接指定网址
	}
}))
```

AMD模块的写法

```js
// name, deps, callback
define(['myLib'], function (){ // ['myLib'], 如果该模块依然其他模块
	var add = function (x,y){
		return x+y;
	};
	return {
		add: add
	};
});
```

加载非规范的模块

```js
require.config({ // 如果要加载它们的话，必须先定义它们的特征。
	shim: {
		'underscore':{
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'], // 表明该模块的依赖性
			exports: 'Backbone' // 表明这个模块外部调用时的名称
		}
	}
});
```

## 加载模块的处理顺序

- 如果是内置模块
    * 返回该模块
    * 不再继续执行
- 遇到以 "./" 或者 "/" 或者 "../" 开头
    * 根据实在位置获取觉得路径？
    * x.js


```js
ary = document.getElementsByTagName('script');
var i;
for (i = ary.length - 1; i > -1; i -= 1) {
	if (ary[i] && func(ary[i], i, ary)) {
		break;
	}
}
func (){
	dataMain = script.getAttribute('data-main')
	if(dataMain){
		break;
	}
}
```
```js
jsSuffixRegExp = /\.js$/

func normalize 
if (jsSuffixRegExp.test(name)) {// 清除.js
	name = name.replace(jsSuffixRegExp, '');
}
function trimDots(ary) {
	var i, part;
	for (i = 0; i < ary.length; i++) {
		part = ary[i];
		if (part === '.') {
			ary.splice(i, 1);
			i -= 1;
		} else if (part === '..') {
			// If at the start, or previous value is still ..,
			// keep them so that when converted to a path it may
			// still work when converted to a path, even though
			// as an ID it is less than ideal. In larger point
			// releases, may be better to just kick out an error.
			if (i === 0 || (i === 1 && ary[2] === '..') || ary[i - 1] === '..') {
				continue;
			} else if (i > 0) {
				ary.splice(i - 1, 2);
				i -= 2;
			}
		}
	}
}
```