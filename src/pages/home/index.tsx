/*
 * @Author: your name
 * @Date: 2021-09-03 11:07:13
 * @LastEditTime: 2024-02-19 10:44:56
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @Description: In User Settings Edit
 * @FilePath: /myApp/src/pages/index/index.tsx
 */
import { Component, useEffect, useState } from "react";
import { View, Text, Swiper, SwiperItem, Image } from "@tarojs/components";
import "./index.scss";
import React from "react";

import P1 from "@/pages/home/images/p1.png";
import P2 from "@/pages/home/images/p2.png";
import Taro from "@tarojs/taro";
import { seatArrangementRouter } from "./../../router";
import { EnumImageCode, getUrlList } from "@/services/common";

const Home = () => {
  const [topList, setTopList] = useState<
    { imgUrl: string; flowImgUrl: string }[]
  >([]);
  const [current, setCurrent] = useState<number>(0);
  const [dx, setDx] = useState<number>(0);

  const getImageList = async () => {
    const res = await getUrlList(EnumImageCode.首页顶部图);
    console.log(res?.data);
    if (res?.success) {
      setTopList([
        {
          imgUrl:
            "https://marketplace.canva.cn/r19jw/MADxmDr19jw/1/screen_2x/canva-peak-MADxmDr19jw.jpg",
          flowImgUrl: res?.data?.[0]?.url,
        },
        {
          imgUrl:
            "https://newoss.zhulong.com/tfs/photo/big/201312/04/115257tu7ni6ovlxbj9hb2.jpg",
          flowImgUrl: res?.data?.[1]?.url,
        },
      ]);
    }
  };

  useEffect(() => {
    getImageList();
  }, []);

  /** 婚礼座位排列 */
  const handleSeatArrangement = () => {
    Taro.navigateTo({ url: seatArrangementRouter() });
  };

  return (
    <View className="container">
      <View style={{ position: "relative" }}>
        <Image
          style={{ width: "100%", height: "800rpx" }}
          src={topList?.[current]?.imgUrl ?? ""}
        />
        <Image
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            opacity: Math.abs(dx) / 375,
            width: "100%",
            height: "800rpx",
          }}
          src={
            dx > 0
              ? current === topList?.length - 1
                ? topList[0]?.imgUrl
                : topList?.[current + 1]?.imgUrl
              : dx < 0
              ? current === 0
                ? topList?.[topList?.length - 1]?.imgUrl
                : topList?.[current - 1]?.imgUrl
              : topList?.[current]?.imgUrl
          }
        />
        <Swiper
          style={{
            width: "100%",
            height: "800rpx",
            position: "absolute",
            left: 0,
            top: 0,
          }}
          autoplay
          duration={1000}
          onChange={(e) => {
            setCurrent(e?.detail?.current);
          }}
          onTransition={(e) => {
            setDx(e?.detail?.dx);
          }}
        >
          {topList?.map((item, index) => (
            <SwiperItem key={index}>
              <Image
                src={item?.flowImgUrl}
                style={{ width: "100%", height: "800rpx" }}
                mode="widthFix"
              />
            </SwiperItem>
          ))}
        </Swiper>
      </View>

      <View className="operateContainer">
        <View className="operateWrap">
          <View className="operate" onClick={handleSeatArrangement}>
            婚礼座位排列
          </View>
          <View className="operate">婚纱照</View>
          <View className="operate" style={{ marginRight: 0 }}>
            互动游戏
          </View>
          <View className="operate">留言板</View>
        </View>
      </View>
    </View>
  );
};
export default Home;
