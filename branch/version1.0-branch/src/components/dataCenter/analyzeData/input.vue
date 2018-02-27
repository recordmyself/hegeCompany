<template>
  <div id="inputArea">
    <el-form ref="form" size= 'small' :inline='true' :model="store.form" label-width="50px">
            <el-form-item label="省市">
              <el-select v-model="store.form.province" filterable placeholder="请选择">
                <el-option
                  v-for="item in store.restaurantsP"
                  :key="item.id"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="区域">
              <el-select v-model="store.form.area" filterable placeholder="请选择">
                <el-option
                  v-for="item in store.restaurantsR"
                  :key="item.id"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="公司">
              <el-select v-model="store.form.company" filterable placeholder="请选择">
                <el-option
                  v-for="item in store.restaurantsC"
                  :key="item.id"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="站点">
              <el-select v-model="store.form.boileroom" filterable placeholder="请选择">
                <el-option
                  v-for="item in store.restaurantsS"
                  :key="item.id"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
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
#inputArea{
  padding-top: 10px;
}
#inputArea .el-select{
  width: 200px
}
</style>
