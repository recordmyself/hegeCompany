import { store } from './store'
export function resetTemp() {
    store.form = {
        id: null,
        name:null,    //名称
        startTime:{
            time: ''
        }, //开始日期
        endTime:{
            time: ''
        },  //结束日期
        status:null,//状态
        createBy:null,  //创建人
        lastUpdateBy:null, //最后修改人
                             //创建日期
        lastUpdateDate:null,  //最后修改日期
        isDeleted:null,    //是否删除
        startDate: null,
        endDate: null
    }
}
export function resetCondition() {
    store.searchData = {
        page:1,
        rows:20,
        orderBy:"id",
        sc:"DESC",
        name:null,    //名称
        createDate:[],  //创建日期
        startDate:null,
        endDate:null
    }
}