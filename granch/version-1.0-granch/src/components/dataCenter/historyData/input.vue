<template>
  <div class="inputArea">
    <el-form ref="store.form"  :inline="true" size= 'small' :model="store.form" label-width="80px">
      <el-form-item label="站点">
        <el-row class="demo-autocomplete">
          <el-col>
            <el-autocomplete
              class="inline-input"
              v-model="store.form.boileroom"
              :fetch-suggestions="querySearchB"
              placeholder="请选择锅炉房"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="排烟站点">
        <el-row class="demo-autocomplete">
          <el-col>
            <el-autocomplete
              disabled
              class="inline-input"
              v-model="store.form.boiler"
              :fetch-suggestions="querySearchS"
              placeholder="请选择烟囱"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="数据项">
        <el-row class="demo-autocomplete">
          <el-col>
            <el-autocomplete
              class="inline-input"
              v-model="store.form.name"
              :fetch-suggestions="querySearchT"
              placeholder="请选择数据项"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="数值">
         <el-input :disabled="store.show" v-model="store.form.min" placeholder="请输入最小值"></el-input>
         -
         <el-input :disabled="store.show" v-model="store.form.max" placeholder="请输入最大值"></el-input>
      </el-form-item>
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
    changeType(data){
      let result = [];
      data.forEach((item)=>{
        if(item.boiler){
          result.unshift({value: item.boiler})
        }else{
          result.unshift({value: item.name})
        }

      })
      return result;
    },
    querySearchB(queryString, cb) {
        var restaurants = this.changeType(this.store.restrantsS);
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        cb(results);
      },
    querySearchS(queryString, cb) {
        var restaurants = this.changeType(this.store.allStands);
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        cb(results);
      },
    querySearchT(queryString, cb) {
        var restaurants = this.store.dataType;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        cb(results);
      },
    handleSelect(val){
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
#FilterT .el-input{
  width: 180px;
}

/* #FilterT .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
  width: 322px;
}
#FilterT .el-icon-circle-close{
  top: -15px;
} */
</style>
