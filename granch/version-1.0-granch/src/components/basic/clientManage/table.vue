<template>
    <div class="tableArea">
        <el-table 
        :data="store.tableData"
        v-loading="store.listLoading" 
        element-loading-text="数据正在加载" 
        @selection-change="handleSelectionChange"
        :header-row-style="{color: 'black'}"
        highlight-current-row
        max-height="505"
        :style="store.listLoading?'height:492px;':''"
        stripe 
        size="small" 
        fit 
        border
         >
            <el-table-column label="选择" type="selection" align="center" width="40" fixed></el-table-column>
            <el-table-column label="序号" type="index" align="center" width="50" fixed></el-table-column>  
            <el-table-column label="公司名称" min-width="190" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
             <el-table-column label="社会信用编码" width="180" align="center">
            <template slot-scope="scope">
                <span>{{scope.row.unifiedCode}}</span>
                </template>
            </el-table-column>
            <el-table-column label="联系人" width="95" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.contacts}}</span>
                </template>
            </el-table-column>
            <el-table-column label="电话" width="110" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.phone}}</span>
                </template>
            </el-table-column>
            <el-table-column label="邮箱" width="200" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.email}}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column label="统一信用代码" width="100" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.unifiedCode}}</span>
                </template>
            </el-table-column> -->
            <!-- <el-table-column label="所属公司" min-width="190" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.affiliatedCompany | formatAffiliatedCompany}}</span>
                </template>
            </el-table-column> -->
            <el-table-column label="公司类型" width="80" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.customerType | formatClient}}</span>
                </template>
            </el-table-column>
            <el-table-column label="有效期" min-width="180" align="center">
                    <template slot-scope="scope">
                            <span v-if="scope.row.startTime && scope.row.endTime">{{scope.row.startTime | formatDate}} 至 {{scope.row.endTime | formatDate}}</span>
                    </template>
            </el-table-column>
            <el-table-column label="公司状态" width="80"  align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.stateView }}</span>
                    <!-- <span>{{scope.row.state }}</span> -->
                </template>
            </el-table-column>
            <el-table-column label="操作"  width="100" align="center" fixed="right">
                <template slot-scope="scope">
                    <!-- v-if="scope.row.state!='EXPIRE'" -->
                    <div  class="operate">
                        <el-button 
                        v-for="item in store.buttonListArr" 
                        :key="item.id"
                        :type="item.type" 
                        v-if="(item.isDynamic == true && !item.status) || 
                        (item.isDynamic == true && scope.row.state == item.status) || 
                        (item.isDynamic == true && scope.row.state =='UNREGISTERED' && item.status=='BLOCK_UP' )" 
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
    import { formatDate } from '../../../assets/js/changeDate'
    import { store } from './store'
    import bus from '../../base/bus'
    export default {
        data() {
            return {
                store
            }
        },
        filters: {
            formatDate(time) {
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd')
            },
            formatVip(state) {
                if(state == 1) {
                    return '付费'
                }else {
                    return '免费'
                } 
            },
            formatClient(state) {
                if(state == 1){
                    return '客户'
                }else if(state == 2){
                    return '工厂'
                }
            },
            formatStatus(status) {
                const mapStatus = {
                    "REGISTERED": '已启用',
                    "UNREGISTERED": '未注册',
                    "EXPIRE": '已过期',
                    "BLOCK_UP": '停用'
                }
                return mapStatus[status]
            },
            formatAffiliatedCompany(val) {
                if(!val) {
                    return ''
                }
            }
            
        },
        methods: {
            singleStartUsing(row) {
                this.$confirm('是否启用该公司?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    store.singleId = row.id
                    bus.$emit('baseSignal', 'singleStartUsing')
                })      
            },
            singleStopUsing (row) {
                this.$confirm('是否停用该公司?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    store.singleId = row.id
                    bus.$emit('baseSignal', 'singleStopUsing')
                })   
            },
            singleModify(row) {
                console.log(row);
                for(let k in row) {
                    store.form[k] = row[k]
                }
                // if(!row.startTime || !row.endTime) {
                //     return false;
                // }
                if( row.startTime && row.endTime) {
                    let dayStart = new Date(row.startTime).getDate()<10? '0' + new Date(row.startTime).getDate(): new Date(row.startTime).getDate()
                    let dayEnd = new Date(row.endTime).getDate()<10? '0' + new Date(row.endTime).getDate(): new Date(row.endTime).getDate()
                    store.form.startDate.time = new Date(parseFloat(row.startTime)).getFullYear()+'-'+ (parseFloat(new Date(row.startTime).getMonth())+1) + '-' + dayStart
                    store.form.endDate.time = new Date(parseFloat(row.endTime)).getFullYear()+'-'+ (parseFloat(new Date(row.endTime).getMonth())+1) + '-' + dayEnd
                }
                this.store.dialogFormVisible  = true;
            },
            singleDelete(row) {
                this.$confirm('此操作将永久删除该公司, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    store.singleId = row.id
                    bus.$emit('baseSignal', 'removeSingle')
                })
            },
            handleSelectionChange(val) {
                //只需要筛选出需要发送出去的信息即可
                // this.hasSelect = val;
                // store.multipleSelection = val;
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
