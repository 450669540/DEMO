/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-02-18 09:56:32
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-02-19 09:34:34
 * @FilePath: /DEMO/src/utils/local.storage.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { EnumStorageKey } from "@/types/local.storage";
import Taro from "@tarojs/taro";
import { isNil } from "./lang";

export const getAccountInfo = () => {
  let info = Taro.getStorageSync(EnumStorageKey.AccountInfo);

  if (isNil(info)) {
    info = Taro.getAccountInfoSync();

    Taro.setStorageSync(EnumStorageKey.AccountInfo, info);
  }

  return info;
};
