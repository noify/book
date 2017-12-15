# flex

---

记录flex兼容的坑

# autoprefixer

flex需要使用autoprefixer兼容之前的旧版本，但即使这样有些属性还是无法兼容

## flex-wrap: wrap;

在低版本的ios（<=9）时，浏览器不支持flex，只支持老版-webkit-box，并且-webkit-box不支持`flex-wrap: wrap;`，所以为了兼容性不要使用该属性。

## flex-direction: row-reverse;

需要的效果是布局从水平右侧开始。但-webkit-box不支持，可以使用`flex-direction: row;justify-content: flex-end;`代替，以达到相差无几的效果。