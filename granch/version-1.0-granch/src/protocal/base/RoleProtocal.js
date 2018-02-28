//角色
export const RoleProtocal =  {
		
		
		//分页
		list : {
			rest: "/role/list",
			request: {
				 page:1,
				 rows:20,
				 orderBy:"id",
				 sc:"DESC",
                 name:null, 
                 startDate:null,
                 endDate:null  
			},
			response:{
		    	status:"OK",
		    	result:{
			        name:null, 
			        descr:null,
			        menuList:null,
			        status:null,  
			        createDate:null, 
			        notes:null//备注
		    	}
		    }
		},
		//新增
		create : {
			rest: "/role/create",
		    request: {
		    	sn:null, 
	            name:null, 
	            descr:null,
	            lastUpdateDate:null,  
	            lastUpdateBy:null, 
	            isDelete:null,
	            notes:null,//备注
		    },
		    response:{
		    	status:"OK",
		    	result: true | false 
		    }
		},
		
		//修改
		refresh : {
			rest: "/role/refresh",
			request: {
				sn:null, 
	            name:null, 
	            descr:null,
	            status:null,  
	            createDate:null , 
	            lastUpdateDate:null,  
	            createBy:null,  
	            lastUpdateBy:null, 
	            isDelete:null,
	            notes:null//备注
		    },
		    response:{
		    	status:"OK",
		    	result: true | false 
		    }
		},
		//删除
		remove : {
			rest: "/role/remove",
			request: {
				id:null
		    },
		    response:{
		    	status:"OK",
		    	result: true | false 
		    }
		},
		//角色菜单及授权功能页面
		authorization : {
			rest: "/role/authorization",
			request: {
				id:null
		    },
		    response:{
		    	status:"OK",
		    	// result: menuList:[]
		    }
		},
		// 修改角色权限
		refreshAuth : {
			rest: "/role/refreshAuth",
			request: {
				id:null
		    },
		    response:{
		    	status:"OK",
		    	result: true | false 
		    }
		}
		
	 
}
