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
      <!-- <el-button type="primary" icon="el-icon-plus" size="small" @click="addData" :disabled="store.listLoading">添加</el-button> -->
      <!-- <div class="right">
            <el-button type="primary" icon="el-icon-search" size="small" @click="search" :disabled="store.listLoading">查询</el-button>
            <el-button type="primary"  size="small" @click="resetTable" :disabled="store.listLoading">重置</el-button>
            <el-button type="success"  style="margin-right:10px;"  size="small" @click="handleDownload" :disabled="store.listLoading">导出</el-button>
      </div> -->
  </div>
</template>
<script>
import { store } from './store'
import { resetTemp, resetCondition } from './event'
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
            // 移出上一次的验证
        },
        resetTable() {
            resetCondition();
            bus.$emit('baseSignal', 'reload')
        },
        handleDownload() {
            store.multipleSelection.forEach((item) => {
                item.createDate = new Date(item.createDate).getFullYear() + '-' + (parseInt(new Date(item.createDate).getMonth()) + 1) + '-'+ this.dateTransform(item.createDate)
            })
            Download(this, this.store)
        },
        dateTransform(date) {
            return new Date(date).getDate()<10?'0'+ new Date(date).getDate():new Date(date).getDate()
        },
        handleFunctionName(item) {
            // console.log(name);
            let name = item.url.split('/')[item.url.split('/').length-1]
            eval("this."+name+"();")
        }
    }
}
</script>
<style scoped>
.right { float: right; }
</style>
