<template>
  <div class="companyName">
    <table id="comDetail">
      <tr>
        <td>供热单位</td>
        <td colspan='4'>{{globalStore.companyInfo?globalStore.companyInfo.company:'无数据'}}</td>
      </tr>
      <tr>
        <td>锅炉房名称</td>
        <td colspan="4">{{globalStore.companyInfo?globalStore.companyInfo.name:'无数据'}}</td>
      </tr>
      <tr>
        <td>地址</td>
        <td colspan="4">{{globalStore.companyInfo?globalStore.companyInfo.address:'无数据'}}</td>
      </tr>
      <tr>
        <td>运行联系人</td>
        <td>{{globalStore.companyInfo?globalStore.companyInfo.orgBingId:'无数据'}}</td>
        <td>装机容量</td>
        <td colspan="2">{{globalStore.companyInfo?globalStore.companyInfo.capacity:'无数据'}}</td>
      </tr>
      <tr>
        <td>运行联系电话</td>
        <td>{{globalStore.companyInfo?globalStore.companyInfo.orgBingId:'无数据'}}</td>
        <td>运行联系手机号</td>
        <td colspan="2">{{globalStore.companyInfo?globalStore.companyInfo.orgBingId:'无数据'}}</td>
      </tr>
      <tr>
        <td>报修联系人</td>
        <td>{{globalStore.companyInfo?globalStore.companyInfo.orgBingId:'无数据'}}</td>
        <td>报修联系人电话</td>
        <td colspan="2">{{globalStore.companyInfo?globalStore.companyInfo.orgBingId:'无数据'}}</td>
      </tr>
      <tr>
        <td>供暖总面积</td>
        <td>{{globalStore.companyInfo?globalStore.companyInfo.heatingArea:'无数据'}}</td>
        <td>居民面积</td>
        <td colspan="2">{{globalStore.companyInfo?globalStore.companyInfo.civilArea:'无数据'}}</td>
      </tr>
      <tr>
        <td>采暖户数</td>
        <td>{{globalStore.companyInfo?globalStore.companyInfo.orgBingId:'无数据'}}</td>
        <td>管网总长度</td>
        <td colspan="2">{{globalStore.companyInfo?globalStore.companyInfo.thermalNumber:'无数据'}}</td>
      </tr>
      <tr>
        <td>管网敷设年代</td>
        <td>{{globalStore.companyInfo?globalStore.companyInfo.orgBingId:'无数据'}}</td>
        <td>管井数量</td>
        <td colspan="2">{{globalStore.companyInfo?globalStore.companyInfo.thermalNumber:'无数据'}}</td>
      </tr>
      <tr>
        <td>管沟长度</td>
        <td>{{globalStore.companyInfo?globalStore.companyInfo.thermalNumber:'无数据'}}</td>
        <td>装机数量</td>
        <td colspan="2">{{globalStore.companyInfo?globalStore.companyInfo.orgBingId:'无数据'}}</td>
      </tr>
      <tr>
        <td>锅炉台数</td>
        <td>{{globalStore.companyInfo?globalStore.companyInfo.boilerQuantity:'无数据'}}</td>
        <td>供暖范围</td>
        <td colspan="2">{{globalStore.companyInfo?globalStore.companyInfo.heatingCapacity:'无数据'}}</td>
      </tr>
      <tr>
        <td>所在街道</td>
        <td>{{globalStore.companyInfo?globalStore.companyInfo.address:'无数据'}}</td>
        <td>燃料类型</td>
        <td colspan="2">{{globalStore.companyInfo?globalStore.companyInfo.type:'无数据'}}</td>
      </tr>
      <tr>
        <td>锅炉房备案号</td>
        <td>{{globalStore.companyInfo?globalStore.companyInfo.sn:'无数据'}}</td>
        <td>报修手机号码</td>
        <td colspan="2">{{globalStore.companyInfo?globalStore.companyInfo.orgBingId:'无数据'}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import { globalStore } from './store'
export default {
  data() {
    return {
      globalStore,
    }
  },
  methods: {
    changeType(a){
      switch(a){
        case '无数据': return a;break
        case 1: return "燃煤";break;
        case 2: return "燃油";break;
        case 3: return "燃气";break;
      }
    }
  }
};
</script>
<style scoped>
#companyName{
  width: 100%;
  height: 100%;
}
#comDetail{
  width: 100%;
  height: 100%;
  border-collapse: collapse;
}
#comDetail td{
  height: 35px;
  border: 1px solid black;
}
#comDetail tr td:nth-of-type(1){
  width: 130px;
  text-align: right;
  padding-right: 15px;
}
#comDetail tr td:nth-of-type(2){
  padding-left: 15px;
}
#comDetail tr td:nth-of-type(3){
  width: 130px;
  text-align: right;
  padding-right: 15px;
}
#comDetail tr td:nth-of-type(4){
  padding-left: 15px;
}
#comDetail .el-dialog .el-dialog__body{
  padding-top: 10px !important;
}
</style>
