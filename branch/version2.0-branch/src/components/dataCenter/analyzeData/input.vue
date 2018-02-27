<template>
  <div id="inputArea">
    <el-form ref="form" size= 'small' :inline='true' :model="store.form" label-width="">
            <el-form-item label="  ">
              <el-select v-model="store.form.province" clearable filterable placeholder="请选择省市">
                <el-option
                  v-for="(item,i) in store.restaurantsP"
                  :key="i"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="  ">
              <el-select v-model="store.form.area" clearable filterable placeholder="请选择市区">
                <el-option
                  v-for="(item,i) in store.restaurantsR"
                  :key="i"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="  ">
            <div class="block">
            <el-cascader
              clearable
              :options="store.restaurantsC"
              change-on-select
              v-model="store.form.companyChild"
              placeholder="请选择公司"
            ></el-cascader>
            </div>
          </el-form-item>
            <el-form-item label="  ">
              <el-select v-model="store.form.boileroom" clearable filterable placeholder="请选择锅炉">
                <el-option
                  v-for="(item,i) in store.restaurantsS"
                  :key="i"
                  :label="item.boiler"
                  :value="item.boiler">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="  ">
              <el-select v-model="store.form.boiler" clearable filterable placeholder="请选择烟囱">
                <el-option
                 v-for="(item,i) in store.allStands"
                :key="i"
                :label="item.name"
                :value="item.unitId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
  </div>
</template>
<script>
import { store } from './store'
import { globalStore } from '../../base/store'
import { doMain } from '../../../protocal/url'
import { RealTimeDataProtocal } from '../../../protocal/web/RealTimeDataProtocal'
import { PositionProtocal } from '../../../protocal/web/PositionProtocal'
import { BoilerHouserProtocal } from '../../../protocal/web/BoilerHouserProtocal'
import { axiosHttpPost } from '../../../assets/js/axios'
export default {
  data() {
    return {
      store,
      globalStore
    }
  },
  methods:{
    // 获取搜省市
    getPosition() {
      let _this = this;
      let url = doMain.web + PositionProtocal.getCity.rest;
      let data = PositionProtocal.getCity.request;
      axiosHttpPost(_this, url, data, function(res) {
        _this.store.restaurantsP = res.data.result;
      });
    },
    // 获取区域
    getArea(params){
      let _this = this;
      let url = doMain.web + PositionProtocal.getArea.rest;
      let data = PositionProtocal.getArea.request;
      data.city = params;
      data.companyId = this.globalStore.userInfo.companyId;
      axiosHttpPost(_this, url, data, function(res) {
        _this.store.restaurantsR = res.data.result;
      });
    },
    // 搜索公司锅炉
    getCompanyAndBoileroom() {
      let _this = this;
      let url = doMain.web + PositionProtocal.listCompany.rest;
      let data = PositionProtocal.listCompany.request;
      data.city = this.store.form.province;
      data.area = this.store.form.area;
      axiosHttpPost(this, url, data, res => {
        if(res.data.status == "FAIL"){
          _this.$message.error(res.data.message)
          _this.store.restaurantsC = [];
        }else{
          _this.store.restaurantsC = res.data.result;
        }        
      });
    },
    // 再次获取锅炉房
    getBoilerAllAgain(id) {
      let _this = this;
      let url = doMain.web + PositionProtocal.listBoilerHourse.rest;
      let data = PositionProtocal.listBoilerHourse.request;
      data.id = id;
      axiosHttpPost(this, url, data, res => {        
        _this.store.restaurantsS = res.data.result;
      });
    },
    // 又一次获取锅炉房
    getBoilerAgainAgain(id){
      let _this = this;
      let url = doMain.web + PositionProtocal.listBoilerState.rest;
      let data = PositionProtocal.listBoilerState.request;
          data.id = id;
      axiosHttpPost(this,url,data,(res)=>{
        _this.store.boileroomId = res.data.result[0].id;        
      })

    },

  },
  mounted(){
    this.getPosition();
  },
  computed:{
    province(){
      return this.store.form.province
    },
    area(){
      return this.store.form.area
    },
    companyChild(){
      return this.store.form.companyChild
    },
    company(){
      return this.store.form.company
    },
    boileroom(){
      return this.store.form.boileroom
    },
    boiler(){
      return this.store.form.boiler
    }
  },
  watch:{
    province(newValue,oldValue){
      this.store.form.area = ""
      this.store.restaurantsR = [];
      this.store.restaurantsP.forEach((item)=>{
        if(newValue == item){
          this.getArea(item)
        }
      })
    },
    area(newValue,oldValue){
      this.store.form.company = "",
      this.store.restaurantsC = [];
      this.store.form.companyChild = [];
        this.store.restaurantsR.forEach(item => {
          if (item == newValue) {
            this.getCompanyAndBoileroom();
          }
        });
    },
    companyChild(newValue,oldValue){
      this.store.form.boileroom = "",
      this.store.restaurantsS = [];
      this.store.restaurantsC.forEach(item => {
        switch (newValue.length) {
          case 0:
            break;
          case 1:
            this.store.form.company = item.label;
            this.getBoilerAllAgain(item.value);
            this.store.form.companyId = item.value;
            break;
          case 2:
            item.children.forEach(jtem => {
              if (jtem.value == newValue[newValue.length - 1]) {
                this.store.form.company = jtem.label;
                this.getBoilerAllAgain(jtem.value);
                this.store.form.companyId = jtem.value;
              }
            });
            break;
          case 3:
            item.children.forEach(jtem => {
              jtem.children.forEach(ktem => {
                if (ktem.value == newValue[newValue.length - 1]) {
                  this.store.form.company = ktem.label;
                  this.getBoilerAllAgain(ktem.value);
                  this.store.form.companyId = ktem.value;
                }
              });
            });
        }
      })
    },
    boileroom(newValue,oldValue){
      let _this = this;
      this.store.form.boiler = '';
      this.store.restaurantsS.forEach((item)=>{
        if(item.boiler == newValue){
          let url = doMain.web + BoilerHouserProtocal.getAllGasById.rest;
          let data = BoilerHouserProtocal.getAllGasById.request;
          data.id = item.id;
          axiosHttpPost(_this, url, data, res => {
            _this.store.allStands = res.data.result;
            _this.store.form.boiler = res.data.result[0].name;
          });
        }
      })
    },
    boiler(newValue,oldValue){
      
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
