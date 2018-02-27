<template>
<!-- 这里是注册登录界面 -->
  <div class="logAndReg">
    <!-- 顶部logicon -->
    <div class="logAndReg_top">
      <span class="logIcon">
        <img src="../../assets/image/login/logIcon.png" alt="">
      </span>
    </div>
    <!-- 中部样式 -->
    <div class="middle" @keydown.13="loginIn">
      <!-- 登录 -->
      <div class="content">
        <div class="image">
          <img src="../../assets/image//login/rlIcon.png" alt="">
       </div>
        <el-form :model="ruleForm" :inline='true' :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
           <el-form-item label="" prop="state">
             <el-row class="demo-autocomplete">
                <el-col :span="12">
                  <el-autocomplete class="inline-input" v-model="ruleForm.state" :fetch-suggestions="querySearch" placeholder="请输入用户名" @select="handleSelect"></el-autocomplete>
                </el-col>
             </el-row>
          </el-form-item>
          <img class="positionImg" src="../../assets/image/login/userIcon.png" alt="">
          <el-form-item label="" prop="psd">
            <el-input v-model="ruleForm.psd" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
          <img class="positionImg" src="../../assets/image/login/psdIcon1.png" alt="" style="top: 70px;">
          <el-button type="primary" @click="loging('ruleForm')">登录</el-button>
        </el-form>

        <div style="height: 15px;"></div>
        <el-checkbox v-model="checked">记住密码</el-checkbox>
        <router-link :to="{name: 'companyReg'}" style="font-size: 14px;margin-left: 90px">注册?</router-link>
        <router-link :to="{name: 'findPsd'}" style="font-size: 14px;margin-left: 10px">忘记密码?</router-link>
        <div id="api"><span @click="toApi">第三方开发文档<i class="fa fa-hand-o-up" aria-hidden="true"></i></span></div>
      </div>
    </div>
  </div>
</template>
<script scoped>
import { cookie } from "../../assets/js/cookie";
import { lastStorage } from "../../assets/js/map/localstorage";
import { axiosHttpPost } from "../../assets/js/axios.js";
import { doMain } from '../../protocal/url'
import { LoginProtocal } from '../../protocal/base/LoginProtocal'
export default {
  data() {
    return {
      // 验证是否记住密码
      checked: false,
      userInfo: {},
      usersNum: [],
      ruleForm: {
        psd: "",
        state:""
      },
      rules: {
        psd: [{ required: true, message: "密码不能为空" }],
        state: [{ required: true, message: "请输入用户名" }]

      }
    };
  },
  methods: {
    loging(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        // 验证用户信息
        let url = doMain.base + LoginProtocal.signIn.rest;
        let data = LoginProtocal.signIn.request;
            data.account = _this.ruleForm.state;
            data.password = _this.ruleForm.psd;
        this.$api.post(url,data)
        .then((res)=>{
          if(res.data.status == "OK"){

              _this.$message.success({message: '登录成功',duration: 1000});
              _this.$router.push({path: '/homeMap'})
             
              // 设置cookie              
              cookie.setCookie('user', res.data.result); 

              // 存储登录过得用户
              let exit = false;
              if(_this.usersNum.length == 0){
                if(this.checked){
                  _this.usersNum.push({ value: _this.ruleForm.state,psd: _this.ruleForm.psd});
                }else{
                  _this.usersNum.push({ value: _this.ruleForm.state,psd: ''});
                }
              }else{
                for(let i = 0;i < _this.usersNum.length; i++){
                  if(_this.usersNum[i].value == _this.ruleForm.state){
                    _this.usersNum.splice(i,1);
                  }
                }
                if(this.checked){
                  _this.usersNum.push({ value: _this.ruleForm.state,psd: _this.ruleForm.psd});
                }else{
                  _this.usersNum.push({ value: _this.ruleForm.state,psd: ''});
                }
              }
              localStorage.setItem('users',JSON.stringify(_this.usersNum));
                           
          }else{
             _this.$message.error(res.data.message)
          }        
        })
      });
    },
    loginIn(){
        this.loging('ruleForm')
    },
    querySearch(queryString, cb) {
      var restaurants = this.usersNum;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    // 获取登录过得用户
    loadAll() {
      if (localStorage.users) {
        this.usersNum = JSON.parse(localStorage.users);
      }
    },
    handleSelect(item) {
    },
    toApi(){
      window.location.href = '../../../static/apidoc.html'
    }
  },
  created() {
    this.loadAll();
  },
  mounted() {},
  computed:{
    state(){
      return this.ruleForm.state;
    }
  },
  watch: {
    state(newValue, oldValue) {
      this.checked = false;
      let user = JSON.parse(localStorage.getItem('users')) || [];
      user.forEach((item)=>{
        console.log(item,newValue)
        if(item.value == newValue){
          if(item.psd == ''){
            this.checked = false;
          }else{
            this.ruleForm.psd = item.psd;
            this.checked = true;
          }
        }
      })
      
    }
  }
};
</script>
<style scoped>
.logAndReg {
  width: 100%;
  height: 100%;
}
.logAndReg .logAndReg_top {
  height: 5%;
  background: #fff;
}
.logAndReg .logAndReg_top img {
  width: 400px;
  height: 100%;
}
/* 中部样式 */
.logAndReg .middle {
  position: relative;
  height: 90%;
  background: #10aedd;
}
.logAndReg .content {
  position: absolute;
  padding-left: 40px;
  box-sizing: border-box;
  top: 150px;
  right: 250px;
  width: 380px;
  height: 400px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 3px black;
}
.logAndReg .image {
  height: 120px;
  margin-left: 60px;
  margin-bottom: 25px;
}
.logAndReg .image img {
  height: 120px;
}
.logAndReg .loginTip {
  font-size: 10px;
  color: red;
  margin-bottom: 10px;
  text-align: left;
}
.logAndReg .el-input {
  width: 300px;
}
.logAndReg .inline-input {
  width: 300px;
  margin-bottom: 22px;
}
.logAndReg .el-button {
  width: 300px;
}

.logAndReg .el-form {
  position: relative;
}
.logAndReg .positionImg {
  position: absolute;
  width: 18px;
  top: 10px;
  right: 55px;
}
.logAndReg .el-autocomplete{
  padding: 0;
  margin: 0;
}
/* 错误提示 */
#error {
  color: #fa5555;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 40%;
  left: 0px;
}
/* 注册样式 */
.logAndReg .regUser {
  position: absolute;
  padding-left: 40px;
  box-sizing: border-box;
  top: 100px;
  right: 250px;
  width: 380px;
  height: 500px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 3px black;
}
#api{
  font-size: 12px;
  color: #aaa;
  height: 30px;
  line-height: 30px;
  text-align:right;
  padding: 15px 55px 0 0;
}
#api span:hover{
  color: black;
  cursor: pointer;
}
#api i{
  margin-left: 5px;
}
</style>
