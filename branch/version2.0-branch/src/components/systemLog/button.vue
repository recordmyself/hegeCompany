<template>
  <div id="buttonArea">
    <el-button type="primary" size="small" @click="findAll" :disabled="globalStore.loading">查询</el-button>
    <el-button type="success" size="small" @click="downLoadFile" :disabled="globalStore.loading||store.selNum" :loading="store.downloadLoading">导出</el-button>
  </div>
</template>
<script>
import $ from 'jquery'
import { store } from './store'
import { globalStore } from '../base/store'
import { axiosHttpGet,axiosHttpPost } from '../../assets/js/axios'
import { urlApiC } from '../../service/ip'
import { server } from '../../service/realDataService'
import { Download } from '../../assets/js/Download'
export default {
  data() {
    return {
      store,
      globalStore,
    }
  },
  methods:{
    findAll(){
      this.$emit('tabView');
    },
    downLoadFile(){
      let arr = [];
      this.store.multipleSelection.forEach((item)=>{
        let a = {};
        for(let key in item){
          a[key] = item[key]
        }
        a.createDate = new Date(a.createDate).getFullYear() + '-' + Number(new Date(a.createDate).getMonth()+1) + '-' + new Date(a.createDate).getDate();
        arr.push(a)
      })
      this.store.multipleSelection = arr;
      Download(this,this.store)
    }
  }
}
</script>
<style scoped>
#ButtonT .el-button {
  width: 80px;
}
#ButtonT .search {
  float: right;
  margin-right: 5%;
  display: inline-block;
  width: 500px;
}
</style>
