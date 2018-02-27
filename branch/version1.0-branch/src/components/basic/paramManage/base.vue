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
import { doMain } from '../../../protocal/url'
import { ReportFormsProtocal } from '../../../protocal/web/ReportFormsProtocal'
import { axiosHttpPost } from '../../../assets/js/axios'

// 引入仓库
import { store } from "./store";
import { globalStore } from "../../base/store";
// 引入event bus
import bus from '../../base/bus'
import { findButtonList } from '../../../assets/js/findButtonList'
import { resetCondition } from './event';
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
    getTotal() {
      this.$refs.getTotal.setTotal();
    },
    //页面数据重载/加载/查询
    tabView() {
      store.listLoading = true;
      let _this = this
      let data =  ReportFormsProtocal.selectReport.request
      let url = doMain.web + ReportFormsProtocal.selectReport.rest
      data.name = this.store.form.chineseType;
      data.nameEn = this.store.form.englishType;
      data.type = this.store.form.type
      axiosHttpPost( this, url, data, (res) => {
        console.log(res)
        if(res.data.status == 'FAIL'){
          _this.$message.error(res.data.message)
          _this.store.tableData = [];
          globalStore.pages.totalRows = 0;
        }else{
          store.tableData = res.data.result;
          globalStore.pages.totalRows = 0;
          store.listLoading = false;
        }
        _this.getTotal();
      })
    },
    busHaveData() {
        let menuList = this.globalStore.menuList
        if(menuList.length == 0) {
            bus.$on('haveData', () => {
                findButtonList('基础信息', '字典管理',this)
            })
        }else {
            findButtonList('基础信息', '字典管理',this)
        }
    }
  },
  mounted() {
    this.tabView()
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
