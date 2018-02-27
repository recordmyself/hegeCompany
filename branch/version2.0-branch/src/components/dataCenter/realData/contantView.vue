<template>
  <div id="lineImage">
     <router-view></router-view>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped>
#lineImage{
  width: 100%;
  height: 100%;
}
#lineImage div{
  float: left;
  width: 32%;
  height:16.6%;
  margin: 2px 3px 2px 1px;
}
</style>
