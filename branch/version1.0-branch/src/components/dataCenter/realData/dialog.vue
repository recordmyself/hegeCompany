<template>
  <div id="dialogArea">
    <el-dialog
    title="提示"
    :visible.sync="store.dialogVisible"
    width="60%">
      <el-table
        :data="store.tableData"
        border
        stripe=""
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
      </el-table>
      <div id="paging">
        <Paging  @tabView='tabView'  ref='getTotal'/>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { store } from './store'
import { Paging } from '../../base/paging'
import bus from '../../base/bus'
export default {
  components:[
    Paging
  ],
  data(){
    return {
      store
    }
  },
  methods:{
    getTotal(){
      this.$refs.getTotal.setTotal()
    },
    tabView(){
      console.log(1);
    }
  },
  mounted(){
    bus.$on('dia',()=>{
      this.tabView();
    })
  }
}
</script>
<style scoped>
#paging{
  height: 45px;
  line-height: 45px;
}
</style>
