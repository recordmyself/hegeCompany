<template>
    <div id="lineImage">
        <!-- 烟气压力 -->
        <div id="getPa"></div>
        <!-- 烟气温度 -->
        <div id="getTp"></div>
        <!-- 烟气流速 -->
        <div id="getFlow"></div>
        <!-- 烟气含氧量 -->
        <div id="getOxO2"></div>
        <!-- Nox折算浓度 -->
        <div id="getNoxCt"></div>
        <!-- 烟气湿度 -->
        <div id="gethdy"></div>
        <!-- Nox实测PPM浓度 -->
        <div id="getppm"></div>
        <!-- Nox标态质量浓度 -->
        <div id="getqltppm"></div>
        <!-- 烟道截面积 -->
        <div id="getarea"></div>
        <!-- 标态烟气流量 -->
        <div id="getssflow"></div>
        <!-- 热态烟气流量 -->
        <div id="gettmflow"></div>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped>
#lineImage{
  width: 100%;
  height: 100%;
}
#lineImage div{
  float: left;
  width: 32%;
  height:32%;
  margin: 5px 5px 5px 5px;
  padding-top: 8px;
  border-radius: 5px;
  background: #FFF !important
}
</style>
