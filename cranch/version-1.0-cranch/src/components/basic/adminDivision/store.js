import cascader from '../../../assets/js/proAndCity'

export const store = {
    form: {
        city:null,//市
        area:null,//区
        avenue:null,//城市街道办事处
        committee: null, //居委会
        name:null,//行政名称
        sn:null,//行政代码
        level:null,//级别
        type:null,//类别
        longitude:null,//经度
        latitude:null//纬度
    },
    treeData:[],
    regionCategory: [
        { label: '主城区' },
        { label: '城乡结合部' },
        { label: '镇中心' },
        { label: '镇乡结合部' },
        { label: '特殊区域'},
        { label: '村中心区'},
        { label: '村庄'}
    ],
    levelOptions: [
        { label: '省级/直辖市' ,value: 1},
        { label: '市级/区' ,value: 2},
        { label: '县级' ,value: 3},
        { label: '镇' ,value: 4}
    ],
    //省市选择功能数据案例
    // province_options: [],
    province_options: cascader.provs,
    allCity: cascader.allCity,
    //市选择
    city_options : [],   
    rules: {
        sn:[
            { required: true, message: '请输入行政代码', trigger: 'blur' }
        ],
        name: [
            { required: true, message: '请输入区划名称', trigger: 'blur' }
        ],
        level: [
            { required: true, message: '请选择级别', trigger: 'blur' }
        ]

    },
    //控制nodeclick是否触发
    isAllow: true,
    //控制显示
    buttonShow: null,
    dialogFormVisible: false,
    banInput: true,
    loading: false
    // focusControl: false
}