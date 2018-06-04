- 介绍一下标准的CSS的盒子模型？低版本IE的盒子模型有什么不同的？

		（1）有两种， IE 盒子模型、W3C 盒子模型；
		（2）盒模型： 内容(content)、填充(padding)、边界(margin)、 边框(border)；
		（3）区  别： IE的content部分把 border 和 padding计算了进去;

- CSS选择符有哪些？哪些属性可以继承？

  * 1.id选择器（ # myid）
    2.类选择器（.myclassname）
    3.标签选择器（div, h1, p）
    4.相邻选择器（h1 + p）
    5.子选择器（ul > li）
    6.后代选择器（li a）
    7.通配符选择器（ * ）
    8.属性选择器（a[rel = "external"]）
    9.伪类选择器（a:hover, li:nth-child）

  *   可继承的样式： font-size font-family color, UL LI DL DD DT;

  *   不可继承的样式：border padding margin width height ;



- CSS优先级算法如何计算？

  *   优先级就近原则，同权重情况下样式定义最近者为准;
  *   载入样式以最后载入的定位为准;

  优先级为:
    同权重: 内联样式表（标签内部）> 嵌入样式表（当前文件中）> 外部样式表（外部文件中）。
    !important >  id > class > tag
    important 比 内联优先级高

  css定义的权重规则：
  
  标签的权重为1，class的权重为10，id的权重为100，以下例子是演示各种定义的权重值

  ```css
  div{} /*权重为1*/
  
  .class1{} /*权重为10*/
  
  #id1{} /*权重为100*/
  
  #id1 div{} /*权重为100+1=101*/
  
  .class1 div{} /*权重为10+1=11*/

  .class1 .class2 div{} /*权重为10+10+1=21*/
  ```
  如果权重相同，则最后定义的样式会起作用，但是应该避免这种情况出现

- CSS3新增伪类有那些？

  p:first-of-type	选择属于其父元素的首个 <p> 元素的每个 <p> 元素。
  p:last-of-type	选择属于其父元素的最后 <p> 元素的每个 <p> 元素。
  p:only-of-type	选择属于其父元素唯一的 <p> 元素的每个 <p> 元素。
  p:only-child		选择属于其父元素的唯一子元素的每个 <p> 元素。
  p:nth-child(2)	选择属于其父元素的第二个子元素的每个 <p> 元素。

  ::after			  在元素之前添加内容,也可以用来做清除浮动。
  ::before			在元素之后添加内容
  :enabled  		
  :disabled 		控制表单控件的禁用状态。
  :checked      单选框或复选框被选中。

- display有哪些值？说明他们的作用。

  block       	块类型。默认宽度为父元素宽度，可设置宽高，换行显示。
  none        	缺省值。象行内元素类型一样显示。
  inline      	行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。
  inline-block  默认宽度为内容宽度，可以设置宽高，同行显示。
  list-item   	象块类型元素一样显示，并添加样式列表标记。
  table       	此元素会作为块级表格来显示。
  inherit     	规定应该从父元素继承 display 属性的值。


- position有哪些值？说明他们的作用。

  
  absolute  生成绝对定位的元素，相对于值不为static的第一个父元素进行定位。
  fixed     生成绝对定位的元素，相对于浏览器窗口进行定位。（老IE不支持）
  relative  生成相对定位的元素，相对于其正常位置进行定位。
  static    默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right z-index 声明）。
  inherit   规定从父元素继承 position 属性的值。

- CSS3有哪些新特性？

  新增各种CSS选择器	（: not(.input)：所有 class 不是“input”的节点）
  圆角		    （border-radius:8px）
  多列布局	    （multi-column layout）
  阴影和反射	（Shadow\Reflect）
  文字特效		（text-shadow）
  文字渲染		（Text-decoration）
  线性渐变		（gradient）
  旋转		 	（transform）
  缩放,定位,倾斜,动画,多背景
  例如:transform:\scale(0.85,0.90)\ translate(0px,-30px)\ skew(-9deg,0deg)\Animation:

- css多列等高如何实现？

  利用padding-bottom|margin-bottom正负值相抵；
  设置父容器设置超出隐藏（overflow:hidden），这样子父容器的高度就还是它里面的列没有设定padding-bottom时的高度，
  当它里面的任 一列高度增加了，则父容器的高度被撑到里面最高那列的高度，
  其他比这列矮的列会用它们的padding-bottom补偿这部分高度差。

- 经常遇到的浏览器的兼容性有哪些？原因，解决方法是什么，常用hack的技巧 ？

	  * png24位的图片在iE6浏览器上出现背景，解决方案是做成PNG8.

		* 浏览器默认的margin和padding不同。解决方案是加一个全局的*{margin:0;padding:0;}来统一。

		* IE6双边距bug:块属性标签float后，又有横行的margin情况下，在ie6显示margin比设置的大。

		  浮动ie产生的双倍距离 #box{ float:left; width:10px; margin:0 0 0 100px;}

	    这种情况之下IE会产生20px的距离，解决方案是在float的标签样式控制中加入 ——_display:inline;将其转化为行内属性。(_这个符号只有ie6会识别)

		  渐进识别的方式，从总体中逐渐排除局部。

		  首先，巧妙的使用“\9”这一标记，将IE游览器从所有情况中分离出来。
		  接着，再次使用“+”将IE8和IE7、IE6分离开来，这样IE8已经独立识别。

      ```css
      .bb{
        background-color:red;/*所有识别*/
        background-color:#00deff\9; /*IE6、7、8识别*/
        +background-color:#a200ff;/*IE6、7识别*/
        _background-color:#1e0bd1;/*IE6识别*/
      }
      ```

		*  IE下,可以使用获取常规属性的方法来获取自定义属性,
		   也可以使用getAttribute()获取自定义属性;
           Firefox下,只能使用getAttribute()获取自定义属性。
           解决方法:统一通过getAttribute()获取自定义属性。

		*  IE下,even对象有x,y属性,但是没有pageX,pageY属性;
           Firefox下,event对象有pageX,pageY属性,但是没有x,y属性。

		*  解决方法：（条件注释）缺点是在IE浏览器下可能会增加额外的HTTP请求数。

		*  Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示,
		   可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决。

		超链接访问过后hover样式就不出现了 被点击访问过的超链接样式不在具有hover和active了解决方法是改变CSS属性的排列顺序:
	    L-V-H-A :  a:link {} a:visited {} a:hover {} a:active {}

- 为什么要初始化CSS样式。

		- 因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异。

		- 当然，初始化样式会对SEO有一定的影响，但鱼和熊掌不可兼得，但力求影响最小的情况下初始化。

		最简单的初始化方法： * {padding: 0; margin: 0;} （强烈不建议）

		淘宝的样式初始化代码：
		body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; }
		body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; }
		h1, h2, h3, h4, h5, h6{ font-size:100%; }
		address, cite, dfn, em, var { font-style:normal; }
		code, kbd, pre, samp { font-family:couriernew, courier, monospace; }
		small{ font-size:12px; }
		ul, ol { list-style:none; }
		a { text-decoration:none; }
		a:hover { text-decoration:underline; }
		sup { vertical-align:text-top; }
		sub{ vertical-align:text-bottom; }
		legend { color:#000; }
		fieldset, img { border:0; }
		button, input, select, textarea { font-size:100%; }
		table { border-collapse:collapse; border-spacing:0; }


- absolute的containing block(容器块)计算方式跟正常流有什么不同？

		无论属于哪种，都要先找到其祖先元素中最近的 position 值不为 static 的元素，然后再判断：
		1、若此元素为 inline 元素，则 containing block 为能够包含这个元素生成的第一个和最后一个 inline box 的 padding box (除 margin, border 外的区域) 的最小矩形；
		2、否则,则由这个祖先元素的 padding box 构成。
		如果都找不到，则为 initial containing block。

		补充：
		1. static(默认的)/relative：简单说就是它的父元素的内容框（即去掉padding的部分）
		2. absolute: 向上找最近的定位为absolute/relative的元素
		3. fixed: 它的containing block一律为根元素(html/body)，根元素也是initial containing block

- CSS里的visibility属性有个collapse属性值是干嘛用的？在不同浏览器下以后什么区别？

	对于普通元素visibility:collapse;会将元素完全隐藏,不占据页面布局空间,与display:none;表现相同.
	如果目标元素为table,visibility:collapse;将table隐藏,但是会占据页面布局空间.
	仅在Firefox下起作用,IE会显示元素,Chrome会将元素隐藏,但是占据空间.

- position跟display、margin collapse、overflow、float这些特性相互叠加后会怎么样？

	如果元素的display为none,那么元素不被渲染,position,float不起作用,如果元素拥有position:absolute;或者position:fixed;属性那么元素将为绝对定位,float不起作用.如果元素float属性不是none,元素会脱离文档流,根据float属性值来显示.有浮动,绝对定位,inline-block属性的元素,margin不会和垂直方向上的其他元素margin折叠.
	
- 对BFC规范(块级格式化上下文：block formatting context)的理解？

		（W3C CSS 2.1 规范中的一个概念,它是一个独立容器，决定了元素如何对其内容进行定位,以及与其他元素的关系和相互作用。）
		 一个页面是由很多个 Box 组成的,元素的类型和 display 属性,决定了这个 Box 的类型。
		 不同类型的 Box,会参与不同的 Formatting Context（决定如何渲染文档的容器）,因此Box内的元素会以不同的方式渲染,也就是说BFC内部的元素和外部的元素不会互相影响。

- 什么是外边距合并？

		外边距合并指的是，当两个垂直外边距相遇时，它们将形成一个外边距。
		合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。
		w3school介绍网址： http://www.w3school.com.cn/css/css_margin_collapsing.asp


- 移动端的布局用过媒体查询吗？

	假设你现在正用一台显示设备来阅读这篇文章，同时你也想把它投影到屏幕上，或者打印出来，
	而显示设备、屏幕投影和打印等这些媒介都有自己的特点，CSS就是为文档提供在不同媒介上展示的适配方法

	<!-- link元素中的CSS媒体查询 -->
	当媒体查询为真时，相关的样式表或样式规则会按照正常的级联规被应用。
	当媒体查询返回假， <link> 标签上带有媒体查询的样式表 仍将被下载 （只不过不会被应用）。

	<link rel="stylesheet" media="(max-width: 800px)" href="example.css" />

	<!-- 样式表中的CSS媒体查询 -->
	包含了一个媒体类型和至少一个使用 宽度、高度和颜色等媒体属性来限制样式表范围的表达式。
	CSS3加入的媒体查询使得无需修改内容便可以使样式应用于某些特定的设备范围。

	<style>
		@media (min-width: 700px) and (orientation: landscape){
		  .sidebar {
		    display: none;
		  }
		}
	</style>

- 使用 CSS 预处理器吗？有什么好处优势呢？

  支持嵌套、支持变量定义、支持mixin，模块化、运算、函数。让 CSS 更易维护、方便制作主题、扩充。

- CSS优化、提高性能的方法有哪些？

  关键选择器（key selector）。选择器的最后面的部分为关键选择器（即用来匹配目标元素的部分）；
  如果规则拥有 ID 选择器作为其关键选择器，则不要为规则增加标签。过滤掉无关的规则（这样样式系统就不会浪费时间去匹配它们了）；
  提取项目的通用公有样式，增强可复用性，按模块编写组件；增强项目的协同开发性、可维护性和可扩展性;
  使用预处理工具或构建工具（gulp对css进行语法检查、自动补前缀、打包压缩、自动优雅降级）；


- 浏览器是怎样解析CSS选择器的？

		样式系统从关键选择器开始匹配，然后左移查找规则选择器的祖先元素。
		只要选择器的子树一直在工作，样式系统就会持续左移，直到和规则匹配，或者是因为不匹配而放弃该规则。

- margin和padding分别适合什么场景使用？

  margin是用来隔开元素与元素的间距；padding是用来隔开元素与内容的间隔。
  margin用于布局分开元素使元素与元素互不相干；
  padding用于元素与内容之间的间隔，让内容（文字）与（包裹）元素之间有一段

- 抽离样式模块怎么写，说出思路？

  提取出公共的部分整合起来。例如所有的按钮相同的样式，圆角、边框、颜色等提取出来整合。后期要是修改圆角的话可以只需要修改一次即可。

- 元素竖向的百分比设定是相对于容器的高度吗？

  当按百分比设定一个元素的宽度时，它是相对于父容器的宽度计算的，但是，对于一些表示竖向距离的属性，例如padding-top,padding-bottom,margin-top,margin-bottom等，当按百分比设定它们时，依据的也是父容器的宽度，而不是高度。

- 全屏滚动的原理是什么？用到了CSS的那些属性？

  图片轮播原理,图片宽高100%、超出隐藏、调整比例适应屏幕大小

- 什么是响应式设计？响应式设计的基本原理是什么？如何兼容低版本的IE？

  基于css3的media query，页面的设计和开发应当根据用户行为以及设备环境（系统平台、屏幕尺寸、屏幕定向等）进行相应的响应和调整。具体的实践方式由多方面组成，包括弹性网格和布局、图片、css media query的使用等。无论用户正在使用笔记本还是iPad，我们的页面都应该能够自动切换分辨率、图片尺寸及相关脚本功能等，以适应不同设备；换句话说，页面应该有能力去自动响应用户的设备环境。使用Respond.js 兼容低版本的IE。

响应式网页设计就是一个网站能够兼容多个终端——而不是为每个终端做一个特定的版本。这样，我们就可以不必为不断到来的新设备做专门的版本设计和开发了。

- ::before 和 :after中双冒号和单冒号 有什么区别？解释一下这2个伪元素的作用。

		单冒号(:)用于CSS3伪类，双冒号(::)用于CSS3伪元素。（伪元素由双冒号和伪元素名称组成）
		双冒号是在当前规范中引入的，用于区分伪类和伪元素。不过浏览器需要同时支持旧的已经存在的伪元素写法，
		比如:first-line、:first-letter、:before、:after等，
		而新的在CSS3中引入的伪元素则不允许再支持旧的单冒号的写法。

		想让插入的内容出现在其它内容前，使用::before，否者，使用::after；
		在代码顺序上，::after生成的内容也比::before生成的内容靠后。
		如果按堆栈视角，::after生成的内容会在::before生成的内容之上


- 如何修改chrome记住密码后自动填充表单的黄色背景 ？

 ```css
  input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
    background-color: rgb(250, 255, 189); /* #FAFFBD; */
    background-image: none;
    color: rgb(0, 0, 0);
  }
  ```

- 你对line-height是如何理解的？

  * line-height只影响行内元素，并不能直接应用于块级元素。
  * line-height 具有可继承性，块级元素的子元素会继承该特性，并且在行内元素上生效。
  * vertical-align：top,middle,baseline,bottom
  * line-boxes的高度取决于其包含的inline-boxes中最高的那一个

- 设置元素浮动后，该元素的display值是多少？

		自动变成了 display:block

- 怎么让Chrome支持小于12px 的文字？

		1、用图片：如果是内容固定不变情况下，使用将小于12px文字内容切出做图片，这样不影响兼容也不影响美观。
		2、使用12px及12px以上字体大小：为了兼容各大主流浏览器，建议设计美工图时候设置大于或等于12px的字体大小，如果是接单的这个时候就需要给客户讲解小于12px浏览器不兼容等事宜。
		3、继续使用小于12px字体大小样式设置：如果不考虑chrome可以不用考虑兼容，同时在设置小于12px对象设置-webkit-text-size-adjust:none，做到最大兼容考虑。
		4、使用12px以上字体：为了兼容、为了代码更简单 从新考虑权重下兼容性。

- 让页面里的字体变清晰，变细用CSS怎么做？

	-webkit-font-smoothing: antialiased;

- font-style属性可以让它赋值为“oblique” oblique是什么意思？

		倾斜的字体样式

- position:fixed;在android下无效怎么处理？

		fixed的元素是相对整个页面固定位置的，你在屏幕上滑动只是在移动这个所谓的viewport，
		原来的网页还好好的在那，fixed的内容也没有变过位置，
		所以说并不是iOS不支持fixed，只是fixed的元素不是相对手机屏幕固定的。
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>

- 如果需要手动写动画，你认为最小时间间隔是多久，为什么？（阿里）

		多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为1/60＊1000ms ＝ 16.7ms

- display:inline-block 什么时候会显示间隙？

	移除空格、使用margin负值、使用font-size:0、letter-spacing、word-spacing

- 如何让overflow:auto页面滚动条出现时不跳动

  ```css
  html {
    overflow-y: scroll;
  }

  :root {
    overflow-y: auto;
    overflow-x: hidden;
  }

  :root body {
    position: absolute;
  }

  body {
    width: 100vw;
    overflow: hidden;
  }
  ```

- overflow: scroll时不能平滑滚动的问题怎么处理(如何优化h5滚动效果)？

  在safari上 `-webkit-overflow-scrolling : touch;`可以快速实现效果。
  

  ```css
  {
    -webkit-overflow-scrolling: touch;
    /* position:absolute; 如果使用了绝对定位，则需要加上z-index。
    z-index:1; */
  }

```

- 有一个高度自适应的div，里面有两个div，一个高度100px，希望另一个填满剩下的高度。

  [外链](https://segmentfault.com/q/1010000000762512)

  absolute以后，会继承父辈一个static的高度，top和bottom相应的值影响其高度

- png、jpg、gif 这些图片格式解释一下，分别什么时候用。有没有了解过webp？

- 什么是Cookie 隔离？（或者说：请求资源的时候不要让它带cookie怎么做）

		如果静态文件都放在主域名下，那静态文件请求的时候都带有的cookie的数据提交给server的，非常浪费流量，
		所以不如隔离开。

		因为cookie有域的限制，因此不能跨域提交请求，故使用非主要域名的时候，请求头中就不会带有cookie数据，
		这样可以降低请求头的大小，降低请求时间，从而达到降低整体请求延时的目的。

		同时这种方式不会将cookie传入Web Server，也减少了Web Server对cookie的处理分析环节，
		提高了webserver的http请求的解析速度。


- style标签写在body后与body前有什么区别？

  从有html标准以来到目前为止（2017年5月），标准一直是规定style元素不应出现在body元素中。（除非style处于template元素中，因为template中的内容是不直接在dom树中的。另外曾经`<style scoped>`这一特殊用法是可以在body元素中的。）不过网页浏览器一直有容错设计。
  
  如果style元素出现在body元素，最终效果和style元素出现在head里是一样的。但是可能引起FOUC、重绘或重新布局。


- 什么是CSS 预处理器 / 后处理器？

		- 预处理器例如：LESS、Sass、Stylus，用来预编译Sass或less，增强了css代码的复用性，
		  还有层级、mixin、变量、循环、函数等，具有很方便的UI组件模块化开发能力，极大的提高工作效率。

		- 后处理器例如：PostCSS，通常被视为在完成的样式表中根据CSS规范处理CSS，让其更有效；目前最常做的
		  是给CSS属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。


- rem布局的优缺点

  能够更方面的自适应布局；但是需要计算px，可能会导致计算以后精度不够。


# 清除浮动的3种方法

清除浮动是为了清除使用浮动元素产生的影响。浮动的元素，高度会塌陷，而高度的塌陷使我们页面后面的布局不能正常显示。
 
## 添加新的元素 、应用 clear：both；
 
```html
<div class="outer">
    <div class="div1">1</div>
    <div class="div2">2</div>
    <div class="div3">3</div>
    <div class="clear"></div>
</div>
<style>
.clear{clear:both; height: 0; line-height: 0; font-size: 0}
</style>
```
 
## 父级div定义 overflow: auto
 
```html
<div class="outer over-flow">
    <div class="div1">1</div>
    <div class="div2">2</div>
    <div class="div3">3</div>
</div>
<style>
.over-flow{overflow: auto; zoom: 1;}
</style>
```
 
## :after 方法
 
```html
<div class="outer">
    <div class="div1">1</div>
    <div class="div2">2</div>
    <div class="div3">3</div>
</div>
<style>
.outer {zoom:1;} /*==for IE6/7 Maxthon2==*/ 
.outer:after {clear:both;content:'.';display:block;width: 0;height: 0;visibility:hidden;} /*==for FF/chrome/opera/IE8==*/
</style>
```

解析原理：
1) display:block 使生成的元素以块级元素显示,占满剩余空间;
2) height:0 避免生成内容破坏原有布局的高度。
3) visibility:hidden 使生成的内容不可见，并允许可能被生成内容盖住的内容可以进行点击和交互;
4）通过 content:"."生成内容作为最后一个元素，至于content里面是点还是其他都是可以的，例如oocss里面就有经典的 content:".",有些版本可能content 里面内容为空,一丝冰凉是不推荐这样做的,firefox直到7.0 content:”" 仍然会产生额外的空隙；
5）zoom：1 触发IE hasLayout。

通过分析发现，除了clear：both用来闭合浮动的，其他代码无非都是为了隐藏掉content生成的内容，这也就是其他版本的闭合浮动为什么会有font-size：0，line-height：0。

- zoom:1的清除浮动原理?

清除浮动，触发hasLayout；
Zoom属性是IE浏览器的专有属性，它可以设置或检索对象的缩放比例。解决ie下比较奇葩的bug。
譬如外边距（margin）的重叠，浮动清除，触发ie的haslayout属性等。

来龙去脉大概如下：
当设置了zoom的值之后，所设置的元素就会就会扩大或者缩小，高度宽度就会重新计算了，这里一旦改变zoom值时其实也会发生重新渲染，运用这个原理，也就解决了ie下子元素浮动时候父元素不随着自动扩大的问题。

Zoom属是IE浏览器的专有属性，火狐和老版本的webkit核心的浏览器都不支持这个属性。然而，zoom现在已经被逐步标准化，出现在 CSS 3.0 规范草案中。

目前非ie由于不支持这个属性，它们又是通过什么属性来实现元素的缩放呢？
可以通过css3里面的动画属性scale进行缩放。

# media query

media query作为CSS3标准的一部分，改进了媒体类型的承诺。media query允许我们不仅仅以特定设备类型为目标，还可以真正地检查设备用来渲染我们作品的具体物理特征。例如，随着移动WebKit的崛起，media query成为受欢迎的客户端技术，可以为iPhone、Android手机和他们的亲戚提供裁切讲究的样式表。

这个查询条件包含两部分：

一个媒体类型(screen), 以及
由圆括号括起来的真正查询条件，包括要检查的特定媒体特征(max-device-width)后跟目标值(480px)。

## Flex布局 css3
 
## css3 mask
 
## 通过transform进行skew变形，rotate旋转会造成出现锯齿现象
 
```css
{
    -webkit-transform: rotate(-4deg) skew(10deg) translateZ(0);
    transform: rotate(-4deg) skew(10deg) translateZ(0);
    outline: 1px solid rgba(255,255,255,0)
}
```
 
## 消除 IE10 里面的那个叉号
 
`input:-ms-clear{display:none;}`
 
  
## ios 设置input 按钮样式会被默认样式覆盖
 
```css
input, textarea { border: 0; -webkit-appearance: none; }
```


低版本的安卓浏览器：`display:none`的input无法被替代点击

如何处理高分屏(高devicePixelRatio)的图片显示
使用2x的背景图代替img，然后`background-size:contain;`
 
消除IOS下输入框默认内阴影
```css
Element {
        -webkit-appearance: none; 
}
```

ios和android下触摸元素时出现半透明灰色遮罩
```css
Element { 
        -webkit-tap-highlight-color:rgba(255,255,255,0) 
}
```

圆角bug
某些Android手机圆角失效`background-clip: padding-box;`


禁止复制、选中文本
```css
Element { 
        -webkit-user-select: none; 
        -moz-user-select: none; 
        -khtml-user-select: none; 
        user-select: none; 
} 
```

动画定义3D启用硬件加速
```css
Element { 
        -webkit-transform:translate3d(0, 0, 0); 
        transform: translate3d(0, 0, 0); 
} 
```

旋转屏幕时，字体大小调整的问题
```css
html, body, form, fieldset, p, div, h1, h2, h3, h4, h5, h6 { 
        -webkit-text-size-adjust:100%; 
}
```

CSS hack技巧
	只在IE下生效
	<!--[if IE]>
	这段文字只在IE浏览器显示
	<![endif]-->
	
	只在IE6下生效
	<!--[if IE 6]>
	这段文字只在IE6浏览器显示
	<![endif]-->
	
	只在IE6以上版本生效
	<!--[if gte IE 6]>
	这段文字只在IE6以上(包括)版本IE浏览器显示
	<![endif]-->
	
	只在IE8上不生效
	<!--[if ! IE 8]>
	这段文字在非IE8浏览器显示
	<![endif]-->
	
	非IE浏览器生效
	<!--[if !IE]>
	这段文字只在非IE浏览器显示
	<![endif]-->
  https://blog.csdn.net/freshlover/article/details/12132801
  https://www.duitang.com/static/csshack.html
  https://blog.csdn.net/liu_rong_fei/article/details/51555438
