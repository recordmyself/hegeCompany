<template>
  <div id="tableArea">
    <el-table :data="store.tableData" size="small" style="width: 100%" stripe border  :header-row-style="{color: 'black'}" @selection-change="handleSelectionChange" highlight-current-row  v-loading="globalStore.loading" max-height="500">
        <el-table-column type="selection" width="45" :fixed='true' align="center"></el-table-column>
          <el-table-column prop="revTime" label="日期/时间"  :fixed='true' align="center"  width="150"
          :formatter="changeDate"></el-table-column>

          <el-table-column prop="gasName" label="排烟站点" align="center" width=""></el-table-column>
          <el-table-column prop="parameter" label="报警类型" align="center" width="200"></el-table-column>
          <el-table-column prop="value" label="数值" align="center" width=""></el-table-column>
          <el-table-column prop="limitValue" label="限制" align="center" width=""></el-table-column>
          <!-- <el-table-column prop="isState" label="状态" align="center" width=""></el-table-column> -->
          <el-table-column prop="level" label="级别" align="center" width="" :formatter="changeLevel"></el-table-column>
          <el-table-column prop="descr" label="备注" align="center" width=""></el-table-column>
      </el-table>
  </div>
</template>
<script>
import { store } from './store'
import { parseTime } from '../../../assets/js/changeDate.js'
import { globalStore } from '../../base/store'
export default {
  data() {
    return {
       store,
       globalStore
    }
  },
  methods: {
    // 调整时间
    changeDate(row,column){
      return parseTime(row,column,true)
    },
    // 跳转级别
    changeLevel(row,column){
      let level = row[column.property];
     if(level == '1001'){
        return '高'
      }else{
        return '低'
      }

    },
    // 获取选择的数据
    handleSelectionChange(val) {
      store.multipleSelection = val;
      if(val.length == 0){
        this.store.selNum = true;
      }else{
        this.store.selNum = false;
      }
    },
    handleClick(row){
      console.log(row)

    }
  }

}
</script>
<style scoped>
#tableArea .el-button{
  width: 22px;
  height: 22px;
  padding: 1px 2px;
  border: none;
  background: #1296db;
}
</style>
