<template>
<!-- 这里是注册登录界面 -->
  <div class="findPsd">
    <!-- 顶部logicon -->
    <div class="findPsd_top">
      <span class="logIcon">
        <img src="../../assets/image/login/logIcon.png" alt="">
      </span>
    </div>
    <!-- 中部样式 -->
    <div class="middle">
      <!-- 登录 -->
      <div class="content">
        <div class="image">
          <img src="../../assets/image//login/rlIcon.png" alt="">
        </div>
        <div id="infoForm">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" label-position="rigth">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="tel">
              <el-input v-model="ruleForm.tel" placeholder="请输入注册手机号"></el-input>
            </el-form-item>
            <!--<el-form-item label="验证码" prop="num"  v-if='false'>
              <el-input v-model="ruleForm.num" placeholder="请输入验证码" style="width:150px;margin-left:-40px"></el-input>
              <el-button id="time" type="info" size="mini" :disabled="sendTo" @click="sendToTel">获取验证码</el-button>
            </el-form-item>-->
            <el-form-item label="新密码" prop="psd">
              <el-input v-model="ruleForm.psd" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码"  prop="cPsd">
              <el-input v-model="ruleForm.cPsd" type="password" placeholder="请确认密码"></el-input>
            </el-form-item>
          </el-form>
          <div id="ButtonArea">
             <el-button type="primary" size="small" style="width: 80px" @click="alter('ruleForm')">确定</el-button>
             <el-button type="primary" size="small" style="width: 80px;margin-left: 18px;" @click="cancel('ruleForm')">取消</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script scoped>
import { cookie } from "../../assets/js/cookie";
import { axiosHttpPost } from '../../assets/js/axios'
import { doMain } from '../../protocal/url'
import { UserProtocal } from '../../protocal/base/UserProtocal'
export default {
  data() {
    var valideTel = (rule,value,callback)=>{
      if(!value){
        callback(new Error('手机号不能为空'))
      };
      //手机正则
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      // dian
      var myreg1 = /^(([0\+]\d{2,3-})?(0\d{2,3})-)(\d{7,8})?$/
      if(!myreg.test(value) && !myreg1.test(value)){
        callback(new Error('请输入有效的手机号'));
      }else{
        callback();
      }
    }
     //验证密码
    var validatepsd = (rules,value,callback) => {
      console.log(value.length)
      if(!value){
        callback(new Error('密码不能为空'));
      }else if(value.length < 6 || value.length > 12){
        callback(new Error('密码的长度在6~12之间'))
      }
      else{
        callback();
      }
    }
    var validaterpsd = (rules,value,callback) => {
      if(!value){
        callback(new Error('请再次输入密码'));
      }else if(value != this.ruleForm.psd){
        callback(new Error('密码不一致'))
      }else{
        callback()
      }
    }
    return {
      // 是否获取验证码
      confirm: false,
      // 发送验证码
      sendTo: true,
      sendTel: false,
      // 计数器
      time: 0,
      ruleForm: {
        name: '',
        tel: '',
        psd: '',
        cPsd: '',
        // num:''
      },
      rules: {
        name: [{required: true,trigger: 'blur',message: '用户名不能为空'}],
        tel: [{required: true,trigger: 'blur',validator: valideTel}],
        psd: [{ required: true, trigger: "blur",validator: validatepsd  }],
        cPsd: [{ required: true, trigger: "blur",validator: validaterpsd  }],
        // num: [{ required: true, trigger: "blur", message: "验证码不能为空" }]
      }
    };
  },
  methods: {
    // 返回登陆页
    cancel(formName){
      this.$refs[formName].resetFields();
      this.$router.push({name: 'logAndReg'})
    },
    // 发送验证码
    sendToTel(){
      this.sendTo = true;
      this.sendTel = true;
      let toTime = 59;
      let _this = this;
      this.sendToTime(toTime)
      let url = doMain.base + UserProtocal.forgetPassword.rest;
      let data = UserProtocal.forgetPassword.request;
          data.mobile = this.ruleForm.tel;
          data.account = this.ruleForm.name
      this.$api.post(url,data).then((res)=>{
        console.log('手机验证码',res)
        _this.$message.success('验证码已发送');
      })
      _this.time = setInterval(function(){
        toTime--;
        if(toTime<1){
          $('#time').text('重新获取')
          clearInterval(_this.time)
          _this.sendTo = false;
          _this.sendTel = false;
        }else{
          _this.sendToTime(toTime);
        }
      },1000)
    },
    sendToTime(toTime){
        $('#time').text('已发送' + toTime + '秒')
    },
    // 确认修改
    alter(form){
      let _this = this;
      let url = doMain.base + UserProtocal.verification.rest;
      let data = UserProtocal.verification.request;
      data.account = this.ruleForm.name;
      data.mobile = this.ruleForm.tel;
	  	// data.num = this.ruleForm.num;
      data.password = this.ruleForm.psd
      this.$refs[form].validate((valid)=>{
        this.$api.post(url,data)
        .then((res)=>{
          console.log(res);
          if(res.data.status == "FAIL"){
            _this.$message.error(res.data.message)
          }else{
            _this.$message.success('修改成功，请登录！')
            _this.$router.push('/')
          }
        })
      })
    }
  },
  created() {},
  mounted() {},
  computed:{
    tel(){
      return this.ruleForm.tel
    }
  },
  watch: {
    tel(newValue,oldVaue){
      //手机正则
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      // dian
      var myreg1 = /^(([0\+]\d{2,3-})?(0\d{2,3})-)(\d{7,8})?$/
      if(myreg.test(newValue)  || myreg1.test(newValue)){
        this.sendTo = false;
      }else{
        this.sendTo = true;
      }
    }
  }
};
</script>
<style scoped>
.findPsd {
  width: 100%;
  height: 100%;
}
.findPsd .findPsd_top {
  height: 5%;
  background: #fff;
}
.findPsd .findPsd_top img {
  width: 400px;
  height: 100%;
}
/* 中部样式 */
.findPsd .middle {
  position: relative;
  height: 90%;
  background: #10aedd;
}
.findPsd .content {
  position: absolute;
  text-align: center;
  box-sizing: border-box;
  top: 120px;
  right: 250px;
  width: 380px;
  min-height: 350px;
  height: 530px;
  /* max-height: 600px; */
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 3px black;
}
.findPsd .image {
  height: 120px;
  margin-bottom: 15px;
}
.findPsd .image img {
  height: 120px;
}
#infoForm .el-input{
  width: 250px;
  margin-left: -35px;
}
#ButtonArea{
  height: 60px;
}
</style>
