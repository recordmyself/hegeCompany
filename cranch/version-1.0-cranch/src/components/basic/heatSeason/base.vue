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
        <DialogArea  @tabView = 'tabView' />
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
import { urlApiZ } from '../../../service/ip'
import { heatingSeason } from "../../../service/backstageService";
import { axiosHttpPost } from '../../../assets/js/axios'

// 引入仓库
import { store } from "./store";
import { globalStore } from "../../base/store";
// 引入event bus
import bus from '../../base/bus'
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
      let request =  heatingSeason.list.request
      request = store.searchData;
      request.page = globalStore.pages.page;
      request.rows = globalStore.pages.rows;
      if(request.createDate.length!= 0) {
        request.startDate = request.createDate[0].getTime()
        request.endDate = request.createDate[1].getTime()
      }
    //   console.log(request);
      let _this = this;
      axiosHttpPost(this, urlApiZ + heatingSeason.list.rest, request, (res) => {
            // console.log(res);
            store.tableData = res.data.result.list;
            globalStore.pages.totalRows = res.data.result.totalRows;
            store.listLoading = false;
            _this.getTotal();
          })
          // .then((res) => {
          //   // console.log(res);
          //   store.tableData = res.data.result.list;
          //   globalStore.pages.totalRows = res.data.result.totalRows;
          //   store.listLoading = false;
          //   _this.getTotal();
          // })
    },
    //删除
    remove(type) {
      let request = heatingSeason.remove.request
      if(type == 'removeSingle') {
          request.id = globalStore.singleId
      } 
      axiosHttpPost(this,urlApiZ + heatingSeason.remove.rest,request, (res) => {
                      if(res.data.status == 'OK') {
                          this.$message({ message: '删除成功', type: 'success' })
                          this.tabView()
                      }else {
                          this.$message({ message: '删除失败请重新操作', type: 'error' })
                      }
                  })
    },
    busBaseSignal() {
        bus.$on('baseSignal', (res)=> {
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
              case 'createData':
                this.createData();
                break;
              case 'singleModify':
                this.singleModify();
                break;
            }
        })
    },
    busHaveData() {
        let menuList = this.globalStore.menuList
        if(menuList.length == 0) {
            bus.$on('haveData', () => {
                findButtonList('基础信息', '采暖季',this)
            })
        }else {
            findButtonList('基础信息', '采暖季',this) 
        }
    }
  },
  mounted() { 
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
