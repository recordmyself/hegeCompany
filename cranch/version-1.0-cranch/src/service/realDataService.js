export const server = {
  //C 实时数据 - - 根据id查询实时记录
  realData: {
    rest: "/boilerealtime/get",
    request: {
      unitId: null
    },
    response: {
      status: "OK",
      result: {
        city: null,
        area: null,
        company: null,
        boilerHourseName: null,
        unitId: null, //锅炉Id
        companyId: null, //公司Id
        siteId: null, //锅炉房Id
        revTime: null, //时间
        ewTp: null, //进水温度
        owTp: null, //出水温度
        ewPa: null, //进水压力
        owPa: null, //出水压力
        boilerPa: null, //锅炉压力
        hearthTp: null, //炉膛温度
        fsmokeTp: null, //省煤器前烟温
        bsmokeTp: null, //省煤器后烟温
        bowTp: null, //省煤器出水温
        blowerFrequency: null, //鼓风机频率
        blowerCurrent: null, //鼓风机电流
        blastPressure: null, //鼓风压力
        burnerOpening: null, //省燃烧器开度
        gasContainer: null, //单位燃气量
        amassGas: null, //累积燃气量
        residueGas: null, //剩余燃气量
        tubePa: null, //燃气母管压力
        filtrationPa: null, //过滤器后压力
        dp: null, //压差
        waterFlow: null, //供水流量
        instantTp: null, //瞬时热量
        gtTp: null, //累计热量
        o2: null, //烟气含氧量
        /******* 锅炉信息  ***************/
        boilerName: null, //锅炉名称
        boilerTpyeName: null, //锅炉型号
        overHauler: null, //检修人
        phone: null, //电话
      }
    }
  },
  // 实时数据曲线图--完成2/3
  efficiency: {
    rest: "/boilerratio/efficiency",
    request: {
      unitId: null, //锅炉id
    },
    response: {
      status: "OK",
      result: {
        id: null,
        realityRatio: null, //实际
        theoryRatio: null, //理论效率
        revTime: null, //时间
      }

    }
  },
  smoke: {
    rest: "/boilerratio/smoke",
    request: {
      unitId: null, //锅炉id
    },
    response: {
      status: "OK",
      result: {
        id: null,
        realityRatio: null, //实际
        theoryRatio: null, //理论效率
        revTime: null, //时间
      }

    }
  },
  load: {
    rest: "/boilerratio/load",
    request: {
      unitId: null, //锅炉id
    },
    response: {
      status: "OK",
      result: {
        id: null,
        realityRatio: null, //实际
        revTime: null, //时间
      }

    }
  },
  // 报警数据 -- 首页地图位置报警
  listPotion: {
    rest: "/position/listPotion",
    request: {
      city: null, //市
      area: null, //区
      company: null, //公司
      boiler: null, //锅炉房
    },
    response: {
      status: "OK",
      result: {
        id: null,
        parentId: null,
        city: null, //市
        area: null, //区
        village: null, //乡
        longitude: null, //经度
        latitude: null, //纬度
        stateNum: null, // 0不报警    1报警
      }
    }
  },
  //首页条件查询数据
  listTreePotion: {
    rest: "/position/listTree",
    request: {
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
  // 点击标注获取信息 公司信息
  getHouseInfo: {
    rest: "/position/getHouseInfo",
    request: {
      id: null, //锅炉房地址ID (position的id)
    },
    response: {
      status: "OK",
      result: {
        id: null,
        orgBingId: null, //所属组织机构（父公司）
        orgSmallId: null, //所属组织机构（子公司）
        positionId: null, //锅炉房地址Id
        unitId: null, //锅炉Id
        sn: null, //锅炉房编号 （编号规则)
        name: null, //锅炉房名称
        type: null, //类型  锅炉房性质  (1:热电 2:区域锅炉房 3:核电 4:工业余热)
        boilerQuantity: null, //锅炉数量
        heatingCapacity: null, //供热能力((面积数))
        civilArea: null, //民用面积
        publicArea: null, //公建面积
        plantAndOther: null, //厂房及其他
        status: null, //状态
        alarmStatus: null, //报警状态 （1:不报警   2：报警）
        property: null, //性质
        capacity: null, //容量
        thermalNumber: null, //统管热力站数(建立热力站与热源的关系)
        heatingArea: null, //供热面积
        boilerNum: null, //锅炉数量
        companyName: null, //公司名称
        address: null, //具体地址

      }
    }
  },
  // 锅炉列表
  getBoilerList: {
    rest: "/position/getBoilerList",
    request: {
      id: null, //锅炉房地址ID (position的id)
      page: 1,
      rows: 20,
      orderBy: "id",
      sc: "DESC"
    },
    response: {
      status: "OK",
      result: {
        unitId: null, //锅炉id
        name: null, //锅炉名称
        boilerType: null, //锅炉型号
        installDate: null, //安装日期
        overhauler: null, //检修人
        alarmStatus: null, //报警状态 （1：正常  2：异常）
        phone: null
      }
    }
  },
  // 报警列表
  getAlarmList: {
    rest: "/position/getAlarmList",
    request: {
      siteId: null, //锅炉房地址ID (position的id)
      page: 1,
      rows: 20,
      orderBy: "id",
      sc: "DESC"
    },
    response: {
      status: "OK",
      result: {
        boilerName: null, //锅炉名称
        level: null, //级别
        parameter: null, //报警数据
        revTime: null, //时间
        descr: null, //备注
      }
    }
  },
  // 锅炉历史数据列表
  bhoilerhistory: {
    rest: "/bhoilerhistory/list",
    request: {
      page: 1,
      rows: 20,
      orderBy: "id",
      sc: "DESC",
      startTime: null,
      endTime: null,
      unitId: null, //锅炉房Id
      companyId: null, //公司id
      name: null, //字段名名称
      upLine: null, //上线
      downLine: null, //下线

    },
    response: {
      status: "OK",
      result: {
        id: null,
        revTime: null, //时间
        unitId: null, //锅炉Id
        bilerHouserName: null, //锅炉房名称
        companyId: null, //公司Id
        siteId: null, //锅炉房Id
        ewTp: null, //进水温度
        owTp: null, //出水温度
        ewPa: null, //进水压力
        owPa: null, //出水压力
        boilerPa: null, //锅炉压力
        hearthTp: null, //炉膛温度
        fsmokeTp: null, //省煤器前烟温
        bsmokeTp: null, //省煤器后烟温
        bowTp: null, //省煤器出水温
        blowerFrequency: null, //鼓风机频率
        blowerCurrent: null, //鼓风机电流
        blastPressure: null, //鼓风压力
        burnerOpening: null, //省燃烧器开度
        gasContainer: null, //单位燃气量
        amassGas: null, //累积燃气量
        residueGas: null, //剩余燃气量
        tubePa: null, //燃气母管压力
        filtrationPa: null, //过滤器后压力
        dp: null, //压差
        waterFlow: null, //供水流量
        instantTp: null, //瞬时热量
        gtTp: null, //累计热量
        o2: null, //烟气含氧量

      }
    }
  },
  // 所有锅炉房
  boilerHourse: {
    rest: "/bhoilerhistory/boilerHourse",
    request: {
    },
    response: {
      status: "OK",
      result: {
        id: null,
        boiler: null
      }
    }
  },
  // 所有锅炉
  getAllBoiler: {
    rest: "/bhoilerhistory/getAllBoiler",
    request: {
    },
    response: {
      status: "OK",
      result: {
        unitId: null, //锅炉id
        name: null
      }
    }
  },
  // 报警设置页面
  limitValueSet: {
    rest: "/limitvalueset/listConfig",
    request: {
      id: null,
      label: null,
      ruleList: [
        {
          label: null, //
          img: null, //
          script: null //
        }, {
          label: null,
          img: null,
          script: null
        }
      ]
    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  // 报警设置保存
  create: {
    rest: "/limitvalueset/create",
    request: {
      list: [
        {
          unitId: 1, //锅炉id
          name: null, //名称
          limitMin: null, //下限
          limitMax: null, //上线
          passportId: '110',
          token: null, //登录
        }
      ]
    },
    response: {
      status: "OK",
      result: true | false
    }
  },
  // 报警信息
  alarmInfo: {
    //报警信息
    rest: "/alarminfo/list",
    request: {
      page: 1,
      rows: 20,
      unitId: null,
      orderBy: "id",
      sc: "DESC",
      revTime: null, //时间
      parameter: null, //报警的属性
      endTime: null, //结束时间
      level: null, //级别
    },
    response: {
      status: "OK",
      result: {
        id: null,
        unitId: null, //锅炉Id
        siteId: null, //锅炉站点
        revTime: null, //时间
        parameter: null, //报警的属性
        value: null, //报警属性的值
        limitValue: null, //报警值的范围
        level: null, //级别
        isState: null, //状态
        year: null, //年
        month: null, //月
        day: null, //天
        descr: null, //备注
      }
    }
  },
  // 模板下载
  fileupload: {
    download: {
      rest: "/fileupload/download",
      request: {
      },
      response: {
        status: "OK",
        result: {}
      }
    },
    upload: {
      rest: "/fileupload/upload",
      request: {
        boilerHouseName: 5,
        boilerName: 12
      },
      response: {
        status: "OK",
        result: {}
      }
    }
  },
  /**
 * 文件上传历史查询
 */
  excel: {
    rest: "/excel/list",
    request: {
      page: 1,
      rows: 20,
      unitId: null,
      orderBy: "id",
      sc: "DESC"
    },
    response: {
      status: "OK",
      result: {
        id: null,
        fileName: null,
        company: null,
        size: null,
        stateTime: null,
        address: null,
        boilerHouseName: null,
        boilerName: null
      }
    }

  },
  // excel导出
  downExcle: {
    rest: "/fileupload/downExcle/",
    request: {
    },
    response: {
      status: "OK",
      result: {}
    }
  },
  //文件查看
  selectExcle: {
    rest: "/fileupload/selectExcle",
    request: {
      address: null,
    },
    response: {
      status: "OK",
      result: {
        NUMBER: null, //序号
        NORN_NUMBER: null, //标准序号z
        DATA_SOURCES: null, //数据来源
        TEST_DATA: null, //试验数据
      }
    }
  },
  // 反馈结果
  resultdata: {
    rest: "/resultdata/list",
    request: {
      siteId: null,
      startTime: null,
      endTime: null,
      page: 1,
      rows: 20,
      orderBy: "id",
      sc: "DESC"
    },
    response: {
      status: "OK",
      result: {
        revTime: null, //数据采集时间
        eff1: null, //正平衡效率
        eff2: null, //反平衡效率
        eff: null, //锅炉平均效率
        r: null, //锅炉负荷
        q: null, //供热量
        hin: null, //给水焓值
        hout: null, //热水焓值
        vO: null, //理论空气量
        alfa: null, //尾部烟气过量空气系数
        hair: null, //空气焓值
        vH2O: null, //尾部烟气含水量
        vN2: null, //尾部烟气含氮量
        vO2: null, //尾部烟气含氧量
        hpy: null, //排烟焓值
        q2: null, //排烟损失
      }
    }
  },
  // 检测报告
  reportdata: {
    // 发送反馈结果
    create: {
      rest: "/reportdata/create",
      request: {
        ids: []
      },
      response: {
        status: "OK",
        result: {}
      }
    },
    //查询报告历史
    list: {
      rest: "/reportdata/list",
      request: {
        passportId: null,
        toekn: null,
        page: 1,
        rows: 20,
        orderBy: "id",
        sc: "DESC",
        projectUnit: null, //委托单位
        projectNumber: null, //报告编号
        detectType: null, //检测类型
        state: null, //状态
        detectOrg: null, //检测机构
        stateTime: null, //开始时间
        endTime: null, //结束时间
      },
      response: {
        status: "OK",
        result: {
          id: null,
          projectName: null, //项目名称
          projectNumber: null, //报告编号
          projectUnit: null, //委托单位
          detectType: null, //检测类型
          detectOrg: null, //检测机构
          state: null, //状态
          revTime: null
        }
      }
    }

  },
  // 检测报告修改 提交过后   变为待审批
  updatestatecheck: {
    rest: "/reportdata/updatestatecheck",
    request: {
      id: null, //id
      state: null, //状态
    },
    response: {
      status: "OK",
      result: {}
    }
  },

  //成功 审批
  updatestatesuccess: {
    rest: "/reportdata/updatestatesuccess",
    request: {
      id: null, //id
      state: null, //状态
    },
    response: {
      status: "OK",
      result: {}
    }
  },

  //驳回
  updatestatereject: {
    rest: "/reportdata/updatestatereject",
    request: {
      id: null, //id
      state: null, //状态
    },
    response: {
      status: "OK",
      result: {}
    }
  },
  //编辑
  editupdate: {
    rest: "/reportdata/editupdate",
    request: {
      id: null
    },
    response: {
      status: "OK",
      result: {
        reportId: null, //报表id
        unitId: null, //锅炉Id
        companyId: null, //公司Id
        siteId: null, //锅炉房Id
        number: null, //报告编号
        danWei: null, //委托单位
        sheBeiName: null, //设备名称
        xinHao: null, //设备型号
        riQi: null, //测试日期
        chuLi: null, //设计出力
        yanLiao: null, //试验用燃料
        yaLi: null, //额定压力
        boilerChiChun: null, //锅炉尺寸
        wenDu: null, //给水温度
        meiQiYaLi: null, //省煤器尺寸
        anZhuanTime: null, //安装日期
        lengLinQi: null, //冷凝器尺寸
        shiYanMuDi: null, //试验目的
        shuoMing: null, //试验说明
        jianCeYiJian: null, //检测意见
        qianFa: null, //签发日期
        piZhunName: null, //批准
        shenHeName: null, //审核
        bianZhiName: null, //编制
      }
    }
  },
  // 查看
  getAll: {
    rest: "/reportdata/getAll",
    request: {
      passportId: null,
      token: null,
      id: null, //id

    },
    response: {
      status: "OK",
      result: {
        pdf: {
          reportId: null, //报表id
          unitId: null, //锅炉Id
          companyId: null, //公司Id
          siteId: null, //锅炉房Id
          number: null, //报告编号
          danWei: null, //委托单位
          sheBeiName: null, //设备名称
          xinHao: null, //设备型号
          riQi: null, //测试日期
          chuLi: null, //设计出力
          yanLiao: null, //试验用燃料
          yaLi: null, //额定压力
          boilerChiChun: null, //锅炉尺寸
          wenDu: null, //给水温度
          meiQiYaLi: null, //省煤器尺寸
          anZhuanTime: null, //安装日期
          lengLinQi: null, //冷凝器尺寸
          shiYanMuDi: null, //试验目的
          shuoMing: null, //试验说明
          jianCeYiJian: null, //检测意见
          qianFa: null, //签发日期
          piZhunName: null, //批准
          shenHeName: null, //审核
          bianZhiName: null, //编制
        },

        eh: {
          tair: null, //环境温度
          tin: null, //给水温度
          tout: null, //热水温度
          pin: null, //给水压力
          pout: null, //热水压力
          g: null, //热水流量
          tpy: null, //烟气温度
          o2: null, //含氧量
          bp: null, //燃气流量
          calcstate: null, //计算状态
          pgas: null, //燃气压力

          ch4: null,
          c2h2: null,
          c2h4: null,
          c2h6: null,
          c3h6: null,
          c3h8: null,
          c4h8: null,
          c4h10: null,
          c5h12: null,
          c6h6: null,
          ot: null,
          n2: null,
          h2: null,
          h2s: null,
          so2: null,
          co: null,
          co2: null,
          water: null,
          qpp: null,
          q3: null,
          q5: null,
          qe: null
        },

        rd: {
          revTime: null, //数据采集时间
          eff1: null, //正平衡效率
          eff2: null, //反平衡效率
          eff: null, //锅炉平均效率
          r: null, //锅炉负荷
          q: null, //供热量
          hin: null, //给水焓值
          hout: null, //热水焓值
          vO: null, //理论空气量
          alfa: null, //尾部烟气过量空气系数
          hair: null, //空气焓值
          vH2O: null, //尾部烟气含水量
          vN2: null, //尾部烟气含氮量
          vO2: null, //尾部烟气含氧量
          hpy: null, //排烟焓值
          q2: null, //排烟损失
        }
      }
    }
  },
  // 导出pdf
  downPdf: {
    rest: "/fileupload/downPdf",
    request: {
      id: null
    },
    response: {
      status: "OK",
      result: {}
    }
  },
  // 导出正平衡
  downZhengPdf: {
    rest: "/fileupload/downZhengPdf",
    request: {
      id: null
    },
    response: {
      status: "OK",
      result: {}
    }
  },

  // 保存
  refresh: {
    rest: "/reportpdf/refresh",
    request: {
      passportId: null,
      token: null,
      id: null,
      reportId: null, //报表id
      unitId: null, //锅炉Id
      companyId: null, //公司Id
      siteId: null, //锅炉房Id
      number: null, //报告编号
      danWei: null, //委托单位
      sheBeiName: null, //设备名称
      xinHao: null, //设备型号
      riQi: null, //测试日期
      chuLvi: null, //设计出力
      yanLia: null, //试验用燃料
      yaLi: null, //额定压力
      boilerChiChun: null, //锅炉尺寸
      wenDu: null, //给水温度
      meiQiYaLi: null, //省煤器尺寸
      anZhuanTime: null, //安装日期
      lengLinQi: null, //冷凝器尺寸
      shiYanMuDi: null, //试验目的
      shuoMing: null, //试验说明
      jianCeYiJian: null, //检测意见
      qianFa: null, //签发日期
      piZhunName: null, //批准
      shenHeName: null, //审核
      bianZhiName: null, //编制
    },
    response: {
      status: "OK",
      result: {}
    }
  },

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
  // 树信息
  initView: {
    rest: "/user/initView",
    request: {},
    response: {
      status: "OK",
      result: true | false
    }
  }
}
