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
  </div>
</template>
<script>
//引入子组件
import InputArea from './input.vue'
import ButtonArea from './button.vue'
import TableArea from './table'
import DialogArea from './dialog'
import Pading from "../../../components/base/paging";

// 引入协议
// import { doMain.base } from '../../../service/ip'
import { doMain } from "../../../protocal/url"
import { UserProtocal } from "../../../protocal/base/UserProtocal";
import { RoleProtocal } from "../../../protocal/base/RoleProtocal";
import { axiosHttpPost } from '../../../assets/js/axios'

// 引入仓库
import { store } from "./store";
import { globalStore } from "../../base/store";
// 引入event bus
import bus from '../../base/bus'
//引入共有函数
import { handleSelect,resetCondition } from './event'
import { findButtonList } from '../../../assets/js/findButtonList'
export default {

  components: {
      InputArea,
      ButtonArea,
      TableArea,
      DialogArea,
      Pading
  },
  data() {
    return {
        store,
        globalStore: globalStore
    }
  },
  methods: {
    //重置选择区数据
    init() {
      bus.$emit('tableSignal', 'clearSelection')
    },
    getTotal() {
        bus.$emit('setTotalSignal')
    },
    //页面数据重载/加载/查询
    tabView() {
        store.listLoading = true;  
        let request =  UserProtocal.list.request
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
        if(request.endDate2) {
                request.endDate2 = new Date(request.endDate2).getTime()
        }else {
            request.endDate2 = null
        }
        let _this = this;
        axiosHttpPost(this, doMain.base + UserProtocal.list.rest, request,(res) => {
            console.log('用户数据');
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
    //表单提交
    createData() {
    },
    //停用
    ban() {
        let request = UserProtocal.blockUp.request
        request.idList = handleSelect()
        axiosHttpPost(this,doMain.base + UserProtocal.blockUp.rest,request,(res) => {
            if(res.data.status == 'FAIL') {
                this.$message({ message: res.data.message, type: 'error' })
            }else if(res.data.status == 'OK') {
                this.$message({ message: '操作成功', type: 'success' })
                this.tabView()
            }
        })
    },
    //审批不通过
    unregistered() {
        let request = UserProtocal.unregistered.request
        request.idList = handleSelect()
        axiosHttpPost(this,doMain.base + UserProtocal.unregistered.rest,request,(res) => {
                      if(res.data.status == 'FAIL') {
                          this.$message({ message: res.data.message, type: 'error' })
                      }else if(res.data.status == 'OK') {
                          this.$message({ message: '操作成功', type: 'success' })
                          this.tabView()
                      }
        })
    },
    //审批通过
    enable() {
        let request = UserProtocal.startUsing.request
        request.idList = handleSelect()
        console.log(request.idList);
        axiosHttpPost(this,doMain.base + UserProtocal.startUsing.rest,request,(res) => {
            console.log('审批通过返回的数据');
            console.log(res);
            if(res.data.status == 'FAIL') {
                this.$message({ message: res.data.message,type: 'error' })
            }else if(res.data.status == 'OK') {
                this.$message({ message: '操作成功', type: 'success' })
                this.tabView()
            }
        })
    },
    //启用
    startUsing() {
        let request = UserProtocal.enable.request
        let url = doMain.base + UserProtocal.enable.rest
        request.idList = handleSelect()
        axiosHttpPost(this,url, request, (res) => {
            if(res.data.status == 'FAIL') {
                this.$message({ message: res.data.message,type: 'error' })
            }else if(res.data.status == 'OK') {
                this.$message({ message: '操作成功', type: 'success' })
                this.tabView()
            }
        })
    },
    //重置密码
    resetPassword() {
      if(store.multipleSelection.length > 1) {
          this.$message({ message: '一次只能操作一位用户', type: 'error' })
          return false;
      }else {
          let id = store.multipleSelection[0].id
          this.$prompt('请输入重置后的密码', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              placeholder:'请输入密码',
              inputType: 'password',
              inputPattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
              inputErrorMessage: '必须包含中文和字母的8~16位'
          }).then(({ value }) => {
              let request = UserProtocal.refreshPassword.request
              request.id = id;
              request.password = value
              axiosHttpPost(this,doMain.base + UserProtocal.refreshPassword.rest, request,(res) => {
                    // console.log(request);
                    if(res.data.status == 'FAIL') {
                        this.$message({message:res.data.message,type:'error'})
                        this.init()
                    }else if(res.data.status == 'OK'){
                        this.$message({message:'重置密码成功',type:'success'})
                        this.tabView()
                        this.init()
                    }
              })
          })
      }
      
    },
    //删除
    remove(type) {
      let request = UserProtocal.remove.request
      if(type == 'removeSelected') {
          request.idList = handleSelect()
      } else if (type == 'removeSingle') {
          let idList = [];
          idList.push(store.singleId)
          request.idList = idList
      }
      axiosHttpPost(this,doMain.base + UserProtocal.remove.rest,request,(res) => {
            if(res.data.status == 'OK') {
                this.$message({ message: '删除成功', type: 'success' })
                this.tabView()
            }else if(res.data.status == 'FAIL'){
                this.$message({ message: res.data.message, type: 'error' })
            }
      })
    },
    getRoleName() {
        let request  = RoleProtocal.list.request
        request.rows = 10000;
        axiosHttpPost(this,doMain.base + RoleProtocal.list.rest, request,(res) => {
            if(res.data.status == 'OK') {
                store.roleNameOptions = [];
                res.data.result.list.forEach((item) => {
                    store.roleNameOptions.push({label: item.name, value: item.name,id: item.id })
                })
            }
            // console.log(res);
        })
    },
    busBaseSignal() {
        bus.$on('baseSignal', (res)=> {
            switch(res) {
                case 'resetPassword':
                    this.resetPassword()
                    break;
                case 'search': 
                    this.tabView()
                    break;
                case 'reload': 
                    this.tabView()
                    break;
                case 'ban':
                    this.ban()
                    break;
                case 'enable':
                    this.enable()
                    break;
                case 'remove':
                    this.remove('removeSelected')
                    break;
                case 'removeSingle':
                    this.remove('removeSingle')
                    break;
                case 'unregistered':
                    this.unregistered()
                    break;
                case 'startUsing':
                    this.startUsing()
                    break;
            }
        })
    },
    busHaveData() {
        let menuList = this.globalStore.menuList
        if(menuList.length == 0) {
            bus.$on('haveData', () => {
                findButtonList('系统权限', '用户管理',this)
            })
        }else {
            findButtonList('系统权限', '用户管理',this) 
        }
    }
  },
  created() {
      resetCondition()
  },
  mounted() { 
    //进入页面进行初次加载
    this.tabView();
    this.getRoleName();
    this.busBaseSignal();
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
