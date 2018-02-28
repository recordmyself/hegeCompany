<template>
  <div id="tableArea">
    <el-table :data="store.tableData" size="small" style="width: 100%" stripe border  :header-row-style="{color: 'black'}" @selection-change="handleSelectionChange" highlight-current-row max-height="500" v-loading="globalStore.loading">
      <el-table-column type="selection" width="55" :fixed='true' align="center"></el-table-column>
        <el-table-column prop="revTime" label="创建日期" :fixed='true' align="center" width= '' :formatter="changeDate"></el-table-column>
        <el-table-column prop="fileName" label="文件名称" align="center" width=""></el-table-column>
        <el-table-column prop="number" label="报表编号" align="center" width=""></el-table-column>
        <el-table-column prop="companyName" label="上传单位" align="center" width=""></el-table-column>
        <el-table-column prop="state" label="状态" align="center" width="120" :formatter="changeState"></el-table-column>
        <el-table-column fixed="right"  label="操作" align="center" width="160px">
          <template slot-scope="scope">
            <div id="tableButton">
             <el-button
                :class="item.sclass"
                v-for="item in store.buttonListArr"
                :key="item.id"
                v-if="item.isDynamic == true"
                @click="handleFunctionName(item,scope.row)">
                  <i :title="item.name" :class="item.icon"></i>
                </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
import { store } from "./store";
import $ from "jquery";
import { globalStore } from "../../base/store";
import { parseTime } from "../../../assets/js/changeDate";

// 引入协议
import { doMain } from "../../../protocal/url";
import { ExcelUploadHistoryProtocal } from "../../../protocal/web/ExcelUploadHistoryProtocal";
import { axiosHttpPost, axiosHttpGet } from "../../../assets/js/axios";
export default {
  data() {
    return {
      store,
      globalStore
    };
  },
  methods: {
    handleFunctionName(item, row) {
      let name = item.url.split("/")[item.url.split("/").length - 1];
      eval("this." + name + "(row);");
    },
    changeDate(row, column) {
      return parseTime(row, column, false);
    },
    // 获取选中的数据
    handleSelectionChange(val) {
      this.store.multipleSelection = val;
      if (val.length == 0) {
        this.store.selNum = true;
      } else {
        this.store.selNum = false;
      }
    },
    changeState(row, column) {
      let state = row[column.property];
      switch (state) {
        case 1:
          return "正常";
          break;
        case 2:
          return "已删除";
          break;
      }
    },
    // 获取查看信息
    getViewInfo(params){
      let _this = this;
      let url = doMain.web + ExcelUploadHistoryProtocal.getSelectByTrackId.rest;
      let data = ExcelUploadHistoryProtocal.getSelectByTrackId.request;
      data.trackId = params.trackId
      axiosHttpPost(this,url,data,(res)=>{
        console.log(res.data)
        _this.store.reportInfo = res.data.result;
        _this.store.dialogVisible = true
      })
    },
    // 查看
    viewEvent(row) {
      this.getViewInfo(row.trackId)
    },
    // 删除
    deletEvent(row) {
      console.log(row);
      let _this = this;
      let url = doMain.web + ExcelUploadHistoryProtocal.refresh.rest;
      let data = ExcelUploadHistoryProtocal.refresh.request;
      data.id = row.id;
      axiosHttpPost(_this, url, data, res => {
        _this.$message.success("删除成功");
        _this.$emit("tabView");
      });
    }
  }
};
</script>
<style scoped>
.el-table td:last-child .cell i {
  font-size: 14px;
  color: #fff;
  cursor: pointer;
}
.el-table td:last-child .cell i:hover {
  color: goldenrod;
}
#tableArea #tableButton .el-button {
  width: 22px;
  height: 22px;
  padding: 1px 2px;
  border: none;
}
.find {
  background: #1296db;
}
.del {
  background: #ed5565;
}
#tableArea #selected {
  display: none;
  position: absolute;
  z-index: 10000;
  top: 0;
  right: 120px;
  padding: 10px;
  width: 140px;
  text-align: center;
  background: #fff;
  box-shadow: 0px 0px 2px black;
}
#tableArea #selected .el-button {
  width: 130px;
  margin: 5px 0;
  background: #fff;
}
</style>
