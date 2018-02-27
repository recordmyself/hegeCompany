<template>
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
      <TableArea />
    </div>
    <div id="paging">
        <Pading @tabView = 'tabView' ref='getTotal' />
    </div>
    <div id="dialogT">
        <DialogArea  @tabView = 'tabView'/>
    </div>
    <div id="dialogAuth">
        <DialogAuth  @tabView = 'tabView'/>
    </div>
  </div>
</template>
<script>
//引入子组件
import InputArea from './input.vue'
import ButtonArea from './button.vue'
import TableArea from './table'
import DialogArea from './dialog'
import DialogAuth from './setAuthor'
import Pading from "../../../components/base/paging";

// 引入协议
import { doMain } from '../../../protocal/url'
// import { role } from "../../../service/backstageService";
import { RoleProtocal } from "../../../protocal/base/RoleProtocal"
import { axiosHttpPost } from '../../../assets/js/axios'

// 引入仓库
import { store } from "./store";
import { globalStore } from "../../base/store";
//引入共有函数
import bus from '../../base/bus'
import { cookie } from '../../../assets/js/cookie'
import { findButtonList } from '../../../assets/js/findButtonList'
import { resetCondition } from '../../permission/roleManage/event';
export default {
  components: {
      InputArea,
      ButtonArea,
      TableArea,
      DialogArea,
      Pading,
      DialogAuth
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
      // console.log(store.searchData);
      store.listLoading = true;  
      let request = RoleProtocal.list.request 
      request = store.searchData;
      request.page = globalStore.pages.page;
      request.rows = globalStore.pages.rows;
      request.createDate = request.createDate || []
      
      if(request.createDate.length != 0) {
          request.startDate = new Date(request.createDate[0]).getTime()
          request.endDate = new Date(request.createDate[1]).getTime()
      }else {
        request.startDate = null;
        request.endDate = null;
      }
      let _this = this;
      // console.log(request);
      axiosHttpPost( this, doMain.base + RoleProtocal.list.rest, request,(res) => {
            // console.log(request); 
            console.log(res);
            if(res.data.length != 0) {
                store.tableData = res.data.result.list;
                globalStore.pages.totalRows = res.data.result.totalRows;
            }else {
                store.tableData = [];
                globalStore.pages.totalRows = 0;
            }
            store.listLoading = false;
            _this.getTotal();
          })

    },
    removeSingle() {
        RoleProtocal.remove.request.id = store.singleId 
        axiosHttpPost(this,doMain.base + RoleProtocal.remove.rest, RoleProtocal.remove.request,(res) => {
                    if(res.data.status == 'OK') {
                        this.$message({ message: '删除成功', type: 'success' })
                        this.tabView()
                    }else if (res.data.status == 'FAIL'){
                        this.$message({ message: res.data.message, type: 'error' }) 
                    }
                })
    },
    createData(){
      RoleProtocal.create.request = store.form
      store.buttonLoading = true;
      axiosHttpPost(this,doMain.base + RoleProtocal.create.rest, RoleProtocal.create.request,(res) => {
                    console.log(res);
                    if(res.data.status == 'OK') {
                        this.$message({ message: '创建成功', type: 'success' })
                        this.tabView()
                        store.buttonLoading = false;
                        store.dialogFormVisible = false;
                    }else {
                        this.$message({ message: '创建失败', type: 'error' })
                    }
                })
    },
    busBaseSignal() {
        bus.$on('baseSignal',(res) => {
            switch(res) {
                case 'search':
                  this.tabView();
                  break;
                case 'removeSingle':
                  this.removeSingle();
                  break;
                case 'createData':
                  this.createData();
                  break;
                case 'singleModify':
                  this.singleModify();
                  break;
                case 'reload':
                  this.tabView();
                  break;
            }
        })
    },
    busHaveData() {
        let menuList = this.globalStore.menuList
        if(menuList.length == 0) {
          bus.$on('haveData', () => {
              findButtonList('系统权限', '角色管理',this)
          })
        }else {
          findButtonList('系统权限', '角色管理',this) 
        }
    }
  },
  created() {
    resetCondition();
  },
  mounted() { 
    //进入页面进行初次加载
      this.tabView()
      store.passport = cookie.getCookie('user')
      this.busBaseSignal(),
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
