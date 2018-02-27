export const LoginProtocal = {
  //http://192.168.0.183:8870 登录

  signIn: {
    rest: "/user/signIn",
    request: {
      account: null,
      password: null
    },
    response: {
      status: "OK",
      result: {
        id: null,
        sn: null,
        account: null, //登录名
        password: null, //密码
        userName: null, //用户名
        mobile: null, //手机号
        email: null, //邮箱
        lastLoginTime: null, //最后登录时间
        loginNum: null, //登录次数
        status: null,
        memo: null, //备忘录
        orgId: null, //所属组织机构
        orgName: null,
        createBy: null,
        createByName: null,
        createDate: null,
        lastUpdateBy: null,
        lastUpdateDate: null,
        startTime: null, //有效开始时间
        endTime: null, //有效结束时间
        memberType: null, //会员类型1.免费 2.付费
        roleName: null, //角色名
      }
    }
  }

}
