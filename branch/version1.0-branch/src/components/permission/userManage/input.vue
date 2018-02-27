<template>
  <div class="inputArea">
    <el-form :model="store.searchData" label-position="right" label-width="">
      <el-row>
          <el-col :span="8" class="nearLeft">
          <el-form-item label="创建者" label-width="80px">
              <el-input  placeholder="请输入创建者" size="small" v-model.trim="store.searchData.createByName"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="9" class="nearLeft" >
              <el-form-item label="创建时间"  label-width="80px">
                <el-date-picker
                  v-model="store.searchData.createDate"
                  size="small"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
          </el-col>
          <el-col :span="7" class="nearLeft" >
              <el-form-item label="有效期"  label-width="90px" style="margin-left:-10px;">
                <el-date-picker
                  v-model="store.searchData.endDate2"
                  size = "small"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <label style="font-size:12px;color:#5a5e66;">之前</label>
          </el-col>
      </el-row>
      <el-row >
          <el-col :span="8" class="nearLeft">
          <el-form-item label="直属机构" label-width="80px">
              <el-input  placeholder="请输入直属机构" size="small" v-model.trim="store.searchData.orgName"></el-input>
          </el-form-item>
          </el-col>
          <!-- <el-col :span="8" class="nearLeft" >
              <el-form-item label="登录时间" label-width="80px" >
                <el-date-picker
                  v-model="store.searchData.lastLoginTime"
                  size="small"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
          </el-col> -->
           <el-col :span="9"  class="nearLeft">
              <el-form-item label="用户状态" label-width="80px" >
                <!-- style="margin-left:165px;" -->
                   <el-select clearable size="small" v-model="store.searchData.status" filterable placeholder="请选择用户状态">
                      <el-option v-for="item in store.statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="7"  class="nearLeft">
              <el-form-item label="角色名称" label-width="80px">
                   <el-select clearable size="small" v-model="store.searchData.roleName" filterable placeholder="请选择">
                      <el-option v-for="item in store.roleNameOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </el-form-item>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="8" class="nearLeft">
          <el-form-item  label-width="80px" label="用户名称">
              <el-input  placeholder="请输入用户名称" size="small" v-model.trim="store.searchData.userName"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="8"  class="nearLeft">
              <el-form-item label-width="80px" label="用户账号">
                  <el-input  placeholder="请输入用户账号" size="small" v-model.trim="store.searchData.account"></el-input>
              </el-form-item>
          </el-col>
          
      </el-row>
             
    </el-form>
  </div>
</template>
<script>
import { store } from './store'

export default {
  data() {
    return {
      store: store
    }
  },
  methods: {

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
.nearLeft .el-form-item {margin-bottom:5px;}
</style>
