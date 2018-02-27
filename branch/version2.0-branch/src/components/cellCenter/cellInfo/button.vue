<template>
  <div id="buttonArea">
    <el-button
      v-for="item in store.buttonListArr"
      :key="item.id" v-if="item.isDynamic == false"
      :type="item.type" size="small" :icon="item.icon"
      @click="handleFunctionName(item)"
      :disabled="toDisable(item.disabled)">
      {{item.name}}
    </el-button>
  </div>
</template>
<script>
import { store } from './store'
import { globalStore } from '../../base/store'
import bus from '../../base/bus'
import { Download } from '../../../assets/js/Download'
export default {
  data(){
    return {
      store,
      globalStore
    }
  },
  methods:{
    findSelet(){
      this.$emit('tabView')
    },
    // 导出数据
    handleDownload(){
      let arr = [];
      this.store.multipleSelection.forEach((item)=>{
        let a = {};
        for(let key in item){
          a[key] = item[key]
        }
        a.revTime = new Date(a.revTime).getFullYear() + '-' + Number(new Date(a.revTime).getMonth()+1) + '-' + new Date(a.revTime).getDate();
        if(a.level == 1001){
          a.level = '高'
        }else{
          a.level = '低'
        }
        arr.push(a)
      })
      this.store.multipleSelection = arr;
      Download(this,this.store)
    },
    handleFunctionName(item) {
        let name = item.url.split('/')[item.url.split('/').length-1]
        eval("this."+name+"();")
    },
    toDisable(a){
      if(a == 'globalStore.loading'){
        return globalStore.loading;
      }else{
        return globalStore.loading||store.selNum
      }
    },
  }
}
</script>
<style scoped>
#ButtonT .el-button{
  width:80px;
}
</style>
