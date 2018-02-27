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
    <!-- <el-button size="small" type="primary" @click="findAll" :disabled="globalStore.loading">查询</el-button>
    <el-button size="small" type="primary" @click="passTrue" :disabled="globalStore.loading||store.selNum">申请通过</el-button>
    <el-button size="small" type="primary" @click="passFalse" :disabled="globalStore.loading||store.selNum">申请驳回</el-button> -->
  </div>
</template>
<script>
import { globalStore } from "../../base/store";
import { store } from './store'
import { doMain } from '../../../protocal/url'
import { RegisterProtocal } from '../../../protocal/base/RegisterProtocal'
import { axiosHttpPost } from "../../../assets/js/axios";
export default {
  data() {
    return {
      globalStore,
      store
    };
  },
  methods: {
    findAll() {
      this.$emit("tabView");
    },
    passTrue() {
      let _this = this;
      let pass = true;
      let url = doMain.base + RegisterProtocal.registered.rest;
      let data = RegisterProtocal.registered.request;
          data.idList = [];
      this.store.multipleSelection.forEach((item)=> {
         if(item.state != 'UNREGISTERED'){
           this.$message.error({
             message: '有不符合状态的数据',
             duration: 1000
           })
           pass = false;
         }
          data.idList.push(item.id)
      });
      if(pass){
        axiosHttpPost(_this,url,data,(res)=>{
          _this.$emit('tabView');
          _this.$message.success('批量审批成功')
        })
      }
    },
    passFalse() {
      let _this = this;
      let back = true;
      let url = doMain.base + RegisterProtocal.blockUp.rest;
      let data = RegisterProtocal.blockUp.request;
          data.idList = [];
      this.store.multipleSelection.forEach((item)=> {
        if(item.state != 'UNREGISTERED'){
           this.$message.error({
             message: '有不符合状态的数据',
             duration: 1000
           })
           back = false
         }
          data.idList.push(item.id)
      });
      if(back){
        axiosHttpPost(_this,url,data,(res)=>{
          _this.$emit('tabView');
          _this.$message.success('批量驳回成功')
        })
      }
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
};
</script>
<style scoped>
#buttonArea {
  height: 60px;
  padding-left: 10px;
}
#buttonArea .el-button {
  width: 80px;
}
</style>
