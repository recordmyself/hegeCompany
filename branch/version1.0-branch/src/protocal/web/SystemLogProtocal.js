export const SystemLogProtocal = {
  // 系统日志
  logList: {
    rest: "/log/list",
    request: {
      userName: null,
      roleName: null,
      orgName: null,
      dateList: [],
      number: 1, //第几页
      size: 0, //每页显示第几条
      sc: 'DESC',
      orderBy: "createDate"
    },
    response: {
      status: "OK",
      result: []
    }
  },
}
