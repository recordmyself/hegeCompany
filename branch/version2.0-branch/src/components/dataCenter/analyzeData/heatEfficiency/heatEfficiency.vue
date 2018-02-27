<template>
  <div id="heatEfficiency">
    <div id="heatEff_table">
        <table id="tableShow" style="dispaly:inlnie-block">
          <tr>
            <td colspan="6">燃煤锅炉</td>
            <td>燃气锅炉</td>
            <td>燃油锅炉</td>
          </tr>
          <tr>
            <td>额定值</td>
            <td>205 - 207.5</td>
            <td>207.5 - 210</td>
            <td>210 - 212.5</td>
            <td>212.5 - 215</td>
            <td>215 - 217.5</td>
            <td>205 - 215</td>
            <td>205 - 215</td>
          </tr>
          <tr>
            <td>数量</td>
            <td>3</td>
            <td>15</td>
            <td>25</td>
            <td>2</td>
            <td>0</td>
            <td>4</td>
            <td>1</td>
          </tr>
          <tr>
            <td>限定值</td>
            <td>>= 70%</td>
            <td>>= 75%</td>
            <td>>= 80%</td>
            <td>>= 75%</td>
            <td>>= 90%</td>
            <td>>= 80%</td>
            <td>>= 80%</td>
          </tr>
          <tr>
            <td>达标数</td>
            <td>1</td>
            <td>9</td>
            <td>20</td>
            <td>0</td>
            <td>0</td>
            <td>4</td>
            <td>1</td>
          </tr>
          <tr>
            <td>达标率</td>
            <td>33.3%</td>
            <td>60%</td>
            <td>80%</td>
            <td>0%</td>
            <td>0%</td>
            <td>100%</td>
            <td>100%</td>
          </tr>
          <tr>
            <td>总数量</td>
            <td colspan="5">45</td>
            <td>4</td>
            <td>1</td>
          </tr>
          <tr>
            <td>总达标率</td>
            <td colspan="5">75%</td>
            <td>100%</td>
            <td>100%</td>
          </tr>
        </table>
        <div id="dateShow">

        </div>
    </div>
    <div id="Scatter1"></div>
    <div id="Scatter2"></div>
  </div>
</template>
<script>
import $ from 'jquery'
import { createScatter } from '../../../../assets/js/map/createEcharts'
import mySchedule2 from '../../../../assets/js/calendar'
import { store } from '../store'
import '../../../../assets/css/calendar.css'
export default {
  data(){
    return {
      store,
      data:{year: new Date().getFullYear(),month: new Date().getMonth()+1,day: new Date().getDate()}
    }
  },
  methods: {

  },
  create(){

  },
  mounted(){
    setTimeout(function(){
      mySchedule2("#dateShow",(y,m,d)=>{
        console.log(y,m,d);
      })
    },100)

    let _this = this
    setTimeout(function(){
      _this.store.Scatter1 = createScatter('Scatter1',{title: '燃煤锅炉热效率分布图'});
      _this.store.Scatter2 = createScatter('Scatter2',{title: '燃油、气锅炉热效率分布图'});
    },10);
    window.onresize = function() {
      _this.store.Scatter1.resize();
      _this.store.Scatter2.resize();
    }
  }
}
</script>
<style scoped>
#heatEfficiency{
  width: 100%;
  height: 100%;
}
#heatEff_table{
  position: relative;
  width: 100%;
  height:38%;
  padding: 0 15px 0;
}
#tableShow{
  height: 99%;
  width: 60%;
  border:  1px solid #000;
  border-collapse:collapse;
}
#tableShow td{
  width: 12%;
  height: 12%;
  color: black;
  font-size: 12px;
  text-align: center;
}
#heatEff_table tr{
  border: 1px solid #000;
}
#heatEff_table td{
  border: 1px solid #000;
}
#dateShow{
  position: absolute;
  top: 0px;
  right: 50px;
  display: inline-block;
  width: 35%;
  height: 97%;
  border: 1px solid black;
}
#Scatter1{
  width: 100%;
  height: 30%;
  margin-top: 5px;
  background: linear-gradient(to top,#025b6a 0%,#037577 100%) !important
}
#Scatter2{
  width: 100%;
  margin-top: 5px;
  height: 30%;
  background: linear-gradient(to top,#025b6a 0%,#037577 100%) !important
}
</style>
