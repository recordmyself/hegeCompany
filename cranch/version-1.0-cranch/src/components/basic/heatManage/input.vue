<template>
  <div class="inputArea" style="padding-top:5px;">
    <el-form :model="store.searchData" size="small" label-width="80px" label-position="right">  
            <el-row>
              <el-col :span="6">
                  <el-form-item label="热源名称" >
                    <el-input placeholder="请输入热源名称" v-model.trim="store.searchData.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="热源编号">
                    <el-input placeholder="请输入热源名编号" v-model.trim="store.searchData.sn"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="热源性质">
                    <el-select  clearable v-model="store.searchData.property" filterable>
                      <el-option v-for="item in store.heatTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option> 
                    </el-select>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="供热类型" style="margin-bottom:18px;" >
                  <el-select clearable v-model="store.searchData.type" filterable>
                    <el-option v-for="item in store.heatProvideTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option> 
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="装机容量" style="margin-bottom:18px;">
                  <el-input placeholder="请输入装机容量" v-model.trim="store.searchData.capacity"></el-input>
                </el-form-item> 
              </el-col> 
              <el-col :span="6">
                <el-form-item label="供热能力" style="margin-bottom:18px;">
                  <el-input placeholder="请输入" v-model.trim="store.searchData.heatingCapacity"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
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
  methods: {
    querySearchCompany(queryString, cb) {
        var restaurants = store.options;
        // console.log(store.options);
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
    },
    createFilter(queryString) {
        return (restaurant) => {
            return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
    },
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
