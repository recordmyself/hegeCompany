export const store = {
  form: {
    date: '',
    boileroom: '',
    level: '',
    type: '',

    boilerId: '',
    levelId:''

  },
  restaurantsS: [],
  options: [
    { value: '高', label: '1001' },
    { value: '低', label: '1002' }
    ],
  tableData: [],

  totalRows: 0,
  currentPage: 1,

  multipleSelection: [],
  selNum: true,
   // 按钮
   buttonListArr :[],

  title: '报警信息',
  downloadLoading: false,
  dataType: [
    // {value: '排烟站点', label:'siteId'},
    {value: '烟气含氧量' ,label:'oxO2'},
    {value: 'Nox折算浓度' ,label:'noxCt'},
    {value: '烟气流速', label:'flow'},
    {value: '烟气压力', label:'stress'},
    {value: '烟气温度', label:'tp'},
    {value: '烟气湿度' ,label:'hdy'},
    {value: 'Nox实测PPM浓度', label:'ppm'},
    {value: 'Nox标态质量浓度', label:'qltppm'},
    {value: '烟道截面积' ,label:'area'},
    {value: '标态烟气流量', label:'ssflow'},
    {value: '热态烟气流量',label:'tmflow'},
  ],
  header: [
    "日期/时间",
    "排烟站点",
    "报警类型",
    "数值",
    "限制",
    "级别"
  ],
  prop: [
    "revTime",
    "gasName",
    "parameter",
    "value",
    "limitValue",
    "level"
  ],
}
