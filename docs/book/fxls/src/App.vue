<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <input id="file" type="file" @change="upFile($event)" value="上传" multiple/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'
import XLSX from 'xlsx'

export default {
  name: 'app',
  data () {
    return {
      files: ''
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    upFile (e) {
      var files = e.target.files
      for (var i = 0; i < files.length; i++) {
          let file = files[i]
          let reader = new FileReader()
          reader.readAsArrayBuffer(file)
          reader.onload = function (e) {
            var workbook = XLSX.read(this.result, {type:"array"})
            var Sheets = workbook.Sheets
            for (var sheet in Sheets) {
              var sheetJson = XLSX.utils.sheet_to_json(Sheets[sheet])
              for (var i in sheetJson) {
                sheetJson[i].年龄 = Math.round((new Date()-new Date(sheetJson[i]['年龄/出生日期']))/1000/60/60/24/365)
                sheetJson[i].生日 = sheetJson[i]['年龄/出生日期']
                sheetJson[i].手机号码 = sheetJson[i]['手机号']
                sheetJson[i].手机 = sheetJson[i]['手机号']
                // delete sheetJson[i]['年龄/出生日期']
                // delete sheetJson[i]['手机号']
                sheetJson[i].分公司代码 = 62
                sheetJson[i].下单日期 = sheetJson[i]['登录时间']
                sheetJson[i].省 = sheetJson[i]['省份']
                sheetJson[i].市 = sheetJson[i]['城市']

                sheetJson[i].证件号码 = sheetJson[i]['身份证号']

                //delete sheetJson[i]['身份证号']
                if (sheetJson[i].性别 === '男') {
                  sheetJson[i].性别 = 0
                } else if (sheetJson[i].性别 === '女') {
                  sheetJson[i].性别 = 1
                }
              }
              Sheets[sheet] = XLSX.utils.json_to_sheet(sheetJson)
            }
            workbook.Sheets = Sheets
            console.log(workbook)
            axios.post('http://localhost:3000/a', {wb: workbook})
            // XLSX.writeFile(workbook, file.name, { bookType: 'xlml', bookSST:true, type: 'base64'})
          }
      }
    }
  },
  created () {
    // axios.post('http://localhost:3000/a', {a: 2})
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
