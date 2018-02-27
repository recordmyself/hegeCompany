export const store = {
  // input信息
  form: {
    userName: '',
    roleName: '',
    orgName: ''
  },
  date: '',
  restaurantsN: [],
  restaurantsR: [],
  restaurantsS: [],

  multipleSelection: [],
  selNum: true,

  tableData: [],
  title: '日志',
  downloadLoading: false,
  header: [
    "日期时间",
    "用户名",
    "用户角色",
    "用户部门",
    "用户操作日志",
    "备注"
  ],
  prop: [
    "createDate",
    "userName",
    "roleName",
    "orgName",
    "operationLog",
    "notes"
  ]
}
