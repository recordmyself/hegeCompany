<template>
  <div id="tableArea">
    <el-table :data="store.tableData" size="small" style="width: 100%" stripe border  :header-row-style="{color: 'black'}" @selection-change="handleSelectionChange" highlight-current-row max-height="500" v-loading="globalStore.loading">
        <el-table-column type="index" width="50" label="序号" fixed="left" align="center"></el-table-column>
        <el-table-column prop="oldfileName" label="文件名称" align="center" width=""></el-table-column>
        <el-table-column prop="companyName" label="上传单位" align="center" width=""></el-table-column>
        <el-table-column prop="revTime" label="日期/时间" align="center" width="" :formatter="changeDate"></el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="180px">
          <template slot-scope="scope">
            <el-button
                :class="item.sclass"
                v-for="item in store.buttonListArr"
                :key="item.id"
                v-if="item.isDynamic == true"
                @click="handleFunctionName(item,scope.row)">
                  <i :title="item.name" :class="item.icon"></i>
                </el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
import { store } from './store'
import { globalStore } from '../../base/store'
import bus from '../../base/bus'
import { parseTime } from '../../../assets/js/changeDate'
import { axiosHttpGet,axiosHttpPost } from '../../../assets/js/axios'
import { doMain} from '../../../protocal/url'
import { FileUploadProtocal } from '../../../protocal/web/FileUploadProtocal'
export default {
  data() {
    return {
       store,
       globalStore,
    }
  },
  methods: {
    add(){
      bus.$emit('findView');
    },
    // 查看Excel
    findView(row){
      // 获取数据表格展示
      this.store.row = row;
      this.add();
      this.store.dialogVisible = true;
    },
    // 导出Excel
    handleDownload(row){
      // 直接下载
      let address = row.address;
        window.location.href = doMain.web + FileUploadProtocal.downExcle.rest + address
    },
    // 修改日期
    changeDate(row,column){
      return parseTime(row,column,true)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleFunctionName(item, row) {
      let name = item.url.split('/')[item.url.split('/').length-1]
      eval('this.' + name + '(row);')
    },
  },


}
</script>
<style scoped>
#tableArea .el-button{
  width: 22px;
  height: 22px;
  padding: 1px 2px;
  border: none;
  color: #FFF;
}
#tableArea .el-button i:hover{
  color: goldenrod;
}
.vie{
  background: #d4237a;
}
.dow{
  background: #67C23A;
}
</style>
