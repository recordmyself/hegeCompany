//锅炉房
export const BoilerhouseProtocal ={
		
		
		//分页
		list : {
			rest: "/boilerhouse/list",
			request: {
				 page:1,
				 rows:20,
				 orderBy:"id",
				 sc:"DESC",
				 name:null,//锅炉房名称
                 sn:null, //锅炉房编号
                 type:null, //供热类型
                 property:null,//热源性质
                 capacity:null, //装机容量
                 heatingCapacity:null//供热能力
			},
			response:{
		    	status:"OK",
		    	result:{
			        positionId:null,//锅炉房地址Id
			        sn:null,  //锅炉房编号
			        name:null , //锅炉房名称
			        type:null, //锅炉房类型
			        boilerQuantity:null,  //锅炉数量
			        heatingCapacity:null,//供热能力
			        civilArea:null,//民用面积
			        publicArea:null,//公建面积
			        plantAndOther:null,//厂房及其他
			        status:null,//状态
			        alarmStatus:null,//报警状态
			        property:null,//热源性质
			        capacity:null,//装机容量
			        thermalNumber:null,//统管热力站数
			        heatingArea:null,//供热面积
			        turbineNumber:null//汽机数量
		    	}
		    }
		},
		//新增
		create : {
			rest: "/boilerhouse/create",
		    request: {
	            sn:null,  //锅炉房编号
	            name:null , //锅炉房名称
	            type:null,  //锅炉房类型
	            boilerQuantity:null, //锅炉数量
	            heatingCapacity:null, //供热能力
	            turbineNumber:null,//汽机数量
	            civilArea:null,//民用面积
	            publicArea:null,//公建面积
	            plantAndOther:null,//厂房及其他
	            status:null,//状态
	            property:null,//性质
	            capacity:null,//容量
	            heatingArea:null,//供热面积
	            longitude:null,//经度
	            latitude:null,//纬度
	            company:null,//所属公司
	            city:null,//市
	            area:null,//区
	            address:null,//详细地址
	            avenue:null,//城市街道办事处
	        	committee:null//居委会
		    },
		    response:{
		    	status:"OK",
		    	result: true | false 
		    }
		},
		//修改
		refresh : {
			rest: "/boilerhouse/refresh",
			request: {
				id:null,
		    	orgBingId:null,                                                                                                                                     //所属组织机构（父公司）
	            orgSmallId:null, //所属组织机构（子公司）
	            positionId:null,//锅炉房地址Id
	            sn:null,  //锅炉房编号
	            name:null , //锅炉房名称
	            type:null,  //锅炉房性质
	            boilerQuantity:null,  //锅炉数量
	            heatingCapacity:null, //供热能力
	            civilArea:null,//民用面积
	            publicArea:null,//公建面积
	            plantAndOther:null,//厂房及其他
	            status:null,//状态
	            alarmStatus:null,//报警状态
	            property:null,//性质
	            capacity:null,//容量
	            thermalNumber:null,//统管热力站数
	            heatingArea:null,//供热面积
	            createBy:null,//创建人
	            lastUpdateBy:null,//最后修改人
	            longitude:null,//经度
	            latitude:null,//纬度
	            isDeleted:null,//是否删除
	            city:null,//市
		        area:null,//区
		        company:null,//所属公司
		        address:null,//详细地址
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
			rest: "/boilerhouse/remove",
			request: {
		         id:null
		    },
		    response:{
		    	status:"OK",
		    	result: true | false 
		    }
		}
		
	 
}
