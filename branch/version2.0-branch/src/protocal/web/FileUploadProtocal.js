// 历史数据
export const FileUploadProtocal = {
  //http://192.168.0.196:8124

	//模板下载   get
	 download: {
	    rest: "/fileupload/download",
	    request: {

	    },
	    response: {
	    	status:"OK",
	    	result:{

	    	}
	    }
	  },

	  //上传
	  upload: {
		    rest: "/fileupload/upload",
		    request: {
		    	pid:null,//最后一级的  position  Id
		    	userId:null,//用户id
		    	city:null,
		    	area:null,
		    	company:null,
		    	boiler:null,
		    },
		    response: {
		    	status:"OK",
		    	result:{

		    	}
		    }
		  },


		  //excel 显示  查看
		  selectExcle: {
			    rest: "/fileupload/selectExcle",
			    request: {
			    	address:null
			    },
			    response: {
			    	status:"OK",
			    	result:{
			    		number:null,//序号
			    		name:null,//名称
			    		project:null,//项目
			    		sourcesData:null, //单位
			    		data:null,//数据来源
			    	}
			    }
			  },

			  //导出excel    get请求
			  downExcle: {
				    rest: "/fileupload/downExcle/",
				    request: {
				    	address:null
				    },
				    response: {
				      status: "OK",
				      result: {}
				    }
				  },	  
}
