<template>
  <div id="regTable">
    <el-table ref="multipleTable" :data="store.boiler" tooltip-effect="dark"
    @selection-change="handleSelectionChange" border size="small" max-height="520">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column label="锅炉编号" width="" align="center">
        <template slot-scope="scope"><input v-model="scope.row.unitId" /></template>
      </el-table-column>
      <el-table-column label="锅炉名称" width="" align="center">
        <template slot-scope="scope"><input v-model="scope.row.name"/></template>
      </el-table-column>
      <el-table-column label="锅炉类型" show-overflow-tooltip align="center">
        <template slot-scope="scope"><input v-model="scope.row.type" /></template>
      </el-table-column>
      <el-table-column label="烟囱名称" show-overflow-tooltip align="center">
        <template slot-scope="scope"><input v-model="scope.row.create" /></template>
      </el-table-column>
      <el-table-column label="负责人" show-overflow-tooltip align="center">
        <template slot-scope="scope"><input v-model="scope.row.person" /></template>
      </el-table-column>
      <el-table-column label="联系方式" show-overflow-tooltip align="center">
        <template slot-scope="scope"><input v-model="scope.row.tel" /></template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { store } from "./store";
import $ from "jquery";
export default {
  data() {
    return {
      store
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.store.result = val;
      console.log(val)
    }
  },
  created(){
  },
  mounted() {
  }
};
</script>
<style scoped>
#regTable {
  width: 100%;
  height: 100%;
}
#regTable .el-table {
  width: 96%;
  margin: 0 auto;
}
#regTable .el-table input{
  border: none !important;
  width: 100%;
  height: 100%;
  padding: 5px 0;
  text-align: center;
}
</style>
