import { store } from './store'
export function resetTemp() {
    store.form = {
        sn:null,  //锅炉房编号
        name:null , //锅炉房名称
        type:null,  //供热类型
        boilerQuantity:null, //锅炉数量
        heatingCapacity:null, //供热能力
        property:null,//热源性质
        capacity:null,//装机容量
        address:null,//详细地址
        heatingArea:null,//供热面积
        latitude:null,//纬度
        longitude:null,//经度
        turbineNumber:null,//汽机数量,
        city:null,//市
        area:null,//区
        avenue:null,
        committee:null,
        company:null //公司
    }
}

export function resetCondition() {
    store.searchData = {
        page:1,
        rows:20,
        orderBy:"id",
        sc:"DESC",
        name:null,//锅炉房名称
        sn:null, //锅炉房编号
        type:null, //供热类型
        capacity:null, //装机容量
        heatingCapacity:null,//供热能力'
        company: null
    }
}