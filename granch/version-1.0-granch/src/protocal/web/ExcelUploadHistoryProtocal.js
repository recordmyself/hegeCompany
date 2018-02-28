//分析中心数据
export const ExcelUploadHistoryProtocal = {
  //http://192.168.0.196:8124
  list: {
    rest: "/exceluploadhistory/list",
    request: {

    },
    response: {

      status: "OK",
      result: [{
        id: null,
        number:null,//编号
        oldfileName: null, //文件名称
        size: null, //文件的大小
        address: null, //文件地址
        revTime: null, //时间
        companyName: null,
      }]
    }
  },
  listAll: {
    rest: "/exceluploadhistory/listAll",
    request: {
		 unitName:null, //文件名称
		 number:null,//报表编号
		 companyName: null,//上传的单位
		 startTime:null,//开始时间
		 endTime:null,//结束时间

    },
    response: {

      status: "OK",
      result:[ {
        id: null,
        number: null,//编号
        oldfileName: null, //上传的文件名
        fileName: null, //文件名称
        size: null, //文件的大小
        address: null, //文件地址
        revTime: null, //时间
        trackId: null, //标识id
        userName: null, //用户名
        companyName: null,
        state: null, // 1 是正常   2 删除
      }]
    }

  },
  refresh: {
	    rest: "/exceluploadhistory/refresh",
	    request: {
	    		id:null,
	    },
	    response: {

	      status: "OK",
	      result: {

	      }
	    }

	  },
	  //烟囱 信息
	  getSelectByTrackId: {
	    rest: "/exceluploadhistory/getSelectByTrackId",
	    request: {
	    	trackId: null,
	    },
	    response: {
	    	status:"OK",
	    	result:{

	    	gasSn:null,//烟囱 编号
	    	name: null,//烟囱名称
	    	gasId: null,//烟冲编号   （很重要）
	    	companyId: null,//公司id
	    	siteId: null, //锅炉房Id
	    	revTime: null,  //时间
	    	oxO2: null, //烟气含氧量
	    	noxCt: null, //Nox折算浓度
	    	flow: null, //烟气流速
	    	stress: null, //烟气压力
	    	tp: null,//烟气温度
	    	hdy: null, //烟气湿度
	    	ppm: null,//Nox实测PPM浓度
	    	qltppm: null,//Nox标态质量浓度
	    	area: null,//烟道截面积
	    	ssflow: null,//标态烟气流量
	    	tmflow: null,//热态烟气流量

	    	oxO2State: null, //烟气含氧量
	    	noxCtState: null, //Nox折算浓度
	    	flowState: null, //烟气流速
	    	stressState: null, //烟气压力
	    	tpState: null,//烟气温度
	    	hdyState: null, //烟气湿度
	    	ppmState: null,//Nox实测PPM浓度
	    	qltppmState: null,//Nox标态质量浓度
	    	areaState: null,//烟道截面积
	    	ssflowState: null,//标态烟气流量
	    	tmflowState: null,//热态烟气流量
	    	state: null,//状态  0正常   1 低  2中 3 高

	    	}
	    }
	  },

}
