<template>
  <div id="inputArea">
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
      <el-form-item label="锅炉站点">
        <el-row class="demo-autocomplete">
          <el-col>
            <el-autocomplete
              class="inline-input"
              v-model="store.form.boileroom"
              :fetch-suggestions="querySearchS"
              placeholder="请选择锅炉房"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="报警类型">
        <el-row class="demo-autocomplete">
          <el-col>
            <el-autocomplete
              class="inline-input"
              v-model="store.form.type"
              :fetch-suggestions="querySearchT"
              placeholder="请输选择报警内容"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="级别">
        <el-row class="demo-autocomplete">
          <el-col>
            <el-autocomplete
              class="inline-input"
              v-model="store.form.level"
              :fetch-suggestions="querySearchL"
              placeholder="请选择报警级别"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { store } from './store'
import { targetFile } from '../../../assets/js/targetFile'
export default {
  data() {
    return {
      store,
      targetFile
    }
  },
  methods:{
    querySearchS(queryString, cb) {
        var restaurants = this.store.restaurantsS;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        cb(results);
      },
    querySearchT(queryString, cb) {
        var restaurants = this.store.dataType;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        cb(results);
      },
    querySearchL(queryString, cb) {
        var restaurants = this.store.options;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
    handleSelect(val){
    },
  },
  mounted(){

    // setInterval(function(){

    //   $('#inputArea .el-form-item--small .el-form-item__label').css({
    //     lineHeight: '32px'
    //   })
    //    console.log($('#inputArea .el-form-item--small .el-form-item__label'))
    // },1000)
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
