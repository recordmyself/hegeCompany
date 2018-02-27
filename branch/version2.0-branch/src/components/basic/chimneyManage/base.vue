f<template>
  <div id="main">
    <div id="FilterT">
       <InputArea />
    </div>
    <!-- 引入按钮 -->
    <div id="ButtonT">
      <ButtonArea />
    </div>
    <!-- 表格 --> 
    <div id="tableT"> 
      <TableArea @tabView = 'tabView'/>
    </div>
    <div id="paging">
        <Pading @tabView = 'tabView' ref='getTotal' />
    </div>
    <div id="dialogT">
        <DialogArea @tabView = 'tabView'/>
    </div>
  </div>
</template>
<script>
import InputArea from './input.vue'
import ButtonArea from './button.vue'
import  TableArea from './table'
import DialogArea from './dialog'
import Pading from "../../../components/base/paging";

// 引入协议
// import { doMain.base } from '../../../service/ip'
import { doMain } from '../../../protocal/url'
// import { boiler, boilerHouse } from "../../../service/backstageService";
import { PositionProtocal } from "../../../protocal/base/PositionProtocal"
import { BoilerhouseProtocal } from "../../../protocal/base/BoilerHouseProtocal"
import { ChimneyProtocal } from "../../../protocal/base/ChimneyProtocal"
import { axiosHttpPost } from '../../../assets/js/axios'

import { store } from "./store";
import { globalStore } from "../../base/store";
// 引入event bus
import bus from '../../base/bus'
//引入共同方法
import { findButtonListMore } from '../../../assets/js/findButtonList'
import { resetCondition } from './event'

export default {
  components: {
    InputArea,ButtonArea,TableArea,DialogArea,Pading
  },
  data() {
      return {
        store,
        globalStore: globalStore     
      }
  },
  methods: {
    getTotal() {
      bus.$emit('setTotalSignal')
    },
    tabView() {
      store.listLoading = true;  
      let request = ChimneyProtocal.list.request;
      request = store.searchData;
      request.page = globalStore.pages.page;
      request.rows = globalStore.pages.rows;
      if(request.eventTime && request.eventTime.length != 0) {
          request.startDate = request.eventTime[0].getTime()
          request.endDate = request.eventTime[1].getTime()
      }else {
          request.startDate = null
          request.endDate = null
      }
      let _this = this;
      // console.log(request);
      // console.log('发送了');
      // console.log(ChimneyProtocal.list.rest);
      axiosHttpPost(this, doMain.base + ChimneyProtocal.list.rest, request,(res) => {
            if(res.data.length != 0 && res.data.status == 'OK') {
              store.tableData = res.data.result.list;
              globalStore.pages.totalRows = res.data.result.totalRows;
              _this.getTotal();
              // _this.getCompanyOptions();
              //获取上部搜索下拉框的数据
              // this.getCompanyOptions();
              // this.getHeatStationOptions();
              //-----
              // store.listLoading = false;
            }else {
              store.tableData = []
              globalStore.pages.totalRows = 0;
              
            }
            store.listLoading = false;
            console.log('有结果了');
            console.log(res);
          })
    },
    remove(type) {
      let request = ChimneyProtocal.remove.request
      if(type == "singleRemove") {
        request.id = globalStore.singleId 
      }
      let _this = this
      axiosHttpPost(this, doMain.base + ChimneyProtocal.remove.rest, request, (res) => {
                  if(res.data.status == 'OK') {
                      this.$message({
                        message: '删除操作成功',
                        type: 'success'
                      })
                  _this.tabView();
                  }else {
                      this.$message({
                        message: res.data.message,
                        type: 'error'
                      })
                  }
                })
    },
    busBaseSignal() {
        bus.$on('baseSignal',(res)=>{
            switch(res){
              case 'singleRemove':
                this.remove('singleRemove');
                break;
              case 'reload':
                this.tabView();
                break;
              case 'search':
                this.tabView();
                break;
            } 
        })
    },
    busHaveData() {
        let menuList = this.globalStore.menuList
        console.log(menuList);
        if(menuList.length == 0) {
            bus.$on('haveData', () => {
                findButtonListMore('基础信息', '烟囱管理中心','烟囱管理', this)
            })
        }else {
            findButtonListMore('基础信息', '烟囱管理中心','烟囱管理', this) 
        }
    }
  },
  mounted() { 
    resetCondition()
    //进入页面进行初次加载
    this.tabView();
    //bus监听区
    this.busBaseSignal()
    this.busHaveData();
  }
}
</script>
<style scoped>
#main{
  width: 100%;
  height: 100%;
  background: #FFF;
}
#FilterT::before,#FilterT::after {
    content: '';
    display: block;
    height: 0;
    visibility: hidden;
    clear: both;
} 
#ButtonT{
  margin: 0px auto 10px;
  padding-left: 10px;
}
#paging {
  text-align: center;
  margin-top: 10px;
  height: 40px;
  line-height: 40px;
}
</style>
