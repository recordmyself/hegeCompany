import $ 　from 'jquery'
import { doMain } from '../../../protocal/url'
import { globalStore } from '../../base/store'
import { RealTimeDataProtocal } from '../../../protocal/web/RealTimeDataProtocal'
import { axiosHttpPost } from '../../../assets/js/axios'
import { createLine } from '../../../assets/js/map/createEcharts'
export function getLineInfo(that, params) {
  var rows = 24;
  // console.log('烟囱编号',params)
  let url = doMain.web + RealTimeDataProtocal.getPa.rest;
  let data = RealTimeDataProtocal.getPa.request
  data.gasSn = params != null?params.gasSn: 0;
  data.rows = rows;
  axiosHttpPost(that, url, data, function (res) {
    // console.log('烟囱数据',res)
    that.store.getPa = createLine("getPa", {
      title: "烟气压力",
      store: res.data.result
    });
  });
   let urlgetTp = doMain.web + RealTimeDataProtocal.getTp.rest;
   let datagetTp = RealTimeDataProtocal.getTp.request
   datagetTp.gasSn = params != null?params.gasSn: 0;
   datagetTp.rows = rows;
   axiosHttpPost(that, urlgetTp, datagetTp, function(res) {
     that.store.getTp = createLine("getTp", {
       title: "烟气温度",
       store: res.data.result
     });
   });
   let urlgetFlow = doMain.web + RealTimeDataProtocal.getFlow.rest;
   let datagetFlow = RealTimeDataProtocal.getFlow.request
   datagetFlow.gasSn = params != null?params.gasSn: 0;
   datagetFlow.rows = rows
   axiosHttpPost(that, urlgetFlow, datagetFlow, function(res) {
     that.store.getFlow = createLine("getFlow", {
       title: "烟气流速",
       store: res.data.result
     });
   });
   let urlgetOxO2 = doMain.web + RealTimeDataProtocal.getOxO2.rest;
   let datagetOxO2 = RealTimeDataProtocal.getOxO2.request
   datagetOxO2.gasSn = params != null?params.gasSn: 0;
   datagetOxO2.rows = rows;
   axiosHttpPost(that, urlgetOxO2, datagetOxO2, function(res) {
     that.store.getOxO2 = createLine("getOxO2", {
       title: "烟气含氧量",
       store: res.data.result
     });
   });
   let urlgetNoxCt = doMain.web + RealTimeDataProtocal.getNoxCt.rest;
   let datagetNoxCt = RealTimeDataProtocal.getNoxCt.request
   datagetNoxCt.gasSn = params != null?params.gasSn: 0;
   datagetNoxCt.rows = rows;
   axiosHttpPost(that, urlgetNoxCt, datagetNoxCt, function(res) {
     that.store.getNoxCt = createLine("getNoxCt", {
       title: "Nox折算浓度",
       store: res.data.result
     });
   });
   let urlgethdy = doMain.web + RealTimeDataProtocal.gethdy.rest;
   let datagethdy = RealTimeDataProtocal.gethdy.request
   datagethdy.gasSn = params != null?params.gasSn: 0;
   datagethdy.rows = rows;
   axiosHttpPost(that, url, data, function(res) {
     that.store.gethdy = createLine("gethdy", {
       title: "烟气湿度",
       store: res.data.result
     });
   });
   let urlgetppm = doMain.web + RealTimeDataProtocal.getppm.rest;
   let datagetppm = RealTimeDataProtocal.getppm.request
   datagetppm.gasSn = params != null?params.gasSn: 0;
   datagetppm.rows = rows;
   axiosHttpPost(that, urlgetppm, datagetppm, function(res) {
     that.store.getppm = createLine("getppm", {
       title: "Nox实测PPM浓度",
       store: res.data.result
     });
   });
   let urlgetqltppm = doMain.web + RealTimeDataProtocal.getqltppm.rest;
   let datagetqltppm = RealTimeDataProtocal.getqltppm.request
   datagetqltppm.gasSn = params != null?params.gasSn: 0;
   datagetqltppm.rows = rows;
   axiosHttpPost(that, urlgetqltppm, datagetqltppm, function(res) {
     that.store.getqltppm = createLine("getqltppm", {
       title: "Nox标态质量浓度",
       store: res.data.result
     });
   });
   let urlgetarea = doMain.web + RealTimeDataProtocal.getarea.rest;
   let datagetarea = RealTimeDataProtocal.getarea.request
   datagetarea.gasSn = params != null?params.gasSn: 0;
   datagetarea.rows = rows;
   axiosHttpPost(that, urlgetarea, datagetarea, function(res) {
     that.store.getarea = createLine("getarea", {
       title: "烟道截面积",
       store: res.data.result
     });
   });
   let urlgetssflow = doMain.web + RealTimeDataProtocal.getssflow.rest;
   let datagetssflow = RealTimeDataProtocal.getssflow.request
   datagetssflow.gasSn = params != null?params.gasSn: 0;
   datagetssflow.rows = rows;
   axiosHttpPost(that, urlgetssflow, datagetssflow, function(res) {
     that.store.getssflow = createLine("getssflow", {
       title: "标态烟气流量",
       store: res.data.result
     });
   });
   let urlgettmflow = doMain.web + RealTimeDataProtocal.gettmflow.rest;
   let datagettmflow = RealTimeDataProtocal.gettmflow.request
   datagettmflow.gasSn = params != null?params.gasSn: 0;
   datagettmflow.rows = rows;
   axiosHttpPost(that, urlgettmflow, datagettmflow, function(res) {
     that.store.gettmflow = createLine("gettmflow", {
       title: "热态烟气流量",
       store: res.data.result
     });
     window.onresize = function() {
       that.store.getPa.resize();
       that.store.getTp.resize();
       that.store.getFlow.resize();
       that.store.getOxO2.resize();
       that.store.getNoxCt.resize();
       that.store.gethdy.resize();
       that.store.getppm.resize();
       that.store.getqltppm.resize();
       that.store.getarea.resize();
       that.store.getssflow.resize();
       that.store.gettmflow.resize();

     };
   });

}
