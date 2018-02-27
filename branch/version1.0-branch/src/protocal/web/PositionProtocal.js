//position数据
export const PositionProtocal = {
	//城市下拉列表
	getCity:{
	    rest: "/position/getCity",
	    request: {
	    	passportId:null,
	    	token:null
	    },
	    response: {
	      status: "OK",
	      result: [null,null]
	    }
	},
	// },
	//区下拉列表
	getArea:{
	    rest: "/position/getArea",
	    request: {
	    	passportId:null,
	    	token:null,
	    	city:null,
	    	companyId:null
	    },
	    response: {
	      status: "OK",
	      result: [null,null]
	      }
	},
	
  //http://192.168.0.196:8124
	listTree:{
			    rest: "/position/listTree",
			    request: {
            sc: 'ASC'
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



	//首页地图位置报警 信息

	//首页地图位置报警 信息

	listPotion:
	{
			rest:"/position/listPotion",
			request:
			{
				city:null, //市
				area:null,//区
				company:null,//公司
				boiler:null,//锅炉房
			},
    		response:
    		{
    			status:"OK",
		    	result:[{

    			id:null,//position  Id
    			boiler:null,//锅炉
    			longitude:null, //经度
    			latitude:null, //纬度
    			stateNum:null, // 0不报警    1报警
		    	}]
    		}
	},

	//查询公司的信息
	getHouseInfo:
	{
			rest:"/position/getHouseInfo",
			request:
			{
				id:null,//position  Id
			},
    		response:
    		{
    			status:"OK",
		    	result:{
					id:null,//锅炉房的id
					positionId:null, //position Id
					sn:null,//锅炉房编号 （编号规则)
					name:null,//锅炉房名称
					type:null,//类型  锅炉房类型 (1:热电 2:区域锅炉房 3:核电 4:工业余热)
					boilerQuantity:null,//锅炉数量
					heatingCapacity:null,//供热能力((面积数))
					civilArea:null,//民用面积
					publicArea:null,//公建面积
					plantAndOther:null,//厂房及其他
					status:null,//状态
					alarmStatus:null,//报警状态 （1:不报警   2：报警）
					property:null,//热源性质
					capacity:null,//容量
					thermalNumber:null,//统管热力站数(建立热力站与热源的关系)
					heatingArea:null,//供热面积
					head:null,//负责人
					phone:null,//负责人电话
					turbineNumber:null,//汽机数量
					address:null,// 地址(后加的)
					company:null,//公司
		    	}
    		}

	},
  //烟囱 信息
  getChimneyList: {
    rest: "/position/getChimneyList",
    request: {
    	 id: null, //position  Id
    },
    response: {
    	status:"OK",// false
    	result:
    	[{


    	gasSn:null,//烟囱 编号
    	name: null,//烟囱名称
    	gasId: null,//烟冲编号   （很重要）
    	companyId: null,//公司id
    	siteId: null, //锅炉房Id
    	revTime: null,  //时间
    	oxO2: null, //烟气含氧量
    	noxCt: null, //Nox折算浓度
    	flow: null, //烟气流速
    	stress: null, //烟气压力
    	tp: null,//烟气温度
    	hdy: null, //烟气湿度
    	ppm: null,//Nox实测PPM浓度
    	qltppm: null,//Nox标态质量浓度
    	area: null,//烟道截面积
    	ssflow: null,//标态烟气流量
    	tmflow: null,//热态烟气流量

    	oxO2State: null, //烟气含氧量
    	noxCtState: null, //Nox折算浓度
    	flowState: null, //烟气流速
    	stressState: null, //烟气压力
    	tpState: null,//烟气温度
    	hdyState: null, //烟气湿度
    	ppmState: null,//Nox实测PPM浓度
    	qltppmState: null,//Nox标态质量浓度
    	areaState: null,//烟道截面积
    	ssflowState: null,//标态烟气流量
    	tmflowState: null,//热态烟气流量
    	state: null,//状态  0正常   1 低  2中 3 高
    	}
    ]
    }
  },



	//首页烟囱的报警信息
  getAlarmList:
	{
			rest:"/position/getAlarmList",
			request:
			{
				 id: null, //position  Id
			},
  		response:
  		{
  			status:"OK",
	    	result:[{


  			gasId: null,//烟冲编号   （很重要）
  			parameter: null, //报警的属性
  			value: null,  //报警属性的值
  			limitValue: null, //报警值的范围
  			revTime:null,  //时间
  			isState: null, //状态
  			level: null,  //级别
  			descr: null,//备注
	    	}]
  		}
	},

	//根据positoin id 得到公司
	listCompany:
		{
				rest:"/position/listCompany",
				request:
				{
					 city:null,
					 area:null,
				},
	  		response:
	  		{
	  			status:"OK",
		    	result:[{

		    		id:null,
		    		label:null,
		    		children:
		    			[

		    			 ],

		    	}]
	  		}
		},

		//根据positoin id 得到 锅炉
		listBoilerHourse:
			{
					rest:"/position/listBoilerHourse",
					request:
					{
						id:null,//公司最后一级的 position Id
					},
		  		response:
		  		{
		  			status:"OK",
			    	result:[{

		    			id:null,//position  Id
		    			boiler:null,//锅炉
		    			longitude:null, //经度
		    			latitude:null, //纬度
		    			stateNum:null, // 0不报警    1报警
			    	}]
		  		}
			},

			//根据positoin id 得到 锅炉
			listBoilerState:
				{
						rest:"/position/listBoilerState",
						request:
						{
							id:null,//锅炉房 position Id
						},
			  		response:
			  		{
			  			status:"OK",
				    	result:[{

			    			id:null,//position  Id
			    			boiler:null,//锅炉
			    			longitude:null, //经度
			    			latitude:null, //纬度
			    			stateNum:null, // 0不报警    1报警
				    	}]
			  		}
				},

}
