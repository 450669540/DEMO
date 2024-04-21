/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-02-20 10:00:18
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-04-21 11:29:52
 * @FilePath: /DEMO/src/services/user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BaseResp } from "@/types/request";
import { MemberVO } from "@/types/user";
import request from "@/utils/request";

export function wxLogin(code: string): Promise<BaseResp<string>> {
  return request.post({
    url: `${API_SERVER_URL}/login`,
    toLogin: false,
    data: { code },
    manualToast: true,
  });
}

/**
 * 获取用户信息
 */
export function getMember(
  options = { toLogin: true }
): Promise<BaseResp<MemberVO>> {
  return request.get({
    url: `${API_SERVER_URL}/getUserInfo`,
    toLogin: options.toLogin,
  });
}

/**
 * 更新用户信息
 */
export function updateMember(params: {
  nick_name: string;
  avatar: string;
}): Promise<BaseResp<MemberVO>> {
  return request.post({
    url: `${API_SERVER_URL}/updateUserInfo`,
    data: params,
  });
}

/**
 * 退出登录
 */
export function logout(): Promise<BaseResp<MemberVO>> {
  return request.get({
    url: `${API_SERVER_URL}/logout`,
  });
}

/**
 * 获取用户信息
 */
export function getUserInfoByIds({ ids }): Promise<BaseResp<MemberVO>> {
  return request.get({
    url: `${API_SERVER_URL}/getUserInfoByIds`,
    data: { ids },
  });
}

/**
 * 获取用户信息
 */
export function getUserInfoByUserNo({ user_no }): Promise<BaseResp<MemberVO>> {
  return request.get({
    url: `${API_SERVER_URL}/getUserInfoByUserNo`,
    data: { user_no },
  });
}

/**
 * 更新婚礼日期
 */
export function updateWeddingDate(params: {
  date: Date;
}): Promise<BaseResp<MemberVO>> {
  return request.post({
    url: `${API_SERVER_URL}/updateWeddingDate`,
    data: params,
  });
}

/**
 * 获取用户信息
 */
export function getWeddingProcess(): Promise<BaseResp<MemberVO>> {
  return request.get({
    url: `${API_SERVER_URL}/getWeddingProcess`,
  });
}
