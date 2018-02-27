<template>
    <div class="dialogArea">
        <el-dialog 
        width="60%" 
        :title = "store.form.id?'修改信息':'热源增加'"
        :close-on-press-escape="false"
        :close-on-click-modal="false" 
        :show-close="false" 
        :visible.sync="store.dialogFormVisible"
        @open="getCompany" 
        style="text-align:left;">
            <el-form size="small" status-icon :model="store.form" :rules="store.rules" ref="dataForm" label-width="120px" label-position="right" class="clearfix">
                <el-col :span="12">
                    <el-form-item label="热源编码："  prop="sn">
                        <el-input clearable :disabled="store.form.id?true:false" class="item-control" v-model.trim="store.form.sn" placeholder="请输入热源编码"></el-input>
                    </el-form-item>
                    <el-form-item label="热源名称："  prop="name">
                        <el-input clearable  class="item-control" v-model.trim="store.form.name" placeholder="请输入热源名称"></el-input>
                    </el-form-item>
                    <el-form-item label="供热类型："  prop="type" auto-complete="off" >
                        <el-select clearable class="item-control" v-model="store.form.type" filterable>
                            <el-option v-for="item in store.heatProvideTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option> 
                        </el-select>
                    </el-form-item>
                    <el-form-item label="热源性质："  prop="property" auto-complete="off" >
                        <el-select clearable class="item-control" v-model="store.form.property" filterable>
                            <el-option v-for="item in store.heatTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option> 
                        </el-select>
                    </el-form-item>
                    <el-form-item label="装机容量："  prop="capacity" auto-complete="off" >
                        <el-input clearable placeholder="请输入装机容量" class="unit-control" v-model.trim="store.form.capacity" style="width:180px;">
                            <template slot="append">mw</template>
                        </el-input>
                    </el-form-item>
                    <!-- <el-form-item label="锅炉数量："  prop="boilerQuantity" auto-complete="off" >
                        <el-input  class="item-control" v-model.trim="store.form.boilerQuantity" placeholder="请输入装机容量"></el-input>
                    </el-form-item> -->
                    <el-form-item  label="汽机数量："  prop="turbineNumber" auto-complete="off" >
                        <el-input clearable class="item-control" v-model.trim="store.form.turbineNumber" placeholder="请输入装机容量"></el-input>
                    </el-form-item>
                     <el-form-item   label="供热能力："  prop="heatingCapacity" auto-complete="off" >
                        <!-- <el-input class="item-control" v-model.trim="store.form.capability" placeholder="请输入供热能力"></el-input> -->
                        <el-input clearable placeholder="请输入供热能力" class="unit-control" v-model.trim="store.form.heatingCapacity" style="width:180px;">
                            <template slot="append">㎡</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="供热面积：" prop="heatingArea">
                        <el-input clearable class="item-control" v-model.trim="store.form.heatingArea" placeholder="请输入供热面积"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                   <el-form-item label="所属公司：" prop="company" size="small">
                        <el-input clearable disabled class="item-control" v-model="store.form.company" placeholder="请选择所属公司"
                            readonly="readonly">
                        </el-input>
                        <el-button size="small"  type="primary" @click="chooseOrg">选择</el-button>
                    </el-form-item>
                   <el-form-item label="所属省市：" prop="city">
                        <!-- <el-input class="item-control" v-model.trim="store.form.city" :disabled="true" ></el-input> -->
                        <el-select clearable class="item-control" @change="getArea($event)" v-model="store.form.city" filterable placeholder="请选择省">
                            <el-option
                            v-for="item in store.province_options"
                            :key="item.label"
                            :label="item.label"
                            :value="item.label">
                            </el-option>
                        </el-select>
                        <!-- <el-autocomplete
                            class="item-control"
                            v-model.trim="store.form.city"
                            :fetch-suggestions="querySearchProvince"
                            placeholder="请输入内容"
                        ></el-autocomplete> -->
                   </el-form-item>
                   <el-form-item label="所属区域：" prop="area">
                        <!-- <el-input class="item-control" v-model.trim="store.form.area" placeholder="请输入所属市区"></el-input> -->
                        <!-- {{ store.form.area }} -->
                        <el-select clearable class="item-control" @change="getAvenue($event)" v-model="store.form.area" filterable placeholder="请选择区域">
                            <el-option
                            clearable
                            v-for="item in store.city_options"
                            :key="item.label"
                            :label="item.label"
                            :value="item.label">
                            </el-option>
                        </el-select>
                   </el-form-item>
                   <el-form-item label="所属县：" prop="avenue">
                        <!-- <el-input class="item-control" v-model.trim="store.form.area" placeholder="请输入所属市区"></el-input> -->
                        <!-- {{ store.form.area }} -->
                        <el-select clearable class="item-control" @change="getCommittee($event)" v-model="store.form.avenue" filterable placeholder="请选择区域">
                            <el-option
                            clearable
                            v-for="item in store.avenue_options"
                            :key="item.label"
                            :label="item.label"
                            :value="item.label">
                            </el-option>
                        </el-select>
                   </el-form-item>
                   <el-form-item label="所属镇(乡)：" prop="committee">
                        <!-- <el-input class="item-control" v-model.trim="store.form.area" placeholder="请输入所属市区"></el-input> -->
                        <!-- {{ store.form.area }} -->
                        <el-select clearable class="item-control" v-model="store.form.committee" filterable placeholder="请选择区域">
                            <el-option
                            clearable
                            v-for="item in store.committee_options"
                            :key="item.label"
                            :label="item.label"
                            :value="item.label">
                            </el-option>
                        </el-select>
                   </el-form-item>
                   <el-form-item label="详细地址：" prop="address">
                       <el-tooltip  :disabled="!store.form.address || store.form.address.length<12" class="item" effect="light" :content="store.form.address" placement="top">
                            <el-input clearable class="item-control" v-model.trim="store.form.address" placeholder="请输入详细地址"></el-input>
                       </el-tooltip>
                   </el-form-item>
                   <el-form-item label="经度：" prop="longitude">
                       <el-input class="item-control"  :disabled = "store.banInput" v-model.trim="store.form.longitude" placeholder="请输入经度" @focus="getPosition"></el-input>
                   </el-form-item>
                   <el-form-item label="纬度：" prop="latitude">
                       <el-input class="item-control"  :disabled = "store.banInput" v-model.trim="store.form.latitude" placeholder="请输入纬度" @focus="getPosition"></el-input>
                    </el-form-item>
                    
                </el-col>
            </el-form>
            <el-dialog
            width="80%"
            :visible.sync="store.mapVisible"
            :close-on-click-modal="false"
            class="map"
            append-to-body>
                <boilerMap />
            </el-dialog>
            <div style="width:100%; text-align:center;overflow:hidden;">
                <el-button size="small" type="primary" :loading="globalStore.buttonLoading" @click="createData">保 存</el-button>
                <el-button size="small" style="margin-right:16px;" @click="cancel('dataForm')">取 消</el-button>
            </div>
            <!-- <div id="boilerMap"> -->
            <!-- </div> -->
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
        <!-- <div id="map">
            <Map />
        </div> -->
    </div>
</template>
<script>
    //仓储
    import { store } from './store'
    import { globalStore } from "../../base/store"
    //引入协议
    import { doMain } from '../../../protocal/url'
    // import { boilerHouse,organization } from "../../../service/backstageService";
    import { BoilerhouseProtocal } from "../../../protocal/base/BoilerHouseProtocal"
    import { PositionProtocal } from "../../../protocal/base/PositionProtocal"
    import { OrganizationProtocal } from "../../../protocal/base/OrganizationProtocal"
    import { AdministrativeProtocal } from "../../../protocal/base/AdministrativeProtocal"
    import { axiosHttpPost } from '../../../assets/js/axios'
    
    //二级联动
    import cascader from '../../../assets/js/proAndCity'
    //地图
    import  boilerMap  from './component/boilerMap'
    import bus from '../../base/bus'
    //引入方法
    import { resetTemp } from './event'
    export default {
        components: {
            boilerMap
        },
        computed:{
            city() {
                return store.form.city
            },
            area() {
                return store.form.area
            },
            avenue() {
                return store.form.avenue
            },
            committee() {
                return store.form.committee
            }
        },
        watch: {
            city(newValue, oldValue) {
                // console.log('进来了11');
                if(oldValue) {
                    console.log(oldValue);
                    // console.log('进来了11');
                    // store.form.area = null
                    return false;
                }
                // console.log(oldValue);
                // console.log(newValue);
                // if() 
                if(store.province_options) {
                    // console.log('进来了');
                    store.province_options.forEach((item) => {
                        if(store.form.city == item.label) {
                            store.city_options = item.children
                            // console.log('进来了');
                            // console.log(store.city_options);
                        }
                    })
                }
                
                // this.updateCity();
                // this.updateDistrict();
            },
            area(newValue, oldValue) {
                if(oldValue) {
                    // console.log('进来了');
                    // store.form.area = null
                    return false;
                }
                if(store.city_options) {
                    store.city_options.forEach((item) => {
                        if(store.form.area == item.label) {
                            store.avenue_options = item.children
                        }
                    })
                }
            },
            avenue(newValue, oldValue) {
                if(oldValue) {
                    // console.log('进来了');
                    // store.form.area = null
                    return false;
                }
                // console.log(oldValue);
                // console.log(newValue);
                // if() 
                if(store.avenue_options) {
                    store.avenue_options.forEach((item) => {
                        if(store.form.avenue == item.label) {
                            store.committee_options = item.children
                        }
                    })
                }
            },
             committee(newValue, oldValue) {
                if(oldValue) {
                    // console.log('进来了');
                    // store.form.area = null
                    return false;
                }
                // console.log(oldValue);
                // console.log(newValue);
                // if() 
                // if(store.committee_options) {
                //     store.committee_options.forEach((item) => {
                //         if(store.form.city == item.label) {
                //             store.city_options = item.children
                //         }
                //     })
                // }
            },
            // area(newValue, oldValue) {
            //     // console.log(store.districtArr);
            //     // console.log(oldValue);
            //     if(oldValue) {
            //         // console.log('进来了');
            //         // store.form.company = null
            //         // return false;
            //     }
            //     store.listPosition = []
            //     store.districtArr.forEach((item) => {
            //         if(newValue == item.label) {
            //             item.children.forEach((item) => {
            //                 // console.log(item);
            //                 store.listPosition.push({label: item.label,id: item.id})    
            //             })
            //             // console.log(store.listPosition);
            //             // store.listPostion = item.children
            //         }
            //     }) 
            //     // this.updateDistrict();
            // }
            // ,
            // dialogDispaly(newValue, oldValue) {
            //     if (newValue == true) {
            //         store.banInput = false;
            //     }
            // }
        },
        data() {
            return {
                store,
                globalStore,
                dialogChooseOrgVisible: false,
                organizationTree: [{
                    id: null,
                    label: '全部机构',
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
                            console.log('修改');
                            this.modify()
                        }else {
                            this.create();
                        }
                    }
                })
            },
            create() {
                let _this = this
                let request = BoilerhouseProtocal.create.request
                request = store.form
                axiosHttpPost(this, doMain.base + BoilerhouseProtocal.create.rest,request,(res) => {
                                globalStore.buttonLoading = false;
                                console.log('创建结果');
                                console.log(res);
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
                let url = doMain.base + BoilerhouseProtocal.refresh.rest
                let request = BoilerhouseProtocal.refresh.request
                request = JSON.parse(JSON.stringify(store.form))
                // request = store.form
                if(store.initSn == request.sn) {
                    request.sn = null
                }
                if(store.initCompany == request.company) {
                    request.company = null
                }
                axiosHttpPost(this, url, request, (res) => {
                        console.log('修改结果');
                        console.log(res);
                        globalStore.buttonLoading = false;
                        if(res.data.status == 'OK') {
                            this.$message({ message:'修改成功', type:'success' })
                            this.$refs['dataForm'].resetFields()
                            store.dialogFormVisible = false
                            _this.$emit('tabView')
                        }else if(res.data.status == 'FAIL'){
                            console.log(res);
                            this.$message({ message:res.data.message, type:'error' })
                        }else {
                            this.$message({ message:'数据错误', type:'error' })
                        }
                    })
            },
            getCompany() {
                // store.listPosition = []
                this.organizationTree[0].children = []
                let url = doMain.base + PositionProtocal.listPosition.rest
                let request = PositionProtocal.listPosition.request
                axiosHttpPost(this, url, request, (res) => {
                    // let result = res.data.result.list
                    console.log('11');
                    console.log(res.data.result);
                    this.organizationTree[0].children.push(res.data.result)
                    // console.log('list');
                    // console.log(res);
                    // result.forEach((item) => {
                    //     store.listPosition.push({ label: item.name })
                    // })
                    // console.log(store.listPosition);
                })
                //获取省市下拉数据
                let url2 = doMain.base + AdministrativeProtocal.listTree.rest
                let request2 = AdministrativeProtocal.listTree.request
                axiosHttpPost(this, url2, request2, (res) => {
                    console.log('list');
                    console.log(res);
                    store.province_options = res.data.result
                })
                // if(!store.form.company) {
                //     axiosHttpPost(this, doMain.base + PositionProtocal.listTree.rest,PositionProtocal.listTree.request, (res) => {
                //         if(res.data.status == 'OK') {
                //             store.form.company = res.data.result[0].label
                //         } else {
                //             this.$message({ message: '网络繁忙请重试', type: 'warning' })
                //         }
                //     })
                // }  
            },
            getArea(prov) {
                store.form.area = null;
                store.form.avenue = null;
                store.form.committee = null;

                //旧方法
                // store.city_options = [];
                // store.form.area = null;
                // for(let val of store.allCity) {
                //     if(prov == val.prov) {
                //         store.city_options.push({ prov:val.label, label:val.label })
                //     }
                // }

                //新
                for(let val of store.province_options) {
                    if(prov == val.label) {
                        store.city_options = val.children
                    } 
                }
            },
            getAvenue(area) {
                store.form.avenue = null;
                store.form.committee = null;
                for(let val of store.city_options) {
                    if(area == val.label) {
                        store.avenue_options = val.children
                    } 
                }
            },
            getCommittee(avenue) {
                store.form.committee = null;
                for(let val of store.avenue_options) {
                    if(avenue == val.label) {
                        store.committee_options = val.children
                    } 
                }
            },
            getPosition() {
                //focus打开地图前清除上一次的位置信息
                globalStore.position = {}
                store.mapVisible=true
            },
            //输入建议的方法---
            cancel(formvalue) {
                //清除上一次数据以及验证信息 
                store.dialogFormVisible = false;
                this.$refs[formvalue].resetFields();
                // this.$refs[formvalue].clearValidate();
                resetTemp()         
                globalStore.buttonLoading = false;
            },
            chooseOrg() {
                this.dialogChooseOrgVisible = true;
            },
            handleNodeClick(data,node) {
                // console.log(data);
                // console.log(node.level);
                if (data == null || data == undefined ) {
                     return false;
                }
                // console.log('来来来');
                // console.log(data.id !== globalStore.userInfo.companyId);
                // console.log(data.id);
                // console.log(globalStore.userInfo.orgName);
                // if(data.label !== globalStore.userInfo.orgName && node.level == 2 || node.level == 1) {
                //     console.log(data.label);
                //     console.log(globalStore.userInfo.orgName);
                //     return false;
                // }
                
                this.getName = data.label;
                this.getLevel = node.level
                // console.log(this.getLevel);
            },
             //            确认部门选择
            sureOrg: function () {
                if (this.getName == '') {
                    this.$alert('请选择公司！', '提示', {
                        confirmButtonText: '确定'
                    });
                }
                // console.log(this.getLevel);
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
                this.getName = null;
            },
            //            取消部门选择
            cancelOrg: function () {
                this.dialogChooseOrgVisible = false;
                this.getName = null
            },
            cancelChoose() {
                this.getName = store.form.superOrganization = null;
                this.dialogChooseOrgVisible = false;
            }
        },
        created() {
            this.getCompany();
            // store.provinceArr = arrAll
            bus.$on('dialogSignal', () => {
                store.mapVisible = false
                store.form.longitude = globalStore.position.lng
                store.form.latitude = globalStore.position.lat
                // store.banInput = true
            })
        },
        beforeMount: function () {
            //关闭地图的显示
            store.mapVisible = false;
        },
    }
</script>
<style scoped>
    /* .clearfix::before, 
    .clearfix::after {
        display: block;
        visibility: hidden;
        clear: both;
        height: 0;
        content: '';
    } */
    .item-control { width: 180px; }
    .tree { height: 200px; overflow: auto; /* border:1px solid #ccc; */ }
</style>
