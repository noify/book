# flex

---

# flex 使用指南

## flex布局

- 可以使用autoprefixer兼容大部分浏览器
- 使用flex布局的元素称为容器，它的所有子元素自动成为容器成员，称为项目
- 项目的float、clear和vertical-align属性将失效。

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。

项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

```css
	.box{
		display: flex;
	}
```

## 容器的属性

```css
.box{
	display: flex;
	/* 主轴排列方向：水平正方向(默认) | 水平反方向 | 垂直正方向 | 垂直反方向 */
	flex-direction: row | row-reverse | column | column-reverse;

	/* 轴线换行： 不换行(默认) | 换行 | 换行(第一行在下方)*/
	flex-wrap: nowrap | wrap | wrap-reverse;

	/* flex-direction 和 flex-wrap 简写形式*/
	flex-flow: <flex-direction> || <flex-wrap>;
	
	/* 主轴对齐方式：左对齐 | 右对齐 | 居中 | 两端对齐，项目之间的间隔都相等 | 每个项目两侧的间隔相等(所以，项目之间的间隔比项目与边框的间隔大一倍)*/
	justify-content: flex-start | flex-end | center | space-between | space-around;
	
	/* 交叉轴对齐方式： 交叉轴的起点对齐 | 交叉轴的终点对齐 | 交叉轴的中点对齐 | 项目的第一行文字的基线对齐 | 如果项目未设置高度或设为auto，将占满整个容器的高度(默认)*/
	align-items: flex-start | flex-end | center | baseline | stretch;

	/* 多根轴线(多行)的对齐方式(只有一根轴线，该属性不起作用)： 与交叉轴的起点对齐 | 与交叉轴的终点对齐 | 与交叉轴的中点对齐 | 与交叉轴两端对齐，轴线之间的间隔平均分布 | 每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍 | 轴线占满整个交叉轴（默认值）*/
	align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

## 项目的属性

```css
.item{
	/* 项目的排列顺序。数值越小，排列越靠前 */
	order: <integer>; /* default 0 */

	/* 项目的放大比例，默认不放大 */
	flex-grow: <number>; /* default 0 */

	/* 项目的缩小比例，默认空间不足，该项目将缩小 */
	flex-shrink: <number>; /* default 1 */

	/* 在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。 */
	flex-basis: <length> | auto; /* default auto */

	/* flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选 */
	flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ];

	/* align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。 */
	align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```




# 记录flex兼容的坑

### autoprefixer
 
flex需要使用autoprefixer兼容之前的旧版本，但即使这样有些属性还是无法兼容

## flex-wrap: wrap;

在低版本的ios（<=9）时，浏览器不支持flex，只支持老版-webkit-box，并且-webkit-box不支持`flex-wrap: wrap;`，所以为了兼容性不要使用该属性。

## flex-direction: row-reverse;

需要的效果是布局从水平右侧开始。但-webkit-box不支持，可以使用`flex-direction: row;justify-content: flex-end;`代替，以达到相差无几的效果。

## align-items

没有设置子元素的高度，align-items会无效