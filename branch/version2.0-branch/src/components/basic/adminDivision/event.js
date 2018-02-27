import { store } from './store'
export function  resetForm () {
    store.form = {
        city:null,//市
        area:null,//区
        avenue:null,//城市街道办事处
        committee:null,// 居委会
        name:null,//行政名称
        sn:null,//行政代码
        level:null,//级别
        type:null,//类别
        longitude:null,//经度
        latitude:null//纬度
    }
}
