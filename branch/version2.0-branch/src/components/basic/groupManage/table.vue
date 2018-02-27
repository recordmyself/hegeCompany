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
        <el-table-column label="选择" type="selection" align="center" width="40" fixed></el-table-column>
        <el-table-column type="index"  label="序号" width="50" align="center">
        </el-table-column>
        <el-table-column label="创建时间" width="120" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.createDate | formatDate}}</span>
            </template>
        </el-table-column>
        <el-table-column label="社会信用编码" width="180" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.creditSn}}</span>
            </template>
        </el-table-column>
        <el-table-column label="所属组织机构" min-width="130" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.superOrganization | companyFilter}}</span>
            </template>
        </el-table-column>
        <el-table-column label="组织机构名称" min-width="120" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
        </el-table-column>
         <el-table-column label="联系人" align="center" width="100">
            <template slot-scope="scope">
              <span>{{scope.row.head}}</span>
            </template>
        </el-table-column>
        
        <el-table-column label="机构类型" width="130" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.type | companyTypeFilter}}</span>
            </template>
        </el-table-column>
        <el-table-column label="省市区" width="130" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.city}}{{scope.row.area}}</span>
            </template>
        </el-table-column>
        <el-table-column label="组织机构状态" width="130" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.state | statusFilter}}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100" fixed="right">
            <template slot-scope="scope">
                <div class="operate">
                    <el-button 
                    v-for="item in store.buttonListArr" 
                    :key="item.id" 
                    v-if="item.isDynamic == true && globalStore.userInfo.orgName != scope.row.name" 
                    @click="handleFunctionName(item,scope.row)">
                        <i :title="item.name" :class="'iconfont' + ' ' + item.icon"></i>
                    </el-button>
                    <!-- <el-button @click="singleModify(scope.row)"><i title="修改" class="iconfont icon-modify"></i></el-button>
                    <el-button @click="singleDelete(scope.row)"><i title="删除" class="iconfont icon-bin"></i></el-button> -->
                </div> 
            </template>
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
import { store } from './store'
import { globalStore } from '../../base/store'
import bus from '../../base/bus'
import { formatDate } from '../../../assets/js/changeDate'

export default {
  filters: {
    formatDate(time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd')
    },
    companyTypeFilter(type) {
        if(type == 1) {
            return '公司'
        }else {
            return '部门'
        }
    },
    companyFilter(company) {
        if(!company) {
            return ''
        }else {
            return company
        }
     },
     statusFilter(type) {
         if(type == "REGISTERED") {
             return '启用'
         }else if(type == 'BLOCK_UP'){
             return '停用'
         }
     }
  },
  data() {
    return {
       store: store,
       globalStore
    }
  },
  methods: {
        singleModify(row) {
            console.log(row);
            store.dialogFormVisible  = true;
            // store.form = row
            store.form = JSON.parse(JSON.stringify(row))
            store.initCreditSn = row.creditSn
        },
        singleDelete(row) {
            this.$confirm('此操作将永久删除组织, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    // globalStore.singleId = row.id
                    store.removeMessage.id = row.id
                    store.removeMessage.company = row.name
                    store.removeMessage.province = row.city
                    store.removeMessage.city = row.area
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
            // store.multipleSelection = val;
        },
        handleFunctionName(item, row) {
            let name = item.url.split('/')[item.url.split('/').length-1]
            eval('this.' + name + '(row);')
            
        }
  },
  mounted() {
    //   console.log(globalStore.userInfo);
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
