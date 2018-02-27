<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',

}
</script>

<style>
#app { font-family: 'Avenir', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; width: 100%; height: 100%; min-width: 1280px; min-height: 800px; /* background: #0d111a */ background: #FFF; }
.forClearFix .el-dialog__body::before,
.forClearFix .el-dialog__body::after{ content: ''; display: block; height: 0; visibility: hidden; clear: both; }
.grouptree{ padding:10px;border: 1px solid #ccc; height: 100%;border-radius: 2px;width:250px;}
.tree{ margin-bottom: 20px; }
.clearfix::before,.clearfix::after{ content: ''; display: block; height: 0; visibility: hidden; clear: both; }
.unit-control .el-input-group__append { padding:0; text-align: center; width:30px!important; box-sizing:border-box; background-color:#fff; }
.map .el-dialog { height: 600px; }
.map .el-dialog  .el-dialog__body{ height: 500px; }
#ButtonT .el-button{ width:80px; }
.admin-map .el-dialog { height: 600px; }
.admin-map .el-dialog  .el-dialog__body{ height: 500px; }
/* .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content, .is-current>.el-tree-node__content{ background-color:#d6d6d6; } */
/* @font-face {
  font-family: 'iconfont';
  src: url('./font/iconfont.eot');
  src: url('./font/iconfont.eot?#iefix') format('embedded-opentype'),
  url('./font/iconfont.woff') format('woff'),
  url('./font/iconfont.ttf') format('truetype'),
  url('./font/iconfont.svg#iconfont') format('svg');
}
.iconfont{
  font-family:"iconfont" !important;
  font-size:16px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  background: #409EFF;
  border-radius: 5px;
  padding: 5px 3px;
} */

</style>
