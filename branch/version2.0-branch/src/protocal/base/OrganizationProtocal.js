//公司组织机构
export const OrganizationProtocal =  {
		
		//分页
		
		list : {
			rest: "/organization/list",
			request: {
				 page:1,
				 rows:20,
				 orderBy:"id",
				 sc:"DESC",
				 startDate:null,//创建开始时间
				 endDate:null,//创建结束时间
				 name:null,//组织机构名字
				 state:null,//状态
				 type:null//组织机构类型
			},
			response:{
		    	status:"OK",
		    	result:{
		    		name:null,  //名称 
		    		creditSn:null,  //社会信用编码编码
		    		superOrganization:null,  //上级组织机构 
		    		type:null,  //类型
					subordinateType:null,//公司下级翻译     子公司|分公司
					head:null,//联系人
					city:null,//市
					area:null,//区
					abbreviation:null//简称
		    	}
		    }
		},
		//创建
		create : {
			rest: "/organization/create",
		    request: {
	           creditSn:null, //社会信用编码编码
	           name:null,  //名称 
	           type:null,//公司|部门|其他
			   head:null,//负责人
			   notes:null,//备注
			   createDate:null,//创建日期
			   isDeleted:null,//是否刪除
			   subordinateType:null,//公司下级翻译     子公司|分公司
			   superOrganization:null,//上级组织机构
			   province:null,//省
			   city:null,//市
			   departmentalinfo:null,//部门信息
			   abbreviation:null//简称
		    },
		    response:{
		    	status:"OK",
		    	result: true | false 
		    }
		},
		//更新
		refresh : {
			rest: "/organization/refresh",
			request: {
			   id:null,
			   parentId:null,    //父节点
	           creditSn:null, //社会信用编码编码
	           name:null,  //名称 
	           type:null,//公司|部门|其他
	           tableName:null,  //数据表名
			   collPoint:null,  //采集点 
			   image:null,  //图片
			   head:null,//负责人
			   notes:null,//备注
			   createDate:null,//创建日期
			   isDeleted:null,//是否刪除
			   subordinateType:null,//公司下级翻译     子公司|分公司
			   superOrganization:null,//上级组织机构
		       area:null,//区
			   city:null,//市
			   departmentalinfo:null,//部门信息
			   state:null,//状态
			   abbreviation:null//简称
		    },
		    response:{
		    	status:"OK",
		    	result: true | false 
		    }
		},
		remove : {
			rest: "/organization/remove",
			request: {
		       id:null
		    },
		    response:{
		    	status:"OK",
		    	result: true | false 
		    }
		},
		listTree : {
			rest: "/organization/listTree",
			request: {
				 page:1,
				 rows:20,
				 orderBy:"id",
				 sc:"DESC",
			},
			response:{
		    	status:"OK",
		    	result:{
		    		name:null,  //名称 
		    		creditSn:null, //社会信用编码编码
		    		superOrganization:null,  //上级组织机构 
		    		type:null,  //类型
					subordinateType:null,//公司下级翻译     子公司|分公司
					head:null,//联系人
					city:null,//市
					area:null,//区
					abbreviation:null//简称
		    	}
		    }
		},
		//启用
		registered : {
			rest: "/organization/registered",
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
			rest: "/organization/blockUp",
			request: {
				idList:[]
		    },
		    response:{
		    	status:"OK",
		    	result: true | false 
		    }
		},
		//根据公司名得到会员类型
		get : {
			rest: "/organization/get",
			request: {
				id:null,
		        name:null
		    },
		    response:{
		    	status:"OK",
		    	result: 
		    	{
		    		memberType:null//会员类型
		    		
		    	} 
		    }
		}
	 
}
