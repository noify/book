```js
var xhr = new XMLHttpRequest()

// get
xhr.open('GET', '/url', true)
xhr.send()

// post
xhr.open('POST', '/url', true)
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
xhr.send(data)


xhr.onload = function() {
  if (xhr.status >= 200 && xhr.status < 400) {
    // Success!
    var data = JSON.parse(xhr.responseText);
  } else {
    // We reached our target server, but it returned an error
  }
};

xhr.onerror = function() {
  // There was a connection error of some sort
};
```

# 为什么使用 AJAX

  ## 优点

  1. 通过异步模式，可以实现动态不刷新（局部刷新）无刷新更新页面，减少用户的实际和心理的等待时间，更好的提升了用户体验。
  2. 优化了浏览器和服务器之间的传输，按需要获得数据，减少不必要的数据往返，减少了带宽占用。
  3. Ajax引擎在客户端运行，承担了一部分本来由服务器承担的工作，从而减少了大用户量下的服务器负载，减轻了服务器负担。
  4. 主流浏览器都支持。

  ## 缺点

  1. AJAX的程序必须测试针对各个浏览器的兼容性。
  2. AJAX更新页面内容的时候并没有刷新整个页面，因此，网页的后退功能是失效的；需提醒用户。
  3. 希望首屏立即出来或SEO相关的内容，不要用AJAX，对搜索引擎支持不好。

# AJAX 跨域

  因为浏览器的同源策略，即不允许访问非同源的页面，想要跨域必须使用 跨域资源共享 CORS 或 JSONP 等。

  ## JSONP

  ajax请求受同源策略影响，不允许进行跨域请求，而script标签(或者img标签，只要有src属性的即可)src属性中的链接却可以访问跨域的js脚本。

  利用这个特性，服务端不再返回JSON格式的数据，而是返回一段调用某个函数的js代码，在src中进行了调用，这样实现了跨域。

  CORS与JSONP的使用目的相同，但是比JSONP更强大。

  JSONP只支持GET请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。

  ## CORS 简介

  http://www.ruanyifeng.com/blog/2016/04/cors.html
  https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS

  CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。

  它允许浏览器向跨源服务器，发出XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制。

  CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。

  整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

  因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。

  ## CORS 两种请求

  浏览器将CORS请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）。

  只要同时满足以下两大条件，就属于简单请求。

  1. 请求方法是以下三种方法之一：
  * HEAD
  * GET
  * POST
  2. HTTP的头信息不超出以下几种字段：
  * Accept
  * Accept-Language
  * Content-Language
  * Last-Event-ID
  * Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain

  凡是不同时满足上面两个条件，就属于非简单请求。

  浏览器对这两种请求的处理，是不一样的。

  ## CORS 简单请求

  对于简单请求，浏览器直接发出CORS请求。具体来说，就是在头信息之中，增加一个Origin字段。

  下面是一个例子，浏览器发现这次跨源AJAX请求是简单请求，就自动在头信息之中，添加一个Origin字段。

  ```
  GET /cors HTTP/1.1
  Origin: http://api.bob.com
  Host: api.alice.com
  Accept-Language: en-US
  Connection: keep-alive
  User-Agent: Mozilla/5.0...
  ```

  ## CORS 非简单请求

  ### OPTIONS 预检请求

  非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json。

  非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）。"预检"请求用的请求方法是OPTIONS，表示这个请求是用来询问的。

  浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。



不推荐用外部变量锁定或修改按钮状态的方式，因为那样比较难：要考虑并理解 success, complete, error, timeout 这些事件的区别，并注册正确的事件，一旦失误，功能将不再可用；不可避免地比普通流程要要多注册一个 complete 事件；恢复状态的代码很容易和不相干的代码混合在一起；我推荐用主动查询状态的方式（A、B，jQuery 为例）或工具函数的方式（C、D）来去除重复操作，并提供一些例子作为参考：A. 独占型提交只允许同时存在一次提交操作，并且直到本次提交完成才能进行下一次提交。module.submit = function() {
  if (this.promise_.state() === 'pending') {
    return
  }
  return this.promise_ = $.post('/api/save')
}
B. 贪婪型提交无限制的提交，但是以最后一次操作为准；亦即需要尽快给出最后一次操作的反馈，而前面的操作结果并不重要。module.submit = function() {
  if (this.promise_.state() === 'pending') {
    this.promise_.abort()
  }
  // todo
}
比如某些应用的条目中，有一些进行类似「喜欢」或「不喜欢」操作的二态按钮。如果按下后不立即给出反馈，用户的目光焦点就可能在那个按钮上停顿许久；如果按下时即时切换按钮的状态，再在程序上用 abort 来实现积极的提交，这样既能提高用户体验，还能降低服务器压力，皆大欢喜。C. 节制型提交无论提交如何频繁，任意两次有效提交的间隔时间必定会大于或等于某一时间间隔；即以一定频率提交。module.submit = throttle(150, function() {
  // todo
})
如果客户发送每隔100毫秒发送过来10次请求，此模块将只接收其中6个（每个在时间线上距离为150毫秒）进行处理。这也是解决查询冲突的一种可选手段，比如以知乎草稿举例，仔细观察可以发现：编辑器的 blur 事件会立即触发保存；保存按钮的 click 事件也会立即触发保存；但是存在一种情况会使这两个事件在数毫秒内连续发生——当焦点在编辑器内部，并且直接去点击保存按钮——这时用 throttle 来处理是可行的。另外还有一些事件处理会很频繁地使用 throttle，如： resize、scroll、mousemove。D. 懒惰型提交任意两次提交的间隔时间，必须大于一个指定时间，才会促成有效提交；即不给休息不干活。module.submit = debounce(150, function() {
  // todo
})
还是以知乎草稿举例，当在编辑器内按下 ctrl + s 时，可以手动保存草稿；如果你连按，程序会表示不理解为什么你要连按，只有等你放弃连按，它才会继续。============更多记忆中的例子方式 C 和 方式 D 有时更加通用，比如这些情况：游戏中你捡到一把威力强大的高速武器，为了防止你的子弹在屏幕上打成一条直线，可以 throttle 来控制频率；在弹幕型游戏里，为了防止你把射击键夹住来进行无脑游戏，可以用 debounce 来控制频率；在编译任务里，守护进程监视了某一文件夹里所有的文件（如任一文件的改变都可以触发重新编译，一次执行就需要2秒），但某种操作能够瞬间造成大量文件改变（如 git checkout），这时一个简单的 debounce 可以使编译任务只执行一次。而方式 C 甚至可以和方式 B 组合使用，比如自动完成组件（Google 首页的搜索就是）：当用户快速输入文本时（特别是打字能手），可以 throttle  keypress 事件处理函数，以指定时间间隔来提取文本域的值，然后立即进行新的查询；当新的查询需要发送，但上一个查询还没返回结果时，可以 abort 未完成的查询，并立即发送新查询；----- update 2013-01-08 -----E. 记忆型var scrape = memoize(function(url) {
  return $.post('/scraper', { 'url': url })
})
对于同样的参数，其返回始终结果是恒等的——每次都将返回同一对象。应用例子有编辑器，如粘贴内容时抓取其中的链接信息，memoize 用以保证同样的链接不会抓取两次。----- update 2013-03-27 -----F. 累积型前几天处理自动完成事件时得到这个函数，发现也可以用在处理连续事件上，它能够把连续的多次提交合并为一个提交，比如：var request = makePile(5, function() {
    $.post('/', { list: JSON.stringify([].slice.call(arguments)) })
})

// 连续发送五次 
request({a:1}), request({a:2}), request({a:3}), request({a:4}), request({a:5})
/* post =>
list:[{"a":1},{"a":2},{"a":3},{"a":4},{"a":5}]
 */
样例实现：var makePile = function(count, onfilter, onvalue) {
  var values = [], id = function(value) { return value }
  return function(value) {
    values.push((onvalue || id).apply(this, arguments))
    if (values.length === count) {
      onfilter.apply(this, values)
      values = []
    }
  }
}
----- update 2013-04-16 -----另一种累积是按时间而不是次数，比如应用在行为统计上，可能在瞬间收集到数十上百类似的行为，这时可以用上面 pile 的结构加上 debounce 来防止大批重复请求（但又不丢失任何统计）：var trackFactory = function(delay, action) {
  var params = [], slice = [].slice
  var touch = debounce(delay, function() {
    if (params.length) {
      action(params)
      params = []
    }
  })
  return function() {
    params.push(slice.call(arguments))
    touch()
  }
}

var track = trackFactory(550, function(params) {
  // send tracking request
})
G. 采样型这是最近重构时联想到的，一种和上面都不同的去重操作，可以应用在自动加载（timeline）行为控制上：autoload.listen(feeds, 'next', sample(3, function() {
  this.enable()
}))
如果 sample 是固化的选择函数（n 选 1），它这实际上会这样工作：O-O-X-O-O-X
但「自动加载」的应用可能想要的是（两次自动，一次手动）：X-X-O-X-X-O
对于这种情况，可以定义作为配置的选择函数来实现控制：options { sample: (n) => n % 3 !== 0 }
即每个下一次加载完成之后， 每三次有两次对下一次加载实行自动加载。

那如果用户采取 暴力破解，直接访问ajaxurl 怎么防止呢

同样要根据应用场景来判断如何处理，至少有三种方法，比如：
- 限制请求频率
- 自动探测重复内容
- 为提交内容关联一个唯一的 client id