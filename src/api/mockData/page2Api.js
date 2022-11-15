import Mock from 'mockjs'

const data = []
for (let i = 0; i < 5; ++i) {
  data.push(Mock.mock('@integer(10, 200)'))
}

export default {
  getData: () => {
    return {
      code: 200,
      data: data,
      message: '成功'
    }
  }
}
