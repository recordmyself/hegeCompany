<template>
    <div class="welcome">
    <img src="../../assets/image/login/tipOk.png" alt="欢迎" title="欢迎">
    <div class="success" id="success">
        <h2>{{meg}}</h2>
        <p v-if="on"><el-button type="primary" @click="tologin">去登陆</el-button></p>
    </div>
    </div>
</template>
<script>

    import { doMain } from '../../protocal/url'
    import {UserProtocal} from '../../protocal/base/UserProtocal'
    export default{
        data(){
            return {
                id:'',
                meg:'',
                key:'',
                on: false
            }
        },
        mounted(){
          let _this = this;
          setTimeout(function () {
              let str = window.location.href;
              if(str.indexOf("?")!= -1){
                let arr = str.split("?");
                let paraStr = arr[1];
                let allStr = str.split("&");
                let idStr = allStr[0].split("=");
                _this.id = idStr[1];
                let keyStr = allStr[1].split("=");
                _this.key = keyStr[1];
              }else{
                _this.id = 0;
                _this.key = '';
              }
            _this.load();
          },1);
        },
        methods:{
             load(){
               let rest = UserProtocal.validation.rest;
               let validation = UserProtocal.validation.request;
               if(this.id==0&&this.key==''){

               }else{
                 validation.id = this.id;
                 validation.key = this.key;
                 let valURL = doMain.base + rest;
                 console.log(validation)
                 this.$api.post(valURL,validation).then((res)=>{
                   console.log(res);
                   let item = res.data;
                   if (item.status == "OK") {
                     if (item.result) {
                       console.log("激活成功");
                       this.meg = '恭喜！您已激活成功';
                       this.on = true;
                     }
                   } else if (item.status == "FAIL") {
                     console.log(item.message);
                     this.meg = '激活失败，请重试！';
                     this.on = false;
                   }
                 })
               }
             },
             tologin(){
                 this.$router.push('/')
             }
        }
    }


</script>
<style>
    .welcome{
        width: 450px;
        height: 150px;
        margin:200px auto;
    }
    .welcome img{
       float: left;
       width: 150px;
       height:150px;
   }
    .success{
        float: right;
        width: 300px;
        height: 100%;
        text-align: center;
    }
    .success h2{
      margin-top: 60px;
    }
    .success p{
      margin-top: 20px;
    }
    .success button{
      height: 30px;
      line-height: 0;
    }
    .success a:hover{
        cursor: pointer;
    }
</style>
