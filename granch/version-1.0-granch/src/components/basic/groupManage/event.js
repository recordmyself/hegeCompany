import { store } from './store'
export function resetTemp() {
    store.form = {
        creditSn:null, //编号
        name:null,  //名称 
        abbreviation: null,  //编号
        type:null,//公司|部门|其他
        head:null,//负责人
        notes:null,//备注
        createDate:null,//创建日期
        superOrganization:null,//上级组织机构
        memberType: null,
        area:null,//区
        city:null,//市'
        parentId: null,
    }
}

export function resetCondition() {
    store.searchData = {
        page:1,
        rows:20,
        orderBy:"id",
        sc:"DESC",
        name:null,
        createDate:null,
        startDate:null,
        endDate:null,
        type:null,
        state: null
    }
}
export function handleSelect(){
    let idList = []
    store.multipleSelection.forEach((item) => {
        idList.push(item.id)
    })
    return idList
}