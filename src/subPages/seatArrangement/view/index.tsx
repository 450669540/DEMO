/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-02-07 16:37:59
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-04-19 12:02:31
 * @FilePath: /DEMO/src/pages/seatArrangement/view/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  Canvas,
  Icon,
  Image,
  ScrollView,
  Snapshot,
  View,
} from "@tarojs/components";
import React, { useEffect, useState } from "react";

import Taro from "@tarojs/taro";
import { AtIcon } from "taro-ui";
import { SeatArrangementVo } from "src/types/seatArrangement";
import "./index.scss";
import { Divider } from "@taroify/core";
import { saveAndUpdateSeat } from "@/services/seat";
import { tableListRouter } from "@/router";

const SeatView = () => {
  const [info, setInfo] = useState<SeatArrangementVo>();

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: "星空璀璨" });
    setInfo({
      title: "婚礼座位安排",
      thankWord: " 感谢您的到来",
      list: [
        {
          id: 1,
          no: 1,
          guestList: [{ name: "张三" }, { name: "李四" }, { name: "王五" }],
        },
        {
          id: 2,
          no: 2,
          guestList: [
            { name: "张三全家" },
            { name: "李四" },
            { name: "王五夫妇" },
            { name: "刘的" },
            { name: "翠花" },
          ],
        },
        {
          id: 3,
          no: 3,
          guestList: [{ name: "张三" }, { name: "李四" }, { name: "王五" }],
        },
        {
          id: 4,
          no: 4,
          guestList: [{ name: "张三" }, { name: "李四" }, { name: "王五" }],
        },
        {
          id: 5,
          no: 5,
          guestList: [{ name: "张三" }, { name: "李四" }, { name: "王五" }],
        },
        {
          id: 6,
          no: 6,
          guestList: [{ name: "张三" }, { name: "李四" }, { name: "王五" }],
        },
        {
          id: 7,
          no: 7,
          guestList: [{ name: "张三" }, { name: "李四" }, { name: "王五" }],
        },
        {
          id: 8,
          no: 8,
          guestList: [{ name: "张三" }, { name: "李四" }, { name: "王五" }],
        },
        {
          id: 9,
          no: 9,
          guestList: [{ name: "张三" }, { name: "李四" }, { name: "王五" }],
        },
        {
          id: 10,
          no: 0,
          guestList: [{ name: "张三" }, { name: "李四" }, { name: "王五" }],
        },
      ],
    });
    setTimeout(() => {
      toBottom();
    }, 1000);
  }, []);

  const toBottom = () => {
    Taro.createSelectorQuery()
      .select("#scrollView")
      .boundingClientRect(function (rect) {
        console.log("rectheight", rect.height);
        /* 将页面移动到最底部（用xxx的height定位） */
        Taro.pageScrollTo({
          scrollTop: rect.height,
        });
      })
      .exec();
  };

  /** 去制作 */
  const handleMark = async () => {
    const res = await saveAndUpdateSeat({
      template_id: "1",
      template_name: "星空璀璨",
    });
    if (res?.success) {
      Taro.navigateTo({ url: tableListRouter(res?.data?._id) });
    }
  };

  return (
    <View className="container">
      {/* <Canvas
        id="myCanvas"
        type="2d"
        style={{ width: "100%", height: "100vh" }}
      > */}
      <ScrollView id="scrollView" scrollY style={{ height: "89vh" }}>
        {/* <Image src={SeatExample1} style={{ width: "100%" }} mode="widthFix" /> */}
        <View style={{ position: "relative" }}>
          <Image
            src="https://xiaomianma.oss-cn-hangzhou.aliyuncs.com/ele4.png"
            style={{
              width: "115%",
              position: "absolute",
              top: "-116rpx",
              right: "-110rpx",
            }}
            mode="widthFix"
          />
          <View
            style={{
              background: "#06254D",
              width: "100vw",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                borderTopLeftRadius: "50%",
                borderTopRightRadius: "50%",
                width: "89%",
                height: "63%",
                background: "#124E8F",
                marginTop: "130rpx",
                position: "relative",
              }}
            >
              <Image
                src="https://xiaomianma.oss-cn-hangzhou.aliyuncs.com/ele5.png"
                style={{
                  width: "200rpx",
                  position: "absolute",
                  top: "6rpx",
                  left: "230rpx",
                }}
                mode="widthFix"
              />
              <Image
                src="https://xiaomianma.oss-cn-hangzhou.aliyuncs.com/ele2.png"
                style={{
                  width: "320rpx",
                  position: "absolute",
                  top: "-140rpx",
                  left: "-58rpx",
                }}
                mode="widthFix"
              />
              <Image
                src="https://xiaomianma.oss-cn-hangzhou.aliyuncs.com/ele1.png"
                style={{
                  width: "320rpx",
                  position: "absolute",
                  bottom: "-240rpx",
                  right: "-54rpx",
                }}
                mode="widthFix"
              />
              <View
                style={{
                  fontSize: "40rpx",
                  color: "#fff",
                  textAlign: "center",
                  marginTop: "150rpx",
                }}
              >
                {info?.title}
              </View>
            </View>
            <View
              style={{
                width: "89%",
                height: "60rpx",
                background: "#124E8F",
                marginTop: "20rpx",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
              }}
            >
              {info?.thankWord}
            </View>
          </View>
          <Image
            src="https://xiaomianma.oss-cn-hangzhou.aliyuncs.com/ele3.png"
            style={{
              position: "absolute",
              width: "100%",
              bottom: "34rpx",
              left: 0,
            }}
            mode="widthFix"
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "0 24rpx",
            //   alignItems: "center",
          }}
        >
          <Divider>
            <AtIcon value="star-2" size={10} color="#fff" />
            <AtIcon value="star-2" size={20} color="#fff" />
            <View
              style={{
                margin: "0 12rpx",
                fontSize: "40rpx",
                color: "#fff",
                textAlign: "center",
              }}
            >
              宾客安排
            </View>
            <AtIcon value="star-2" size={20} color="#fff" />
            <AtIcon value="star-2" size={10} color="#fff" />
          </Divider>
          <View style={{ display: "flex", flexWrap: "wrap" }}>
            {info?.list?.map((item, index) => (
              <View
                key={item?.id}
                style={{
                  marginBottom: "60rpx",
                  display: "flex",
                  flexDirection: "row",
                  width: "50%",
                }}
              >
                <View
                  style={{
                    color: "#124E8F",
                    fontSize: "60rpx",
                    fontStyle: "italic",
                    fontWeight: 500,
                  }}
                >
                  {item?.no}
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "44rpx",
                  }}
                >
                  {item?.guestList?.map((guest, guestIndex) => (
                    <View
                      key={guestIndex}
                      style={{ color: "#7fa5ce", fontStyle: "italic" }}
                    >
                      {guest?.name}
                    </View>
                  ))}
                </View>

                {/* <View
              style={{
                width: "89vw",
                height: "89vw",
                background: "#124E8F",
                borderRadius: "50%",
              }}
            ></View> */}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      {/* </Canvas> */}
      <View
        style={{
          position: "fixed",
          bottom: "0rpx",
          width: "100%",
          paddingBottom: "60rpx",
          height: "80rpx",
          background: "#fff",
          boxShadow: "0px -4px 9px 0px rgba(0,0,0,0.05)",
          paddingTop: "20rpx",
        }}
      >
        <View
          style={{
            margin: "0 24rpx",
            display: "flex",
            justifyContent: "space-between",

            alignItems: "center",
          }}
        >
          <AtIcon value="star" size="30" color="#f3d4a4"></AtIcon>
          <View
            style={{
              fontSize: "32rpx",
              color: "#fff",
              height: "80rpx",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#f3d4a4",
              borderRadius: "16rpx",
              padding: "0 80rpx",
              width: "400rpx",
            }}
            onClick={handleMark}
          >
            去制作
          </View>
        </View>
      </View>
    </View>
  );
};
export default SeatView;
