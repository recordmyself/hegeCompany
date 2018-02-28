<template>
  <div id="buttonArea">
    <el-upload class="upload-demo"
     :action="url + '/?userId='+ globalStore.userInfo.passportId + '&token=' + globalStore.userInfo.token  + '&city='+ store.form.province +'&area='+ store.form.area+'&company='+ store.form.company +'&boiler=' + store.form.boileroom + '&pid=' + store.form.boilerId"
     :auto-upload = 'true'
     :show-file-list = 'false'
     :before-upload='confirmUpload'
     :on-success="UploadSuccess"
     :on-error="UploadFail"
     style="display:inline-block">
      <el-button size="small" type="primary" :disabled='store.submitButton || globalStore.loading'>点击上传</el-button>
    </el-upload>
    <el-button
      v-for="item in store.buttonListArr"
      :key="item.id" v-if="item.isDynamic == false"
      :type="item.type" size="small" :icon="item.icon"
      @click="handleFunctionName(item)"
      :disabled="toDisable(item.disabled)">
      {{item.name}}
    </el-button>
  </div>
</template>
<script>
import $ from 'jquery'
import { store } from './store'
import { globalStore } from '../../base/store'
import { axiosHttpGet,axiosHttpPost } from '../../../assets/js/axios'
import { doMain } from "../../../protocal/url"
import { FileUploadProtocal } from "../../../protocal/web/FileUploadProtocal"
export default {
  data() {
    return {
      store,
      globalStore,
      url: doMain.web + FileUploadProtocal.upload.rest
    }
  },
  methods:{
    // 上传之前
    confirmUpload(file){
        // let code = file.name.
        let fileType = file.name.split(".")[1];
        const isXls = (fileType === 'xls' || fileType ==='xlsx');
        const xlsSize = file.size / 1024 / 1024 < 10;
        if (!isXls) {
          this.$message.error('上传头像图片只能是 xls或者xlsx 格式!');
        }
        if (!xlsSize) {
          this.$message.error('上传头像图片大小不能超过 10MB!');
        }
        return isXls && xlsSize;

    },
    // 上传成功
    UploadSuccess(){
      this.$message.success('上传成功');
      this.$emit('tabView');
    },
    // 上传失败
    UploadFail(){
      this.$message.success('上传失败')
    },
    //模板下载
    downTemplate(){
      let _this = this;
      axiosHttpGet(_this,doMain.web + FileUploadProtocal.download.rest,()=>{
        window.location.href = doMain.web + FileUploadProtocal.download.rest
      })

    },
    handleFunctionName(item) {
        let name = item.url.split('/')[item.url.split('/').length-1]
        eval("this."+name+"();")
    },
    toDisable(a){
      if(a == 'globalStore.loading'){
        return globalStore.loading;
      }else{
        return globalStore.loading||store.selNum
      }
    },
    //搜索
    findAll(){
      console.log('查询')
    },
    // 提示上传
    open(file) {
      let _this = this;
      this.$alert('确认上传' + file +  ' 文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        callback: action => {
            return true;
        }
      })
    }
  }
}
</script>
<style scoped>
#ButtonT .el-button {
  width: 80px;
}
#ButtonT .search {
  float: right;
  margin-right: 5%;
  display: inline-block;
  width: 500px;
}
</style>
