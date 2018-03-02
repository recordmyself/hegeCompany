<template>
  <div id="RegInput">
    <el-form :model="store.ruleForm" ref="ruleForm" :rules="rules" label-width="130px" class="demo-ruleForm">
      <el-form-item label="公司名称" prop="name">
        <el-col :span='18'>
          <el-input  v-model="store.ruleForm.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="省市" prop="city">
        <el-col :span='9'>
          <el-select v-model="store.ruleForm.province" placeholder="请选择省">
            <el-option :label="item.label" v-for="(item,i) in proAndCity.provs" :key="i" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span='9'>
          <el-select v-model="store.ruleForm.city" placeholder="请选择区域">
            <el-option :label="item.label" v-for="(item,i) in store.city" :key="i" :value="item.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="联系人" prop="contacts">
        <el-col :span='18'>
          <el-input v-model="store.ruleForm.contacts"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-col :span='18'>
          <el-input v-model="store.ruleForm.mobile"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-col :span='18'>
          <el-input v-model="store.ruleForm.email" :disabled="store.sendTel"></el-input>
        </el-col>
        <el-button id="time4" type="primary" plain size="mini" style="margin-left: 5px;" :disabled="store.sendTo" @click="sendToTel">获取验证码</el-button>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-col :span='18'>
          <el-input v-model="store.ruleForm.code"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="付费类型" prop="vip">
        <el-col :span='18'>
          <el-input v-model="store.ruleForm.vip"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="社会信用代码" prop="unifiedCode">
        <el-col :span='18'>
          <el-input v-model="store.ruleForm.unifiedCode" :maxlength="18"></el-input>
        </el-col>
      </el-form-item>
    </el-form>
    <div id="uploadImg">
      <el-upload
        :action="url"
        :limit='2'
        list-type="picture-card"
        :show-file-list ="true"
        :on-success="successTo"
        :before-upload="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="store.dialogVisible" size="tiny">
        <img width="100%" :src="store.dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </div>
</template>

<script>
import proAndCity from '../../../assets/js/proAndCity'
import { store } from "./store";
import { axiosHttpPost } from '../../../assets/js/axios'
import { doMain } from '../../../protocal/url'
import bus from '../../base/bus.js'
import { RegisterProtocal } from '../../../protocal/base/RegisterProtocal'
import { FileUploadProtocal } from '../../../protocal/base/FileUploadProtocal';
import $ from 'jquery'
export default {
  data() {
    var valideEmail = (rule,value,callback)=>{
      if(!value){
        callback(new Error('邮箱不能为空'))
      };
      var myEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/
      if(!myEmail.test(value)){
        callback(new Error('请输入有效的邮箱'));
      }else{
        callback();
      }
    }
    var valideTel = (rule,value,callback)=>{
      // 手机正则
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      // 电话正则
      var myreg1 = /^(([0\+]\d{2,3-})?(0\d{2,3})-)(\d{7,8})?$/
      if(!value){
        callback(new Error('手机号不能为空'))
      }else if(!myreg.test(value)){
        callback(new Error('请输入有效的手机号'))
      }else{
        callback();
      }
    }
   
    var valideCode = (rule,value,callback)=>{
       var code = /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}/g
      if(!value){
        callback(new Error('请输入社会信用编码'))
      }else if(!code.test(value)){
        callback(new Error('您输入的格式不正确'))
      }else{
        callback()
      }
    }
    return {
      store,
      proAndCity,
      rules: {
        name: [
          {required: true,trigger: 'blur',message: '公司名称不能为空'}
        ],
        contacts:[
          {required: true,trigger: 'blur',message: '联系人不能为空'}
        ],
        mobile: [
          {required: true,validator: valideTel}
        ],
        email:[
          {required: true,validator: valideEmail}
        ],
        unifiedCode:[
          {required: true,validator: valideCode}
       ]
      },
      url: doMain.base + FileUploadProtocal.image.rest
    };
  },
  methods: {
    // 移出图片
    handleRemove(file, fileList) {
    },
    // 发送之前
    handlePictureCardPreview(file) {
    },
    // 发送成功
    successTo(res,file){
      this.store.ruleForm.fileName.push(res.result)
    },
    // 发送失败
    handleError(){
      this.$message.error('上传失败，请重试！')
    },
    // 发送验证码
    sendToTel(){
      if(this.store.ruleForm.name == '' || this.store.ruleForm.contacts == ''){
        this.$message.warning('请先输入公司名称和联系人');
        return;
      }else{
        this.store.sendTo = true;
        this.store.sendTel = true;
        let toTime = 59;
        let _this = this;
        this.sendToTime(toTime)
        let url = doMain.base + RegisterProtocal.sendEmail.rest;
        let data = RegisterProtocal.sendEmail.request;
            data.userName = this.store.ruleForm.contacts
            data.registerName = this.store.ruleForm.name
            data.email = this.store.ruleForm.email;
            data.type = 'CREATE';
        this.$api.post(url,data).then((res)=>{
          _this.$message.success('验证码已发送至邮箱');
        })
        let time = setInterval(function(){
          toTime--;
          if(toTime<1){
            $('#time4').text('重新获取')
            clearInterval(time)
            _this.store.sendTo = false;
            _this.store.sendTel = false;
          }else{
            _this.sendToTime(toTime);
          }
        },1000)
      }      
    },
    sendToTime(toTime){
        $('#time4').text('已发送' + toTime + '秒')
    },
  },
  mounted(){
    let _this = this;
    bus.$on('reg',()=>{
      _this.$refs['ruleForm'].validate((valid) => {
        if(valid){
          bus.$emit('ok','1');
        }else{
          bus.$emit('ok','0');
        }
      })
    })
  },
  created(){
    let _this = this
    setInterval(function(){
      $('#uploadImg li').css({
        width: '100px',
        height: '100px'
      })
    },10);
  },
  computed:{
    name(){
      return this.store.ruleForm.name
    },
    contacts(){
      return this.store.ruleForm.contacts
    },
    email(){
      return this.store.ruleForm.email
    },
    province(){
      return this.store.ruleForm.province
    },
  },
  watch:{
    name(newValue,oldValue){
      if(newValue != ''){
        this.store.sendTo1 = false;
      }else{
        this.store.sendTo1 = true;
      }
    },
    contacts(newValue,oldValue){
      if(newValue != ''){
        this.store.sendTo2 = false;
      }else{
        this.store.sendTo2 = true;
      }
    },
    email(newValue,oldValue){
      var myEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/
      if(myEmail.test(newValue)){
        this.store.sendTo = false;
      }else{
        this.store.sendTo = true;
      }
    },
    province(newValue,oldValue){
      this.store.ruleForm.city = '';
      this.store.city = [];
      proAndCity.allCity.forEach((item)=>{
        if(item.prov == newValue){
          this.store.city.push({value: item.label, label:item.label})
        }
      })
    }
  }
};
</script>
<style scoped>
#RegInput {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 50px 0 0 20px;
}
#RegInput .el-form-item {
  width: 100%;
}
#uploadImg .el-upload-list li{
  width: 100px !important;
  height: 100px !important;

}
</style>
