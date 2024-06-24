/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-03-08 10:06:35
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-06-17 13:55:25
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
  value: string;
  title?: string;
  styles?: React.CSSProperties;
  isEdit?: boolean;
  weekType?: string;
  bottomLine?: boolean;
}
const Calendar = ({
  url,
  title,
  styles,
  value,
  isEdit,
  weekType = "Chinese",
  bottomLine = false,
}: Props) => {
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
    for (let i = 0; i < firstDayOfWeek - 1; i++) {
      calendar.push(null);
    }

    // 填充当前月的天数
    while (currentDate <= daysInMonth) {
      // if (calendar.length % 7 === 0) {
      //   calendar.push(currentDate);
      // } else {
      calendar.push(currentDate);
      currentDate++;
      // }
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
        height: url ? "1200rpx" : "auto",
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
          style={{
            color: styles?.color ?? "#fff",
            fontSize: "60rpx",
            paddingTop: "200rpx",
          }}
        >
          {title}
        </View>
      )}
      <View
        style={{
          margin: "0 24rpx",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100rpx",
            justifyContent: "space-between",
            alignItems: "center",
            color: styles?.color ?? "#fff",
            width: "260px",
            marginBottom: "10px",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: "76rpx",
                fontWeight: "500",
                color: styles?.color ?? "#fff",
              }}
            >
              {dayjs(value).format("MM")}
            </Text>
            /{dayjs(value).format("DD")}
          </View>
          <View style={{ color: styles?.color ?? "#fff" }}>
            -{dayjs(value).format("YYYY")}-
          </View>
        </View>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              borderBottom: bottomLine ? `2rpx solid ${styles?.color}` : "none",
              justifyContent: "space-between",
            }}
          >
            <View
              className="headerItem"
              style={{ color: styles?.weekColor ?? "#fff" }}
            >
              {weekType === "Chinese" ? "一" : "MON"}
            </View>
            <View
              className="headerItem"
              style={{ color: styles?.weekColor ?? "#fff" }}
            >
              {weekType === "Chinese" ? "二" : "TUE"}
            </View>
            <View
              className="headerItem"
              style={{ color: styles?.weekColor ?? "#fff" }}
            >
              {weekType === "Chinese" ? "三" : "WED"}
            </View>
            <View
              className="headerItem"
              style={{ color: styles?.weekColor ?? "#fff" }}
            >
              {weekType === "Chinese" ? "四" : "THU"}
            </View>
            <View
              className="headerItem"
              style={{ color: styles?.weekColor ?? "#fff" }}
            >
              {weekType === "Chinese" ? "五" : "FRI"}
            </View>
            <View
              className="headerItem"
              style={{ color: styles?.weekColor ?? "#fff" }}
            >
              {weekType === "Chinese" ? "六" : "SAT"}
            </View>
            <View
              className="headerItem"
              style={{ color: styles?.weekColor ?? "#fff" }}
            >
              {weekType === "Chinese" ? "日" : "SUN"}
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {list?.map((item) =>
              Number(dayjs(value).format("DD")) === item ? (
                <View className="dayItem" style={{ color: styles?.itemColor }}>
                  <View
                    style={{
                      width: "52rpx",
                      position: "relative",
                      textAlign: "center",
                    }}
                  >
                    <Like
                      color={styles?.color ?? "#cf000b"}
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
                        color: "#fff",
                      }}
                    >
                      {item ?? ""}
                    </Text>
                  </View>
                </View>
              ) : (
                <View className="dayItem" style={{ color: styles?.itemColor }}>
                  {item ?? ""}{" "}
                </View>
              )
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
export default Calendar;
