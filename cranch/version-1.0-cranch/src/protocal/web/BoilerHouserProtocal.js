//所有的锅炉房
export const BoilerHouserProtocal = {
  //http://192.168.0.196:8124
  getAllBoilerHourse: {
    rest: "/boilerhousers/getAllBoilerHourse",
    request: {},
    response: {

      status: "OK",
      result: {
        id: null, //position id
        tag: null
      }
    }
  },

  getAllGasById: {
    rest: "/boilerhousers/getAllGasById",
    request: {
      id: null, //position id
    },
    response: {

      status: "OK",
      result: {
        id: null, //烟囱 id
        name: null
      }
    }
  }
}
