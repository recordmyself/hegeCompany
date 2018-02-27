<template>
  <div id="main">

    <!-- <div id="Dropdown">
      <el-dropdown trigger="click" >
      <el-button type="primary" size="small" :disabled="store.listLoading">
      组织机构<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown" style="width:200px;">
        <Group ref="updateOrg" />
      </el-dropdown-menu>
    </el-dropdown>

    </div> -->
    <!-- 引入按钮 -->

    <!-- 表格 -->
    <!-- <el-row>
      <el-col :span="5">
        <div id="organization">
            <h4>组织机构列表</h4>
        </div>
    </el-col> -->
    <!-- <el-col :span="19"> -->
      <div id="FilterT">
          <InputArea />
      </div>
    <!-- </el-col> -->
    <!-- </el-row> -->
    <div id="ButtonT">
      <ButtonArea />
    </div>
     <div id="tableT">
        <TableArea @tabView = 'tabView'/>
      </div>
      <div id="paging">
        <Pading @tabView = 'tabView' ref='getTotal' />
    </div>
    <div id="dialogT">
        <DialogArea  @tabView = 'tabView'/>
    </div>
  </div>
</template>
<script>
//引入子组件
import InputArea from './input.vue'
import ButtonArea from './button.vue'
import TableArea from './table'
import DialogArea from './dialog'
import Pading from "../../../components/base/paging";
import Dropdown from "./dropdown"
import boilerMap  from './component/boilerMap'
// import Group from '../../base/organization'

// 引入协议
// import { doMain.base,urlApiC } from '../../../service/ip'
import { doMain } from '../../../protocal/url'
// import { boilerHouse } from "../../../service/backstageService";
import { BoilerhouseProtocal } from "../../../protocal/base/BoilerHouseProtocal"
import { axiosHttpPost } from '../../../assets/js/axios'

// 引入仓库
import { store } from "./store";
import { globalStore } from "../../base/store";
// 引入event bus
import bus from '../../base/bus'

//引入共有函数
import { findButtonList } from '../../../assets/js/findButtonList'
import { resetCondition } from './event'
export default {
  components: {
      InputArea,
      ButtonArea,
      TableArea,
      DialogArea,
      Pading,
      // Dropdown,
      // Group,
      boilerMap
  },
  computed: {
      // tableData() {
      //     return store.tableData
      // }
  },
  watch: {
      // tableData(newValue, oldValue) {
      //     if(this.$refs.updateOrg) {
      //         // console.log('执行了');
      //         // console.log(this.$refs.updateOrg);
      //         this.$refs.updateOrg.getOrganization()
      //     }
      //     this.$refs.updateOrg.getOrganization()
      // }
  },
  data() {
    return {
        store,
        globalStore: globalStore
    }
  },
  methods: {
    //重置选择区数据
    init() {
      bus.$emit('tableSignal', 'clearSelection')
    },
    getTotal() {
      bus.$emit('setTotalSignal')
    },
    //页面数据重载/加载/查询
    tabView() {
      store.listLoading = true;
      let request =  BoilerhouseProtocal.list.request
      // console.log(request);
      request = store.searchData;
      request.page = globalStore.pages.page;
      request.rows = globalStore.pages.rows;
      let _this = this;
      // console.log(request);
      axiosHttpPost(this, doMain.base + BoilerhouseProtocal.list.rest, request,(res) => {
            // console.log(res);
            if(res.data.length != 0) {
                store.tableData = res.data.result.list;
                globalStore.pages.totalRows = res.data.result.totalRows;
            }else {
                store.tableData = [];
                globalStore.pages.totalRows = 0;
            }
            store.listLoading = false;
            _this.getTotal();
          })
    },
    //删除
    remove(type) {
      let request = BoilerhouseProtocal.remove.request
      if(type == 'removeSingle') {
          request.id = globalStore.singleId
      }
      axiosHttpPost(this,doMain.base + BoilerhouseProtocal.remove.rest,request,(res) => {
                      console.log('打印删除');
                      console.log(res);
                      if(res.data.status == 'OK') {
                          this.$message({ message: '删除成功', type: 'success' })
                          this.tabView()
                      }else {
                          this.$message({ message:res.data.message, type: 'error' })
                      }
                  })

    },
    busHaveData() {
        let menuList = this.globalStore.menuList
        if(menuList.length == 0) {
            bus.$on('haveData', () => {
                findButtonList('基础信息', '热源管理', this)
            })
        }else {
            findButtonList('基础信息', '热源管理', this)
        }
    },
    busBaseSignal() {
      bus.$on('baseSignal', (res)=> {
          switch(res) {
            case 'search':
              this.tabView();
              break;
            case 'reload':
              this.tabView();
              break;
            case 'removeSingle':
              console.log('进来了一次');
              this.remove('removeSingle');
              break;
          }
      })
    }
  },
  mounted() {
    resetCondition()
    //进入页面进行初次加载
    this.tabView()
    this.busHaveData()
    this.busBaseSignal()
  }
}
</script>
<style scoped>
#main{
  width: 100%;
  height: 100%;
  background: #FFF;
  position: relative;
}
#FilterT::before,#FilterT::after {
    content: '';
    display: block;
    height: 0;
    visibility: hidden;
    clear: both;
}
#ButtonT{
  margin: 0px auto 10px;
  padding-left: 10px;
}
#paging {
  text-align: center;
  margin-top: 10px;
  height: 40px;
  line-height: 40px;
}
#Dropdown {
  /* display: inline-block; */
  position: absolute;
  right: 308px;
  top: 107px;
  width: 80px
}
#organization {
  height: 100px;
  overflow: hidden;
  border:1px solid #ccc;
  border-radius: 4px;
}
#organization h4 {
  color:#5a5e66;
}
</style>
