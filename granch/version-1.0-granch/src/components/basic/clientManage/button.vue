<template>
    <div class="buttonArea">
        <el-button 
        v-for="item in store.buttonListArr" 
        :key="item.id" v-if="item.isDynamic == false"
        :type="item.type" size="small" :icon="item.icon" 
        @click="handleFunctionName(item)"  
        :disabled="store.listLoading">
        {{item.name}}
        </el-button>
        <!-- <div style="float:right"> -->
            <!-- <el-button type="primary" icon="el-icon-search" style="width:80px;" size="small" @click="search"  :disabled="store.listLoading">查询</el-button> -->
            <!-- <el-button type="primary" icon="el-icon-search" style="width:80px;" size="small" @click="resetTable"  :disabled="store.listLoading">重置</el-button>
            <el-button type="primary" style="width:80px;" size="small" @click="startUsing"  :disabled="store.listLoading">启用</el-button>
            <el-button type="danger" style="width:80px;" size="small" @click="stopUsing"  :disabled="store.listLoading">停用</el-button>
            <el-button type="danger" style="width:80px;" size="small" @click="remove"  :disabled="store.listLoading">删除</el-button>
            <el-button type="success" style="width:80px;margin-right:10px;" size="small" :loading="store.downloadLoading"@click="handleDownload"  :disabled="store.listLoading">导出</el-button> -->
        <!-- </div> -->
        <!-- <el-button type="primary" size="small" @click="addData"  icon="el-icon-plus"  style="float:left;margin-right:0;" :disabled="store.listLoading">添加</el-button> -->
    </div>
</template>
<script>
import { store } from './store'
import { resetTemp,resetCondition } from './event.js'
import bus from '../../base/bus'
import { Download } from '../../../assets/js/Download'
export default {
    data() {
        return {
            store
        }
    },
    methods: {
            addData() {
                resetTemp();
                store.dialogFormVisible = true;
            },
            search() {
                    bus.$emit('baseSignal', 'search')
            },
            startUsing () {
                if(store.multipleSelection.length == 0) {
                    this.$message({ message: '您的选择为空', type: 'warning' })
                    return false;
                }
                for( let i = 0; i< store.multipleSelection.length; i++) {
                    let item = store.multipleSelection[i];
                    if(item.state != 'UNREGISTERED' && item.state != 'BLOCK_UP') {
                        this.$message({ message: '所选用户包含非未注册以及停用客户', type: 'warning' })
                        return false;
                    }
                }
                this.$confirm('是否启用所选公司', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    bus.$emit('baseSignal', 'startUsing')
                })
            },
            stopUsing () {
                if(store.multipleSelection.length == 0) {
                    this.$message({ message: '您的选择为空', type: 'warning' })
                    return false;
                }
                 for( let i = 0; i< store.multipleSelection.length; i++) {
                    let item = store.multipleSelection[i];
                    if(item.state != 'REGISTERED') {
                        this.$message({ message: '所选用户包含非已启用客户', type: 'warning' })
                        return false;
                    }
                }
                this.$confirm('是否停用所选公司', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    bus.$emit('baseSignal', 'stopUsing')

                })
            },
            remove() {
                if(store.multipleSelection.length == 0) {
                    this.$message({ message: '您的选择为空', type: 'warning' })
                    return false;
                }
                this.$confirm('是否删除所选公司', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    bus.$emit('baseSignal', 'remove')
                })
            },
            handleDownload() {
                // const mapStatus = {
                //     "REGISTERED": '启用',
                //     "EXPIRE": '已过期',
                //     "BLOCK_UP": '停用'
                // }
                store.multipleSelection.forEach((item) => {
                    if(item.customerType == '1') {
                        item.customerType = '客户'
                    }else if (item.customerType == '2') {
                        item.customerType = '工厂'
                    }
                    item.startTime = new Date(item.startTime).getFullYear() + '-' + (parseInt(new Date(item.startTime).getMonth()) + 1) + '-'+ this.dateTransform(item.startTime)
                    item.endTime = new Date(item.endTime).getFullYear() + '-' + (parseInt(new Date(item.endTime).getMonth()) + 1) + '-' + this.dateTransform(item.endTime)
                    // item.state = mapStatus[item.state]
                })
                Download(this, store)
            },
            dateTransform(date) {
                return new Date(date).getDate()<10?'0'+ new Date(date).getDate():new Date(date).getDate()
            },
            resetTable() {
                resetCondition()
                bus.$emit('baseSignal', 'reload')
            },
            handleFunctionName(item) {
                let name = item.url.split('/')[item.url.split('/').length-1]
                eval("this."+name+"();")
            }
    }
}
</script>
<style scoped>
    .buttonArea { text-align: left; }
    .buttonArea::before, .buttonArea::after { content:''; display:block; height:0; clear:both; visibility:hidden;}
    .buttonArea button { width: 80px; }
    .item-control{ padding:9px 10px; }
</style>