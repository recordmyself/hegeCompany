//报警信息数据
export const AlarmInfoProtocal = {
  //http://192.168.0.196:8124
  list: {
    rest: "/alarminfo/list",
    request: {

      page: 1,
      rows: 20,
      orderBy: "id",
      sc: "ASC",
    
      boilerName: null, //锅炉房
      parameter: null, //报警的属性
      startTime: null, //开始时间
      endTime: null, //结束时间
      level: null, //级别
    },
    response: {

    	status:"OK",
    	result:[{
    		  id: null,
    	      parameter: null, //报警的属性
    	      value: null, //报警属性的值
    	      limitValue: null, //报警值的范围
    	      isState: null, //状态
    	      level: null, //级别    1001 高  1002低
    	      descr: null, //备注
    	      gasName: null, //烟冲
    	      revTime: null, //时间
    	}]
    }
  }
}
