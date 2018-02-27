<template>
  <div class="companyName">
    <el-table :data="store.tableData" stripe  border size="small" @cell-click='toCellInfo'>
      <el-table-column prop="boilerName" label="锅炉名称" align='center' width=""></el-table-column>
      <el-table-column prop="importantLevel" label="重要度等级" align='center' width=""></el-table-column>
      <el-table-column prop="cellData" label="报警数据" align='center' width=""></el-table-column>
      <el-table-column prop="cellContent" label="报警内容" align='center' width=""></el-table-column>
      <el-table-column prop="cellTime" label="报警事件" align='center' width=""></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped>

</style>
