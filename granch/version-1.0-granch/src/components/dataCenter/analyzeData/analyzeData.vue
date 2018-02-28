<template>
<div id="analyzeData">
  <div id="analyzeInput">
    <div id="top_left"></div>
    <div id="top_right">
      <InputArea />
    </div>
  </div>
  <div id="analyzeTab">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="热效率" name="first">
        <heatEfficiency />
      </el-tab-pane>
      <el-tab-pane label="排烟温度" name="second"></el-tab-pane>
      <el-tab-pane label="给水温度" name="third"></el-tab-pane>
      <el-tab-pane label="给水压力" name="forth"></el-tab-pane>
      <el-tab-pane label="额定供热量" name="fifth"></el-tab-pane>
      <el-tab-pane label="回水压力" name="sixth"></el-tab-pane>
      <el-tab-pane label="负荷率%" name="seventh"></el-tab-pane>
      <el-tab-pane label="给水流量" name="eighth"></el-tab-pane>
      <el-tab-pane label="环境空气温度" name="ninth"></el-tab-pane>
      <el-tab-pane label="燃料消耗量" name="tenth"></el-tab-pane>
      <el-tab-pane label="燃料消耗量" name="tenth"></el-tab-pane>
    </el-tabs>
  </div>

</div>
</template>

<script>
import heatEfficiency from "./heatEfficiency/heatEfficiency.vue";
import InputArea from './input.vue'
import $ from "jquery";
import { store } from './store'
export default {
  components: {
    heatEfficiency,InputArea
  },
  data() {
    return {
      store,
      activeName2: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  mounted() {
    // 修改样式
    setTimeout(function() {
      $(".el-tabs--card>.el-tabs__header").css({
        padding: "5px 15px 0",
        margin: "0 0 5px 0",
        backgroundColor: "#f8f8f8"
      });
      $(".el-tabs--card>.el-tabs__header .el-tabs__nav .el-tabs__item").css({
        width: "140px",
        textAlign: "center"
      });
      $(".el-tabs__nav-scroll").css({
        borderLeft: "1px solid #eee",
        borderRight: "1px solid #eee",
      });
      $('#analyzeTab .el-tabs__content').css({
        height: '100%'
      })
    }, 1);
  }
};
</script>
<style scoped>
#analyzeData {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #fff;
}
#analyzeInput {
  height: 7%;
  background: #f8f8f8;
}
#analyzeTab{
  height: 93%;
}
#analyzeTab .el-tabs{
  height: 93%;
}
#analyzeTab .el-tabs__content div{
  height: 100%;
}
</style>
