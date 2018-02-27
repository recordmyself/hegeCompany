<template>
    <div class="dialogArea">
        <el-dialog
        width="900px"
        :title = "store.form.id?'修改信息':'新增用户'"
        @open="getOrganization"
        :visible.sync="store.dialogFormVisible"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        :show-close="false"
        style="text-align:left;">
            <el-form status-icon :model="store.form" :rules="store.rules" ref="dataForm" label-width="120px" label-position="right" class="clearfix" >
                <el-col :span="12" class="clearfix">
                    <el-form-item label="中文名称：" size="small"  prop="userName">
                        <el-input  class="item-control" v-model.trim="store.form.userName" placeholder="请输入用户中文名称"></el-input>
                    </el-form-item>
                    <el-form-item label="登录账号：" size="small"  prop="account">
                        <el-input  :disabled="store.form.id?true:false" class="item-control" v-model.trim="store.form.account" placeholder="请输入用户账号"></el-input>
                    </el-form-item>
                    <el-form-item v-if="!store.form.id" label="登录密码：" size="small"  prop="password" auto-complete="off" >
                        <el-input  class="item-control" type="password" v-model.trim="store.form.password" placeholder="请输入用户密码"></el-input>
                    </el-form-item>
                    <el-form-item v-if="!store.form.id" label="确认密码：" size="small"  prop="checkPassword" auto-complete="off" >
                        <el-input  class="item-control" type="password" v-model.trim="store.form.checkPassword" placeholder="请输入用户密码"></el-input>
                    </el-form-item>
                    <el-form-item label="有效期开始：" size="small" auto-complete="off" required>
                        <!-- <el-input  class="item-control" type="password" v-model.trim="store.form.password" placeholder="开始时间"></el-input> -->
                        <date-picker :date="store.form.startDate" :option="store.dateOptions.option"  @change="inputValue($event)" :limit="store.dateOptions.limit"></date-picker>
                    </el-form-item>
                    <el-form-item label="有效期结束：" size="small" auto-complete="off" required>
                        <date-picker :date="store.form.endDate" :option="store.dateOptions.option"  @change="inputValueEnd($event)" :limit="store.dateOptions.limit"></date-picker>
                    </el-form-item>
                    <!-- </el-form-item> -->
                    <el-form-item label="所属机构：" size="small"   auto-complete="off" prop="orgName">
                        <!-- <el-cascader
                            class="item-control"
                            :options="store.orgOptions"
                            change-on-select
                            @change="orgSelect"
                            v-model="store.saveOrgidArr"
                        ></el-cascader> -->
                        <el-input style="vertical-align:middle;" class="item-control"  disabled v-model="store.form.orgName" placeholder="请选择所属机构"
                                readonly="readonly">
                        </el-input>
                            <el-button style="vertical-align:middle;" size="small" type="primary" plain @click="chooseOrg">选择</el-button>
                    </el-form-item>
                    <el-form-item label="会员类型：" size="small" prop="memberType"  >
                        <el-select class="item-control"  v-model="store.form.memberType" :disabled="true" placeholder="请选择">
                             <el-option v-for="item in store.memberTypeOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                    label="联系电话："
                    size="small"
                    prop="mobile"
                    :rules="[
                        { pattern: /^((0\d{2,3}-\d{7,8})|(1[35847]\d{9}))$/, message:'电话格式不正确', trigger:'blur'},
                        { required: true, message: '联系电话不能为空', trigger: 'blur'}
                    ]">
                        <el-input class="item-control"  v-model.trim.number="store.form.mobile" placeholder="请输入用户联系电话"></el-input >
                    </el-form-item>       
                      <el-form-item label="用户角色： " size="small" prop="roleIdList"  >
                        <!-- <el-select class="item-control"  v-model="store.form.roleName" placeholder="请选择">
                             <el-option v-for="item in store.roleNameOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                         -->
                         <el-select class="item-control"  multiple v-model="store.roleIdArr" @change="roleChange" collapse-tags placeholder="请选择">
                            <el-option v-for="item in store.roleNameOptions" :label="item.label" :value="item.id" :key="item.id"></el-option>
                         </el-select>
                    </el-form-item>
                    <el-form-item label="电子邮箱：" size="small" prop="email">
                        <el-input :disabled="banWhileSend" style="vertical-align:middle;"@change="inputChange" class="item-control email-change" v-model.trim="store.form.email" placeholder="请输入用户电子邮箱"></el-input>
                        <el-button style="width:92px;vertical-align:middle;" type="primary" plain v-if="showBtn" :disabled="banSendAagin" @click="sendIdetifyCode" >{{ buttonText }}</el-button>
                    </el-form-item>
                    <el-form-item v-if="showBtn" label="验证码：" size="small" prop="code">
                        <el-input  class="item-control" v-model.trim="store.form.code" placeholder="请输入验证码"></el-input>
                    </el-form-item>
                    <el-form-item label="员工列表：" size="small"   auto-complete="off" >
                        <div   class="item-control control-loading" style="height:150px; overflow:auto;border:1px solid #d8dce5;border-radius:4px;">
                            <el-tree :data="store.staff" v-loading="store.treeLoading" :style="store.treeLoading?'height:200px;':''"></el-tree>
                            <!-- <Group  ref="updateOrg"/> -->
                        </div>
                    </el-form-item>


                </el-col>
            </el-form>

            <div class="footer"  style="text-align:center" >
                <el-button size="small" type="primary" :loading="globalStore.buttonLoading" @click="createData">保 存</el-button>
                <el-button size="small"  @click="cancel('dataForm')">取 消</el-button>
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
    import { globalStore } from "../../base/store";
    import { store } from './store'
    import bus from '../../base/bus'
    // 引入协议
    // import { doMain.base } from '../../../service/ip'
    import { doMain } from "../../../protocal/url"
    import { UserProtocal } from "../../../protocal/base/UserProtocal";
    import { RoleProtocal } from "../../../protocal/base/RoleProtocal";
    import { OrganizationProtocal } from "../../../protocal/base/OrganizationProtocal"
    import { CustomerProtocal } from '../../../protocal/base/CustomerProtocal'
    import { PositionProtocal } from '../../../protocal/base/PositionProtocal'
    // import { user,role,organization } from "../../../service/backstageService";

    import { axiosHttpPost } from '../../../assets/js/axios'
    //组件
    import myDatepicker from 'vue-datepicker/vue-datepicker-es6.vue'
    // import Group from '../../base/organization'
    // 方法
    import { resetTemp } from  './event'

    export default {
        computed: {
            startTime() {
                return store.form.startDate.time
            },
            endTime() {
                return store.form.endDate.time
            },
            email() {
                return store.form.email
            }
            // roleIdList() {
            //     return store.roleI  dArr[store.roleIdArr.length-1]
            // }
        },
        watch: {
            // roleIdList(newValue, oldValue) {
            //     store.form.roleIdList = store.roleIdArr
            //     console.log(store.form.roleIdList);
            //     // console.log('以下是roleIdLIST');
            //     // console.log(store.form.roleIdList);
            // },
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
            email(newValue, oldValue) {
                // console.log('打印邮箱变化');
                // console.log('旧' + oldValue);
                // console.log('新' + newValue);
                if(newValue) {
                    if(newValue.substring(0,newValue.indexOf('.')) != store.initEmail && store.form.id) {
                        this.showBtn = true;
                    }else {
                        this.showBtn = false;
                    }
                }
            }
        },
        components: {
            'date-picker': myDatepicker
        },
        data() {
            return {
                store,
                globalStore,
                dialogChooseOrgVisible: false,
                showBtn: false,
                banSendAagin: false,
                banWhileSend: false,
                organizationTree: [{
                    id: null,
                    label: '全部组织机构',
                    children: []
                },{
                    id: null,
                    label: '全部客户',
                    children: []
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                getName: '',
                getId: '',
                getLevel: null,
                buttonText: '发送验证码',
                interval: null,
                countDown: null,
            }
        },
        methods: {
            createData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                            globalStore.buttonLoading = true;
                            if(store.form.id) {
                                this.modify()
                            }else {
                                this.create()
                            }
                    }
                })

            },
            cancel(formName) {
                // this.$refs[formName].clearValidate();
                store.dialogFormVisible = false;
                globalStore.buttonLoading = false;
                this.$refs[formName].resetFields();
                // resetTemp();
                store.saveOrgidArr = []
                store.staff = []
            },
            modify() {
                // let _this = this
                // user.get.request.id = store.form.id
                // axiosHttpPost(doMain.base + user.get.rest,user.get.request)
                //     .then((res) => {
                //         console.log(res);
                        // store.form.roleIdList = res.data.result[0].roleIdList
                        let request = UserProtocal.refresh.request
                        let url = doMain.base + UserProtocal.refresh.rest
                        request = store.form
                        axiosHttpPost(this, url, request,(res) => {
                            console.log('修改请求');
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
                                this.$message({ message:'修改失败', type:'error' })
                            }
                        })
            },
            create() {
                let _this = this
                let request = UserProtocal.create.request
                // console.log(store.form.roleIdList);
                request = store.form
                request.startTime = new Date(request.startTime).getTime()
                request.endTime = new Date(request.endTime).getTime()
                // request.orgId =val[val.length-1]
                console.log('创建请仇');
                console.log(request);
                axiosHttpPost(this, doMain.base + UserProtocal.create.rest, request, (res) => {
                                console.log(res);
                                globalStore.buttonLoading = false;
                                store.saveOrgidArr = []
                                store.staff = []
                                if(res.data.status == 'OK') {
                                    this.$message({ title: '成功', message: '创建成功', type: 'success', })
                                    this.$refs['dataForm'].resetFields()
                                    this.$refs['dataForm'].clearValidate()
                                    store.dialogFormVisible = false
                                    _this.$emit('tabView')
                                }else if(res.data.status == 'FAIL'){
                                    this.$message({ title: '失败', message: res.data.message, type: 'error' })
                                }
                        })
            },
            getOrganization() {
                if(this.$refs['dataForm'] != undefined && !store.form.id) {
                    console.log('进来清除了');
                    this.$refs['dataForm'].resetFields();
                }
                //存储邮箱输入框初始的值
                if(store.form.email) {
                    store.initEmail = store.form.email.substring(0,store.form.email.indexOf('.'))
                }                
                this.showBtn = false;
                
                //清除上次计时器
                if(this.interval) {
                    this.buttonText = '发送验证码'
                    this.countDown = null;
                    this.banSendAagin = false;
                    clearInterval(this.interval)
                }
                //清楚未清楚的表单验证
                
                //清空全部组织以及全部客户的上一次数据
                this.organizationTree[0].children = []
                this.organizationTree[1].children = []
                // let url = doMain.base + PositionProtocal.listPosition.rest
                // let request = PositionProtocal.listPosition.request
                
                //超级管理员(companyId == 0), 请求organization
                if(globalStore.userInfo.companyId == 0) {
                    let url = doMain.base + OrganizationProtocal.listTree.rest
                    let request = OrganizationProtocal.listTree.request
                    axiosHttpPost(this, url, request, (res) => {
                        console.log('organization');
                        console.log(res);
                            this.organizationTree[0].children = res.data.result
                    })
                }else {
                    //除了超级管理请求position
                    let url = doMain.base + PositionProtocal.listPosition.rest
                    let request = PositionProtocal.listPosition.request
                    axiosHttpPost(this, url, request, (res) => {
                        console.log('position');
                        console.log(res);
                        if(JSON.stringify(res.data.result).length != 0 && res.data.result.label) {
                            this.organizationTree[0].children.push(res.data.result)
                        }else {
                            this.organizationTree[0].children = [];
                        }
                    })
                }
                // axiosHttpPost(this, url, request, (res) => {
                //     // console.log('第一个');
                //     // console.log(res);
                //     if(JSON.stringify(res.data.result)!=0 && res.data.status == 'OK') {
                //         this.organizationTree[0].children.push(res.data.result)
                //     }else {
                //         this.organizationTree[0].children = []
                //     }
                    
                //     // console.log(store.orgOptions);
                // })
                let url2 = doMain.base + CustomerProtocal.listTree.rest
                let request2 = CustomerProtocal.listTree.request
                axiosHttpPost(this, url2, request2, (res) => {
                    if(res.data.status == 'OK' && res.data.result != 0) {
                        this.organizationTree[1].children = res.data.result;
                    }else {
                        this.organizationTree[1].children = []
                    } 
                })
                //如果存在id 则是修改, 获取下属员工
                if(store.form.id) {
                    let url3 = doMain.base + UserProtocal.listUser.rest
                    let request3 = UserProtocal.listUser.request
                    request3.companyId = store.form.companyId
                    axiosHttpPost(this, url3, request3, (res) => {
                                    store.staff = []
                                    res.data.result.forEach((item) => {
                                        store.staff.push({label: item.userName})
                                    })
                                })
                }
                this.getName = null;
                this.getId = null;
                 //初始化日期限制
                store.dateOptions.limit[0].from = ''
                store.dateOptions.limit[0].to = ''

                
            },
            //记录邮箱信息变化
            inputChange(val) {
                // if(val.substring(0,val.indexOf('.')) != store.initEmail && store.form.id) {
                //     this.showBtn = true;
                // }else {
                //     this.showBtn = false;
                // } 
            },
            //发送验证码
            sendIdetifyCode() {
                this.banSendAagin = true;
                this.banWhileSend = true;
                this.countDown = 60;
                let url = doMain.base + UserProtocal.sendEmail.rest;
                let request = UserProtocal.sendEmail.request;
                request.email = store.form.email
                console.log(request);
                axiosHttpPost(this, url, request, (res) => {
                    if(res.data.status == 'OK') {
                        this.$message.success('验证码已发送至邮箱')
                    }else {
                        this.$message.error('验证码发送失败请重试')
                    }
                })
                // console.log(isNaN(time));
                this.interval = window.setInterval(()=>{
                    this.countDown--;
                    // store.countDown--;
                    this.buttonText = '重新发送(' + this.countDown + ')' 
                    if(this.countDown == 0) {
                        clearInterval(this.interval)
                        this.banSendAagin = false;
                        this.banWhileSend = false;
                        this.buttonText = '发送验证码'
                    }
                },1000)
            },
            chooseOrg() {
                let _this = this;
                this.dialogChooseOrgVisible = true;
            },
            cancelChoose() {
                this.getName = store.form.superOrganization = null;
                this.getId = store.form.parentId = null;
                this.dialogChooseOrgVisible = false;
            },
            handleNodeClick(data,node) {
                
                if (data == null || data == undefined) {
                     return false;
                }
                // if(data.children.length==0 && node.level == 1) {
                //     return false;
                // }
                console.log(data);
                this.getId = data.id;
                this.getName = data.label;
                this.getLevel = node.level
            },
             // 确认部门选择
            sureOrg: function () {
                //如果选择的机构为空, 提示选择 , 重新选择
                if (this.getName == '') {
                    this.$alert('请选择机构！', '提示', {
                        confirmButtonText: '确定'
                    });
                }
                //根据companyId存在是否 以及当前用户的组织是否为树结构中第二级别公司判断是否其上级公司
                if (globalStore.userInfo.companyId && globalStore.userInfo.orgName != this.getName && this.getLevel == 2) {
                    this.$alert('没有权限选择您的上级机构', '提示', { confirmButtonText: '确定', type: 'warning' })
                    return false;
                }
                //如果companyId不为0 则不能选择全部机构
                if ( globalStore.userInfo.companyId !=0 && this.getLevel == 1 ) {
                    this.$alert('没有权限选择全部机构', '提示', { confirmButtonText: '确定', type: 'warning' })
                    return false;
                }
                //关闭表单
                this.dialogChooseOrgVisible = false;
                //给表单中的组织名称和组织id赋值
                store.form.orgName = this.getName;

                if(globalStore.userInfo.companyId == 0) {
                    //如果为0 则组织树用的organziaitonTree 其中id是companyId 直接赋值
                    store.form.companyId = this.getId  
                    //使用companyId查询该公司的会员类型
                    let getType_OrganizationUrl = doMain.base + OrganizationProtocal.get.rest
                    let getType_OrganizationRequest = OrganizationProtocal.get.request
                    getType_OrganizationRequest.id = store.form.companyId
                    axiosHttpPost(this, getType_OrganizationUrl, getType_OrganizationRequest, (res) => {
                        console.log('查到membertype');
                        console.log(res);
                        if(res.status == 200) {
                            //获取会员类型
                            store.form.memberType = res.data.result.memberType
                        }
                    })
                    let url2 = doMain.base + UserProtocal.listUser.rest
                    let request2 = UserProtocal.listUser.request
                    request2.companyId = store.form.companyId
                    axiosHttpPost(this, url2, request2, (res) => {
                                    // console.log(res);
                                    store.staff = []
                                    res.data.result.forEach((item) => {
                                        store.staff.push({label: item.userName})
                                    })
                                    // console.log(store.staff);
                                })
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
                            store.form.companyId = res.data.result.companyId    
                            let getType_OrganizationUrl = doMain.base + OrganizationProtocal.get.rest
                            let getType_OrganizationRequest = OrganizationProtocal.get.request
                            getType_OrganizationRequest.id = store.form.companyId
                            axiosHttpPost(this, getType_OrganizationUrl, getType_OrganizationRequest, (res) => {
                                console.log('查到membertype');
                                console.log(res);
                                if(res.status == 200) {
                                    //获取会员类型
                                    store.form.memberType = res.data.result.memberType
                                }
                            })
                            let url2 = doMain.base + UserProtocal.listUser.rest
                            let request2 = UserProtocal.listUser.request
                            request2.companyId = store.form.companyId
                            axiosHttpPost(this, url2, request2, (res) => {
                                            // console.log(res);
                                            store.staff = []
                                            res.data.result.forEach((item) => {
                                                store.staff.push({label: item.userName})
                                            })
                                            // console.log(store.staff);
                                        })
                        }
                        this.getName = null;
                        this.getId = null;
                        this.getLevel = null
                    })
                }
                // console.log('三四十');
                // console.log(store.form.companyId);
                // console.log(store.form.orgName);
            },
            //            取消部门选择
            cancelOrg: function () {
                this.dialogChooseOrgVisible = false;
                this.getId = null
                this.getName = null
            },
            inputValue(val) {
                // console.log(val);
                store.dateOptions.limit[0].from = val
                store.dateOptions.limit[0].to = ''
            },
            inputValueEnd (val) {
                // console.log('ss');
                store.dateOptions.limit[0].to = val
                store.dateOptions.limit[0].from = ''
            },
            roleChange(val) {
                // console.log(val);
                store.form.roleIdList = val
                console.log(store.form.roleIdList);
                // console.log(1);
            },
        },
        mounted() {
            // this.getOrganization()
            // console.log(store.form.id);
        }
    }
</script>
<style scoped>
    .item-control {
        width: 180px;
    }
    .tree {
        height: 200px;
        overflow: auto;
        /* border:1px solid #ccc; */
    }
</style>
