<template>
  <div id="main">
    <!-- 引入输入文本 -->
    <div id="FilterT"></div>
    <!-- 引入按钮 -->
    <div id="ButtonT"></div>
    <!-- 表格 -->
    <div id="tableT"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  }
}
</script>
<style scoped>
#main{
  padding:20px;
}
#FilterT .el-form-item{
  display: inline-block;
}
#FilterT .el-input{
  width: 180px;
}
#FilterT .el-select{
  width: 180px;
}
#ButtonT{
  padding-left: 10px;
}
#ButtonT .el-button{
  width:80px;
  margin-bottom: 15px;
}
#tableT{
}
</style>
