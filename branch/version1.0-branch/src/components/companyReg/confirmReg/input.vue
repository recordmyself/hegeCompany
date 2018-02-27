<template>
  <div id="inputArea">
    <el-form ref="store.form" :inline="true" size= 'small' :model="store.form" label-width="80px">
      <el-form-item label="日期">
        <div class="block">
          <el-date-picker
            v-model="store.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-col>
          <el-select v-model="store.status" placeholder="请选择状态" clearable>
            <el-option :label="item.label" v-for="(item,i) in store.state" :key="i" :value="item.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { store } from './store'
export default {
  data(){
    return {
      store,
    }
  }
}
</script>
<style scoped>
#inputArea .el-form-item{
  display: inline-block;
}
#inputArea .el-input{
  width: 180px;
}
#inputArea .el-select{
  width: 180px;
}
</style>
