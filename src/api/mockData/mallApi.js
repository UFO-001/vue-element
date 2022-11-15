import Mock from 'mockjs'

let mallList = {
  apple: {
    // brand: ['iphone13', 'iphone13'],
    // number: [1233, 1445]
    iphone13: 42333,
    iphone14: 54456
  },
  huawei: {
    // brand: ['Mate 40', 'Mate 30'],
    // number: [1233, 1445],
    Mate40: 32842,
    Mate30: 23150
  },
  xiaomi: {
    // brand: ['小米10', '小米9'],
    // number: [1233, 1445]
    小米10: 36540,
    小米9: 22150
  },
  oppo: {
    // brand: ['oppo R17', 'oppo R17'],
    // number: [1233, 1445]
    R17: 54021,
    R16: 36450
  },
  galaxy: {
    // brand: ['Note10', 'Note9'],
    // number: [1233, 1445]
    Note10: 25405,
    Note9: 58123
  },
  vivo: {
    // brand: ['Y66', 'S7'],
    // number: [1233, 1445]
    Y66: 40231,
    S7: 55231
  }
}
export default {
  getData: () => {
    return {
      data: [
        // apple: mallList.apple,
        // huawei: mallList.huawei,
        // xiaomi: mallList.xiaomi,
        // oppo: mallList.oppo,
        // galaxy: mallList.galaxy,
        // vivo: mallList.vivo
        mallList
      ],
      code: 200,
      message: '成功'
    }
  },
  addData: ({ body }) => {
    const { brand, type, number } = JSON.parse(body)

    let brand1 = Object.keys(mallList[brand])
    console.log(brand1.indexOf(type))
    if (brand1.indexOf(type) !== -1) {
      mallList[brand][type] = parseInt(mallList[brand][type]) + parseInt(number)
    } else {
      mallList[brand][type] = parseInt(number)
    }
    return {
      code: 200,
      message: '成功'
    }
  },
  delData: ({ body }) => {
    const { brand, type, number } = JSON.parse(body)
    let brand2 = Object.keys(mallList[brand])
    if (brand2.indexOf(type) !== -1) {
      if (parseInt(mallList[brand][type]) - parseInt(number) > 0) {
        mallList[brand][type] = parseInt(mallList[brand][type]) - parseInt(number)
      } else {
        delete mallList[brand][type]
      }
      return {
        code: 200,
        message: '成功'
      }
    } else {
      return {
        code: 404,
        message: '没有该型号'
      }
    }
  }
}
