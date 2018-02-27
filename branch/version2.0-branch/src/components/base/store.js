export const globalStore = {
  // 用户信息
  userInfo: {},
  account: {},
  // 全局文件
  form: {
    province: '',
    area: '',
    company: '',
    companyChild: [],
    companyId: '',
    boileroom: '',
    boiler: ''
  },
  restaurantsP: [],
  restaurantsR: [],
  restaurantsC: [],
  restaurantsS: [],
  allStands: [],

  // 实时数据记录
  // 是否刷新
  refresh: 0,

  // 报警
  cellNum: 0,

  //
  selectedD:'0',
  navFY: true,
  activeIndex: "1",


  //控制弹出层
  dialogVisible: false,
  // 个人信息
  accountInfo: false,
  sendTo: false,
  time: false,
  // 修改密码
  alertPsd: false,
  // 上传图像
  imageInfo: false,
  // 默认标签页
  activeName: 'first',
  // 弹出层信息
  companyInfo: {},
  boilerId: '',
  boileroomId:'',
  title: '',
  // 当前标签页
  index: 1,

  //保存组织机构组件中点击后的值
  saveOrganization:{
    organization:null,
    parentId: null,
    id: null
  },
  //记录确认后的经纬度
  position:{},
  //记录表格中单独行的id
  singleId:null,
  //按钮加载
  buttonLoading: false,
  // 表格加载
  loading: true,
  tableData: [],
   // 分页
   pages: {
    page: 1,
    rows: 12,
    totalRows: 0,
    },
   pages1: {
     size1: 10,
     currentPage1: 1,
     total1: 0
   },
   pages2: {
     size2: 10,
     currentPage2: 1,
     total2: 0
   },
  //树信息
   menuList: [],
   showSearch: true,
  //  上传图片
   dialogVisible1: false,
   dialogImageUrl1: '',
   uploadImage: '',
   // 图片路劲
   route: '/fileupload/',
   src: ''
}
