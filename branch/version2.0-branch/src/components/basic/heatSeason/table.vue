<template>
  <div id="tableArea">
    <el-table :data="store.tableData"
      v-loading="store.listLoading"
      @selection-change="handleSelectionChange"
      element-loading-text="数据正在加载"
      max-height="505"
      :header-row-style="{color: 'black'}"
      :style="store.listLoading?'height:492px;':''"
      highlight-current-row
      stripe  
      border 
      fit 
      size="small">
      <el-table-column label="选择" type="selection" align="center" width="40" fixed></el-table-column>
        <el-table-column type="index"  label="序号" width="50" align="center">
        </el-table-column>
        <el-table-column label="名称" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
        </el-table-column>
        <el-table-column label="开始时间" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.startDate | formatDate}}</span>
            </template>
        </el-table-column>
        <el-table-column label="结束时间" align="center" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.endDate | formatDate}}</span>
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
import bus from '../../base/bus'
import { formatDate } from '../../../assets/js/changeDate'
import { globalStore } from "../../base/store";

// import { globalStore } from "../../base/store";
export default {
  filters: {
        formatDate(time) {
            let date = new Date(time)
            return formatDate(date, 'yyyy-MM-dd')
        },
  },
  data() {
    return {
       store: store
    }
  },
  methods: {
      singleModify(row) {
        store.dialogFormVisible  = true;
        store.form.name = row.name
        store.form.id = row.id
        let dayStart = new Date(row.startTime).getDate()<10? '0' + new Date(row.startTime).getDate(): new Date(row.startTime).getDate()
        let dayEnd = new Date(row.endTime).getDate()<10? '0' + new Date(row.endTime).getDate(): new Date(row.endTime).getDate()
        store.form.startTime.time = new Date(row.startDate).getFullYear()+'-'+ (parseFloat(new Date(row.startDate).getMonth())+1) + '-' + dayStart
        store.form.endTime.time = new Date(row.endDate).getFullYear()+'-'+ (parseFloat(new Date(row.endDate).getMonth())+1) + '-' + dayEnd
      },
      singleDelete(row) {
        this.$confirm('此操作将永久删除该名称, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                globalStore.singleId = row.id
                bus.$emit('baseSignal', 'removeSingle')
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
  .operate {display:flex;flex-wrap: nowrap;justify-content: center;}
  .operate > button{width: 22px;height: 22px;padding: 1px 2px;border: none;}
  .operate > button:nth-of-type(1) {background: #23c6c8;}
  .operate > button:nth-of-type(2) {background: #ed5565; }
  .operate i {font-size: 14px;color: #fff;}
  .cell>span {font-size:14px;}
</style>
