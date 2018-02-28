export const lastStorage = {
  setLocalStorage: function (data) {
    localStorage.users = JSON.stringify(data)
  },
  getLocalStorage: function (name) {
    if (localStorage.name) {
      return JSON.parse(localStorage.name)
    } else {
      return 0;
    }
  }
}
