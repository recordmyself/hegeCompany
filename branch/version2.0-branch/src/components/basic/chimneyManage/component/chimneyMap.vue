<template>
  <div class="contentShow">

     <div class="showArea">
      <div id="search">
        <el-form ref="form" size= 'small' :inline="true" :model="globalStore.form" label-width="20px">
          <el-form-item label="  " style="color:#FFF">
            <el-select v-model="globalStore.form.province" clearable filterable placeholder="请选择省份">
              <el-option
                v-for="(item,i) in globalStore.restaurantsP"
                :key="i"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="  ">
            <el-select v-model="globalStore.form.area" clearable filterable placeholder="请选择市县">
              <el-option
                v-for="(item,i) in globalStore.restaurantsR"
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
              :options="globalStore.restaurantsC"
              change-on-select
              v-model="globalStore.form.companyChild"
              placeholder="请选择公司"
            ></el-cascader>
            </div>
          </el-form-item>
          <el-form-item label="  ">
            <el-select v-model="globalStore.form.boileroom" clearable filterable placeholder="请选择锅炉房">
              <el-option
                v-for="item in globalStore.restaurantsS"
                :key="item.id"
                :label="item.boiler"
                :value="item.boiler">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span v-show="globalStore.showSearch" id="searchText">选择烟囱，查看烟囱信息</span>
      </div>
      <!-- 地图区域 -->
      <div id="container"></div>
    </div>
    <!-- 单击标注弹出层 -->
  </div>
</template>
<script>
import CMap from "../../../../assets/js/map/Map";
import { axiosHttpPost } from '../../../../assets/js/axios'
import $ from "jquery";
import { lastStorage } from "../../../../assets/js/map/localstorage";
import { cookie } from "../../../../assets/js/cookie";
import { doMain } from '../../../../protocal/url'
import { PositionProtocal } from '../../../../protocal/web/PositionProtocal'
// import { domain.web } from "../../../../service/ip";
// import { server } from "../../../../service/realDataService";
import { userDetail } from '../../../base/userInfo'
import { globalStore } from '../../../base/store'

export default {
  components: {
  },
  data() {
    return {
      globalStore
    };
  },
  methods: {
    // 弹出层弹出获取公司信息
    tabView(tab) {
      this.globalStore.loading = true;
      let _this = this;
      if (tab) {
        this.globalStore.index = Number(tab.index) + 1;
      }
      console.log(this.globalStore.index)
      switch (this.globalStore.index) {
        // 公司信息
        case 1:
          let url = doMain.web + PositionProtocal.getHouseInfo.rest;
          let data = PositionProtocal.getHouseInfo.request;
          data.id = this.globalStore.boilerId;
          axiosHttpPost(this, url, data, function(res) {
            console.log("公司信息",res)
            if(res.data.status == "FAIL"){
              _this.$message.warning(res.data.message);
            }else{
              _this.globalStore.companyInfo = res.data.result;
            }
          });
          break;
        // 锅炉信息
        case 2:
          this.handleCurrentChange1();
          break;
        // 报警信息
        case 3:
          this.handleCurrentChange2();
          break;
      }
    },
    handleChange(value) {
      console.log(value);
    },
    // 分页
    // 获取烟囱列表
    getBoilerList(val) {
      let _this = this;
      this.globalStore.loading = true;
      let url = doMain.web + PositionProtocal.getChimneyList.rest;
      let data = PositionProtocal.getChimneyList.request;
      data.page = val || 1;
      data.rows = this.globalStore.pages1.size1;
      data.id = this.globalStore.boilerId;
      axiosHttpPost(this, url, data, function(res) {
        console.log('烟囱列表',res)
        if(res.data.status == 'FAIL'){
          _this.$message.warning(res.data.message);
          _this.globalStore.tableData = [];
        }else{
          _this.globalStore.tableData = res.data.result.list;
          _this.globalStore.pages1.total1 = res.data.result.totalRows;
        }
        _this.globalStore.loading = false;
      });
    },
    handleSizeChange1(val) {
      this.getBoilerList(val);
    },
    handleCurrentChange1(val) {
      this.getBoilerList(val);
    },
    // 获取报警列表
    getAlarmList(val) {
      let _this = this;
      _this.globalStore.loading = true;
      let url = doMain.web + PositionProtocal.getAlarmList.rest;
      let data = PositionProtocal.getAlarmList.request;
      data.page = val || 1;
      data.id = this.globalStore.boilerId;
      data.rows = this.globalStore.pages2.size2;
      axiosHttpPost(this, url, data, function(res) {
        console.log('报警列表',res)
        if(res.data.status == 'FAIL'){
          _this.globalStore.tableData = [];
          _this.$message.warning(res.data.message)
        }else{
        _this.globalStore.tableData = res.data.result.list;
        _this.globalStore.pages2.total2 = res.data.result.totalRows;
        }
        _this.globalStore.loading = false;
      });
    },
    handleSizeChange2(val) {
      this.getAlarmList(val);
    },
    handleCurrentChange2(val) {
      this.getAlarmList(val);
    },
    getBoilerAll() {
      let _this = this;
      // 这里根据企业获取所有的锅炉房
      let url = doMain.web + PositionProtocal.listPotion.rest;
      let data = PositionProtocal.listPotion.request;
      data.city = this.globalStore.form.province || "";
      data.area = this.globalStore.form.area || "";
      data.company = this.globalStore.form.company || "";
      data.boiler = this.globalStore.form.boileroom || "";
      axiosHttpPost(this, url, data, function(res) {
        console.log('here',res)
        _this.globalStore.cellNum = 0;
        if (res.data.result) {
          res.data.result.forEach(item => {
            if (item.stateNum == 2) {
              _this.globalStore.cellNum++;
            }
          });
        }
        CMap.addMaker(_this, {
          alleStand: res.data.result ? res.data.result : []
        });
      });
    },
    // 获取搜省市
    getPosition() {
      let _this = this;
      let url = doMain.web + PositionProtocal.getCity.rest;
      let data = PositionProtocal.getCity.request;
      axiosHttpPost(_this, url, data, function(res) {
        _this.globalStore.restaurantsP = res.data.result;
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
        _this.globalStore.restaurantsR = res.data.result;
      });
    },
    // 搜索公司锅炉
    getCompanyAndBoileroom() {
      let _this = this;
      let url = doMain.web + PositionProtocal.listCompany.rest;
      let data = PositionProtocal.listCompany.request;
      data.city = this.globalStore.form.province;
      data.area = this.globalStore.form.area;
      axiosHttpPost(this, url, data, res => {
        if(res.data.status == "FAIL"){
          _this.$message.error(res.data.message)
          _this.globalStore.restaurantsC = [];
        }else{
          _this.globalStore.restaurantsC = res.data.result;
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
        _this.globalStore.cellNum = 0;
        if (res.data.result) {
          res.data.result.forEach(item => {
            if (item.stateNum == 2) {
              _this.globalStore.cellNum++;
            }
          });
        }
        _this.globalStore.restaurantsS = res.data.result;
        CMap.addMaker(_this, {
          alleStand: res.data.result ? res.data.result : []
        });
      });
    },
    // 又一次获取锅炉房
    getBoilerAgainAgain(id){
      let _this = this;
      let url = doMain.web + PositionProtocal.listBoilerState.rest;
      let data = PositionProtocal.listBoilerState.request;
          data.id = id;
      axiosHttpPost(this,url,data,(res)=>{
        _this.globalStore.cellNum = 0;
        if (res.data.result) {
          res.data.result.forEach(item => {
            if (item.stateNum == 2) {
              _this.globalStore.cellNum++;
            }
          });
        }
        _this.globalStore.boileroomId = res.data.result[0].id;
        CMap.addMaker(_this, {
          alleStand: res.data.result ? res.data.result : []
        });
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
  created() {
    this.globalStore.form = {
        province: '',
        area: '',
        company: '',
        companyChild: [],
        companyId: '',
        boileroom: '',
        boiler: ''
      }
    let _this = this;
    this.globalStore.dialogVisible = false;
    this.globalStore.activeName = "first";
    },
  mounted() {
    let _this = this;
    // 获取搜索信息
    this.getPosition();
    // 获取锅炉房信息
    this.getBoilerAll();
    let timer1 = 0;
    let timer2 = 0;
    let timer3 = 0;
    // timer1 = setInterval(() => {
    //   let Mint = new Date().getMinutes();
    //   if (Mint % 5 == 0) {
    //     if(this.globalStore.boileroomId != ''){
    //       clearInterval(timer3)
    //       this.getBoilerAgainAgain(this.globalStore.boileroomId)
    //       timer2 = setInterval(()=>{
    //         this.getBoilerAgainAgain(this.globalStore.boileroomId)
    //       },5* 1000)
    //     }else if(this.globalStore.form.companyChild.length != 0){
    //       clearInterval(timer2)
    //       this.getBoilerAllAgain(this.globalStore.form.companyId)
    //       timer3 = setInterval((item)=>{
    //         this.getBoilerAllAgain(this.globalStore.form.companyId)
    //       },5 * 1000)
    //     }else{
    //       clearInterval(timer2);
    //       clearInterval(timer3)
    //       this.getBoilerAll();
    //       setInterval(() => {
    //         this.getBoilerAll();
    //       }, 5 * 1000);
    //     }
    //     clearInterval(timer1);
    //   }
    // }, 300);
    this.changeBackground();
    let timer = setInterval(()=>{
      if($('body').width() < 1280){
        this.globalStore.showSearch = false;
      }else{
        this.globalStore.showSearch = true
      }
    })
  },
  computed: {
    province() {
      return this.globalStore.form.province;
    },
    area() {
      return this.globalStore.form.area;
    },
    companyChild() {
      return this.globalStore.form.companyChild;
    },
    boileroom() {
      return this.globalStore.form.boileroom;
    }
  },
  watch: {
    province(newValue, oldVaule) {
      this.globalStore.form.area = ""
      this.globalStore.restaurantsR = [];
      if (this.globalStore.restaurantsP.length != 0) {
        this.globalStore.restaurantsP.forEach(item => {
          if (item.label == newValue) {
            this.globalStore.restaurantsR = item.children;
          }
        });
      }
      this.getBoilerAll();
    },
    area(newValue, oldValue) {
      this.globalStore.form.company = "",
      this.globalStore.restaurantsC = [];
      this.globalStore.form.companyChild = [];
      if (this.globalStore.restaurantsR.length != 0) {
        this.globalStore.restaurantsR.forEach(item => {
          if (item.label == newValue) {
            this.getCompanyAndBoileroom();
          }
        });
      }
      this.getBoilerAll();
    },
    companyChild(newValue, oldValue) {
      this.globalStore.form.boileroom = "",
      this.globalStore.restaurantsS = [];
      console.log(newValue)
      this.globalStore.restaurantsC.forEach(item => {
        switch (newValue.length) {
          case 0:
          this.getBoilerAll();
            break;
          case 1:
            this.globalStore.form.company = item.label;
            this.getBoilerAllAgain(item.value);
            this.globalStore.form.companyId = item.value;
            break;
          case 2:
            item.children.forEach(jtem => {
              if (jtem.value == newValue[newValue.length - 1]) {
                this.globalStore.form.company = jtem.label;
                this.getBoilerAllAgain(jtem.value);
                this.globalStore.form.companyId = jtem.value;
              }
            });
            break;
          case 3:
            item.children.forEach(jtem => {
              jtem.children.forEach(ktem => {
                if (ktem.value == newValue[newValue.length - 1]) {
                  this.globalStore.form.company = ktem.label;
                  this.getBoilerAllAgain(ktem.value);
                  this.globalStore.form.companyId = ktem.value;
                }
              });
            });
        }
      });
    },
    boileroom(newValue, oldValue) {
      if(newValue == ''){
      console.log('1')

        this.globalStore.restaurantsC.forEach(item => {
        switch (newValue.length) {
          case 0:
          this.getBoilerAll();
            break;
          case 1:
            this.globalStore.form.company = item.label;
            this.getBoilerAllAgain(item.value);
            this.globalStore.form.companyId = item.value;
            break;
          case 2:
            item.children.forEach(jtem => {
              if (jtem.value == newValue[newValue.length - 1]) {
                this.globalStore.form.company = jtem.label;
                this.getBoilerAllAgain(jtem.value);
                this.globalStore.form.companyId = jtem.value;
              }
            });
            break;
          case 3:
            item.children.forEach(jtem => {
              jtem.children.forEach(ktem => {
                if (ktem.value == newValue[newValue.length - 1]) {
                  this.globalStore.form.company = ktem.label;
                  this.getBoilerAllAgain(ktem.value);
                  this.globalStore.form.companyId = ktem.value;
                }
              });
            });
        }
      });
      }else{
        this.globalStore.restaurantsS.forEach(item => {
        if (item.boiler == newValue) {
          this.getBoilerAgainAgain(item.id)
          }
        });
      }
    }
  }
};
</script>
<style scoped>
.contentShow { width: 100%; height: 100%; background: #fff;}
.contentShow .showArea { position: relative; width: 100%; height: 100%; overflow: hidden; border-radius: 2px;}
/* 内容展示区 */
/* 地图 */
#container {
  width: 100%;
  height: 100%;
}
/* 弹出层样式 */
#TipHide {
  position: absolute;
  z-index: 1000;
  top: 35px;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}
#TipHide .contentHide {
  width: 1000px;
  height: 650px;
  margin: 2% auto 0;
  border-radius: 5px;
  overflow: hidden;
  background: #fff;
}
#TipHide .content_top {
  position: relative;
  letter-spacing: 2px;
  font-size: 20px;
  color: black;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: #eee;
  border-bottom: 1px solid #eee;
}
#TipHide .el-icon-close {
  position: absolute;
  color: black;
  font-size: 18px;
  z-index: 1001;
  top: 15px;
  right: 10px;
}

#TipHide .content_middle {
  height: 530px;
  width: 98%;
  margin: 0 auto;
  color: black;
  /* background: #FFF; */
}
#TipHide .el-menu--horizontal {
  padding-left: 50px;
}
#TipHide .companyName {
  width: 98%;
  height: 530px;
  margin: 0px auto;
  display: none;
  box-sizing: border-box;
  padding: 10px;
}
#TipHide .el-menu--horizontal .el-menu-item {
  height: 35px;
  line-height: 35px;
  color: white;
}
#TipHide .content_bottom {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  margin-top: 20px;
  /* padding-right: 50px; */
}
#TipHide .el-pagination {
  line-height: 27px;
}
/* 表格 */
#comDetail {
  border-collapse: collapse;
  width: 100%;
  height: 100%;
}
#comDetail tr,
td {
  border: 1px solid #000;
}
#comDetail td {
  width: 200px;
  height: 30px;
  padding-left: 15px;
}
.content_bottom .buttonArea {
  position: absolute;
  top: 5px;
  right: 100px;
}
#paging {
  text-align: center;
}
#search {
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
</style>

