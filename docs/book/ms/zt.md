1. h5/c3有哪些新特性？

  HTML5不再基于SGML(SGML：标准通用标记语言)
  图像：cancas、video、audio
  位置：Geolocation
  存储：localStorage、sessionStorage
  多任务：webworker(javascript.ruanyifeng.com/htmlapi/webworker.html)
  网络通信协议：websocket
  表单：
  离线Web应用：Manifest 

  1. 拖拽释放(Drag and drop) API 
  2. 语义化更好的内容标签（header,nav,footer,aside,article,section）
  3. 音频、视频API(audio,video)
  4. 画布(Canvas) API
  5. 地理(Geolocation) API
  6. 本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失；
  7. sessionStorage 的数据在浏览器关闭后自动删除
  8. 表单控件，calendar、date、time、email、url、search  
  9. 新的技术webworker, websocket, Geolocation
  参考资料：http://www.jb51.net/html5/45220.html
  https://www.jianshu.com/p/a4f38d6c4035

  CSS3
  选择器：
  边框、背景、渐变、文本效果、字体：
  转换、变形、3D转换：
  过渡、动画：
  多列：
  盒模型：
  Flex布局：
  多媒体查询：

2. float布局有哪些具体，哪些缺点？有哪些代替方案？

  浮动的块虽然脱离的正常的文档流，但是还会占有正常文档流的文本空间
  会使父容器的高度塌陷，也就是父元素在高度计算的时候会忽略浮动的元素
  通过::after伪类利用clear属性清除浮动
  利用BFC原理包容浮动

3. 有几种水平/垂直居中的方式？

  ../css

4. 如何实现左边固定右边自适应布局？

  ../css

5. 有哪些css hack技巧？用途是？

  [CSShack](./CSShack.html)

6. x=1;y=1;add(8);alert(x+y);function add(y){x+=3;y+=3;alert(x+y)}

  ```js
  add(8); // alert(15)
  alert(x+y); // alert(5)
  ```

7. `<ul><li>1</li><li>2</li><li>3</li></ul>`实现点击li弹框对应index

  [DOM](./DOM.html)

8. `<ul><li>1</li><li>2</li><li>3</li>...</ul>`有100个li，将奇数个li渲染到ul

  [DOM](./DOM.html)

9. 为什么要使用ajax？如何解决ajax跨域问题？

  [ajax](./ajax.md)

10. 事件冒泡和事件捕获有什么区别？哪个优先级高？

  事件分为三个阶段：
  依次为 ①捕获阶段，②目标阶段，③冒泡阶段，
  第一阶段：事件从文档根元素开始逐层向下传递，直到找到事件目标，
  第二阶段：找到事件目标并触发相应的事件，
  第三阶段：从目标逐层向上返回到根节点，

  在JS中，绑定的事件默认的执行时间是在冒泡阶段执行，而非在捕获阶段（重要），这也是为什么当父类和子类都绑定了某个事件，会先调用子类绑定的事件，后调用父类的事件。

  不过我们可以通过绑定事件时，指定事件执行时间是在冒泡阶段还是捕获阶段。

  obj.addEventListener(event,function(){},bool)

  bool:false，代表冒泡阶段执行

  bool:true，代表捕获阶段执行

  JS在默认情况下获取事件后，就开始从根元素开始捕获所有该事件的监听对象，然后在冒泡阶段逐一执行。捕获阶段是在冒泡阶段前面

  

  阻止冒泡

  w3c的方法是e.stopPropagation()，IE则是使用e.cancelBubble = true;

  阻止默认行为

  w3c的方法是e.preventDefault()，IE则是使用e.returnValue = false;

  onclick,click,on()的优先关系：onclick>click>on()；

  onclick和click绑定的事件，彼此之间遵守事件冒泡规则，从内到外触发；

  on()绑定的事件，总是晚于onclick和click绑定的事件触发；




自我介绍
在最近项目使用了什么框架或者技术？遇到什么难点痛点，怎么解决的？有什么是你感受最深的？

  vue+vue-router+webpack+vuex
  单页面


如何处理跨域的？如何避免axios的options请求，两次请求验证问题？
  
  [ajax](./ajax.md)

如何解决各浏览器的兼容性？
如何解决不同屏幕的分辨率？
有什么短期/长期的规划？有时间限定的才是计划？
觉得自己水平怎么样？有哪些方面不足？有提升的计划？
离开的原因？
有什么问题要问的？
1. 中长期的计划与路径是什么？
2. 短期内需要迫切解决的问题是什么？
3. 自身的优势是什么？和长期计划的关联度如何？
4. 现在离职的原因关键点是什么？
5. 换工作能解决这个问题吗？
