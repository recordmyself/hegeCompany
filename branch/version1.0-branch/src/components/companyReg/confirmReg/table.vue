<template>
  <div id="tableArea">
    <el-table
    :data="store.tableData"
    style="width: 100%"
    highlight-current-row
    size="small"
    @selection-change="handleSelectionChange"
    max-height="500"
    border
    stripe>
    <el-table-column type="selection" width="55" align="center"></el-table-column>
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-table ref="tableData" :data="JSON.parse(props.row.boilers)" :highlight-current-row="false"  @current-change="handleCurrentChange" height="100%" border size="small">
          <el-table-column type="index" label="序号" width="" align="center"></el-table-column>
          <el-table-column property="unitId" label="锅炉编号" width="" align="center"></el-table-column>
          <el-table-column property="name" label="锅炉名称" width="" align="center"></el-table-column>
          <el-table-column property="type" label="锅炉型号" width="" align="center"></el-table-column>
          <el-table-column property="create" label="烟囱名称" width="" align="center"></el-table-column>
        </el-table>
     </template>
    </el-table-column>
    <el-table-column label="申请日期" prop="createDate" align="center" :formatter="changeData"></el-table-column>
    <el-table-column label="公司名称" prop="name" align="center"></el-table-column>
    <el-table-column label="统一社会信用代码" prop="unifiedCode" align="center"></el-table-column>
    <el-table-column label="锅炉数量" prop="count" align="center"></el-table-column>
    <el-table-column label="营业执照" prop="license" align="center">
      <template slot-scope="scope">
        <img v-for="(item,i) in  scope.row.license" :key="i" :src="url + store.route + item" alt="" style="width: 50px;height: 50px">
      </template>
    </el-table-column>
    <el-table-column label="公司地址" prop="province" align="center"></el-table-column>
    <el-table-column label="审批状态" prop="state" align="center" :formatter="changeStatus"></el-table-column>
    <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            :class="item.sclass"
            v-for="item in store.buttonListArr"
            :key="item.id"
            v-if="item.isDynamic == true && item.status == scope.row.state"
            @click="handleFunctionName(item,scope.row)">
              <i :title="item.name" :class="item.icon"></i>
          </el-button>
        </template>
      </el-table-column>
  </el-table>
  </div>
</template>
<script>
import { store } from "./store";
import { parseTime } from "../../../assets/js/changeDate";
import { doMain } from '../../../protocal/url'
import { RegisterProtocal } from '../../../protocal/base/RegisterProtocal'
import { axiosHttpPost } from "../../../assets/js/axios";
export default {
  data() {
    return {
      store,
      url: doMain.base
    };
  },
  methods: {
    handleCurrentChange(val) {

    },
    // 只允许一条数据展开
    changeData(row, column) {
      return parseTime(row, column, false);
    },
    changeStatus(row, column) {
      let state = row[column.property];
      switch(state){
        case 'UNREGISTERED': return '待审批';break;
        case 'BLOCK_UP': return '审批驳回';break;
        case 'REGISTERED': return '审批通过';break;
      }
    },
    handleSelectionChange(val) {
      this.store.multipleSelection = val;
      if(val.length == 0){
        this.store.selNum = true;
      }else{
        this.store.selNum = false;
      }
    },
    passTrue(row){
      let _this = this;
      let url = doMain.base + RegisterProtocal.registered.rest;
      let data = RegisterProtocal.registered.request;
          data.idList = [];
          data.idList.push(row.id)
      axiosHttpPost(_this,url,data,(res)=>{
        _this.$emit('tabView');
        _this.$message.success('审批成功')
      })
    },
    passFalse(row){
      let _this = this;
      let url = doMain.base + RegisterProtocal.blockUp.rest;
      let data = RegisterProtocal.blockUp.request;
          data.idList = [];
          data.idList.push(row.id)
      axiosHttpPost(_this,url,data,(res)=>{
        _this.$emit('tabView');
        _this.$message.success('驳回成功')
      })
    },
    handleFunctionName(item, row) {
      let name = item.url.split('/')[item.url.split('/').length-1]
      eval('this.' + name + '(row);')
    },
  }
};
</script>
<style scoped>
#tableArea .el-button{
  width: 22px;
  height: 22px;
  padding: 1px 2px;
  border: none;
  color: #FFF;
  background: #1296db;
}
#tableArea .el-button:nth-of-type(1){
  background: #67C23A;
}
#tableArea .el-button:nth-of-type(2){
  background: #ed5565;
}
</style>
