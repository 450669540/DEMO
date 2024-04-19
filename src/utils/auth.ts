/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-02-20 09:59:17
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-04-18 10:05:20
 * @FilePath: /DEMO/src/utils/auth.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { EnumStorageKey } from "@/types/local.storage";
import LogHelper from "./log";
import { wxLogin } from "@/services/user";
import Taro from "@tarojs/taro";
import { isNil } from "./lang";

export async function wxPreLogin(manual?: boolean) {
  const res1 = await Taro.login();
  if (res1.code) {
    if (manual ?? false) {
      Taro.showLoading({ title: "", mask: true });
    }
    const res2 = await wxLogin(res1.code);

    console.log(res2, "res2-code");

    if (manual ?? false) {
      Taro.hideLoading();
    }
    if (res2.success) {
      Taro.setStorageSync(EnumStorageKey.用户登录状态, res2.data);
    } else {
      Taro.showToast({ title: res2.message, icon: "none" });
      LogHelper.info("wxPreLogin-wxcode2sessionKey", res2);
      throw new Error(res2.message);
    }
  } else {
    LogHelper.info("wxPreLogin-Taro.login", res1);
    throw new Error(JSON.stringify(res1));
  }
}

export async function checkSessionKey() {
  const sessionKey = Taro.getStorageSync(EnumStorageKey.sessionKey) as string;
  if (isNil(sessionKey)) {
    return false;
  }
  // Taro.checkSession({
  //   success: () => {
  //     console.log('checkSession-success');
  //   },
  //   fail: () => {
  //     console.log('checkSession-fail');
  //   },
  // });
  let res = true;
  try {
    __WEAPP__ && (await Taro.checkSession());

    res = true;
  } catch {
    res = false;
  }
  // console.log('checkSessionKey', res);
  return res;
}
