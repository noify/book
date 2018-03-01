## <a name='other'>前端框架</a>

- React 使用场景？

			逻辑复杂单页应用，偏中后台管理系统，纯展示性的UI页面不合适、

- 描述一下React 生命周期

			渲染过程调用到的生命周期函数，主要几个要知道；
			* constructor 
			* getInitialState 
			* getDefaultProps 
			* componentWillMount 
			* render 
			* componentDidMount 

			更新过程

			* componentWillReceiveProps 
			* shouldComponentUpdate 
			* componentWillUpdate 
			* render 
			* componentDidUpdate 

			卸载过程

			componentWillUnmount


- 实现组件有哪些方式？

		React.createClass 使用API来定义组件
		React ES6 class component 用 ES6 的class 来定义组件
		Functional stateless component 通过函数定义无状态组件


- 应该在React生命周期的什么阶段发出ajax请求，为什么？

				AJAX请求应在 componentDidMount函数 进行请求。

- shouldComponentUpdate函数有什么作用？

				shouldComponentUpdate是一个允许我们自行决定某些组件（以及他们的子组件）是否进行更新的生命周期函数，reconciliation的最终目的是尽可能以最有效的方式去根据新的state更新UI，
				如果你已经知道UI的哪些状态无需进行改变，就没必要去让React去判断它是否该改变。 让shouldComponentUpdate返回falss, React就会让当前的组件和其子组件保持不变。

- 当组件的setState函数被调用之后，发生了什么？

				React会做的第一件事就是把你传递给setState的参数对象合并到组件原先的state。这个事件会导致一个“reconciliation”（调和）的过程。reconciliation的最终目标就是，
				尽可能以最高效的方法，去基于新的state来更新UI。为了达到这个目的，React会构建一个React元素树（你可以把这个想象成一个表示UI的一个对象）。一旦这个树构建完毕，
				React为了根据新的state去决定UI要怎么进行改变，它会找出这棵新树和旧树的不同之处。React能够相对精确地找出哪些位置发生了改变以及如何发生了什么变化，
				并且知道如何只通过必要的更新来最小化重渲染。

- 为什么循环产生的组件中要利用上key这个特殊的prop？

				Keys负责帮助React跟踪列表中哪些元素被改变/添加/移除。React利用子元素的key在比较两棵树的时候，快速得知一个元素是新的还是刚刚被移除。没有keys，React也就不知道当前哪一个的item被移除了。

- React-router 路由的实现原理？

- 说说React Native,Weex框架的实现原理？

- 受控组件(Controlled Component)与非受控组件(Uncontrolled Component)的区别

- refs 是什么?

			Refs是能访问DOM元素或组件实例的一个函数；

- React为什么自己定义一套事件体系呢，与浏览器原生事件体系有什么关系？

- 什么时候应该选择用class实现一个组件，什么时候用一个函数实现一个组件？

			组件用到了state或者用了生命周期函数，那么就该使用Class component。其他情况下，应使用Functional component。

- 什么是HoC（Higher-Order Component）？适用于什么场景？

			高阶组件就是一个 React 组件包裹着另外一个 React 组件

- 并不是父子关系的组件，如何实现相互的数据通信？

			使用父组件，通过props将变量传入子组件 （如通过refs，父组件获取一个子组件的方法，简单包装后，将包装后的方法通过props传入另一个子组件 ）

- 用过 React 技术栈中哪些数据流管理库？

			Redux\Dva

- Redux是如何做到可预测呢？

- Redux将React组件划分为哪两种？

- Redux是如何将state注入到React组件上的？

- 请描述一次完整的 Redux 数据流

- React的批量更新机制 BatchUpdates？

- React与Vue，各自的组件更新进行对比，它们有哪些区别？

