<template>
  <div id="paging">
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="size"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { globalStore } from './store'
import $ from 'jquery'
import bus from './bus'
export default {
  data(){
    return {
       size: globalStore.pages.rows,
       total: globalStore.pages.totalRows,
       currentPage: globalStore.pages.page,
    }
  },
  mounted(){
    bus.$on('setTotalSignal',(res) => {
      this.setTotal()
    })
    let _this = this;
     this.$nextTick(function(){
       setTimeout(function(){
          _this.total = globalStore.pages.totalRows;
          _this.currentPage = globalStore.pages.page;
       },200)
     })
  },
  methods: {
    setTotal(){
        this.total = globalStore.pages.totalRows;
        this.currentPage = globalStore.pages.page;
    },
    handleSizeChange(val) {
      globalStore.pages.page = val;
      this.$emit('tabView');
    },
    handleCurrentChange(val){
      globalStore.pages.page = val;
      this.$emit('tabView');
    }
  }
}
</script>
<style scoped>

</style>
