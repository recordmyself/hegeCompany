<template>
  <div id="buttonArea">
        <el-button 
        v-for="item in store.buttonListArr" 
        :key="item.id" v-if="item.isDynamic == false"
        :type="item.type" size="small" :icon="item.icon" 
        @click="handleFunctionName(item)"  
        :disabled="store.listLoading">
        {{item.name}}
        </el-button>
        <!-- <div class="func">
            <el-button type="primary" size="small" :disabled="store.listLoading" icon="el-icon-plus" @click="addData">添加</el-button>   
            <div class="rightfunc">
                <el-button type="primary" size="small" :disabled="store.listLoading" @click="search" icon="el-icon-search">查询</el-button>   
                <el-button type="primary" size="small" :disabled="store.listLoading" @click="resetTable">重置</el-button>   
                <el-button type="success" size="small" :disabled="store.listLoading" @click="handleDownload" style="margin-right:10px;">导出</el-button> 
            </div>
        </div>   -->
    </div>
</template>
<script>
import { store } from './store'
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
            bus.$emit('baseSignal','search')
        },
        addData() {
            resetTemp();
            this.store.dialogFormVisible = true;
           
        },
        resetTable() {
            resetCondition()
            bus.$emit('baseSignal', 'reload')
        },
        handleDownload() {
            store.multipleSelection.forEach((item) => {
                item.startDate = new Date(item.startDate).getFullYear + '-' + (parseInt(new Date(item.startDate).getMonth())+1) + '-' + new Date(item.startDate).getDay()
                item.endDate = new Date(item.endDate).getFullYear + '-' + (parseInt(new Date(item.endDate).getMonth())+1) + '-' + new Date(item.endDate).getDay()
            })
            Download(this, store)
        },
        handleFunctionName(item) {
            let name = item.url.split('/')[item.url.split('/').length-1]
            eval("this."+name+"();")
        }
    }
}
</script>
<style scoped>
#ButtonT .el-button{
  width:80px;
}
.func {display: flex;}
.rightfunc {flex:1;text-align: right;}
.rightfunc .inline-input {vertical-align: middle;}
</style>
