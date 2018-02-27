<template>
  <div id="confirmReg">
    <div id="confirmReg_top">
       <span style="font-size: 14px">注册审批</span>
    </div>
    <div id="input">
      <InputArea />
    </div>
    <div id="button">
      <ButtonArae @tabView='tabView'/>
    </div>
    <div id="table">
      <TableArea @tabView='tabView'/>
    </div>
    <div id="piging">
      <Paging @tabView='tabView'  ref='getTotal'/>
    </div>
  </div>
</template>
<script>
// 引入子组件
import InputArea from './input.vue'
import TableArea from './table.vue'
import ButtonArae from './button.vue'
import Paging from '../../base/paging.vue'
import bus from '../../base/bus'

import { axiosHttpPost } from '../../../assets/js/axios'
import { doMain } from '../../../protocal/url'
import { RegisterProtocal } from '../../../protocal/base/RegisterProtocal'
import { store } from './store'
import { globalStore } from '../../base/store'
import { findButtonList } from "../../../assets/js/findButtonList";
export default {
  components:{
    InputArea,TableArea,ButtonArae,Paging
  },
  data(){
    return {
      store,
      globalStore,
    }
  },
  methods:{
    getTotal() {
      this.$refs.getTotal.setTotal();
    },
    tabView(){
      let _this = this;
      let url = doMain.base + RegisterProtocal.list.rest;
      let data = RegisterProtocal.list.request;
          data.page = this.globalStore.pages.page;
          data.rows = this.globalStore.pages.rows;
      if (store.date != null) {
          data.startDate = new Date(store.date[0]).getTime();
          data.endDate = new Date(store.date[1]).getTime();
        }else{
          data.startDate = null;
          data.endDate = null;
        }
        data.state = store.status;
      axiosHttpPost(this,url,data,function(res){
         console.log('注册记录',res)
          _this.store.tableData = res.data.result.list;
          _this.globalStore.pages.totalRows = res.data.result.totalRows;
          _this.globalStore.loading = false;
          _this.getTotal();
      })
    },
    busHaveData() {
      let menuList = this.globalStore.menuList;
      if (menuList.length == 0) {
        bus.$on("haveData", () => {
          findButtonList("注册管理", "注册审批", this);
        });
      } else {
        findButtonList("注册管理", "注册审批", this);
      }
    }
  },
  created(){
    this.tabView();
  },
  mounted(){
    this.busHaveData();
  }
}
</script>
<style scoped>
#confirmReg{
  width: 100%;
  height: 100%;
  background: #FFF;
}
#confirmReg_top{
  height: 4.5%;
  line-height: 40px;
  font-size: 16px;
  color: black;
  padding-left: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ebebeb;
  background: #f8f8f8;
}
#paging{
  text-align: center;
  height: 30px;
  line-height: 30px;
  margin-top: 10px;
  background: #FFF
}
</style>
