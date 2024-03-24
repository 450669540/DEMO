/*
 * @Description:
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2023-08-07 16:42:11
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-01-26 16:57:18
 */
/**
 * 本地存储key
 */
export enum EnumStorageKey {
  /**
   * 用户存储decode后的手机号
   */
  用户微信code解密信息 = 'WX_CODE2SESSION',
  /**
   * 微信getUserInfo的信息
   */
  用户微信基本信息 = 'WX_BASE_USERINFO',
  /**
   * 服务端返回的用户信息
   */
  用户信息 = 'USERINFO',
  /**
   * 服务端返回的用户信息
   */
  会员信息 = 'MEMBER_INFO',
  /**
   * 登录状态、token
   */
  用户登录状态 = 'USER_LOGININFO',
  /**
   * 微信登录sessionKey
   */
  sessionKey = 'sessionKey',
  /**
   * 微信登录sessionKey获取时间戳（秒）
   */
  sessionKeySec = 'sessionKeySec',
  离开小程序进程 = 'PROGRESS_LEAVING',
  搜索历史 = 'SEARCH_HISTORY',
  正在userLogin = 'IS_USER_LOGING',
  已自动跳转登录页 = 'AUTO_JUMP_LOGIN',
  当前程序失去focus = 'SYSTEM_LOOSE_FOCUS',
  AccountInfo = 'AccountInfo',
  分类页默认一级分类 = 'DEFAULT_CATEGORY_LV_ONE',
  最新认证申请 = 'LATEST_APPLY_ORDER',
  当前选择店铺 = 'CURRENT_SHOP',
  当前定位地址 = 'CURRENT_LOC',
  档口搜索历史 = 'STALL_SEARCH_HISTORY',
  tab跳转类型暂存 = 'TAB_SWITCH_PARAMS',
  优惠券弹窗最近弹出时间 = 'PROMOTE_DIALOG_TIEM',
  TabBarInfo = 'TAB_BAR_INFO',
  历史搜索关键词 = 'HISTORY_SEARCH_WORDS',
  常用门店 = 'COMMON_SHOP_ID_SET',
  店铺风格 = 'THEME',
  系统参数 = 'SYSTEM_PARAMS',
  通知模板 = 'NOTIFY_TEMPLATE',
  上次所选卡号 = 'LAST_CARD_NO',
  用户默认头像 = 'ONLINE_CUSTOMER_HEAD',
  /**
   * 弱网状态、token
   */
  弱网状态 = 'WEAK_NET',
  是否地图页面 = 'MAP_PAGE',
  定位地址 = 'LOCATION_ADDRESS',
  以前门店 = 'PREVIOUS_STORES',
  非第一次进入点单 = 'NO_FIRST_ENTRY_POINT_ORDER',
  不显示用户隐私授权弹窗 = 'requirePrivacyAuthorize',
  商品详情分享机构 = 'GOOD_DETAIL_SHARE_ORGID',
  商品列表数据 = 'PRODUCT_LIST_DATA',
  在首页地址授权过 = 'HOME_LOCATION_AUTH',
  点单页跳转到登录页 = 'CATEGORY_GOOD_TO_LOGIN_PAGE',
  分享过一次 = 'CATEGORY_GOOD_SHARED',
  默认店铺 = 'DEFAULT_SHOP',
  是否选择地址页面 = 'CHOOSE_ADDRESS_PAGE',
  再来一单跳转点单页 = 'ANOTHER_ORDER_JUMP_CATEGORY_PAGE',
  收银台订单UUID = 'GO_PAY_ORDER_UUID',
  保存问卷信息 = 'SAVE_QUESTION_INFO',
}
