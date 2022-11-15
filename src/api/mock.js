import Mock from 'mockjs'

import homeApi from './mockData/homeApi'

import userApi from './mockData/userApi'

import loginApi from './mockData/loginApi'

import mallApi from './mockData/mallApi'

import page2Api from './mockData/page2Api'
import page1Api from './mockData/page1Api'

import personalApi from './mockData/personalApi'

// 首页拦截
Mock.mock('/api/home/getData', homeApi.getData)

// 用户界面拦截
Mock.mock('/api/user/getUser', 'post', userApi.getUserData)
Mock.mock('/api/user/addUser', 'post', userApi.addUserData)
Mock.mock('/api/user/editorUser', 'post', userApi.editorUserData)
Mock.mock('/api/user/deleteUser', 'post', userApi.deleteUserData)
Mock.mock('/api/user/searchUser', 'post', userApi.searchUserData)

// 登录界面拦截
Mock.mock('/api/login/loginUser', 'post', loginApi.loginData)

// 商品管理拦截
Mock.mock('/api/mall/getMall', 'post', mallApi.getData)
Mock.mock('/api/mall/addMall', 'post', mallApi.addData)
Mock.mock('/api/mall/deleteMall', 'post', mallApi.delData)

// page页面拦截
Mock.mock('/api/page2/getPage2', 'post', page2Api.getData)
Mock.mock('/api/page1/getPage1', 'post', page1Api.getData)

// personal拦截
Mock.mock('/api/personal/getPersonal', 'post', personalApi.getData)
