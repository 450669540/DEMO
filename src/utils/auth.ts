import { EnumStorageKey } from "@/types/local.storage";
import LogHelper from "./log";
import { wxLogin } from "@/services/user";
import Taro from "@tarojs/taro";

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
      Taro.setStorageSync(EnumStorageKey.sessionKey, res2.data);
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
