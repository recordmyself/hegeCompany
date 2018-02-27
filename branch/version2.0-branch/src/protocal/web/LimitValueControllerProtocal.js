// 报警设置
export const LimitValueControllerProtocal = {
  //http://192.168.0.196:8124
  listConfig: {
    rest: "/limitvalueset/listConfig",
    request: {
    	gasId: null, //烟冲编号   （很重要）
      companyId: null, //公司id
      siteId: null, //锅炉房Id
    },
    response: {
      status: "OK",
      result:{
    	  limitId: null,
          label: null,
          ruleList: [
            {
              img: null,
              script: null,
              value: null
            }, {

              img: null,
              script: null,
              value: null
            }
          ]
  	  }


    }
  },

  //添加设置报警值
  create: {
    rest: "/limitvalueset/createOrUpdate",
    request: {


    	    gasId: null, //烟冲编号   （很重要）
    	      companyId: null, //公司id
    	      siteId: null, //锅炉房Id
    	      alarmConfig: [{

    	          limitId: null,
    	          label: null,
    	          ruleList: [
    	            {
    	              img: null,
    	              script: null,
    	              value: null
    	            }, {

    	              img: null,
    	              script: null,
    	              value: null
    	            }
    	          ]
    	      }]


    },
    response: {

      status: "OK",
      result: true | false
    }
  }

}
