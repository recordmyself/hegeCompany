export const store = {
  // input信息
  form: {
    province: '',
    area: '',
    company: '',
    companyChild: [],
    boileroom: '',
    boiler: '',
    boilerId: ''
  },
  restaurantsP: [],
  restaurantsR: [],
  restaurantsC: [],
  restaurantsS: [],
  allStands: [],


  text: '',
  options: [],
  tableData: [],
  tableData1:[],
  tableView: [],
  // 上传是否可操作
  submitButton: true,
   // 按钮
   buttonListArr :[],

  totalRows: 0,
  currentPage: 1,
  // 弹出层
  dialogVisible: false,
  // 当前文件信息
  row: {},
  pages: {
    page: 1,
    rows: 20,
    totalRows: 0,
  }
}
