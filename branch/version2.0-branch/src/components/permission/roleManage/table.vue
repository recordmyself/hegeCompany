<template>
  <div id="tableArea">
        <el-table 
        :data="store.tableData"
        v-loading = "store.listLoading"
        @selection-change="handleSelectionChange"
        element-loading-text = "数据正在加载"
        max-height="505"
        :style="store.listLoading?'height:492px;':''"
        size="small" 
        :header-row-style="{color: 'black'}"
        highlight-current-row
        stripe
        fit 
        border >
            <el-table-column type="selection"   width="40" align="center">
            </el-table-column>
            <el-table-column label="序号" type="index" align="center" width="50" ></el-table-column>
            <el-table-column label="创建时间" prop="createDate" align="center" width="120">
                    <template slot-scope="scope">
                        <span>{{scope.row.createDate | formatDate}}</span>
                    </template>
            </el-table-column>
            <el-table-column label="角色名称" prop="role_name" align="center" width="120">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
            </el-table-column>
            
            <el-table-column label="角色说明" prop="role_desc" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.descr}}</span>
                    </template>
            </el-table-column>
            <el-table-column label="备注" prop="notes" align="center" min-width="200">
                    <template slot-scope="scope">
                        <span>{{scope.row.descr}}</span>
                    </template>
            </el-table-column>
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
                        <!-- <el-button @click="singleModify(scope.row)"><i title="修改" class="iconfont icon-modify"></i></el-button>
                        <el-button @click="singleDelete(scope.row)"><i title="删除" class="iconfont icon-bin"></i></el-button> -->
                        <!-- <el-button @click="authConfig(scope.row)"><i title="权限配置" class="iconfont icon-wrench"></i></el-button> -->
                    </div>                        
                </template>
            </el-table-column>
      </el-table>
  </div>
</template>
<script>
import { store } from './store'
import bus from '../../base/bus'
// import { axiosHttpPost } from '../../../assets/js/axios'
import { formatDate } from '../../../assets/js/changeDate'
export default {
    filters: {
        formatDate(time) {
            let date = new Date(time)
            return formatDate(date, 'yyyy-MM-dd')
        }
    },
    data() {
        return {
          store: store
        }
    },
    methods: {
        //表格相关方法开始-----------
        singleModify(row) {
            store.form = row
            store.dialogFormVisible  = true;
            
            // bus.$emit('baseSignal', 'singleModify')
        },
        singleDelete(row) {
            this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                store.singleId = row.id
                bus.$emit('baseSignal', 'removeSingle')
            })
        },
        authConfig(row) {
            console.log(row);
            store.dialogAuth = true
            store.roleId = row.id
            console.log(row.id);
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
        //表格相关方法结束-----------
    }

}
</script>
<style scoped>
    .operate { display:flex; flex-wrap: nowrap; justify-content: space-between; }
    .operate > button{ width: 22px; height: 22px; padding: 1px 2px; border: none; }
    .operate > button:nth-of-type(1) { background: #23c6c8; }
    .operate > button:nth-of-type(2) { background: #ed5565; }
    .operate > button:nth-of-type(3) { background: #f8a459; }
    .operate i { font-size: 14px; color: #fff; }
    .cell>span { font-size:14px; }
</style>
