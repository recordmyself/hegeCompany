<template>
  <div id="main">
    <!-- 引入输入文本 -->
    <div id="FilterT">
      <InputArea />
    </div>
    <!-- 引入按钮 -->
    <div id="ButtonT">
      <ButtonArea />
    </div>
    <!-- 表格 --> 
    <div id="tableT"> 
      <TableArea />
    </div>
    <div id="paging">
        <Pading @tabView = 'tabView' ref='getTotal' />
    </div>
    <div id="dialogT">
        <DialogArea  @tabView = 'tabView'/>
    </div>
  </div>
</template>
<script>
import InputArea from './input.vue'
import ButtonArea from './button.vue'
import  TableArea from './table'
import DialogArea from './dialog'
import Pading from "../../../components/base/paging";

// import { doMain.base } from '../../../service/ip'
import { doMain } from '../../../protocal/url'
// import { customer } from "../../../service/backstageService";
import { CustomerProtocal } from '../../../protocal/base/CustomerProtocal'
import { axiosHttpPost } from '../../../assets/js/axios'

import { store } from "./store";
import { globalStore } from "../../base/store";
// 引入event bus
import bus from '../../base/bus'
import { handleSelect,resetCondition } from './event'
import { findButtonList } from '../../../assets/js/findButtonList'

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
      // this.$refs.getTotal.setTotal()
    },
    tabView() {
      store.listLoading = true;  
      let request = CustomerProtocal.list.request 
      request = store.searchData;
      request.page = globalStore.pages.page;
      request.rows = globalStore.pages.rows;
      if(request.createDate) {
          request.startDate = new Date(request.createDate[0]).getTime()
          request.endDate = new Date(request.createDate[1]).getTime()
      }else {
          request.startDate = null
          request.endDate = null
      }
      
      // console.log(request); 
      let _this = this;
      axiosHttpPost(this, doMain.base + CustomerProtocal.list.rest, request,(res) => {
        console.log('客户管理数据');
            console.log(res);
              if(res.data.length==0) {
                  store.tableData = []
                  store.totalRows = 0;
                  store.listLoading = false;
                  return false;
              }
            
            store.tableData = res.data.result.list;
            // for(let i = 0; i < store.tableData.length; i++) {
            //     let item = store.tableData[i];
            //     if(new Date(item.endTime).getTime() < new Date().getTime()) {
            //         item.stateView = '已过期'
            //     }
            // }
            store.totalRows = res.data.result.totalRows 
            globalStore.pages.totalRows = res.data.result.totalRows;
            store.listLoading = false;
            // store.superiorCompanyOptions 
            // 进行所有所属公司的赋值
            let result = store.tableData
            store.superiorCompanyOptions = [];
            let companyArrAll = [];
            result.forEach((item) => {
                companyArrAll.push(item.affiliatedCompany)
            })
            let companyFilter = [...new Set(companyArrAll)]
            companyFilter.forEach((item) => {
                store.superiorCompanyOptions.push({label: item, value: item })
            })
            //---------
            _this.getTotal();
          })
    },
    getSuperiorCompanyOptions() {

    },
    startUsing(type) {
      let request = CustomerProtocal.registered.request
        if(type == 'startSelected') {
          CustomerProtocal.registered.request.idList = handleSelect()
        } 
        else {
          let idList = [];
          idList.push(store.singleId)
          CustomerProtocal.registered.request.idList = idList
        }
        // request.idList = handleSelect()
        console.log(request); 
        axiosHttpPost(this, doMain.base + CustomerProtocal.registered.rest,request,(res) => {
                      console.log(res);
                      if(res.data.status == 'FAIL') {
                          this.$message({ message: res.data.message,type: 'error' })
                      }else if(res.data.status == 'OK') {
                          this.$message({ message: '操作成功', type: 'success' })
                          this.tabView()
                      }
                  })
    },
    stopUsing(type) {
      let request = CustomerProtocal.blockUp.request
      if(type == 'stopSelected') {
          CustomerProtocal.blockUp.request.idList = handleSelect()
      }
      else {
        let idList = [];
        idList.push(store.singleId)
        CustomerProtocal.blockUp.request.idList = idList
      }
        console.log(request);
        axiosHttpPost(this, doMain.base + CustomerProtocal.blockUp.rest,request,(res) => {
                      console.log(res);
                      if(res.data.status == 'FAIL') {
                          this.$message({ message: res.data.message, type: 'error' })
                      }else if(res.data.status == 'OK') {
                          this.$message({ message: '操作成功', type: 'success' })
                          this.tabView()
                      }
                  })
    },
    remove(type) {
      let request = CustomerProtocal.remove.request
      let url = doMain.base + CustomerProtocal.remove.rest
      if(type == 'removeSelected') {
          request.idList = handleSelect()
      } else if (type == 'removeSingle') {
          let idList = [];
          idList.push(store.singleId)
          request.idList = idList
      }
      axiosHttpPost(this, url, request,(res) => {
            if(res.data.status == 'OK') {
                this.$message({ message: '删除成功', type: 'success' })
                this.tabView()
            }else {
                this.$message({ message: res.data.message, type: 'error' })
            }
      })
    },
    busBaseSignal() {
        bus.$on('baseSignal',(res) => {
            switch(res) {
              case 'search':
                this.tabView();
                break;
              case 'startUsing':
                this.startUsing('startSelected');
                break;
              case 'stopUsing':
                this.stopUsing('stopSelected');
                break;
              case 'singleStartUsing':
                this.startUsing('startSingle');
                break;
              case 'singleStopUsing':
                this.stopUsing('stopSingle');
                break;
              case 'reload':
                this.tabView();
                break;
              case 'remove':
                this.remove('removeSelected');
                break;
              case 'removeSingle':
                this.remove('removeSingle');
                break;
            }
        })
    },
    busHaveData() {
        let menuList = this.globalStore.menuList
        if(menuList.length == 0) {
            bus.$on('haveData', () => {
                findButtonList('基础信息', '客户管理',this)
            })
        }else {
            findButtonList('基础信息', '客户管理',this) 
        }
    }
  },
  mounted() { 
    resetCondition()
    //进入页面进行初次加载
    this.tabView()
    this.busBaseSignal()
    this.busHaveData()
  }
}
</script>
<style scoped>
#main{
  width: 100%;
  height: 100%;
  background: #FFF;
}
#main .headTop{
  height: 5%;
  background: #f8f8f8;
}
#FilterT{
  /* margin-top: 10px; */
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
