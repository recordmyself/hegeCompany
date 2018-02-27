export const cookie = {
  // 设置cookie
  setCookie: function (name, data) {
    var Days = 30;
    var exp = new Date();
    var value = JSON.stringify(data);
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
  },
  // 获取固定cookie
  getCookie: function (name) {
    var arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
      return unescape(arr[2]);
    }
    return null;
  },
  //
  // 删除cookie
  deleteCookie: function (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
  }
