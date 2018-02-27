export const store = {
    //顶部输入数据
    searchData: {
        page:1,
        rows:20,
        orderBy:"id",
        sc:"DESC",
        name:null,
        createDate:[],
        startDate: null,
        endDate: null
    },
    //表格数据
    tableData: [
        {
            id:null,
            sn:null, 
            name:null, 
            descr:null,
            menuList:null,
            status:null,  
            createDate:null , 
            lastUpdateDate:null,  
            createBy:null,  
            lastUpdateBy:null, 
            isDelete:null
        }
    ],
    form: {
        id: null,
        name:null, 
        descr:null,
        notes: null
    },
    configForm: {

    },
    rules: {
        name:[
            { required: true, message: '请输入角色名称', trigger:'blur' },
            { pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, message: '请输入中文或字母或数字' }
        ],
        descr:[
            { required: true, message: '请输入角色说明', trigger:'blur' },
            // { pattern: /^[\u4e00-\u9fa5_a-zA-Z]+$/, message: '请输入中文或字母' }
        ]
    },
    
    passport: {
        passportId:null    
    },
    roleId: null,
    singleId: null,
    //导出相关
    title: '角色信息',
    multipleSelection:[],
    downloadLoading: false,
    header: [
        "创建时间",
        "角色名称",
        "角色说明",
        "备注"
    ],
    prop: [
        "createDate",
        "name",
        "descr",
        "notes"
    ],

    //按钮信息

    buttonListArr: [],
    //控制显示
    listLoading: false,
    dialogFormVisible: false,
    dialogAuth: false,
    buttonLoading: false
}