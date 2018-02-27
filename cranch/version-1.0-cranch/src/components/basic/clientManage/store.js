import cascader from '../../../assets/js/proAndCity'
export const store = {
    searchData: {
        page:1,
        rows:20,
        orderBy:"id",
        sc:"DESC",
        name:null,  //单位名称 
        memberType:null,//会员类型
        state:null,//会员状态
        createDate: [],
        startTime:null,
        endTime: null	
    },
    tableData: [],
    //多选框中数据
    multipleSelection: [],
    rules: {
        unifiedCode: [
            { required: true, message: '请输入社会信用编码', trigger: 'blur'},
            { pattern: /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}/g, message: '您输入的格式不正确', trigger: 'blur' }
        ],
        name: [
            { required: true, message: '请输入组织名称', trigger:'blur' },
            { pattern: /^[\u4e00-\u9fa5_a-zA-Z]+$/, message: '只能输入中文或者字母', trigger: 'blur' }
        ],
        registerName: [
            { required: true, message: '请输入组织名称', trigger:'blur' },
            { pattern: /^[\u4e00-\u9fa5_a-zA-Z]+$/, message: '只能输入中文或者字母', trigger: 'blur' }
        ],
        customerType: [
            { required: true, message: '请选择类型', trigger: 'blur' }
        ],
        // affiliatedCompany: [
        //     //  { required: true, message: '请选择所属公司', trigger: 'blur' },
        // ],
        province: [
             { required: true, message: '请选择', trigger:'change, blur' },
        ],
        city: [
            { required: true, message: '请选择', trigger:'change, blur' },
        ],
        principalPerson: [
            { required: true, message: '请输入姓名', trigger:'blur' },
            { pattern: /^[\u4e00-\u9fa5|a-zA-Z]+$/, message: '只能输入中文或者字母' },
        ],
        contacts: [
                { required: true, message: '请输入姓名', trigger:'blur' },
                { pattern: /^[\u4e00-\u9fa5|a-zA-Z]+$/, message: '只能输入中文或者字母' }
        ],
        validTime: [
            {  required: true, message: '请选择有效期', trigger:'blur' }
        ]
    },
    //所属公司选项
    superiorCompanyOptions: [],
    //省市选项
    province_options: cascader.provs,
    
    allCity: cascader.allCity,
    //市区选项
    city_options: [],
    customerTypeOptions: [
        { label: '客户', value: 1 },
        { label: '工厂', value: 2 }
    ],
    memberTypeOptions: [
        { label: '免费', value: 1 },
        { label: '付费', value: 2 }
    ],
    form: {
        parentId:null,    //父Id
        id: null,
        sn:null, //客户编号
        name:null,  //单位名称 
        contacts:null,//联系人
        memberType:null,  //会员类型
        phone:null, //电话
        principalPerson:null,  //主要负责人
        province:null,  //省
        city:null,    //市
        notes:null, //备注
        unifiedCode:null,  //统一信用代码
        affiliatedCompany:null,//所属公司
        customerType:null,  //客户类型
        // roleName: [],
        startDate:{
            time: null
        }, //开始日期
        endDate:{
            time: null
        }, 
        startTime:null, //有效期
        endTime:null,  //有效期
        validTime: [],
        state:null 
    },
    dateOptions: {
        startTime: {
            time: ''
        },
        endTime: {
            time:''
        },
        option: {
            type: 'day',
            week: ['日', '一', '二', '三', '四', '五', '六'],
            month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            format: 'YYYY-MM-DD',
            placeholder: '请选择',
            inputStyle: {
                '-webkit-appearance': 'none',
                'background-color': '#fff',
                'border-radius': '4px',
                'border': '1px solid #d8dce5',
                '-webkit-box-sizing': 'border-box',
                'box-sizing': 'border-box',
                'color': '#5a5e66',
                'display': 'inline-block',
                'font-size': 'inherit',
                'height': '32px',
                'line-height': '1',
                'outline': '0',
                'padding': '0 15px',
                '-webkit-transition': 'border-color .2s cubic-bezier(.645,.045,.355,1)',
                'transition': 'border-color .2s cubic-bezier(.645,.045,.355,1)',
                'width': '180px'
            },
            color: {
                header: '#3a8ee6',
                headerText: '#5a5e66'
            },
            buttons: {
                ok: '确认',
                cancel: '取消'
            },
        },
        limit: [{
            type: 'fromto',
            from: '',
        }],
    },
    singleId: null,
    totalRows:null,
    //导出excel信息
    title: '客户信息',
    downloadLoading: false,
    header: [
        '公司名称',
        "社会信用编码",
        '联系人',
        '电话',
        '客户类型',
        '有效期开始',
        '有效期结束',
        '会员状态',
    ],
    prop: [
        'name',
        "creditSn",
        'contacts',
        'phone',
        'customerType',
        'startTime',
        'endTime',
        'stateView'
    ],
    //按钮信息
    buttonListArr :[],  
    //控制显示
    listLoading: false,
    dialogFormVisible: false
}