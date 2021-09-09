/*
 * @Author: your name
 * @Date: 2021-09-03 11:07:13
 * @LastEditTime: 2021-09-08 14:18:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /myApp/src/app.config.ts
 */
export default {
  pages: [
    'pages/home/index',
    'pages/classify/index',
    'pages/buyCar/index',
    'pages/message/index',
    'pages/mine/index',
    'pages/userInfo/index',
    'pages/wxAuthorizationPhone/index',
    'pages/bindPhoneYzm/index'

  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar:{
    selectedColor:'#82B6D8',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: './images/home.png',
        selectedIconPath: './images/home.png',
      },
      {
        pagePath: 'pages/classify/index',
        text: '分类',
        iconPath: './images/classify.png',
        selectedIconPath: './images/classify.png',
      },
      {
        pagePath: 'pages/buyCar/index',
        text: '购物车',
        iconPath: './images/buyCar.png',
        selectedIconPath: './images/buyCar.png',
      },
      {
        pagePath: 'pages/message/index',
        text: '消息',
        iconPath: './images/message.png',
        selectedIconPath: './images/message.png',
      },
      {
        pagePath: 'pages/mine/index',
        text: '个人中心',
        iconPath: './images/selectedMine.png',
        selectedIconPath: './images/selectedMine.png',
      },
      
    ],

  }
  
}
