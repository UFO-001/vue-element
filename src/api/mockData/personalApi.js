import Mock from 'mockjs'

let list = []
for (let i = 1; i <= 4; i++) {
  list.push(
    Mock.mock({
      id: Mock.mock('@id'),
      name: Mock.mock('@cname'),
      picture: Mock.Random.image('50x50', Mock.mock('@color()'), Mock.mock('@word(2,3)')),
      text: Mock.mock('@cparagraph()')
    })
  )
}

export default {
  getData: () => {
    return {
      list,
      code: 200,
      mesage: '成功'
    }
  }
}
