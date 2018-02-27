//位置
export const PositionProtocal =  {
		//公司下拉列表
		listPosition : {
			rest: "/position/listPosition",
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
		},
		//新增
		create : {
			rest: "/position/create",
		    request: {
		    	parentId:null, 
	    		companyId:null,//公司id
	    		type:null,//类型  公司(1) 子公司(2)  锅炉房(3)
	    		tag:null, //子父标识 
	    		city:null,  //市
	    		area:null,//区
	    		company:null,//公司
	    		boiler:null,//锅炉房 
	    		address:null,//详细地址
	    		longitude:null,//经度
	    		latitude:null,//纬度
	    		isDelete:null
		    },
		    response:{
		    	status:"OK",
		    	result: true | false 
		    }
		},
		//修改
		refresh : {
			rest: "/position/refresh",
			request: {
				id:null,
				parentId:null, 
	    		companyId:null,//公司id
	    		type:null,//类型  公司(1) 子公司(2)  锅炉房(3)
	    		tag:null, //子父标识 
	    		city:null,  //市
	    		area:null,//区
	    		company:null,//公司
	    		boiler:null,//锅炉房 
	    		address:null,//详细地址
	    		longitude:null,//经度
	    		latitude:null,//纬度
	    		isDelete:null
		    },
		    response:{
		    	status:"OK",
		    	result: true | false 
		    }
		},
		//公司+锅炉房树形菜单
		listTree : {
			rest: "/position/listTree",
			request: {
				id:null
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
			},
			//查出companyId
			get : {
				rest: "/position/get",
				request: {
					id:null
			    },
			    response:{
			    	status:"OK",
			    	result: 
			    	{
			    		companyId:null
			    		
			    	} 
			    }
			}
		
	 
}
