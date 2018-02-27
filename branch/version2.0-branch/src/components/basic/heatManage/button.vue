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
        <!-- <div class="func"> -->
            <!-- <el-button type="primary" size="small" icon="el-icon-plus" @click="addData" :disabled="store.listLoading">添加</el-button>    -->
            <!-- <div class="rightfunc">
                <el-button type="primary" size="small" @click="search" icon="el-icon-search" :disabled="store.listLoading">查询</el-button>   
                <el-button type="primary" size="small" @click="resetTable" :disabled="store.listLoading">重置</el-button>   
                <el-button type="success" size="small" @click="handleDownload" style="margin-right:10px;" :disabled="store.listLoading">导出</el-button> 
            </div> -->
        <!-- </div>   -->
    </div>
</template>
<script>
import { store } from './store'
import { resetTemp,resetCondition } from './event'
import { globalStore } from "../../base/store";
import { Download } from '../../../assets/js/Download'


import bus from '../../base/bus'
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
            store.dialogFormVisible = true;
        },
        resetTable() {
            resetCondition()
            bus.$emit('baseSignal', 'reload')
        },
        handleDownload() {
            const mapType = {
                "1": '热电',
                '2': '区域锅炉房',
                '3': '核电',
                '4': '工业余热'
            }
            store.multipleSelection.forEach((item) => {
                item.type = mapType[item.type]
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

