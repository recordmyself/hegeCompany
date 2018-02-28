// 历史数据
export const GasHistoryProtocal = {
  //http://192.168.0.196:8124
  list: {
    rest: "/gashistory/list",
    request: {
      page: 1,
      rows: 20,
      orderBy: "id",
      sc: "ASC",
    },
    response: {
    	
    	status:"OK",
    	result:[{
			    		 
			      id: null,
			      oxO2: null, //烟气含氧量
			      noxCt: null, //Nox折算浓度
			      flow: null, //烟气流速
			      stress: null, //烟气压力
			      tp: null, //烟气温度
			      hdy: null, //烟气湿度
			      ppm: null, //Nox实测PPM浓度
			      qltppm: null, //Nox标态质量浓度
			      area: null, //烟道截面积
			      ssflow: null, //标态烟气流量
			      tmflow: null, //热态烟气流量
			      trackId: null, //标识id
			      gasName: null, //烟气名称
			      revTime: null, //时间
			      year: null, //年
			      month: null, //月
			      day: null, //天
    	}]
    }
  },
  listSelect: {
	    rest: "/gashistory/listSelect",
	    request: {
	      page: 1,
	      rows: 20,
	      orderBy: "id",
	      sc: "ASC",

	      startTime: null,
	      endTime: null,
	      siteId: null, //锅炉房Id
	      gasId: '', //烟气Id
	      name: null, //字段名城
	      upLine: null, //上线
	      downLine: null, //下线
	    },
	    response: {
	    	
	    	status:"OK",
	    	result:[{
				    		 
				      id: null,
				      oxO2: null, //烟气含氧量
				      noxCt: null, //Nox折算浓度
				      flow: null, //烟气流速
				      stress: null, //烟气压力
				      tp: null, //烟气温度
				      hdy: null, //烟气湿度
				      ppm: null, //Nox实测PPM浓度
				      qltppm: null, //Nox标态质量浓度
				      area: null, //烟道截面积
				      ssflow: null, //标态烟气流量
				      tmflow: null, //热态烟气流量
				      trackId: null, //标识id
				      gasName: null, //烟气名称
				      revTime: null, //时间
				      year: null, //年
				      month: null, //月
				      day: null, //天
	    	}
	    	]
	    }
	  }
}
