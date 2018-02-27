 //清空搜索条件
import { globalStore } from "../../base/store"
import { store } from './store'
export function resetCondition () {
    store.searchData = {
            page:1,
            rows:20,
            orderBy:"id",
            sc:"DESC",
            sn:null,
            account:null, 
            userName:null, 
            status:null,
            statusView: null,
            createBy:null,
            createByName:null,  
            createDate:[],
            //创建时间
            startDate: null,
            endDate: null, 
            lastLoginTime:[],
            // 登录时间
            startDate2: null,
            endDate2: null, 
            bb: '',
            dd: ''
    } 
  }
  //清空上次表单提交的内容
export function resetTemp() {
    store.form = {
        id: null,
        account:null, //登录名
        roleIdList:null,
        password:null,//密码
        userName:null,//用户名
        checkPassword: null,
        mobile:null,  //手机号
        email:null , //邮箱
        // status:null, 
        companyId:null,//所属组织机构
        orgName:null,
        memberType: null,
        // roleName: [],
        startDate:{
            time: null
        }, //开始日期
        endDate:{
            time: null
        },  //结束日期
        startTime: null,
        endTime: null
      },
    store.roleIdArr = []
    store.saveOrgidArr = []
    store.staff = []
  }
export function handleSelect(){
    let idList = []
    store.multipleSelection.forEach((item) => {
        idList.push(item.id)
    })
    return idList
}
