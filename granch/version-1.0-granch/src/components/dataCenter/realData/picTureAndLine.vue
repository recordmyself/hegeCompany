<template>
  <div id="imageShow">
      <div class="imageShow_top">
        <div class="top_left">
          <img src="../../../assets/image/realData/realdataImage.png" alt="">
        </div>
        <div class="top_middle">
            <div class="middle_title">
              <div>站点：{{store.realdata.gasName}}</div>
            </div>
            <div class="middle">
              <div class="middle_show">
                <div id="contImg">
                  <img src="../../../assets/image/realData/13.png" alt="">
                </div>
                <div id="contText">
                  <div id="contData">{{store.realdata.oxO2 || 0}}</div>
                  <div id="contName">烟气含氧量（%）</div>
                </div>
              </div>
              <div class="middle_show">
                <div id="contImg">
                  <img src="../../../assets/image/realData/12.png" alt="">
                </div>
                <div id="contText">
                  <div id="contData">{{store.realdata.hdy || 0}}</div>
                  <div id="contName">烟气湿度（%）</div>
                </div>
              </div>
            </div>
            <div class="middle">
              <div class="middle_show">
                <div id="contImg">
                  <img src="../../../assets/image/realData/10.png" alt="">
                </div>
                <div id="contText">
                  <div id="contData">{{store.realdata.stress || 0}}</div>
                  <div id="contName">烟气压力（%）</div>
                </div>
              </div>
              <div class="middle_show">
                <div id="contImg">
                  <img src="../../../assets/image/realData/11.png" alt="">
                </div>
                <div id="contText">
                  <div id="contData">{{store.realdata.flow || 0}}</div>
                  <div id="contName">烟气流速（%）</div>
                </div>
              </div>
            </div>
        </div>
      </div>
  </div>
</template>
<script>
import { store } from "./store";
import { doMain } from '../../../protocal/url'
import { RealTimeDataProtocal } from '../../../protocal/web/RealTimeDataProtocal'
import { createLine } from '../../../assets/js/map/createEcharts'
import { axiosHttpPost } from '../../../assets/js/axios'
export default {
  data() {
    return {
      store
    };
  },
  methods: {
  },
  created(){
  },
  mounted(){
  }
};
</script>
<style scoped>
#imageShow {
  width: 100%;
  height: 100%;
}
#imageShow .imageShow_top {
  width: 100%;
  height: 100%;
  background: #181f29;
}
#imageShow .top_left {
  float: left;
  height: 100%;
  width: 450px;
}
#imageShow .top_left img {
  width: 100%;
  height: 100%;
}
#imageShow .top_middle {
  float: left;
  height: 100%;
  padding: 2% 0 0 15%;
  box-sizing: border-box;
  width: calc(100% - 450px);
  background: #FFF;
}
#imageShow .middle_title {
  height: 30px;
  line-height: 40px;
  font-size: 18px;
  color: black;
}
#imageShow .middle {
  height: 40%;
  width: 100%;
  padding-top: 5%;
  box-sizing: border-box;
}
#imageShow .middle_show {
  float: left;
  width: 200px;
  height: 100%;
}
#contImg {
  float: left;
  padding-top: 10px;
  text-align: right;
  width: 25%;
  height: 100%;
}
#contText {
  width: 75%;
  height: 100%;
}
#contData {
  padding-left: 60px;
  font-size: 35px;
  color: #43d060;
}
#contName {
  font-size: 12px;
  color: #868383;
}
#imageShow .top_right {
  float: left;
  height: 100%;
  width: 15%;
}
</style>
