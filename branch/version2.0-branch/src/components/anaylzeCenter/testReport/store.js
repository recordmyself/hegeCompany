export const store = {
  form: {
    unitName:null, //文件名称
    number:null,//报表编号
    companyName: null,//上传的单位
    date: ''
  },
  //表格信息
  tableData: [],
  multipleSelection: [],
  selNum: true,
   // 按钮
   buttonListArr :[],
  // 当前行信息
  row: {},
  //弹出层信息
  reportInfo: {},

  downloadLoading: false,
  dialogVisible: false,

  //
  title: '检测报告',
  header: [
    "创建日期",
    "文件名称",
    "报表编号",
    "上传单位",
    "状态",
  ],
  prop: [
    "revTime",
    "fileName",
    "number",
    "companyName",
    "state",
  ],
}
