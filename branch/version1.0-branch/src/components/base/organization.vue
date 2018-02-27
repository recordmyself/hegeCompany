<template>
        <div>
            <el-tree
                :data="data"
                accordion
                @node-click="handleNodeClick">
            </el-tree>
        </div>
</template>
<script>
    import { urlApiZ } from '../../service/ip'
    import { organization } from '../../service/backstageService';
    // import { store } from "./store";
    import { globalStore } from "./store";
    export default {
    data() {
      return {
        globalStore,
        data: []
      };
    },
    methods: {
        handleNodeClick(data) {
            // console.log(globalStore.saveOrganization);
            globalStore.saveOrganization.organization = data.label;
            globalStore.saveOrganization.parentId = data.parentId
            globalStore.saveOrganization.id = data.id
        },
        getOrganization() {
            this.$api.post( urlApiZ + organization.list.rest, organization.list.request )
                    .then((res) => {
                        console.log('以下是organzation');
                        console.log(res);
                        let result  = res.data.result.list
                        let arr = []
                        for (var i = result.length-1; i >= 0; i--) {
                          var item = result[i]
                        //   console.log(item);
                          if(item.parentId == 0) {
                              arr.push({ label: item.name, id: item.id,parentId:item.parentId,  children: [] })
                              result.splice(i, 1)
                          }
                        }
                        for(var i = result.length-1 ; i >=  0; i --) {
                          var flag = true //假设没有匹配
                          let left = result[i]
                          for(var j = 0; j < arr.length; j++) {
                              let parent = arr[j]
                              if( left.parentId == parent.id ) {
                                  flag = false;
                                  arr[j].children.push({ label: left.name, id: left.id,parentId:left.parentId, children: [] })
                                  result.splice(i, 1)
                                  break;
                              }
                          } 
                        }
                        if(result.length != 0) {
                              for(var z = 0; z < result.length; z ++) {
                                  var origin = result[z]
                                  for(var i = 0; i < arr.length; i++) {
                                    var level1 = arr[i] //第一层
                                    for( var j = 0; j < level1.children.length; j++) {
                                        var level2 = level1[j] //第二层
                                        if(origin.parentId == level2.id) {
                                            level2.children.push({ label: origin.name, id: origin.id,parentId:origin.parentId, children: [] })
                                            break;
                                        }
                                    }
                                    break;
                                }  
                              }
                        }
                        this.data = arr
                        console.log(arr);
                    })
        }
    },
    created() {
        console.log(this.data);
        this.getOrganization();
        globalStore.saveOrganization.organization = null;
        globalStore.saveOrganization.parentId = null;
        globalStore.saveOrganization.id = null;
    }
  };
</script>
<style scoped>

</style>
