# 什么是CSS hack

由于不同厂商的浏览器以及其不同的版本（如IE6-IE11,Firefox/Safari/Opera/Chrome等），对CSS的支持、解析不一样，导致在不同浏览器的环境中呈现出不一致的页面展现效果。这时，我们为了获得统一的页面效果，就需要针对不同的浏览器以及其不同的版本写特定的CSS样式，我们把这个针对不同的浏览器以及其不同的版本写相应的CSS code的过程，叫做CSS hack!

# CSS hack 原理

由于不同的浏览器以及其不同的版本对CSS的支持及解析结果不一样，以及CSS优先级对浏览器展现效果的影响，我们可以据此针对不同的浏览器情景来应用不同的CSS。

# CSS hack 分类

CSS Hack大致有3种表现形式，CSS属性前缀法、选择器前缀法以及IE条件注释法（即HTML头部引用if IE）Hack，实际项目中CSS Hack大部分是针对IE浏览器不同版本之间的表现差异而引入的。

* 属性前缀法(即类内部Hack)：例如 IE6能识别下划线"_"和星号" * "，IE7能识别星号" * "，但不能识别下划线"_"，IE6~IE10都认识"\9"，但firefox前述三个都不能认识。
* 选择器前缀法(即选择器Hack)：例如 IE6能识别*html .class{}，IE7能识别*+html .class{}或者*:first-child+html .class{}。
* IE条件注释法(即HTML条件注释Hack)：针对所有IE(注：IE10+已经不再支持条件注释)： <!--[if IE]>IE浏览器显示的内容 <![endif]-->，针对IE6及以下版本： <!--[if lt IE 6]>只在IE6-显示的内容 <![endif]-->。这类Hack不仅对CSS生效，对写在判断语句里面的所有代码都会生效。
　　
CSS hack书写顺序，一般是将适用范围广、被识别能力强的CSS定义在前面。

* 条件注释法

* 类内属性前缀法

* 选择器前缀法

* CSS3选择器结合JavaScript的Hack
  https://blog.csdn.net/dayu9216/article/details/70225261
# CSS hack 利弊


|标记|IE6|IE7|IE8|FF|Opera|Sarari|
|-|-|-|-|-|-|-|
|[*+><]	|√|	√	|X|	X|	X|	X|
|_|	√|	X|	X|	X|	X|	X|
|\9|	√|	√|	√|	X|	X|	X|
|\0	|X	|X	|√	|X	|√	|X|
|@media screen and (-webkit-min-device-pixel-ratio:0){.bb {}}|	X|	X|	X|	X|	X|	√|
|.bb , x:-moz-any-link, x:default	|X	|√	|X	|√(ff3.5及以下)	|X	|X|
|@-moz-document url-prefix(){.bb{}}|	X|	X|	X|	√|	X|	X|
|@media all and (min-width: 0px){.bb {}}	|X	|X	|X	|√	|√	|√|
|* +html .bb {}|	X|	√|	X|	X|	X|	X|
|游览器内核|	Trident|	Trident	|Trident|	Gecko|	Presto|	WebKit|

```css
.bb{
height:32px;
background-color:#f1ee18;/*所有识别*/
background-color:#00deff\9; /*IE6、7、8识别*/
+background-color:#a200ff;/*IE6、7识别*/
_background-color:#1e0bd1;/*IE6识别*/
}
@media screen and (-webkit-min-device-pixel-ratio:0){.bb{background-color:#f1ee18}}{} /*safari(Chrome) 有效 */
.bb, x:-moz-any-link, x:default{background-color:#00ff00;}/*IE7 firefox3.5及以下 识别 */ 
@-moz-document url-prefix(){.bb{background-color:#00ff00;}}/*仅firefox 识别*/ 
* +html .bb{background-color:#a200ff;}/* 仅IE7 识别 */
```

# 条件 hack

  ```html
  <!--[if <keywords>? IE <version>?]>
    HTML代码块
  <![endif]-->
  <!--
    <keywords>
    if条件共包含6种选择方式：是否、大于、大于或等于、小于、小于或等于、非指定版本

    是否：
    指定是否IE或IE某个版本。关键字：空
    大于：
    选择大于指定版本的IE版本。关键字：gt（greater than）
    大于或等于：
    选择大于或等于指定版本的IE版本。关键字：gte（greater than or equal）
    小于：
    选择小于指定版本的IE版本。关键字：lt（less than）
    小于或等于：
    选择小于或等于指定版本的IE版本。关键字：lte（less than or equal）
    非指定版本：
    选择除指定版本外的所有IE版本。关键字：!
    <version>
    目前的常用IE版本为6.0及以上，推荐酌情忽略低版本，把精力花在为使用高级浏览器的用户提供更好的体验上

    IE10及以上版本已将条件注释特性移除，使用时需注意。
  -->
  ```

# 属性级hack

  ```css
  selector{<hack>?property:value<hack>?;}
  /*
    _：选择IE6及以下。连接线（中划线）（-）亦可使用，为了避免与某些带中划线的属性混淆，所以使用下划线（_）更为合适。
    *：选择IE7及以下。诸如：（+）与（#）之类的均可使用，不过业界对（*）的认知度更高
    \9：选择IE6+
    \0：选择IE8+和Opera15以下的浏览器
    在标准模式中
    “-″减号是IE6专有的hack
    “\9″ IE6/IE7/IE8/IE9/IE10都生效
    “\0″ IE8/IE9/IE10都生效，是IE8/9/10的hack
    “\9\0″ 只对IE9/IE10生效，是IE9/10的hack
  */
  ```

# 选择符级hack

  ```css
  <hack> selector{ sRules }
  /*
  选择不同的浏览器及版本
  尽可能减少对CSS Hack的使用。Hack有风险，使用需谨慎
  通常如未作特别说明，本文档所有的代码和示例的默认运行环境都为标准模式。
  一些CSS Hack由于浏览器存在交叉认识，所以需要通过层层覆盖的方式来实现对不同浏览器进行Hack的。
  */
  * html .test { color: #090; }       /* For IE6 and earlier */
  * + html .test { color: #ff0; }     /* For IE7 */
  .test:lang(zh-cmn-Hans) { color: #f00; }  /* For IE8+ and not IE */
  .test:nth-child(1) { color: #0ff; } /* For IE9+ and not IE */
  ```
