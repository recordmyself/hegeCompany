<template>
    <div class="dialogArea">
        <el-dialog 
        width="800px"
        :title = "store.form.id?'修改信息':'增加烟囱'" 
        :visible.sync="store.dialogFormVisible"
        :close-on-press-escape="false"
        :close-on-click-modal="false" 
        :show-close="false"
        @open="getCompanyOptions"
        style="text-align:left;">
            <el-form size="small" status-icon :model="store.form" :rules="store.rules" ref="dataForm" label-width="140px" label-position="right" class="clearfix">
                <el-col :span="12">
                    <el-form-item label="烟囱点编号："  prop="gasSn">
                        <el-input  :disabled="store.form.id?true:false" class="item-control" v-model.trim="store.form.gasSn" placeholder="请输入烟囱编号"></el-input>
                    </el-form-item>
                    <el-form-item label="烟囱名称："  prop="name">
                        <el-input  class="item-control" v-model.trim="store.form.name" placeholder="请输入烟囱名称"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人："  prop="head">
                        <el-input  class="item-control" v-model.trim="store.form.head" placeholder="请输入负责人"></el-input>
                    </el-form-item>
                    <el-form-item 
                   label="电话：" 
                   prop="phone"
                   :rules="[
                        { pattern: /^((0\d{2,3}-\d{7,8})|(1[35847]\d{9}))$/, message:'电话格式不正确', trigger:'blur'},
                        { required: true, message: '联系电话不能为空', trigger: 'blur'}
                    ]">
                       <el-input class="item-control" v-model.trim="store.form.phone" placeholder="请输入电话"></el-input>
                   </el-form-item>
                   <el-form-item label="安装公司：" prop="installationUnit">
                       <el-input class="item-control" v-model.trim="store.form.installationUnit" placeholder="请输入安装公司"></el-input>
                   </el-form-item>
                </el-col>
                    
                <!-- <el-col :span="1"><div>&nbsp;</div></el-col> -->
                <el-col :span="12">
                   
                   <el-form-item label="使用登记证编号：" prop="userSn">
                       <el-input class="item-control" v-model.trim="store.form.userSn" placeholder="请输入使用登记证编号"></el-input>
                   </el-form-item>
                   <!-- <el-form-item label="单位名称：" prop="company">
                       <el-select class="inline-input  item-control" @change="handleSelectCompany"  v-model="store.form.company" filterable placeholder="请选择">
                           <el-option v-for="item in store.company" :label="item.label" :key="item.label" :value="item.label"></el-option>
                       </el-select>
                   </el-form-item> -->
                   <el-form-item label="所属机构：" prop="company" size="small" style="position:relative">
                            <el-input disabled class="inline-input  item-control" v-model="store.form.company" placeholder="请选择所属机构"
                                readonly="readonly">
                            </el-input>
                            <el-button size="small"  type="primary" @click="chooseOrg">选择</el-button>
                </el-form-item>
                   <el-form-item label="所属锅炉房：" prop="houseName">
                       <el-select class="inline-input  item-control"  v-model="store.form.houseName" filterable placeholder="请选择">
                           <el-option v-for="item in store.heatOrigin"  :label="item.label" :key="item.label" :value="item.label"></el-option>
                       </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="经度：" prop="longitude">
                        <el-input  class="item-control" v-model.trim="store.form.longitude" :disabled="store.banInput"  placeholder="请输入经度"></el-input>
                    </el-form-item>
                   <el-form-item label="纬度：" prop="latitude">
                       <el-input class="item-control" v-model.trim="store.form.latitude"  :disabled="store.banInput" placeholder="请输入纬度"></el-input>
                   </el-form-item> -->
                   <el-form-item label="操作员：" prop="operator">
                       <el-input class="item-control" disabled v-model.trim="store.form.operator" ></el-input>
                   </el-form-item>
                </el-col>
                <!-- <el-col :span="1"><div>&nbsp;</div></el-col> -->
                <!-- <el-col :span="7">
                    
                   
                </el-col> -->
            </el-form>
            <div style="width:100%; text-align:center;overflow:hidden;">
                <el-button size="small" type="primary"  :loading="globalStore.buttonLoading" @click="createData">保 存</el-button>
                <el-button size="small" style="margin-right:8px;"  @click="cancel('dataForm')" >取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog 
        title="选择机构" 
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
    import { globalStore } from "../../base/store";

    import bus from '../../base/bus'

    // import { doMain.base } from '../../../service/ip'
    import { doMain } from '../../../protocal/url'
    //引入协议
    import { BoilerhouseProtocal } from "../../../protocal/base/BoilerHouseProtocal"
    import { PositionProtocal } from "../../../protocal/base/PositionProtocal"
    import { ChimneyProtocal } from "../../../protocal/base/ChimneyProtocal"
    import { OrganizationProtocal } from "../../../protocal/base/OrganizationProtocal"
    import { cookie } from '../../../assets/js/cookie'
    import { axiosHttpPost } from '../../../assets/js/axios'

    import { resetTemp } from './event'
    export default {
        computed: {
            company() { 
                return store.form.company
            },
        },
        watch: {
            company(newValue, oldValue) {
                
                // if(oldValue) {
                //     console.log('进来了');
                //     this.getHeatOrigin(newValue)
                //     // this.handleSelectCompany(newValue)
                //     // store.form.houseName = 
                // }
                // console.log(oldValue);   
            }
        },
        data() {
            return {
                store,
                globalStore,
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
                getLevel: null
            }
        },
        methods: {
            createData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        globalStore.buttonLoading = true;
                        if(store.form.id) {
                            // bus.$emit('baseSignal', 'singleModify')
                            console.log('修改');
                             this.modify();
                        }else {
                            console.log('创建');
                             this.create();
                            // bus.$emit('baseSignal', 'createData')
                        }
                    }
                })
            },
            getCompanyOptions() {
                // store.company = []
                this.organizationTree[0].children = []
                axiosHttpPost(this, doMain.base + PositionProtocal.listPosition.rest,PositionProtocal.listPosition.request, (res) => {
                    // let result = res.data.result
                    this.organizationTree[0].children.push(res.data.result)
                    // console.log('list');
                    // console.log(res);
                    // result.forEach((item) => {
                    //     store.company.push({ label: item.label, children: item.children })
                    // })
                    // console.log(store.listPosition);
                })
                //获取操作员的名称也就是当前账户的名称
                // let user = JSON.parse(cookie.getCookie('user'));
                console.log(globalStore.userInfo);
                store.form.operator = globalStore.userInfo.name

                if(store.form.company) {
                   this.getHeatOrigin(store.form.company) 
                }
            },
            getHeatOrigin(val) {
                // console.log(val);
                store.heatOrigin = [];
                // store.company.forEach((item) => {
                //     if(val == item.label) {
                //         console.log(item.children);
                //         item.children.forEach((item) => {
                //             store.heatOrigin.push({ label: item.label })
                //         })
                //     }
                // })
                let url = doMain.base + ChimneyProtocal.listboilerhouse.rest
                let request = ChimneyProtocal.listboilerhouse.request
                request.company = val
                axiosHttpPost(this, url, request, (res) => {
                    console.log(res);
                    let result = res.data.result
                
                    if(result.length == 0 && store.form.houseName) {
                        store.heatOrigin.push({ label: store.form.houseName })
                    }else {
                        result.forEach((item) => {
                            store.heatOrigin.push({ label:item })    
                        })
                        if(store.form.houseName) {
                            store.heatOrigin.push({ label:store.form.houseName })
                        }
                    }
                    
                    
                })
            },
            // handleSelectCompany(val) {
                
            //     store.form.houseName = null
            //     this.getHeatOrigin(val)
            //     // // store.form.longitude = null,
            //     // // store.form.latitude = null
            //     // let url = doMain.base + PositionProtocal.list.rest
            //     // let request = PositionProtocal.list.request
            //     // request.company = val
            //     // axiosHttpPost(this, url, request, (res) => {
            //     //     console.log('搜搜锅炉房');
            //     //     console.log(res);
            //     //     let result = res.data.result
            //     //     for(let i = 0; i< result.length; i++) {
            //     //         let item = result[0];
            //     //         if(item.tag == val) {
            //     //             res.data.result.splice(i,1);
            //     //             i--;
            //     //         }
            //     //     }
            //     //     store.heatOrigin = [];
            //     //     result.forEach((item) => {
            //     //         store.heatOrigin.push({ label: item.tag, longitude: item.longitude, latitude: item.latitude })
            //     //     })
                    
            //     //     // store.heatOrigin = item.children
            //     // })
                
            //     // store.heatOrigin = [];
            //     // store.company.forEach((item) => {
            //     //     if(val == item.label) {
            //     //         console.log(item.children);
            //     //         item.children.forEach((item) => {
            //     //             store.heatOrigin.push({ label: item.label })
            //     //         })
            //     //     }
            //     // })
            // },
            cancel(formName) {
                store.dialogFormVisible = false;
                // this.$refs[formName].clearValidate();
                this.$refs[formName].resetFields();
                resetTemp()
                globalStore.buttonLoading = false;
            },
            modify() {
                let url = doMain.base + ChimneyProtocal.refresh.rest
                let request = ChimneyProtocal.refresh.request
                request = JSON.parse(JSON.stringify(store.form))
                if(store.initGasSn == request.gasSn) {
                    request.gasSn = null
                }
                // request = store.form
                console.log(request);
                axiosHttpPost(this, url, request, (res) => {
                    globalStore.buttonLoading = false;
                            console.log('修改结果');
                            console.log(res);
                            if(res.data.status == 'OK') {
                                    this.$message({ title: '成功', message: '创建成功', type: 'success', })
                                    store.dialogFormVisible = false
                                    // this.$refs['dataForm'].clearValidate()
                                    this.$refs['dataForm'].resetFields()
                                    resetTemp()
                                    this.$emit('tabView')
                                }else if(res.data.status == 'FAIL'){
                                    this.$message({ title: '失败', message: res.data.message, type: 'error' })
                                }else {
                                    this.$message({ message:'数据错误', type:'error' })
                                }
                })
            },
            create() {
                // let _this = this
                let request = ChimneyProtocal.create.request
                request = store.form
                // request.startTime = request.validTime[0].getTime() 
                // request.endTime = request.validTime[1].getTime()
                console.log(request);
                axiosHttpPost(this, doMain.base + ChimneyProtocal.create.rest, request,(res) => {
                            globalStore.buttonLoading = false;
                            console.log('创建结果');
                            console.log(res);
                            if(res.data.status == 'OK') {
                                    this.$message({ title: '成功', message: '创建成功', type: 'success', })
                                    store.dialogFormVisible = false
                                    // this.$refs['dataForm'].clearValidate()
                                    this.$refs['dataForm'].resetFields()
                                    resetTemp()
                                    this.$emit('tabView')
                                }else if(res.data.status == 'FAIL'){
                                    // this.$message({ title: '失败', message: '烟囱已存在请重新创建', type: 'error' })
                                    this.$message({ title: '失败', message: res.data.message, type: 'error' })
                                }else {
                                    this.$message({ message:'数据错误', type:'error' })
                                }
                        })
            },
            chooseOrg() {
                this.dialogChooseOrgVisible = true;
            },
            handleNodeClick(data, node) {
                console.log(data);
                if (data == null || data == undefined) {
                     return false;
                }
                // if(data.label !== globalStore.userInfo.orgName && node.level == 2 || node.level == 1) {
                //     return false;
                // }
                this.getName = data.label;
                this.getLevel = node.level
                // console.log(this.getName);
            },
             //            确认部门选择
            sureOrg: function () {
                if (this.getName == '') {
                    this.$alert('请选择公司！', '提示', {
                        confirmButtonText: '确定'
                    });
                }
                if (this.getLevel == 1) {
                    this.$alert('不能选择全部机构', '提示', { type: 'warning',sconfirmButtonText: '确定' })
                    return false;
                }
                if (globalStore.userInfo.companyId != 0 && globalStore.userInfo.orgName != this.getName && this.getLevel == 2) {
                    this.$alert('不能选择上级机构', '提示', { type: 'warning',sconfirmButtonText: '确定' })
                    return false;
                }
                this.dialogChooseOrgVisible = false;
                store.form.company = this.getName;
                this.getHeatOrigin(store.form.company)
                this.getName = null;
            },
            //            取消部门选择
            cancelOrg: function () {
                this.dialogChooseOrgVisible = false;
                this.getName = null
            },
            cancelChoose() {
                this.getName = store.form.company = null;
                this.dialogChooseOrgVisible = false;
            }

        },
        created() {
        //    this.getCompanyOptions();
        }
    }
</script>
<style scoped>
    .item-control { width: 180px; }
    .tree { height: 200px; overflow: auto; /* border:1px solid #ccc; */ }
</style>
