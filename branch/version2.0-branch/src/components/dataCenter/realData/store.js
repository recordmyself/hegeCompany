export const store = {
  form: {
    province: '',
    area: '',
    company: '',
    companyId:'',
    companyChild:[],
    boileroom: '',
    boiler: '',
    
  },
  restaurantsP: [],
  restaurantsR: [],
  restaurantsC: [],
  restaurantsS: [],
  allStands: [],

// // 查询内容
// search:{},
  // 实时信息
  realdata: {},
  // 折线信息
  getPa: '',
  getTp: '',
  getFlow: '',
  getOxO2: '',
  getNoxCt: '',
  gethdy: '',
  getppm: '',
  getqltppm: '',
  getarea: '',
  getssflow: '',
  gettmflow: '',

  // 展示类型
  type: '图表综合',
  typeAll: [
    { value: '0', label: '综合模式'},
    { value: '1', label: '单图模式' },
    { value: '2', label: '单表模式' }

  ],
  // 选择的类型
  seleType: '',
  show0: true,
  show1: true,

  setInterValStatues: 0,
  // 弹出层信息
  tableData: [],
  dialogVisible: true,

  showSearch: true,

  //进入页面次数
    account: 0,
    account1: 0,
}
