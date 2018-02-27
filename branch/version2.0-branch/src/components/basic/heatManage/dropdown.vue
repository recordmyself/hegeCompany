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
    // import { doMain.base } from '../../../service/ip'
    import { doMain } from '../../../protocal/url'
    // import { organization } from "../../../service/backstageService";
    import { OrganizationProtocal } from '../../../protocal/base/OrganizationProtocal'
    // import { PositionProtocal } from "../../../protocal/base/PositionProtocal"
    import { axiosHttpPost } from '../../../assets/js/axios'
    import { store } from "./store";
    import { globalStore } from "../../base/store";    

    export default {
    data() {
      return {
        store,
        globalStore,
        data: []
      };
    },
    methods: {
        handleNodeClick(data,node,self) {
            console.log(data);
            console.log(node);
            console.log(self);
        },
        getOrganization() {
                let url = doMain.base + OrganizationProtocal.listTree.rest
                let request = OrganizationProtocal.listTree.request
                axiosHttpPost(this, url, request, (res) => {
                    console.log('下拉框');
                    console.log(res);
                    this.data = res.data.result
                })
            },
    },
    created() {
        this.getOrganization();
    }
  };
</script>
<style scoped>

</style>
