# tplify 实现指南

简易模版引擎

## 实现原理

当不使用模版引擎时，我们一般采用拼接字符串的方法。

例：

```js
var list = ['alice', 'bob'],
    tpl = '<ul>';

for(var i = 0; i < list.length; i++){
    var item = list[i];
    tpl += '<li>' + item + '</li>';
}
tpl += '</ul>';

console.log(tpl)
// <ul><li>alice</li><li>bob</li></ul>
```

我们发现像这种方法，都是一行js代码，一行拼接字符串。拼接字符串都是`tpl += ''`操作。

于是，我们可以试着简化掉`tpl += ''`，并使用`<% %>`来区分js代码，用`{{ }}`表示赋值。

```html
<ul>
    <% for(var i = 0; i < list.length; i++){
        var item = list[i] %>
        <li>{{item}}</li>
    <% } %>
</ul>
```

这个时候我们需要将以上模版还原成js。

使用正则 `/(^|%>)([\s\S]*?)(<%|$)/g` 提取模版中html部分，js部分不处理。
提取部分前后分别加上 `tpl += "` 和 `";`。

```js
template.replace(/(^|%>)([\s\S]*?)(<%|$)/g, function (g0, g1, g2) {
    return 't+="' + g2 + '";';
})
```

提取出来的html部分还要再使用正则 `/{{(.*?)}}/g` 提取html中js赋值部分。
提取部分前后分别加上 `"+` 和 `+"`。

```js
// template.replace 中的 g2
g2.replace(/{{(.*?)}}/g, function (g0, g1) {
    return '"+' + g1 + '+"'; })
```


经过以上2次正则处理之后，我们就可以得到这样的字符串

```js
let src = `
tpl = "<ul>";
for(var i = 0; i < list.length; i++){
    var item = list[i];
    tpl += "<li>" + item + "</li>";
}
tpl += "</ul>";
`
```

要想让这段字符串运行起来，我们可以使用`eval()`或者`new Function(){}`，不过因为`eval()`的性能和兼容性要差很多，于是我们这里使用`new Function(){}`。并使用`with(){}`传递数据。

> ```js
> // 最后一个参数做函数主体，前面参数作为可接受参数
> new Function(arg1, arg2, ..., function_body)
> 
> // 相当于
> function (arg1, arg2, ...){
>     // function_body
> }
> ```

```js
new Function('data', 'with(data){var tpl = "";' + src + 'return tpl;}')({list: ['alice', 'bob']})
// <ul><li>alice</li><li>bob</li></ul>
```

这就是本模版引擎的实现原理（本质上还是拼接字符串）。真正使用还需要以下优化：

- 将换行换成换行符，不然拼接字符串时遇到换行就会报错
    - `str.replace(/\r?\n/g, "\\n")`
- 将双引号转义或换成单引号，因为我们是使用双引号拼接字符串的，如果在模版中有双引号就会报错。
    - `str.replace(/<(.*?)>/g, function (g0, g1) { return g0.replace(/"/g, "'"); })`
    - `str.replace(/>(.*?)</g, function (g0, g1) { return g0.replace(/"/g, '&quot;'); })`
    - `str.replace(/&quot;/g, '"')`
- 自动渲染html，我们会发现如果数据里面有标签，生成模版时将会自动渲染html，这时我们需要一个实体符号转义的函数，来控制数据中的html渲染。

```js
function (html) {
    return String(html)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&#39;')
        .replace(/"/g, '&quot;');
})
```

# 扩展：主流模版引擎的实现原理

主流模版引擎的实现大概过程为：template -> ast -> result

## template -> ast

parse(template) -> ast

使用正则处理，将js代码、html文本等细节分别提取出来，组合成 AST 节点数组。每个节点都包含了该节点的所有信息：文本，类型，属性，子元素等。

ast内的节点可分为：

- 文本节点：普通的文本
- 块级节点：类似if、for等代码块或DOM
- 变量节点：js赋值部分

例：

```html
<div if="test > 1">
1{{test}}2
</div>
```

或

```html
{{if test > 1}}
<div>
1{{test}}2
</div>
{{ endif }}
```

转换后的AST对象
```js
[
    {
        type: 'tag',
        attrs:[],
        name:'div',
        dsl:[{'if':'test > 1'}],
        children:[
            {
                type:'text',
                content:'1'
                // ……
            },
            {
                type:'js',
                content:'test'
                // ……
            },
            {
                type:'text',
                content:'2'
                // ……
            }
            // ……
        ]
        // ……
    }
    // ……
]
```
> AST：抽象语法树（abstract syntax tree或者缩写为AST），或者语法树（syntax tree），是源代码的抽象语法结构的树状表现形式，这里特指编程语言的源代码。树上的每个节点都表示源代码中的一种结构。之所以说语法是“抽象”的，是因为这里的语法并不会表示出真实语法中出现的每个细节。比如，嵌套括号被隐含在树的结构中，并没有以节点的形式呈现；而类似于if-condition-then这样的条件跳转语句，可以使用带有两个分支的节点来表示。

## ast -> result

render(ast, data) -> result

递归遍历ast树，针对节点类型做出不同的函数处理，获得了生成模板函数 src。

```js
function genElement (ast){
    // ……
    if(el.if && !el.ifProcessed){ // 针对节点类型做出不同的函数处理
        // ……
        return genIf(el, state);
    } else if (/* …… */){
        // ……
    }
     // ……
}


let src = genElement(ast);
```

最后使用`with(){}`传入数据data，获得渲染好数据的dom。

```js
const func = new Function('data', 'with(data){return ' + src + '(data)}')

let result = func(data)
```


> 使用 with ，修改with包含代码块的作用域，可以让在代码块中执行的语句关联对象
> ```js
> with({ a: '1' }) {
>     console.log(a); // 1
> }
> ```