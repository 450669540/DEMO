/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-02-19 09:30:24
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-02-19 15:45:05
 * @FilePath: /DEMO/src/const/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 服务域名+端口号，用于统一管理，不用打包散落在各个文件
export const REAL_API_SERVER_URL = API_SERVER_URL;

// 微服务
export const SERVICES = Object.freeze({
  Identity: "/Identity",
  HubCenter: "/HubCenter",
  Archives: "/Archives",
  Customer: "/Customer",
  Market: "/Market",
  Storages: "/Storages",
  Sales: "/Sales",
  Schedules: "/Schedules",
  Finances: "/Finances",
  Reports: "/Reports",
  MultiChannel: "/MultiChannel",
  Notifys: "/Notifys",
});

// 默认主题色
export const DEFAULT_THEME = Object.freeze({
  primaryColor: "#c6010b",
  subColor: "#FFA500",
});

export const NOT_LOGIN_CODE = 102;

/**
 * 正则邮箱
 * https://any86.github.io/any-rule/
 * @author luoxiaochuan <luoxiaochuan@comteck.cn>
 * @date 2022-01-11
 */
export const REG_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// 手机号宽松正则
export const REG_LOOSE_PHONE_NUMBER = /^1\d{10}$/;

// 登录类型
export const LOGIN_TYPE = Object.freeze({
  WEIXIN: 1,
  MOBILE: 2,
  WEIXIN_OR_MOBILE: 3,
});

export const defaultAvatar = `${API_SERVER_URL}/default_avatar.png`;
