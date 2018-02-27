<template>
  <div id="tableArea">
    <el-table :data="store.tableData"
      v-loading="store.listLoading"
      element-loading-text="数据正在加载"
      max-height="505"
      :header-row-style="{color: 'black'}"
      highlight-current-row
      :style="store.listLoading?'height:492px;':''"
      stripe
      border
      fit
      size="small">
      <!-- <el-table-column type="selection" width="40" align="center" fixed>
        </el-table-column> -->
        <el-table-column type="index"  label="序号" width="50" align="center">
        </el-table-column>
        <el-table-column label="参数名称（中文）" min-width="" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
        </el-table-column>
        <el-table-column label="参数名称（英文）" min-width="" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.nameEn}}</span>
            </template>
        </el-table-column>
        <el-table-column label="指标类型" align="center" min-width="">
            <template slot-scope="scope">
              <span>{{changeType(scope.row.type)}}</span>
            </template>
        </el-table-column>
        <el-table-column width="" label="备注" align="center" >
            <template slot-scope="scope">
              <span>{{scope.row.descr}}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template slot-scope="scope">
              <div class="operate">
                  <el-button
                  v-for="item in store.buttonListArr"
                  :key="item.id"
                  v-if="item.isDynamic == true"
                  @click="handleFunctionName(item,scope.row)">
                        <i :title="item.name" :class="item.icon"></i>
                  </el-button>
                  <!-- <el-button @click="singleModify(scope.row)"><i class="iconfont icon-modify"></i></el-button>
                  <el-button @click="singleDelete(scope.row)"><i class="iconfont icon-bin"></i></el-button> -->
              </div>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
import { store } from './store'
import { globalStore } from "../../base/store";
import { doMain } from '../../../protocal/url'
import { ReportFormsProtocal } from '../../../protocal/web/ReportFormsProtocal'
import { axiosHttpPost } from '../../../assets/js/axios'
import bus from '../../base/bus'
export default {
  data() {
    return {
       store: store
    }
  },
  methods: {
      singleModify(row) {
        let _this = this;
        let url = doMain.web + ReportFormsProtocal.selectrfParameter.rest;
        let data = ReportFormsProtocal.selectrfParameter.request;
        data.id = row.id;
        axiosHttpPost(this,url,data,(res)=>{
          if(res.data.status == "FAIL"){
            _this.$message.error(res.data.message)
          }else{
            _this.store.resDate = res.data.result
          }
        })
      },
      singleView(row){
        console.log('view',row)
      },
      singleDelete(row) {
        console.log('delete',row)
      },
      changeType(a){
        switch(a){
          case 1: return '煤';break;
          case 2: return '油';break;
          case 3: return '气';break;
        }
      },
      handleFunctionName(item, row) {
          let name = item.url.split('/')[item.url.split('/').length-1]
          eval('this.' + name + '(row);')
      },
  },

  created() {
  }

}
</script>
<style scoped>
  .operate {display:flex;flex-wrap: nowrap;justify-content: center;}
  .operate > button{width: 22px;height: 22px;padding: 1px 2px;border: none;}
  .operate > button:nth-of-type(1) {background: #23c6c8;}
  .operate > button:nth-of-type(2) {background: #99CC33; }
  .operate > button:nth-of-type(3) {background: #ed5565; }
  .operate i {font-size: 14px;color: #fff;}
  .cell>span {font-size:14px;}
</style>
