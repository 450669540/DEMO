/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-02-07 14:07:21
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-04-14 10:31:38
 * @FilePath: /DEMO/src/pages/seatArrangement/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from "react";
import PageContainer from "@/components/PageContainer";
import { Image, ScrollView, View } from "@tarojs/components";

import "./index.scss";
import Taro from "@tarojs/taro";
import { viewSeatRouter } from "../../router/index";

const SeatArrangement = () => {
  const [list, setList] = useState([]);

  const images = [
    {
      url: "https://beautifulwedding.oss-cn-hangzhou.aliyuncs.com/seat_example1.jpg",
      title: "星空璀璨",
      width: 1080,
      height: 1520,
      usedCount: 2,
    },
    {
      url: "https://beautifulwedding.oss-cn-hangzhou.aliyuncs.com/seat_example2.jpg",
      title: "桃花朵朵",
      width: 1080,
      height: 1440,
      usedCount: 2,
    },
    {
      url: "https://beautifulwedding.oss-cn-hangzhou.aliyuncs.com/seat_example3.jpg",
      title: "中式典雅",
      width: 646,
      height: 860,
      usedCount: 0,
    },
    {
      url: "https://beautifulwedding.oss-cn-hangzhou.aliyuncs.com/seat_example4.jpg",
      title: "紫罗兰",
      width: 1080,
      height: 2000,
      usedCount: 0,
    },
    {
      url: "https://beautifulwedding.oss-cn-hangzhou.aliyuncs.com/seat_example5.jpg",
      title: "喜气洋洋",
      width: 1080,
      height: 1402,
      usedCount: 0,
    },
  ];

  useEffect(() => {
    //图片瀑布流
    const column = 2;
    const arr = new Array(column).fill([]);
    const heightArr = new Array(column).fill(0);

    for (let i = 0; i < images?.length; i++) {
      const minIndex = heightArr.indexOf(Math.min(...heightArr));
      let minArr = [...arr[minIndex]];
      minArr.push(images?.[i]);
      heightArr[minIndex] = heightArr[minIndex] + +images?.[i]?.height;
      arr[minIndex] = minArr;
    }
    setList(arr);
    console.log("arr", arr);
  }, []);

  const goView = () => {
    Taro.navigateTo({ url: viewSeatRouter() });
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
        婚礼模版
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
        {/* <View
          style={{
            background: "#FFF4F6",
            color: "#FF405F",
            padding: "10rpx 16rpx",
            marginRight: "20rpx",
          }}
        >
          精选
        </View> */}
      </View>

      <ScrollView scrollY style={{ height: "92vh" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            background: "#f8f8f8",
            padding: "0rpx 24rpx 160rpx 24rpx",
          }}
        >
          {list?.map((item, index) => (
            <View key={index}>
              {item?.map((image, imageIndex) => (
                <View
                  style={{
                    borderRadius: "16rpx",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "20rpx",
                  }}
                  onClick={goView}
                >
                  <Image
                    key={imageIndex}
                    src={image?.url}
                    mode="widthFix"
                    style={{ width: "45vw" }}
                  />
                  <View
                    style={{
                      fontSize: "28rpx",
                      color: "#333",
                      height: "60rpx",
                      display: "flex",
                      alignItems: "center",
                      background: "#fff",
                      padding: "12rpx 24rpx",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>{image?.title}</View>
                    {image?.usedCount > 0 && (
                      <View style={{ fontSize: "24rpx" }}>
                        {image?.usedCount}次使用
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
      {/* <View
        style={{
          position: "fixed",
          bottom: "60rpx",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            fontSize: "32rpx",
            color: "#fff",
            height: "80rpx",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#cf000b",
            borderRadius: "16rpx",
            padding: "0 80rpx",
            width: "fit-content",
          }}
        >
          去安排座位
        </View>
      </View> */}
    </View>
  );
};
export default SeatArrangement;
