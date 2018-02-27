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
        <!-- <el-button  type="primary" size="small"  @click="enable"  :disabled="store.listLoading">审批通过</el-button>  -->
        <!-- <el-button  type="danger" size="small" @click="unregistered" class="postionChange" :disabled="store.listLoading">审批驳回</el-button>    -->
        <!-- <el-button  type="danger" size="small" @click="ban" :disabled="store.listLoading">停用</el-button>    -->
        <!-- <el-button  type="danger" size="small" class="padding_change" @click="remove" :disabled="store.listLoading">删除 <i class="iconfont icon-bin"></i></el-button>  -->
        <!-- <el-button  type="warning"  size="small" class="padding_change" @click="resetPassword" :disabled="store.listLoading">重置密码</el-button> -->
    <!-- </div>   -->
    <!-- <div class="rightfunc"> -->
        <!-- <el-button  type="primary" size="small" @click="search" icon="el-icon-search"  :disabled="store.listLoading">查询</el-button>   
        <el-button  type="primary" size="small" @click="resetTable" :disabled="store.listLoading">重置</el-button>   
        <el-button  type="success" size="small" @click="handleDownload" style="margin-right:10px;" :disabled="store.listLoading">导出</el-button> -->
    <!-- </div>   -->
  </div>    
</template>
<script>
import { store } from './store'
import { globalStore } from "../../base/store";
import { resetCondition, resetTemp, buttonListTop} from  './event'

import bus from '../../base/bus'
import { Download } from '../../../assets/js/Download'
// import { handleFunctionName } from '../../../assets/js/handleName'
export default {
    data() {
        return {
            store,
            globalStore
        }
    },
    methods: {
        addData() {
            resetTemp();
            this.store.dialogFormVisible = true;
        },
        //审批不通过
        unregistered() {
            if(store.multipleSelection.length == 0) {
                this.$message({ message: '您的选择为空', type: 'warning' })
                return false;
            }
            for( let i = 0; i< store.multipleSelection.length; i++) {
                let item = store.multipleSelection[i];
                // if(item.status != "APPROVED" && item.status!= 'UNREGISTERED' ) {
                //     this.$message({ message: '您的选择中包含非待审批或未注册用户', type: 'warning' })
                //     return false;
                // }
                if(item.status != "APPROVED" ) {
                    this.$message({ message: '您的选择中包含非待审批用户', type: 'warning' })
                    return false;
                }
                if(item.companyId == 0 && item.account == globalStore.userInfo.account) {
                    this.$message({ message: ' 无法对管理员进行操作', type: 'warning' })
                    return false;
                }
                if(item.account == globalStore.account) {
                    this.$message({ message: ' 无法账号进行操作', type: 'warning' })
                    return false;
                }
            }
            // store.multipleSelection.forEach((item) => {
                
            // })
            // console.log(store.multipleSelection);
            this.$confirm('审批驳回所选用户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                bus.$emit('baseSignal', 'unregistered')
            })
        },
        //停用
        ban() {
            if(store.multipleSelection.length == 0) {
                this.$message({ message: '您的选择为空', type: 'warning' })
                return false;
            }
            // store.multipleSelection.forEach((item) => {
                for( let i = 0; i< store.multipleSelection.length; i++) {
                    let item = store.multipleSelection[i];
                    if(item.status != "REGISTERED" ) {
                        this.$message({ message: '您的选择中包含非已注册用户', type: 'warning' })
                        return false;
                    }
                    if(item.companyId == 0 && item.account == globalStore.userInfo.account) {
                        this.$message({ message: ' 无法对管理员进行操作', type: 'warning' })
                        return false;
                    }
                    if(item.account == globalStore.account) {
                        this.$message({ message: ' 没有权限对当前账号进行操作', type: 'warning' })
                        return false;
                    }

                }
            // })
            this.$confirm('是否停用所选用户', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                bus.$emit('baseSignal', 'ban')
            })
        },
        //审批通过
        enable() {
            if(store.multipleSelection.length == 0) {
                this.$message({ message: '您的选择为空', type: 'warning' })
                return false;
            }
            
                for( let i = 0; i< store.multipleSelection.length; i++) {
                    let item = store.multipleSelection[i];
                    console.log(item.status);
                    // if(item.status != "APPROVED" && item.status != 'UNREGISTERED' ) {
                    //     this.$message({ message: '您的选择中包含非待审批或未注册用户', type: 'warning' })
                    //     return false;
                    // }
                    if(item.status != "APPROVED"  ) {
                        this.$message({ message: '您的选择中包含非待审批用户', type: 'warning' })
                        return false;
                    }
                    if(item.companyId == 0 && item.account == globalStore.userInfo.account) {
                        this.$message({ message: '无法对管理员进行操作', type: 'warning' })
                        return false;
                    }
                    if(item.account == globalStore.account) {
                        this.$message({ message: ' 没有权限对当前账号进行操作', type: 'warning' })
                        return false;
                    }

                }
            
            this.$confirm('是否审批通过所选用户', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    bus.$emit('baseSignal', 'enable')
                })
        },
        //启用
        startUsing() {
            if(store.multipleSelection.length == 0) {
                this.$message({ message: '您的选择为空', type: 'warning' })
                return false;
            }
            
                for( let i = 0; i< store.multipleSelection.length; i++) {
                    let item = store.multipleSelection[i];
                    if(item.status != "BLOCK_UP" &&  item.status != "UNREGISTERED") {
                        this.$message({ message: '您的选择中包含非停用用户', type: 'warning' })
                        return false;
                    }
                    if(item.companyId == 0 && item.account == globalStore.userInfo.account) {
                        this.$message({ message: '无法对管理员进行操作', type: 'warning' })
                        return false;
                    }
                    if(item.account == globalStore.account) {
                        this.$message({ message: '没有权限对当前账号进行操作', type: 'warning' })
                        return false;
                    }
                }
            
            this.$confirm('是否启用所选用户', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                bus.$emit('baseSignal', 'startUsing')
            })
        },
        remove() {
            if(store.multipleSelection.length == 0) {
                this.$message({ message: '您的选择为空', type: 'warning' })
                return false;
            }
            for( let i = 0; i< store.multipleSelection.length; i++) {
                let item = store.multipleSelection[i];
                if(item.companyId == 0 && item.account == globalStore.userInfo.account) {
                    this.$message({ message: '无法对管理员进行操作', type: 'warning' })
                    return false;
                }
                if(item.account == globalStore.account) {
                    this.$message({ message: '没有权限对当前账号进行操作', type: 'warning' })
                    return false;
                }
            }
            this.$confirm('是否删除所选用户', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    bus.$emit('baseSignal', 'remove')
                })
        },
        resetPassword() {
            if(store.multipleSelection.length == 0) {
                this.$message({ message: '您的选择为空', type: 'warning' })
                return false;
            }
            for( let i = 0; i< store.multipleSelection.length; i++) {
                let item = store.multipleSelection[i];
                if(item.companyId == 0 && item.account == globalStore.userInfo.account) {
                    this.$message({ message: '无法对管理员进行操作', type: 'warning' })
                    return false;
                }
                if(item.account == globalStore.account) {
                    this.$message({ message: '没有权限对当前账号进行操作', type: 'warning' })
                    return false;
                }
            }
            bus.$emit('baseSignal', 'resetPassword')
        },
        search() {
                bus.$emit('baseSignal','search')
        },
        //重置
        resetTable() {
                resetCondition();
                bus.$emit('baseSignal', 'reload')
        },
        //处理导出excel功能
        handleDownload() {
            // const mapStatus = {
            //     "UNREGISTERED": '未注册',
            //     "BLOCK_UP": '停用',
            //     "REGISTERED": '启用',
            //     "EXPIRE": '已过期'
            // }
            const mapMemberType = {
                "0": '免费',
                "1": "付费"
            }
            store.multipleSelection.forEach((item) => {
                item.createDate = new Date(item.createDate).getFullYear() + '-' + (parseInt(new Date(item.createDate).getMonth()) + 1) + '-'+ this.dateTransform(item.createDate)
                item.startTime = new Date(item.startTime).getFullYear() + '-' + (parseInt(new Date(item.startTime).getMonth()) + 1) + '-'+ this.dateTransform(item.startTime)
                item.endTime = new Date(item.endTime).getFullYear() + '-' + (parseInt(new Date(item.endTime).getMonth()) + 1) + '-' + this.dateTransform(item.endTime)
                // item.status = mapStatus[item.state]
                item.memberType = mapMemberType[item.memberType]
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
    },
    mounted() {
        // console.log(handleFunctionName);
        console.log('sss');
        console.log(globalStore.userInfo);
    }
}
</script>
<style scoped>
    #ButtonT .el-button{
      width:80px;
      border:none;
    }

    #buttonArea {
        display: flex;
        /* margin-bottom: 20px;   */
        width:100%;
    }
    #buttonArea > .padding_change {
        box-sizing: border-box;
        position: relative;
        padding-right: 8px;
    }
    #buttonArea  i {
        position: absolute;
        font-size: 12px;
        left:16px;
        top: 10px;
    }
    .rightfunc {
        flex:1;
        text-align: right;
    }
    .rightfunc .inline-input {
        vertical-align: middle;
    }
    .postionChange{
        padding:9px 9px;
    }
</style>
