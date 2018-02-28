<template>
  <div class="inputArea">
       <el-form size="small" label-width="100px" :inline='true' label-position="right" style="padding-top:10px">
          <el-col :span="6">
              <el-form-item label="中文名称">
                  <el-input v-model.trim="store.searchData.chineseType" placeholder="请输入指标中文名称"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="英文名称">
                  <el-input v-model.trim="store.searchData.englishType" placeholder="请输入指标英文名称"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="指标类型" prop="type">
                    <el-select clearable v-model="store.searchData.gasType" placeholder="请选择指标类型">
                        <el-option v-for="item in store.typeOptions" :value="item.value" :key="item.value" :label="item.label"></el-option>
                    </el-select>
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
.inputArea{
  height: 50px;
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
</style>
