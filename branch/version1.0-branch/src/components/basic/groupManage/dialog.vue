<template>
    <div class="dialogArea">
        <el-dialog
        class="forClearFix"
        width="600px"
        style="text-align:left;"
        :title = "store.form.id?'修改信息':'增加组织机构'"
        :visible.sync="store.dialogFormVisible"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        @open="getOrganization"
        :show-close="false" >
                <el-form
                :rules="store.rules"
                status-icon
                ref="dataForm"
                :model="store.form"
                label-width="120px"
                label-position="right"
                size="small">
                    <el-form-item label="组织机构名称：" prop="name">
                        <el-input clearabale  class="right-common" v-model.trim="store.form.name" placeholder="请输入组织机构名称"></el-input>
                    </el-form-item>
                    <el-form-item label="组织机构简称：" prop="abbreviation">
                        <el-input clearabale class="right-common" v-model.trim="store.form.abbreviation" placeholder="请输入组织机构名称"></el-input>
                    </el-form-item>
                    <el-form-item label="组织机构类型：" prop="type">
                            <el-select clearabale class="right-common" v-model="store.form.type" placeholder="请选择">
                            <el-option  v-for="item in store.regionOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="社会信用代码：" prop="creditSn" v-if="store.form.type==1">
                        <el-input :maxlength="18" clearabale :disabled="store.form.id?true:false"   class="right-common" v-model.trim="store.form.creditSn" placeholder="请输入社会信用代码"></el-input>
                    </el-form-item>
                <el-form-item label="上级组织机构：" prop="superOrganization" size="small" style="position:relative">
                    <el-input disabled class="right-common" v-model="store.form.superOrganization" placeholder="请选择上级组织机构"
                        readonly="readonly">
                    </el-input>
                    <el-button size="small"  type="primary" @click="chooseOrg">选择</el-button>
                </el-form-item>
                <el-form-item label="主要负责人：" prop="head">
                    <el-input clearabale class="right-common" v-model.trim="store.form.head" placeholder="请输入负责人姓名"></el-input>
                </el-form-item>
                <el-form-item label="会员类型：" prop="memberType">
                        <el-select :disabled="true" class="right-common"  v-model="store.form.memberType" placeholder="请选择会员类型">
                            <el-option v-for="item in store.memberTypeOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                        <!-- <el-input clearabale class="right-common" v-model.trim="store.form.memberType"></el-input> -->
                </el-form-item>
                
                <el-form-item v-if="store.form.type == 1"  prop="city" label="省市：">
                    <el-select clearabale  :disabled="store.form.type == 2" class="right-common" @change="getProv($event)"  filterable v-model="store.form.city" placeholder="请选择省市">
                        <el-option
                            v-for="item in store.province_options"
                            :key="item.label"
                            :label="item.label"
                            :value="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="store.form.type == 1" prop="area" label="区域：">
                    <el-select clearabale  :disabled="store.form.type == 2" class="right-common" v-model="store.form.area" filterable placeholder="请选择区域">
                        <el-option
                            v-for="item in store.city_options"
                            :key="item.label"
                            :label="item.label"
                            :value="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注：">
                        <el-input clearabale :maxlength="50" type="textarea" v-model.trim="store.form.notes" class="right-common" :rows="4"></el-input>
                </el-form-item>
                </el-form>

            <div class="footer" style="text-align:center">
                <el-button size="small" type="primary" @click="saveData" :loading="globalStore.buttonLoading">保存</el-button>
                <el-button size="small" type="primary" @click="cancel('dataForm')">取消</el-button>
            </div>
        </el-dialog>
        <!--选择部门-->
        <el-dialog
        title="选择组织"
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
    import { store } from './store'
    import bus from '../../base/bus'
    import cascader from '../../../assets/js/proAndCity'
    import { globalStore } from "../../base/store";
    // import { doMain.base } from '../../../service/ip'
    import { doMain } from '../../../protocal/url'
    // import { organization } from "../../../service/backstageService";
    import { OrganizationProtocal } from '../../../protocal/base/OrganizationProtocal'
    import { PositionProtocal } from "../../../protocal/base/PositionProtocal"
    // import Group from '../../base/organization'
    import { axiosHttpPost } from '../../../assets/js/axios'
    import { resetTemp } from './event'
    export default {
        // components: {
        //     Group
        // },
        computed: {
            organizationType() {
                return store.form.type
            },
            // superOrganization() {
            //     return globalStore.saveOrganization.organization
            // },
            // tabView() {
            //     return store.tableData
            // }
        },
        watch: {
            organizationType(newValue, oldValue) {
                this.$refs['dataForm'].clearValidate();
                if(newValue == 2 && store.form.parentId != 1) {
                    this.store.rules.superOrganization.push({ required: true, message: '请选择', trigger:'change, blur' })
                    this.store.rules.city.splice(0,1)
                    this.store.rules.area.splice(0,1)
                    this.store.banInput = true
                }else if(newValue == 1) {
                    this.store.rules.superOrganization.splice(0,1)
                    this.store.rules.city.push({ required: true, message: '请选择', trigger:'change, blur' })
                    this.store.rules.area.push({ required: true, message: '请选择', trigger:'change, blur' })
                    this.store.banInput = false
                }
            },
            // superOrganization(newValue, oldValue) {
            //     console.log(store.form.type);
            //     if(globalStore.saveOrganization.parentId != 0 || !store.form.type ) {
            //         return false;
            //     }
            //     console.log(newValue);
            //     store.form.superOrganization = newValue
            // }
        },
        data() {
            return {
                store,
                globalStore,
                dialogChooseOrgVisible: false,
                organizationTree: [{
                    id: null,
                    label: '全部组织机构',
                    children: [],
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                getName: '',
                getId: '',
                getLevel: null
            }
        },
        methods: {
            orgSelect(val) {

            },
            saveData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        globalStore.buttonLoading = true
                        if(store.form.id) {
                            console.log('修改');
                            this.modify()
                            // bus.$emit('baseSignal', 'singleModify')
                        }else {
                            console.log('创建');
                            this.create()
                            // bus.$emit('baseSignal', 'createData')
                        }
                    }
                })
            },
            getProv(prov) {
                store.city_options = [];
                store.form.area = null;
                for(let val of store.allCity) {
                    if(prov == val.prov) {
                        store.city_options.push({ prov:val.label, label:val.label })
                    }
                }
            },
            getOrganization() {
                this.organizationTree[0].children = [];
                if(this.$refs['dataForm'] != undefined) {
                    console.log('进来了');
                    this.$refs['dataForm'].clearValidate();
                }
                if(globalStore.userInfo.companyId == 0) {
                    let url = doMain.base + OrganizationProtocal.listTree.rest
                    let request = OrganizationProtocal.listTree.request
                    axiosHttpPost(this, url, request, (res) => {
                        console.log('organization1');
                        console.log(res);
                            if(res.data.result.length == 0) {
                                this.organizationTree[0].children = []
                            }else {
                                this.organizationTree[0].children = res.data.result
                            }
                    })
                }else {
                    let url = doMain.base + PositionProtocal.listPosition.rest
                    let request = PositionProtocal.listPosition.request
                    // console.log(object);
                    axiosHttpPost(this, url, request, (res) => {
                        console.log('position1');
                        console.log(res);
                        // console.log(res.data);
                        if(JSON.stringify(res.data.result).length != 0 && res.data.result.label) {
                            this.organizationTree[0].children.push(res.data.result)
                        }else {
                            this.organizationTree[0].children = [];
                        }
                        
                        // console.log(this.organizationTree[0].children);
                    })
                }
                // let url = doMain.base + PositionProtocal.listPosition.rest
                // let request = PositionProtocal.listPosition.request
                // // console.log(object);
                // this.organizationTree[0].children = []
                // axiosHttpPost(this, url, request, (res) => {
                //     console.log('position');
                //     console.log(res);
                //     if(JSON.stringify(res.data.result).length != 0 && res.data.result.label) {
                //         this.organizationTree[0].children.push(res.data.result)
                //     }else {
                //         this.organizationTree[0].children = [];
                //     }
                    
                //     // console.log(this.organizationTree[0].children);
                // })
                store.form.memberType = 1;
            },
            cancel(formName) {
                store.dialogFormVisible = false;
                globalStore.buttonLoading = false
                this.$refs[formName].clearValidate();
                this.$refs[formName].resetFields();
                resetTemp()
            },

            create() {
                let _this = this
                let request = OrganizationProtocal.create.request
                request = store.form
                // console.log('创建了一次');
                // request.sn = store.totalRows < 10?'0' + (parseInt(store.totalRows)+1):(parseInt(store.totalRows)+1)
                console.log(request);
                axiosHttpPost(this, doMain.base + OrganizationProtocal.create.rest, request, (res) => {
                            console.log('创建结果');
                            console.log(res);
                            globalStore.buttonLoading = false;
                                if(res.data.status == 'OK') {
                                    this.$message({ title: '成功', message: '创建成功', type: 'success', })
                                    this.$refs['dataForm'].resetFields()
                                    store.dialogFormVisible = false
                                    _this.$emit('tabView')
                                }else if(res.data.status == 'FAIL'){
                                    this.$message({ title: '失败', message: res.data.message, type: 'error' })
                                }else {
                                    this.$message({ message:'数据错误', type:'error' })
                                }
                        })
            },
            modify() {
                let _this = this
                let request = OrganizationProtocal.refresh.request
                // request = store.form
                request = JSON.parse(JSON.stringify(store.form))
                if(request.creditSn == store.initCreditSn) {
                    request.creditSn = null
                }
                console.log(request);
                axiosHttpPost(this,doMain.base + OrganizationProtocal.refresh.rest,request,(res) => {
                            globalStore.buttonLoading = false;
                            console.log('修改结果');
                            console.log(res);
                            if(res.data.status == 'OK') {
                                this.$message({ message:'修改成功', type:'success' })
                                this.$refs['dataForm'].resetFields()
                                store.dialogFormVisible = false
                                _this.$emit('tabView')
                            }else if(res.data.status == 'FAIL') {
                                this.$message({ message:res.data.message, type:'error' })
                            }else {
                                this.$message({ message:'数据错误', type:'error' })
                            }
                        })
            },
            chooseOrg() {
                this.dialogChooseOrgVisible = true;
            },
            cancelChoose() {
                this.getName = store.form.superOrganization = null;
                this.getId = store.form.parentId = null;
                this.dialogChooseOrgVisible = false;
            },
            handleNodeClick(data, node) {
                console.log(data);
                if (data == null || data == undefined ) {
                     return false;
                }
                // if (globalStore.userInfo.orgName != data.label && node.level == 2) {
                //     this.$alert('没有权限选择您的上级机构', '提示', { type: 'warning', confirmButtonText: '确定' })
                //     return false;
                // }
                // if()
                // if( data.lev)
                // if(!data.id) {
                //     return false;
                // }
                this.getId = data.id;
                this.getName = data.label;
                this.getLevel = node.level
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
                if (globalStore.userInfo.companyId != 0 && globalStore.userInfo.orgName != this.getName && this.getLevel == 2) {
                    this.$alert('没有权限选择您的上级组织机构', '提示', { type: 'warning',sconfirmButtonText: '确定' })
                    return false;
                }
                // console.log(globalStore.userInfo);
                if(globalStore.userInfo.companyId != 0 && this.getName == '全部组织机构') {
                    this.$alert('没有权限选择全部组织机构', '提示',  { type: 'warning',sconfirmButtonText: '确定' })
                    return false;
                }  
                //关闭表单
                this.dialogChooseOrgVisible = false;
                store.form.superOrganization = this.getName;
                if(globalStore.userInfo.companyId == 0) {
                    //如果为0 则组织树用的organziaitonTree 其中id是companyId 直接赋值
                    store.form.parentId = this.getId
                    this.getName = null;
                    this.getId = null;
                    this.getLevel = null  
                }else {
                    //如果不为0, 则组织树用的有权限的positionTree 其中id为positionId 使用id去查companyId
                    let url = doMain.base + PositionProtocal.get.rest
                    let request = PositionProtocal.get.request
                    request.id = this.getId
                    axiosHttpPost(this, url, request, (res) => {
                        console.log(request);
                        console.log('get方法');
                        console.log(res);
                        if(res.data.status == 'OK') {
                            //赋值companyId
                            store.form.parentId = res.data.result.companyId    
                        }
                        this.getName = null;
                        this.getId = null;
                        this.getLevel = null
                    })
                }
                // store.form.parentId = this.getId;
                // this.getName = null;
                // this.getId = null;
            },
            //            取消部门选择
            cancelOrg: function () {
                this.dialogChooseOrgVisible = false;
                this.getId = null
                this.getName = null
            }
        },
        created() {
            console.log(globalStore.userInfo);
        }
    }
</script>
<style scoped>
    /* .forClearFix .el-dialog__body::before,
    .forClearFix .el-dialog__body::after{ content: ''; display: block; height: 0; visibility: hidden; clear: both; } */
    .item-control {text-align: left;}
    .operate {display:flex;flex-wrap: nowrap;justify-content: center;}
    .operate > button{width: 22px;height: 22px;padding: 1px 2px;border: none;}
    .operate > button:nth-of-type(1) {background: #23c6c8;}
    .operate > button:nth-of-type(2) {background: #ed5565; }
    .operate i {font-size: 14px;color: #fff;}
    .cell>span {font-size:14px;}
    .right-common{width:180px;}
    /* .grouptree{ padding:10px;border: 1px solid #ccc; height: 100%;border-radius: 2px;width:250px;}
    .tree{
        margin-bottom: 20px;
    } */
</style>
