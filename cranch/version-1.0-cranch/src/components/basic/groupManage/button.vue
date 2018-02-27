<template>
  <div id="buttonArea">
        <div class="func">
            <el-button 
            v-for="item in store.buttonListArr" 
            :key="item.id" v-if="item.isDynamic == false"
            :type="item.type" size="small" :icon="item.icon" 
            @click="handleFunctionName(item)"  
            :disabled="store.listLoading">
            {{item.name}}
            </el-button>
            <!-- <el-button type="primary" size="small" icon="el-icon-plus" @click="addData" :disabled="store.listLoading">添加</el-button>    -->
            <!-- <div class="rightfunc"> -->
                <!-- <el-button type="primary" size="small" @click="search" icon="el-icon-search" :disabled="store.listLoading">查询</el-button>   
                <el-button type="primary" size="small" @click="resetTable" :disabled="store.listLoading">重置</el-button>
                <el-button type="primary" size="small" @click="enable" :disabled="store.listLoading">启用</el-button>   
                <el-button type="danger" size="small" @click="ban" :disabled="store.listLoading">停用</el-button>   
                <el-button type="success" size="small" @click="handleDownload" style="margin-right:10px;" :loading="store.downloadLoading" :disabled="store.listLoading">导出</el-button>  -->
            <!-- </div> -->
        </div>  
    </div>
</template>
<script>
import { store } from './store'
import { globalStore } from '../../base/store'
import { resetTemp,resetCondition } from './event'
import bus from '../../base/bus'
import { Download } from '../../../assets/js/Download'
export default {
    data() {
        return {
            store
        }
    },
    methods: {
        search() {
                bus.$emit('baseSignal', 'search')
        },
        addData() {
            resetTemp();
            this.store.dialogFormVisible = true;
            // 移出上一次的验证
        },
        resetTable() {
            resetCondition()
            bus.$emit('baseSignal', 'reload')
        },
        stopUsing() {
            if(store.multipleSelection.length == 0) {
                this.$message({ message: '您的选择为空', type: 'warning' })
                return false;
            }
            for( let i = 0; i< store.multipleSelection.length; i++) {
                let item = store.multipleSelection[i];
                if(item.name == globalStore.userInfo.orgName) {
                    this.$message({ message: '没有权限对当前组织机构进行操作', type: 'warning' })
                    return false;
                }
                if(item.state == 'BLOCK_UP') {
                    this.$message({ message: '所选机构包含已停用机构', type: 'warning' })
                    return false;
                }
            }
            this.$confirm('是否停用所选组织', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                bus.$emit('baseSignal', 'stopUsing')
            })
        },
        startUsing() {
                if(store.multipleSelection.length == 0) {
                    this.$message({ message: '您的选择为空', type: 'warning' })
                    return false;
                }
                for( let i = 0; i< store.multipleSelection.length; i++) {
                    let item = store.multipleSelection[i];
                    if(item.name == globalStore.userInfo.orgName) {
                        this.$message({ message: '没有权限对当前组织机构进行操作', type: 'warning' })
                        return false;
                    }
                    if( item.state = 'REGISTERED') {
                        this.$message({ message: '所选机构包含已启用机构', type: 'warning' })
                        return false;
                    }
                }
                
            this.$confirm('是否启用所选组织', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    bus.$emit('baseSignal', 'startUsing')
                })
        },
        handleDownload() {
            store.multipleSelection.forEach((item) => {
                item.createDate = new Date(item.createDate).getFullYear() + '-' + (parseInt(new Date(item.createDate).getMonth()) + 1) + '-'+ this.dateTransform(item.createDate)
                if(item.type == 1) {
                    item.type = '公司'
                }else if (item.type == 2) {
                    item.type = '部门'
                }
                if(item.state == 'REGISTERED') {
                    item.state = '启用'
                }else if (item.type == 'block_up') {
                    item.type = '停用'
                }
            })
            Download(this, store)
        },
        dateTransform(date) {
            return new Date(date).getDate()<10?'0'+ new Date(date).getDate():new Date(date).getDate()
        },
        handleFunctionName(item) {
            console.log(item);
            let name = item.url.split('/')[item.url.split('/').length-1]
            eval("this."+name+"();")
        }
    }
}
</script>
<style scoped>
#ButtonT .el-button{ width:80px; }
.func {display: flex;}
.rightfunc {flex:1;text-align: right;}
.rightfunc .inline-input {vertical-align: middle;}
</style>
