<template>
  <div id="Base">
    <div style="height: 100%;">
      <div class="headTop">
        <span style="font-weight: 700;font-size: 14px;">系统日志</span>
      </div>
      <!-- 引入输入文本 -->
      <div id="FilterT">
        <InputArea />
      </div>
      <!-- 引入按钮 -->
      <div id="ButtonT">
        <ButtonArea @tabView='tabView'/>
      </div>
      <!-- 表格 -->
      <div id="tableT">
        <TableArea />
      </div>
      <!-- 分页 -->
      <div id="paging">
        <Paging  @tabView='tabView'  ref='getTotal'  />
      </div>

    </div>
  </div>
</template>
<script>
// 引入子组件
import ButtonArea from "./button.vue";
import TableArea from "./table";
import Paging from "../../components/base/paging.vue";
import InputArea from './input.vue'
// 引入协议
import { doMain } from '../../protocal/url'
import { SystemLogProtocal } from "../../protocal/web/SystemLogProtocal";
import { axiosHttpPost } from '../../assets/js/axios'

import { store } from "./store";
import { globalStore } from "../base/store";

export default {
  components: {
    ButtonArea,
    TableArea,
    Paging,
    InputArea
  },
  data() {
    return {
      store,
      globalStore: globalStore
    };
  },
  methods: {
    getTotal() {
      this.$refs.getTotal.setTotal();
    },
    // 请求数据
    tabView() {
      let _this = this;
      globalStore.loading = true;
      let url = doMain.log + SystemLogProtocal.logList.rest;
      let data = SystemLogProtocal.logList.request;
      if (this.store.date != null) {
        data.dateList = [];
        let d1 = new Date(_this.store.date[0]);
        let d2 = new Date(new Date(_this.store.date[1]));
        data.dateList.push(d1);
        data.dateList.push(d2);
      }else{
        data.dateList = [];
      }
      data.userName = this.store.form.userName;
      data.roleName = this.store.form.roleName;
      data.orgName = this.store.form.orgName;
      data.number = this.globalStore.pages.page;
      data.size = this.globalStore.pages.rows;
      console.log(url,data)
      axiosHttpPost(this,url,data,function(res){
          _this.globalStore.loading = false;
          _this.store.tableData = res.data.result.logList;
          _this.globalStore.pages.totalRows = res.data.result.count;
          _this.getTotal();
      });
    },
  },
  created(){
    this.store.form ={
      userName: '',
      roleName: '',
      orgName: ''
    }
  },
  mounted() {
    this.tabView();
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
