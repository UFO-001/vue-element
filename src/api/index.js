import http from '@/utils/request'

// 首页
export const getData = () => {
  return http.get('/home/getData')
}

// 用户管理界面
export const getUser = data => {
  return http.post('/user/getUser', data)
}

export const addUser = data => {
  return http.post('/user/addUser', data)
}

export const editorUser = data => {
  return http.post('/user/editorUser', data)
}

export const deleteUser = data => {
  return http.post('/user/deleteUser', data)
}

export const searchUser = data => {
  return http.post('/user/searchUser', data)
}

// 登录界面
export const loginUser = data => {
  return http.post('/login/loginUser', data)
}

// 商品管理
export const getMall = data => {
  return http.post('/mall/getMall', data)
}
export const addMall = data => {
  return http.post('/mall/addMall', data)
}
export const deleteMall = data => {
  return http.post('/mall/deleteMall', data)
}

// page页面
export const getPage2 = data => {
  return http.post('/page2/getPage2', data)
}
export const getPage1 = data => {
  return http.post('/page1/getPage1', data)
}

// 个人信息
export const getPersonal = data => {
  return http.post('/personal/getPersonal', data)
}

//测试
