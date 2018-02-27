import { store } from './store'
export function resetTemp() {
    store.form = {
        parentId:null,    //父Id
        id: null,
        sn:null, //客户编号
        name:null,  //单位名称 
        contacts:null,//联系人
        memberType:null,  //会员类型
        phone:null, //电话
        principalPerson:null,  //主要负责人
        province:null,  //省
        city:null,    //市
        notes:null, //备注
        unifiedCode:null,  //统一信用代码
        affiliatedCompany:null,//所属公司
        customerType:null,  //客户类型
        // roleName: [],
        startDate:{
            time: null
        }, //开始日期
        endDate:{
            time: null
        }, 
        startTime:null, //有效期
        endTime:null,  //有效期
        validTime: [],
        state:null,
        rProvince:null,//公司注册的省
        rCity:null,//公司注册的市
        registerName:null//公司注册的公司名	 
    }
}

export function resetCondition() {
        store.searchData = {
            page:1,
            rows:20,
            orderBy:"id",
            sc:"DESC",
            name:null,  //单位名称 
            memberType:null,//会员类型
            state:null,//会员状态
            createDate: null,
            startTime: null,
            endTime: null	
        }
}
export function handleSelect(){
    let idList = []
    store.multipleSelection.forEach((item) => {
        idList.push(item.id)
    })
    return idList
}