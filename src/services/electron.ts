/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-03-25 17:25:27
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-03-26 17:31:13
 * @FilePath: /DEMO/src/services/electron.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BaseResp } from "@/types/request";
import request from "@/utils/request";

export function getElectronicInvitation(
  options = { toLogin: true }
): Promise<BaseResp<any>> {
  return request.get({
    url: `${API_SERVER_URL}/getElectronicInvitationList`,
  });
}

export function getElectronicInvitationById(
  id: string
): Promise<BaseResp<any>> {
  return request.get({
    url: `${API_SERVER_URL}/getElectronicInvitationById?id=${id}`,
  });
}

export function saveComment(params: {
  create: string;
  content: string;
  template_id: string;
}): Promise<BaseResp<any>> {
  return request.post({
    url: `${API_SERVER_URL}/saveComment`,
    data: params,
  });
}

export function commentList(template_id: string): Promise<BaseResp<any>> {
  return request.get({
    url: `${API_SERVER_URL}/commentList?template_id=${template_id}`,
  });
}
