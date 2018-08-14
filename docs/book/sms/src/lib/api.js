var jsonpID = +new Date(),
    document = window.document,
    head = document.head
export let jsonp = function(url, { timeout = 5000 } = {}){

  let callbackName = 'jsonp' + (jsonpID++),
    resolve, reject,
    script = document.createElement('script'),
    abort = function(errorType) {
      reject({
        code: -1,
        errorType: errorType || 'abort'
      })
    },
    xhr = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    }),
    abortTimeout
    

    script.addEventListener('load', function(e, errorType){
      clearTimeout(abortTimeout)
      head.removeChild(script)

      window[callbackName] = undefined
    })

  window[callbackName] = function () {
    resolve(arguments[0])
  }
  
  url += `${url.indexOf('?') === -1 ? '?' : '&' }callback=${callbackName}`
  script.src = url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
  head.appendChild(script)
  
  if (timeout > 0) abortTimeout = setTimeout(function(){
    abort('timeout')
  }, timeout)

  return xhr
}

let version = `v2/`
let baseURI = `https://api.douban.com/`

export let top250 = ({start = 0, count = 10} = {}) => {
  return jsonp(`${baseURI}${version}movie/top250?start=${start}&count=${count}`)
}