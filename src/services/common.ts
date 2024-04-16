/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-02-19 09:18:18
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-04-10 16:42:32
 * @FilePath: /DEMO/src/services/common.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasePageResp } from "@/types/request";
import request from "@/utils/request";

export enum EnumImageCode {
  首页顶部图 = "HOME_BANNER",
}

export async function getUrlList(
  code: EnumImageCode,
  orgId?: string
): Promise<BasePageResp<Partial<any>>> {
  return request.get({
    url: `${API_SERVER_URL}/getAdvertisements`,
    data: {
      code: code,
      orgId,
    },
  });
}

export async function getSystemParams(): Promise<BasePageResp<Partial<any>>> {
  return request.get({
    url: `${API_SERVER_URL}/getSystemParams`,
    data: {},
  });
}
