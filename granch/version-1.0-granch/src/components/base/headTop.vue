<template>
  <div class="headTop">
    <div id="logoImg">
      <!-- <img src="../../assets/image/login/logIcon1.png" alt=""> -->
    </div>

    <div class="userInfo">
      <!-- 警告图标 -->
      <div id="badgeImg">
        <el-badge :value="globalStore.cellNum" class="item">
          <i class="fa fa-bell" style="font-size: 25px;color: #000;"></i>
        </el-badge>
      </div>
      <div style="position:absolute;border: 1px solid #aaa;display:inline-block;height: 20px;margin:0.6% 0 0 0;"></div>
      <!-- 用户信息 -->
      <div id="userImg">
        <div class="userImg">
          <img :src="globalStore.userInfo.img != null?src:errorImg" alt="">
        </div>
        <div id="user">
          <el-dropdown trigger='click' :divided="true">
            <span class="el-dropdown-link">
              {{globalStore.userInfo.account || '请登录'}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="accountInfo">个人信息</el-dropdown-item>
              <el-dropdown-item @click.native="imageInfo">上传头像</el-dropdown-item>
              <el-dropdown-item @click.native="alertPsd">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="exit">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div id="alterInfo" v-if='globalStore.imageInfo'>
        <el-dialog title="上传头像"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        :visible.sync="globalStore.imageInfo" center width="300px">
          <div id="preview"><img :src="globalStore.src!=''?globalStore.src: src" alt=""></div>
          <div id="defalutImage">
            <!-- <div></div>
            <div></div>
            <div></div> -->
          </div>
          <div id="uploadImage">
             <el-upload
              :action="url"
              :limit='1'
              list-type="picture-card"
              :show-file-list ="true"
              :on-success="successTo"
              :on-error = "handleError"
              :before-upload="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="globalStore.dialogVisible1" size="tiny">
              <img width="100%" :src="globalStore.dialogImageUrl1" alt="">
            </el-dialog>
            <div style="margin: 20px 0 0 0;text-align: center;">
              <el-button size="small" type='primary' plain @click="confirmUpload" :disabled='errorTo'>确认上传</el-button>
              <el-button size="small" @click="cancel">取消</el-button>
            </div>

          </div>
        </el-dialog>
      </div>
      <div class="alterInfo" v-if='globalStore.accountInfo'>
        <el-dialog title="用户信息"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        :visible.sync="globalStore.accountInfo" center width="500px">
          <el-form :model="globalStore.account" :rules="emailRules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
            <el-form-item label="账号名">
              <el-input v-model="globalStore.account.account" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="globalStore.account.userName" disabled></el-input>
            </el-form-item>
            <el-form-item label="所属公司">
              <el-input v-model="globalStore.account.orgName" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop='email'>
              <el-input v-model="globalStore.account.email" :disabled='emailState' style="width:200px;"></el-input>
              <el-button id="time1" size="small" v-if = '!globalStore.sendTo' type="primary" plain @click="alterEmail">修改</el-button>
              <el-button id="time2" size="small" v-if = 'globalStore.sendTo' :disabled = 'sendSuccess' type="primary" plain @click="sendEmail">发送验证码</el-button>
            </el-form-item>
            <el-form-item label="验证码" v-if='globalStore.sendTo'>
              <el-input v-model="code"></el-input>
            </el-form-item>
            <el-form-item label="有效期至">
              <el-input v-model="globalStore.account.endTime" disabled></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click='confirmSend'>确认修改</el-button>
              <el-button type="primary" size="small" @click='cancelSend'>取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
      <div class="alterInfo" v-if='globalStore.alertPsd'>
        <el-dialog title="修改密码"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
         :visible.sync="globalStore.alertPsd" :rules="psdRules" center width="35%">
          <el-form :model="psdForm" :rules="psdRules" ref="psdForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="旧密码" prop="oPsd">
              <el-input v-model="psdForm.oPsd" placeholder="请输入旧密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="nPsd">
              <el-input v-model="psdForm.nPsd" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="rPsd">
              <el-input v-model="psdForm.rPsd" placeholder="请再次输入新密码"></el-input>
            </el-form-item>
          </el-form>
          <div id="ButtonArea" style="text-align: center;">
             <el-button type="primary" size="small" style="width: 80px" @click="alter1('psdForm')">确认修改</el-button>
             <el-button type="primary" size="small" style="width: 80px;margin-left: 18px;" @click="cancel1('psdForm')">取消</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import { globalStore } from './store'
import { cookie } from '../../assets/js/cookie'
import { doMain } from '../../protocal/url'
import { UserProtocal} from '../../protocal/base/UserProtocal'
import { FileUploadProtocal } from '../../protocal/base/FileUploadProtocal'
import { RegisterProtocal } from '../../protocal/base/RegisterProtocal'
import { axiosHttpPost } from '../../assets/js/axios'
import { changeDate } from '../../assets/js/changeDate'
export default {
  props: ['user'],
  data(){
     var valideTel = (rule,value,callback)=>{
      if(!value){
        callback(new Error('手机号不能为空'))
      };
      //手机正则
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      // dian
      var myreg1 = /^(([0\+]\d{2,3-})?(0\d{2,3})-)(\d{7,8})?$/
      if(!myreg.test(value) && !myreg1.test(value)){
        callback(new Error('请输入有效的手机号'));
      }else{
        callback();
      }
    }
    // 验证邮箱
    var validateEmail = (rules,value,callback) => {
      var myEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/
      if(!value){
        callback(new Error('邮箱不能为空'))
      }else if(!myEmail.test(value)){
        callback(new Error('输入请输入有效邮箱'))
      }else{
        callback()
      }
    }
     //验证密码
    var validatePsd = (rules,value,callback) => {
      console.log(value.length)
      var psd1 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
      if(!value){
        callback(new Error('密码不能为空'));
      }else if(!psd1.test(value)){
        callback(new Error('密码的长度在8~16之间,数字和字母组合'))
      }
      else{
        callback();
      }
    }
    var validateRpsd = (rules,value,callback) => {
      if(!value){
        callback(new Error('请再次输入密码'));
      }else if(value != this.psdForm.nPsd){
        callback(new Error('密码不一致'))
      }else{
        callback()
      }
    }
    return {
      url: doMain.base + FileUploadProtocal.image.rest,
      src: doMain.base + globalStore.route + globalStore.userInfo.img,
      globalStore,
      errorImg: require('../../assets/image/home/userIcon.png'),
      emailState: true,
      sendTo1: true,
      sendTel1: false,
      sendSuccess: false,
      code: '',
      content:'修改',
      errorTo: true,
      infoForm:{
        name: '',
      },
      psdForm:{
        oPsd: '',
        nPsd: '',
        rPsd: '',
      },
      emailRules:{
        email:[
          {required: true,validator: validateEmail}
        ]
      },
      psdRules:{
        nPsd:[
          {required: true,validator: validatePsd}
        ],
        rPsd:[
          {required: true,validator: validateRpsd}
        ]
      }
    }
  },
  methods:{
    confirmUpload(){
      let _this = this;
      let url = doMain.base + UserProtocal.upload.rest;
      let data = UserProtocal.upload.request;
          data.fileName = this.globalStore.uploadImage
      axiosHttpPost(this,url,data,(res)=>{
        if(res.data.statue == "FAIL"){
          _this.$message.error(res.data.message)
        }else{
          _this.globalStore.imageInfo = false
          _this.$message.success('图像修改成功！')
          _this.globalStore.userInfo.img = _this.globalStore.uploadImage
        }
      })

    },
    successTo(res){
      if(res.status == "FAIL"){
        this.$message.error('图片上传失败！')
        this.errorTo = true;
      }else{
        this.errorTo = false;
        this.$message.success('图片上传成功！')
        this.globalStore.uploadImage = res.result
        this.globalStore.src = doMain.base + globalStore.route + res.result;
      }
    },
    handlePictureCardPreview(){

    },
    handleRemove(){
      this.globalStore.src = ''
    },
    handleError(){
      this.$message.error('上传失败，请重试！')
    },
    accountInfo(formName){
      let _this = this;
      let url = doMain.base + UserProtocal.get.rest;
      let data = UserProtocal.get.request;
      data.id = this.globalStore.userInfo.passportId;
      axiosHttpPost(this,url,data,(res)=>{
        res.data.result[0].endTime = changeDate(res.data.result[0].endTime,false)
        _this.globalStore.account = res.data.result[0];
        _this.globalStore.accountInfo = true
        _this.globalStore.alertPsd = false
        _this.globalStore.imageInfo = false

        this.globalStore.sendTo = false;
        this.emailState = true;
      })

    },
    imageInfo(){
      this.globalStore.alertPsd = false
      this.globalStore.imageInfo = true
      this.globalStore.accountInfo = false
      this.errorTo = true;
    },
    alterEmail(){
      this.globalStore.sendTo = true;
      this.globalStore.account.email = '';
      this.emailState = false;
      this.sendSuccess = false;
    },
    sendEmail(){
      if(this.globalStore.account.email == ''){
        this.$message.warning('请输入邮箱！');
        return;
      }
        this.sendSuccess = true
        let toTime = 59;
        let _this = this;
        this.sendToTime(toTime)
        let url = doMain.base + UserProtocal.sendEmail.rest;
        let data = UserProtocal.sendEmail.request;
        data.email = this.globalStore.account.email
        axiosHttpPost(this,url,data,(res)=>{
          if(res.data.status == "FAIL"){
            _this.$message.success('验证码发送失败');
          }else{
            _this.$message.success('验证码已发送至邮箱');
          }
        })
        this.globalStore.time = setInterval(function(){
          toTime--;
          if(toTime<1){
            $('#time2').text('重新获取')
            clearInterval(_this.globalStore.time)
            _this.sendSuccess = false;
          }else{
            _this.sendToTime(toTime);
          }
        },1000)
      },
      sendToTime(toTime){
        $('#time2').text('已发送' + toTime + '秒')
      },
      // 确认修改
      confirmSend(){
        if(this.code == ''){
          this.$message.warning('请输入验证码');
          return;
        }
        let _this = this;
        let url = doMain.base + UserProtocal.refreshEmail.rest;
        let data = UserProtocal.refreshEmail.request;
        data.id = this.globalStore.userInfo.passportId
        data.email = this.globalStore.account.email
        data.account = this.globalStore.account.account
        data.code = this.code
        axiosHttpPost(this,url,data,(res)=>{
          if(res.data.status == "OK"){            
            _this.$message.success('修改成功')
            _this.globalStore.accountInfo = false;
            _this.emailState = true;
            _this.sendSuccess = false;
            _this.globalStore.sendTo = false;
            clearInterval(_this.globalStore.time);
            _this.code = ''
          }else{
            _this.$message.error(res.data.message)
          }
        })
      },
      cancelSend(){
        this.globalStore.accountInfo = false
        clearInterval(this.globalStore.time);

      },
    alertPsd(){
      this.globalStore.alertPsd = true
      this.globalStore.imageInfo = false
      this.globalStore.accountInfo = false
    },
    // 退出
    exit(){
      this.$router.push({path: '/'})
      cookie.deleteCookie('user');
    },
    // 确认修改
    alter1(form){
      let _this = this;
      let url = doMain.base + UserProtocal.refreshPassword.rest;
      let data = UserProtocal.refreshPassword.request;
      // console.log(this.globalStore.userInfo,hex_md5(this.psdForm.oPsd))
      this.$refs[form].validate((valid)=>{
        if(this.globalStore.userInfo.password != this.psdForm.oPsd){
          this.$message.warning('旧密码不正确，请输入正确的密码！')
          return
        }
        data.password = this.psdForm.nPsd;
        data.id = this.globalStore.userInfo.passportId
        axiosHttpPost(this,url,data,(res)=>{
          if(res.data.status == "FAIL"){
            _this.$message.error(res.data.message)
          }else{
            _this.$message.success('修改成功，请重新登录！')
            _this.$router.push('/')
          }
        });
      })
    },
    // 重置计时器
    resetInterval(){

    },
    cancel(){
      this.globalStore.imageInfo = false;
    },
    cancel1(form){
      this.globalStore.alertPsd=false
      this.psdForm.oPsd = ''
      this.psdForm.nPsd = ''
      this.psdForm.rPsd = ''
    }
  },
  created(){

  },
};
</script>
<style>
.headTop {
  width: 100%;
  height: 100%;
  line-height: 45px;
  box-sizing: border-box;
  background: #ffffff;
  padding-left: 25px;
}
#logoImg{
  float: left;
  display: inline-block;
  height: 100%;
  width: 30%;
}
#logoImg img{
  width: 400px;
  height: 100%;
  margin-top: -10px;
}
.userInfo{
  float: left;
  display: inline-block;
  width:70%;
  height: 100%;
  text-align: right;
}
#userImg,#badgeImg,#user,.userImg{
  display: inline-block;
}
#badgeImg{
  margin-right: 15px;
}
#badgeImg .el-badge{
  /* padding-top: 5px; */
}
#badgeImg .el-badge__content{
  top: 11px;
  right:13px;
}
#userImg{
  box-sizing: border-box;
  padding-top: 0.30%;
  padding-right: 10%;;
}
.userImg{
  width: 30px;
  height: 30px;
  margin: 0 5px 0 15px;
}
.userImg img{
  width: 100%;
  height: 100%;
  margin-top: -10px;
  border-radius:50%
}
.el-dialog__header{
  padding-top: 10px !important;
}
#user{
  margin-top: -10px;
  cursor: pointer;
}
#user .el-dropdown {
  color: #5f9cfd;
}
#user .el-dropdown-menu{
  padding: 0 !important;
  margin: 0 !important;
}
/* 上传头像 */
#preview{
  width: 120px;
  height: 120px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #eee;
}
#preview img{
  width: 100%;
  height: 100%;
}
#uploadImage{
  text-align: center;
  margin-top: 15px;
}
.headTop .el-button{
  width: 80px;
}
#time2,#time1{
  width: 150px
}
</style>
