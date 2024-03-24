/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-03-13 16:01:20
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-03-13 16:17:55
 * @FilePath: /DEMO/src/subPages/accountSetting/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cell } from "@taroify/core";

import { RootState } from "@/models";
import { MemberVO } from "@/types/user";
import PageContainer from "@/components/PageContainer";
import Button from "@taroify/core/button/button";
import { userLogout } from "@/models/user/actions";

const AccountSetting = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector<RootState, MemberVO | undefined>(
    (state) => state.user.userInfo
  );

  const logout = () => {
    dispatch(userLogout());
  };

  return (
    <PageContainer>
      <Cell title="昵称">{userInfo?.nick_name}</Cell>
      <Button onClick={logout}>退出登录</Button>
    </PageContainer>
  );
};
export default AccountSetting;
