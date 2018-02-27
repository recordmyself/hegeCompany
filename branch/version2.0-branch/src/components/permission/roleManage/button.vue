<template>
  <div id="buttonArea">
      <!-- <el-button type="primary" size="small" icon="el-icon-plus" @click="addData" :disabled="store.listLoading">添加</el-button>    -->
        <el-button 
        v-for="item in store.buttonListArr" 
        :key="item.id" v-if="item.isDynamic == false"
        :type="item.type" size="small" :icon="item.icon" 
        @click="handleFunctionName(item)"  
        :disabled="store.listLoading">
        
        {{item.name}}
        </el-button>
          <!-- <el-button type="primary" size="small" @click="search" icon="el-icon-search" :disabled='store.listLoading'>查询</el-button>   
          <el-button type="primary" size="small" @click="resetTable" :disabled='store.listLoading'>重置</el-button>   
          <el-button type="success" size="small" @click="handleDownload" style="margin-right:10px;" :disabled='store.listLoading'>导出</el-button>  -->
  </div>
</template>
<script>
import { store } from './store'
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
            store.form = { name:null, descr:null }
            store.dialogFormVisible = true
             //移出上一次的验证
            this.$nextTick(()=> {
                setTimeout(()=>{
                    bus.$emit('clearSignal','yes')
                },0)
            })
        },
        search() {
            bus.$emit('baseSignal', 'search')
        },
        resetTable() {
            store.searchData = {
                 searchData: {
                    page:1,
                    rows:20,
                    orderBy:"id",
                    sc:"DESC",
                    name:null,
                    createDate:[],
                    startDate: null,
                    endDate: null
                }
            },
            bus.$emit('baseSignal', 'reload')
        },
        handleDownload() {
            store.multipleSelection.forEach((item) => {
                // let day = new Date(item.createDate).getDate()
                // console.log(day);
                item.createDate = new Date(item.createDate).getFullYear() + '-' + (parseInt(new Date(item.createDate).getMonth()) + 1) + '-'+  this.dateTransform(item.createDate)
            })
            Download(this, store)
        },
        dateTransform(date) {
            return new Date(date).getDate()<10?'0'+ new Date(date).getDate():new Date(date).getDate()
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
      border: none;
    }
    #buttonArea {
        display: flex;
        width:100%;
    }
    .rightfunc {
        flex:1;
        text-align: right;
    }
    .rightfunc .inline-input {
        vertical-align: middle;
    }
</style>
