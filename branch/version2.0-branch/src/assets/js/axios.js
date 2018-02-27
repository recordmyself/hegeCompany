import { globalStore } from '../../components/base/store'
export function axiosHttpPost(that, url, data, cb) {
  data.passportId = globalStore.userInfo.passportId;
  data.token = globalStore.userInfo.token;

  that.$api.post(url, data)
    .then(res => {
      cb(res)
    })
    // .catch(res => {
    //   that.$message.warning('数据正在加载，请稍后！')
    // })
}
export function axiosHttpGet(that, url, cb) {
  that.$api.get(url)
  .then(res => {
    if (res.data.status == "FAIL") {
      that.$message.warning({
        message: res.data.message,
        duration: 2000
      })
    } else {
      cb(res)
    }
    })
  // .catch(res => {
  //   that.$message.warning('数据正在加载，请稍后！')
  // })
}

