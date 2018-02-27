<template>
  <div class="companyName">
      <el-table :data="globalStore.tableData" stripe  border size="small" v-loading="globalStore.loading" @cell-click='toRealData'>
        <el-table-column prop="gasId" label="烟囱编号" align='center' width=""></el-table-column>
        <el-table-column prop="level" label="重要度等级" align='center' width="" :formatter="changeStatus"></el-table-column>
        <el-table-column prop="value" label="报警值" align='center' width=""></el-table-column>
        <el-table-column prop="parameter" label="报警属性" align='center' width=""></el-table-column>
        <el-table-column prop="limitValue" label="限制" align='center' width="100"></el-table-column>
        <el-table-column prop="descr" label="备注" align='center' width="180"></el-table-column>
      </el-table>
    </div>
</template>
<script>
import { globalStore } from './store'
import { parseTime } from '../../assets/js/changeDate'
export default {
  data() {
    return {
      globalStore,
    }
  },
  methods: {
    // 状态
    changeStatus(row,column){
      var status = row[column.property]
      if(status ==1002){
        return '高'
      }
      return '低'
    },
    // 日期
    changeDate(row,column){
      return parseTime(row,column,false);
    },
    // 点击跳转到报警数据
    toRealData(rows){
      console.log(rows)
    },
  }

};
</script>
<style scoped>

</style>
