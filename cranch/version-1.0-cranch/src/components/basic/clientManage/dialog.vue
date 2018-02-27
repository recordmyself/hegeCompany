<template>
    <div class="dialogArea">
        <el-dialog 
        width="800px" 
        style="text-align:left;margin-top:-10vh;" 
        :title = "store.form.id?'修改信息':'增加公司'"
        :visible.sync="store.dialogFormVisible"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        @open="getCompany_initDate" 
        :show-close="false"  >
            <el-form :rules="store.rules" status-icon class="clearfix" ref="dataForm" :model="store.form" label-width="120px" label-position="right" size="small">
            <el-col :span="12" class="clearfix">
                <!-- <el-form-item label="客户编号：" >
                    <label >{{store.totalRows < 10?'0' + (parseInt(store.totalRows)+1): (parseInt(store.totalRows)+1) }}</label>
                </el-form-item> -->
                <!-- <el-form-item label="所属公司：" prop="affiliatedCompany">
                    <el-input disabled class="right-common" v-model="store.form.affiliatedCompany" placeholder="请选择所属公司"
                        readonly="readonly">
                    </el-input>
                    <el-button size="small"  type="primary" @click="chooseOrg">选择</el-button> -->
                    <!-- <el-select class="right-common"  v-model="store.form.affiliatedCompany" filterable placeholder="请选择">
                        <el-option v-for="item in store.superiorCompanyOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select> -->
                    <!-- <el-input class="right-common" v-model.trim="store.form.affiliatedCompany" placeholder="请输入所属公司"></el-input> -->
                <!-- </el-form-item> -->
                <el-form-item label="公司名称：" prop="name">
                    <el-input class="right-common" v-model.trim="store.form.name" placeholder="请输入公司名称"></el-input>
                    <!-- <el-input clearable  class="right-common" v-if="store.form.affiliatedCompany" v-model.trim="store.form.name" placeholder="请输入公司名称"></el-input> -->
                    <!-- <el-input clearable  class="right-common" v-if="!store.form.affiliatedCompany" v-model.trim="store.form.registerName" placeholder="请输入公司名称"></el-input> -->
                </el-form-item>
                <el-form-item label="社会信用代码：" prop="unifiedCode">
                    <el-input :disabled="store.form.id?true:false"  class="right-common" v-model.trim="store.form.unifiedCode" placeholder="请输入社会信用代码"></el-input>
                </el-form-item>
                <el-form-item label="公司类型：" prop="customerType">
                    <el-select  class="right-common" v-model="store.form.customerType" placeholder="请选择公司类型">
                        <el-option v-for="item in store.customerTypeOptions" :key="item.id" :label="item.label" :value="item.value"></el-option>
                        <!-- <el-option  label="客户" value="0" key="0"></el-option>
                        <el-option  label="工厂" value="1" key="1"></el-option> -->
                    </el-select>
                </el-form-item>
                
                <el-form-item prop="province" label="省市：" required>
                    <el-select class="right-common" @change="getProv($event)"  filterable v-model="store.form.province" placeholder="请选择省市">
                        <el-option
                            v-for="item in store.province_options"
                            :key="item.label"
                            :label="item.label"
                            :value="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="city" label="区域：">
                    <el-select class="right-common" v-model="store.form.city" filterable placeholder="请选择区域">
                        <el-option
                            v-for="item in store.city_options"
                            :key="item.label"
                            :label="item.label"
                            :value="item.label">
                        </el-option>
                    </el-select>  
                </el-form-item>
                <el-form-item label="有效期开始：" size="small" auto-complete="off" required>
                    <date-picker :date="store.form.startDate" :option="store.dateOptions.option" @change="inputValue($event)" :limit="store.dateOptions.limit"></date-picker>
                </el-form-item>
                <el-form-item label="有效期结束：" size="small" auto-complete="off" required>
                    <date-picker :date="store.form.endDate" :option="store.dateOptions.option"   @change="inputValueEnd($event)" :limit="store.dateOptions.limit"></date-picker>
                </el-form-item>
                
            </el-col>
            <el-col :span="12">
                 <el-form-item label="主要负责人：" prop="principalPerson">
                    <el-input class="right-common"  v-model.trim="store.form.principalPerson" placeholder="请输入主要负责人"></el-input>
                </el-form-item>
                <el-form-item label="联系人：" prop="contacts">
                    <el-input class="right-common"  v-model.trim="store.form.contacts" placeholder="请输入联系人"></el-input>
                </el-form-item>
                <el-form-item 
                label="手机号：" 
                prop="phone" 
                :rules="[{ pattern: /^1(3|4|5|7|8)\d{9}$/, message: '手机号格式错误',trigger: 'blur', },{required: true, message:'手机号必填',trigger:'blur'}]">      
                    <el-input class="right-common"  v-model.trim="store.form.phone" placeholder="请输入手机号"  auto-complete="off"></el-input>
                </el-form-item> 
                <el-form-item label="会员类型：" size="small" prop="memberType"  >
                    <el-select class="right-common"  v-model="store.form.memberType" placeholder="请选择会员类型">
                        <el-option v-for="item in store.memberTypeOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注：">
                    <el-input :maxlength="50" class="right-common" type="textarea" v-model.trim="store.form.notes"  :rows="4"></el-input>
                </el-form-item>
            </el-col>
            
            <!-- <el-form-item label="有效期：" prop="times">
                        <el-date-picker
                            style="width:365px;"
                            v-model="store.form.validTime"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            size="small"
                            >   
                        </el-date-picker>
            </el-form-item> -->
            
            </el-form>
            <div class="footer" style="text-align:center">
                <el-button size="small" type="primary" @click="createData" :loading="globalStore.buttonLoading">保存</el-button>
                <el-button size="small" type="primary" @click="cancel('dataForm')" >取消</el-button>
            </div>
        </el-dialog>
        <el-dialog
        title="选择所属公司"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        :visible.sync="dialogChooseOrgVisible"
        width="30%"
         >
            <el-form>
                <div class="clearfix">
                    <div class="tree">
                        <el-tree
                        :data="organizationTree"
                        accordion
                        :props="defaultProps"
                        @node-click="handleNodeClick"
                        ></el-tree>
                    </div>
                </div>
                <el-form-item class="end" size="small">
                    <div  style="text-align:center;">
                        <el-button type="primary" @click="sureOrg">确认</el-button>
                        <el-button @click="cancelChoose">取消选择</el-button>
                        <el-button @click="cancelOrg">取消并关闭</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    //仓储
    import { globalStore } from "../../base/store";
    import { store } from './store'

    //组件
    import cascader from '../../../assets/js/proAndCity'
    import bus from '../../base/bus'
    import myDatepicker from 'vue-datepicker/vue-datepicker-es6.vue'
    
    //协议
    import { doMain } from '../../../protocal/url'
    import { axiosHttpPost, axiosHttpGet } from '../../../assets/js/axios'
    import { CustomerProtocal } from '../../../protocal/base/CustomerProtocal'

    import { resetTemp } from './event.js'

    export default {
        computed: {
            startTime() {
                return store.form.startDate.time
            },
            endTime() {
                return store.form.endDate.time
            },
        },
        watch: {
            startTime(newValue, oldValue) {
                if(newValue && newValue!= undefined) {
                    store.form.startTime = store.form.startDate.time
                }
            },
            endTime(newValue, oldValue) {
                if(newValue && newValue!= undefined) {
                    store.form.endTime = store.form.endDate.time
                }
            },
        },
        components: {
            'date-picker': myDatepicker
        },
        data() {
            return {
                store,
                globalStore: globalStore,
                dialogChooseOrgVisible: false,
                organizationTree: [{
                    id: null,
                    label: '全部公司',
                    children: [],
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                getName: '',
                getId: '',
            }
        },
        methods: {
            createData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        globalStore.buttonLoading = true
                        if(store.form.id) {
                            this.modify();
                        }else {
                            this.create();
                        }
                    }
                })
            },
            //省市联动方法
            getProv(prov) {
                store.city_options = [];
                store.form.city = null;
                for(let val of store.allCity) {
                    if(prov == val.prov) {
                        store.city_options.push({ prov:val.label, label:val.label })
                    }
                }
            },
            cancel(formName) {
                this.$refs[formName].resetFields();
                this.$refs[formName].clearValidate();
                resetTemp()
                store.dialogFormVisible = false;
                globalStore.buttonLoading = false;
            },
            modify() {
                let url = doMain.base + CustomerProtocal.refresh.rest
                let request = CustomerProtocal.refresh.request
                request = store.form
                request.rProvince = request.province
                request.rCity = request.rCity
                if(request.affiliatedCompany) {
                     request.registerName = request.affiliatedCompany
                }
                axiosHttpPost(this, url, request,(res) => {
                    console.log(request);
                    globalStore.buttonLoading = false;
                    store.staff = []
                    if(res.data.status == 'OK') {
                        this.$message({ message:'修改成功', type:'success' })
                        this.$refs['dataForm'].resetFields()
                        this.$refs['dataForm'].clearValidate()
                        store.dialogFormVisible = false
                        this.$emit('tabView')
                    }else{
                        this.$message({ message:res.data.message, type:'error' })
                    }
                })
            },
            create() {
                let _this = this
                let url = doMain.base + CustomerProtocal.create.rest
                let request = CustomerProtocal.create.request
                request = store.form
                request.rProvince = request.province
                request.rCity = request.rCity
                if(request.affiliatedCompany) {
                     request.registerName = request.affiliatedCompany
                }
                request.startTime = new Date(request.startTime).getTime()
                request.endTime = new Date(request.endTime).getTime()
                // request.startTime = request.validTime[0].getTime() 
                // request.endTime = request.validTime[1].getTime()
                // request.sn = store.totalRows < 10?'0' + (parseInt(store.totalRows)+1): (parseInt(store.totalRows)+1) 
                console.log(request);
                axiosHttpPost(this,  doMain.base + CustomerProtocal.create.rest, request,(res) => {
                            globalStore.buttonLoading = false;
                            if(res.data.status == 'OK') {
                                    this.$message({ title: '成功', message: '创建成功', type: 'success', })
                                    this.$refs['dataForm'].resetFields()
                                    store.dialogFormVisible = false
                                    _this.$emit('tabView')
                                }else if(res.data.status == 'FAIL'){
                                    this.$message({ title: '失败', message: res.data.message, type: 'error' })
                                }
                        })
            },
            chooseOrg() {
                this.dialogChooseOrgVisible = true;
            },
            cancelChoose() {
                this.getName = store.form.affiliatedCompany = null;
                this.getId = store.form.parentId = null;
                this.dialogChooseOrgVisible = false;
            },
            handleNodeClick(data) {
                console.log(data);
                if (data == null || data == undefined) {
                     return false;
                }
                
                // if(!data.id) {
                //     return false;
                // }
                this.getId = data.id;
                this.getName = data.label;
                console.log(this.getId);
                console.log(this.getName);
            },
             //            确认部门选择
            sureOrg: function () {
                if (this.getName == '') {
                    this.$alert('请选择公司！', '提示', {
                        confirmButtonText: '确定'
                    });
                }
                this.dialogChooseOrgVisible = false;
                store.form.affiliatedCompany = this.getName;
                store.form.parentId = this.getId;
                this.getName = null;
                this.getId = null;
            },
            //            取消部门选择
            cancelOrg: function () {
                this.dialogChooseOrgVisible = false;
                this.getId = null
                this.getName = null
            },
            inputValue(val) {
                store.dateOptions.limit[0].from = val
                store.dateOptions.limit[0].to = ''
            },
            inputValueEnd (val) {
                // console.log('ss');
                store.dateOptions.limit[0].to = val
                store.dateOptions.limit[0].from = ''
            },
            getCompany_initDate() {
                if(this.$refs['dataForm'] != undefined) {
                    this.$refs['dataForm'].clearValidate(); 
                }
                // this.$refs['dataForm'].clearValidate();
                // let url = doMain.base + CustomerProtocal.listTree.rest
                // let request = CustomerProtocal.listTree.request
                // axiosHttpPost(this, url, request, (res) => {
                //     console.log('树');
                //     console.log(res);
                //     if(res.data.status == 'OK') {
                //         this.organizationTree[0].children = res.data.result;
                //     }else {
                //         this.organizationTree[0].children = []
                //     } 
                // })
                store.dateOptions.limit[0].from = '' //初始化日期限制
                store.dateOptions.limit[0].to = '' 
            }
        },
        created() {
            
        }
    }
</script>
<style scoped>
    .right-common {width:180px;}
</style>
