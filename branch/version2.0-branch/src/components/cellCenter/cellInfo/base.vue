<template>
  <div id="Base">
    <div style="height: 100%;">
      <div class="headTop">
        <span style="font-size: 14px">报警信息查询</span>
      </div>
      <!-- 引入输入文本 -->
      <div id="FilterT">
        <InputArea />
      </div>
      <!-- 引入按钮 -->
      <div id="ButtonT">
        <ButtonArea  @tabView='tabView' />
      </div>
      <!-- 表格 -->
      <div id="tableT">
        <TableArea />
      </div>
      <!-- 分页 -->
    <div id="paging">
      <Pading  @tabView='tabView'  ref='getTotal' />
    </div>
    </div>
  </div>
</template>
<script>
// 引入子组件
import InputArea from './input.vue'
import ButtonArea from './button.vue'
import  TableArea from './table'
import Pading from '../../../components/base/paging.vue'
// 引入协议
import { axiosHttpPost } from '../../../assets/js/axios'
import { doMain } from "../../../protocal/url";
import { AlarmInfoProtocal } from '../../../protocal/web/AlarmInfoProtocal'
import { BoilerHouserProtocal } from '../../../protocal/web/BoilerHouserProtocal'

import { store } from './store'
import { globalStore } from "../../base/store";
import { findButtonList } from '../../../assets/js/findButtonList'
import bus from '../../base/bus'

export default {
  components: {
    InputArea,ButtonArea,TableArea,Pading
  },
  data() {
    return {
      store,
      globalStore: globalStore
    }
  },
  methods: {
    getTotal() {
      this.$refs.getTotal.setTotal();
    },
    // 请求数据
    tabView() {
      let _this = this;
      let url = doMain.web + AlarmInfoProtocal.list.rest;
      let data = AlarmInfoProtocal.list.request;
      globalStore.loading = true
      data.page = globalStore.pages.page;
      data.rows = globalStore.pages.rows;
      // 这里改变输入查询条件
      if (store.form.date != null) {
        data.startTime = new Date(_this.store.form.date[0]).getTime();
        data.endTime = new Date(_this.store.form.date[1]).getTime();
      }else{
        data.startTime = null;
        data.endTime = null;
      }
        data.boilerName = this.store.form.boileroom;
        data.parameter = this.store.form.type;
        data.level = this.store.form.levelId;
      axiosHttpPost(this,url,data,function(res){
        console.log('123456',res)
        if(res.data.status == 'FAIL'){
          _this.$message.warning(res.data.message);
          _this.store.tableData = [];
          _this.globalStore.pages.totalRows = 0;
        }else{
          _this.store.tableData = res.data.result.list;
          _this.globalStore.pages.totalRows = res.data.result.totalRows;
        }
        _this.getTotal();
        _this.globalStore.loading = false
      })
    },
    busHaveData() {
        let menuList = this.globalStore.menuList
        if(menuList.length == 0) {
            bus.$on('haveData', () => {
                findButtonList('报警中心', '报警信息',this)
            })
        }else {
            findButtonList('报警中心', '报警信息',this)
        }
    }
  },
  created(){
    this.store.form = {
      date: '',
      boileroom: '',
      level: '',
      type: '',

      boilerId: '',
      levelId:''

    }
    let _this = this;
    let url = doMain.web + BoilerHouserProtocal.getAllBoilerHourse.rest;
    let data = BoilerHouserProtocal.getAllBoilerHourse.request;
    axiosHttpPost(this,url,data,function(res){
      for(let i of res.data.result){
        i.value = i.boiler
      }
      _this.store.restaurantsS = res.data.result;
    });
  },
  mounted(){
     this.tabView();
     this.busHaveData();
  },
  computed:{
    type(){
      return this.store.form.type
    },
    boileroom(){
      return this.store.form.boileroom
    },
    level(){
      return this.store.form.level
    }
  },
  watch:{
    boileroom(newValue,oldValue){
      if(newValue == ''){
        this.store.form.boilerId = ''
      }else{
        this.store.restaurantsS.forEach((item)=>{
          if(item.boiler == newValue){
            console.log(item.id)
            this.store.form.boilerId = item.id
          }else{
            this.store.form.boilerId = 101;

          }
        })
      }
    },
    level(newValue,oldValue){
      if(newValue == ''){
        this.store.form.levelId = ''
      }else{
        this.store.options.forEach((item)=>{
          if(newValue == item.value){
            this.store.form.levelId = item.label
          }
        })
      }
    }
  }
}
</script>
<style scoped>
#Base{
  width: 100%;
  height: 100%;
  background: #FFF;
}
#Base .headTop{
  width: 100%;
  height: 5%;
  line-height: 35px;
  background: #f8f8f8;
  color: black;
  padding-left: 35px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ebebeb;
}
#ButtonT{
  margin: 0px auto 10px;
  padding-left: 10px;
}
#paging{
  text-align: center;
  margin-top: 10px;
  height: 40px;
  line-height: 40px;
   background: #FFF;
}
</style>
