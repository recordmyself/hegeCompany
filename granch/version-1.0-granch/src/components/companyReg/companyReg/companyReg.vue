<template>
  <div id="Home">
    <el-container style="width: 100%;height: 100%">
      <!-- 这里是导航区 -->
      <el-aside style="width: 17%;max-width: 225px;height: 100%;background: #181b2a;">
        <!-- 导航上方log -->
        <div class="logoIcon">
          <span>
            <img src="../../../assets/image/login/logo.png" alt="">
          </span>
          <h6 style="margin-top: 5px;color:#FFF">北京热力集团有限公司</h6>
        </div>
        <!-- 导航 -->
        <div class="navArea">注册</div>
      </el-aside>
      <!-- 这里是内容区 -->
      <el-container style="width: 83%;height: 100%">
        <!-- 这里是顶部 -->
        <el-header style="height: 5%;padding: 0">
          <div class="headTop">
            <div id="logoImg">
              <!-- <img src="../../../assets/image/login/logIcon1.png" alt=""> -->
            </div>
          </div>
        </el-header>
        <!-- 这里是内容 -->
        <el-main style="height:95%;padding: 4px;background: #DDD;border-radius: 3px;">
          <div id="companyReg">
            <div id="companyReg_top">
              <span style="font-size: 14px">公司注册</span>
            </div>
            <div id="companyReg_input">
              <InputArea />
            </div>
            <div id="companyReg_content">
              <div id="content_top">
                <div style="display:inline-block;width: 200px;height: 100%;float: left;font-size: 18px;color: black;">锅炉列表</div>
                <div style="display:inline-block;width: 200px;float: right">
                  <el-button type="primary" size="mini" style="width: 25px;height: 25px;text-align: center" @click="addTo">
                    <i class="fa fa-plus" aria-hidden="true" style="margin-left: -5px"></i>
                  </el-button>
                  <el-button type="primary" size="mini" style="width: 25px;height: 25px;text-align: center" @click="reduceTo">
                    <i class="fa fa-minus" aria-hidden="true" style="margin-left: -5px;"></i>
                  </el-button>
                </div>
              </div>
              <div id="content_table">
                <TableArea />
              </div>
            </div>
            <div id="RegButton">
              <el-button size="small" type="primary" :disabled="store.regOk" @click="regCompany">注册</el-button>
              <el-button size="small" type="primary" @click="cancel">取消</el-button>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
// 引入子组件
import InputArea from './input.vue'
import TableArea from './table.vue'
import { store } from './store'

// 引入协议
import { doMain } from '../../../protocal/url'
import { RegisterProtocal } from '../../../protocal/base/RegisterProtocal'
import { axiosHttpPost } from  '../../../assets/js/axios'
import bus from '../../base/bus'
export default {
  components:{
    InputArea,TableArea
  },
  data(){
    return {
      store,
    }
  },
  methods:{
    // 公司注册
    regCompany(){
      this.store.regOk = true;
      let _this = this;
      
      bus.$on('ok',(res1)=>{
        if(res1 == '0'){
          this.$message.warning('信息不完整！')
          this.store.regOk = false;
        }else{
          this.store.ruleForm.boilers = JSON.stringify(this.store.boiler)
          let url = doMain.base + RegisterProtocal.create.rest;
          let data = RegisterProtocal.create.request;
          data = this.store.ruleForm;
          this.$api.post(url,data)
          .then(res=>{
            if(res.data.status == "FAIL"){
              _this.$message.error(res.data.message)
            }else{
              _this.$message.success('注册申请已提交，请等待！')
              _this.store.ruleForm.fileName = [];
              _this.$router.push({path: '/'})
            }
            _this.store.regOk = false;
          })
        }
      })
      bus.$emit('reg')      
    },
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    },
    // 返回登录页面
    cancel(){
      this.$router.push({name: 'logAndReg'})      
    },
    addTo(){
      let push = true;
      let template = {
        unitId: '',
        name: '',
        type: '',
        create: '',
        person: '',
        tel: ''
      }
      this.store.boiler.forEach((item)=>{
        if(item.unitId == ''){
          push = false;
        }
      })
      if(push){
        this.store.boiler.push(template);
      };
    },
    reduceTo(){

      let _this = this;
      let record = [];
      _this.store.result.forEach((item)=>{
          _this.store.boiler.forEach((jtem,i)=>{
            if(item.unitId == jtem.unitId){
              record.push(i)
            }
        });
      })
      if(record.length != 0){
        for(let i = record.length-1;i>=0 ;i--){
          _this.store.boiler.splice(record[i],1)
        }
      }else{
        _this.$message.warning('请选择要删除的数据！')
      }
    },
  },
  created(){
    this.store.ruleForm = {
          name: '',
          province: '',
          city: '',
          mobile: '',
          contacts: '',
          email: '',
          code: '',
          unifiedCode: '',
          boilers: '',
          vip:'',
          fileName: []
        }
  },
  mounted(){
    
  },
}
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
  
  #Home .logoIcon {
    padding-top: 10px;
    height: 14.5%;
    text-align: center;
    box-sizing: border-box;
  }
  
  #Home .logoIcon span {
    display: inline-block;
    height: 90px;
    width: 210px;
    border-radius: 50%;
  }
  
  #Home .logoIcon span img {
    height: 100%;
    width: 100%;
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
    background: #33414e;
    color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  
  .el-submenu {
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    line-height: 40px;
  }
  
  .el-menu ul .el-menu-item {
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    background: #273540 !important;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
  }
  
  .el-menu ul .el-menu-item:hover {
    background: #232f3b !important;
  }
  /*  */
  
  .headTop {
    width: 100%;
    height: 100%;
    line-height: 45px;
    box-sizing: border-box;
    background: #2a2c3a;
    padding-left: 25px;
  }
  
  #logoImg {
    float: left;
    display: inline-block;
    height: 100%;
    width: 30%;
  }
  
  #logoImg img {
    width: 400px;
    height: 100%;
    margin-top: -10px;
  }
  
  .userInfo {
    float: left;
    display: inline-block;
    width: 70%;
    height: 100%;
    text-align: right;
  }
  
  #userImg,
  #badgeImg,
  #user,
  .userImg {
    display: inline-block;
  }
  
  #badgeImg {
    margin-right: 15px;
  }
  
  #badgeImg .el-badge {
    /* padding-top: 5px; */
  }
  
  #badgeImg .el-badge__content {
    top: 11px;
    right: 13px;
  }
  
  #userImg {
    box-sizing: border-box;
    padding-top: 0.30%;
    padding-right: 10%;
    ;
  }
  
  .userImg {
    width: 30px;
    height: 30px;
    margin: 0 5px 0 15px;
  }
  
  .userImg img {
    width: 100%;
    height: 100%;
    margin-top: -10px;
    border-radius: 50%
  }
  
  #user {
    margin-top: -10px;
  }
  
  #user .el-dropdown {
    color: #FFF;
  }
  
  #user .el-dropdown-menu {
    padding: 0 !important;
    margin: 0 !important;
  }
  /*  */
  
  #companyReg {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: #FFF;
  }
  
  #companyReg_top {
    height: 4.5%;
    line-height: 40px;
    font-size: 16px;
    color: black;
    padding-left: 15px;
    background: #f8f8f8;
    border-bottom: 1px solid #aaa;
  }
  
  #companyReg_input {
    float: left;
    display: inline-block;
    width: 40%;
    height: 85%;
    /* border-right: 1px solid #aaa; */
    border-bottom: 1px solid #aaa;
  }
  
  #companyReg_content {
    float: left;
    display: inline-block;
    width: 59.8%;
    height: 85%;
    border-bottom: 1px solid #aaa;
  }
  
  #content_top {
    width: 100%;
    height: 6%;
    line-height: 40px;
  }
  
  #content_top div {
    padding-left: 30px;
  }
  
  #content_table {
    height: 85%;
  }
  
  #RegButton {
    width: 100%;
    height: 10%;
    text-align: center;
  }
  
  .el-button {
    width: 80px;
    margin: 20px 10px 0;
  }
</style>