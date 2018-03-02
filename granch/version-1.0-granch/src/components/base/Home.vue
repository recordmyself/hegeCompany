<template>
  <div id="Home">

    <el-container style="width: 100%;height: 100%">
    <!-- 这里是导航区 -->
      <el-aside style="width: 17%;max-width: 225px;height: 100%;background: #181b2a;">
        <!-- 导航上方log -->
        <div class="logoIcon">
          <span>
            <img src="../../assets/image/login/logo.png" alt="">
          </span>
          <h6 style="margin-top: 5px;color:#FFF">北京热力集团有限公司</h6>
        </div>
        <!-- 导航 -->
        <div class="navArea">导航区</div>
        <el-row class="tac" v-if="globalStore.userInfo">
          <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo" @open="handleOpen"
          :router="true"
          @close="handleClose" background-color="#181b2a"
          text-color="#fff"
          :unique-opened= 'true'
          active-text-color="#5d6485">
         <el-submenu :index="i+''" v-for="(item,i) in globalStore.menuList" :key="i">
            <template slot="title">
              <span>{{item.name}}</span>
            </template>
            <el-menu-item-group>
              <template slot="title"></template>
              <el-menu-item v-if="jtem.subMenuList.length == 0" :index="jtem.url?jtem.url:'1'" v-for="(jtem,j) in item.subMenuList" :key="j">{{jtem.name}}</el-menu-item>
              <el-submenu v-if="jtem.subMenuList.length != 0" :index="i + '-' + j" v-for="(jtem,j) in item.subMenuList" :key="j">
                <template slot="title">
                  <span>{{jtem.name}}</span>
                </template>
                <el-menu-item-group>
                  <template slot="title"></template>
                  <el-menu-item :index="ktem.url?ktem.url:'1'" v-for="(ktem,k) in jtem.subMenuList" :key="k">{{ktem.name}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-row>
      <el-row v-if="globalStore.userInfo == {}">
        <el-menu>
          <el-menu-item index="companyReg">公司注册</el-menu-item>
        </el-menu>
      </el-row>
      </el-aside>
      <!-- 这里是内容区 -->
      <el-container style="width: 83%;height: 100%">
        <!-- 这里是顶部 -->
        <el-header style="height: 5%;padding: 0">
           <headTop/>
        </el-header>
        <!-- 这里是内容 -->
          <el-main style="height:95%;padding: 2px 0 0 2px;background:rgb(245,245,245)">

            <!-- <transition name="fade" mode="out-in"> -->
               <router-view />
            <!-- </transition> -->

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>

import $ from 'jquery'
import headTop from "./headTop.vue";
import bus from './bus'
import { globalStore } from '../base/store'
import { cookie } from '../../assets/js/cookie'
import { doMain } from '../../protocal/url'
import { UserProtocal } from '../../protocal/base/UserProtocal'
import { axiosHttpPost } from '../../assets/js/axios'
export default {
  components: {
    headTop
  },
  data() {
    return {
      globalStore,
    };
  },
  methods: {
    tohomeMap(){
      this.$router.push({name: 'blank'})
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 去除el-menu-item-group__title和首页箭头
    deleGroup() {
      // console.log()
      $('.el-menu-item-group .el-menu-item').css({
        background: '#181b2a'
      })
      $('.el-menu-item-group .el-menu-item-group__title').remove();
      // $('.el-submenu__title i').eq(0).re
      // move();
      $('.el-submenu__title').css({
        height: '40px',
        lineHeight: '40px'
      })
      $('.el-menu-item-group .el-submenu__title').css({
        height: '35px',
        lineHeight: '35px',
        fontSize: '13px'
      })
    },
    // 修改搜索框的高度
    changezIndex(){
      setInterval(function(){
      $('.el-loading-mask').css({
          zIndex: '2000'
        })
      },10)
    },
    // 多出登录提示
    open() {

        this.$alert('账号在别处登录，请重新登录！', '登录提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push({path: '/'});
          }
        });
      },
    // 获取渲染树
    getMainTree(){
      let _this = this;
      let url = doMain.base + UserProtocal.initView.rest;
      let data = UserProtocal.initView.request;
      axiosHttpPost(_this,url,data,(res)=>{
        console.log(res)
        if(res.data.status == "LOGOUT"){
          _this.open();
        }else{
          _this.globalStore.menuList = res.data.result;
          bus.$emit('haveData')
        }
      })
    }
  },
  created() {
    // console.log(this.$route.path);
    let user = JSON.parse(cookie.getCookie('user'));
    console.log("cookie",user)
    if(user){
        this.globalStore.userInfo = user;
      }else{
        this.$router.push({path: '/'})
      }
      this.getMainTree();
  },
  mounted() {
    this.changezIndex();
    this.deleGroup();
    setInterval(()=>{
      this.deleGroup();
    },1)
  }
};
</script>
<style scoped>
#Home {
  width: 100%;
  height: 100%;
}
#Home .logoText {
  height: 5%;
  line-height: 45px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  letter-spacing: 10px;
  background: #e44724;
}
/* 字体图标 */
#Home .logoIcon{
  padding-top: 10px;
  height: 14.5%;
  margin-bottom: 15px;
  text-align: center;
  box-sizing: border-box;
}
#Home .logoIcon span{
  display: inline-block;
  height: 90px;
  width: 210px;
  border-radius: 50%;
  /* background: #FFF; */
}
#Home .logoIcon span img{
  height: 100%;
  width:100%;
}

/*  */
#Home .navArea {
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 13px;
  color: #fff;
  cursor: pointer;
}
.el-menu {
  border: none;
  /* background: #33414e; */
  color: #fff;
  border-bottom: 1px solid rgba(0,0,0,0.2);
}
.el-submenu{
  border-top: 1px solid rgba(0,0,0,0.2);
  line-height: 40px;
}
.el-menu ul .el-menu-item{
  border-top: 1px solid rgba(0,0,0,0.2);
  background: #181b2a;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}
.is-active{
  background: #1e2235 !important;
}
.el-menu ul .el-menu-item:hover{
  background: #1e2235 !important;
}
</style>
