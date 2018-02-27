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
        <el-button size="small" type="primary" :disabled="store.listLoading" @click="findeAll()">查询</el-button>
        <!-- <div class="func">
            <el-button type="primary" size="small" icon="el-icon-plus" :disabled="store.listLoading" @click="addData">添加</el-button>
            <div class="rightfunc">
                <el-button type="primary" size="small" :disabled="store.listLoading" @click="search" icon="el-icon-search">搜索</el-button>
                <el-button type="primary" size="small" :disabled="store.listLoading" @click="resetTable">重置</el-button>
                <el-button type="success" size="small" :disabled="store.listLoading" @click="handleDownload" style="margin-right:10px;">导出Excel</el-button>
            </div>
        </div> -->
    </div>
</template>
<script>
import { store } from './store'
import { resetTemp,resetCondition } from './event'
import { createTable } from './createTable'
import bus from '../../base/bus'

import { Download } from '../../../assets/js/Download'
export default {
    data() {
        return {
            store
        }
    },
    methods: {
        findeAll(){

        },
        addData() {
            store.dialogFormVisible = true;
        },
        handleFunctionName(item) {
            let name = item.url.split('/')[item.url.split('/').length-1]
            eval("this."+name+"();")
        }
    }
}
</script>
<style scoped>
/* #buttonArea .el-button{
  width:80px;
} */
.func {display: flex;}
.rightfunc {flex:1;text-align: right;}
.rightfunc .inline-input {vertical-align: middle;}
</style>
