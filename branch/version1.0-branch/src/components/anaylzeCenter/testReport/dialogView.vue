<template>
  <div id="diTable">
    <table id="tableData">
      <tr>
        <th>序号</th>
        <th>参数</th>
        <th>参数名称</th>
        <th>数值</th>
      </tr>
      <tr>
        <td>1</td>
        <td>oxO2</td>
        <td>烟气含氧量</td>
        <td :class="store.reportInfo.oxO2State == 1?'col':''">{{store.reportInfo.oxO2}}</td>
      </tr>
      <tr>
        <td>2</td>
        <td>noxCt</td>
        <td>Nox折算浓度</td>
        <td :class="store.reportInfo.noxCtState == 1?'col':''">{{store.reportInfo.noxCt}}</td>
      </tr>
      <tr>
        <td>3</td>
        <td>flow</td>
        <td>烟气流速</td>
        <td :class="store.reportInfo.flowState == 1?'col':''">{{store.reportInfo.flow}}</td>
      </tr>
      <tr>
        <td>4</td>
        <td>stress</td>
        <td>烟气压力</td>
        <td :class="store.reportInfo.stressState == 1?'col':''">{{store.reportInfo.stress}}</td>
      </tr>
      <tr>
        <td>5</td>
        <td>tp</td>
        <td>烟气温度</td>
        <td :class="store.reportInfo.tpState == 1?'col':''">{{store.reportInfo.tp}}</td>
      </tr>
      <tr>
        <td>6</td>
        <td>hdy</td>
        <td>烟气湿度</td>
        <td :class="store.reportInfo.hdyState == 1?'col':''">{{store.reportInfo.hdy}}</td>
      </tr>
      <tr>
        <td>7</td>
        <td>ppm</td>
        <td>Nox实测PPM浓度</td>
        <td :class="store.reportInfo.ppmState == 1?'col':''">{{store.reportInfo.ppm}}</td>
      </tr>
      <tr>
        <td>8</td>
        <td>qltppm</td>
        <td>Nox标态质量浓度</td>
        <td :class="store.reportInfo.qltppmState == 1?'col':''">{{store.reportInfo.qltppm}}</td>
      </tr>
      <tr>
        <td>9</td>
        <td>area</td>
        <td>烟道截面积</td>
        <td :class="store.reportInfo.areaState == 1?'col':''">{{store.reportInfo.area}}</td>
      </tr>
      <tr>
        <td>10</td>
        <td>ssflow</td>
        <td>标态烟气流量</td>
        <td :class="store.reportInfo.ssflowState == 1?'col':''">{{store.reportInfo.ssflow}}</td>
      </tr>
      <tr>
        <td>11</td>
        <td>tmflow</td>
        <td>热态烟气流量</td>
        <td :class="store.reportInfo.tmflowState == 1?'col':''">{{store.reportInfo.tmflow}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import { store } from "./store";
import { urlApiC } from "../../../service/ip";
import { server } from "../../../service/realDataService";
import { axiosHttpPost } from "../../../assets/js/axios";
export default {
  data() {
    return {
      store
    };
  }
};
</script>
<style scoped>
#diTable {
  width: 100%;
}
#tableData {
  width: 100%;
  border: 1px solid #ddd;
  border-collapse: collapse
}
#tableData td,th{
  text-align: center;
  height: 40px;
  border: 1px solid #ddd;
}
.col{
  color: red;
}
</style>
