/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-03-08 10:06:35
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-03-28 10:44:17
 * @FilePath: /xmall-mini-v3-new/src/components/Calendar/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from "react";
import PageContainer from "@/components/PageContainer";
import { Text, View } from "@tarojs/components";
import "./index.less";
import dayjs from "dayjs";
import Icon from "../Icon";
import { Like } from "@taroify/icons";

interface Props {
  url: string;
  title?: string;
  styles?: React.CSSProperties;
}
const Calendar = ({ url, title, styles }: Props) => {
  const [list, setList] = useState();
  function getCurrentMonthCalendar() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // 从0开始
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();

    let calendar = [];
    let currentDate = 1;

    // 初始化日历数组，填充上月的剩余天数
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendar.push(null);
    }

    // 填充当前月的天数
    while (currentDate <= daysInMonth) {
      if (calendar.length % 7 === 0) {
        calendar.push(currentDate);
      } else {
        calendar.push(currentDate);
        currentDate++;
      }
    }

    return calendar;
  }

  useEffect(() => {
    const calendar = getCurrentMonthCalendar();
    console.log(calendar);
    setList(calendar);
  }, []);

  return (
    <View
      style={{
        backgroundImage: `url(${url})`,
        width: "94%",
        height: "1200rpx",
        backgroundSize: "cover",
        position: "relative",

        borderTopLeftRadius: "400rpx",
        borderTopRightRadius: "400rpx",
        textAlign: "center",
        margin: "24rpx",
        ...styles,
      }}
    >
      {title && (
        <View
          style={{ color: "#fff", fontSize: "60rpx", paddingTop: "200rpx" }}
        >
          三八 · 女神节快乐
        </View>
      )}
      <View
        style={{ margin: "0 24rpx", position: "absolute", bottom: 0, left: 0 }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100rpx",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#fff",
          }}
        >
          <View>
            <Text
              style={{ fontSize: "56rpx", fontWeight: "500", color: "#fff" }}
            >
              {dayjs().format("MM")}
            </Text>
            /{dayjs().format("DD")}
          </View>
          <View style={{ color: "#fff" }}>-{dayjs().format("YYYY")}-</View>
        </View>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              borderBottom: "2rpx solid #fff",
            }}
          >
            <View className="headerItem">一</View>
            <View className="headerItem">二</View>
            <View className="headerItem">三</View>
            <View className="headerItem">四</View>
            <View className="headerItem">五</View>
            <View className="headerItem">六</View>
            <View className="headerItem">日</View>
          </View>
          <View style={{ display: "flex", flexWrap: "wrap" }}>
            {list?.map((item) =>
              Number(dayjs().format("DD")) === item ? (
                <View className="headerItem">
                  <View
                    style={{
                      width: "52rpx",
                      position: "relative",
                      textAlign: "center",
                    }}
                  >
                    <Like
                      color="#cf000b"
                      size={28}
                      style={{ position: "absolute", left: 0, top: 0 }}
                    />

                    <Text
                      style={{
                        position: "absolute",
                        width: "52rpx",
                        textAlign: "center",
                        left: 0,
                        top: 0,
                      }}
                    >
                      {item ?? ""}
                    </Text>
                  </View>
                </View>
              ) : (
                <View className="headerItem">{item ?? ""} </View>
              )
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
export default Calendar;
