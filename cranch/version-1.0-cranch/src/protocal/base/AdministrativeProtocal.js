//行政区划
export const AdministrativeProtocal = {
		//树形菜单
		listTree : {
			rest: "/administrative/listTree",
			request: {			 
			},
			response:{
		    	status:"OK",
		    	result:{
		    		id:null,
		    		name:null, //行政名称
			        sn:null, //行政代码
			        parentId:null,//父节点ID  上级
			        status:null,//状态
			        type:null,  //类别
			        longitude:null , //经度
			        latitude:null,  //创建日期
			        level:null,  //级别
			        createBy:null, //创建人
			        lastUpdateBy:null,
			        createDate:null,
			        lastUpdateDate:null,
			        isDeleted:null,
			        city:null, //市
					area:null, //区
					avenue:null,//城市街道办事处
					committee:null//居委会
		    	}
		    }
		},
		
		//新增
		create : {
			rest: "/administrative/create",
		    request: {
		        name:null, //行政名称
	            sn:null, //行政代码
	            parentId:null,//父节点ID  上级
	            status:null,//状态
	            type:null,  //类别
	            longitude:null , //经度
	            latitude:null,  //创建日期
	            level:null,  //级别
	            createBy:null, //创建人
	            lastUpdateBy:null,
	            createDate:null,
	            lastUpdateDate:null,
	            isDeleted:null
				
		    },
		    response:{
		    	status:"OK",
		    	result: true | false 
		    }
		},
		//查询
		get : {
			rest: "/administrative/get",
			request: {
				city:null, //市
				area:null, //区
				avenue:null,//城市街道办事处
				committee:null,//居委会
				name:null,  //行政名称
				tag:null 
			},
			response:{
		    	status:"OK",
		    	result:{
		    	    id:null,
		    	    name:null, //行政名称
		            sn:null, //行政代码
		            latitude:null,//纬度
		            type:null,  //类别
		            longitude:null , //经度
		            level:null //级别

		    	}
		    }
		},
		//修改
		refresh : {
			rest: "/administrative/refresh",
			request: {
				id:null,
				name:null, //行政名称
	            sn:null, //行政代码
	            parentId:null,//父节点ID  上级
	            status:null,//状态
	            type:null,  //类别
	            longitude:null , //经度
	            latitude:null,  //创建日期
	            level:null,  //级别
	            createBy:null, //创建人
	            lastUpdateBy:null,
	            createDate:null,
	            lastUpdateDate:null,
	            city:null, //市
				area:null, //区
				avenue:null,//城市街道办事处
				committee:null//居委会
		    },
		    response:{
		    	status:"OK",
		    	result: true | false 
		    }
		},
		//删除
		remove : {
			rest: "/administrative/remove",
			request: {
				id:null
		    },
		    response:{
		    	status:"OK",
		    	result: true | false 
		    }
		}
		
	 
}
