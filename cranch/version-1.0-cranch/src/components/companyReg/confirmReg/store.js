export const store = {
  date: '',
  status: '',
  tableData: [],
  boilers: [],
  multipleSelection: [],
  // 按钮状态
  selNum: true,
  buttonListArr: [],
  // 图片路劲
  route: '/fileupload/',

  // 状态
  state: [
    {value: 'UNREGISTERED', label: '待审批'},
    {value: 'BLOCK_UP', label: '审批驳回'},
    {value: 'REGISTERED', label: '审批通过'}
  ]
}
