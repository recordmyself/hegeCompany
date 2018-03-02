<template>
  <div id="realData">
    <div id="search">
      <el-form ref="form" size= 'small' :inline="true" :model="store.form" label-width="20px">
        <el-form-item label="  ">
          <el-select v-model="store.form.province" clearable filterable placeholder="请选择省份">
            <el-option
              v-for="(item,i) in store.restaurantsP"
              :key="i"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="  ">
          <el-select v-model="store.form.area" clearable filterable placeholder="请选择县市">
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
          <el-select v-model="store.form.boiler" disabled clearable filterable placeholder="请选择烟囱">
            <el-option
              v-for="(item,i) in store.allStands"
              :key="i"
              :label="item.name"
              :value="item.unitId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span v-show="store.showSearch" id="searchText">选择烟囱，查看烟囱实时数据</span>
      <div id="showType"></div>
    </div>
    <div id="assist"></div>
    <div id="parentVue">
      <div id="pic" v-if="this.store.show0">
        <picTureAndLine/>
      </div>
      <div id="tab" v-if="this.store.show1">
        <onlyTable />
        <div id="paging">
          <Pading @tabView='tabView' ref='getTotal'/>
        </div>
      </div>
      <div style="height: 50px;line-height:50px;color: #FFF;padding: 0 0 0 25px;">折线图数据（当前烟囱实时数据）</div>
      <div id="lin">
        <onlyLine />
      </div>
    </div>

    <!-- <contant-view></contant-view> -->
  </div>
</template>
<script>
import { store } from './store'
import { globalStore } from '../../base/store'
// import $ from 'jquery'
import { getLineInfo } from './realdata'
import { doMain } from '../../../protocal/url'
import { RealTimeDataProtocal } from '../../../protocal/web/RealTimeDataProtocal'
import { PositionProtocal } from '../../../protocal/web/PositionProtocal'
import { BoilerHouserProtocal } from '../../../protocal/web/BoilerHouserProtocal'
import { axiosHttpPost } from '../../../assets/js/axios'
import seletT from './selectDiy.js'
import picTureAndLine from './picTureAndLine.vue'
import onlyTable from './onlyTable.vue'
import onlyLine from './onlyLine.vue'
import Pading from '../../base/paging.vue'

export default {
  components:{
    picTureAndLine,
    onlyTable,
    onlyLine,
    Pading
  },
  data() {
    return {
      store,
      globalStore
    }
  },
  methods:{
    getTotal() {
      this.$refs.getTotal.setTotal();
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
        if(_this.store.account1 == 0){
          _this.getInfoTwo();
        };
         _this.store.account1++; 
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
        _this.store.restaurantsC = res.data.result;
        if(_this.store.account == 0){
            _this.getTopInfoOther();
            _this.store.account ++;
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
    // 加载页面的时候获取烟囱的详细信息
    getBoilerDetailOrg(params){
      console.log(params)
      if(params == null){
        this.$message.warning('请选择烟囱');
        return;
      }
      let _this = this;
      let url = doMain.web + RealTimeDataProtocal.get.rest;
      let data = RealTimeDataProtocal.get.request;
          data.gasSn = params.gasSn
      axiosHttpPost(this,url,data,(res)=>{
        if(res.data.status == 'FAIL'){
          this.$message.warning({
            message: res.data.message,
            duration: 1000
          });
          _this.store.realdata = {};
        }else{
          _this.store.realdata = res.data.result;
          _this.getTopInfo()
          sessionStorage.setItem('boiler',JSON.stringify({gasSn: params.gasSn}))
        };
        _this.tabView(params);
      })
    },
    // 获取表格信息
      tabView(params){
        if(params == null){
          params = JSON.parse(sessionStorage.getItem('boiler'));
        }
        let _this = this;
        let url = doMain.web + RealTimeDataProtocal.list.rest;
        let data = RealTimeDataProtocal.list.request;
        data.gasSn = params.gasSn
        data.page = this.globalStore.pages.page;
        data.rows = this.globalStore.pages.rows;
        axiosHttpPost(this,url,data,function(res){          
          if(res.data.status == 'FAIL'){
            this.$message.warning(res.data.message)
            _this.store.tableData = [];
            _this.globalStore.pages.totalRows = 0;
          }else{
            _this.store.tableData = res.data.result.list;
            _this.globalStore.pages.totalRows = res.data.result.totalRows;
          }
          _this.getTotal();
        })
        _this.getLine(params)
      },
      // 顶部信息
      getTopInfo(){
        this.store.form.province = this.store.realdata.city;
      },
      getInfoTwo(){
        this.store.form.area = this.store.realdata.areaAddress;
      },
      // 顶部信息
      getTopInfoOther(){
        setTimeout(()=>{
          console.log(this.store.realdata)
          this.store.form.companyChild = this.store.realdata.company;
        },10);
        setTimeout(()=>{
          this.store.form.boileroom = this.store.realdata.boiler;
        },20)
        setTimeout(()=>{
          this.store.form.boiler = this.store.realdata.gasName;
        },30)
      },
      // 获取折线图
      getLine(params){
        $('#showType .select').remove();
        $("#showType .content").remove();
        this.store.show0 = true;
        this.store.show1 = true;
        seletT('#showType',{width: '120px',height: '30px',data: this.store.typeAll,that: this},(res)=>{
          if(res==0){
            this.store.show0 = true;
            this.store.show1 = true;
            getLineInfo(this,params)
          }
          if(res==1){
            this.store.show0 = true;
            this.store.show1 = false;
            getLineInfo(this,params)
          }
          if(res==2){
            this.store.show0 = false;
            this.store.show1 = true;
            getLineInfo(this,params)
          }
        })
        getLineInfo(this,params)
        
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
    },
  },
  created(){
    
    this.store.form = {
        province: '',
        area: '',
        company: '',
        companyId:'',
        companyChild:[],
        boileroom: '',
        boiler: '',
      }
      this.store.account = 0;
      this.store.account1 = 0;
      this.globalStore.pages.page = 1
  },
  mounted(){
    let _this = this;
    // 获取搜索信息
    this.getPosition();
    // // 获取烟囱详细信息
    this.getBoilerDetailOrg(sessionStorage.getItem('boiler') != null?JSON.parse(sessionStorage.getItem('boiler')):null);
    let timer1 = setInterval(()=>{

      if($('body').width() < 1550){
        this.store.showSearch = false;
      }else{
        this.store.showSearch = true
      }
    },1);
    this.store.setInterValStatues = setInterval(()=>{
      this.changeBackground();
    },1)
    setInterval(()=>{
      if(this.globalStore.refresh == 5 * 60 * 1000){
          this.globalStore.pages.page = 1;
          this.globalStore.pages.rows = 12;
          this.getBoilerDetailOrg(sessionStorage.getItem('boiler') != null?JSON.parse(sessionStorage.getItem('boiler')):null);
          this.globalStore.refresh = 0;
      }
        this.globalStore.refresh++;
    },1)
    
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
  beforeRouteLeave(to,from,next){
    clearInterval(this.store.setInterValStatues);
    next();
  },
  watch:{
    province(newValue,oldVaule){
      this.store.form.area = '',
      this.store.restaurantsR = []
        this.store.restaurantsP.forEach((item)=> {
          if(item == newValue){
            this.getArea(item);
          }
        })
    },
    area(newValue,oldValue){
      this.store.form.companyChild = [],
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
      this.store.restaurantsC.forEach(item => {
        console.log(newValue)
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
      let _this = this;
      this.store.allStands.forEach((item)=>{
        if(item.name == newValue){
          _this.getBoilerDetailOrg(item);
          _this.globalStore.pages.page = 1;
          _this.globalStore.pages.rows = 12;
        }
      })
    }
  }
}
</script>
<style scoped>
#realData{
  position: relative;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  background: #0d111a;
}
#search {
  position: absolute;
  width:100%;
  height: 50px;
  line-height: 50px;
  z-index: 1000;
  background: #181f29
}
#search .el-form{
  display: inline-block;
}
#search .el-form-item{
  padding: 0;
  margin: -42px 0 0 15px;
  width: 160px
}
#searchText{
  margin-left: 15px;
  font-size: 14px;
  color: #CCC;
}
#showType{
  float: right;
  /* margin-left: 30px; */
  margin-top: 11px;
  margin-right: 25px;
  height: 25px;
  width: 80px;
  outline: none;
  border: none;
  color: #d18c30;
  background: transparent
}
#showType option{
  margin: 5px 5px
}
/* 以上搜索框样式 */
#assist{
  height: 53px;
}
#pic{
  width: 100%;
  height: 410px;
  margin-bottom: 10px;
  /* padding-top: 10px; */
}
#lin{
  width: 100%;
  height: 60vw;
  /* padding-top: 10px; */
}
#tab{
  width: 100%;
  /* padding-top: 10px; */
}
#paging{
  text-align: center;
}
</style>
