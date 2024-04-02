/*
 * @Author: your name
 * @Date: 2021-09-03 11:07:13
 * @LastEditTime: 2024-04-02 16:26:58
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @Description: In User Settings Edit
 * @FilePath: /myApp/src/pages/index/index.tsx
 */
import { useEffect, useState } from "react";
import { AtAvatar, AtButton } from "taro-ui";
import Taro from "@tarojs/taro";
import { View, Text, Image, Button } from "@tarojs/components";
import "./index.scss";
import avatarPng from "./../../images/avatar.png";
import adressManage from "./../../images/sudokuAdressManage.png";
import myShop from "./../../images/sudokuMyShop.png";
import groupBooking from "./../../images/sudokuGroupBooking.png";
import acountSetting from "./../../images/sudokuAcountSetting.png";
import LoginDialog from "./components/LoginDialog";
import { RootState } from "@/models";
import { MemberVO } from "@/types/user";
import { useSelector } from "react-redux";
import { Navbar } from "@taroify/core";
import PageContainer from "@/components/PageContainer";
import { useStatusBarHeight } from "@/hooks/layout";
import Icon from "@/components/Icon";
import Tips from "@/utils/Tips";

export default function Mine() {
  const userInfo = useSelector<RootState, MemberVO | undefined>(
    (state) => state.user.userInfo
  );
  const statusBarHeight = useStatusBarHeight();

  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   const getPhoneStorage = async () => {
  //     try {
  //       var result = await Taro.getStorage({ key: "phoneNum" });
  //       if (result && result.data) {
  //         setPhoneNum(() => {
  //           return result.data;
  //         });
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   if (Object.keys(userInfo).length > 0) {
  //     getPhoneStorage();
  //   }
  // }, [userInfo]);

  // const toUserInfoPage = () => {
  //   Taro.navigateTo({
  //     url: `/subPages/userInfo/index?phoneNum=${phoneNum}`,
  //   });
  // };

  console.log("userInfo", userInfo);

  const wxLogin = () => {
    setShow(true);
  };

  const handleContact = (e) => {
    console.log(e.detail.path);
    console.log(e.detail.query);
  };

  const loginComplete = () => {};

  const handleOperation = (e) => {
    Tips.info("还在开发中,敬请期待");
  };

  console.log("statusBarHeight", statusBarHeight);

  return (
    <PageContainer isShowSafeArea>
      <Navbar
        style={{
          // paddingTop: statusBarHeight,
          background: "transparent",
          color: "#fff",
          fontSize: "20px",
          "--navbar-icon-font-size": "20px",
          fontFamily: "HYXiaoBoZheZhiTiJ",
        }}
        safeArea="top"
        fixed
        placeholder={false}
        bordered={false}
      >
        <Navbar.Title>最美婚礼册</Navbar.Title>
      </Navbar>

      <View>
        <View
          style={{
            paddingTop: "160rpx",
            background:
              "linear-gradient(to top, rgba(242,243,246),rgba(229,213,188,1))",
          }}
        >
          <View>
            <View
              style={{ display: "flex", margin: "24rpx", alignItems: "center" }}
              onClick={wxLogin}
            >
              <AtAvatar circle image={userInfo?.avatar ?? avatarPng}></AtAvatar>
              <View style={{ display: "flex", flexDirection: "column" }}>
                <Text className="loginText">
                  {userInfo?.nick_name ?? "匿名"}
                </Text>
                <Text className="loginTipText">点击更新头像和昵称</Text>
              </View>
            </View>
          </View>
          <View className="otherOperatingContent">
            <View className="otherOperatingBtn">
              <View className="otherOperatingItem" onClick={handleOperation}>
                <Icon type="icon-zuopin" style={{ fontSize: "60rpx" }} />
                <View className="infoText2">作品</View>
              </View>
              <View className="otherOperatingItem" onClick={handleOperation}>
                <Icon type="icon-collection" style={{ fontSize: "60rpx" }} />
                <View className="infoText2">收藏</View>
              </View>
              <View className="otherOperatingItem">
                <Button
                  openType="contact"
                  onContact={handleContact}
                  className="contactBtn"
                >
                  <Icon type="icon-kefu" style={{ fontSize: "66rpx" }} />
                </Button>

                <View className="infoText2">客服</View>
              </View>
              <View className="otherOperatingItem" onClick={handleOperation}>
                <Icon type="icon-shezhi" style={{ fontSize: "60rpx" }} />

                <View className="infoText2">礼金统计</View>
              </View>
            </View>
          </View>
        </View>
        {/* <View style={{ padding: "24rpx 0", background: "#F3F4F5" }}>
          <View
            style={{
              background: "#fff",
              borderRadius: "32rpx",
              margin: "0 24rpx",
              display: "flex",
              flexDirection: "row",
              padding: "24rpx",
              alignItems: "center",
              position: "relative",
              marginBottom: "24rpx",
            }}
          >
            <View style={{ borderRadius: "32rpx" }}>
              <Image
                src={"http://127.0.0.1:5010/p1.png"}
                style={{ width: "150rpx", height: "240rpx" }}
              />
            </View>
            <View>
              <View
                style={{
                  fontSize: "40rpx",
                  color: "#333",
                  lineHeight: "58rpx",
                }}
              >
                张三&李四
              </View>
              <View
                style={{
                  color: "#999",
                  lineHeight: "48rpx",
                }}
              >
                婚期：2024年1月2日 20:00
              </View>
              <View
                style={{
                  color: "#999",
                  lineHeight: "48rpx",
                }}
              >
                农历：正月初八
              </View>
              <View
                style={{
                  color: "#999",
                  lineHeight: "48rpx",
                }}
              >
                地址：安徽省蚌埠市大酒店
              </View>
            </View>
            <View
              style={{
                position: "absolute",
                background: "#F6F6F6",
                borderRadius: "8rpx",
                color: "#999",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 20rpx",
                height: "56rpx",
                right: "12rpx",
                top: "12rpx",
                fontSize: "28rpx",
              }}
            >
              已结束
            </View>
          </View>
          <View
            style={{
              background: "#fff",
              borderRadius: "32rpx",
              margin: "0 24rpx",
              display: "flex",
              flexDirection: "row",
              padding: "24rpx",
              alignItems: "center",
              position: "relative",
              marginBottom: "24rpx",
            }}
          >
            <View style={{ borderRadius: "32rpx" }}>
              <Image
                src={"http://127.0.0.1:5010/p1.png"}
                style={{ width: "150rpx", height: "240rpx" }}
              />
            </View>
            <View>
              <View
                style={{
                  fontSize: "40rpx",
                  color: "#333",
                  lineHeight: "58rpx",
                }}
              >
                张三&李四
              </View>
              <View
                style={{
                  color: "#999",
                  lineHeight: "48rpx",
                }}
              >
                婚期：2024年1月2日 20:00
              </View>
              <View
                style={{
                  color: "#999",
                  lineHeight: "48rpx",
                }}
              >
                农历：正月初八
              </View>
              <View
                style={{
                  color: "#999",
                  lineHeight: "48rpx",
                }}
              >
                地址：安徽省蚌埠市大酒店
              </View>
            </View>
            <View
              style={{
                position: "absolute",
                background: "#F6F6F6",
                borderRadius: "8rpx",
                color: "#999",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 20rpx",
                height: "56rpx",
                right: "12rpx",
                top: "12rpx",
                fontSize: "28rpx",
              }}
            >
              已结束
            </View>
          </View>
          <View
            style={{
              background: "#fff",
              borderRadius: "32rpx",
              margin: "0 24rpx",
              display: "flex",
              flexDirection: "row",
              padding: "24rpx",
              alignItems: "center",
              position: "relative",
              marginBottom: "24rpx",
            }}
          >
            <View style={{ borderRadius: "32rpx" }}>
              <Image
                src={"http://127.0.0.1:5010/p1.png"}
                style={{ width: "150rpx", height: "240rpx" }}
              />
            </View>
            <View>
              <View
                style={{
                  fontSize: "40rpx",
                  color: "#333",
                  lineHeight: "58rpx",
                }}
              >
                张三&李四
              </View>
              <View
                style={{
                  color: "#999",
                  lineHeight: "48rpx",
                }}
              >
                婚期：2024年1月2日 20:00
              </View>
              <View
                style={{
                  color: "#999",
                  lineHeight: "48rpx",
                }}
              >
                农历：正月初八
              </View>
              <View
                style={{
                  color: "#999",
                  lineHeight: "48rpx",
                }}
              >
                地址：安徽省蚌埠市大酒店
              </View>
            </View>
            <View
              style={{
                position: "absolute",
                background: "#F6F6F6",
                borderRadius: "8rpx",
                color: "#999",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 20rpx",
                height: "56rpx",
                right: "12rpx",
                top: "12rpx",
                fontSize: "28rpx",
              }}
            >
              已结束
            </View>
          </View>
          <View
            style={{
              background: "#fff",
              borderRadius: "32rpx",
              margin: "0 24rpx",
              display: "flex",
              flexDirection: "row",
              padding: "24rpx",
              alignItems: "center",
              position: "relative",
              marginBottom: "24rpx",
            }}
          >
            <View style={{ borderRadius: "32rpx" }}>
              <Image
                src={"http://127.0.0.1:5010/p1.png"}
                style={{ width: "150rpx", height: "240rpx" }}
              />
            </View>
            <View>
              <View
                style={{
                  fontSize: "40rpx",
                  color: "#333",
                  lineHeight: "58rpx",
                }}
              >
                张三&李四
              </View>
              <View
                style={{
                  color: "#999",
                  lineHeight: "48rpx",
                }}
              >
                婚期：2024年1月2日 20:00
              </View>
              <View
                style={{
                  color: "#999",
                  lineHeight: "48rpx",
                }}
              >
                农历：正月初八
              </View>
              <View
                style={{
                  color: "#999",
                  lineHeight: "48rpx",
                }}
              >
                地址：安徽省蚌埠市大酒店
              </View>
            </View>
            <View
              style={{
                position: "absolute",
                background: "#F6F6F6",
                borderRadius: "8rpx",
                color: "#999",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 20rpx",
                height: "56rpx",
                right: "12rpx",
                top: "12rpx",
                fontSize: "28rpx",
              }}
            >
              已结束
            </View>
          </View>
        </View> */}
        <LoginDialog
          show={show}
          close={() => setShow(false)}
          onClickOverlay={() => {
            setShow(false);
          }}
        />
      </View>
    </PageContainer>
  );
}
