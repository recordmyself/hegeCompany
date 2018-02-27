//客户
export const CustomerProtocal =  {
		//分页
		list : {
			rest: "/customer/list",
			request: {
				 page:1,
				 rows:20,
				 orderBy:"id",
				 sc:"ASC",
				 startTime:null,    //开始时间
                 endTime:null,   //结束时间
			     name:null,  //单位名称
                 memberType:null,//会员类型
                 state:null//会员状态
			},
			response:{
		    	status:"OK",
		    	result:{
			        sn:null, //客户编号
				    name:null,  //单位名称
			        contacts:null,//联系人
			        phone:null, //电话
			        notes:null, //备注
			        unifiedCode:null,  //统一信用代码
			        affiliatedCompany:null,//所属公司
			        customerType:null,  //客户类型
			        startTime:null, //有效期
			        endTime:null,  //有效期
			        state:null  //客户状态
		    	}
		    }
		},
		//新增
		create : {
			rest: "/customer/create",
		    request: {
	           sn:null, //客户编号
		       name:null,  //单位名称
	           contacts:null,//联系人
	           phone:null, //电话
	           principalPerson:null,  //主要负责人
	           province:null,  //省
	           city:null,    //市
	           notes:null, //备注
	           unifiedCode:null,  //统一信用代码
	           affiliatedCompany:null,//所属公司
	           customerType:null,  //客户类型
	           startTime:null, //有效期
	           endTime:null,  //有效期
	           rProvince:null,//公司注册的省
	           rCity:null,//公司注册的市
	           registerName:null//公司注册的公司名
		    },
		    response:{
		    	status:"OK",
		    	result: true | false
		    }
		},

		//修改
		refresh : {
			rest: "/customer/refresh",
			request: {
			   id:null,
	           sn:null, //客户编号
		       name:null,  //单位名称
	           contacts:null,//联系人
	           phone:null, //电话
	           principalPerson:null,  //主要负责人
	           province:null,  //省
	           city:null,    //市
	           notes:null, //备注
	           unifiedCode:null,  //统一信用代码
	           affiliatedCompany:null,//所属公司
	           customerType:null,  //客户类型
	           startTime:null, //有效期
	           endTime:null,  //有效期
	           state:null, //会员状态
			   rProvince:null,//公司注册的省
	           rCity:null,//公司注册的市
	           registerName:null//公司注册的公司名	
		    },
		    response:{
		    	status:"OK",
		    	result: true | false
		    }
		},
		//删除
		remove : {
			rest: "/customer/remove",
			request: {
			  id:null
		    },
		    response:{
		    	status:"OK",
		    	result: true | false
		    }
		}
		,
		//启用
		registered : {
			rest: "/customer/registered",
			request: {
				idList:[]

		    },
		    response:{
		    	status:"OK",
		    	result: true | false
		    }
		}
		,

		//停用
		blockUp : {
			rest: "/customer/blockUp",
			request: {
				idList:[]

		    },
		    response:{
		    	status:"OK",
		    	result: true | false
		    }
		},
		//客户的公司的树形菜单(用户里获取)
		listTree : {
			rest: "/customer/listTree",
			request: {

		    },
		    response: {
			      status: "OK",
			      result: {
			        id: null,
			        label: null,
			        children: {
			          id: null,
			          label: null
			        }
			      }
				}
			}

}
