# 临时笔记

## 重要知识点

事件代理/委托

## 奇奇怪怪知识点

- BFC

## 文章链接

- [CSS选择器](http://www.ruanyifeng.com/blog/2009/03/css_selectors.html)
- [小程序组件化开发框架wepy](https://github.com/Tencent/wepy)
- [WeUI](https://github.com/Tencent/weui.js)
- [面试常见问题1](https://fe.padding.me/#/questions/3)
- [面试常见问题2](https://fe.padding.me/#/questions/4)
- [octype（文档类型）的作用](http://padding.me/blog/2014/07/04/mode-or-standard/)
- [jQuery的deferred对象](http://www.ruanyifeng.com/blog/2011/08/a_detailed_explanation_of_jquery_deferred_object.html)

## QA

Q：请描述一下 cookies，sessionStorage 和 localStorage 的区别？

A：sessionStorage 和 localStorage 是HTML5 Web Storage API 提供的，可以方便的在web请求之间保存数据。有了本地数据，就可以避免数据在浏览器和服务器间不必要地来回传递。

sessionStorage、localStorage、cookie都是在浏览器端存储的数据，其中sessionStorage 的概念很特别，引入了一个“浏览器窗口”的概念。sessionStorage 是在同源的同窗口（或tab）中，始终存在的数据。也就是说只要这个浏览器窗口没有关闭，即使刷新页面或进入同源另一页面，数据仍然存在。关闭窗口后，sessionStorage 即被销毁。同时“独立”打开的不同窗口，即使是同一页面，sessionStorage 对象也是不同的

cookies会发送到服务器端。其余两个不会。

Microsoft 指出 Internet Explorer 8 增加cookie 限制为每个域名50个，但IE7 似乎也允许每个域名50个cookie。Firefox 每个域名cookie 限制为50个。Opera每个域名cookie 限制为30个。Firefox 和Safari 允许cookie 多达4097个字节，包括名（name）、值（value）和等号。Opera 许cookie 多达4096个字节，包括：名（name）、值（value）和等号。Internet Explorer 允许cookie 多达4095个字节，包括：名（name）、值（value）和等号。

- Cookie
	- 每个域名存储量比较小（各浏览器不同，大致4K）
	- 所有域名的存储量有限制（各浏览器不同，大致4K）
	- 有个数限制（各浏览器不同）
	- 会随请求发送到服务器
- LocalStorage
	- 永久存储
	- 单个域名存储量比较大（推荐5MB，各浏览器不同）
	- 总体数量无限制
- SessionStorage
	- 只在 Session 内有效
	- 存储量更大（推荐没有限制，但是实际上各浏览器也不同）

Q：请描述一下 GET 和 POST 的区别?

A: 区别如下：

get 向指定的资源请求数据,请求的数据会附在URL 之后,就是把数据放置在请求行（request line）中），以?分割URL和传输数据，多个参数用&连接；

post 向指定的资源提交要被处理的数据。get 方法，查询请求是在url中显示的，有长度限制，get 方法是安全幂等的。而post 方法请求是封装在http 消息包体中

&|get|post
---|---|----
后退/刷新|无害|请求重新提交
书签|可做书签|不可做 缓存|可被缓存|不能被缓存
历史|保留在浏览器记录里|不保留
对数据长度限制|限制（2048字符）|不限制
安全性|url中暴露数据|相对安全
可见性|url中可见|不可见

总结：

对于get 来说，是向服务器端请求数据，其请求在url 中可见，其长度有限制（2048字符）个体方法是安全幂等，这里的安全是指用于获取信息而非修改信息，幂等是指每次请求得到的结果都一样。

对于post 来说，是向服务器端提交数据，每次刷新或者后退都会重新提交，post 请求的数据封装在http 请求的首部里。

## 回答问题

Q：使用 CSS 预处理器的优缺点有哪些？(SASS，Compass，Stylus，LESS)

Q：描述下你曾经使用过的 CSS 预处理的优缺点。


## f能不能拿到a方法和b方法

```js
var F = function(){};
Object.prototype.a = function(){};
Function.prototype.b = function(){};
var f = new F();
```

## bd

```js
var a = {n: 1}
var b = a;
a.x = a = {n: 2}
console.log(a.x);
console.log(b.x)
```
