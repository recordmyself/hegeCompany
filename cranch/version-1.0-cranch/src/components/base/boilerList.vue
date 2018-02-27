<template>
  <div class="companyName">
      <el-table :data="globalStore.tableData" stripe  border size="small" @cell-click='toRealData'v-loading="globalStore.loading">
        <el-table-column prop="revTime" label="时间" align='center' width="130"
        :formatter="changeDate"></el-table-column>
        <el-table-column prop="name" label="排烟点名称" align='center' width="130"></el-table-column>
        <el-table-column prop="gasId" label="排烟点编号" align='center' width="130"></el-table-column>
        <el-table-column label="烟气含氧量" align='center' width="130">
          <template slot-scope="scope">
            <span :class="changeColor(scope.row.oxO2State)">{{scope.row.oxO2}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Nox折算浓度" align='center' width="160">
          <template slot-scope="scope">
            <span :class="changeColor(scope.row.noxCtState)">{{scope.row.noxCt}}</span>
          </template>
        </el-table-column>
        <el-table-column label="烟气流速" align='center' width="120">
          <template slot-scope="scope">
            <span :class="changeColor(scope.row.flowState)">{{scope.row.flow}}</span>
          </template>
        </el-table-column>
        <el-table-column label="烟气压力" align='center' width="120">
          <template slot-scope="scope">
            <span :class="changeColor(scope.row.stressState)">{{scope.row.stress}}</span>
          </template>
        </el-table-column>
        <el-table-column label="烟气温度" align='center' width="120">
          <template slot-scope="scope">
            <span :class="changeColor(scope.row.tpState)">{{scope.row.tp}}</span>
          </template>
        </el-table-column>
        <el-table-column label="烟气湿度" align='center' width="120">
          <template slot-scope="scope">
            <span :class="changeColor(scope.row.hdyState)">{{scope.row.hdy}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Nox实测PPM浓度" align='center' width="160">
          <template slot-scope="scope">
            <span :class="changeColor(scope.row.ppmState)">{{scope.row.ppm}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Nox标态质量浓度" align='center' width="160">
          <template slot-scope="scope">
            <span :class="changeColor(scope.row.qltppmState)">{{scope.row.qltppm}}</span>
          </template>
        </el-table-column>
        <el-table-column label="烟道截面积" align='center' width="130">
          <template slot-scope="scope">
            <span :class="changeColor(scope.row.areaState)">{{scope.row.area}}</span>
          </template>
        </el-table-column>
        <el-table-column label="标态烟气流量" align='center' width="130">
          <template slot-scope="scope">
            <span :class="changeColor(scope.row.ssflowState)">{{scope.row.ssflow}}</span>
          </template>
        </el-table-column>
        <el-table-column label="热态烟气流量" align='center' width="130">
          <template slot-scope="scope">
            <span :class="changeColor(scope.row.tmflowState)">{{scope.row.tmflow}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align='center' width="130">
          <template slot-scope="scope">
            <span :class="changeColor(scope.row.state)">{{changeStatus(scope.row.state)}}</span>
          </template>
        </el-table-column>
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
    // 改变颜色
    changeColor(status){
      switch(status){
        case 0: return '';break;
        case 1: return 'low';break;
        case 2: return 'middle';break;
        case 3: return 'height';break;
      }
    },
    // 状态
    changeStatus(status){
      switch(status){
        case 0: return '正常';break;
        case 1: return '低';break;
        case 2: return '中';break;
        case 3: return '高';break;
      }
    },
    // 日期
    changeDate(row,column){
      return parseTime(row,column,false)
    },
    // 点击跳转到实时数据
    toRealData(rows){
      console.log(rows)
      let data = {
        gasSn: rows.gasSn
      }
      sessionStorage.setItem('boiler',JSON.stringify(data))
      this.$router.push({path: '/realData'})
    },
  }
};
</script>
<style scoped>
#paging {
  height: 50px;
  line-height: 50px;
  width: 100%;
  text-align: center;
}
.low{
  color: #E6A23C
}
.middle{
  color: #FF9999
}
.height{
color: #F56C6C
}
</style>
