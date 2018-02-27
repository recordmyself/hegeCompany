<template>
  <div id="cellSet">
    <div id="search">
        <el-form ref="form" size= 'small' :inline="true" :model="store.form" label-width="20px">
          <el-form-item label="  ">
            <el-select v-model="store.form.province" clearable filterable placeholder="请选择省份" size="small">
              <el-option
                v-for="(item,i) in store.restaurantsP"
                :key="i"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="  ">
            <el-select v-model="store.form.area" clearable filterable placeholder="请选择市县">
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
            <el-select v-model="store.form.boileroom" clearable filterable placeholder="请选择锅炉房">
              <el-option
                v-for="item in store.restaurantsS"
                :key="item.id"
                :label="item.boiler"
                :value="item.boiler">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="  ">
            <el-select v-model="store.form.boiler" disabled clearable filterable placeholder="请选择烟囱">
              <el-option
                v-for="item in store.allStands"
                :key="item.unitId"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span v-show="store.showSearch" id="searchText">选择烟囱，查看烟囱信息</span>
    </div>
    <div id="contentSet">
      <div style="width: 100%;">
        <div id="contentIpt" v-for="(item,i) in store.contentIpt" :key="i">
          <div>
            <span style="font-size: 15px;color: blue;font-weight: 700;display:inline-block;width: 120px;text-align: right">{{item.label}}</span>
            <el-form v-model="item.ruleList[0]" label-width="60px" label-position="right" size="small">
              <el-form-item :label="item.ruleList[1].script">
                <el-input v-model="item.ruleList[1].value"></el-input>
              </el-form-item>
              <el-form-item :label="item.ruleList[0].script">
                <el-input v-model="item.ruleList[0].value" @blur="tip(item)"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div id="contentSct">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    <div id="buttonSet">
      <el-button type="primary" size="small" :disabled="store.do" @click="saveData">保存</el-button>
      <el-button type="danger" size="small" :disabled="store.do" @click="reset">重置</el-button>
    </div>
  </div>
</template>
<script>
import { urlApiC } from '../../service/ip'
import { server } from '../../service/realDataService'
import { axiosHttpPost } from '../../assets/js/axios'
import { doMain } from '../../protocal/url'
import { LimitValueControllerProtocal } from '../../protocal/web/LimitValueControllerProtocal'
import { PositionProtocal } from '../../protocal/web/PositionProtocal'
import { BoilerHouserProtocal } from '../../protocal/web/BoilerHouserProtocal'
import { store } from './store'
import { globalStore } from '../base/store'
export default {
   data() {
     return {
       store,
       globalStore
     }
   },
   methods: {
     tip(item){
       console.log(item);
       if(Number(item.ruleList[0].value) <= Number(item.ruleList[1].value)){
         this.$message.warning('上线值不能小于或等于下线值')
         item.ruleList[0].value = '';
         item.ruleList[1].value = '';
       }
     },
     saveData(){
       let _this = this;
       let url = doMain.web + LimitValueControllerProtocal.create.rest;
       let data = LimitValueControllerProtocal.create.request;
            data.alarmConfig = this.store.contentIpt;
            data.gasId = this.store.form.boilerId
            data.companyId = this.store.form.companyId
            data.siteId = this.store.form.siteId;
       axiosHttpPost(this,url,data,function(res){
         _this.$message.success('保存成功')
       })
     },
    // 获取省市
    getPosition(position){
      let _this = this;
      let url = doMain.web + PositionProtocal.getCity.rest;
      let data = PositionProtocal.getCity.request;
        axiosHttpPost(this,url,data,function(res){
          _this.store.restaurantsP= res.data.result;
        })
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
      // 监听操作按钮
      // watchButton(){
      //   let _this = this
      //   setInterval(()=>{
      //     if(_this.store.form.boilerId == '' ){
      //       _this.store.do = true;
      //     }else{
      //       _this.store.do = false;
      //     }
      //   },10)
      // },
      reset(){

      },
      // 获取最初数据
      getInitData(gasId,companyId,siteId){
        let _this = this;
        let url = doMain.web + LimitValueControllerProtocal.listConfig.rest;
        let data = LimitValueControllerProtocal.listConfig.request;
            data.gasId = gasId
            data.companyId = companyId


            data.siteId = siteId;
            console.log(data.siteId)
        axiosHttpPost(this,url,data,function(res){
          console.log(res.data.result)
          _this.store.do = false;
          _this.store.contentIpt = res.data.result;
        })
      },
      // 搜索公司锅炉
    getCompanyAndBoileroom() {
      let _this = this;
      let url = doMain.web + PositionProtocal.listCompany.rest;
      let data = PositionProtocal.listCompany.request;
      data.city = this.store.form.province;
      data.area = this.store.form.area;
      axiosHttpPost(this, url, data, res => {
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
          console.log(res.data.result)
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
      // 修改输入框背景色
    changeBackground(){
      $('.el-input__inner').css({
        background: 'transparent',
        color:'#FFF'
      })
      $('.el-cascader__label').css({
        background: 'transparent',
        color:'#FFF'
      })
    }
   },
   mounted(){
     setTimeout(()=>{
      this.changeBackground();
     },1)
     let timer = setInterval(()=>{
      if($('body').width() < 1380){
        this.store.showSearch = false;
      }else{
        this.store.showSearch = true
      }
    })
   },
   created(){
     this.store.form = {
      province: '',
      area: '',
      company: '',
      companyChild:[],
      boileroom: '',
      boiler: '',
      date: '',
      proprety: '',
      level: '',

      boilerId: '',
      siteId: '',
      companyId: ''

    };
    //  this.watchButton();
     this.getPosition();
   },
    computed: {
    province(){
      return this.store.form.province;
    },
    area() {
      return this.store.form.area
    },
    companyChild(){
      return this.store.form.companyChild
    },
    boileroom(){
      return this.store.form.boileroom
    },
    boiler(){
      return this.store.form.boiler
    }
  },
  watch:{
    province(newValue,oldVaule){
      this.store.form.area = '',
      this.store.restaurantsR = []
        this.store.restaurantsP.forEach((item)=> {
          if(item == newValue){
            this.getArea(item)
          }
        })
    },
    area(newValue,oldValue){
      this.store.form.company = '',
      this.store.restaurantsC = []
        this.store.restaurantsR.forEach((item)=> {
          if(item == newValue){
            this.getCompanyAndBoileroom();
          }
        })
    },
    companyChild(newValue,oldValue){
      this.store.form.boileroom = "",
      this.store.restaurantsS = [];
      this.store.do = true;
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
      this.store.form.boilerId = '';
      if(newValue == ''){
        this.store.contentIpt = [];
      }else{
        this.store.restaurantsS.forEach((item)=>{
          if(item.boiler == newValue){
            let url = doMain.web + BoilerHouserProtocal.getAllGasById.rest;
            let data = BoilerHouserProtocal.getAllGasById.request;
            data.id = item.id;
            this.store.form.boilerId = item.id
            axiosHttpPost(_this, url, data, res => {
              _this.store.allStands = res.data.result;
              if(res.data.result.length == 0){
                _this.$message.warning('当前锅炉房下没有烟囱！')
                _this.store.do = true;
              }else{
                _this.store.form.boiler = res.data.result[0].name;
                _this.store.do = false;
              }         
            });
          }
        })
      }
    },
    boiler(newValue,oldValue){
      this.store.allStands.forEach(item=>{
        if(item.name == newValue){
          this.store.form.boilerId = item.id;
          this.store.form.companyId = item.companyId;
          this.store.form.siteId = item.siteId;
          this.getInitData(item.id,item.companyId,item.siteId)
        }
      })
    }
  }
}
</script>
<style scoped>
#cellSet{
  position: relative;
  padding: 50px 0 0 0;
  width: 100%;
  height: 93%;
  background: #FFF
}
#search{
 position: absolute;
  top: 0.5%;
  width: 99%;
  margin: 0 0.5%;
  height: 50px;
  line-height: 50px;
  z-index: 1000;
  background: rgba(21,31,41,0.5)
}
#search .el-form{
  display: inline-block;
}
#search .el-form-item{
  padding: 0;
  margin: -42px 0 0 15px;
  width: 170px
}
#searchText{
  margin-left: 15px;
  font-size: 14px;
  color: #CCC;
}
#contentSet{
  width: 100%;
  min-height: 100px;
  max-height: 88%;
  padding-top: 25px;
}
#contentIpt{
  display: inline-block;
  width: 50%;
  height: 50px;
}
#contentIpt .el-form{
  display: inline-block;
  width:70%;
}
#contentIpt .el-form-item{
  display: inline-block;
  width: 48%;
  margin: 0;
}
#buttonSet{
  height: 6%;
  text-align: center;
  line-height: 50px;
}
#buttonSet .el-button{
  width: 80px;
}
</style>
