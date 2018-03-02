<template>
  <div id="tableArea">
    <el-table
      ref="multipleTable"
      :data="store.tableData"
      @selection-change="handleSelectionChange" 
      v-loading = "store.listLoading"
      element-loading-text = "数据正在加载"
      :header-row-style="{color: 'black'}"
      highlight-current-row
      max-height="505"
      :style="store.listLoading?'height:492px;':''"
      stripe
      border
      fit
      size="small">
            <el-table-column type="selection" width="40" align="center">
          </el-table-column>
          <el-table-column type="index"  label="序号" width="50" align="center">
          </el-table-column>
          <el-table-column prop="createDate" label="创建时间" width="120" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.createDate | formatDate}}</span>
                </template>
          </el-table-column>
          <el-table-column prop="userName" label="用户名称" width="120" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.userName}}</span>
                </template>
              <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
          </el-table-column>
          <el-table-column prop="account" label="登录账号" width="120" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.account}}</span>
                </template>
          </el-table-column>
          
          <el-table-column prop="createByName" label="创建人" width="100" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.createByName }}</span>
                </template>
          </el-table-column>
          <el-table-column prop="account" label="分配角色" width="120" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.roleName}}</span>
                </template>
          </el-table-column>
          <!-- <el-table-column prop="account" label="登录密码" width="120" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.password}}</span>
                </template>
          </el-table-column> -->
          <el-table-column prop="mobile" width="130" label="联系电话" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.account!='admin'">{{scope.row.mobile}}</span>
                </template>
          </el-table-column>
          <el-table-column prop="email" min-width="150" label="电子邮箱" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.account!='admin'">{{scope.row.email}}</span>
                </template>
          </el-table-column>
          <el-table-column label="所属机构" min-width="180" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.orgName}}</span>
                </template>
          </el-table-column>
          <el-table-column label="有效期" min-width="180" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.account!='admin'">{{scope.row.startTime | formatDate}} 至 {{scope.row.endTime | formatDate}}</span>
                </template>
          </el-table-column>
          <el-table-column prop="status" label="会员状态" width="100" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.account!='admin'">{{ scope.row.statusView}}</span>
                     <!-- | formatStatus -->
                </template>
          </el-table-column>
           <el-table-column prop="isActivation" label="激活状态" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.isActivation | formatVip}}</span>
                </template>
          </el-table-column> 
          
          <el-table-column prop="memo" label="备注"  min-width="130" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.memo}}</span>
                </template>
          </el-table-column>
          <el-table-column width="100" label="操作" align="center" fixed="right">
              <template slot-scope="scope">
                  <div class="operate">
                      <el-button 
                      v-for="item in store.buttonListArr" 
                      :key="item.id" 
                      v-if="item.isDynamic == true && scope.row.account != globalStore.userInfo.account && scope.row.account != 'admin'" 
                      @click="handleFunctionName(item,scope.row)">
                            <i :title="item.name" :class="'iconfont' + ' ' + item.icon"></i>
                      </el-button>
                      <!-- scope.row.companyId != 0 &&  -->
                      <!-- <el-button @click="singleDelete(scope.row)"><i title="删除" class="iconfont icon-bin"></i></el-button> -->
                      <!-- <el-button @click="singleChange(scope.row)"><i title="修改" class="iconfont icon-wrench"></i></el-button> -->
                  </div>                        
              </template>
          </el-table-column>
      </el-table>
  </div>
</template>
<script>
import { store } from './store'
import { formatDate } from '../../../assets/js/changeDate'
import bus from '../../base/bus'
import { doMain } from "../../../protocal/url"
// import { user } from "../../../service/backstageService";
import { UserProtocal } from "../../../protocal/base/UserProtocal";
import { globalStore } from "../../base/store";
import { axiosHttpPost } from '../../../assets/js/axios'

export default {
    filters: {
        formatDate(time) {
            let date = new Date(time)
            return formatDate(date, 'yyyy-MM-dd')
        },
        formatVip(state) {
            if(state) {
                return '已激活'
            }else{
                return '未激活'
            } 
        },
        formatStatus(status) {
            const mapStatus = {
                "UNREGISTERED": '未注册',
                "BLOCK_UP": '停用',
                "REGISTERED": '已注册',
                "EXPIRE": '已过期'
            }
            return mapStatus[status]
        }
    },    
    data() {
        return {
            store:store,
            globalStore
        //    dialogFormVisible: false
        }
    },
    methods: {
        handleSelectionChange(val) {
            console.log(val);
            store.multipleSelection = [];
            val.forEach((item) => {
                let param = {};
                for(var k in item) {
                    param[k] = item[k]
                }
                store.multipleSelection.push(param)
            })
            console.log(store.multipleSelection);
        },
        singleModify(row) {
            console.log(row);
            store.roleIdArr = []
            let request = UserProtocal.get.request
            request.id = row.id
            
            axiosHttpPost(this,doMain.base + UserProtocal.get.rest,request, (res) => {
                    console.log(res);
                    // console.log(row);
                    // store.form = row
                    for(let k in row) {
                        store.form[k] = row[k]
                    }
                    
                    store.form.roleIdList = res.data.result[0].roleIdList
                    console.log(store.form.roleIdList);
                    console.log('到这里了');
                    if(store.form.roleIdList && store.form.roleIdList.length!=0 ) {
                        store.roleIdArr = store.form.roleIdList
                    }
                    
                    if(!row.startTime || !row.endTime) {
                        return false;
                    }
                    
                    let dayStart = new Date(row.startTime).getDate()<10? '0' + new Date(row.startTime).getDate(): new Date(row.startTime).getDate()
                    let dayEnd = new Date(row.endTime).getDate()<10? '0' + new Date(row.endTime).getDate(): new Date(row.endTime).getDate()
                    store.form.startDate.time = new Date(parseFloat(row.startTime)).getFullYear()+'-'+ (parseFloat(new Date(row.startTime).getMonth())+1) + '-' + dayStart
                    store.form.endDate.time = new Date(parseFloat(row.endTime)).getFullYear()+'-'+ (parseFloat(new Date(row.endTime).getMonth())+1) + '-' + dayEnd
                    store.initStartTime = store.form.startDate.time
                    store.initEndTime = store.form.endDate.time
                    this.store.dialogFormVisible  = true;
                    store.form.roleIdList = res.data.result[0].roleIdList
                })
        },
        singleDelete(row) {
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                store.singleId = row.id
                bus.$emit('baseSignal', 'removeSingle')
            })
        },
        handleFunctionName(item, row) {
            let name = item.url.split('/')[item.url.split('/').length-1]
            eval('this.' + name + '(row);')
        }
    }

}
</script>
<style scoped>
    .operate { display:flex;flex-wrap: nowrap;justify-content: center; }
  .operate > button{width: 22px;height: 22px;padding: 1px 2px;border: none; }
  .operate > button:nth-of-type(1) {background: #23c6c8; }
  .operate > button:nth-of-type(2) {background: #ed5565; }
  .operate i { font-size: 14px;color: #fff; }
    .cell>span { font-size:14px; }
</style>
