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
         <el-table-column type="selection" width="40" align="center"  fixed>
        </el-table-column>
        <el-table-column type="index"  label="序号" width="50" align="center">
        </el-table-column>
        <el-table-column label="热源编号" width="130" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.sn }}</span>
            </template>
        </el-table-column>
        <el-table-column label="热源名称" min-width="80" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
        </el-table-column>
        <el-table-column label="所属公司" min-width="150" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.company }}</span>
            </template>
        </el-table-column>
        <el-table-column label="热源性质" align="center" width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.property }}</span>
            </template>
        </el-table-column>
        <el-table-column min-width="120" label="供热类型" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.type | typeFilter}}</span>
            </template>
        </el-table-column>
        <el-table-column label="装机容量" align="center" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.capacity }}</span>
            </template>
        </el-table-column>
         <el-table-column label="供热能力" align="center" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.heatingCapacity }}</span>
            </template>
        </el-table-column>
        <el-table-column label="汽机容量" align="center" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.turbineNumber }}</span>
            </template>
        </el-table-column>
        <!-- <el-table-column label="锅炉数量" align="center" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.boilerQuantity }}</span>
            </template>
        </el-table-column> -->
        <el-table-column label="操作" align="center" width="100" fixed="right">
          <template slot-scope="scope">
              <div class="operate">
                <el-button 
                v-for="item in store.buttonListArr" 
                :key="item.id" 
                v-if="item.isDynamic == true" 
                @click="handleFunctionName(item,scope.row)">
                      <i :title="item.name" :class="'iconfont' + ' ' + item.icon"></i>
                </el-button>
                  <!-- <el-button @click="singleModify(scope.row)"><i title="修改" class="iconfont icon-modify"></i></el-button> -->
                  <!-- <el-button @click="singleDelete(scope.row)"><i title="删除" class="iconfont icon-bin"></i></el-button> -->
              </div> 
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
import { store } from './store'
import { globalStore } from "../../base/store";
import { BoilerhouseProtocal } from "../../../protocal/base/BoilerHouseProtocal"
import { doMain } from '../../../protocal/url'
import { axiosHttpPost } from '../../../assets/js/axios'
import bus from '../../base/bus'

export default {
  filters: {
    typeFilter(type) {
      const typeMap = {
        "1": '热电',
        '2': '区域锅炉房',
        '3': '核电',
        '4': '工业余热'
      }
      return typeMap[type]
    }
  },
  data() {
    return {
       store: store
    }
  },
  methods: {
      singleModify(row) {
        console.log(row);
        // store.form = row
        //进行深拷贝 防止修改表单时造成表格中数据显示的错误
        store.form = JSON.parse(JSON.stringify(row))
        store.initSn  = row.sn
        store.initCompany = row.company
        //打开表单
        store.dialogFormVisible  = true;
      },
      singleDelete(row) {
        let _this = this
        this.$confirm('此操作将永久删除该锅炉房, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                let url = doMain.base + BoilerhouseProtocal.remove.rest
                let request = BoilerhouseProtocal.remove.request
                request.id = row.id
                axiosHttpPost(this,doMain.base + BoilerhouseProtocal.remove.rest,request,(res) => {
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
          store.multipleSelection = [];
          val.forEach((item) => {
              let param = {};
              for(var k in item) {
                  param[k] = item[k]
              }
              store.multipleSelection.push(param)
          })
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
