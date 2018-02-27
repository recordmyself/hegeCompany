
export function Download(that,store) {
  require.ensure([], () => {
    store.downloadLoading = true;
    if (store.multipleSelection.length == 0) {
      that.$alert("请选择需要导出的数据", "提示");
      store.downloadLoading = false;
      return;
    }
    const { export_json_to_excel } = require("@/vendor/Export2Excel");
    const tHeader = store.header
    const filterVal = store.prop;
    const list = store.multipleSelection;
    const data = formatJson(filterVal, list);
    console.log(data);
    export_json_to_excel(tHeader, data, store.title);
    store.downloadLoading = false;
  });
  function formatJson(filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => v[j]));
  }
}

