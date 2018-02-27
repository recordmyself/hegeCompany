<template>
    <div class="inputArea">
        <el-form :model="store.searchData" label-width="80px" label-position="right">
            <!-- <el-col :span="10"> -->
                <!-- <el-form-item label="创建时间" style="margin-bottom:10px;">
                        <el-date-picker
                            v-model="store.searchData.createDate"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            size="small"
                            >   
                        </el-date-picker>
                </el-form-item> -->
                <el-form-item label="公司名称"  style="margin-bottom:10px;">
                    <el-input clearable v-model="store.searchData.name" size="small" placeholder="请输入公司名称"></el-input>
                </el-form-item>
                <el-form-item label="公司状态" style="margin-bottom:18px;">
                    <el-select clearable v-model="store.searchData.state" size="small" placeholder="请选择">
                        <el-option key="UNREGISTERED" value="UNREGISTERED" label="未启用"></el-option>
                        <el-option key="REGISTERED" value="REGISTERED" label="已启用"></el-option>
                        <el-option key="BLOCK_UP" value="BLOCK_UP" label="已停用"></el-option>
                        <el-option key="EXPIRE" value="EXPIRE" label="已过期"></el-option>
                    </el-select>
                </el-form-item>
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
</style>

