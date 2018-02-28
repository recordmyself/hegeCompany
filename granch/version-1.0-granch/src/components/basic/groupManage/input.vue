<template>
  <div class="inputArea">
      <!-- <el-form label-width="80px" label-position="right">
            <el-form-item label="公司名称">
                <el-input size="small" style="width:180px;" v-model.trim = "store.searchData.name" placeholder="请输入公司名称"></el-input>
                <el-autocomplete
                    v-model="store.searchInput"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入公司名称"
                    :trigger-on-focus="false"
                    @select="handleSelect"
                    size="small"
                    style="width:180px;"
                ></el-autocomplete>
            </el-form-item>
      </el-form> -->
      <el-form :model="store.searchData" label-width="80px" label-position="right">
            <!-- <el-col :span="10"> -->
                <el-form-item label="创建时间" style="margin-bottom:10px;">
                        <el-date-picker
                            v-model="store.searchData.createDate"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            size="small"
                            >   
                        </el-date-picker>
                </el-form-item>
                <el-form-item label="机构名称"  style="margin-bottom:10px;">
                    <el-input v-model="store.searchData.name" size="small" placeholder="请输入机构名称"></el-input>
                </el-form-item>
                <el-form-item label="机构类型" style="margin-bottom:18px;">
                    <el-select clearable v-model="store.searchData.type" size="small" placeholder="请选择">
                        <el-option key="1" value="1" label="公司"></el-option>
                        <el-option key="2" value="2" label="部门"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="机构状态" style="margin-bottom:18px;">
                    <el-select clearable v-model="store.searchData.state" size="small" placeholder="请选择">
                        <el-option key="REGISTERED" value="REGISTERED" label="启用"></el-option>
                        <el-option key="BLOCK_UP" value="BLOCK_UP" label="停用"></el-option>
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
      store: store
    }
  },
  methods: {
      // querySearch(queryString, cb) {
      //   let restaurants = this.store.restaurants;
      //   let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      //   // 调用 callback 返回建议列表的数据
      //   cb(results);
      // },
      // createFilter(queryString) {
      //   return (restaurant) => {
      //     return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      //   };
      // },
      // //选择某项后数据过滤处理
      // handleSelect(item) {
      //   let result = item.value;
      //   this.store.tableData = this.store.tableData.filter((item, index) => {
      //       return (item.company_name == result) 
      //   })
      //   console.log(this.store.tableData);
      // },
  }
}
</script>
<style scoped>
#FilterT .el-form-item{
  display: inline-block;
  margin-bottom:18px;
}
#FilterT .el-input{
  width: 180px;
}
#FilterT .el-select{
  width: 180px;
}
</style>
