/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-04-19 11:24:23
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-04-25 15:42:23
 * @FilePath: /DEMO/src/services/seat.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasePageResp, BaseResp } from "@/types/request";
import request from "@/utils/request";

export async function seatList({
  start,
  pageSize,
}): Promise<BasePageResp<Partial<any>>> {
  return request.get({
    url: `${API_SERVER_URL}/seatList`,
    data: { start, pageSize },
  });
}

export async function checkSeat({
  template_id,
}): Promise<BasePageResp<Partial<any>>> {
  return request.get({
    url: `${API_SERVER_URL}/checkSeat`,
    data: { template_id },
  });
}

/** 保存礼金簿 */
export function saveAndUpdateSeat(params: {
  template_id;
  template_name;
  id;
}): Promise<BaseResp<any>> {
  return request.post({
    url: `${API_SERVER_URL}/saveSeat`,
    data: params,
  });
}

export async function getAllTableList(params: {
  id;
  keyword;
}): Promise<BasePageResp<Partial<any>>> {
  return request.get({
    url: `${API_SERVER_URL}/allTableList`,
    data: params,
  });
}

export async function getTableDetail(
  id: string
): Promise<BasePageResp<Partial<any>>> {
  return request.get({
    url: `${API_SERVER_URL}/getTableDetail`,
    data: { id },
  });
}

/** 保存礼金记录 */
export function saveAndUpdateTable(params: {
  guest_names;
  table_no;
  id;
  seatId;
}): Promise<BaseResp<any>> {
  return request.post({
    url: `${API_SERVER_URL}/saveTable`,
    data: params,
  });
}

/** 删除礼金簿 */
export async function deleteSeat(
  id: string
): Promise<BasePageResp<Partial<any>>> {
  return request.get({
    url: `${API_SERVER_URL}/deleteSeat`,
    data: { id },
  });
}

/** 删除礼金记录 */
export async function deleteTable(
  id: string
): Promise<BasePageResp<Partial<any>>> {
  return request.get({
    url: `${API_SERVER_URL}/deleteTable`,
    data: { id },
  });
}
