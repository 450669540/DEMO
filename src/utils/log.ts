/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-02-18 09:56:32
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-02-19 09:29:54
 * @FilePath: /DEMO/src/utils/log.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { EnumStorageKey } from "@/types/local.storage";
import Taro from "@tarojs/taro";

const log = Taro.getRealtimeLogManager ? Taro.getRealtimeLogManager() : null;

export default class LogHelper {
  static info(...args) {
    if (!log) return;
    const userInfo = Taro.getStorageSync(EnumStorageKey.用户信息);
    // log.info.apply(log, arguments);
    log.info(...args, "userInfo", userInfo);
  }
  static warn(...args) {
    if (!log) return;
    // log.warn.apply(log, arguments);
    const userInfo = Taro.getStorageSync(EnumStorageKey.用户信息);
    log.warn(...args, "userInfo", userInfo);
  }
  static error(...args) {
    if (!log) return;
    // log.error.apply(log, arguments);
    const userInfo = Taro.getStorageSync(EnumStorageKey.用户信息);
    log.error(...args, "userInfo", userInfo);
  }
  static setFilterMsg(msg) {
    // 从基础库2.7.3开始支持
    if (!log || !log.setFilterMsg) return;
    if (typeof msg !== "string") return;
    log.setFilterMsg(msg);
  }
  static addFilterMsg(msg) {
    // 从基础库2.8.1开始支持
    if (!log || !log.addFilterMsg) return;
    if (typeof msg !== "string") return;
    log.addFilterMsg(msg);
  }
}
