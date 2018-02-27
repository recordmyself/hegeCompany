export const UserProtocal = {
	// 用户修改邮箱
	//修改
		refreshEmail : {
			rest: "/user/refreshEmail",
			request: {
				id:null, 
				account: null,               
                email:null , //邮箱               
                code:null//验证码
		    },
		    response:{
		    	status:"OK",
		    	result: true | false
		    }
		},
		//个人信息中修改邮箱时获取验证码
		sendEmail : {
			rest: "/user/sendEmail",
		    request: {
		        passportId: null,
		        token: null,
		        email:null//邮箱
		    },
		    response:{
		    	status:"OK",
		    	result: true | false
		    }
		},
		//激活链接
		validation:{
			rest: "/user/validation",
			request: {
				id:null,
				key:null
			},
			response:{
				status:"OK",
				result: true | false 
			}
		},
		//忘记密码发送邮件
		forgetPasswordSendEmail : {
			rest: "/user/forgetPasswordSendEmail",
		    request: {
		        passportId: null,
		        token: null,
		        account:null,//账号
		        email:null//邮箱
		    },
		    response:{
		    	status:"OK",
		    	result: true | false
		    }
		},
		//得到验证邮件修改密码
		verificationEmail : {
			rest: "/user/verificationEmail",
		    request: {
		        passportId: null,
		        token: null,
		        account:null,//账号
		        email:null,//邮箱
		        keyVal:0,//验证码
	        	password:null//新密码
		    },
		    response:{
		    	status:"OK",
		    	result: true | false
		    }
		},
		//上传头像后修改信息
		upload : {
			rest: "/user/upload",
		    request: {
		        passportId: null,
		        token: null,
		        fileName:null//图片名字
		    },
		    response:{
		    	status:"OK",
		    	result: true | false
		    }
		},
		//忘记密码发送短信
		forgetPassword : {
			rest: "/user/forgetPassword",
		    request: {
		        passportId: 0,
		        token: "",
	        	account:null,//账号
	        	mobile:null//手机号
		    },
		    response:{
		    	status:"OK",
		    	result: true | false
		    }
		},
		//得到验证短信修改密码
		verification : {
			rest: "/user/verification",
		    request: {
		        passportId: 0,
		        token: "",
	        	account:null,//账号
	        	mobile:null,//手机号
	        	code:0,//验证码
	        	password:null//新密码
		    },
		    response:{
		    	status:"OK",
		    	result: true | false
		    }
		},
		//http://192.168.0.183:8870
		//显示菜单

		initView : {
			rest: "/user/initView",
			request: {

			},
			response:{
		    	status:"OK",
		    	result:{
		    	menuList:[]
		    	}
		    }
		},
		//分页
		list : {
			rest: "/user/list",
			request: {
				 page:1,
				 rows:20,
				 orderBy:"id",
				 sc:"DESC",
				 roleName:null,//角色名
				 account:null, //登录名
                 userName:null, //用户名
                 statusView:null,//状态
                 status:null,//状态
                 orgName:null,//公司名称
                 createByName:null, //创建者
		         startDate:null, //创建时间的开始
		         endDate:null,  //创建时间的结束
		         startDate2:null,//登录时间的开始
		         endDate2:null//登录时间的结束
			},
			response:{
		    	status:"OK",
		    	result:{
		    		startTime:null, //有效开始时间
		    		endTime:null,//有效结束时间
			        account:null, //登录名
			        userName:null,//用户名
			        mobile:null,  //手机号
			        email:null,//邮箱
			        lastLoginTime:null,  //最后登录时间
			        loginNum:null,  //登录次数
			        statusView:null, //状态视图
			        memo:null,//备忘录
			        orgName:null,//公司名称
			        createByName:null//创建者
		    	}
		    }
		},
		//新增
		create : {
			rest: "/user/create",
		    request: {
	            account:null, //登录名
	            password:null,//密码
	            userName:null,//用户名
	            mobile:null,  //手机号
	            email:null , //邮箱
	            lastLoginTime:null,//最后登录时间
	            loginNum:null,  //登录次数
	            memo:null,//备忘录
	            companyId:null,//所属组织机构
	            roleIdList:[],//角色id
	            createByName:null,
	            memberType:null,
	            customerId:null//(客户那边的公司id,如果选择客户那边要传)
				},
		    response:{
		    	status:"OK",
		    	result: true | false
		    }
		},
		//根据公司id得到用户
	listUser: {
      rest: "/user/listUser",
      request: {
        companyId: null
      },
      response: {
        status: "OK",
        result: {
          userName: null
        }
      }
    },
		//修改
		refresh : {
			rest: "/user/refresh",
			request: {
				id:null,
				sn:null,
                account:null, //登录名
                password:null,//密码
                userName:null,//用户名
                mobile:null,  //手机号
                email:null , //邮箱
                lastLoginTime:null,  //最后登录时间
                loginNum:null,  //登录次数
                status:null, //状态毕传
                memo:null,//备忘录
                companyId:null,//所属组织机构
                orgName:null,
                createBy:null,
                createByName:null,
                createDate:null,
                lastUpdateBy:null,
                lastUpdateDate:null,
                startTime:null,//有效开始时间
                endTime:null,//有效结束时间
                memberType:null, //会员类型1.免费 2.付费
                roleName:null,//角色名
                code:null//验证码
		    },
		    response:{
		    	status:"OK",
		    	result: true | false
		    }
		},
		//删除
		remove : {
			rest: "/user/remove",
			request: {
				idList:[]
		    },
		    response:{
		    	status:"OK",
		    	result: true | false
		    }
		}
		,
		//审核通过（已注册）
		startUsing : {
			rest: "/user/startUsing",
			request: {
				idList:[]

		    },
		    response:{
		    	status:"OK",
		    	result: true | false
		    }
		}
		,
		//审核不通过（未注册）
		unregistered : {
			rest: "/user/unregistered",
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
			rest: "/user/blockUp",
			request: {
				idList:[]

		    },
		    response:{
		    	status:"OK",
		    	result: true | false
		    }
		},
		//启用
		enable : {
			rest: "/user/enable",
			request: {
				idList:[]

		    },
		    response:{
		    	status:"OK",
		    	result: true | false
		    }
		},
		//重置密码

		refreshPassword : {
			rest: "/user/refreshPassword",
			request: {
				id:null,
				password:null

		    },
		    response:{
		    	status:"OK",
		    	result: true | false
		    }
		},//详情
		get: {
			rest: "/user/get",
			request: {
				id: null
			},
			response:{
				sn:null,
                account:null, //登录名
                password:null,//密码
                userName:null,//用户名
                mobile:null,  //手机号
                email:null , //邮箱
                lastLoginTime:null,  //最后登录时间
                loginNum:null,  //登录次数
                status:null,
                memo:null,//备忘录
                companyId:null,//所属组织机构
                orgName:null,
                createBy:null,
                createByName:null,
                createDate:null,
                lastUpdateBy:null,
                lastUpdateDate:null,
                startTime:null,//有效开始时间
                endTime:null,//有效结束时间
                memberType:null, //会员类型1.免费 2.付费
                roleName:null//角色名
			}
		}
}
