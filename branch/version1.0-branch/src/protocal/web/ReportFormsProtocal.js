export const ReportFormsProtocal = {
 //指标添加
	create: {
	    rest: "/reportforms/create",
	    request: {
	    	name: null,
	    	nameEn: null,
	    	type: null,//long  类型
	    	descr:null,
        list: [{
        		idx: null,
	    		min:null,
	    		max:null
	    	}]

	    },
	    response: {
	      status: "OK",
	      result:
	      {

	      }
	    }
	  },


	  //查询  指标名称
	  selectReport: {
		    rest: "/reportforms/selectReport",
		    request: {

		    },
		    response: {
		      status: "OK",
		      result:
		      [{
		    		 id:null,
		    		 name:null, //指标名称
		    		 nameEn:null,//英文翻译
		    		 type:null,//类型
		    		 desc:null,//备注
		    		 revTime:null,  //时间
		      }]
		    }
		  },


		  //查询  指标具体数值
		  selectrfParameter: {
			    rest: "/reportforms/selectrfParameter",
			    request: {
			    	   id:null,  //指标名称 Id
			    },
			    response: {
			      status: "OK",
			      result:
			     [{
			    	 	idx: null,
			    	  min:null,
			    	  max:null
			      }]
			    }
			  },



			  //修改   指标具体数据
			  updatefParameter: {
				    rest: "/reportforms/updatefParameter",
				    request: {
				    	   id:null,  //指标数值 Id
				    	   min:null,
				    	   max:null

				    },
				    response: {
				      status: "OK",
				      result:{}

				    }
				  },


}
