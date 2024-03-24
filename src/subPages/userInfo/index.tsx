/*
 * @Author: your name
 * @Date: 2021-09-03 11:07:13
 * @LastEditTime: 2024-02-18 11:52:54
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @Description: In User Settings Edit
 * @FilePath: /myApp/src/pages/index/index.tsx
 */
import { useContext } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import avatarPng from "./../../images/avatar.png";
import rightArrowPng from "./../../images/rightArrow.png";
import "./index.scss";
import { MyContext } from "./../../reducer/index";

export default function UserInfo() {
  const { params } = useRouter();
  console.log(params);
  const phoneNum = params?.phoneNum ?? "";
  const { state }: any = useContext(MyContext);
  const { userInfo } = state;

  /**
   * 跳转绑定手机号页面
   */
  const toWxAuthorizationPhone = () => {
    Taro.navigateTo({
      url: `/subPages/wxAuthorizationPhone/index`,
    });
  };

  return (
    <View>
      <View className="item">
        <View>
          <Text className="itemText">头像</Text>
        </View>
        <View>
          <Image
            className="avatarImage"
            src={userInfo.avatarUrl ?? avatarPng}
          ></Image>
        </View>
      </View>
      <View className="item">
        <View>
          <Text className="itemText">昵称</Text>
        </View>
        <View>
          <Text className="itemText">{userInfo.nickName ?? ""}</Text>
        </View>
      </View>
      <View className="item">
        <View>
          <Text className="itemText">客户编号</Text>
        </View>
        <View>
          <Text className="itemText">77787878798888</Text>
        </View>
      </View>
      <View className="item">
        <View>
          <Text className="itemText">手机号</Text>
        </View>
        {phoneNum ? (
          <View>
            <Text className="itemText">{phoneNum}</Text>
          </View>
        ) : (
          <View onClick={toWxAuthorizationPhone}>
            <Text className="itemText">绑定手机号</Text>
            <Image className="rightArrow" src={rightArrowPng}></Image>
          </View>
        )}
      </View>
    </View>
  );
}
