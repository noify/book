var cacheVersion = 'v1.0.3.2';
// 监听 service worker 的 install 事件
self.addEventListener('install', function (event) {
  // 如果监听到了 service worker 已经安装成功的话，就会调用 event.waitUntil 回调函数
  event.waitUntil(
      // 安装成功后操作 CacheStorage 缓存，使用之前需要先通过 caches.open() 打开对应缓存空间。
      caches.open(cacheVersion).then(function (cache) {
          // 通过 cache 缓存对象的 addAll 方法添加 precache 缓存
          return cache.addAll([
              './',
              './index.html',
              './style.css'
          ]);
      })
  );
  // event.waitUntil(self.skipWaiting());
});
self.addEventListener('fetch', function (event) {
  event.respondWith(
      caches.match(event.request).then(function (response) {
          // 来来来，代理可以搞一些代理的事情

          // 如果 Service Worker 有自己的返回，就直接返回，减少一次 http 请求
          if (response) {
              return response;
          }

          // 如果 service worker 没有返回，那就得直接请求真实远程服务
          var request = event.request.clone(); // 把原始请求拷过来
          return fetch(request).then(function (httpRes) {

              // http请求的返回已被抓到，可以处置了。

              // 请求失败了，直接返回失败的结果就好了。。
              if (!httpRes || httpRes.status !== 200) {
                  return httpRes;
              }

              // 请求成功的话，将请求缓存起来。
              var responseClone = httpRes.clone();
              caches.open(cacheVersion).then(function (cache) {
                  cache.put(event.request, responseClone);
              });

              return httpRes;
          });
      })
  );
});
self.addEventListener('activate', function (event) {
  event.waitUntil(
      Promise.all([

          // 更新客户端
          self.clients.claim(),

          // 清理旧版本
          caches.keys().then(function (cacheList) {
              return Promise.all(
                  cacheList.map(function (cacheName) {
                      if (cacheName !== cacheVersion) {
                          return caches.delete(cacheName);
                      }
                  })
              );
          })
      ])
  );
});
// self.addEventListener('notificationclick', event => {
//     let clickedNotification = event.notification;
//     clickedNotification.close();

//     // 执行某些异步操作，等待它完成
//     let promiseChain = new Promise((resolve, reject) => {
//         console.log('被点击了！')
//         resolve(result);
//     });
//     event.waitUntil(promiseChain);
// });
self.addEventListener('notificationclick', event => {
    if (!event.action) {
        // 没有点击在按钮上
        console.log('Notification Click.');
        return;
    }

    const notificationData = event.notification.data;
    console.log('The data notification had the following parameters:');
    Object.keys(notificationData).forEach(key => {
        console.log(`  ${key}: ${notificationData[key]}`);
    });
    switch (event.action) {
        case 'action-action':
            console.log('User \'s action.');
            break;
        case 'qqcom-action':
            let examplePage = 'https://www.qq.com/';
            let promiseChain = clients.openWindow(examplePage);
            event.waitUntil(promiseChain);
            console.log('User \'s qqcom.');
            break;
        case 'gramophone-action':
            console.log('User \'s music.');
            break;
        case 'atom-action':
            console.log('User \'s science.');
            break;
        default:
            console.log(`Unknown action clicked: '${event.action}'`);
            break;
    }
    // let urlToOpen = new URL(examplePage, self.location.origin).href;

    // let promiseChain = clients.matchAll({
    //     type: 'window',
    //     includeUncontrolled: true
    // })
    // .then(windowClients => {
    //     let matchingClient = null;

    //     for (let i = 0, max = windowClients.length; i < max; i++) {
    //         let windowClient = windowClients[i];
    //         if (windowClient.url === urlToOpen) {
    //             matchingClient = windowClient;
    //             break;
    //         }
    //     }

    //     return matchingClient
    //         ? matchingClient.focus()
    //         : clients.openWindow(urlToOpen);
    // });

    // event.waitUntil(promiseChain);
});
self.addEventListener('notificationclose', event => {
    let dismissedNotification = event.notification;
    let promiseChain = notificationCloseAnalytics();
    event.waitUntil(promiseChain);
});