<template>
    <div id="admin-wrapper">
        <el-col :span="8" style="height:100%;">
            <div class="leftArea">
                <h3 class="title">行政区划信息</h3>
                <div class="content">
                    <!-- <el-tree 
                    :data="data"  
                    @node-click="handleNodeClick"
                    :render-content="renderContent"></el-tree> -->
                    <el-tree
                    v-if="store.treeData"
                    :data="store.treeData"
                    node-key="id"
                    @node-click="handleNodeClick"
                    default-expand-all
                    :expand-on-click-node="false"
                    :render-content="renderContent">
                    </el-tree>
                    <div style="text-align:center;margin-top:40px;">
                        <el-button v-if="store.treeData.length == 0"  plain type="primary" @click="add">添加首级行政区</el-button>
                    </div>
                </div>
            </div>
        </el-col>
        <el-col :span="16" >
            <div class="rightArea">
                <h3 class="title" v-text="titleChange">行政区划详情</h3>
                <el-form ref="dataForm" :model="store.form" label-position="right" label-width="150px" style="font-weight:700;margin-top:10px;" size="small" :rules="store.rules">
                    <el-form-item label="行政名称：" prop="name">
                        <el-input  clearable v-if="fromLevel!=0 && fromLevel!=1" :disabled="store.banInput" class="item-control"  v-model.trim="store.form.name" placeholder="请输入行政名称"></el-input>
                        <el-select clearable :disabled="store.banInput" class="item-control" clearable v-if="fromLevel == 0" v-model.trim="store.form.name">
                            <el-option
                            v-for="item in store.province_options"
                            :key="item.label"
                            :label="item.label"
                            :value="item.label"
                            >
                        </el-option>
                        </el-select>
                        <el-select clearable :disabled="store.banInput" class="item-control" clearable v-if="fromLevel == 1" v-model.trim="store.form.name">
                            <el-option
                                v-for="item in store.city_options"
                                :key="item.label"
                                :label="item.label"
                                :value="item.label"
                                >
                            </el-option>
                        </el-select>
                        <!-- <label v-if="store.form.id" v-text="store.form.name"></label> -->
                    </el-form-item>
                    <el-form-item label="行政代码：" prop="sn">
                        <el-input  clearable :disabled="store.banInput" class="item-control" v-model.trim="store.form.sn" placeholder="请输入行政代码"></el-input>
                        <!-- <label v-if="store.form.id" v-text="store.form.sn"></label> -->
                    </el-form-item>
                    <el-form-item label="级别：" prop="level">
                        <!-- <el-input></el-input> -->
                         <el-select  clearable  :disabled="store.banInput" class="item-control" placeholder="请选择" v-model="store.form.level">
                            <el-option v-for="item in store.levelOptions" :label="item.label" :value="item.value" :key="item.label"></el-option>
                        </el-select>  
                        <!-- <label v-if="store.form.id" v-text="levelValue"></label> -->
                    </el-form-item>
                    <el-form-item label="城乡区划类别：" placeholder="请选择城乡区划类别" prop="type">
                        <el-select  clearable  :disabled="store.banInput" class="item-control"  v-model="store.form.type">
                            <el-option v-for="item in store.regionCategory" :label="item.label" :value="item.label" :key="item.label"></el-option>
                        </el-select>  
                        <!-- <label v-if="store.form.id" v-text="store.form.type"></label> -->
                    </el-form-item>
                    <el-form-item label="经度：" prop="longitude">
                        <el-input  clearable :disabled="store.banInput" class="item-control" @focus="mapOpen"  v-model.trim="store.form.longitude" placeholder="点击获取"></el-input>
                        <!-- <label v-if="store.form.id" v-text="store.form.longitude"></label> -->
                    </el-form-item>
                    <el-form-item label="纬度：" prop="latitude">
                        <el-input  clearable :disabled="store.banInput" class="item-control" @focus="mapOpen"  v-model.trim="store.form.latitude" placeholder="点击获取"></el-input>
                        <!-- <label v-if="store.form.id" v-text="store.form.latitude"></label> -->
                    </el-form-item>
                </el-form>
                <div  v-if="store.buttonShow == 'modify'" class="footer" style="text-align:center;">
                    <el-button   :loading="globalStore.buttonLoading" size="small" @click="modifyData" type="primary">修改</el-button>
                    <el-button   size="small" @click="cancel('dataForm')"  type="primary">取消</el-button>
                </div>
                <div  v-if="store.buttonShow == 'add'" class="footer" style="text-align:center;">
                    <el-button   :loading="globalStore.buttonLoading" size="small" @click="createData" type="primary">添加</el-button>
                    <el-button   size="small" @click="cancel('dataForm')"  type="primary">取消</el-button>
                </div>
                
            </div>
        </el-col>
        <div id="dialog">
            <el-dialog
            :visible.sync="store.dialogFormVisible"
            width="80%"
            :close-on-click-modal="false"
            class="admin-map">
                <boilerMap />
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import { store } from './store'
    import { globalStore } from "../../base/store"

    // import { doMain.base } from '../../../service/ip'
    import { doMain } from "../../../protocal/url"

    // import { admin } from "../../../service/backstageService"
    import { axiosHttpPost } from '../../../assets/js/axios'
    import { AdministrativeProtocal } from '../../../protocal/base/AdministrativeProtocal'
    import  boilerMap  from '../heatManage/component/boilerMap'
    import bus from '../../base/bus'
    import { resetForm } from './event'
    import { findButtonList } from '../../../assets/js/findButtonList'

    export default {
        computed: {
            level() {
                return store.form.level
            }
        },
        watch: {
            level(newValue, oldValue) {
                if(newValue) {
                    const mapLevel = {
                        1: '省级/直辖市',
                        2: '市级/区',
                        3: '县级',
                        4: '镇'
                    }
                this.levelValue = mapLevel[newValue]
                }
            },
            fromLevel(newValue, oldValue) {
                console.log(newValue);
            }
        },
        components: {
            boilerMap
        },
        data() {
            return {
                store,
                globalStore,
                data: [],
                titleChange: '行政区划详情',
                fromLevel:null
                // levelValue: null
            }
        },
        methods: {
            tabView() {
               axiosHttpPost(this, doMain.base + AdministrativeProtocal.listTree.rest, AdministrativeProtocal.listTree.request, (res) => {
                            console.log(res);
                            store.treeData = res.data.result
                        })
                        // .then((res) => {
                        //     console.log(res);
                        //     store.treeData = res.data.result
                        // })
            },
            add(node,data) {
                // console.log(node);
                //不允许出发节点点击事件
                resetForm()
                 this.store.isAllow = false;
                //显示添加按钮
                this.store.buttonShow = 'add'
                this.store.banInput = false;
                this.titleChange = '行政区划添加'
                console.log(node.level)
                if(node.level == 1) {
                    this.$confirm('是否添加其下级行政区划?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    showClose: false,
                    closeOnClickModal: false
                    }).then(() => {
                        store.form.city = node.label  
                        this.fromLevel =  1
                        store.city_options = [];
                        for(let val of store.allCity) {
                            if(node.label == val.prov || val.prov.indexOf(node.label) != -1) {
                                store.city_options.push({ prov:val.label, label:val.label })
                            }
                        }
                        this.$message({ message: '请在右侧输入添加详情', duration:'1000' })
                    }).catch(() => {
                        this.fromLevel =  0
                        this.$message({ message: '请在右侧输入添加详情', duration:'1000' })
                        return false;
                        // this.createData();
                    })
                } else if (data == undefined) {
                        // console.log('进来了');
                        this.fromLevel =  0
                        this.$message({ message: '请在右侧输入添加详情', duration:'1000' })
                        return false;
                }   
                    // console.log('下来了');
                    switch(node.level) {
                        // case 1: 
                        //     store.form.city = node.label
                        //     break;
                        case 2:
                            store.form.city = node.parent.label;
                            store.form.area = node.label;
                            break;
                        case 3: 
                            console.log(node.parent.label);
                            store.form.city = node.parent.parent.label;
                            store.form.area = node.parent.label;
                            store.form.avenue = node.label
                            break;
                }
                // if(node.level)
                
            },
            createData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        let url = doMain.base + AdministrativeProtocal.create.rest
                        let request = AdministrativeProtocal.create.request
                        globalStore.buttonLoading = true;
                        request = store.form
                        console.log(request);
                       axiosHttpPost(this, url, request, (res) => {
                                        globalStore.buttonLoading = false;
                                        store.buttonShow = null;
                                        this.store.isAllow = true;
                                        this.store.banInput = true;
                                        if(res.data.status == 'OK') {
                                            this.$message({ title: '成功', message: '创建成功', type: 'success', })
                                            this.$refs['dataForm'].resetFields()
                                            this.tabView()
                                        }else if(res.data.status == 'FAIL'){
                                            this.$message({ title: '失败', message: '创建失败,请重新创建', type: 'error' })
                                        }
                                        this.titleChange = '行政区划详情'  
                                        console.log(res);
                                        // console.log(res);
                                    })
                    }
                })
                // console.log(admin.create.request);
                
            },
            modify(node, data, store) {
                resetForm()
                this.store.isAllow = true
                this.store.buttonShow = 'modify'
                this.store.banInput = false
                this.titleChange = '行政区划修改'
                if(node.level == 1) {
                    this.fromLevel = 0;
                }else if (node.level == 2) {
                    this.fromLevel = 1
                    console.log(node.parent.label);
                    let prov = node.parent.label
                    store.city_options = [];
                    for(let val of store.allCity) {
                        if(prov == val.prov || val.prov.indexOf(prov) != -1) {
                            store.city_options.push({ prov:val.label, label:val.label })
                        }
                    }
                }else {
                    this.fromLevel = null
                }
            },
            modifyData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        globalStore.buttonLoading = true;
                        AdministrativeProtocal.refresh.request = store.form
                        console.log(AdministrativeProtocal.refresh.request);
                       axiosHttpPost(this, doMain.base + AdministrativeProtocal.refresh.rest, AdministrativeProtocal.refresh.request, (res) => {
                                        console.log(AdministrativeProtocal.refresh.request);
                                        globalStore.buttonLoading = false;
                                        this.store.buttonShow = null;
                                        this.store.isAllow = true;
                                        this.store.banInput = true;
                                        if(res.data.status == 'OK') {
                                            this.$message({ title: '成功', message: '修改成功', type: 'success', })
                                            this.$refs['dataForm'].clearValidate()
                                            this.$refs['dataForm'].resetFields()
                                            this.tabView()
                                        }else if(res.data.status == 'FAIL'){
                                            this.$message({ title: '失败', message: res.data.message, type: 'error' })
                                        }
                                        this.titleChange = '行政区划详情'  
                                        console.log(res);
                                        // console.log(res);
                                    })
                    }
                })
            },
            remove(node, data) {
                this.store.isAllow = false;
                // console.log(data);
                let url = doMain.base + AdministrativeProtocal.remove.rest
                let request = AdministrativeProtocal.remove.request
                request.id = data.id
                axiosHttpPost(this, url, request, (res) => {
                    this.store.isAllow = true;
                    console.log(res);
                    if(res.data.status == 'OK') {
                        this.$message({ title: '成功', type: 'success', message: '删除成功' })
                        this.tabView()
                    }else {
                        this.$message({ title: '失败', type: 'error', message: res.data.message })
                    }
                })
            },
            handleNodeClick(val,node) {
                if(!this.store.isAllow) {
                    return false;
                }
                if(this.store.banInput) {
                    this.titleChange = '行政区划详情'  
                }
                resetForm()
                // resetRequest()
                AdministrativeProtocal.get.request = {
                    city:null,//市
                    area:null,//区
                    avenue:null,//城市街道办事处
                    committee:null,//居委会
                    name:null,//行政名称
                    tag:null
                 }
                let url = doMain.base + AdministrativeProtocal.get.rest
                let request =  AdministrativeProtocal.get.request;
                request.name = request.tag = node.label
                 switch(node.level) {
                    case 1: 
                        request.city = node.label;
                        break;
                    case 2:
                        request.city = node.parent.label;
                        request.area = node.label;
                        break;
                    case 3: 
                        console.log(node.parent.label);
                        request.city = node.parent.parent.label;
                        request.area = node.parent.label;
                        request.avenue = node.label
                        break;
                    case 4:
                        request.city = node.parent.parent.parent.label;
                        request.area = node.parent.parent.label;
                        request.avenue = node.parent.label
                        request.committee = node.label
                }
               axiosHttpPost(this, url,request, (res) => {
                    console.log(res);
                    if(res.data.status == 'OK' && res.data.result) {
                        store.form = res.data.result
                    }else {
                        this.$message({ title: '错误', type: 'error', message: '请求错误' })
                    }
                })
                // .then((res) => {
                //     console.log(res);
                //     if(res.data.status == 'OK') {
                //         store.form = res.data.result
                //     }
                // })
            },
            renderContent(h, { node, data, store }) {
                return ( 
                    // <div>{node.label}</div>
                    <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                        <span>
                            <span>{node.label}</span>
                        </span>
                         <span>
                            <el-button v-show={node.level>0 && node.level<4} style="width: 22px; height: 22px; padding: 1px 2px; border: 1px solid #ccc;" on-click={ () => this.add(node,data) }><i title="添加" class="iconfont icon-add"></i></el-button>
                            <el-button v-show={node.level>0} style="width: 22px; height: 22px; padding: 1px 2px; border: 1px solid #ccc;" on-click={ () => this.modify(node, data,store) }><i title="修改" class="iconfont icon-modify"></i></el-button>
                            <el-button v-show={node.level>0} style="width: 22px; height: 22px; padding: 1px 2px; border: 1px solid #ccc;" on-click={ () => this.remove(node, data) }><i title="删除" class="iconfont icon-bin"></i></el-button>
                        </span>
                    </span>
                );
            },
            mapOpen() {
                store.dialogFormVisible = true;
            },
            cancel(formName) {
                this.$refs[formName].resetFields();
                // this.$refs[formName].clearValidate();
                resetForm()
                this.store.banInput = true;
                this.store.isAllow = true;
                store.buttonShow = null;
                this.titleChange = '行政区划详情'
                this.fromLevel = null  
            },
        },
        created() {
            this.tabView()
            let _this = this
            bus.$on('dialogSignal',() => {
                store.dialogFormVisible = false;
                store.form.longitude = globalStore.position.lng
                store.form.latitude = globalStore.position.lat
            })
        }
    }
</script>
<style scoped>
    #admin-wrapper{background-color: #fff;height:100%;}
    .title{ height: 44px; line-height: 44px; border-bottom:1px solid #ccc; color:#000;padding-left:10px;}
    .leftArea { height:100%;border-right:1px solid #ccc;}
    /* .form-content { font-weight:normal; } */
    .item-control { width: 180px; }
    /* .admin-map .el-dialog { height: 600px; }
    .admin-map .el-dialog  .el-dialog__body{ height: 500px; } */
</style>

