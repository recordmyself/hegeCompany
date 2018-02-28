<template>
  <div id="tableArea">
    <el-table :data="store.tableData" size="small" style="width: 100%" stripe border  :header-row-style="{color: 'black'}" @selection-change="handleSelectionChange" highlight-current-row max-height="500" v-loading="globalStore.loading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="createDate" label="日期/时间" align="center" width="" :formatter="changeDate"></el-table-column>
        <el-table-column prop="userName" label="用户名" align="center" width=""></el-table-column>
        <el-table-column prop="roleName" label="用户角色" align="center" width=""></el-table-column>
        <el-table-column prop="orgName" label="用户部门" align="center" width=""></el-table-column>
        <el-table-column prop="operationLog" label="用户操作日志" align="center" width=""></el-table-column>
        <el-table-column prop="notes" label="备注" align="center" width="" :formatter="changeDate"></el-table-column>
      </el-table>
  </div>
</template>
<script>
import { store } from './store'
import { globalStore } from '../base/store'
import bus from '../base/bus'
import { parseTime } from '../../assets/js/changeDate'
import { axiosHttpGet,axiosHttpPost } from '../../assets/js/axios'
import { urlApiC } from '../../service/ip'
import { server} from '../../service/realDataService'
export default {
  data() {
    return {
       store,
       globalStore,
    }
  },
  methods: {
    // 修改日期
    changeDate(row,column){
      return parseTime(row,column,true)
    },
    handleSelectionChange(val) {
      if(val.length == 0){
        this.store.selNum = true;
      }else{
        this.store.selNum = false;
      }
      this.store.multipleSelection = val;

    },
  }

}
</script>
<style scoped>

</style>
