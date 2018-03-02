import $ from 'jquery'
export function createLine(idName, params)
{
  // 创建X数据
  var showData = [];
  var showData1 = [];
  var xData = [];
  var yMax = 200;
  var boilerChart = echarts.init(document.getElementById(idName));
  if (params.store.length <= 24) {
    for (let i = 0; i < params.store.length;i++){
      showData.push(params.store[i].realityRatio)
      showData1.push(params.store[i].theoryRatio)
      let nowHour = new Date(params.store[i].revTime).getHours();
      let nowMinute = new Date(params.store[i].revTime).getMinutes();
      nowHour = nowHour > 9 ? nowHour : '0' + nowHour;
      nowMinute = nowMinute > 9? nowMinute: '0' + nowMinute
      xData.push(nowHour + ':' + nowMinute)
    }
  } else {
    for (let i = 0; i < 24;i++){
      showData.push(params.store[i].realityRatio)
      showData1.push(params.store[i].theoryRatio)
      let nowHour = new Date(params.store[i].revTime).getHours();
      let nowMinute = new Date(params.store[i].revTime).getMinutes();
      nowHour = nowHour > 9 ? nowHour : '0' + nowHour;
      nowMinute = nowMinute > 9? nowMinute: '0' + nowMinute
      xData.push(nowHour + ':' + nowMinute)
    }
  }
  console.log(params.store,showData)
  yMax = Math.ceil(Math.max.apply(null,showData)/100)*100 + 100
  // yMax = xData.sort(-1)[0]
  // for (let i = params.store.length - 1; i >0; i--){
  //   console.log(new Date(params.store[i].revTime))
  // }

  // (function getXdate() {
  //   var nowDate = new Date().getMinutes();
  //   var hourAndMin = ''
  //   for (let i = -36; i < 1; i++) {
  //     if (nowDate % 5 != 0) {
  //       hourAndMin = new Date(new Date().getTime() - (nowDate % 5 - i * 5) * 60 * 1000)
  //     } else {
  //       hourAndMin = new Date(new Date().getTime() + i * 5 * 60 * 1000);
  //     }
  //     let hour = hourAndMin.getHours() > 9 ? hourAndMin.getHours() : '0' + hourAndMin.getHours();
  //     let mintues = hourAndMin.getMinutes() > 9 ? hourAndMin.getMinutes() : '0' + hourAndMin.getMinutes();
  //     xData.push(hour + ':' + mintues);
  //   }
  // })();

  var option = {
    title: {
      text: params.title,
      textStyle: {
        //文字颜色
        color: '#FFF',
        //字体风格,'normal','italic','oblique'
        fontStyle: 'normal',
        //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
        fontWeight: 'bold',
        //字体系列
        fontFamily: 'sans-serif',
        //字体大小
        fontSize: 16
      },
      //副标题
      subtext: '烟气效率',
      //副标题文本样式
      subtextStyle: {
        color: '#565c7a',
      },
      left: '10%'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: [
        {
          name: '实际效率',
          textStyle: {
            color: '#FFF'
          }
        },
        {
          name: '理论效率',
          textStyle: {
            fontSize:12,
            color:'#FFF'
          },
          iconStyle: {}
        }
      ],
      right: "8%",
      textStyle: {
        fontSize: '16px'
      }
    },
    grid: {
      y2: '30px'
    },
    xAxis: {
      // type: 'value',
      boundaryGap: false,
      axisLine:{
        lineStyle:{
            color:'#999',
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#555',//网格线颜色
        }
      },
      data: xData
    },
    yAxis: {
      type: 'value',
      boundaryGap: false,
      axisLine:{
        lineStyle:{
            color:'#999',
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#555',//网格线颜色
        }
      },
      axisLabel: {},
      min: '0',
      max: yMax
    },
    series: [
      {
        name: '实际效率',
        type: 'line',
        smooth:true,
        color: ['#11a78c'],
        itemStyle: {
          normal: {
            lineStyle: {
              color: '#11a78c',
            },
            borderColor: '#11a78c'
          }
        },
        data: showData.reverse(),
        markPoint: {
          color: "black"
        },
        markLine: {
          data: [
            {
              type: 'average',
              name: '平均值'
            }
          ]
        }
      }, {
        name: '理论效率',
        type: 'line',
        smooth:true,
        color: ['#6f7fa3'],
        // griend的颜色
        itemStyle: {
          normal: {
            // 折线的颜色
            lineStyle: {
              color: '#6f7fa3',
            },
            // 原点的颜色
            borderColor: '#6f7fa3'
          }
        },
        data: showData1.reverse(),
        markPoint: {},
        markLine: {
          data: [
            {
              type: 'average',
              name: '平均值'
            }
          ]
        }
      }
    ]
  };
  boilerChart.setOption(option);
  return boilerChart;
}
export function createScatter(idName, params) {
  var boilerChart = echarts.init(document.getElementById(idName));
  let option = {
    title: {
      text: params.title,
      left: '2%',
      top: '5px',
      textStyle: {
        color: 'black',
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'axis',
      showDelay: 0,
      color: '#159c56',
      axisPointer: {
        show: false,
        type: 'cross',
        lineStyle: {
          type: 'solid',
          width: 1,
          color: '#FFF'
        }
      },
      zlevel: 1
    },
    grid: {
      x: '5%',
      y: '18%',
      x1: '5%',
      y2: '5%',
      width: '90%',
      height: '70%'
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 100
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      splitLine: {
        show: false
      }
    },
    color:['#159c56'],
    series: [
      {
        name: '热效率(%)',
        type: 'scatter',
        large: true,
        symbolSize: 4,
        data: (function () {
          let d = [];
          for (let i = 0; i < 100; i++) {
            let y = Math.floor(Math.random() * 100)
            d.push([i, y])
          }
          console.log(d)
          return d;
        })()
      }
    ]
  };
  boilerChart.setOption(option)
  return boilerChart;

}
