<template>
  <div class="inputArea">
    <el-form ref="form" :inline="true" size= 'small' :model="store.form" label-width="80px">
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
      <el-form-item label="用户名">
        <el-row class="demo-autocomplete">
          <el-col>
            <el-autocomplete
              class="inline-input"
              v-model="store.form.userName"
              :fetch-suggestions="querySearchN"
              placeholder="请选择用户"
              @select="handleSelectN"
            ></el-autocomplete>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="用户角色">
        <el-row class="demo-autocomplete">
          <el-col>
            <el-autocomplete
              class="inline-input"
              v-model="store.form.userRole"
              :fetch-suggestions="querySearchR"
              placeholder="请选用户角色"
              @select="handleSelectR"
            ></el-autocomplete>
          </el-col>
        </el-row>
      </el-form-item>
       <el-form-item label="用户部门">
        <el-row class="demo-autocomplete">
          <el-col>
            <el-autocomplete
              class="inline-input"
              v-model="store.form.userSection"
              :fetch-suggestions="querySearchS"
              placeholder="请选用户部门"
              @select="handleSelectS"
            ></el-autocomplete>
          </el-col>
        </el-row>
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
    querySearchN(queryString, cb) {
        var restaurants = this.store.restaurantsN;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        cb(results);
      },
    handleSelectN(val){
    },
    querySearchR(queryString, cb) {
        var restaurants = this.store.restaurantsR;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        cb(results);
      },
    handleSelectR(val){
    },
    querySearchS(queryString, cb) {
        var restaurants = this.store.restaurantsS;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        cb(results);
      },
      handleSelectS(val){
    },
  createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },

  },
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
