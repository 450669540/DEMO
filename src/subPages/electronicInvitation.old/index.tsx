/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-03-03 15:08:21
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-03-04 17:18:26
 * @FilePath: /DEMO/src/pages/electronicInvitation/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useRef, useState } from "react";
import Taro from "@tarojs/taro";
import PageContainer from "@/components/PageContainer";
import { Image, ScrollView, Text, View } from "@tarojs/components";
import { Like, Phone } from "@taroify/icons";
import "./index.scss";
const ElectronicInvitation = () => {
  const [startAnimation, setStartAnimation] = useState("running");
  const [needInit, setNeedInit] = useState(true);
  const [scrollTop, setScrollTop] = useState(0);
  const countRef = useRef(0);
  const [flag, setFlag] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      Taro.pageScrollTo({
        selector: "#container",
        scrollTop: 2000,
        duration: 10000,
        complete: () => {
          setFlag(false);
        },
      });
    }, 1000);
  }, []);

  const handleClick = () => {
    console.log("gjhggh");
    const query = Taro.createSelectorQuery();
    query.select("#container").boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function (res) {
      console.log(res);
      if (res?.[0]?.top !== 0) {
        if (flag) {
          setFlag(false);
        } else {
          setFlag(true);
          Taro.pageScrollTo({
            selector: "#container",
            scrollTop: 2000,
            duration: 10000,
            complete: () => {
              setFlag(false);
            },
          });
        }
      } else {
        if (countRef.current === 1) {
          setFlag(true);
          Taro.pageScrollTo({
            selector: "#container",
            scrollTop: 2000,
            duration: 10000,
            complete: () => {
              setFlag(false);
            },
          });
        } else {
          countRef.current = countRef.current + 1;
        }
      }
    });
  };

  return (
    <PageContainer isShowSafeArea={false}>
      <View
        className="container"
        id="container"
        onTouchStart={() => {
          console.log("onTouchStart");
          if (flag) {
            setTimeout(() => {
              const query = Taro.createSelectorQuery();
              query.select("#container").boundingClientRect();
              query.selectViewport().scrollOffset();
              query.exec(function (res) {
                Taro.pageScrollTo({
                  selector: "#container",
                  scrollTop: Math.abs(res?.[0]?.top),
                  duration: 0,
                });
              });
            }, 100);
            setFlag(false);
          }
        }}
        onClick={handleClick}
      >
        <View style={{ position: "relative" }}>
          <Image
            src="http://192.168.3.90:5010/example1_1.jpg"
            style={{ width: "100vw", height: "100vh" }}
          />
          <Image
            src="http://image109.360doc.com/DownloadImg/2018/08/1318/141247485_16_20180813064528834.gif"
            style={{
              width: "100vw",
              height: "100vh",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
          <View
            style={{
              position: "absolute",
              top: "30rpx",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              color: "#FFE8B6",
              width: "100%",
            }}
          >
            <View style={{ fontSize: "28rpx" }}>我们结婚了</View>
            <View style={{ fontSize: "80rpx" }}>囍</View>
            <View style={{ fontSize: "48rpx", fontStyle: "italic" }}>
              OUR WEDDING
            </View>
            {/* <View
              style={{
                fontSize: "14rpx",
                width: "300rpx",
                textAlign: "center",
              }}
            >
              Precious things are very few in this world. That is the reason
              there is just one you.
            </View> */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                fontSize: "32rpx",
                marginTop: "60rpx",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <Text style={{ color: "#fff" }}>张三好</Text>
                <Text style={{ color: "#FFE8B6", fontSize: "18rpx" }}>
                  GROOM
                </Text>
              </View>
              <Text style={{ color: "#FFE8B6", margin: "0 20rpx" }}>-</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Text style={{ color: "#fff" }}>李四咦</Text>
                <Text style={{ color: "#FFE8B6", fontSize: "18rpx" }}>
                  BRIDE
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20rpx 28rpx 100rpx 28rpx",
              color: "#C4C4C4",
            }}
          >
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text
                style={{
                  color: "#cf000b",
                  fontSize: "48rpx",
                  fontFamily: "Adorable",
                }}
              >
                Like you
              </Text>
              <Text style={{ fontSize: "16rpx" }}>We got merried</Text>
            </View>
            <Text
              style={{
                fontSize: "16rpx",
                width: "260rpx",
                textAlign: "right",
              }}
            >
              I would rather share one lifetime with you than face all the ages
              of this world alone.
            </Text>
          </View>
          <Image
            src="http://192.168.3.90:5010/example1_2.jpg"
            style={{ width: "100vw", height: "100vw" }}
          />
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20rpx 28rpx 60rpx 28rpx",
              color: "#C4C4C4",
            }}
          >
            <Text
              style={{
                fontSize: "16rpx",
                width: "180rpx",
                textAlign: "left",
              }}
            >
              I would rather share one lifetime with you than face all the ages
              of this world alone.
            </Text>

            <Text style={{ color: "#cf000b", fontSize: "24rpx" }}>
              Our wedding
            </Text>
            <Text
              style={{
                fontSize: "16rpx",
                width: "180rpx",
                textAlign: "right",
              }}
            >
              I would rather share one lifetime with you than face all the ages
              of this world alone.
            </Text>
          </View>
          <Image
            src="http://192.168.3.90:5010/example1_3.jpg"
            style={{ width: "86vw", margin: "0 7vw" }}
            mode="widthFix"
          />
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "60rpx 0",
            }}
          >
            <Text
              style={{
                color: "#cf000b",
                fontSize: "80rpx",
                fontFamily: "Adorable",
              }}
            >
              MY LOVE
            </Text>
            <Text style={{ fontSize: "26rpx", marginTop: "10rpx" }}>
              - 我 十 分 爱 你 -
            </Text>
            <Like
              style={{
                color: "#A11E18",
                marginTop: "80rpx",
                marginBottom: "40rpx",
              }}
            />

            <View style={{ position: "relative" }}>
              <Image
                src="http://192.168.3.90:5010/example1_4.jpg"
                style={{ width: "90vw" }}
                mode="widthFix"
              />
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    bottom: "24rpx",
                    borderRadius: "16rpx",
                    background: "#A11E18",
                    color: "#fff",
                    padding: "14rpx 20rpx",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Phone size={18} />
                  <Text style={{ fontSize: "28rpx", marginLeft: "16rpx" }}>
                    联系新人
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </PageContainer>
  );
};
export default ElectronicInvitation;
