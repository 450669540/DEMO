/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-01-09 11:14:49
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-02-21 13:25:37
 * @FilePath: /xmall-mini-partner/src/pages/components/LoginDialog/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  BaseEventOrig,
  Button,
  ButtonProps,
  Form,
  Image,
  Input,
  PageContainer,
  View,
} from "@tarojs/components";

import "./index.scss";
import { defaultAvatar } from "@/const";
import { AtAvatar } from "taro-ui";

import avatarPng from "@/images/avatar.png";
import rightArrow from "@/images/rightArrow.png";
import { wxPreLogin } from "@/utils/auth";
import { RootState } from "@/models";
import { MemberVO } from "@/types/user";
import { isNil } from "@/utils/lang";
import Tips from "@/utils/Tips";
import { updateMember } from "@/services/user";
import { userFetchMember } from "@/models/user/actions";
import { uploadFile } from "@/utils/upload";

interface Props {
  show: boolean;
  close: (openid?: string) => void;
  /** 点击遮罩层 */
  onClickOverlay: () => void;
}

const LoginDialog = ({ show, close, onClickOverlay }: Props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector<RootState, MemberVO | undefined>(
    (state) => state.user.userInfo
  );
  const [avatar, setAvatar] = useState(userInfo?.avatar);
  console.log("userInfo", userInfo);
  /**
   * 修改用户信息
   */
  const handleSave = async (e) => {
    if (!e?.detail?.value) {
      return;
    }
    const nickName = e.detail.value.nickname;
    console.log("nickName", nickName);
    if (isNil(avatar) || isNil(nickName)) {
      Tips.info("头像或昵称不能为空");
      return;
    }
    const res = await updateMember({ nick_name: nickName, avatar });
    if (res?.success) {
      close();
      dispatch(userFetchMember());
    } else {
      Tips.info("保存失败");
    }
  };

  const onChooseAvatar = async (e) => {
    if (e.detail?.avatarUrl) {
      uploadFile(e.detail?.avatarUrl).then(async (data) => {
        console.log(data, "data-uploadFileSuccess");
        setAvatar(data);
      });
    }
  };

  return (
    <PageContainer
      show={show}
      round
      onBeforeLeave={close}
      onBeforeEnter={() => console.log("onBeforeEnter")}
      onEnter={() => console.log("onEnter")}
      onAfterEnter={() => console.log("onAfterEnter")}
      onClickOverlay={onClickOverlay}
    >
      <View
        style={{
          height: "700rpx",
        }}
      >
        <View className="dialog">
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <View
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                marginTop: "20rpx",
              }}
            >
              <Image
                src={defaultAvatar}
                style={{ width: "80rpx", height: "80rpx" }}
              />
              <View className="title">最美婚礼册 申请</View>
            </View>
            <View
              style={{
                fontSize: "40rpx",
                fontWeight: "500",
                color: "#333",
                marginTop: "30rpx",
                marginBottom: "10rpx",
              }}
            >
              获取您的昵称、头像
            </View>
            <View
              style={{
                display: "flex",
                alignItems: "start",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <View
                style={{
                  display: "flex",
                  alignItems: "center",

                  height: "120rpx",
                  width: "100%",
                  borderBottom: "2rpx solid #f3f3f3",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View style={{ marginRight: "20rpx" }}>头像</View>
                  <View>
                    <Button
                      className="avatar-wrapper"
                      style={{
                        width: "54rpx",
                        height: "54rpx",
                        padding: "0",
                        borderRadius: "54rpx",
                        boxSizing: "content-box",
                        background: "transparent",
                      }}
                      open-type="chooseAvatar"
                      onChooseAvatar={onChooseAvatar}
                    >
                      <Image
                        style={{ width: "54rpx" }}
                        mode="widthFix"
                        className="avatar"
                        src={avatar ?? avatarPng}
                      ></Image>
                    </Button>
                  </View>
                </View>
                <View>
                  <Image
                    src={rightArrow}
                    mode="widthFix"
                    style={{ width: "18rpx" }}
                  />
                </View>
              </View>
            </View>
          </View>
          <Form onSubmit={handleSave} style={{ width: "100%" }}>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                height: "120rpx",
                width: "100%",
                borderBottom: "2rpx solid #f3f3f3",
              }}
            >
              <View style={{ marginRight: "20rpx" }}>昵称</View>
              <View>
                <Input
                  type="nickname"
                  name="nickname"
                  value={userInfo?.nick_name}
                  placeholder="请输入用户昵称"
                />
              </View>
            </View>
            <Button formType="submit" className="loginBtn" onClick={handleSave}>
              保存
            </Button>
          </Form>
        </View>
        {/* <View
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            src={defaultAvatar}
            style={{ width: "200rpx", height: "200rpx" }}
          />
        </View> */}
      </View>
    </PageContainer>
  );
};
export default LoginDialog;
