import cascader from '../../../assets/js/proAndCity'
export const store = {
    searchData: {
        page:1,
        rows:20,
        orderBy:"id",
        sc:"DESC",
        name:null,//锅炉房名称
        sn:null, //锅炉房编号
        type:null,//供热类型
        capacity:null, //装机容量
        heatingCapacity:null,//供热能力
        company: null
    },
    tableData: [],
    heatTypeOptions: [
        { value:'煤', label:"煤" },
        { value:'油', label:"油" },
        { value:'气', label:"气" }
    ],
    heatProvideTypeOptions: [
        { value: '1', label: '热电' },
        { value: '2', label: '区域锅炉房' },
        { value: '3', label: '核电' },
        { value: '4', label: '工业余热' }
    ],
    //省市选择功能数据案例
    // province_options: [],
    // province_options: cascader.provs,
    province_options: null,
    allCity: cascader.allCity,
    //区选择
    city_options : [],
    //县乡选择
    avenue_options: null,
    committee_options: null,
    //form表单中值存储
    form: {
        sn:null,  //锅炉房编号
        name:null , //锅炉房名称
        type:null,  //供热类型
        boilerQuantity:null, //锅炉数量
        heatingCapacity:null, //供热能力
        property:null,//热源性质
        capacity:null,//装机容量
        address:null,//详细地址
        heatingArea:null,//供热面积
        latitude:null,//纬度
        longitude:null,//经度
        turbineNumber:null,//汽机数量
        city:null,//市
        area:null,//区
        avenue:null,//县
        committee:null,//镇
        company:null //公司
    },
    listPosition:[],
    multipleSelection: [],
    //导出excel文件名称
      title: '热源信息',

      header: [
        "热源编号",
        "热源名称",
        "所属公司",
        "热源性质",
        "供热类型",
        "装机容量",
        "供热能力", 
        "汽机容量",
      ],
      prop: [
        "sn",
        "name",
        "company",
        "property",
        "type",
        "capacity",
        "heatingCapacity",
        "turbineNumber",
      ],

    rules:{
        sn: [
            { required: true, message: '此项必填',trigger: 'blur' },
            { pattern: /^[0-9_a-zA-Z]*$/, message: '必须填入数字', trigger: 'blur' }
        ],
        name: [
            { required: true, message: '此项必填',trigger: 'blur' },
            { pattern: /[\u4e00-\u9fa5_a-zA-Z]/g, message: '请输入中文', trigger: 'trigger' }
        ],
        type: [
            { required: true, message: '此项必填',trigger: 'blur' }
        ],
        property: [
            { required: true, message: '此项必填',trigger: 'blur' }
        ],
        capacity: [
            { pattern: /^\d+(\.\d+)?$/, message:'必须输入数字', trigger: 'blur' }
        ],
        boilerQuantity: [
            { pattern: /^[0-9]*$/, message: '必须填入数字', trigger: 'blur' }
        ],
        turbineNumber: [
            { pattern: /^\d+(\.\d+)?$/, message:'必须输入数字', trigger: 'blur' }
        ],
        heatingCapacity: [
            { pattern: /^\d+(\.\d+)?$/, message:'必须输入数字', trigger: 'blur' }
        ],
        company: [
            { required: true, message: '此项必填,若无请前往用户增加',trigger: 'blur' }
        ] ,
        city: [
            { required: true, message: '此项必填',trigger: 'blur' }
        ],
        area: [
            { required: true, message: '此项必填',trigger: 'blur' }
        ],
        address: [
            { required: true, message: '此项必填',trigger: 'blur' },    
            // { pattern: /^\d+(\.\d+)?$/, message:'必须输入数字', trigger: 'blur' }
        ],
        longitude: [
            { required: true, message: '此项必填',trigger: 'blur' }
            // { pattern: /^\d+(\.\d+)?$/, message:'必须输入数字', trigger: 'blur' }
        ],
        latitude: [
            { required: true, message: '此项必填',trigger: 'blur' }
            // { pattern: /^\d+(\.\d+)?$/, message:'必须输入数字', trigger: 'blur' }
        ],
        heatingArea: [
            { required: true, message: '此项必填',trigger: 'blur' },
            { pattern: /^\d+(\.\d+)?$/, message:'必须输入数字', trigger: 'blur' }
        ]
    },
    provinceArr: [],
    cityArr: [],
    districtArr: [],
    initSn: null, //修改热源编号时的初始值
    initCompany: null, //修改热源所属公司的初始值
    //控制显示
    //以下为控制显示的属性
    dialogFormVisible: false,
    mapVisible: false,

    //存储按钮信息
    buttonListArr :[],    
    // banInput: false,
    downloadLoading: false,
    listLoading: false,
}