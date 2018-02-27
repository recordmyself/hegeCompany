import cascader from '../../../assets/js/proAndCity'
export const store = {
    //表格数据
    tableData: [],
    
    //省市选择功能数据案例
    // province_options: [],
    province_options: cascader.provs,
    allCity: cascader.allCity,
    //市选择
    city_options : [],
    //组织机构类型
    regionOptions: [
      { label: '公司', value: 1 },
      { label: '部门', value: 2 },
    ],
    // 上级组织机构
    superOrganizationOptions: [],
    
    //会员类型
    memberTypeOptions: [
        { label: '免费', value: 1 },
        // { label: '付费', value: 2 }
    ],
    //搜索框中输入的值
    searchData: {
      page:1,
      rows:20,
      orderBy:"id",
      sc:"DESC",
      name:null,
      createDate:[],
      startDate:null,
      endDate:null,
      type: null,
      state: null
    },

    restaurants: [],
    removeMessage: {
      id:null,
      name:null,  //名称 
      province:null,//省
      city:null,//市
    },
    //form表单中值存储
    form: {
        creditSn:null, //编号
        name:null,  //名称
        abbreviation: null,//简称 
        type:null,//公司|部门|其他
        head:null,//负责人
        notes:null,//备注
        createDate:null,//创建日期
        creditSn: null, //社会信用编码
        superOrganization:null,//上级组织机构
        memberType: null,
        area:null,//区
        city:null,//市
        parentId: null,
    },
    orgOptions: [],
    multipleSelection: [],
    totalRows:null,
    //导出excel文件信息
    title: '组织机构信息',
    downloadLoading: false,
    header: [
      "创建时间",
      "社会信用编码",
      "所属公司",
      "组织机构名称",
      "联系人",
      "机构类型",
      "省市区",
      "组织机构状态"
    ],
    prop: [
      "createDate",
      "unifiedCode",
      "superOrganization",
      "name",
      "head",
      "type",
      "city",
      "state"
    ],
    
    //验证规则
    rules:{
      // ,
      // superOrganization: [
      //    { required: true, message: '请选择上级组织机构', trigger: 'change' },
      // ],
          creditSn: [
            { required: true, message: '请输入社会信用编码', trigger: 'blur'},
            { len: 18, message: '请输入18位编码', trigger:'blur' },
            { pattern: /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}/g, message: '您输入的格式不正确', trigger: 'blur' }
          ],
          abbreviation: [],
          name: [
            { required: true, message: '请输入名称', trigger:'blur' },
            { min: 2,message: '请输入至少两个字符', trigger: 'blur' },
            { pattern: /^[\u4e00-\u9fa5|a-zA-Z]+$/, message: '只能输入中文或者字母', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择类型', trigger: 'change' }
          ],
          head: [
            { required: true, message: '请输入姓名', trigger:'blur' },
            { pattern: /^[\u4e00-\u9fa5|a-zA-Z]+$/, message: '只能输入中文或者字母' },
          ],
          city: [
             { required: true, message: '请选择省市', trigger:'change, blur' },
          ],
          area: [
            { required: true, message: '请选择区域', trigger:'change, blur' },
          ],
          superOrganization: [
            { required: true, message: '请选择上级组织机构', trigger:'change, blur' },
          ],
          memberType: [
            // { required: true, message: '请选择会员类型', trigger:'change, blur' },
          ]
    },
    //按钮信息
    buttonListArr: [],
    initCreditSn: null,//保存初始的社会信用编码
    //以下为控制显示的属性
    banInput: false,
    dialogChooseOrgVisible: false,
    dialogFormVisible: false,
    listLoading: false
}