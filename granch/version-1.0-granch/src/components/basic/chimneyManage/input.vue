<template>
    <div class="inputArea">
        <el-form :model="store.searchData" label-width="80px" label-position="right" size="small" style="padding-top:5px;">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="创建时间" style="margin-bottom:18px;">
                            <el-date-picker
                                v-model="store.searchData.eventTime"
                                size="small"
                                type="daterange"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                  <el-col :span="8">
                    <el-form-item label="所属机构"  style="margin-bottom:10px;margin-left:50px;">
                        <!-- <el-select clearable v-model="store.searchData.company" size="small" @change="handleSelectCompany" placeholder="请输入单位名称" filterable>
                            <el-option v-for="item in store.searchCompany" :key="item.label" :value="item.label" :label="item.label"></el-option>
                        </el-select> -->
                        <el-autocomplete
                        class="inline-input"
                        clearable
                        :debounce="500"
                        v-model="store.searchData.company"
                        :fetch-suggestions="querySearchCompany"
                        placeholder="请输入所属机构"
                        :trigger-on-focus="false"
                        ></el-autocomplete>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <!-- <el-form-item label="热源站点"  style="margin-bottom:10px;">
                        <el-select clearable v-model="store.searchData.houseName" size="small" placeholder="请选择热源站点" filterable>
                            <el-option v-for="item in store.searchBoilerHouse" :key="item.label" :value="item.label" :label="item.label"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="锅炉房名称" label-width="100px">
                        <el-autocomplete
                        clearable
                        :debounce="500"
                        class="inline-input"
                        v-model="store.searchData.houseName"
                        :fetch-suggestions="querySearchBoilerHouse"
                        placeholder="请输入锅炉房"
                        :trigger-on-focus="false"
                        ></el-autocomplete>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                      <el-form-item label="烟囱编号" style="margin-bottom:10px;">
                          <el-input clearable v-model="store.searchData.gasSn" placeholder="请输入烟囱编号"></el-input>
                      </el-form-item>
                    </el-col>
                </el-row>
        </el-form>
    </div>
</template>
<script>
    import { store } from './store'
    import { doMain } from '../../../protocal/url'
    import { OrganizationProtocal } from '../../../protocal/base/OrganizationProtocal'
    import { PositionProtocal } from "../../../protocal/base/PositionProtocal"
    import { BoilerhouseProtocal } from "../../../protocal/base/BoilerHouseProtocal"
    import { axiosHttpPost } from '../../../assets/js/axios'
    export default {
        computed: {
            // company() { 
            //     return store.searchData.orgName
            // },
        },
        watch: {
            // company(val, oldValue) {
            //     store.company.forEach((item) => {
            //         if(val == item.label) {
            //             store.searchBoilerHouse = item.children
            //         }
            //     })
            // }
        },
        data() {
            return {
                store: store
            }
        },
        methods: {
            getOptions() {
                // let url = doMain.base + PositionProtocal.listTree.rest
                // let request = PositionProtocal.listTree.request
                // store.searchCompany = []
                // // store.searchBoilerHouse = []
                // axiosHttpPost(this, url, request, (res) => {
                //     let result = res.data.result
                //     // this.organizationTree[0].children = res.data.result
                //     console.log('input');
                //     console.log(res);
                //     result.forEach((item) => {
                //         store.searchCompany.push({ label: item.label, children: item.children })
                //     })
                //     console.log(store.searchCompany);
                //     // console.log(store.listPosition);
                // })
                let url = doMain.base + OrganizationProtocal.list.rest
                let request = OrganizationProtocal.list.request
                request.rows = 10000
                store.searchCompany = []
                axiosHttpPost(this, url, request, (res) => {
                    if(res.data.length!= 0 && res.data.status == 'OK') {
                        let result = res.data.result.list
                        // this.organizationTree[0].children = res.data.result
                        // console.log('input');
                        // console.log(res);
                        result.forEach((item) => {
                            store.searchCompany.push({ value: item.name })
                        })
                    }
                    // console.log(store.searchCompany);
                })
                let url2 = doMain.base + BoilerhouseProtocal.list.rest
                let request2 = BoilerhouseProtocal.list.request
                request2.rows = 10000
                store.searchBoilerHouse = []
                axiosHttpPost(this, url2, request2, (res) => {
                    console.log(res);
                    if(res.data.length!= 0 && res.data.status == 'OK') {
                        let result = res.data.result.list
                        result.forEach((item) => {
                            store.searchBoilerHouse.push({ value: item.name })
                        })
                    }   
                })
            },
            // getHeatOrigin(val) {
            //     store.searchBoilerHouse = [];
            //     store.company.forEach((item) => {
            //         if(val == item.label) {
            //             // console.log(item.children);
            //             item.children.forEach((item) => {
            //                 store.searchBoilerHouse.push({ label: item.label })
            //             })
            //         }
            //     })
            // },
            handleSelectCompany(val) {
                store.searchData.boilerHouseName = null
                this.getHeatOrigin(val)
            },
            querySearchBoilerHouse(queryString, cb) {
                var restaurants = store.searchBoilerHouse;
                // console.log(store.options);
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            querySearchCompany(queryString, cb) {
                var restaurants = store.searchCompany;
                // console.log(store.options);
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
        },
        created() {
            this.getOptions();
        }
    }
</script>
<style scoped>
#FilterT .el-form-item{
  display: inline-block;
}
#FilterT .el-input{
  width: 180px;
}
#FilterT .el-select{
  width: 180px;
}
</style>

