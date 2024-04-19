/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-04-18 11:33:15
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-04-18 18:00:01
 * @FilePath: /DEMO/src/subPages/auspiciousDay/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useMemo, useState } from "react";
import Taro from "@tarojs/taro";
import PageContainer from "@/components/PageContainer";
import { Lunar } from "lunar-javascript";
import "./index.scss";
import dayjs from "dayjs";
import { View } from "@tarojs/components";
import { Navbar } from "@taroify/core";
import Luckycalendar from "@/components/Luckycalendar";

const AuspiciousDay = () => {
  const [luckyDay, setLuckyDay] = useState();
  const [currentMonth, setCurrentMonth] = useState<string>();
  const [dayYiJi, setDayYiji] = useState([]);
  const [currentSelectedDay, setCurrentSelectedDay] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );
  useEffect(() => {
    setCurrentMonth(dayjs().format("YYYY-MM-DD"));
  }, []);

  const searchLuckyDays = () => {
    // 获取当前月的第一天
    const firstDayOfMonth = dayjs(currentMonth).startOf("month").date();
    // 获取当前月的最后一天
    const lastDayOfMonth = dayjs(currentMonth).endOf("month").date();

    // 获取当前月的所有天
    const marryDay = [];
    const dayInfo = [];
    console.log("firstDayOfMonth", firstDayOfMonth, lastDayOfMonth);
    for (let i = firstDayOfMonth; i <= lastDayOfMonth; i++) {
      console.log("day", i);
      const date =
        dayjs(currentMonth).year() +
        "-" +
        (dayjs(currentMonth)?.month() + 1 < 10
          ? `0${dayjs(currentMonth)?.month() + 1}`
          : dayjs(currentMonth)?.month() + 1) +
        "-" +
        (i < 10 ? `0${i}` : i);

      var d = Lunar.fromDate(dayjs(date).toDate());
      // 宜
      const yi = d.getDayYi();
      // 忌
      const ji = d.getDayJi();
      dayInfo.push({
        date,
        yi,
        ji,
        lunar: d.getMonthInChinese() + "月" + d.getDayInChinese(),
        week: "周" + d.getWeekInChinese(),
      });
      if (yi.includes("嫁娶")) {
        marryDay.push(date);
      }
    }
    setLuckyDay(marryDay);
    setDayYiji(dayInfo);
  };

  useEffect(() => {
    console.log("================================currentMonth", currentMonth);
    if (currentMonth) {
      searchLuckyDays();
    }
  }, [currentMonth]);

  const seletcedDayInfo = useMemo(() => {
    return dayYiJi?.find((day) => day?.date === currentSelectedDay);
  }, [dayYiJi, currentSelectedDay]);

  return (
    <PageContainer isShowSafeArea>
      <Navbar
        style={{
          //paddingTop: statusBarHeight,
          color: "#fff",
          fontSize: "20px",
          background: "transparent",
          "--navbar-icon-font-size": "20px",
          // "--navbar-title-font-weight": "bold",
          "--navbar-title-color": "#fff",
        }}
        safeArea="top"
        fixed
        placeholder={false}
        bordered={false}
      >
        <Navbar.NavLeft
          style={{ "--navbar-icon-color": "#fff" }}
          onClick={() => {
            Taro.navigateBack();
          }}
        />
        <Navbar.Title>结婚吉日</Navbar.Title>
      </Navbar>
      <View
        style={{
          paddingTop: "200rpx",
          background: "#ecb55d",
        }}
      >
        <View style={{ background: "#fff" }}>
          <Luckycalendar
            view="month"
            marks={[
              {
                value: dayjs().format("YYYY-MM-DD"),
                color: "red",
                markSize: "9px",
              },
            ]}
            headCellStyle={{ color: "#333" }}
            bodyStyle={{ background: "#fff" }}
            extraInfo={luckyDay?.map((item) => ({
              value: item,
              text: "吉",
              color: "red",
              fontSize: "20rpx",
            }))}
            mode="lunar"
            selectedDateColor="#ecb55d"
            onDayClick={(item) => setCurrentSelectedDay(item?.value)}
            onDayLongPress={(item) => console.log(item)}
            onCurrentViewChange={(item) => setCurrentMonth(item)}
          />
        </View>
      </View>
      {seletcedDayInfo && (
        <View
          style={{
            margin: "24rpx",
            borderRadius: "16rpx",
            background: "#fff",
            padding: "24rpx",
          }}
        >
          {/* <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          > */}
          <View
            style={{
              textAlign: "center",
              fontSize: "40rpx",
              color: "#333",
              fontWeight: 500,
            }}
          >
            {currentSelectedDay} {seletcedDayInfo?.lunar}{" "}
            {seletcedDayInfo?.week}
          </View>
          {/* </View> */}
          <View
            style={{
              display: "flex",

              flexDirection: "column",
              marginTop: "20rpx",
              // alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "20rpx",
              }}
            >
              <View
                style={{
                  borderRadius: "50%",
                  background: "#F83144",
                  color: "#fff",
                  width: "50rpx",
                  height: "50rpx",
                  display: "flex",
                  flexShrink: 0,

                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                宜
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  flexWrap: "wrap",
                  width: "96%",
                  color: "#999",
                  fontSize: "28rpx",
                }}
              >
                {seletcedDayInfo?.yi?.map((item) => (
                  <View
                    style={{
                      margin: "0 20rpx",
                      color: item === "嫁娶" ? "#F83144" : "#999",
                    }}
                  >
                    {item}
                  </View>
                ))}
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View
                style={{
                  borderRadius: "50%",
                  background: "#999",
                  color: "#fff",
                  width: "50rpx",
                  height: "50rpx",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                忌
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  flexWrap: "wrap",
                  width: "96%",
                  color: "#999",
                  fontSize: "28rpx",
                }}
              >
                {seletcedDayInfo?.ji?.map((item) => (
                  <View style={{ margin: "0 20rpx" }}>{item}</View>
                ))}
              </View>
            </View>
          </View>
        </View>
      )}
    </PageContainer>
  );
};
export default AuspiciousDay;
