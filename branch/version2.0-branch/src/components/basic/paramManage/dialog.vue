<template>
    <div class="dialogArea">
        <el-dialog
        width="40%"
        style="text-align:left;"
        title="参数增加"
        :visible.sync="store.dialogFormVisible"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        :show-close="false" >
        <!-- @open="initValidate" -->
            <el-form :rules="store.rules" status-icon class="item-control" ref="dataForm" :model="store.form" label-width="120px" label-position="right" size="small">
                <el-form-item label="指标名称(中)：" prop="chineseType">
                  <el-select style="width:180px" clearable v-model="store.form.chineseType" placeholder="请输入字典名称">
                      <el-option v-for="item in store.dataType" :value="item.label" :key="item.label" :label="item.label"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="指标名称(英)：" prop="englishType">
                    <el-input style="width:180px" disabled  v-model.trim="store.form.englishType" placeholder="请输入字典名称"></el-input>
                </el-form-item>
                <el-form-item label="指标类型：" prop="type">
                    <el-select style="width:180px" clearable v-model="store.form.type" placeholder="请选择指标类型">
                        <el-option v-for="item in store.typeOptions" :value="item.value" :key="item.value" :label="item.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注：" prop="desc">
                    <el-input clearable style="width:180px" v-model.trim="store.form.desc" placeholder="说点什么"></el-input>
                </el-form-item>
            </el-form>
            <div id="companyReg_content">
                <div id="content_top" class="clearfix">
                    <div style="display:inline-block;width: 200px;height: 100%;float: left;font-size: 18px;color: black;">参数列表</div>
                    <!-- <el-button type="primary" size="mini" @click="confirmCount">确认参数范围数</el-button> -->
                    <div style="display:inline-block;width: 200px;float: right; text-align:right" >
                        <el-button type="primary" size="mini" style="width: 25px;height: 25px;text-align: center" @click="addTo">
                            <i class="fa fa-plus" aria-hidden="true" style="margin-left: -5px"></i>
                        </el-button>
                        <el-button type="primary" size="mini" style="width: 25px;height: 25px;text-align: center" @click="reduceTo">
                            <i class="fa fa-minus" aria-hidden="true" style="margin-left: -5px;"></i>
                        </el-button>
                    </div>
                </div>
                <div id="content_table" style="margin-bottom:10px;">
                    <ParamSet />
                </div>
            </div>
            <div class="footer" style="text-align:center">
                <el-button size="small" type="primary" @click="createData('dataForm')" :loading="globalStore.buttonLoading">保存</el-button>
                <el-button size="small" type="primary" @click="cancel('dataForm')" >取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { store } from './store'
    import bus from '../../base/bus'
    import ParamSet from './paramSet'

    import { globalStore } from "../../base/store";
    import { doMain } from '../../../protocal/url'
    import { ReportFormsProtocal } from '../../../protocal/web/ReportFormsProtocal'
    import { DictionaryProtocal } from '../../../protocal/base/DictionaryProtocal'
    import { axiosHttpPost } from '../../../assets/js/axios'
    export default {
        components: {
            ParamSet
        },
        data() {
            return {
                store,
                globalStore: globalStore
            }
        },
        methods: {
            createData(form) {
              let _this = this;
                this.$refs[form].validate((valid) => {
                  if(valid){
                  if(this.store.tableDate1.length==0){
                    this.$message.warning('您没有创建数据！');
                  }else{
                     for(let i=1 ;i<this.store.arrDate.length;i++){
                      if(this.store.arrDate[i]<=this.store.arrDate[i-1]){
                        this.store.create = false;
                        this.$message.error('数据设置不标准，请重新输入！')
                        return;
                      }
                      this.store.create = true;
                    }
                    if(this.store.create){
                      let url = doMain.web + ReportFormsProtocal.create.rest;
                      let data = ReportFormsProtocal.create.request;
                      data.list = this.store.tableDate1;
                      data.name = this.store.form.chineseType;
                      data.nameEn = this.store.form.englishType;
                      data.type = this.store.form.type;
                      data.descr = this.store.form.desc
                      console.log(data)
                      axiosHttpPost(this,url,data,(res)=>{
                        if(res.data.status == 'FAIL'){
                          _this.$message.error(res.data.message)
                        }else{
                          console.log(store.dialogFormVisible)
                          _this.$message.success('创建成功');
                          _this.$emit('tabView');
                          store.dialogFormVisible = false;
                        }
                      })
                    }
                  }
                }
              })
            },
            cancel(formName) {
              this.store.tableDate1 = [];
              this.store.arrDate = [];
              this.store.rowsNum = 0;
              this.$refs[formName].resetFields();
              store.dialogFormVisible = false;
            },
            addTo(){
              let arr = this.store.tableDate1;
              let obj = {
                  idx: this.store.rowsNum,
                  min: '',
                  max: ''
                }
              if(arr.length == 0){
                this.store.rowsNum++;
                this.store.tableDate1.push(obj)
              }else if(arr[arr.length-1].max == ''){
                this.$message.warning('数据设置不正确，请确认后添加！')
              }else{
                this.store.rowsNum++;
                this.store.tableDate1.push(obj)
              }
            },
            reduceTo(){
              if(this.store.tableDate1.length==0){
                this.$message.warning('没有可以删除的数据！')
              }else{
                this.store.rowsNum--;
                this.store.arrDate.pop()
                this.store.arrDate.pop()
                this.store.tableDate1.splice(this.store.tableDate.length-1,1)
              }
            },
        },
        created(){
          this.store.arrDate1 =[];
          this.store.tableDate = [];
        },
        computed:{
          chineseType(){
            return this.store.form.chineseType
          }
        },
        watch:{
          chineseType(newValue,oldValue){
            console.log(newValue)
            if(newValue == ''){
              this.store.form.englishType = ''
            }else{
              this.store.dataType.forEach((item)=>{
                if(item.label == newValue){
                  this.store.form.englishType = item.value
                }
              })
            }
          }
        }
    }
</script>
<style scoped>
    .right-common { width:180px; }
    #content_top { margin-bottom:10px;}
</style>
