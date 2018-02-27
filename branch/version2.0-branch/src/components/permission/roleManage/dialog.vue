<template>
    <div class="dialogArea">
        <el-dialog
            :title = "store.form.id?'修改信息':'角色新增'"
            style="text-align:left"
            :close-on-press-escape="false"
            :close-on-click-modal="false" 
            :show-close="false" 
            :visible.sync="store.dialogFormVisible"
            width="30%">
            <el-form status-icon :model="store.form" ref="dataForm" label-width="120px" label-position="right" :rules="store.rules">
                <el-form-item label="角色名称："  prop="name">    
                    <el-input class="item-control" size="small" :disabled="store.form.name=='超级管理员' && store.form.id" v-model.trim="store.form.name" placeholder="请输入角色名称"></el-input>
                </el-form-item>    
                <el-form-item label="角色说明：" prop="descr">    
                    <el-input class="item-control" size="small" v-model.trim="store.form.descr" placeholder="请输入角色说明"></el-input>
                </el-form-item> 
                <el-form-item label="角色备注：" prop="note">    
                    <el-input class="item-control" size="small" v-model.trim="store.form.note" placeholder="请输入角色备注"></el-input>
                </el-form-item> 
            </el-form>
            <div style="text-align:center;" >
                <el-button size="small" :loading="globalStore.buttonLoading"  type="primary" @click="createData">确 定</el-button>
                <el-button size="small"  @click="cancel('dataForm')">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { store } from './store'
    import bus from '../../base/bus'
    // 引入协议
    // import { doMain } from '../../../service/ip'
    import { doMain } from '../../../protocal/url'
    // import { role } from "../../../service/backstageService";
    import { RoleProtocal } from "../../../protocal/base/RoleProtocal"
    import { globalStore } from "../../base/store";
    import { axiosHttpPost } from '../../../assets/js/axios'
    export default {
        data() {
            return {
                store,
                globalStore
            }
        },
        methods: {
            createData() {
                this.$refs['dataForm'].validate((valid) => {
                    if(valid) {
                        globalStore.buttonLoading = true;
                        if(store.form.id) {
                            console.log('修改');
                            this.modify()
                        }else {
                            console.log('创建');
                            this.create()
                        }
                    }
                }) 
            },
            cancel(formName) {
                store.dialogFormVisible = false;
                this.$refs[formName].clearValidate();
                this.$refs[formName].resetFields();
                store.form = {
                    id: null,
                    name: null,
                    descr: null,
                    notes: null
                }
            },
            create() {
                let _this = this
                RoleProtocal.create.request = store.form
                axiosHttpPost(this,doMain.base + RoleProtocal.create.rest, RoleProtocal.create.request,(res) => {
                                globalStore.buttonLoading = false;
                                console.log(res);
                                if(res.data.status == 'OK') {
                                    this.$message({ message: '创建成功', type: 'success' })
                                    this.$refs['dataForm'].resetFields()
                                    store.dialogFormVisible = false
                                    _this.$emit('tabView')
                                }else {
                                    this.$message({ message: res.data.message, type: 'error' })
                                }
                            })
            },
            modify() {
                let _this = this
                RoleProtocal.refresh.request= store.form
                axiosHttpPost(this,doMain.base + RoleProtocal.refresh.rest,RoleProtocal.refresh.request,(res) => {
                            globalStore.buttonLoading = false;
                            if(res.data.status == 'OK') {
                                this.$message({ message: '修改成功', type: 'success' })
                                 this.$refs['dataForm'].resetFields()
                                 store.dialogFormVisible = false
                                _this.$emit('tabView')
                            }else {
                                this.$message({ message: res.data.message, type: 'error' })
                            }
                        })
            },
        },
        mounted() {
            // let that = this;
            // bus.$on('clearSignal',(res) => {
            //     if(res == 'yes') {
            //         that.$refs.dataForm.clearValidate()
            //     }
            // })
        }
    }
</script>
<style scoped>
    .item-control {
        width: 180px;
    }
</style>
