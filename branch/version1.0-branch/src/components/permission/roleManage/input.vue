<template>
  <div class="inputArea">
       <el-form label-width="80px" label-position="right" >
                <el-form-item label="角色名称">
                    <el-input size="small" v-model.trim="store.searchData.name" placeholder="请输入角色名称"></el-input>
                </el-form-item>
                <el-form-item label="创建时间" >
                    <el-date-picker
                    v-model="store.searchData.createDate"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="small"
                    ></el-date-picker>
                </el-form-item>
        </el-form>
  </div>
</template>
<script>
import { store } from './store'
export default {
  data() {
    return {
      store
    }
  }
}
</script>
<style scoped>
#FilterT .el-form-item{
  display: inline-block;
  margin-bottom: 18px;
}
#FilterT .el-input{
  width: 180px;
}
#FilterT .el-select{
  width: 180px;
}
</style>
