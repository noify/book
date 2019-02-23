# 优点
 
1. 绑定式语法，声明式编程。
 
2. 组件，尤其是单文件组件。
 
3. 优美的API设计，简短，几乎没有驼峰式长复合词。
 
4. 字段依赖关系的计算相当巧妙，从而无需脏检查即可完成渲染依赖分析。
 
# 生命周期
 
> 除了**beforeCreate**和**created**，其他钩子在服务器端渲染期间不被调用。
 
* beforeCreate 创建前
    * 在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。
* created 创建后
    * 实例已经创建完成之后被调用。
    * 实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。
    * 挂载阶段还没开始，$el 属性目前不可见。
* beforeMount 挂载前
    * 在挂载开始之前被调用：相关的 render 函数首次被调用。
* mounted 挂载后
    * el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
    * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。
* beforeUpdate 更新前
    * 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
* updated 更新后
    * 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
    * 然而在大多数情况下，你应该避免在此期间更改状态，因为这可能会导致更新无限循环。
* activated 激活后
    * keep-alive 组件激活时调用。
* deactivated 停用后
    * keep-alive 组件停用时调用。
* beforeDestroy 销毁前
    * 实例销毁之前调用。在这一步，实例仍然完全可用。
* destroyed 销毁后
    * Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
 
![生命周期](http://cn.vuejs.org/images/lifecycle.png)

```js
// 配置

Vue.config.silent = true // 取消 Vue 所有的日志与警告。

optionMergeStrategies // 不会

// 务必在加载 Vue 之后，立即同步设置以下内容
Vue.config.devtools = true // 配置是否允许 vue-devtools 检查代码。开发版本默认为 true，生产版本默认为 false。生产版本设为 true 可以启用检查。

Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
}

Vue.config.warnHandler = function (msg, vm, trace) {
  // `trace` 是组件的继承关系追踪
}

ignoredElements // 不会

Vue.config.keyCodes = { // 给 v-on 自定义键位别名。 <input type="text" @keyup.media-play-pause="method">
  v: 86,
  f1: 112,
  // camelCase 不可用
  mediaPlayPause: 179,
  // 取而代之的是 kebab-case 且用双引号括起来
  "media-play-pause": 179,
  up: [38, 87]
}

performance // 不会

productionTip // 不会

//API



// 选项

Vue.extend({}) // 不会

new Vue({
    // ...
})
// or .vue
export default {
    // 数据
    data () { // Object | Function 组件的定义只接受 function

    },
    props: { // Array<string> | Object

    },
    propsData: { // { [key: string]: any } 只用于 new 创建的实例中

    },
    computed: { // { [key: string]: Function | { get: Function, set: Function } }

    },
    methods: { // { [key: string]: Function }

    },
    watch: { // { [key: string]: string | Function | Object | Array }

    },
    // DOM
    el: '', // string | HTMLElement
    template: '', // string
    render () { // (createElement: () => VNode) => VNode

    },
    renderError () { // (createElement: () => VNode, error: Error) => VNode

    },
    // 生命周期钩子
    beforeCreate () {

    },
    created () {

    },
    beforeMount () {

    },
    mounted () {

    },
    beforeUpdate () {

    },
    updated () {

    },
    activated () {

    },
    deactivated () {

    },
    beforeDestroy () {

    },
    destroyed () {

    },
    errorCaptured () {

    },
    // 资源
    directives: {

    },
    filters: {

    },
    components: {

    },
    // 组合
    // parent this.$parent this.$children
    mixins: [ // Array<Object>

    ],
    extends: { // Object | Function

    },
    provide () { // Object | () => Object

    },
    inject: [ // Array<string> | { [key: string]: string | Symbol | Object }

    ],
    // 其他
    name: '',
    delimiters: [ // Array<string> 默认值：["{{", "}}"]

    ],
    functional: true, // boolean
    model: { // { prop?: string, event?: string }

    },
    inheritAttrs: true, // boolean
    comments: false, // boolean
}
```