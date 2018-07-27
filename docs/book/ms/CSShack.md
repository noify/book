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