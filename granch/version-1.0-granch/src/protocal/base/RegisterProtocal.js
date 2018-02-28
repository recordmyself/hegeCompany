//公司注册
export const RegisterProtocal =  {


		//审批列表
		list : {
			rest: "/register/list",
			request: {
				 page:1,
				 rows:20,
				 orderBy:"id",
				 sc:"DESC",
                 startDate:null,
                 endDate:null
			},
			response:{
		    	status:"OK",
		    	result:{
			        name:null, //公司名称
			        province:null,//省
			        city:null,//市
			        contacts:null, //联系人
			        mobile:null, //手机号
			        count:null,//锅炉数量
			        state:null,//状态
			        boilers:null,//锅炉
		    	}
		    }
		},
		//新增
		create : {
			rest: "/register/create",
		    request: {
		    	name:null,//单位名称
	             province:null,//省
	             city:null,//市
	             contacts:null,//联系人
	             mobile:null,//手机号
	             code:null,//验证码
	             unifiedCode:null,//统一社会信用代码
                license:null,//营业执照
                boilers:null//锅炉

		    },
		    response:{
		    	status:"OK",
		    	result: true | false
		    }
		},//未通过
		blockUp : {
			rest: "/register/blockUp",
			request: {
				idList:[]

		    },
		    response:{
		    	status:"OK",
		    	result: true | false
		    }
		},
			//通过
		registered : {
			rest: "/register/registered",
			request: {
				idList:[]

		    },
		    response:{
		    	status:"OK",
		    	result: true | false
		    }
		},

		//修改
		refresh : {
			rest: "/register/refresh",
			request: {
				id:null,
				name:null,//单位名称
	            province:null,//省
	            city:null,//市
	            contacts:null,//联系人
	            mobile:null,//手机号
	            unifiedCode:null,//统一社会信用代码
                license:null,//营业执照
                boilers:null,//锅炉
		    },
		    response:{
		    	status:"OK",
		    	result: true | false
		    }
		},
		//删除
		remove : {
			rest: "/register/remove",
			request: {
				id:null

		    },
		    response:{
		    	status:"OK",
		    	result: true | false
		    }
		},
		test:{//获取手机验证码
			rest: "/register/test",
			request: {

		    },
		    response:{
		    	status:"OK",
		    	result: true | false
		    }
		},
		listRegister:{//获取已注册的公司
			rest: "/register/listRegister",
			request: {

		    },
		    response:{
		    	status:"OK",
		    	result: 
		    		{
		    		name:[]//公司名字
		    		}
		    }
		}

}
