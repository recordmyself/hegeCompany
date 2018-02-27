<template>
  <div class="inputArea">
      <el-form size="small" label-width="80px" label-position="right" style="padding-top:10px">
          <el-col :span="6">
              <el-form-item label="名称" label-width="55px">
                  <el-input v-model.trim="store.searchData.name" placeholder="请输入名称"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创建时间">
                <el-date-picker
                  v-model="store.searchData.createDate"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="请输入开始日期"
                  end-placeholder="请输入结束日期"
                  >
                </el-date-picker>
              </el-form-item>
          </el-col>
      </el-form>
  </div>
</template>
<script>
import { store } from './store'
export default {
  data() {
    return {
      store: store
    }
  }
}
</script>
<style scoped>
#FilterT .el-form-item{
  display: inline-block;
}
#FilterT .el-input{
  width: 180px;
}
#FilterT .el-select{
  width: 180px;
}
</style>

