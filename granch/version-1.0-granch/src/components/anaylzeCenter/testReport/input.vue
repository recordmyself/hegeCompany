<template>
  <div class="inputArea">
    <el-form ref="form" :inline="true" size= 'small' :model="store.form" label-width="80px">
      <el-form-item label="日期">
        <div class="block">
          <el-date-picker
            v-model="store.form.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </el-form-item>

      <el-form-item label="报表编号">
        <el-input v-model="store.form.number" placeholder="请输入报表编号"></el-input>
      </el-form-item>


      <el-form-item label="上传单位">
        <el-input v-model="store.form.companyName" placeholder="请输入上传单位"></el-input>
      </el-form-item>

      <el-form-item label="文件名称">
        <el-input v-model="store.form.unitName" placeholder="请输入文件名称"></el-input>
      </el-form-item>
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
  },
  methods:{

  }
}
</script>
<style scoped>
#FilterT .el-input{
  width: 180px;
}
#FilterT .el-select{
  width: 180px;
}
</style>
