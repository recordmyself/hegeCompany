export const userLog = {
  // 用户登录
  rest: "/user/signIn",
  request: {
    account: null, //登录名  gljc
    password: null, //密码     123
  },
  response: {
    status: "OK",
    result: true | false
  }
}
export const user = {
  //分页(加载列表+ 查询功能)  已完成
  list: {
    rest: "/user/list",
    request: {
      page: 1,
      rows: 20,
      orderBy: "id",
      sc: "DESC",
      sn: null,
      account: null,
      userName: null,
      status: null,
      createBy: null,
      createByName: null,
      createDate: null,
      lastLoginTime: null
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
        lastUpdateDate: null
      }
    }
  },
  // 新增 (无所属员工字段) create: {   rest: "/user/create",   request: {     sn: null,
  // account: null, //登录名     roleIdList: [       7, 8     ],     password: null,
  // //密码     userName: null, //用户名     mobile: null, //手机号     email: null, //邮箱
  //    lastLoginTime: null, //最后登录时间     loginNum: null, //登录次数     status:
  // null,//状态     memo: null, //备忘录     orgId: null, //所属组织机构     orgName: null,
  //    createBy: null,     createByName: null,     createDate: null,
  // lastUpdateBy: null,     lastUpdateDate: null   },   response: {     status:
  // "OK",     result: true | false   } },
  create: {
    rest: "/user/create",
    request: {
      // account:null, //登录名 password:null,//密码 userName:null,//用户名 mobile:null,
      // //手机号 email:null , //邮箱 memberType:null, //会员类型0.免费 1.付费 roleName:null,
      // //角色名称 memo:null,//备住 orgId:null,//所属组织机构id orgName:null,//所属组织机构名字
      // startTime:null,//有效开始时间 endTime:null//有效结束时间
    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  //修改
  refresh: {
    rest: "/user/refresh",
    request: {
      // id: null, account:null, //登录名 roleIdList:null, password:null,//密码
      // userName:null,//用户名 checkPassword: null, mobile:null,  //手机号 email:null ,
      // //邮箱 // status:null, orgId:null,//所属组织机构 orgName:null, memberType: null, //
      // roleName: [], startDate:{     time: null }, //开始日期 endDate:{     time: null
      // },  //结束日期 startTime: null, endTime: null
    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  //删除
  remove: {
    rest: "/user/remove",
    request: {
      idList: []
    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  //停用
  blockUp: {
    rest: "/user/blockUp",
    request: {
      idList: []
    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  //审核通过（已注册）
  startUsing: {
    rest: "/user/startUsing",
    request: {
      idList: []
    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  // , //审核不通过（未注册）
  unregistered: {
    rest: "/user/unregistered",
    request: {
      idList: []
    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  //修改密码
  refreshPassword: {
    rest: "/user/refreshPassword",
    request: {
      id: null,
      password: null
    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  //roleid查询(先查再改）
  get: {
    rest: "/user/get",
    request: {
      id: null
    }
  },
  getStaff: {
    rest: '/user/listUser',
    request: {
      orgId: null
    }
  }
}
export const role = {
  list: {
    rest: "/role/list",
    request: {
      page: 1,
      rows: 20,
      orderBy: "id",
      sc: "DESC",
      name: null,
      createDate: []
    },
    response: {
      status: "OK",
      result: {
        id: null,
        name: null,
        descr: null
      }
    }
  },
  //新增
  create: {
    rest: "/role/create",
    request: {
      // sn:null,
      name: null,
      descr: null,
      // menuList:null, status:null, createDate:null , lastUpdateDate:null,
      // createBy:null, lastUpdateBy:null, isDelete:null
    },
    response: {
      status: "OK",
      result: true | false
    }
  },

  //修改
  refresh: {
    rest: "/role/refresh",
    request: {
      id: null,
      name: null,
      descr: null

    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  //删除
  remove: {
    rest: "/role/remove",
    request: {
      id: null
    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  //权限
  authorization: {
    rest: "/role/authorization",
    request: {
      passportId: 0,
      token: null,
      id: 0
    },
    response: {
      status: "OK",
      result: {
        refreshRole: {
          id: 0,
          name: null,
          menuList: []
        },
        menuList: [
          {
            id: 0,
            parentId: 0,
            nameCn: null,
            url: null,
            subMenuList: [],
            buttonList: [
              {
                id: 0,
                menuId: 0,
                name: null,
                url: null
              }
            ]
          }
        ],
        roleList: [
          {
            id: 0,
            name: null
          }
        ]
      }
    }
  },
  //角色授权
  refreshAuth: {
    rest: "/role/refreshAuth",
    request: {
      passportId: 0,
      token: null,
      id: 0,
      menuList: [
        {
          id: 0,
          parentId: 0,
          name: null,
          url: null,
          subMenuList: [],
          buttonList: [
            {
              id: 0,
              menuId: 0,
              name: null,
              url: null
            }
          ]
        }
      ]
    },
    response: {
      status: "OK",
      result: true | false
    }
  }
}
export const customer = {
  //分页
  list: {
    rest: "/customer/list",
    request: {
      page: 1,
      rows: 20,
      orderBy: "id",
      sc: "DESC",
      startTime: null, //开始时间
      endTime: null, //结束时间
      name: null, //单位名称
      memberType: null, //会员类型
      state: null, //会员状态
      createDate: []
    },
    response: {
      status: "OK",
      result: {
        id: null,
        parentId: null, //父Id
        sn: null, //客户编号
        name: null, //单位名称
        contacts: null, //联系人
        memberType: null, //会员类型
        phone: null, //电话
        principalPerson: null, //主要负责人
        province: null, //省
        city: null, //市
        notes: null, //备注
        unifiedCode: null, //统一信用代码
        affiliatedCompany: null, //所属公司
        customerType: null, //客户类型
        startTime: null, //有效期
        endTime: null, //有效期
        state: null //会员状态
      }
    }
  },
  //新增
  create: {
    rest: "/customer/create",
    request: {
      parentId: null, //父Id
      id: null,
      sn: null, //客户编号
      name: null, //单位名称
      contacts: null, //联系人
      memberType: null, //会员类型
      phone: null, //电话
      principalPerson: null, //主要负责人
      province: null, //省
      city: null, //市
      notes: null, //备注
      unifiedCode: null, //统一信用代码
      affiliatedCompany: null, //所属公司
      customerType: null, //客户类型
      startTime: null, //有效期
      endTime: null, //有效期
      validTime: [],
      state: null //会员状态

    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  //停用
  blockUp: {
    rest: "/customer/blockUp",
    request: {
      idList: []
    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  //审核通过（已注册）启用
  startUsing: {
    rest: "/customer/registered",
    request: {
      idList: []
    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  //删除
  remove : {
    rest: "/customer/remove",
    request: {
      idList:[]
           
      },
      response:{
        status:"OK",
        result: true | false 
      }
  }
}
export const boiler = {
  //分页
  list: {
    rest: "/boiler/list",
    request: {
      page: 1,
      rows: 20,
      orderBy: "id",
      sc: "DESC",
      startDate: null,
      endDate: null,
      sn: null,
      company: null,
      houseName: null
    },
    response: {
      status: "OK",
      result: {
        id: null,
        sn: null, //锅炉编号
        name: null, //锅炉名称
        phone: null, //电话
        installationUnit: null, //安装单位
        company: null, //单位名称
        houseName: null, //所属锅炉房
        head: null, //负责人
        longitude: null, //经度
        latitude: null //纬度
      }
    }

  },
  //新增
  create: {
    rest: "/boiler/create",
    request: {
      longitude: null, //经度
      latitude: null, //纬度
      sn: null, //锅炉编号
      name: null, //锅炉名称
      boilerType: null, //型号
      company: null, //单位名称
      userSn: null, //登记证编号
      houseName: null, //所属锅炉房
      outletMedium: null, //出口介质
      ratedOutput: null, //额定出力
      designEfficiency: null, //设计热效率
      ratedPressure: null, //额定压力
      designFuel: null, //设计燃料
      designTemperature: null, //设计排烟温度
      outletMediumTemperature: null, //出口介质温度
      inletMediumTemperature: null, //进口介质温度
      combustionMode: null, //燃烧方式
      combustionEquipment: null, //燃烧设备
      economizer: null, //省煤器
      airPreheater: null, //空气预热器
      installationUnit: null, //安装公司
      head: null, //负责人
      phone: null, //电话
      operator: null //操作员
    },
    response: {
      status: "OK",
      result: true | false
    }
  },

  //修改
  refresh: {
    rest: "/boiler/refresh",
    request: {

    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  //删除
  remove: {
    rest: "/boiler/remove",
    request: {
      id: null
    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  //新增
  create: {
    rest: "/boiler/create",
    request: {
      sn: null, //锅炉编号
      name: null, //锅炉名称
      boilerType: null, //锅炉型号
      orgId: null, //所属组织机构
      manuFacturer: null, //生产厂家
      installAddress: null, //安装地址
      installDate: null, //安装日期
      lastRepairDate: null, //最后一次检修日期
      overhauler: null, //检修人
      //	            orgName:null,
      createBy: null,
      createDate: null,
      lastUpdateBy: null,
      lastUpdateDate: null

    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  //查询
  get: {
    rest: "/boiler/get",
    request: {
      sn: null, //锅炉编号
      name: null, //锅炉名称
      boilerType: null, //锅炉型号
      orgId: null, //所属组织机构
      manuFacturer: null, //生产厂家
      installAddress: null, //安装地址
      installationUnit: null, //安装单位
      installDate: null, //安装日期
      lastRepairDate: null, //最后一次检修日期
      overhauler: null, //检修人
      //	            orgName:null,
      createBy: null,
      createDate: null,
      lastUpdateBy: null,
      lastUpdateDate: null
    },
    response: {
      status: "OK",
      result: {
        id: null,
        sn: null, //锅炉编号
        name: null, //锅炉名称
        boilerType: null, //锅炉型号
        orgId: null, //所属组织机构
        manuFacturer: null, //生产厂家
        installAddress: null, //安装地址
        installationUnit: null, //安装单位
        installDate: null, //安装日期
        lastRepairDate: null, //最后一次检修日期
        overhauler: null, //检修人
        //		            orgName:null,
        createBy: null,
        createDate: null,
        lastUpdateBy: null,
        lastUpdateDate: null
      }
    }
  },
  //修改
  refresh: {
    rest: "/boiler/refresh",
    request: {
      sn: null, //锅炉编号
      name: null, //锅炉名称
      boilerType: null, //锅炉型号
      orgId: null, //所属组织机构
      manuFacturer: null, //生产厂家
      installAddress: null, //安装地址
      installationUnit: null, //安装单位
      installDate: null, //安装日期
      lastRepairDate: null, //最后一次检修日期
      overhauler: null, //检修人
      //	            orgName:null,
      createBy: null,
      createDate: null,
      lastUpdateBy: null,
      lastUpdateDate: null

    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  //删除
  remove: {
    rest: "/boiler/remove",
    request: {
      id: null
    },
    response: {
      status: "OK",
      result: true | false
    }
  }
}

export const dictionary = {
  //分页
  list: {
    rest: "/dictionary/list",
    request: {
      page: 1,
      rows: 20,
      orderBy: "id",
      sc: "DESC",
      name: null, //名称
      englishType: null, //英文类型
      chineseType: null //中文类型
    },
    response: {
      status: "OK",
      result: {
        id: null,
        name: null, //字典名称
        englishType: null, //英文类型
        chineseType: null, //中文类型
        value: null, //值
        status: null, //状态
        createBy: null, //创建人
        lastUpdateBy: null, //最后修改人
        createDate: null, //创建日期
        lastUpdateDate: null, //最后修改日期
        isDeleted: null //是否删除

      }
    }
  },
  //新增
  create: {
    rest: "/dictionary/create",
    request: {
      name: null, //字典名称
      englishType: null, //英文类型
      chineseType: null, //中文类型
      value: null, //值
      status: null, //状态
      createBy: null, //创建人
      lastUpdateBy: null, //最后修改人
      createDate: null, //创建日期
      lastUpdateDate: null, //最后修改日期
      isDeleted: null //是否删除
    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  //查询
  get: {
    rest: "/dictionary/get",
    request: {
      name: null, //字典名称
      englishType: null, //英文类型
      chineseType: null, //中文类型
      value: null, //值
      status: null, //状态
      createBy: null, //创建人
      lastUpdateBy: null, //最后修改人
      createDate: null, //创建日期
      lastUpdateDate: null, //最后修改日期
      isDeleted: null //是否删除
    },
    response: {
      status: "OK",
      result: {
        id: null,
        name: null, //字典名称
        englishType: null, //英文类型
        chineseType: null, //中文类型
        value: null, //值
        status: null, //状态
        createBy: null, //创建人
        lastUpdateBy: null, //最后修改人
        createDate: null, //创建日期
        lastUpdateDate: null, //最后修改日期
        isDeleted: null //是否删除
      }
    }
  },
  //修改
  refresh: {
    rest: "/dictionary/refresh",
    request: {
      name: null, //字典名称
      englishType: null, //英文类型
      chineseType: null, //中文类型
      value: null, //值
      status: null, //状态
      createBy: null, //创建人
      lastUpdateBy: null, //最后修改人
      createDate: null, //创建日期
      lastUpdateDate: null, //最后修改日期
      isDeleted: null //是否删除

    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  //删除
  remove: {
    rest: "/dictionary/remove",
    request: {
      name: null, //字典名称
      englishType: null, //英文类型
      chineseType: null, //中文类型
      value: null, //值
      status: null, //状态
      createBy: null, //创建人
      lastUpdateBy: null, //最后修改人
      createDate: null, //创建日期
      lastUpdateDate: null, //最后修改日期
      isDeleted: null //是否删除
    },
    response: {
      status: "OK",
      result: true | false
    }
  }
}
export const heatingSeason = {
  //分页
  list: {
    rest: "/heatingseason/list",
    request: {
      page: 1,
      rows: 20,
      orderBy: "id",
      sc: "DESC",
      name: null, //名称
      startDate: null,
      endDate: null
    },
    response: {
      status: "OK",
      result: {
        id: null,
        name: null, //名称
        startDate: null, //开始日期
        endDate: null, //结束日期
        status: null, //状态
        createBy: null, //创建人
        lastUpdateBy: null, //最后修改人
        createDate: null, //创建日期
        lastUpdateDate: null, //最后修改日期
        isDeleted: null //是否删除
      }
    }
  },
  //新增
  create: {
    rest: "/heatingseason/create",
    request: {
      name: null, //名称
      startDate: null, //开始日期
      endDate: null, //结束日期
      status: null, //状态
      createBy: null, //创建人
      lastUpdateBy: null, //最后修改人
      createDate: [], //创建日期
      lastUpdateDate: null, //最后修改日期
      isDeleted: null, //是否删除
    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  //修改
  refresh: {
    rest: "/heatingseason/refresh",
    request: {
      name: null, //名称
      startDate: null, //开始日期
      endDate: null, //结束日期
      status: null, //状态
      createBy: null, //创建人
      lastUpdateBy: null, //最后修改人
      createDate: null, //创建日期
      lastUpdateDate: null, //最后修改日期
      isDeleted: null //是否删除

    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  //删除
  remove: {
    rest: "/heatingseason/remove",
    request: {
      name: null, //名称
      startDate: null, //开始日期
      endDate: null, //结束日期
      status: null, //状态
      createBy: null, //创建人
      lastUpdateBy: null, //最后修改人
      createDate: null, //创建日期
      lastUpdateDate: null, //最后修改日期
      isDeleted: null //是否删除
    },
    response: {
      status: "OK",
      result: true | false
    }
  }
}
export const organization = {
  //分页
  list: {
    rest: "/organization/list",
    request: {
      page: 1,
      rows: 20,
      orderBy: "id",
      sc: "DESC",
      name: null
    },
    response: {
      status: "OK",
      result: {
        id: null,
        name: null, //名称
        tableName: null, //数据表名
        collPoint: null, //采集点
        image: null, //图片
        subordinateType: null //公司下级翻译     子公司|分公司
      }
    }
  },
  create: {
    rest: "/organization/create",
    request: {
      sn: null, //编号
      name: null, //名称
      type: null, //公司|部门|其他
      head: null, //负责人
      notes: null, //备注
      createDate: null, //创建日期
      superOrganization: null, //上级组织机构
      area: null, //区
      city: null, //市
    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  refresh: {
    rest: "/organization/refresh",
    request: {
      id: null,
      name: null, //名称
      tableName: null, //数据表名
      collPoint: null, //采集点
      image: null, //图片
      subordinateType: null, //公司下级翻译     子公司|分公司
      superOrganization: null, //上级组织机构

    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  remove: {
    rest: "/organization/remove",
    request: {
      id: null,
      name: null, //名称
      province: null, //省
      city: null, //市
    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  blockUp: {
    rest: "/organization/blockUp",
    request: {
      idList: []
    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  //审核通过（已注册）启用
  startUsing: {
    rest: "/organization/registered",
    request: {
      idList: []
    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  listOrganization: {
    rest: "/organization/listOrganization",
    request: {}
  }
}
export const boilerHouse = {
  //分页
  list: {
    rest: "/boilerhouse/list",
    request: {
      page: 1,
      rows: 20,
      orderBy: "id",
      sc: "DESC",
      name: null, //锅炉房名称
      sn: null, //锅炉房编号
      type: null, //锅炉房性质
      heatType: null, //供热类型
      capacity: null, //装机容量
      heatingCapacity: null //供热能力
    },
    response: {
      status: "OK",
      result: {
        id: null,
        sn: null, //锅炉房编号
        name: null, //锅炉房名称
        type: null, //锅炉房类型
        boilerQuantity: null, //锅炉数量
        heatingCapacity: null, //供热能力
        property: null, //热源性质
        capacity: null, //容量
        turbineNumber: null //汽机数量
      }
    }
  },
  //查询公司和市区
  listPosition: {
    rest: '/position/listPosition',
    // rest: '/position/listTree',

    request: {
      // city: null, //市 area: null, //区 company: null, //公司 boiler: null, //锅炉房
    }
  },
  listTree: {
    rest: '/position/listTree',
    request: {
      // city: null, //市 area: null, //区 company: null, //公司 boiler: null, //锅炉房
    }
  },
  //创建
  create: {
    rest: "/boilerhouse/create",
    request: {
      sn: null, //锅炉房编号
      name: null, //锅炉房名称
      type: null, //供热类型
      boilerQuantity: null, //锅炉数量
      heatingCapacity: null, //供热能力
      property: null, //热源性质
      capacity: null, //装机容量
      address: null, //详细地址
      heatingArea: null, //供热面积
      latitude: null, //纬度
      longitude: null, //经度
      turbineNumber: null, //汽机数量
      city: null, //市
      area: null, //区
      company: null //公司

    },
    response: {
      status: "OK",
      result: true | false
    }
  },

  //修改
  refresh: {
    rest: "/boilerhouse/refresh",
    request: {
      id: null,
      sn: null, //锅炉房编号
      name: null, //锅炉房名称
      type: null, //锅炉房类型
      boilerQuantity: null, //锅炉数量
      heatingCapacity: null, //供热能力
      property: null, //热源性质
      capacity: null, //容量
      turbineNumber: null //汽机数量

    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  //删除
  remove: {
    rest: "/boilerhouse/remove",
    request: {
      id: null
    },
    response: {
      status: "OK",
      result: true | false
    }
  }
}
export const register = {
  //新增
  create: {
    rest: "/register/create",
    request: {
      name: null, //单位名称
      province: null, //省
      city: null, //市
      contacts: null, //联系人
      mobile: null, //手机号
      code: null, //验证码
      unifiedCode: null, //统一社会信用代码
      fileName: [], //营业执照
      boilers: null
    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  // 获取验证码
  test: { //获取手机验证码
    rest: "/register/test",
    request: {
      mobile: null
    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  // 图片上传
  image: {
    rest: "/fileupload/image",
    request: {},
    response: {
      status: "OK",
      result: true | false
    }
  },
  //分页
  list: {
    rest: "/register/list",
    request: {
      page: 1,
      rows: 20,
      orderBy: "id",
      sc: "DESC",
      state: null, //状态
      startDate: null, //开始时间
      endDate: null //结束时间
    },
    response: {
      status: "OK",
      result: {
        id: null,
        createDate: null, //申请日期
        name: null, //公司名称
        sn: null, //锅炉编号
        boilerType: null, //锅炉型号
        manuFacturer: null, //生产厂家
        license: null, //营业执照
        province: null, //省
        city: null, //市
        state: null //状态
      }
    }
  },
  //未通过
  blockUp: {
    rest: "/register/blockUp",
    request: {
      idList: []
    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  //通过
  registered: {
    rest: "/register/registered",
    request: {
      idList: []
    },
    response: {
      status: "OK",
      result: true | false
    }
  }
}
export const admin = {
  listTree: {
    rest: "/administrative/listTree",
    request: {},
    response: {
      status: "OK",
      result: true | false
    }
  },

  //新增
  create: {
    rest: "/administrative/create",
    request: {
      city: null, //市
      area: null, //区
      avenue: null, //城市街道办事处
      name: null, //行政名称
      sn: null, //行政代码
      level: null, //级别
      type: null, //类别
      longitude: null, //经度
      latitude: null //纬度
    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  get: {
    rest: "/administrative/get",
    request: {
      city: null, //市
      area: null, //区
      avenue: null, //城市街道办事处
      committee: null, //居委会
      name: null, //行政名称
      tag: null
    },
    response: {
      status: "OK",
      result: {
        id: null,
        city: null, //市
        area: null, //区
        avenue: null, //城市街道办事处
        name: null, //行政名称
        sn: null, //行政代码
        level: null, //级别
        type: null, //类别
        longitude: null, //经度
        latitude: null //纬度
      }
    }
  },
  refresh: {
    rest: "/administrative/refresh",
    request: {
      id: null,
      city: null, //市
      area: null, //区
      avenue: null, //城市街道办事处
      name: null, //行政名称
      sn: null, //行政代码
      level: null, //级别
      type: null, //类别
      longitude: null, //经度
      latitude: null //纬度

    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  //删除
  remove: {
    rest: "/administrative/remove",
    request: {
      id: null
    },
    response: {
      status: "OK",
      result: true | false
    }
  }
}
