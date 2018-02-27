import {store} from './store'
export function resetTemp() {
    store.form = {
        name:null,    //字典名称
        englishType:null, //英文类型
        chineseType:null,  //中文类型 
        value:null,//值
        status:null,  //状态
        createBy:null , //创建人
        lastUpdateBy:null,  //最后修改人
        createDate:null,  //创建日期
        lastUpdateDate:null,    //最后修改日期
        isDeleted:null //是否删除
    }
}
export function resetCondition() {
    store.searchData = {
        page:1,
        rows:20,
        orderBy:"id",
        sc:"DESC",
        name:null,//名称
        englishType:null,//英文类型
        chineseType:null //中文类型     
    }
}