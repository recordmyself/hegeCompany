<template>
  <div class="contentShow">

      <div class="showArea" v-show="true">
      <div class="showAreaTop">
        <div class="top_right" id="top_right">
          <el-form ref="form" size= 'small' :model="store.searchData" label-width="120px">
            <el-form-item label="经纬度查询">
              <el-input placeholder="请输入地址" v-model.trim="address"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="search" style="width:80px;">查询</el-button>
              <el-button type="primary" :disabled = "(globalStore.position.lng == undefined || globalStore.position.lat == undefined)" size="small" @click="confirm">获取当前标注经纬度</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 地图区域 -->
      <div id="container"></div>
    </div>
    
  </div>
</template>
<script>
// import CMap from "../../assets/js/map/Map";
import CMap from '../../../../assets/js/map/Map'
import $ from "jquery";
import { lastStorage } from "../../../../assets/js/map/localstorage";
import { cookie } from "../../../../assets/js/cookie";

// import { urlApiC } from "../../../../service/ip";
// import { server } from "../../../../service/realDataService";
// import { userDetail } from '../.././userInfo'
import { userDetail } from '../../../base/userInfo'
import { globalStore } from "../../../base/store";

//引入bus
import bus from '../../../base/bus'

import { store } from '../store'
export default {
  computed: {
      addressDefault() {
          return store.form.address  
      }
  },
  watch: {
      addressDefault(newValue, oldValue) {
          this.address = newValue        
      } 
  },
  data() {
      return {
          store: store,
          globalStore,
          address: ''
      };
  },
  methods: {
      search() {
          console.log(12);
          CMap.search(this.address)
      },
      confirm() {
          console.log(globalStore.position);
          this.$confirm('当前经度为 '+ globalStore.position.lng+',纬度为 '+globalStore.position.lat +',是否正确?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              bus.$emit('dialogSignal', 'closeMap')
              console.log('成功');
          }).catch(() => {
                  
          });
      }
  },
  created() {
      this.address = store.form.address
  },
  mounted() {
      CMap.createMap(116.385,39.901)
  }
};
</script>
<style scoped>
.contentShow {
  width: 100%;
  height: 100%;
  background: #FFF
}
.contentShow .showArea {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 2px;
}
/* 输入区样式 */
.showArea .showAreaTop {
  height: 35px;
  max-height: 35px;
  background: #f8f8f8;
  border-bottom: 1px solid #ebebeb;
}
.showArea .top_left,
.top_right {
  float: left;
  /* position: relative; */
  height: 100%;
  /* width: 100%; */
  line-height: 35px;
  box-sizing: border-box;
  display: inline-block;
  color: black;
  font-family: "黑体";
}
.showArea .top_left {
  padding-left: 25px;
  width: 25%;
}
.showArea .top_right {
  width: 100%;
}
#top_right .el-form{
  height: 100%;
}
#top_right .el-form-item{
  display: inline-block;
}
#top_right .el-select{
  width: 140px;
}

/* 内容展示区 */
/* 地图 */
#container {
  width: 100%;
  height: 95%;
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
#TipHide .el-menu--horizontal .el-menu-item{
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
</style>

