/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-02-06 15:40:30
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-03-14 13:53:36
 * @FilePath: /DEMO/src/pages/electronicInvitationMain/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import PageContainer from "@/components/PageContainer";
import { Image, ScrollView, Text, View } from "@tarojs/components";
import "./index.scss";
import { electronicInvitationRouter } from "@/router";
const ElectronicInvitationMain = () => {
  const [list, setList] = useState([]);

  const ElectronTypeName = {
    longImage: "长图",
    flip: "翻页",
  };

  useEffect(() => {
    setList([
      {
        id: "",
        url: "http://127.0.0.1:5010/example1_1.jpg",
        imageCount: 0,
        usedCount: 0,
        type: "longImage",
        name: "",
      },
      {
        id: "",
        url: "http://127.0.0.1:5010/example2_1.jpg",
        imageCount: 0,
        usedCount: 0,
        type: "flip",
        name: "",
      },
      {
        id: "",
        url: "http://127.0.0.1:5010/example3_1.jpg",
        imageCount: 0,
        usedCount: 0,
        type: "flip",
        name: "",
      },
      {
        id: "",
        url: "http://127.0.0.1:5010/example4_1.jpg",
        imageCount: 0,
        usedCount: 0,
        type: "longImage",
        name: "",
      },
      {
        id: "",
        url: "http://127.0.0.1:5010/example4_1.jpg",
        imageCount: 0,
        usedCount: 0,
        type: "longImage",
        name: "",
      },
      {
        id: "",
        url: "http://127.0.0.1:5010/example4_1.jpg",
        imageCount: 0,
        usedCount: 0,
        type: "longImage",
        name: "",
      },
      {
        id: "",
        url: "http://127.0.0.1:5010/example4_1.jpg",
        imageCount: 0,
        usedCount: 0,
        type: "longImage",
        name: "",
      },
      {
        id: "",
        url: "http://127.0.0.1:5010/example4_1.jpg",
        imageCount: 0,
        usedCount: 0,
        type: "longImage",
        name: "",
      },
      {
        id: "",
        url: "http://127.0.0.1:5010/example4_1.jpg",
        imageCount: 0,
        usedCount: 0,
        type: "longImage",
        name: "",
      },
      {
        id: "",
        url: "http://127.0.0.1:5010/example4_1.jpg",
        imageCount: 0,
        usedCount: 0,
        type: "longImage",
        name: "",
      },
      {
        id: "",
        url: "http://127.0.0.1:5010/example4_1.jpg",
        imageCount: 0,
        usedCount: 0,
        type: "longImage",
        name: "",
      },
      {
        id: "",
        url: "http://127.0.0.1:5010/example4_1.jpg",
        imageCount: 0,
        usedCount: 0,
        type: "longImage",
        name: "",
      },
    ]);
  }, []);

  const viewElectron = (item) => {
    Taro.navigateTo({ url: electronicInvitationRouter() });
  };

  return (
    <View className="container">
      <View
        style={{
          background: "#fff",
          width: "300rpx",
          height: "80rpx",
          borderTopLeftRadius: "24rpx",
          borderTopRightRadius: "24rpx",
          marginTop: "40rpx",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          fontSize: "36rpx",
        }}
      >
        婚礼邀请
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          background: "#fff",
          padding: "20rpx 24rpx",
        }}
      >
        <View
          style={{
            background: "#FFF4F6",
            color: "#FF405F",
            padding: "10rpx 16rpx",
            marginRight: "20rpx",
          }}
        >
          精选
        </View>
        <View
          style={{
            background: "#F6F6F6",
            color: "#999",
            padding: "10rpx 16rpx",
            marginRight: "20rpx",
          }}
        >
          长图
        </View>
        <View
          style={{
            background: "#F6F6F6",
            color: "#999",
            padding: "10rpx 16rpx",
            marginRight: "20rpx",
          }}
        >
          翻页
        </View>
        <View
          style={{
            background: "#F6F6F6",
            color: "#999",
            padding: "10rpx 16rpx",
            marginRight: "20rpx",
          }}
        >
          海报
        </View>
      </View>

      <ScrollView scrollY style={{ height: "92vh", background: "#f8f8f8" }}>
        <View
          style={{
            display: "flex",
            flexWrap: "wrap",
            margin: "0 24rpx",
          }}
        >
          {list?.map((item, index) => (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                width: "calc((100vw - 68rpx) / 3)",
                borderRadius: "16rpx",
                background: "#fff",
                overflow: "hidden",
                marginBottom: "8rpx",
                position: "relative",
                marginRight: index % 3 === 2 ? 0 : "8rpx",
              }}
              onClick={() => viewElectron(item)}
            >
              <View
                style={{
                  padding: "10rpx",
                  background: "#333",
                  opacity: "0.7",
                  color: "#fff",
                  position: "absolute",
                  right: 0,
                  top: 0,
                  borderTopLeftRadius: "16rpx",
                  borderBottomLeftRadius: "16rpx",
                }}
              >
                {ElectronTypeName?.[item?.type]}
              </View>
              <Image
                src={item?.url}
                lazyLoad
                style={{
                  width: "calc((100vw - 68rpx) / 3)",
                  height: "calc((100vw - 68rpx) / 3 * 394 / 254)",
                  background: "#999",
                }}
              />
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12rpx",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: 500 }}>2k</Text>
                  <Text style={{ fontSize: "26rpx" }}>人制作</Text>
                </View>
                <View>
                  <Text style={{ fontSize: "26rpx" }}>9图</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
export default ElectronicInvitationMain;
