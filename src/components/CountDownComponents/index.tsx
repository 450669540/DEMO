/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-03-13 11:24:31
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-06-16 11:59:54
 * @FilePath: /xmall-mini-v3-new/src/components/CountDown/index.tsx
 * @Description: 倒计时组件
 */
import React, { useMemo } from "react";
import { Countdown } from "@taroify/core";
import { View } from "@tarojs/components";
import "./index.less";
import dayjs from "dayjs";

interface Props {
  date: string;
  styles?: React.CSSProperties;
  isEdit?: boolean;
  childStyles?: React.CSSProperties;
}

const CountDownComponent = ({ date, styles, isEdit, childStyles }: Props) => {
  const value = useMemo(() => {
    return dayjs(date).diff(dayjs(), "milliseconds");
  }, []);

  return (
    <Countdown value={value} style={{ ...styles }}>
      {(current) => (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "#cf000b",
              color: "#fff",
              width: "100rpx",
              height: "120rpx",
              margin: "0 20rpx",
              borderRadius: "16rpx",
              ...childStyles,
            }}
          >
            <View style={{ fontSize: "40rpx", fontWeight: 500 }}>
              {current.days}
            </View>
            <View>天</View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "#cf000b",
              color: "#fff",
              width: "100rpx",
              height: "120rpx",
              margin: "0 20rpx",
              borderRadius: "16rpx",
              ...childStyles,
            }}
          >
            <View style={{ fontSize: "40rpx", fontWeight: 500 }}>
              {current.hours}
            </View>
            <View>时</View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "#cf000b",
              color: "#fff",
              width: "100rpx",
              height: "120rpx",
              margin: "0 20rpx",
              borderRadius: "16rpx",
              ...childStyles,
            }}
          >
            <View style={{ fontSize: "40rpx", fontWeight: 500 }}>
              {current.minutes}
            </View>
            <View>分</View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "#cf000b",
              color: "#fff",
              width: "100rpx",
              height: "120rpx",
              margin: "0 20rpx",
              borderRadius: "16rpx",
              ...childStyles,
            }}
          >
            <View style={{ fontSize: "40rpx", fontWeight: 500 }}>
              {current.seconds}
            </View>
            <View>秒</View>
          </View>
        </View>
      )}
    </Countdown>
  );
};
export default CountDownComponent;
