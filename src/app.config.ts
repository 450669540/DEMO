/*
 * @Author: your name
 * @Date: 2021-09-03 11:07:13
 * @LastEditTime: 2024-04-16 13:49:38
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @Description: In User Settings Edit
 * @FilePath: /myApp/src/app.config.ts
 */
export default {
  pages: [
    /** 首页 */
    "pages/home/index",
    //"pages/classify/index",
    // "pages/buyCar/index",
    // "pages/message/index",
    "pages/electronicInvitationMain/index",
    "pages/mine/index",
  ],
  //分包
  subpackages: [
    {
      root: "subPages",
      pages: [
        //"userInfo/index",
        // "wxAuthorizationPhone/index",
        // "bindPhoneYzm/index",
        "seatArrangement/index",
        "seatArrangement/view/index",
        "accountSetting/index",
        "electronicInvitation/index",
        "giftStatistics/index",
        "giftStatistics/giftBook/index",
        "giftStatistics/giftBookDetails/index",
        "giftStatistics/bookDetail/index",
        "giftStatistics/permissionManagement/index",
        "wediingGame/index",
      ],
    },
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    selectedColor: "#DBA55B",
    list: [
      {
        pagePath: "pages/home/index",
        text: "首页",
        iconPath: "./images/home.png",
        selectedIconPath: "./images/home-select.png",
        selectedColor: "#E5D5BC",
      },
      {
        pagePath: "pages/electronicInvitationMain/index",
        text: "电子请柬",
        iconPath: "./images/invitation.png",
        selectedIconPath: "./images/invitation-select.png",
        selectedColor: "#E5D5BC",
      },
      // {
      //   pagePath: "pages/buyCar/index",
      //   text: "购物车",
      //   iconPath: "./images/buyCar.png",
      //   selectedIconPath: "./images/buyCar.png",
      // },
      // {
      //   pagePath: "pages/message/index",
      //   text: "消息",
      //   iconPath: "./images/message.png",
      //   selectedIconPath: "./images/message.png",
      // },
      {
        pagePath: "pages/mine/index",
        text: "个人中心",
        iconPath: "./images/my.png",
        selectedIconPath: "./images/my-select.png",
      },
    ],
  },
  preloadRule: {
    "pages/home/index": {
      network: "all",
      packages: ["subPages"],
    },
    "pages/electronicInvitationMain/index": {
      network: "all",
      packages: ["subPages"],
    },
    // "pages/buyCar/index": {
    //   network: "all",
    //   packages: ["subPages"],
    // },
    // "pages/message/index": {
    //   network: "all",
    //   packages: ["subPages"],
    // },
    "pages/mine/index": {
      network: "all",
      packages: ["subPages"],
    },
  },

  lazyCodeLoading: "requiredComponents",

  plugins: {
    wxacommentplugin: {
      version: "1.0.1",
      provider: "wx82e6ae1175f264fa",
    },
  },
};
