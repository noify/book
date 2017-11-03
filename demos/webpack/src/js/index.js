// import join from "lodash/join"
import '../css/style.less' // 通过`import`引入 CSS 文件
import bJpg from '../img/b.jpg' // Icon 是图片的 URL
// import printMe from './print.js'

function component() {
    console.log(_)
    // const element = document.createElement('div');
      
    // element.innerHTML = join(['Hello', 'webpack?'], ' ')
    // element.classList.add('hello'); // 在相应元素上添加类名

    // const myImg = new Image()
    // myImg.src = bJpg
  
    // element.appendChild(myImg)

    // element.onclick = function() {
    //     import(/* webpackChunkName: "print" */ './print')
    //     .then(function(module) {
    //       const printMe = module.default; // 引入模块的默认函数
    
    //       printMe();
    //     });
    //   };
    // return element
    return import(/* webpackChunkName: "lodash.join" */'lodash/join').then(function(join) {
        const element = document.createElement('div')
        
        element.innerHTML = join(['Hello', 'webpack?'], ' ')
        element.classList.add('hello') // 在相应元素上添加类名
    
        const myImg = new Image()
        myImg.src = bJpg
        
        element.appendChild(myImg)
    
        element.onclick = function() {
            import(/* webpackChunkName: "print" */ './print')
            .then(function(module) {
              const printMe = module.default // 引入模块的默认函数
        
              printMe()
            })
          };
        return element
    }).catch(function(error) {
        console.log('An error occurred while loading the component')
    })
  }

//   var element = component()
//   document.body.appendChild(element)
  component().then(function(component) {
    document.body.appendChild(component)
  })
// if(module.hot) { // 习惯上我们会检查是否可以访问 `module.hot` 属性
//     module.hot.accept('./print.js', function() { // 接受给定依赖模块的更新，并触发一个回调函数来对这些更新做出响应
//         console.log('Accepting the updated printMe module!')
        
//         document.body.removeChild(element)
//         element = component()
//         document.body.appendChild(element)
//     });
// }