//烟囱
export const ChimneyProtocal = {
		
		
		//分页
		list : {
			rest: "/chimney/list",
			request: {
				 page:1,
				 rows:20,
				 orderBy:"id",
				 sc:"DESC",
				 startDate:null,//创建开始时间
				 endDate:null, //创建结束时间
				 company:null, //单位名称
				 houseName:null,//所属热源
                 gasSn:null//烟囱编号
			},
			response:{
		    	status:"OK",
		    	result:{
			        positionId:null,//锅炉房地址Id
			        gasSn:null,  //烟囱编号
			        name:null , //烟囱名称
			        company:null, //单位名称
			        houseName:null,  //所属热源
			        installationUnit:null,//安装单位
			        head:null,//负责人
			        phone:null,//电话
			        longitude:null,//经度
			        latitude:null//纬度
		    	}
		    }
		},
		//新增
		create : {
			rest: "/chimney/create",
		    request: {
	            gasSn:null,  //烟囱编号
	            userSn:null , //使用登记证编号
	            name:null,  //烟囱名称
	            type:null, //排烟类型 
	            company:null, //单位名称
	            houseName:null,//所属热源
	            installationUnit:null,//安装单位
	            longitude:null,//经度
	            latitude:null,//纬度
	            head:null,//负责人
	            phone:null,//电话
	            operator:null//操作员
	           
	            
		    },
		    response:{
		    	status:"OK",
		    	result: true | false 
		    }
		},
		//修改
		refresh : {
			rest: "/chimney/refresh",
			request: {
				id:null,
	            gasSn:null,  //烟囱编号
	            userSn:null,//使用登记证编号
	            name:null, //烟囱名称
	            type:null,  //排烟类型 
	            company:null,  //单位名称
	            houseName:null, //所属热源
	            longitude:null,//经度
	            latitude:null,//纬度
	            companyId:null,//公司id
	            installAddress:null,//安装地址
	            installationUnit:null,//安装单位
	            installDate:null,//安装日期
	            lastRepairDate:null,//最后一次检修日期
	            overhauler:null,//检修人
	            phone:null,//电话
	            alarmStatus:null,//报警状态 （1：正常  2：异常）
	            createBy:null,//
	            lastUpdateBy:null,//最后修改人
	            siteId:null,//锅炉房id
	            head:null,//负责人
	            operator:null//操作员
		    },
		    response:{
		    	status:"OK",
		    	result: true | false 
		    }
		},
		//删除
		remove : {
			rest: "/chimney/remove",
			request: {
		         id:null
		    },
		    response:{
		    	status:"OK",
		    	result: true | false 
		    }
		},
		 //根据公司查没有烟囱的锅炉房
		listboilerhouse : {
			rest: "/boilerhouse/listboilerhouse",
			request: {
				company:null//公司
				 
			},
			response:{
		    	status:"OK",
		    	result:{
			        nameList:[]//锅炉房名字集合
		    	}
		    }
		}
		
	
		
}
