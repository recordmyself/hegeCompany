export const store = {
    searchData: {
        englishType:null,//英文类型
        chineseType:null, //中文类型
        gasType: null, //烟囱类型
    },
    tableData: [],
    form: {
        desc:null,    //备注
        englishType:null, //英文类型
        chineseType: null,  //中文类型
        type: null,//烟气类型

        value:null,//值
        status:null,  //状态
        createBy:null , //创建人
        lastUpdateBy:null,  //最后修改人
        createDate:null,  //创建日期
        lastUpdateDate:null,    //最后修改日期
        isDeleted:null, //是否删除
        param1: null,
        param2: null,
        param3: null,
        param4: null,
        param5: null,
        param6: null,
        param7: null,
        param8: null,
        param9: null,
        param10: null,
    },
    // 指标
    dataType: [
      {label: '烟气含氧量' ,value:'oxO2'},
      {label: 'Nox折算浓度' ,value:'noxCt'},
      {label: '烟气流速', value:'flow'},
      {label: '烟气压力', value:'stress'},
      {label: '烟气温度', value:'tp'},
      {label: '烟气湿度' ,value:'hdy'},
      {label: 'Nox实测PPM浓度', value:'ppm'},
      {label: 'Nox标态质量浓度', value:'qltppm'},
      {label: '烟道截面积' ,value:'area'},
      {label: '标态烟气流量', value:'ssflow'},
      {label: '热态烟气流量',value:'tmflow'},
    ],
    // 表格
    tableDate1: [],
    arrDate: [],
    create: false,
    // 行数
    rowsNum: 0,

    // 修改
    resDate: {},

    paramList: [

    ],
    rules: {
        desc:[
            { required: true, message: '这是必填项', trigger: "blur" },
      ],
        type: [
          { required: true, message: '这是必填项', trigger: "blur" },
      ],
        englishType:[
            { required: true, message: '这是必填项', trigger: "blur" },
            // { pattern: /^[a-zA-Z]{0,}$/, message: '应输入英文', trigger: 'blur' }
        ],
        chineseType:[
            { required: true, message: '这是必填项', trigger: "blur" },
            // { pattern: /^[\u4e00-\u9fa5]{0,}$/, message: '应输入中文', trigger: 'blur'}
        ],
    },
    typeOptions: [
        { value:'1', label:"煤" },
        { value:'2', label:"油" },
        { value:'3', label:"气" }
    ],
    multipleSelection: [],
    title: '字典信息',
    downloadLoading: false,
    header: [
      "字典类型(英文)",
      "字典类型(中文)",
    ],
    prop: [
        "englishType",
        "chineseType",
    ],
    //按钮信息
    buttonListArr :[],
    //控制显示
    listLoading: false,
    dialogFormVisible: false
}
