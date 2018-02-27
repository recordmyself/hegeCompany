<template>
  <div id="dialog">
    <el-dialog
      :visible.sync="store.dialogVisible"
      :before-close="handleClose" width="800px">
      <diaView />
    </el-dialog>
  </div>
</template>
<script>
import { store } from './store'
import diaView from './dialogView.vue'
export default {
  components:{
    diaView
  },
  data(){
    return {
      store
    }
  },
  methods: {
    handleClose(){
      this.store.dialogVisible = false;
    }
  },
}
</script>
<style scoped>

</style>
