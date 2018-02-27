# Reflect/Object.defineProperty()
 
> Object.defineProperty(obj, prop, descriptor)
 
```js
// 使用 __proto__
Object.defineProperty(obj, "key", {
  __proto__: null, // 没有继承的属性
  value: "static"  // 没有 enumerable
                   // 没有 configurable
                   // 没有 writable
                   // 作为默认值
});
 
// 显式
Object.defineProperty(obj, "key", {
  enumerable: false,
  configurable: false,
  writable: false,
  value: "static"
});
 
// 循环使用同一对象
function withValue(value) {
  var d = withValue.d || (
    withValue.d = {
      enumerable: false,
      writable: false,
      configurable: false,
      value: null
    }
  );
  d.value = value;
  return d;
}
// ... 并且 ...
Object.defineProperty(obj, "key", withValue("static"));
 
// 如果 freeze 可用, 防止代码添加或删除对象原型的属性
// （value, get, set, enumerable, writable, configurable）
(Object.freeze||Object)(Object.prototype);
```

如何取消微信下拉浏览器头部动画
	1. 用touch事件代替滑动
	2. 在onscroll中阻止默认事件
	
SPA单页面和微信支付的bug
微信支付需要配置一个支付授权目录，你需要将项目中的支付地址置于该配置之下，支付方能成功

微信对其支付授权目录的配置规则描述如下：
	1. 所有使用公众号支付方式发起支付请求的链接地址，都必须在支付授权目录之下；
	2. 最多设置3个支付授权目录，且域名必须通过ICP备案；
	3. 头部要包含http或https，须细化到二级或三级目录，以左斜杠“/”结尾。
 
当单页面History模式使用hash模式时，页面的路径为 xxx.com/index.html#/login
 
微信的检查逻辑：取到URL后用最后一个'/'做分隔符，将URL分为两部分，用第一部分和配置的支付授权目录做比对，匹配则验证成功，否则验证失败。很显然，这种验证方式下，URL分隔后的第一部分会包含哈希，于是验证失败。
 
解决办法：在#前加个?,因为?后面的字符串会被当做查询参数而忽视。xxx.com/index.html?#/login



arguments 函数里面的参数

全局作用域或/函数作用域/块级作用域

call/apply/bind
(obj1.)fn.call(obj2,a1,a2,a3...)//obj2没有提供，则默认为Global对象
(obj1.)fn.apply(obj2,[a1,a2,a3...])//obj2没有提供，则默认为Global对象，且无法传递参数
(obj1.)fn.bind(obj2)(a1,a2,a3...) //bind的返回值是函数,call//apply则是立即执行
(obj1.)fn.bind(obj2,a1,a2)(a1,a2,a3... ) //bind返回绑定默认参数/绑定执行对象的方法，默认参数/执行对象在后来执行时不会被替换(a1,a2不会被替换，a3...则可以)
obj2.fn(a1,a2,a3...)

(fn./Function.prototype.)bind.apply(fn1,[obj1,a1,a2,a3...])
fn1.bind(obj1,a1,a2,a3... )
https://segmentfault.com/q/1010000004468151

'use strict';//严格模式

低版本的安卓浏览器：display:none的input无法被替代点击

如何处理高分屏(高devicePixelRatio)的图片显示
使用2x的背景图代替img，然后background-size:contain;

使用viewport使页面禁止缩放 待拓展
<meta name="viewport" content="user-scalable=0" />
 
消除IOS下输入框默认内阴影
Element {
        -webkit-appearance: none; 
}

ios和android下触摸元素时出现半透明灰色遮罩
Element { 
        -webkit-tap-highlight-color:rgba(255,255,255,0) 
} 

圆角bug
某些Android手机圆角失效background-clip: padding-box;


禁止复制、选中文本
Element { 
        -webkit-user-select: none; 
        -moz-user-select: none; 
        -khtml-user-select: none; 
        user-select: none; 
} 
 
动画定义3D启用硬件加速
Element { 
        -webkit-transform:translate3d(0, 0, 0); 
        transform: translate3d(0, 0, 0); 
} 
 
旋转屏幕时，字体大小调整的问题
html, body, form, fieldset, p, div, h1, h2, h3, h4, h5, h6 { 
        -webkit-text-size-adjust:100%; 
}


