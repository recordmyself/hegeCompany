//展示实时数据
export const RealTimeDataProtocal = {
  //http://192.168.0.196:8124
  //跳转实时数据调用
  get: {
    rest: "/realtimedata/get",
    request: {

		gasSn:null//烟囱 编号
    },
    response: {

    	status:"OK",
    	result:{

	    		city:null, //市
	        	areaAddress:null,//区
	        	company:null,//公司
	        	boiler:null,//锅炉房
	        	gasName:null,

    			gasId:null,//烟囱 id
	    		// gasName:null,
	    		oxO2:null, //烟气含氧量
	    		noxCt:null, //Nox折算浓度
	    		flow:null, //烟气流速
	    		stress:null, //烟气压力
	    		tp:null,//烟气温度
	    		hdy:null, //烟气湿度
	    		ppm:null,//Nox实测PPM浓度
	    		qltppm:null,//Nox标态质量浓度
	    		area:null,//烟道截面积
	    		ssflow:null,//标态烟气流量
	    		tmflow:null,//热态烟气流量
    	}
    }
  },

//查询    实时数据 搜索条件改变调用
list: {
    rest: "/realtimedata/list",
    request: {
    	gasId:null,
    	gasSn:null//烟囱 编号
    },
    response: {

    	status:"OK",
    	result:{

    	      id: null,
		      oxO2: null, //烟气含氧量
		      noxCt: null, //Nox折算浓度
		      flow: null, //烟气流速
		      stress: null, //烟气压力
		      tp: null, //烟气温度
		      hdy: null, //烟气湿度
		      ppm: null, //Nox实测PPM浓度
		      qltppm: null, //Nox标态质量浓度
		      area: null, //烟道截面积
		      ssflow: null, //标态烟气流量
		      tmflow: null, //热态烟气流量
		      trackId: null, //标识id
		      gasId: null, //烟冲编号   （很重要）
		      companyId: null, //公司id
		      siteId: null, //锅炉房Id
		      revTime: null, //时间
    	}
    }
  },

  //烟气压力     1
  getPa: {
	    rest: "/realtimedata/getPa",
	    request: {

	    	gasId:null,//烟囱 Id
			gasSn:null//烟囱 编号
	    },
	    response: {

	    	status:"OK",
	    	result:{
	    		id:null,
	    		realityRatio:null,//实际
	    		theoryRatio:null,//理论效率  你自己写点测试值
	    		revTime:null, //时间
	    	}
	    }
	  },

	 //烟气温度  2
	  getTp: {
		    rest: "/realtimedata/getTp",
		    request: {

		    	gasId:null,//烟囱 Id
				gasSn:null//烟囱 编号
		    },
		    response: {

		    	status:"OK",
		    	result:{
		    		id:null,
		    		realityRatio:null,//实际
		    		theoryRatio:null,//理论效率  你自己写点测试值
		    		revTime:null, //时间
		    	}
		    }
		  },

			 //烟气流速   3
		  getFlow: {
			    rest: "/realtimedata/getFlow",
			    request: {

			    	gasId:null,//烟囱 Id
					gasSn:null//烟囱 编号
			    },
			    response: {

			    	status:"OK",
			    	result:{
			    		id:null,
			    		realityRatio:null,//实际
			    		theoryRatio:null,//理论效率 你自己写点测试值
			    		revTime:null, //时间
			    	}
			    }
			  },


				 //烟气含氧量   4
			  getOxO2: {
				    rest: "/realtimedata/getOxO2",
				    request: {

				    	gasId:null,//烟囱 Id
						gasSn:null//烟囱 编号
				    },
				    response: {

				    	status:"OK",
				    	result:{
				    		id:null,
				    		realityRatio:null,//实际
				    		theoryRatio:null,//理论效率 你自己写点测试值
				    		revTime:null, //时间
				    	}
				    }
				  },


					 //Nox折算浓度    5
				  getNoxCt: {
					    rest: "/realtimedata/getNoxCt",
					    request: {

					    	gasId:null,//烟囱 Id
							gasSn:null//烟囱 编号
					    },
					    response: {

					    	status:"OK",
					    	result:{
					    		id:null,
					    		realityRatio:null,//实际
					    		theoryRatio:null,//理论效率 你自己写点测试值
					    		revTime:null, //时间
					    	}
					    }
					  },

						 //烟气湿度    6
					  gethdy: {
						    rest: "/realtimedata/gethdy",
						    request: {

						    	gasId:null,//烟囱 Id
								gasSn:null//烟囱 编号
						    },
						    response: {

						    	status:"OK",
						    	result:{
						    		id:null,
						    		realityRatio:null,//实际
						    		theoryRatio:null,//理论效率 你自己写点测试值
						    		revTime:null, //时间
						    	}
						    }
						  },


							 //Nox实测PPM浓度    7
						  getppm: {
							    rest: "/realtimedata/getppm",
							    request: {

							    	gasId:null,//烟囱 Id
									gasSn:null//烟囱 编号
							    },
							    response: {

							    	status:"OK",
							    	result:{
							    		id:null,
							    		realityRatio:null,//实际
							    		theoryRatio:null,//理论效率 你自己写点测试值
							    		revTime:null, //时间
							    	}
							    }
							  },


								 //Nox标态质量浓度     8
							  getqltppm: {
								    rest: "/realtimedata/getqltppm",
								    request: {

								    	gasId:null,//烟囱 Id
										gasSn:null//烟囱 编号
								    },
								    response: {

								    	status:"OK",
								    	result:{
								    		id:null,
								    		realityRatio:null,//实际
								    		theoryRatio:null,//理论效率 你自己写点测试值
								    		revTime:null, //时间
								    	}
								    }
								  },


									 //烟道截面积     9
								  getarea: {
									    rest: "/realtimedata/getarea",
									    request: {

									    	gasId:null,//烟囱 Id
											gasSn:null//烟囱 编号
									    },
									    response: {

									    	status:"OK",
									    	result:{
									    		id:null,
									    		realityRatio:null,//实际
									    		theoryRatio:null,//理论效率 你自己写点测试值
									    		revTime:null, //时间
									    	}
									    }
									  },




										 //标态烟气流量     10
									  getssflow: {
										    rest: "/realtimedata/getssflow",
										    request: {

										    	gasId:null,//烟囱 Id
												gasSn:null//烟囱 编号
										    },
										    response: {

										    	status:"OK",
										    	result:{
										    		id:null,
										    		realityRatio:null,//实际
										    		theoryRatio:null,//理论效率 你自己写点测试值
										    		revTime:null, //时间
										    	}
										    }
										  },



											 //热态烟气流量     11
										  gettmflow: {
											    rest: "/realtimedata/gettmflow",
											    request: {

											    	gasId:null,//烟囱 Id
													gasSn:null//烟囱 编号
											    },
											    response: {

											    	status:"OK",
											    	result:{
											    		id:null,
											    		realityRatio:null,//实际
											    		theoryRatio:null,//理论效率 你自己写点测试值
											    		revTime:null, //时间
											    	}
											    }
											  },





}
