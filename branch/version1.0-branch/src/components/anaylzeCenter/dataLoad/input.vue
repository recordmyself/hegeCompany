<template>
  <div class="inputArea">
    <el-form ref="form" :inline="true" size= 'small' :model="store.form" label-width="80px">
      <el-form-item label="省市">
        <el-row class="demo-autocomplete">
          <el-col>
            <el-autocomplete
              class="inline-input"
              v-model="store.form.province"
              :fetch-suggestions="querySearchP"
              placeholder="请选择省市"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="区域">
        <el-row class="demo-autocomplete">
          <el-col>
            <el-autocomplete
              class="inline-input"
              v-model="store.form.area"
              :fetch-suggestions="querySearchR"
              placeholder="请选择区域"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="单位名称">
        <div class="block">
        <el-cascader
          clearable
          :options="store.restaurantsC"
          change-on-select
          v-model="store.form.companyChild"
        ></el-cascader>
        </div>
      </el-form-item>
      <el-form-item label="站点">
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
      <el-form-item label="烟囱">
        <el-row class="demo-autocomplete">
          <el-col>
            <el-autocomplete
              disabled
              class="inline-input"
              v-model="store.form.boiler"
              :fetch-suggestions="querySearchB"
              placeholder="请选择烟囱"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        </el-row>
      </el-form-item>

    </el-form>
  </div>
</template>
<script>
import { store } from "./store";
import { globalStore } from '../../base/store'
import { axiosHttpPost } from "../../../assets/js/axios";
import { doMain } from "../../../protocal/url";
import { BoilerHouserProtocal } from "../../../protocal/web/BoilerHouserProtocal";
import { PositionProtocal } from "../../../protocal/web/PositionProtocal";
export default {
  data() {
    return {
      store: store,
      globalStore
    };
  },
  methods: {
    changeType(data) {
      let result = [];
      data.forEach(item => {
        if (item.label) {
          result.unshift({ value: item.label });
        } else if (item.boiler) {
          result.unshift({ value: item.boiler });
        } else if (item.name) {
          result.unshift({ value: item.name });
        } else if(item.houseName){
          result.unshift({ value: item.houseName });
        }else{
          result.unshift({ value: item });
        }
      });
      return result;
    },
    querySearchP(queryString, cb) {
      var restaurants = this.changeType(this.store.restaurantsP);
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    querySearchR(queryString, cb) {
      var restaurants = this.changeType(this.store.restaurantsR);
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    querySearchC(queryString, cb) {
      var restaurants = this.changeType(this.store.restaurantsC);
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    querySearchS(queryString, cb) {
      var restaurants = this.changeType(this.store.restaurantsS);
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    querySearchB(queryString, cb) {
      var restaurants = this.changeType(this.store.allStands);
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    handleSelect(val) {},
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
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
        console.log("see here again", data, res.data.result);
        _this.store.restaurantsC = res.data.result;
      });
    },
    // 再次获取锅炉房
    getBoilerAllAgain(id) {
      let _this = this;
      let url = doMain.web + PositionProtocal.listBoilerHourse.rest;
      let data = PositionProtocal.listBoilerHourse.request;
      data.id = id;
      axiosHttpPost(this, url, data, res => {
        if (res.data.result) {
          console.log("see here", res.data.result);
          _this.store.restaurantsS = res.data.result;
        }
      });
    }
  },
  computed: {
    province() {
      return this.store.form.province;
    },
    area() {
      return this.store.form.area;
    },
    companyChild() {
      return this.store.form.companyChild;
    },
    boileroom() {
      return this.store.form.boileroom;
    },
    boiler() {
      return this.store.form.boiler;
    }
  },
  watch: {
    province(newValue, oldVaule) {
      this.store.form.area = "",
      this.store.restaurantsR = [];
        this.store.restaurantsP.forEach(item => {
          if (item == newValue) {
            this.getArea(item)
          }
        });
    },
    area(newValue, oldValue) {
      this.store.form.company = "",
      this.store.form.companyChild = [];
        this.store.restaurantsR.forEach(item => {
          if (item == newValue) {
            this.getCompanyAndBoileroom();
          }
        });
    },
    companyChild(newValue, oldValue) {
      this.store.form.boileroom = "",
      this.store.restaurantsS = [];
      this.store.submitButton = true;
      this.store.restaurantsC.forEach(item => {
        switch (newValue.length) {
          case 0: ;
            break;
          case 1:
            this.store.form.company = item.label;
            this.getBoilerAllAgain(item.value);
            break;
          case 2:
            item.children.forEach(jtem => {
              if (jtem.value == newValue[newValue.length - 1]) {
                this.store.form.company = jtem.label;
                this.getBoilerAllAgain(jtem.value);
              }
            });
            break;
          case 3:
            item.children.forEach(jtem => {
              jtem.children.forEach(ktem => {
                if (ktem.value == newValue[newValue.length - 1]) {
                  this.store.form.company = ktem.label;
                  this.getBoilerAllAgain(ktem.value);
                }
              });
            });
        }
      });
    },
    boileroom(newValue, oldValue) {
      let _this = this;
      this.store.form.boiler = "";
      this.store.form.boilerId = ''
      this.store.allStands = [];
      this.store.restaurantsS.forEach(item => {
        if (item.boiler == newValue) {
          let url = doMain.web + BoilerHouserProtocal.getAllGasById.rest;
          let data = BoilerHouserProtocal.getAllGasById.request;
          data.id = item.id;
          this.store.form.boilerId = item.id
          axiosHttpPost(_this, url, data, res => {
            if(res.data.result.length == 0){
              _this.$message.warning('该锅炉房下没有锅炉！')
              _this.store.submitButton = true;
            }else{
              _this.store.form.boiler = res.data.result[0].name;
              _this.store.submitButton = false;
            }
            _this.store.allStands = res.data.result;            
          });
        }
      });
    },
    boiler(newValue, oldValue) {
        let _this = this;
        this.store.allStands.forEach(item => {
          if (item.name == newValue) {
            _this.store.submitButton = false;
          }
        });
    }
  }
};
</script>
<style scoped>
#FilterT .el-input {
  width: 180px;
}
#FilterT .el-select {
  width: 180px;
}
</style>
