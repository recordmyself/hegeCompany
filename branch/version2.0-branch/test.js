api.notes = [
  // 首页
  {
    rest: "/position/listTree",
    descr:"加载省市区域"
  },
  {
    rest: "/position/listPotion",
    descr:"根据省市查询烟囱分布"
  },
  {
    rest: "/position/listCompany",
    descr:"根据省市查询公司信息"
  },
  {
    rest: "/position/listBoilerHourse",
    descr:"根据公司Id查询锅炉房分布"
  },
  {
    rest: "/position/listBoilerState",
    descr:"根据锅炉房查询烟囱"
  },
  {
    rest: "/position/getHouseInfo",
    descr:"查询烟囱所属公司的信息"
  },
  {
    rest: "/position/getChimneyList",
    descr:"查看烟囱信息"
  },
  {
    rest: "/position/getAlarmList",
    descr:"查看烟囱报警信息"
  },
  // 数据中心
  {
    rest: "/gashistory/list",
    descr:"查询烟囱历史数据"
  },
  {
    rest: "/gashistory/listSelect",
    descr:"查询烟囱历史数据"
  },
  {
    rest: "/realtimedata/get",
    descr:"查询烟囱实时数据"
  },
  {
    rest: "/realtimedata/list",
    descr:"查询烟囱实时数据"
  },
  {
    rest: "/realtimedata/getPa",
    descr:"查询烟气压力"
  },
  {
    rest: "/realtimedata/getTp",
    descr:"查询烟气温度"
  },
  {
    rest: "/realtimedata/getFlow",
    descr:"查询烟气流速"
  },
  // 报警模块
  {
    rest: "/alarminfo/list",
    descr:"查询或查询报警信息"
  },
  {
    rest: "/limitvalueset/listConfig",
    descr:"查询烟囱报警信息"
  },
  {
    rest: "/limitvalueset/createOrUpdate",
    descr:"设置烟囱报警信息"
  },
  {
    rest: "/boilerhousers/getAllBoilerHourse",
    descr:"查询锅炉房信息"
  },
  {
    rest: "/boilerhousers/getAllGasById",
    descr:"查询烟囱信息"
  },
  // 分析中心
  {
    rest: "/exceluploadhistory/list",
    descr:"查询文件上传历史数据"
  },
  {
    rest: "/exceluploadhistory/listAll",
    descr:"查询文件上传历史数据"
  },
  {
    rest: "/exceluploadhistory/getSelectByTrackId",
    descr:"查询历史详细信息"
  },
  {
    rest: "/fileupload/download",
    descr:"下载模板"
  },
  {
    rest: "/fileupload/upload",
    descr:"上传文件"
  },
  {
    rest: "/fileupload/selectExcle",
    descr:"查看excel"
  },
  {
    rest: "/fileupload/downExcle/",
    descr:"导出excel"
  },
  {
    rest: "/exceluploadhistory/refresh",
    descr:"删除文件"
  },
  // 系统日志
  {
    rest: '/log/list',
    descr: '查看日志'
  }

//行政区划
{
  rest: "/administrative/listTree",
    descr:"获取行政区划"
 },
 {
   rest: "/administrative/create",
     descr:"新增行政区划"
 },
 {
   rest: "/administrative/get",
   descr:"行政区划详情"
 },
 {
   rest: "/administrative/refresh",
   descr:"修改行政区划"
 },
 {
   rest: "/administrative/remove",
   descr:"删除行政区划"
 },
 //热源管理
 {
   rest: "/boilerhouse/list",
   descr:"获取锅炉房"
 },
 {
   rest: "/boilerhouse/create",
     descr:"新增锅炉房"
 },
 {
   rest: "/boilerhouse/refresh",
   descr:"修改锅炉房"
 },
 {
   rest: "/boilerhouse/remove",
     descr:"删除锅炉房"
 },
 //烟囱管理
 {
     rest: "/chimney/list",
   descr:"获取烟囱"
 },
 {
     rest: "/chimney/create",
   descr:"新增烟囱"
 },
 {
   rest: "/chimney/refresh",
     descr:"修改烟囱"
 },
 {
   rest: "/chimney/remove",
     descr:"删除烟囱"
 },
 {
   rest: "/position/listPosition",
     descr:"获取公司"
 },
 {
   rest: "/boilerhouse/listboilerhouse",
   descr:"获取锅炉房"
 },
 //客户管理
 {
   rest: "/customer/list",
   descr:"获取客户"
 },
 {
   rest: "/customer/create",
     descr:"新增客户"
 },
 {
   rest: "/customer/refresh",
     descr:"修改客户"
 },
 {
   rest: "/customer/remove",
   descr:"删除客户"

 },
 {
   rest: "/customer/registered",
   descr:"启用客户"
 },
 {
    rest: "/customer/blockUp",
    descr:"停用客户"
 },
 //字典管理
 {
   rest: "dictionary/list",
   descr:"获取参数"
 },
 {
   rest: "/dictionary/create",
   descr:"新增参数"
 },
 {
   rest: "/dictionary/refresh",
   descr:"修改参数"
 },
 {
   rest: "/dictionary/remove",
   descr:"删除参数"
 },
 //登录
 {
   rest: "/user/signIn",
 descr:"登录"
 },
 //组织机构管理
 {
   rest: "/organization/list",
   descr:"获取组织机构"
 },
 {
   rest: "/organization/create",
   descr:"新增组织机构"

 },
 {
   rest: "/organization/refresh",
   descr:"修改组织机构"
 },
 {
   rest: "/organization/remove",
   descr:"删除组织机构"

 },
 {
   rest: "/organization/registered",
 descr:"启用公司"
 },
 {
   rest: "/organization/blockUp",
   descr:"停用公司"
 },
 //位置
 {
   rest: "/position/listPosition",
 descr:"获取公司"
 },
 //公司注册
 {
   rest: "/register/list",
     descr:"审批列表"

 },
 {
   rest: "/register/create",
   descr:"公司新增"
 },
 {
   rest: "/register/blockUp",
   descr:"申请驳回"
 },
 {
   rest: "/register/registered",
   descr:"申请通过"
 },
 {
   rest: "/register/refresh",
   descr:"修改公司注册"
 },
 {
   rest: "/register/remove",
   descr:"删除公司注册"
 },
 {
   rest: "/register/test",
   descr:"获取手机验证码"
 },
 //角色管理
 {
   rest: "/role/list",
   descr:"获取角色"

 },
 {
   rest: "/role/create",
   descr:"新增角色"

 },
 {
   rest: "/role/refresh",
   descr:"修改角色"

 },
 {
    rest: "/role/remove",
  descr:"删除角色"
 },
 {
   rest: "/role/authorization",
     descr:"角色菜单及授权功能页面"
 },
 {
   rest: "/role/refreshAuth",
   descr:"修改角色权限"
 },
  //用户管理
 {
   rest: "/user/initView",
   descr:"权限显示菜单"
 },

 {
   rest: "/user/list",
     descr:"获取用户"
 },
 {
   rest: "/user/create",
   descr:"新增用户"
 },
 {
    rest: "/user/listUser",
    descr:"得到公司下的用户"
 },
 {
   rest: "/user/refresh",
   descr:"修改用户"
 },
 {
   rest: "/user/remove",
   descr:"删除用户"
 },
 {
   rest: "/user/startUsing",
     descr:"审核通过"
 },
 {
   rest: "/user/unregistered",
   descr:"审核不通过"

 },
 {
   rest: "/user/blockUp",
   descr:"停用"
 },
 {
   rest: "/user/refreshPassword",
   descr:"重置密码"
 }


]
