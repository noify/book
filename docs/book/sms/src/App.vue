<template>
  <div id="app">
    <sms msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import sms from './components/sms.vue'

export default {
  name: 'app',
  components: {
    sms
  }
}
</script>

<style>
html, body{
  margin: 0px;
  width: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
