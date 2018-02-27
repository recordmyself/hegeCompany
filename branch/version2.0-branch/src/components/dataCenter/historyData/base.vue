<template>
  <div id="Base">
    <div class="headTop">
      <span style="font-size: 14px">历史数据查询</span>
    </div>
    <!-- 引入输入文本 -->
    <div id="FilterT">
      <InputArea />
    </div>
    <!-- 引入按钮 -->
    <div id="ButtonT">
      <ButtonArea @tabView='tabView' />
    </div>
    <!-- 表格 -->
    <div id="tableT">
      <TableArea />
    </div>
    <!-- 分页 -->
    <div id="paging">
      <Pading @tabView='tabView'  ref='getTotal'/>
    </div>
  </div>
</template>
<script>
// 引入子组件
import InputArea from "./input.vue";
import ButtonArea from "./button.vue";
import TableArea from "./table";
import Pading from "../../base/paging.vue";
import bus from "../../base/bus";
// 引入协议
import { axiosHttpPost } from "../../../assets/js/axios";
import { store } from "./store";
import { globalStore } from "../../base/store";
import { doMain } from "../../../protocal/url";
import { GasHistoryProtocal } from "../../../protocal/web/GasHistoryProtocal";
import { PositionProtocal } from "../../../protocal/web/PositionProtocal";
import { BoilerHouserProtocal } from "../../../protocal/web/BoilerHouserProtocal";
import { findButtonList } from "../../../assets/js/findButtonList";
export default {
  components: {
    InputArea,
    ButtonArea,
    TableArea,
    Pading
  },
  data() {
    return {
      store,
      globalStore
    };
  },
  methods: {
    getTotal() {
      this.$refs.getTotal.setTotal();
    },
    // 请求数据
    tabView() {
      let _this = this;
      let url = doMain.web + GasHistoryProtocal.listSelect.rest;
      let data = GasHistoryProtocal.listSelect.request;
      globalStore.loading = true;
      if (store.date != null) {
        data.startTime = new Date(store.date[0]).getTime();
        data.endTime = new Date(store.date[1]).getTime();
      } else {
        data.startTime = null;
        data.endTime = null;
      }
      data.name = this.store.form.nameType;
      data.siteId = this.store.form.boilerId;
      data.upLine = this.store.form.max;
      data.downLine = this.store.form.min;
      data.page = this.globalStore.pages.page;
      data.rows = this.globalStore.pages.rows;
      axiosHttpPost(_this, url, data, function(res) {
        if(res.data.status == "FAIL"){
          _this.$message.warning(res.data.message);
          _this.store.tableData =[];
          _this.globalStore.pages.totalRows = 0
        }else{
          _this.store.tableData = res.data.result.list;
          _this.globalStore.pages.totalRows = res.data.result.totalRows;
        }
        _this.globalStore.loading = false;
        _this.getTotal();
      });
    },
    // 监听数值
    watchNumber(){
      if(this.store.form.name == ''){
        this.store.show = true
      }else{
        this.store.show = false
      }
    },
    busHaveData() {
      let menuList = this.globalStore.menuList;
      if (menuList.length == 0) {
        bus.$on("haveData", () => {
          findButtonList("数据中心", "历史数据", this);
        });
      } else {
        findButtonList("数据中心", "历史数据", this);
      }
    }
  },
  created() {
    // 搜索框置空
    this.store.form = {
      name: '',
      nameType: '',
      boileroom:'',
      boiler: '',
      boilerId:'',
      min: '',
      max: ''
    }
    let _this = this;
    let url = doMain.web + BoilerHouserProtocal.getAllBoilerHourse.rest;
    let data = BoilerHouserProtocal.getAllBoilerHourse.request;
    axiosHttpPost(_this, url, data, function(res) {
      _this.store.restrantsS = res.data.result;
    });
  },
  mounted() {
    let _this = this;
    let url = doMain.web + GasHistoryProtocal.list.rest;
    let data = GasHistoryProtocal.list.request;
    axiosHttpPost(this, url, data, res => {
      _this.store.tableData = res.data.result.list;
      _this.globalStore.pages.totalRows = res.data.result.totalRows;
      _this.globalStore.loading = false;
    });
    setInterval(()=>{
      this.watchNumber();
    },1)
    this.busHaveData();
    this.tabView();
  },
  computed: {
    name() {
      return this.store.form.name;
    },
    boileroom() {
      return this.store.form.boileroom;
    },
    boiler() {
      return this.store.form.boiler;
    }
  },
  watch: {
    name(newValue, oldValue) {
      if (newValue == "") {
        this.store.form.nameType = "";
        this.store.form.min = '';
        this.store.form.max = ''
      } else {
        this.store.dataType.forEach(item => {
          if (item.value == newValue) {
            this.store.form.nameType = item.label;
          }
        });
      }
    },
    boileroom(newValue, oldValue) {
      let _this = this;
      this.store.form.boiler = "";
      this.store.form.boilerId = "";
      this.store.restrantsS.forEach(item => {
        if (item.boiler == newValue) {
          let url = doMain.web + BoilerHouserProtocal.getAllGasById.rest;
          let data = BoilerHouserProtocal.getAllGasById.request;
          data.id = item.id;
          axiosHttpPost(_this, url, data, res => {
            _this.store.allStands = res.data.result;
            _this.store.form.boiler = res.data.result[0].name;
          });
        }
      });
    },
    boiler(newValue, oldValue) {
      this.store.allStands.forEach(item => {
        if (item.name == newValue) {
          this.store.form.boilerId = item.siteId;
        }
      });
    }
  }
};
</script>
<style scoped>
#Base {
  width: 100%;
  height: 100%;
  background: #fff;
}
#Base .headTop {
  width: 100%;
  height: 5%;
  max-height: 35px;
  line-height: 35px;
  background: #f8f8f8;
  color: black;
  padding-left: 10px;
  margin-bottom: 10px;
}
#ButtonT {
  margin: 0px auto 10px;
  padding-left: 10px;
}
#paging {
  text-align: center;
  margin-top: 10px;
  height: 40px;
  line-height: 40px;
}
</style>
