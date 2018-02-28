<template>
  <div id="regTable">
    <table id="tab">
      <tr>
        <th>序号</th>
        <th colspan="2">参数范围</th>
      </tr>
      <tr v-for="(item,i) in store.tableDate1" :key="i">
        <td>{{item.idx+1}}</td>
        <td>
          <el-input placeholder="请输入较小值"  v-model="item.min" clearable @blur='confirmNum(item.idx)'></el-input>
        </td>
        <td>
          <el-input placeholder="请输入较大值"  v-model="item.max" clearable @blur='confirmNum(item.idx)'></el-input>
        </td>
      </tr>
    </table>
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
    confirmNum(index){
        this.store.arrDate = []
        this.store.tableDate1.forEach((item)=>{
          this.store.arrDate.push(Number(item.min));
          this.store.arrDate.push(Number(item.max));
        });
      if(this.store.arrDate[index*2]>=this.store.arrDate[index*2+1] && this.store.arrDate[index*2+1] !=0){
        this.$message.warning('较小值应小于较大值！')
        this.store.tableDate1[index].max = ''
      }
      if(this.store.arrDate[index*2]<=this.store.arrDate[index*2-1] && this.store.arrDate[index*2-1]!=0 && index != 0){
        this.$message.warning('数据填充不正确！')
        this.store.tableDate1[index].min = ''
      }
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
#tab{
  width: 100%;
  height: 100%;
  border: 1px solid #eee;
  border-collapse: collapse
}
#tab th{
  height: 35px;
  line-height: 35px;
  text-align: center;
  border: 1px solid #eee;
}
#tab th:nth-of-type(1){
  width: 50px;
}
#tab td{
  height: 35px;
  text-align: center;
  border: 1px solid #eee;
}
</style>
