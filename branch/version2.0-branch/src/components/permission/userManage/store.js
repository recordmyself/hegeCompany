// var dayToday = new Date().getDate()<10? '0' + new Date().getDate(): new Date().getDate()
// var dateToday = new Date().getFullYear()+'-'+ (parseFloat(new Date().getMonth())+1) + '-' + dayToday
// console.log(dateToday);
export const store = {
    searchData: {
        page:1,
        rows:20,
        orderBy:"id",
        sc:"DESC",
        sn:null,
        account:null, 
        userName:null, 
        status:null,
        statusView: null,
        createBy:null,
        createByName:null, 
        // 创建时间 
        createDate:[], 
        startDate: null,
        endDate: null, 
        // 登录时间
        lastLoginTime:[],
        startDate2: null,
        endDate2: null
    },
    //存储新增用户表单数据
    form: {
        id: null,
        account:null, //登录名
        roleIdList:null,
        password:null,//密码
        userName:null,//用户名
        checkPassword: null,
        mobile:null,  //手机号
        email:null , //邮箱
        // status:null, 
        companyId:null,//所属组织机构
        orgName:null,
        memberType: null,
        // roleName: [],
        startDate:{
            time: null
        }, //开始日期
        endDate:{
            time: null
        },  //结束日期
        startTime: null,
        endTime: null,
        code: null //验证码
    },
    memberTypeOptions: [
        { label: '免费', value: 1 },
        { label: '付费', value: 2 }
    ],
    roleIdArr: [
        
    ],
    roleNameOptions: [

    ],
    statusOptions: [
        { label: '已注册', value: 'REGISTERED' },
        { label: '未注册', value: 'UNREGISTERED' },
        { label: '已停用', value: 'BLOCK_UP' },
        { label: '已过期', value: 'EXPIRE' },
        { label: '待审批', value: 'APPROVED' }
    ],
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
            to: ''
        }],
    },
    dateOptions2: {

    },
    orgOptions: [],
    staff: [{ label:null}],
    tableData: [
    ],
    multipleSelection: [],
    singleId: null,
    //新增用户表单规则
    rules: {
        userName:[
            { required: true, message: '请输入姓名', trigger:'blur' },
            { pattern: /^[\u4e00-\u9fa5]+$/, message: '只能输入中文' }
        ], 
        account: [
            { required: true, message: '账号不能为空', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9_-]{4,16}$/, message: ' 请输入4-16位字符' ,trigger: 'blur'}
        ],
        password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/, message: '必须包含数字和字母的8~16位', trigger: 'blur'}
        ],
        checkPassword: [
            {validator: (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== store.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            },trigger:'blur'},
            { required: true, message: '密码不能为空', trigger: 'blur' },
        ],
        email: [
            { 
                pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                message: '邮箱格式不正确',
                trigger: 'blur'
            },
            { required: true, message: '此项必填', trigger: 'blur' }
        ],
        orgName: [
            { required: true, message: '请选择所属机构', trigger: 'blur' }
        ],
        status: [
            { required: true, message:'请选择启用状态',trigger:'blur' }
        ],
        startTime:[
            { required: true, message: '请选择有效期', trigger: 'blur' }
        ],
        endTime:[
            { required: true, message: '请选择有效期', trigger: 'blur' }
        ],
        memberType: [
            { required: true, message: '请选择会员类型', trigger: 'blur' }
        ],
        roleIdList: [
            { required: true, message: '请选择用户角色', trigger: 'blur' }
        ],
        code: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
    },
    title: '用户信息',
    downloadLoading: false,
    header: [
        "创建时间",
        "用户名称",
        "登录账号",
        "创建人",
        "分配角色",
        "联系电话",
        "电子邮箱",
        "所属机构",
        "有效期开始",
        "有效期结束",
        "会员状态",
        "备注",
    ],
    prop: [
        "createDate",
        "userName",
        "account",
        "createByName",
        "roleName",
        "mobile",
        "email",
        "orgName",
        "startTime",
        "endTime",
        "statusView",
        "memo"
    ],
    filename: '用户管理表格',
    //存储初始邮箱
    initEmail: null,
    //存储按钮信息
    buttonListArr :[],    
    //控制显示
    treeLoading:false,
    listLoading: false,
    dialogFormVisible: false,
    
}

