import Mock from 'mockjs'

let userList = []
for (let i = 1; i <= 260; i++) {
  userList.push(
    Mock.mock({
      id: Mock.mock('@id'),
      birth: Mock.mock('@date()'),
      name: Mock.mock('@cname'),
      'sex|1': ['1', '2'],
      phone: /^1(5|3|7|8)[0-9]{9}$/,
      address: Mock.mock('@county(true)')
    })
  )
}

export default {
  getUserData: ({ body }) => {
    let limit = 13
    let page = 1

    if (body) {
      page = body
    }
    const userData = userList.filter((item, index) => index < page * limit && index >= (page - 1) * limit)
    return {
      count: userList.length,
      list: userData,
      code: 200,
      message: '成功'
    }
  },

  addUserData: ({ body }) => {
    const { name, birth, sex, phone, address } = JSON.parse(body)
    userList.unshift({
      id: Mock.mock('@id'),
      name: name,
      address: address,
      phone: phone,
      birth: birth,
      sex: sex
    })
    return {
      code: 200,
      message: '成功'
    }
  },

  editorUserData: ({ body }) => {
    const { id, name, birth, sex, phone, address } = JSON.parse(body)
    userList.some(item => {
      if (item.id == id) {
        item.name = name
        item.address = address
        item.phone = phone
        item.birth = birth
        item.sex = sex
        return true
      }
    })
    return {
      code: 200,
      message: '成功'
    }
  },

  deleteUserData: ({ body }) => {
    const { id } = JSON.parse(body)
    userList = userList.filter(item => item.id != id)
    return {
      code: 200,
      message: '成功'
    }
  },

  searchUserData: ({ body }) => {
    if (body) {
      const a = userList.filter(item => item.name == body)
      return a
    } else {
      return 0
    }
    return {
      code: 200,
      message: '成功'
    }
  }
}
