<template>
  <div class="sms">
    <!-- 
      https://www.w3cplus.com/css/vw-for-layout.html
      https://www.w3cplus.com/mobile/vw-layout-in-vue.html
    -->
    <div class="mode">
      <div class="left" :class="{ 'active': sendMode === 'all' }" @click="sendMode = 'all'">全部</div>
      <div class="center" :class="{ 'active': sendMode === 'unsent' }" @click="sendMode = 'unsent'">未发送</div>
      <div class="right" :class="{ 'active': sendMode === 'sent' }" @click="sendMode = 'sent'">已发送</div>
    </div>
    <div class="top" @click="fakeFocus">
      <span>收件人：</span>
      <span v-for="(i, index) in activeList" v-bind:key="i.id"><span class="blue user" @click="del(i, index, $event)">{{i.username}}({{i.mobile}})</span>、</span>
      <span id="fakeInput" :class="{ 'ccc': search === '' }">{{search === '' ? '输入手机号/姓名' : search}}</span>
      <input id="search" @keydown.8="keydownDel($event)" ref="search" v-model="search">
    </div>
    <div aspectratio w-188-246> <div aspectratio-content></div> </div>
    <div class="searchList">
      <div class="suser" v-for="i in searchList" v-bind:key="i.id" v-show="sendMode === 'all' || (sendMode === 'unsent' && i.nums === 0) ||  (sendMode === 'sent' && i.nums > 0) " @click="chooseUser(i)">
        {{i.username}}(<span class="blue">{{i.mobile}}</span>)
        <span class="right"><span :class="{ 'blue': i.nums > 0 }">{{i.nums}} </span>次</span>
      </div>
    </div>
    <div class="submitWrap" v-show="mode !== 'once'">
      <button class="submit" @click="submit">发送</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { debounce } from 'lodash'
import { top250 } from '../lib/api'
axios.defaults.baseURL = '/'
top250({ start: 10 }).then(r => console.log(r))
let token = ''
let vm = {};
export default {
  name: 'sms',
  methods: {
    fakeFocus () {
      this.$refs.search.focus()
    },
    del (u, index, event) {
      if (confirm((`确定要删除 ${u.username}(${u.mobile}) 么？`))) {
        let activeList = this.activeList
        activeList.splice(index, 1)
        this.activeList = activeList
      }
      event.stopPropagation()
    },
    keydownDel (event) {
      if (this.search === '') {
        let activeList = this.activeList
        let index = activeList.length - 1
        index !== -1 && this.del(activeList[index], index, event)
      }
    },
    chooseUser (u) {
      if (this.mode === 'once') {
        if (confirm((`确定发送给 ${u.username}(${u.mobile}) 么？`))) {
          this.submit(u)
        }
      } else {
        let flag = 0
        this.search = ''
        this.activeList.forEach(i => {
          if (i.id === u.id)  flag = 1
        })
        if (flag) {
          alert('请勿重复添加！')
        } else {
          this.activeList.push(u)
        }
      }
    },
    submit (u) {
      // 发送短信
      let mobile = []
      if (this.mode === 'once') {
        mobile.push(u.mobile)
      } else {
        this.activeList.forEach(u => {
          mobile.push(u.mobile)
        })
      }
      if (mobile.length === 0) {
        alert('请选择需发送的名单')
        return
      }
      if (!confirm((`确定发送么？`))) {
          return
      }
      var params = new URLSearchParams();
      params.append('mobiles[]', mobile);

      axios({
        method: 'post',
        url: `/hds/sys/esurer/sms/send?token=${token}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },   
        data: params
      }).then(res => {
        let data = res.data
          if (res.status === 200 && data.code === 0) {
            alert(`发送成功！`)
          } else {
            alert(data.msg)
          }
      })
    }
  },
  watch: {
    search: debounce(val => {
        if (val === '') {
          return
        }
        var CancelToken = axios.CancelToken;
        var cancel;
        axios.get(`/hds/sys/esurer/user/list?keyword=${val}&page=1&limit=999999&order=desc&sidx=createTime&token=${token}`, {
          cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c;
          })
        })
        .then(res => {
          let data = res.data
          if (res.status === 200 && data.code === 0) {
            vm.searchList = data.page.list
          }
        })
      }, 200)
  },
  data () {
    vm = this
    return {
      mode: '',
      sendMode: 'unsent',
      search: '',
      activeList:[],
      searchList:[],
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--
  容器适配，可以使用vw
  文本的适配，可以使用vw
  大于1px的边框、圆角、阴影都可以使用vw
  内距和外距，可以使用vw
-->
<style lang="postcss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
* {
  -webkit-tap-highlight-color:rgba(255,255,255,0)
}
.sms{
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  display: flex;
  width: 750px;
  height: 100vh;
  flex-direction: column;
}
.mode{
  flex: 0 0 auto;
  display: flex;
  padding: 20px 80px;
  /* flex-direction: column; */
}
.mode .left,.mode .center,.mode .right{
  width: 33.3333%;
  text-align: center;
  border: 1px solid dodgerblue;
  font-size: 14px;
  padding: 8px 16px;
}
.mode .left.active,.mode .center.active,.mode .right.active{
  background: dodgerblue;
  color: white;
}
.mode .left{
  border-right: none;
  border-radius: 5px 0 0 5px;
}
.mode .center{
  border-radius: 0;
}
.mode .right{
  border-left: none;
  border-radius: 0 5px 5px 0;
}
.top, .ignore{
  background: #f2f2f2;
  padding: 8px;
  word-wrap: break-word;
  word-break: break-all;
  flex: 0 0 auto;
}
.user{
  background-image: url(../assets/del.png);
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position: right;
  padding-right: 20px;
}
/* .user::after{
  content: '+';
  color: #777;
  display: inline-block;
  border-radius: 50%;
  border: 1px solid #777;
  font-size: 12px;
  line-height: 14px;
  width: 14px;
  height: 14px;
  text-align: center;
  font-weight: bolder;
  margin: 0 4px;
  transform:rotate(45deg);
  -ms-transform:rotate(45deg); 	
  -moz-transform:rotate(45deg); 
  -webkit-transform:rotate(45deg);
  -o-transform:rotate(45deg); 
} */
#search{
  position: absolute;
  top:-150px;
  left:-2000px;
  height:0;
}
#fakeInput{
  padding: 8px;
}
.ccc{
  color: #ccc;
}
.blue{
  color: dodgerblue;
}
.green{
  color: #42b983;
}
.searchList{
  padding: 0 8px;
  flex: 1 1 auto;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.suser, .ignore{
  padding: 8px;
  border-bottom: 1px solid #ccc;
}
.suser .right{
  float: right;
}
.submitWrap{
  flex: 0 0 auto;
  width: 100%;
  height: 40px;
}
.submit, .ignore{
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 40px;
  font-size: 18px;
  color: white;
  background: dodgerblue;
  border: 1px solid dodgerblue;
}
[aspectratio] {
  position: relative;
}
[aspectratio]::before {
  content: ''; display: block; width: 1px; margin-left: -1px; height: 0;
}
[aspectratio-content] {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%;
}
[w-188-246] {
  width: 188px;
  background-color: red;
}
[w-188-246] {
  aspect-ratio: '188:246';
} 
</style>
