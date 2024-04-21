/*
 * @Author: your name
 * @Date: 2021-09-03 11:07:13
 * @LastEditTime: 2024-04-21 12:55:14
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @Description: In User Settings Edit
 * @FilePath: /myApp/src/pages/index/index.tsx
 */
import { Component, useEffect, useState } from "react";
import { View, Text, Swiper, SwiperItem, Image } from "@tarojs/components";
import "./index.scss";
import React from "react";

import MarryIcon from "@/images/marry-icon.png";
import MarryIcon2 from "@/images/marry-icon2.png";
import MarryIcon3 from "@/images/marry-icon3.png";

import Taro, { useShareAppMessage } from "@tarojs/taro";
import {
  auspiciousDayRouter,
  electronicInvitationMainRouter,
  electronicInvitationRouter,
  giftStatisticsRouter,
  seatArrangementRouter,
  weddingGameRouter,
} from "./../../router";
import { EnumImageCode, getUrlList } from "@/services/common";
import Tips from "@/utils/Tips";
import Icon from "@/components/Icon";
import DatePickerComponent from "@/components/DatePickerComponent";
import PageContainer from "@/components/PageContainer";
import dayjs from "dayjs";
import { getWeddingProcess, updateWeddingDate } from "@/services/user";
import { useSelector } from "react-redux";
import { RootState } from "@/models";
import { MemberVO } from "@/types/user";
import { NOOP } from "@/utils/util";

const Home = () => {
  const userInfo = useSelector<RootState, MemberVO | undefined>(
    (state) => state.user.userInfo
  );
  const [topList, setTopList] = useState<
    { imgUrl: string; flowImgUrl: string }[]
  >([]);
  const [current, setCurrent] = useState<number>(0);
  const [dx, setDx] = useState<number>(0);
  const [showDate, setShowDate] = useState(false);
  const [weddingDate, setWeddingDate] = useState<Date>();
  const [weddingProcess, setWeddingProcess] = useState();
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
    // console.log("wedding_date", userInfo?.wedding_date);
  }, []);

  useEffect(() => {
    console.log("wedding_date", userInfo?.wedding_date);
    setWeddingDate(userInfo?.wedding_date);
    if (userInfo?._id) {
      getWeddingProcessCount();
    }
  }, [userInfo]);

  const getWeddingProcessCount = async () => {
    const res = await getWeddingProcess();
    if (res?.success) {
      console.log("count", res?.data);
      setWeddingProcess(`${(res?.data / 4) * 100}%`);
    }
  };

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

  const goAuspiciousDay = () => {
    Taro.navigateTo({ url: auspiciousDayRouter() });
  };

  /** 添加婚礼时间 */
  const handleAddWeddingDate = () => {
    setShowDate(true);
  };

  /** 礼金统计 */
  const goGiftStatistics = () => {
    Taro.navigateTo({ url: giftStatisticsRouter() });
  };

  /** 电子请柬 */
  const goElectronicMain = () => {
    Taro.switchTab({ url: electronicInvitationMainRouter() });
  };

  /** 改变婚礼日期 */
  const handleChangeWeddingDate = async (data) => {
    setShowDate(false);
    const res = await updateWeddingDate({ date: data });
    if (res?.success) {
      setWeddingDate(data);
    }
  };
  return (
    <PageContainer>
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
              height: "1000rpx",
              // position: "absolute",
              // left: 0,
              // top: 0,
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
        <View
          style={{ position: "absolute", bottom: 0, left: 0, width: "100%" }}
        >
          <View
            style={{
              background: "#fff",
              margin: "24rpx",
              padding: "24rpx",
              borderRadius: "16rpx",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "4rpx dashed #FA7A82",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  background: "#DBA55B",
                  color: "#fff",
                  fontWeight: 500,
                  borderRadius: "40rpx",
                  padding: "6rpx 30rpx",
                  width: "fit-content",
                }}
              >
                婚礼倒计时
              </View>
              {weddingDate && (
                <View
                  style={{
                    marginLeft: "20rpx",
                    color: "#D31C1F",
                    fontSize: "60rpx",
                    fontWeight: 500,
                  }}
                >
                  {dayjs(weddingDate).diff(dayjs(new Date()), "day")}天
                </View>
              )}
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                //padding: "20rpx 10rpx",
                width: "100%",
                // justifyContent: weddingDate ? "center" : "flex-start",
              }}
            >
              {/* <Image
            src={MarryIcon}
            style={{ width: "120rpx", height: "120rpx" }}
          /> */}
              <Image
                src={weddingDate ? MarryIcon2 : MarryIcon}
                style={{ width: "180rpx", height: "180rpx" }}
                onClick={weddingDate ? handleAddWeddingDate : NOOP}
              />
              {weddingDate ? (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <View
                      style={{
                        marginBottom: "40rpx",
                        fontSize: "30rpx",
                        color: "#999",
                      }}
                    >
                      目标日{dayjs(weddingDate)?.format("YYYY/MM/DD")},完成了
                      {weddingProcess}
                    </View>
                    <View style={{ position: "relative" }}>
                      <View
                        style={{
                          width: "400rpx",
                          height: "4rpx",
                          background: "#E8C4B7",
                          borderRadius: "8rpx",
                        }}
                      ></View>
                      <View
                        style={{
                          width: "30rpx",
                          height: "4rpx",
                          background: "#E82363",
                          borderRadius: "8rpx",
                          position: "absolute",
                          left: 0,
                          top: 0,
                        }}
                      ></View>
                      <Icon
                        type="icon-likefill"
                        style={{
                          color: "#D31C1F",
                          fontSize: "40rpx",
                          position: "absolute",
                          left: "20rpx",
                          top: -12,
                        }}
                      />
                    </View>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    color: "#DBA55B",
                    fontSize: "36rpx",
                    fontWeight: 500,
                    marginLeft: "20rpx",
                  }}
                  onClick={handleAddWeddingDate}
                >
                  添加婚礼开始倒计时
                </View>
              )}
            </View>
          </View>
          <View
            style={{
              background: "#fff",
              margin: "24rpx",
              padding: "24rpx",
              borderRadius: "16rpx",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              border: "4rpx dashed #FA7A82",
            }}
          >
            <View
              style={{
                width: "33%",
                height: "100rpx",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={handleSeatArrangement}
            >
              <Icon
                type="icon-icon_disanpaizuoyi"
                style={{ fontSize: "40rpx" }}
              />
              <View style={{ marginTop: "10rpx", fontSize: "28rpx" }}>
                婚礼排座
              </View>
            </View>
            <View
              style={{
                width: "33%",
                height: "100rpx",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={handleOperation}
            >
              <Icon type="icon-Group" style={{ fontSize: "40rpx" }} />
              <View style={{ marginTop: "10rpx", fontSize: "28rpx" }}>
                婚纱照
              </View>
            </View>
            <View
              style={{
                width: "33%",
                height: "100rpx",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={goGame}
            >
              <Icon type="icon-hunli-3" style={{ fontSize: "40rpx" }} />
              <View style={{ marginTop: "10rpx", fontSize: "28rpx" }}>
                接亲游戏
              </View>
            </View>
            <View
              style={{
                width: "33%",
                height: "100rpx",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={goAuspiciousDay}
            >
              <Icon type="icon-kaigongjiri" style={{ fontSize: "40rpx" }} />
              <View style={{ marginTop: "10rpx", fontSize: "28rpx" }}>
                婚礼吉日
              </View>
            </View>
            <View
              style={{
                width: "33%",
                height: "100rpx",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={goGiftStatistics}
            >
              <Icon type="icon-jiehunlijin" style={{ fontSize: "40rpx" }} />
              <View style={{ marginTop: "10rpx", fontSize: "28rpx" }}>
                礼金统计
              </View>
            </View>
            <View
              style={{
                width: "33%",
                height: "100rpx",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={goElectronicMain}
            >
              <Icon
                type="icon-dianziqingjian-01"
                style={{ fontSize: "40rpx" }}
              />
              <View style={{ marginTop: "10rpx", fontSize: "28rpx" }}>
                电子请柬
              </View>
            </View>
          </View>
        </View>
      </View>
      <DatePickerComponent
        show={showDate}
        selectedDate={weddingDate}
        onConfirm={handleChangeWeddingDate}
        onCancle={() => setShowDate(false)}
      />
    </PageContainer>
  );
};
export default Home;
