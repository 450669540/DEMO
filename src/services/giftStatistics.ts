/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-04-14 11:57:19
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-04-16 10:38:38
 * @FilePath: /DEMO/src/services/giftStatistics.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasePageResp, BaseResp } from "@/types/request";
import request from "@/utils/request";

export async function getGiftBookList({
  start,
  pageSize,
}): Promise<BasePageResp<Partial<any>>> {
  return request.get({
    url: `${API_SERVER_URL}/giftBookList`,
    data: { start, pageSize },
  });
}

export async function getBookDetail(
  id: string
): Promise<BasePageResp<Partial<any>>> {
  return request.get({
    url: `${API_SERVER_URL}/getGiftBookDetail`,
    data: { id },
  });
}
/** 保存礼金簿 */
export function saveAndUpdateGiftBook(params: {
  name;
  activity_on;
  remark;
  id;
}): Promise<BaseResp<any>> {
  return request.post({
    url: `${API_SERVER_URL}/saveGiftBook`,
    data: params,
  });
}

export async function getBookRecordList(params: {
  id;
  keyword;
  start;
  pageSize;
}): Promise<BasePageResp<Partial<any>>> {
  return request.get({
    url: `${API_SERVER_URL}/bookRecordList`,
    data: params,
  });
}

export async function getGiftBookRecordDetail(
  id: string
): Promise<BasePageResp<Partial<any>>> {
  return request.get({
    url: `${API_SERVER_URL}/getBookRecordDetail`,
    data: { id },
  });
}
/** 保存礼金记录 */
export function saveAndUpdateBookRecord(params: {
  name;
  gift_money;
  remark;
  id;
  bookId;
}): Promise<BaseResp<any>> {
  return request.post({
    url: `${API_SERVER_URL}/saveBookRecord`,
    data: params,
  });
}

/** 更新礼金簿总记录数,总金额 */
export function fetchUpdateGiftBookTotal(params: {
  id;
  total_record;
  total_money;
}): Promise<BaseResp<any>> {
  return request.post({
    url: `${API_SERVER_URL}/updateGiftBookTotal`,
    data: params,
  });
}

/** 更新权限人员 */
export function fetchUpdateGiftBookAuthorized(params: {
  id;
  authorized_ids;
}): Promise<BaseResp<any>> {
  return request.post({
    url: `${API_SERVER_URL}/updateGiftBookAuthorized`,
    data: params,
  });
}

/** 删除礼金簿 */
export async function deleteGiftBook(
  id: string
): Promise<BasePageResp<Partial<any>>> {
  return request.get({
    url: `${API_SERVER_URL}/deleteGiftBook`,
    data: { id },
  });
}

/** 删除礼金记录 */
export async function deleteBookRecord(
  id: string
): Promise<BasePageResp<Partial<any>>> {
  return request.get({
    url: `${API_SERVER_URL}/deleteBookRecord`,
    data: { id },
  });
}
