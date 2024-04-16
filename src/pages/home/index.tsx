/*
 * @Author: your name
 * @Date: 2021-09-03 11:07:13
 * @LastEditTime: 2024-04-16 13:50:54
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
import Taro, { useShareAppMessage } from "@tarojs/taro";
import { seatArrangementRouter, weddingGameRouter } from "./../../router";
import { EnumImageCode, getUrlList } from "@/services/common";
import Tips from "@/utils/Tips";

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
      // setTopList([
      //   {
      //     // imgUrl: res?.data?.[0]?.url,
      //     flowImgUrl: res?.data?.[0]?.url,
      //   },
      //   {
      //     // imgUrl: res?.data?.[1]?.url,
      //     flowImgUrl: res?.data?.[1]?.url,
      //   },
      // ]);
      setTopList(res?.data?.map((item) => ({ flowImgUrl: item?.url })));
    }
  };

  useEffect(() => {
    getImageList();
  }, []);

  /** 婚礼座位排列 */
  const handleSeatArrangement = () => {
    Taro.navigateTo({ url: seatArrangementRouter() });
  };

  const handleOperation = (e) => {
    Tips.info("还在开发中,敬请期待");
  };

  const goGame = () => {
    Taro.navigateTo({ url: weddingGameRouter() });
  };

  return (
    <View className="container">
      <View style={{ position: "relative" }}>
        {/* <Image
          style={{ width: "100%", height: "800rpx" }}
          src={topList?.[current]?.imgUrl ?? ""}
        /> */}
        {topList?.[0]?.imgUrl && (
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
        )}
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
          <View className="operate" onClick={handleOperation}>
            婚纱照
          </View>
          <View className="operate" style={{ marginRight: 0 }} onClick={goGame}>
            互动游戏
          </View>
          <View className="operate" onClick={handleOperation}>
            留言板
          </View>
        </View>
      </View>
    </View>
  );
};
export default Home;
