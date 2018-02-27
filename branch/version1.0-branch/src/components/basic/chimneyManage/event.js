import { store } from './store'
export function resetTemp() {
    store.form = {
        longitude:null, //经度
        latitude:null, //纬度
        gasSn:null,//烟囱编号
        name:null,//烟囱名称
        boilerType:null,//型号
        company:null,//单位名称
        userSn:null,//登记证编号
        houseName:null,//所属锅炉房
        installationUnit:null,//安装公司
        head:null,//负责人
        phone:null,//电话
        operator:null,//操作员
    }
}

export function resetCondition() {
    store.searchData = {
        page:1,
        rows:20,
        orderBy:"id",
        sc:"DESC",
        startDate:null,
        endDate:null,
        eventTime:[],
        gasSn:null, 
        compnay:null, 
        houseName:null 
    }
}