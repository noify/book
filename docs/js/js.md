# Javascript异步编程
[](http://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html)

Javascript语言的执行环境是"单线程"（single thread）。

就是指一次只能完成一件任务。如果有多个任务，就必须排队，前面一个任务完成，再执行后面一个任务，以此类推，此为同步（Synchronous）。

我们可以通过其他方法来做到异步（Asynchronous）。


## 回调函数

setTimeout会将f1推迟执行，f1执行完后调用回调函数callback。

```js
function f1 (callback){
	 setTimeout(function () {
		// f1的任务代码
		typeof callback == "function" && callback();
	}, 1000);
}
f1(f2);
```

## 事件监听

采用事件驱动模式。任务的执行不取决于代码的顺序，而取决于某个事件是否发生。

- 优点是比较容易理解，可以绑定多个事件，每个事件可以指定多个回调函数，而且可以"去耦合"（Decoupling），有利于实现模块化。
- 缺点是整个程序都要变成事件驱动型，运行流程会变得很不清晰。

```js
// 为f1绑定一个事件，当f1发生done事件，就执行f2。
f1.on('done', f2);

function f1(){
	setTimeout(function () {

		// f1的任务代码

		// 执行完成后，立即触发done事件，从而开始执行f2。
		f1.trigger('done');
	}, 1000);
}
```

## 发布/订阅

上一节的"事件"，完全可以理解成"信号"。

这种方法的性质与"事件监听"类似，但是明显优于后者。因为我们可以通过查看"消息中心"，了解存在多少信号、每个信号有多少订阅者，从而监控程序的运行。

我们假定，存在一个"信号中心"，某个任务执行完成，就向信号中心"发布"（publish）一个信号，其他任务可以向信号中心"订阅"（subscribe）这个信号，从而知道什么时候自己可以开始执行。这就叫做"发布/订阅模式"（publish-subscribe pattern），又称"观察者模式"（observer pattern）

```js
// f2向"信号中心"jQuery订阅"done"信号
jQuery.subscribe("done", f2);

function f1(){
	setTimeout(function () {
		// f1的任务代码

		// f1执行完成后，向"信号中心"jQuery发布"done"信号，从而引发f2的执行
		jQuery.publish("done");
	}, 1000);
}

// f2完成执行后，也可以取消订阅（unsubscribe）
jQuery.unsubscribe("done", f2);
```

## Promises对象

es6已实现的新规范，是目前异步编程的最优解。

```js
function f1 () {
  return new Promise((resolve, reject) => {
		// f1的任务代码

		resolve() // 成功
		reject() // 发生错误
  })
}

可以指定多个回调函数，并指定发生错误时的回调函数
f1().then(f2).then(f3).catch(f4);
```

## 总结

可以看得出前三种方法采用的基本原理都是使用`setTimeout`，将函数推迟执行；而最后一个`Promise`则不同于。它们之前的区别见事件循环。

# 事件循环

要理解如何异步编程就必须理解js的事件循环

## 栈 Stack

当我们调用一个函数，它的地址、参数、局部变量都会压入到一个 stack 中，并且是后进先出。

## 微任务/宏任务 （Microtasks Macrotasks）

- microtasks:
	- process.nextTick
	- promise
	- Object.observe
- macrotasks:
	- setTimeout
	- setInterval
	- setImmediate
	- I/O

在一个事件循环的周期(cycle)中一个 (macro)task 应该从 macrotask 队列开始执行。当这个 macrotask 结束后，所有的 microtasks 将在同一个 cycle 中执行。在 microtasks 执行时还可以加入更多的 microtask，然后一个一个的执行，直到 microtask 队列清空。

```js
console.log('start')

const interval = setInterval(() => {  
  console.log('setInterval')
}, 0)

setTimeout(() => {  
  console.log('setTimeout 1')
  Promise.resolve()
      .then(() => {
        console.log('promise 3')
      })
      .then(() => {
        console.log('promise 4')
      })
      .then(() => {
        setTimeout(() => {
          console.log('setTimeout 2')
          Promise.resolve()
              .then(() => {
                console.log('promise 5')
              })
              .then(() => {
                console.log('promise 6')
              })
              .then(() => {
                clearInterval(interval)
              })
        }, 0)
      })
}, 0)

Promise.resolve()
    .then(() => {  
        console.log('promise 1')
    })
    .then(() => {
        console.log('promise 2')
    })
/*
输出

start
promise 1
promise 2
setInterval
setTimeout 1
promise 3
promise 4
setInterval
setTimeout 2
promise 5
promise 6

解读

Cycle 1
1) setInterval 被列为 task

2) setTimeout 1 被列为 task

3) Promise.resolve 1 中两个 then 被列为 microtask

4) stack 清空 microtasks 执行

任务队列： setInterval setTimeout 1

Cycle 2
5) microtasks 队列清空 setInteval 的回调可以执行。另一个 setInterval 被列为 task , 位于 setTimeout 1 后面

任务队列： setTimeout 1 setInterval

Cycle 3
6) microtask 队列清空，setTimeout 1 的回调可以执行，promise 3 和 promise 4 被列为 microtasks

7) promise 3 和 promise 4 执行。 setTimeout 2 被列为 task

任务队列 setInterval setTimeout 2

Cycle 4
8) microtask 队列清空 setInteval 的回调可以执行。然后另一个 setInterval 被列为 task ，位于 setTimeout 2 后面

任务队列： setTimeout 2 setInterval

9) setTimeout 2 的回调执行， promise 5 和 promise 6 被列为 microtasks

现在 promise 5 和 promise 6 的回调应该执行，并且 clear 掉 interval。 但有的时候不知道为什么 setInterval 还会在执行一遍，变成下面结果
*/
```

## 规范

- 一个事件循环(event loop)会有一个或多个任务队列(task queue) task queue 就是 macrotask queue
- 每一个 event loop 都有一个 microtask queue
- task queue == macrotask queue != microtask queue
- 一个任务 task 可以放入 macrotask queue 也可以放入 microtask queue 中
- 当一个 task 被放入队列 queue(macro或micro) 那这个 task 就可以被立即执行了

## 概念

js 只有一个main thread 主进程和call-stack（一个调用堆栈），所以在对一个调用堆栈中的task处理的时候，其他的都要等着。task等待被加入调用堆栈等待执行的时候，被放在task queue事件队列之中。
每当主线程完成一个任务的时候，他就会去调用堆栈中获取task执行。

- macrotask：也称为task，包含了script(整体代码),setTimeout, setInterval, setImmediate, I/O, UI rendering
- microtask：process.nextTick, Promises, Object.observe, MutationObserver

JavaScript引擎首先从macrotask queue中取出第一个任务，执行完毕后，将microtask queue中的所有任务取出，按顺序全部执行；
然后再从macrotask queue中取下一个，执行完毕后，再次将microtask queue中的全部取出；
循环往复，直到两个queue中的任务都取完。