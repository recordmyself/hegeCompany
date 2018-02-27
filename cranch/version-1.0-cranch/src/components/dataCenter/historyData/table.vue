<template>
  <div id="tableArea">
    <el-table :data="store.tableData" size="small" max-height="500" style="width: 100%" stripe border :header-row-style="{color: 'black'}" @selection-change="handleSelectionChange" highlight-current-row v-loading="globalStore.loading">
        <el-table-column type="selection" width="45" :fixed='true' align="center"></el-table-column>
        <el-table-column prop="revTime" label="日期/时间"  :fixed='true' align="center" width="130"
        :formatter="changeDate"></el-table-column>
        <el-table-column prop="gasName" label="排烟站点" align="center" width="110"></el-table-column>
        <el-table-column prop="oxO2" label="烟气含氧量" align="center" width="110"></el-table-column>
        <el-table-column prop="noxCt" label="Nox折算浓度" align="center" width="110"></el-table-column>
        <el-table-column prop="flow" label="烟气流速" align="center" width="110"></el-table-column>
        <el-table-column prop="stress" label="烟气压力" align="center" width="110"></el-table-column>

        <el-table-column prop="tp" label="烟气温度" align="center" width="110"></el-table-column>
        <el-table-column prop="hdy" label="烟气湿度" align="center" width="110"></el-table-column>

        <el-table-column prop="ppm" label="Nox实测PPM浓度" align="center" width="170"></el-table-column>
        <el-table-column prop="qltppm" label="Nox标态质量浓度" align="center" width="170"></el-table-column>
        <el-table-column prop="area" label="烟道截面积" align="center" width="170"></el-table-column>

        <el-table-column prop="ssflow" label="标态烟气流量" align="center" width="130"></el-table-column>
        <el-table-column prop="tmflow" label="热态烟气流量" align="center" width="130"></el-table-column>
      </el-table>
  </div>
</template>
<script>
import { store } from "./store";
import { parseTime } from '../../../assets/js/changeDate'
import { globalStore } from '../../base/store'
export default {
  data() {
    return {
      store,
      globalStore
    };
  },
  methods: {
    // 调整时间
    changeDate(row,column){
      return parseTime(row,column,false);
    },
    // 获取选择的数据
    handleSelectionChange(val) {
      this.store.multipleSelection = val;
      if(val.length == 0){
        this.store.selNum = true
      }else{
        this.store.selNum = false
      }
    },
  },
  created() {
  }
};
</script>
<style scoped>
#tableArea .cell {
  font-size: 14px;
}
</style>
