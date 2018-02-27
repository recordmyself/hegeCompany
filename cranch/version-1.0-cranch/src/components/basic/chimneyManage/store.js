export const store = {
    searchData: {
        page:1,
        rows:20,
        orderBy:"id",
        sc:"DESC",
        startDate:null,//开始时间
        endDate:null,//结束时间
        eventTime:[],
        gasSn:null, //烟囱编号
        company:null,//组织名称
        houseName:null //锅炉房名称 
    },
    tableData: [],
    form: {
        longitude:null, //经度
        latitude:null, //纬度
        gasSn:null,//烟囱编号
        name:null,//烟囱名称
        company:null,//单位名称
        userSn:null,//登记证编号
        houseName:null,//所属锅炉房
        installationUnit:null,//安装公司
        head:null,//负责人
        phone:null,//电话
        operator:null,//操作员
    },
    searchCompany:[],
    searchBoilerHouse: [],
    companyOptions: [],
    heatStationOptions: [],
    company: [],
    heatOrigin: [],
    rules: {
        gasSn: [
            { required: true, message: '这是必填项', trigger: 'blur' }
        ],
        name: [
            { required: true, message: '这是必填项', trigger: "blur" }
        ],
        //经度
        // long: [
        //     { required: true, message: '这是必填项', trigger: "blur" },
        //     { pattern: /^\d+(\.\d+)?$/, message:'必须输入数字', trigger: 'blur' }
        // ],
        // 负责人
        head: [
            { required: true, message: '这是必填项', trigger: "blur" }
        ],
        company: [
            { required: true, message: '这是必填项', trigger: "blur" }
        ],
        userSn: [
            { required: true, message: '这是必填项', trigger: "blur" },
            { pattern: /^[0-9]*$/, message: '请输入数字', trigger: 'blur' }
        ],
        
        houseName: [
            { required: true, message: '这是必填项', trigger: "blur" }
        ],
        installationUnit: [
            { required: true, message: '这是必填项', trigger: "blur" }
        ],
        operator: [
            { required: true, message: '这是必填项', trigger: "blur" }
        ]
    },
    multipleSelection: [],
      title: '烟囱信息',
      downloadLoading: false,
      header: [
        "创建时间",
        "烟囱编号",
        "烟囱名称",
        "所属机构",
        "所属锅炉房",
        "安装公司",
        "负责人",
        "电话",
        "经度",
        "纬度"
      ],
      prop: [
        "createDate",
        "gasSn",
        "name",
        "company",
        "houseName",
        "installationUnit",
        "head",
        "phone",
        "longitude",
        "latitude"
      ],
    singleId:null,
    initGasSn: null, //初始烟囱编号
    //存储按钮信息
    buttonListArr :[],  
    //控制显示
    banInput: false,
    listLoading: false,
    //以下为控制显示的属性
    dialogFormVisible: false   
}