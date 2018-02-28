export const store = {
    searchData: {
        page:1,
        rows:20,
        orderBy:"id",
        sc:"DESC",
        name:null,    //名称
        createDate:[],  //创建日期
        startDate:null,
        endDate:null
    },
    tableData: [],
    form: {
        id: null,
        name:null,    //名称
        startTime:{
            time: ''
        }, //开始日期
        endTime:{
            time: ''
        },  //结束日期
        startDate: null,
        endDate: null,
        status:null,//状态
        
        createBy:null,  //创建人
        lastUpdateBy:null, //最后修改人
        createDate:[],  //创建日期
        lastUpdateDate:null,  //最后修改日期
        isDeleted:null,    //是否删除
    },
    dateOptions: {
        startTime: {
            time: ''
        },
        endtime: {
            time:''
        },
        option: {
            type: 'day',
            week: ['日', '一', '二', '三', '四', '五', '六'],
            month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            format: 'YYYY-MM-DD',
            placeholder: '请选择日期',
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
            from: '2017-12-08',
        }],
    },
    rules: {
        name:[
            { required: true, message: '这是必填项', trigger: 'blur' }
        ],
        createDate: [
            { required: true, message: '这是必填项', trigger: 'blur' }
        ]
    },
    multipleSelection: [],
    //导出excel文件信息
    title: '组织机构信息',
    downloadLoading: false,
    header: [
        "名称",
        "开始时间",
        "结束时间"
        
    ],
    prop: [
        "name",
        "startDate",
        "endDate"
    ],
    //按钮信息
    buttonListArr :[],  
    //控制显示
    listLoading: false,
    dialogFormVisible: false
}