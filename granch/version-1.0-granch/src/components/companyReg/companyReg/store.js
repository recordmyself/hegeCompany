export const store = {
  ruleForm: {
    name: '',
    province: '',
    city: '',
    contacts: '',
    mobile:'',
    email: '',
    code: '',
    unifiedCode: '',
    boilers: '',
    vip:'',
    fileName: []
  },
  // 信息状态
  regOk:false,
  // 锅炉列表
  boiler:[],
  // 选择省市
  city: [],
  //发送验证码按钮
  sendTo: true,
  sendto1: true,
  sendTo2: true,
  // 验证码
  code: '',
  // 手机号状态
  sendTel: false,
  tableData: [],
  result: [],
  dialogImageUrl: '',
  dialogVisible: false,
}
