<template>
  <div>
    <el-dialog
      :visible.sync="store.dialogVisible"
      :before-close="handleClose"
      width="65%">
      <el-table :data="store.tableData1" size="small" style="width: 100%" stripe border  :header-row-style="{color: 'black'}" highlight-current-row max-height="550" v-loading="globalStore.loading">
        <el-table-column type="index" width="50" label="序号" fixed="left" align="center"></el-table-column>
        <el-table-column prop="number" label="标准序号" align="center" width=""></el-table-column>
        <el-table-column prop="name" label="名称" align="center" width=""></el-table-column>
        <el-table-column prop="project" label="项目名称" align="center" width=""></el-table-column>
        <el-table-column prop="sourcesData" label="单位" align="center" width=""></el-table-column>
        <el-table-column prop="data" label="数据来源" align="center" width=""></el-table-column>
      </el-table>
      <!-- 分页 -->
      <div id="paging">
         <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="store.pages.page"
            :page-size="store.pages.rows"
            layout="prev, pager, next, jumper"
            :total="store.pages.totalRows">
          </el-pagination>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { store } from "./store";
import { globalStore } from "../../base/store";
import bus from '../../base/bus'
import Paging from "../../../components/base/paging.vue";

import { axiosHttpPost } from '../../../assets/js/axios'
import { doMain } from '../../../protocal/url'
import { FileUploadProtocal } from '../../../protocal/web/FileUploadProtocal'
export default {
  components: {
    Paging,
  },
  data() {
    return {
      store,
      globalStore
    };
  },
  methods: {
    // 手动分页
    tabView(val){
      let page = val;
      let len = this.store.tableData.length;
      this.store.tableData1 = this.store.tableView.slice((page-1)*20,page*20);
    },
    handleSizeChange(val){
      this.tabView(val)
    },
    handleCurrentChange(val){
      this.tabView(val)
    },
    handleClose() {
      this.store.dialogVisible = false;
    }
  },
  mounted() {
    let _this = this;
    bus.$on('findView',function(){
      let url = doMain.web + FileUploadProtocal.selectExcle.rest;
      let data = FileUploadProtocal.selectExcle.request;
      data.address = _this.store.row.address;
      console.log(data.address)
      axiosHttpPost(_this,url,data,function(res){
        console.log(res.data)
        _this.store.tableView = res.data.result;
        _this.store.pages.totalRows = res.data.result.length;
        _this.tabView(1)
      })
    })
  }
};
</script>
<style scoped>
#paging{
  height: 50px;
  text-align: center;
}
</style>
