export const store = {
  form: {
    name: '',
    nameType: '',
    boileroom:'',
    boiler: '',
    boilerId:'',
    min: '',
    max: ''
  },
  date: '',
  restrantsS: [],
  allStands: [],
  tableData: [],

   // 按钮
  buttonListArr: [],
  //  数值
  show:true,

  // 选择的数据和导出的数据
  multipleSelection: [],
  selNum: true,
  // 导出需要的内容
  title: '历史记录',
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
    '时间',
    '排烟站点',
    '烟气含氧量',
    'Nox折算浓度',
    '烟气流速',
    '烟气压力',
    '烟气温度',
    '烟气湿度',
    'Nox实测PPM浓度',
    'Nox标态质量浓度',
    '烟道截面积',
    '标态烟气流量',
    '热态烟气流量',

  ],
  prop: [
    "revTime",
    "gasName",
    "oxO2",
    "noxCt",
    "flow",
    "stress",
    "tp",
    "hdy",
    "ppm",
    "qltppm",
    "area",
    "ssflow",
    "tmflow",
  ],
}
