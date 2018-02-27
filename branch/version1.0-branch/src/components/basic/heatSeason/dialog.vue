<template>
    <div class="dialogArea">
        <el-dialog 
        width="40%"
        style="text-align:left;" 
        :title = "store.form.id?'修改信息':'增加采暖季'" 
        :visible.sync="store.dialogFormVisible"
        :close-on-press-escape="false"
        :close-on-click-modal="false" 
        :show-close="false"   >
            <el-form :rules="store.rules" status-icon class="item-control" ref="dataForm" :model="store.form" label-width="120px" label-position="right" size="small">
                <el-form-item label="名称：" prop="name">
                    <el-input class="right-common" v-model.trim = "store.form.name" placeholder="例:2012-1013"></el-input>
                    {{store.name}}
                </el-form-item>
                <el-form-item label="开始时间：" required>
                    <date-picker :date="store.form.startTime" :option="store.dateOptions.option" @change="inputValue($event)"></date-picker>
                </el-form-item>
                <el-form-item label="结束时间：" required>
                    <date-picker :date="store.form.endTime" :option="store.dateOptions.option" :limit="store.dateOptions.limit"></date-picker>
                </el-form-item >
            </el-form>
            <div class="footer" style="text-align:center;">
                <el-button size="small" type="primary" @click="createData" :loading="globalStore.buttonLoading">保存</el-button>
                <el-button size="small" type="primary" @click="cancel('dataForm')" >取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { store } from './store'
    import { globalStore } from "../../base/store";

    import myDatepicker from 'vue-datepicker/vue-datepicker-es6.vue'
    import bus from '../../base/bus'

    import { urlApiZ } from '../../../service/ip'
    import { heatingSeason } from "../../../service/backstageService";
    import { axiosHttpPost } from '../../../assets/js/axios'

    import { resetTemp } from './event'
    export default {
        components: {
            'date-picker': myDatepicker
        },
        data() {
            return {
                store,
                globalStore: globalStore,
            }
        },
        methods: {
            createData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        globalStore.buttonLoading =  true;
                        if(store.form.id) {
                            console.log('修改');
                            this.modify();
                            // bus.$emit('baseSignal', 'singleModify')
                        }else {
                            console.log('创建');
                            this.create();
                            // bus.$emit('baseSignal', 'createData')
                        }
                    }
                })
            },
            inputValue(val) {
                console.log(store.dateOptions.limit[0].from);
                store.dateOptions.limit[0].from = val
            },
            cancel(formName) {
                store.dialogFormVisible = false;
                this.$refs[formName].clearValidate();
                globalStore.buttonLoading =  false;
                resetTemp()
                
            },
            create() {
                let _this = this
                let request = heatingSeason.create.request
                request = store.form
                request.startDate = new Date(request.startTime.time).getTime()
                request.endDate = new Date(request.endTime.time).getTime()
                console.log(request);
                axiosHttpPost(this, urlApiZ + heatingSeason.create.rest,request, (res) => {
                                globalStore.buttonLoading = false;
                                if(res.data.status == 'OK') {
                                    this.$message({ title: '成功', message: '创建成功', type: 'success', })
                                    this.$refs['dataForm'].resetFields()
                                    store.dialogFormVisible = false
                                    _this.$emit('tabView')
                                }else if(res.data.status == 'FAIL'){
                                    this.$message({ title: '失败', message: '该名称已存在请重新创建', type: 'error' })
                                }                      
                        })
                        // .then((res) => {
                        //         globalStore.buttonLoading = false;
                        //         if(res.data.status == 'OK') {
                        //             this.$message({ title: '成功', message: '创建成功', type: 'success', })
                        //             this.$refs['dataForm'].resetFields()
                        //             store.dialogFormVisible = false
                        //             _this.$emit('tabView')
                        //         }else if(res.data.status == 'FAIL'){
                        //             this.$message({ title: '失败', message: '该名称已存在请重新创建', type: 'error' })
                        //         }                      
                        // })   
                        // .catch(() => {
                        //     globalStore.buttonLoading = false;
                        // })    
            },
            modify() {
                let _this = this
                let request = heatingSeason.refresh.request
                request = store.form
                request.startDate = new Date(request.startTime.time).getTime()
                request.endDate = new Date(request.endTime.time).getTime()
                console.log(request);
                axiosHttpPost(this, urlApiZ + heatingSeason.refresh.rest,request, (res) => {
                            console.log(request);
                            globalStore.buttonLoading = false;
                            if(res.data.status == 'OK') {
                                _this.$message({ message:'修改成功', type:'success' })
                                this.$refs['dataForm'].resetFields()
                                store.dialogFormVisible = false
                                _this.$emit('tabView')
                            }else{
                                _this.$message({ message:'修改失败', type:'error' })
                            }
                    })
                    // .then((res) => {
                    //         console.log(request);
                    //         globalStore.buttonLoading = false;
                    //         if(res.data.status == 'OK') {
                    //             _this.$message({ message:'修改成功', type:'success' })
                    //             this.$refs['dataForm'].resetFields()
                    //             store.dialogFormVisible = false
                    //             _this.$emit('tabView')
                    //         }else{
                    //             _this.$message({ message:'修改失败', type:'error' })
                    //         }
                    // })
                    // .catch(() => {
                    //     globalStore.buttonLoading = false;
                    // })
            }
        },
        created() {
        }
    }
</script>
<style scoped>
    .right-common {width:180px;}
</style>

