/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-02-20 10:00:18
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-03-13 16:15:21
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
