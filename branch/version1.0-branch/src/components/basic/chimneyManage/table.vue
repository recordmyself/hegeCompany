<template>
  <div id="tableArea">
    <el-table :data="store.tableData"
      v-loading="store.listLoading"
      @selection-change="handleSelectionChange"
      element-loading-text="数据正在加载"
      :header-row-style="{color: 'black'}"
      max-height="505"
      :style="store.listLoading?'height:492px;':''"
      highlight-current-row
      stripe 
      border 
      fit 
      size="small">
      <el-table-column type="selection" width="40" align="center" fixed>
        </el-table-column>
        <el-table-column type="index"  label="序号" width="50" align="center" fixed>
        </el-table-column>
        <el-table-column label="创建时间" width="120" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.createDate | formatDate}}</span>
            </template>
        </el-table-column>
         <el-table-column label="烟囱编号" min-width="70" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.gasSn}}</span>
            </template>
        </el-table-column>
        <el-table-column label="烟囱名称" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
        </el-table-column>
        
        <el-table-column label="所属机构" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.company}}</span>
            </template>
        </el-table-column>
        <el-table-column label="所属锅炉房" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.houseName}}</span>
            </template>
        </el-table-column>
        <el-table-column label="安装公司" align="center" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.installationUnit}}</span>
            </template>
        </el-table-column>
        <el-table-column width="80" label="负责人" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.head}}</span>
            </template>
        </el-table-column>
        <el-table-column label="电话" align="center" width="120">
            <template slot-scope="scope">
              <span>{{scope.row.phone}}</span>
            </template>
        </el-table-column>
        <el-table-column label="经度" align="center" width="120">
            <template slot-scope="scope">
              <span>{{scope.row.longitude}}</span>
            </template>
        </el-table-column>
        <el-table-column label="纬度" align="center" width="120">
            <template slot-scope="scope">
              <span>{{scope.row.latitude}}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100" fixed="right">
          <template slot-scope="scope">
              <div class="operate">
                  <!-- <el-button @click="handleEdit(scope.row)"><i title="修改" class="iconfont icon-modify"></i></el-button>
                  <el-button @click="handleDelete(scope.row)"><i title="删除" class="iconfont icon-bin"></i></el-button> -->
                  <el-button 
                      v-for="item in store.buttonListArr" 
                      :key="item.id" 
                      v-if="item.isDynamic == true" 
                      @click="handleFunctionName(item,scope.row)">
                            <i :title="item.name" :class="'iconfont' + ' ' + item.icon"></i>
                      </el-button>
              </div> 
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
import { store } from './store'
import { globalStore } from "../../base/store";
import bus from '../../base/bus'
import { formatDate } from '../../../assets/js/changeDate'

import { doMain } from '../../../protocal/url'
import { ChimneyProtocal } from "../../../protocal/base/ChimneyProtocal"
import { axiosHttpPost } from '../../../assets/js/axios'
export default {
  filters: {
        formatDate(time) {
            let date = new Date(time)
            return formatDate(date, 'yyyy-MM-dd')
        }
  },
  data() {
    return {
       store,
       globalStore
    }
  },
  methods: {
      singleModify(row) {
          console.log(row);
        //   store.form = row
          store.form = JSON.parse(JSON.stringify(row))
          store.initGasSn = row.gasSn
          store.dialogFormVisible  = true;
      },
      singleDelete(row) {
          let _this = this;
          this.$confirm('是否删除该烟囱?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    // globalStore.singleId = row.id
                    // bus.$emit('baseSignal', 'singleRemove')
                    let url = doMain.base + ChimneyProtocal.remove.rest
                    let request = ChimneyProtocal.remove.request
                    request.id = row.id
                    axiosHttpPost(this,doMain.base + ChimneyProtocal.remove.rest,request,(res) => {
                                    // console.log('打印删除');
                                    console.log(res);
                                    if(res.data.status == 'OK') {
                                        this.$message({ message: '删除成功', type: 'success' })
                                        _this.$emit('tabView')
                                    }else {
                                        this.$message({ message:res.data.message, type: 'error' })
                                    }
                                })

                })        
      },
      handleSelectionChange(val) {
          store.multipleSelection =          val;
      },
      handleFunctionName(item, row) {
          let name = item.url.split('/')[item.url.split('/').length-1]
          eval('this.' + name + '(row);')
      }
  }

}
</script>
<style scoped>
  .operate { display:flex;flex-wrap: nowrap;justify-content: center; }
  .operate > button{width: 22px;height: 22px;padding: 1px 2px;border: none; }
  .operate > button:nth-of-type(1) {background: #23c6c8; }
  .operate > button:nth-of-type(2) {background: #ed5565; }
  .operate i { font-size: 14px;color: #fff; }
  .cell>span { font-size:14px; }
</style>
