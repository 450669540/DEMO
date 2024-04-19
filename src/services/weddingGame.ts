/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-04-18 11:03:58
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-04-18 11:07:02
 * @FilePath: /DEMO/src/services/weddingGame.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasePageResp, BaseResp } from "@/types/request";
import request from "@/utils/request";

export async function getWeddingGame(): Promise<BasePageResp<Partial<any>>> {
  return request.get({
    url: `${API_SERVER_URL}/getWeddingGame`,
  });
}

/** 保存礼金簿 */
export function saveAndUpdateWeddingGame(params: {
  id;
  number;
  game_names;
}): Promise<BaseResp<any>> {
  return request.post({
    url: `${API_SERVER_URL}/saveWeddingGame`,
    data: params,
  });
}
