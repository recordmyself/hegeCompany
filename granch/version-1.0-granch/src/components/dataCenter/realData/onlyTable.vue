<template>
  <div id="tableShow">
    <el-table :data="store.tableData" size="small" max-height="500" style="width: 100%;" stripe border  @selection-change="handleSelectionChange" highlight-current-row v-loading="false">
        <el-table-column label = '序号' type="index" width="45" :fixed='true' align="center"></el-table-column>
        <el-table-column prop="revTime" label="日期/时间" :fixed='true' align="center" width="150" :formatter="changeDate"></el-table-column>
        <el-table-column prop="oxO2" label="烟气含氧量" align="center" width="150"></el-table-column>
        <el-table-column prop="noxCt" label="Nox折算浓度" align="center" width="150"></el-table-column>
        <el-table-column prop="flow" label="烟气流速" align="center" width=""></el-table-column>
        <el-table-column prop="stress" label="烟气压力" align="center" width="110"></el-table-column>
        <el-table-column prop="tp" label="烟气温度" align="center" width="110"></el-table-column>
        <el-table-column prop="hdy" label="烟气湿度" align="center" width="110"></el-table-column>
        <el-table-column prop="ppm" label="Nox实测PPM浓度" align="center" width="180"></el-table-column>
        <el-table-column prop="qltppm" label="Nox标态质量浓度" align="center" width="180"></el-table-column>
        <el-table-column prop="area" label="烟道截面积" align="center" width="180"></el-table-column>
        <el-table-column prop="ssflow" label="标态烟气流量" align="center" width="180"></el-table-column>
        <el-table-column prop="tmflow" label="热态烟气流量" align="center" width="180"></el-table-column>
      </el-table>
  </div>
</template>
<script>
import { store } from './store'
import $ from 'jquery'
import { globalStore } from '../../base/store'
import { parseTime } from '../../../assets/js/changeDate'
export default {
  data(){
    return {
      store,
      globalStore
    }
  },
  methods:{
    handleSelectionChange(val){

    },
    changeDate(row,column){
      return parseTime(row,column,true);
    },
    setBorderColor(){
      $('#tableShow .el-table__fixed').append("<style>#tableShow .el-table__fixed::before{display:none}</style>");
      $('#tableShow .el-table').css({
        border: '1px solid #2e353f',
        background: 'transparent'
      });
       $('#tableShow .el-table th').css({
        borderRight: '1px solid #3e454f',
        borderBottom: '1px solid #3e454f'
      })
      $('#tableShow .el-table .el-table__row td').css({
        background: '#181f29',
        color: '#c4cdd8',
        borderRight: '1px solid #3e454f',
        borderBottom: '1px solid #3e454f'
      })
    }
  },
  created(){
    this.$nextTick(()=>{
      // this.setBorderColor()
    })
  },
  mounted(){
    // setInterval(()=>{
    //   this.setBorderColor()
    // })
  }
}
</script>
<style scoped>
#tableShow{
  width: 100%;
  /* height: 100%; */
  /* padding-top: 25px; */
}
#tableShow .el-table::before{
  height: 0
}
#tableShow .el-table::after{
  width: 0
}
#paging{
  height: 45px;
  line-height: 45px;
}
</style>
