//参数管理
export const DictionaryProtocal =  {
		
		
		//分页
		list : {
			rest: "/dictionary/list",
			request: {
				 page:1,
				 rows:20,
				 orderBy:"id",
				 sc:"DESC",
				
				 name:null,//名称
                 englishType:null,//英文类型
                 chineseType:null //中文类型            	 
			},
			response:{
		    	status:"OK",
		    	result:{
		    		name:null,    //字典名称
			        englishType:null, //英文类型
			        chineseType:null,  //中文类型 
			        value:null,//值
			        status:null,  //状态
			        createBy:null , //创建人
			        lastUpdateBy:null,  //最后修改人
			        createDate:null,  //创建日期
			        lastUpdateDate:null    //最后修改日期
			        
		    	}
		    }
		},
		//新增
		create : {
			rest: "/dictionary/create",
		    request: {
		       name:null,    //字典名称
	           englishType:null, //英文类型
	           chineseType:null,  //中文类型 
	           value:null,//值
	           status:null,  //状态
	           createBy:null , //创建人
	           lastUpdateBy:null,  //最后修改人
	           createDate:null,  //创建日期
	           lastUpdateDate:null,    //最后修改日期
	           isDeleted:null //是否删除
				
		    },
		    response:{
		    	status:"OK",
		    	result: true | false 
		    }
		},
		
		//修改
		refresh : {
			rest: "/dictionary/refresh",
			request: {
			   id:null,
			   name:null,    //字典名称
	           englishType:null, //英文类型
	           chineseType:null,  //中文类型 
	           value:null,//值
	           status:null,  //状态
	           createBy:null, //创建人
	           lastUpdateBy:null,  //最后修改人
	           createDate:null,  //创建日期
	           lastUpdateDate:null,    //最后修改日期
	           isDeleted:null //是否删除
		        
		    },
		    response:{
		    	status:"OK",
		    	result: true | false 
		    }
		},
		//删除
		remove : {
			rest: "/dictionary/remove",
			request: {
			  id:null
		    },
		    response:{
		    	status:"OK",
		    	result: true | false 
		    }
		}
		
	 
}
