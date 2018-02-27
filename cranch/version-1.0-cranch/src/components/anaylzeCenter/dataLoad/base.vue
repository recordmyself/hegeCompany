<template>
  <div id="Base">
    <div style="height: 100%;">
      <div class="headTop">
        <span style="font-size: 14px">分析数据生成</span>
      </div>
      <!-- 引入输入文本 -->
      <div id="FilterT">
        <InputArea />
      </div>
      <!-- 引入按钮 -->
      <div id="ButtonT">
        <ButtonArea @tabView='tabView'/>
      </div>
      <div class="titleTable">上传历史记录</div>
      <!-- 表格 -->
      <div id="tableT">
        <TableArea />
      </div>
      <!-- 分页 -->
      <div id="paging">
        <Paging  @tabView='tabView'  ref='getTotal'  />
      </div>
      <!-- 弹出层 -->
        <dialogT />

    </div>
  </div>
</template>
<script>
// 引入子组件
import ButtonArea from "./button.vue";
import TableArea from "./table";
import Paging from "../../../components/base/paging.vue";
import dialogT from "./dialog.vue"
import InputArea from './input.vue'
import bus from '../../base/bus'
// 引入协议
import { doMain } from "../../../protocal/url";
import { FileUploadProtocal } from "../../../protocal/web/FileUploadProtocal"
import { ExcelUploadHistoryProtocal } from '../../../protocal/web/ExcelUploadHistoryProtocal'
import { PositionProtocal } from "../../../protocal/web/PositionProtocal";
import { axiosHttpPost } from '../../../assets/js/axios'
import { findButtonListMore } from '../../../assets/js/findButtonList'

import { store } from "./store";
import { globalStore } from "../../base/store";

export default {
  components: {
    ButtonArea,
    TableArea,
    Paging,
    dialogT,
    InputArea
  },
  data() {
    return {
      store,
      globalStore
    };
  },
  methods: {
    getTotal() {
      this.$refs.getTotal.setTotal();
    },
    // 请求数据
    tabView() {
      let _this = this;
      let url = doMain.web + ExcelUploadHistoryProtocal.list.rest;
      let data = ExcelUploadHistoryProtocal.list.request;
      globalStore.loading = true;
      data.page = globalStore.pages.page;
      data.rows = globalStore.pages.rows;
      axiosHttpPost(this,url,data,function(res){
          console.log('shangc ',res)
          _this.globalStore.loading = false;
          _this.store.tableData = res.data.result.list;
          _this.globalStore.pages.totalRows = res.data.result.totalRows;
          _this.getTotal();
      });
    },
    // 获取省市
    getListTree(){
      let _this = this;
      let url = doMain.web + PositionProtocal.getCity.rest;
      let data = PositionProtocal.getCity.request;
      axiosHttpPost(_this,url,data,function(res){
        _this.store.restaurantsP = res.data.result;
      })
    },
    // 搜索公司锅炉
    getCompanyAndBoileroom(){
      let _this = this;
      let url = doMain.web + PositionProtocal.listCompany.rest;
      let data = PositionProtocal.listCompany.request;
          data.city = this.globalStore.form.province;
          data.area = this.globalStore.form.area;
      axiosHttpPost(this,url,data,(res)=>{
        _this.globalStore.restaurantsC = res.data.result;

      })
    },
    busHaveData() {
        let menuList = this.globalStore.menuList
        if(menuList.length == 0) {
            bus.$on('haveData', () => {
                findButtonListMore('分析中心', '分析数据生成', '数据生成',this)
            })
        }else {
            findButtonListMore('分析中心', '分析数据生成', '数据生成',this)
        }
    }
  },
  created(){
    // 搜索条件置空
    this.store.form = {
      province: '',
      area: '',
      company: '',
      companyChild: [],
      boileroom: '',
      boiler: '',
      boilerId: ''
    }
    this.getListTree();
  },
  mounted() {
    let _this = this
    this.tabView();
    this.busHaveData();
  },
};
</script>
<style scoped>
#Base {
  width: 100%;
  height: 100%;
  background: #fff;
}
#Base .headTop {
  width: 100%;
  height: 5%;
  max-height: 35px;
  line-height: 35px;
  background: #f8f8f8;
  color: black;
  padding-left: 10px;
  margin-bottom: 10px;
}
#Base .titleTable {
  height: 40px;
  line-height: 40px;
  color: black;
  font-size: 16px;
  padding-left: 10px;
  border-bottom: 1px solid black;
  border-bottom-width: 96%;
  margin-bottom: 10px;
}
#ButtonT {
  margin: 0px auto 10px;
  padding-left: 10px;
}
#paging {
  text-align: center;
  margin-top: 10px;
  height: 40px;
  line-height: 40px;
  background: #fff;
}
</style>
