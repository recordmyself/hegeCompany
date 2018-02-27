<template>
  <div id="main">
    <div id="FilterT">
        <InputArea />
    </div>  
    <!-- 引入按钮 -->
    <div id="ButtonT">
        <ButtonArea />
    </div>
    <!-- 表格以及组织展示 --> 
    <div class="clearfix">
        <div id="org-show">
            <el-tree accordion 
            :data="organizationTree" 
            highlight-current 
            :props="defaultProps" 
            @node-click="handleNodeClick" ></el-tree>
        </div>
        <div id="tableT"> 
            <TableArea />
        </div>
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

// 引入协议
// import { doMain.base } from '../../../service/ip'
import { doMain } from '../../../protocal/url'
import { OrganizationProtocal } from '../../../protocal/base/OrganizationProtocal'
import { PositionProtocal } from '../../../protocal/base/PositionProtocal'
// import { organization } from "../../../service/backstageService";
import { axiosHttpPost } from '../../../assets/js/axios'
//引入仓储
import { store } from "./store";
import { globalStore } from "../../base/store";
// 引入event bus
import bus from '../../base/bus'

//引入方法
import { handleSelect } from './event'
import { findButtonList } from '../../../assets/js/findButtonList'
import { resetCondition } from './event';

export default {
  components: {
    InputArea,ButtonArea,TableArea,DialogArea, Pading

  },
  data() {
    return {
        store,
        globalStore: globalStore,
        organizationTree: [{
                    id: null,
                    label: '全部组织机构',
                    children: [],
                }],
                defaultProps: {
                    children: 'children',
                }
                    
    }
  },
  methods: {
    getTotal() {
        bus.$emit('setTotalSignal')
        // if(this.$refs.getTotal) {
        //     this.$nextTick(() => {this.$refs.getTotal.setTotal()})
        // }else {
        //     setTimeout(() => {this.$refs.getTotal.setTotal()},2000)
        // }
    },
    tabView() {
      store.listLoading = true;  
      let request = OrganizationProtocal.list.request
      request = store.searchData
      request.page = globalStore.pages.page;
      request.rows = globalStore.pages.rows;
    //   console.log(request.createDate);
      if(request.createDate && request.createDate.length!=0 ) {
          request.startDate = request.createDate[0].getTime()
          request.endDate = request.createDate[1].getTime()
      }else {
        request.startDate = null
        request.endDate = null
      }
      //作传入后台的时间处理
      console.log(request);
      let _this = this;
      axiosHttpPost(this, doMain.base + OrganizationProtocal.list.rest, request, (res) => {
              console.log('结果');
              console.log(res);
              if(res.data.length==0) {
                  store.tableData = []
                  store.totalRows = 0;
                  store.listLoading = false;
                  return false;
              }
              store.tableData = res.data.result.list;
              store.totalRows = res.data.result.totalRows
              globalStore.pages.totalRows = res.data.result.totalRows;
              _this.getTotal();
              store.listLoading = false;
              this.getAllOrganization();
          })

    },
    remove(type) {
        let request = OrganizationProtocal.remove.request
        if(type == 'removeSingle') {
            request = store.removeMessage
        } 
        console.log(request);
        axiosHttpPost(this,doMain.base + OrganizationProtocal.remove.rest,request, (res) => {
                        if(res.data.status == 'OK') {
                            this.$message({ message: '删除成功', type: 'success' })
                            this.tabView()
                        }else {
                            this.$message({ message: res.data.message, type: 'error' })
                        }
                    })
    },
    stopUsing() {
        let request = OrganizationProtocal.blockUp.request
        request.idList = handleSelect()
        axiosHttpPost(this,doMain.base + OrganizationProtocal.blockUp.rest,request,(res) => {
                      if(res.data.status == 'FAIL') {
                          this.$message({ message:res.data.message, type: 'error' })
                      }else if(res.data.status == 'OK') {
                          this.$message({ message: '操作成功', type: 'success' })
                          this.tabView()
                      }
                  })
    },
    startUsing() {
        let request = OrganizationProtocal.registered.request
        request.idList = handleSelect()
        axiosHttpPost(this,doMain.base + OrganizationProtocal.registered.rest,request, (res) => {
                      if(res.data.status == 'FAIL') {
                          this.$message({ message: res.data.message ,type: 'error' })
                      }else if(res.data.status == 'OK') {
                          this.$message({ message: '操作成功', type: 'success' })
                          this.tabView()
                      }
                  })
    },
    busBaseSignal() {
        bus.$on('baseSignal', (res) => {
            switch(res) {
                case 'search':
                    this.tabView();
                    break;
                case 'reload':
                    this.tabView();
                    break;
                case 'removeSingle':
                    this.remove('removeSingle');
                    break;
                case 'stopUsing':
                    this.stopUsing()
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
                findButtonList('基础信息', '组织机构管理',this)
            })
        }else {
            findButtonList('基础信息', '组织机构管理',this) 
        }
    },
    getAllOrganization() {
        this.organizationTree[0].children = []
        console.log(globalStore.userInfo.companyId);
        if(globalStore.userInfo.companyId == 0) {
            let url = doMain.base + OrganizationProtocal.listTree.rest
            let request = OrganizationProtocal.listTree.request
            axiosHttpPost(this, url, request, (res) => {
                console.log('organization');
                console.log(res);
                // console.log(res.data);
                // if(JSON.stringify(res.data.result).length != 0 && res.data.result.label) {
                    if(res.data.result != 0) {
                        this.organizationTree[0].children = res.data.result
                    }else {
                        this.organizationTree[0].children = []
                    }
                    
                // }else {
                    // this.organizationTree[0].children = [];
                // }
            })
        }else {
            let url = doMain.base + PositionProtocal.listPosition.rest
            let request = PositionProtocal.listPosition.request
            // console.log(object);
            axiosHttpPost(this, url, request, (res) => {
                console.log('position');
                console.log(res);
                // console.log(res.data);
                if(JSON.stringify(res.data.result).length != 0 && res.data.result.label) {
                    this.organizationTree[0].children.push(res.data.result)
                }else {
                    this.organizationTree[0].children = [];
                }
                
                // console.log(this.organizationTree[0].children);
            })
        }
        
        
    },
    handleNodeClick(data) {
        console.log(data);
        store.listLoading = true;
        let url = OrganizationProtocal.list.rest;
        let request = OrganizationProtocal.list.request;
        if(!data.id) {
            request.name = null
        }else {
            request.name = data.label;
        }
        // request.name = 
        let _this = this;
        axiosHttpPost(this, doMain.base + OrganizationProtocal.list.rest, request, (res) => {
                console.log('结果');
                console.log(res);
                if(res.data.length==0) {
                    store.tableData = []
                    store.totalRows = 0;
                    store.listLoading = false;
                    return false;
                }
                store.tableData = res.data.result.list;
                // store.totalRows = res.data.result.totalRows
                // globalStore.pages.totalRows = res.data.result.totalRows;
                store.listLoading = false;
            })
    }
  },
  mounted() {
    resetCondition()
    //进入页面进行初次加载
    this.tabView()
    // this.getAllOrganization()
    this.busHaveData()
    this.busBaseSignal()
  },
  updated() {
    // this.getAllOrganization()
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
#tableT {
    width:calc(100% - 330px);
    /* width: 80%; */
    float: left;
}
#org-show {
    width: 300px;
    float: left;
    margin-left: 10px;
    margin-right: 10px;
    border: 1px solid #ccc;
    max-height: 400px;
    /* border-radius: 4px; */
} 
</style>
