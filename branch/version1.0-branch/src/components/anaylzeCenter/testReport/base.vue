<template>
  <div id="Base">
    <div style="height: 100%;">
      <div class="headTop">
        <span style="font-size:14px;">检测报告查询</span>
      </div>
      <!-- 引入输入文本 -->
      <div id="FilterT">
        <InputArea />
      </div>
      <!-- 引入按钮 -->
      <div id="ButtonT">
        <ButtonArea  @tabView='tabView'/>
      </div>
      <!-- 表格 -->
      <div id="tableT">
        <TableArea  @tabView='tabView'/>
      </div>
       <!-- 分页 -->
      <div id="paging">
        <Paging @tabView='tabView' ref='getTotal'  />
      </div>
      <div>
        <DialogT />
      </div>
    </div>

  </div>
</template>
<script>
// 引入子组件
import InputArea from './input.vue'
import ButtonArea from './button.vue'
import  TableArea from './table'
import Paging from '../../base/paging.vue'
import DialogT from './dialog.vue'
import bus from '../../base/bus'
import { findButtonListMore } from '../../../assets/js/findButtonList'
// 引入协议
import { axiosHttpPost } from '../../../assets/js/axios'
import { doMain } from '../../../protocal/url'
import { ExcelUploadHistoryProtocal } from '../../../protocal/web/ExcelUploadHistoryProtocal'
// 引入状态
import { store } from './store'
import { globalStore } from "../../base/store";

export default {
  components: {
    InputArea,ButtonArea,TableArea,Paging,DialogT
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
      let url = doMain.web + ExcelUploadHistoryProtocal.listAll.rest;
      let data= ExcelUploadHistoryProtocal.listAll.request;
      this.globalStore.loading = true;
      if (store.form.date != null) {
        data.startTime = new Date(store.form.date[0]).getTime();
        data.endTime = new Date(store.form.date[1]).getTime();
      } else {
        data.startTime = null;
        data.endTime = null;
      }
      data.page = _this.globalStore.pages.page;
      data.rows = _this.globalStore.pages.rows;
      data.unitName = this.store.form.unitName;
      data.number = this.store.form.number;
      data.companyName = this.store.form.companyName;
      console.log(data)
      axiosHttpPost(_this,url,data,function(res){
          _this.store.tableData = res.data.result.list;
          _this.globalStore.pages.totalRows = res.data.result.totalRows;
          _this.globalStore.loading = false;
          _this.getTotal();
      })
    },
    busHaveData() {
        let menuList = this.globalStore.menuList
        if(menuList.length == 0) {
            bus.$on('haveData', () => {
                findButtonListMore('分析中心', '分析报告','分析报告查询',this)
            })
        }else {
            findButtonListMore('分析中心', '分析报告','分析报告查询',this)
        }
    },
  },
  created(){
    // 置空搜索条件
    this.store.form = {
      unitName:null, //文件名称
      number:null,//报表编号
      companyName: null,//上传的单位
      date: ''
    }
  },
  mounted() {
    this.tabView();
    this.busHaveData();
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
  max-height: 35px;
  line-height: 35px;
  background: #f8f8f8;
  color: black;
  padding-left: 10px;
  margin-bottom: 10px;
}
#Base .titleTable{
  height: 40px;
  line-height: 40px;
  color: black;
  font-size: 16px;
  padding-left: 10px;
  border-bottom: 1px solid black;
  border-bottom-width: 96%;
  margin-bottom: 10px;
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
