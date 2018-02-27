export function parseTime(row,column,hms) {
    let date = row[column.property];
    let changeDate = new Date(date)
    if (date == undefined) {
      return "";
    }
    let Y = changeDate.getFullYear();
    let M = (changeDate.getMonth()+1 > 9? changeDate.getMonth()+1:'0'+Number(changeDate.getMonth()+1));
    let D = (changeDate.getDate() > 9? changeDate.getDate():'0'+changeDate.getDate());
    let H = (changeDate.getHours() > 9? changeDate.getHours():'0'+changeDate.getHours());
    let m = (changeDate.getMinutes() > 9? changeDate.getMinutes():'0'+changeDate.getMinutes());
    let S = (changeDate.getSeconds() > 9? changeDate.getSeconds():'0'+changeDate.getSeconds());
    if (hms) {
      return Y + '-' + M + '-' + D + '  ' + H + ':' + m + ":" + S ;
    }
      return Y + '-' + M + '-' + D;
}
export function changeDate(date,hms) {
  let changeDate = new Date(date)
  if (date == undefined) {
    return "";
  }
  let Y = changeDate.getFullYear();
  let M = (changeDate.getMonth()+1 > 9? changeDate.getMonth()+1:'0'+Number(changeDate.getMonth()+1));
  let D = (changeDate.getDate() > 9? changeDate.getDate():'0'+changeDate.getDate());
  let H = (changeDate.getHours() > 9? changeDate.getHours():'0'+changeDate.getHours());
  let m = (changeDate.getMinutes() > 9? changeDate.getMinutes():'0'+changeDate.getMinutes());
  let S = (changeDate.getSeconds() > 9? changeDate.getSeconds():'0'+changeDate.getSeconds());
  if (hms) {
    return Y + '-' + M + '-' + D + '  ' + H + ':' + m + ":" + S ;
  }
    return Y + '-' + M + '-' + D;
}
export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
