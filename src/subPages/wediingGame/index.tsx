/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-04-16 13:35:31
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-04-16 16:41:09
 * @FilePath: /DEMO/src/subPages/wediingGame/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from "react";
import PageContainer from "@/components/PageContainer";
import { Image, ScrollView, Text, View } from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";
import Tips from "@/utils/Tips";
import { Input, Popup } from "@taroify/core";
import DropDown from "@/components/DropDown";
import Icon from "@/components/Icon";
import Button from "@taroify/core/button/button";
import { getRandomArrayElements } from "@/utils/util";

const WediingGame = () => {
  const [ballList, setBallList] = useState([]);
  const [start, setStart] = useState(false);
  const [qiu, setQiu] = useState(true);
  const [ani, setAni] = useState();
  const [tempGameInfo, setTempGameInfo] = useState({ number: 1, list: [""] });
  const [show, setShow] = useState(false);
  const [gameInfo, setGameInfo] = useState({ number: 1, list: [""] });
  const [gameShow, setGameShow] = useState(false);
  const [gameResult, setGameResult] = useState([]);

  /**
   * 点击扭蛋机
   */
  const eggPlay = () => {
    console.log("开始");
    if (gameInfo?.list?.length === 0) {
      Tips.info("请先创建游戏清单");
      return;
    }

    setStart(true);
    setTimeout(() => {
      setStart(false);
      setQiu(false);
      const gameResultArr = getRandomArrayElements(ballList, 2);
      const gameResultNameArr = gameResultArr?.map(
        (item, index) => gameInfo?.list?.[item - 1]
      );
      console.log("游戏结果", gameResult);
      setGameResult(gameResultNameArr);
      //球落下动画
      var animation = Taro.createAnimation({
        duration: 1500,
        timingFunction: "ease",
      });
      animation.opacity(1).step();
      setAni(animation.export());
    }, 3000);

    setQiu(true);
    //将动画返回到开始位置
    var animation = Taro.createAnimation({
      duration: 1500,
      timingFunction: "ease",
    });
    animation.opacity(0).step();
    setAni(animation.export());
  };

  const handleGamePerson = (value) => {
    setTempGameInfo((prev) => ({ ...prev, number: value?.value }));
  };

  /** 保存游戏 */
  const handleSaveGame = () => {
    if (
      tempGameInfo?.list?.filter((item) => item?.trim() !== "")?.length === 0
    ) {
      Tips.info("请输入游戏名");
      return;
    }
    setGameInfo({ ...tempGameInfo });
    setGameShow(false);
    setBallList(
      new Array(tempGameInfo?.list?.length).fill("")?.map((item, index) => {
        return index + 1;
      })
    );
  };

  return (
    <PageContainer>
      <View className="container">
        <View style={{ width: "100%", textAlign: "center" }}>
          <View
            style={{
              fontFamily: "Adorable",
              fontSize: "80rpx",
              marginTop: "80rpx",
            }}
          >
            大作战
          </View>
          <View
            onClick={() => {
              setShow(true);
            }}
          >
            规则说明
          </View>
        </View>
        <View className="egg">
          <View
            style={{
              background: "#fff",
              width: "460rpx",
              height: "418rpx",
              borderRadius: "50%",
              position: "absolute",
              top: "52rpx",
              left: "146rpx",
              opacity: 0.6,
              zIndex: -1,
            }}
          ></View>
          <Image
            className="egg_ji"
            src="https://xiaomianma.oss-cn-hangzhou.aliyuncs.com/src%3Dhttp___safe-img.xhscdn.com_bw1_dc568006-d9fc-4027-8d8e-4dcc39c25f0d_imageView2_2_w_1080_format_jpg%26refer%3Dhttp___safe-img.xhscdn.png"
            mode="widthFix"
          ></Image>
          <Image
            className={`play ${start ? "go" : ""}`}
            onClick={eggPlay}
            src="https://xiaomianma.oss-cn-hangzhou.aliyuncs.com/u%3D1762211795%2C2637587186%26fm%3D253%26fmt%3Dauto%26app%3D138%26f%3DGIF.gif"
            mode="widthFix"
          />

          {ballList?.map((ball, i) => (
            <Image
              className={`ball ball_${i + 1} ${start ? `weiyi_${i + 1}` : ""}`}
              src={`https://acceleratepic.miniso.com/miniso/ball${i + 1}.png`}
              mode="widthFix"
            />
          ))}
          {/* {!qiu && (
            <Image
              animation={ani}
              className="ball ball_end"
              src="https://acceleratepic.miniso.com/miniso/ball4.png"
              mode="widthFix"
            />
          )} */}
        </View>
        <View onClick={() => setGameShow(true)}>创建游戏</View>
        <Popup
          rounded
          open={show}
          style={{ width: "600rpx", height: "300rpx" }}
        >
          <View style={{ width: `calc(100% - 48rpx)`, padding: "24rpx" }}>
            <View
              style={{
                fontSize: "40rpx",
                color: "#333",
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              规则说明
            </View>
            <View style={{ marginTop: "20rpx", color: "#333" }}>
              游戏前,请先点击下方
              <Text style={{ color: "#cf000b" }}>创建游戏</Text>按钮,
              创建游戏数据,然后点击扭蛋机上的开关按钮,开始你们的婚礼小游戏吧
            </View>
          </View>
        </Popup>
        <Popup
          rounded
          open={gameShow}
          onClose={() => {
            setGameShow(false);
          }}
          style={{ width: "600rpx", height: "800rpx" }}
        >
          <View
            style={{
              width: `calc(100% - 48rpx)`,
              padding: "24rpx",
            }}
          >
            <View
              style={{
                fontSize: "40rpx",
                color: "#333",
                textAlign: "center",
                fontWeight: 500,
                width: "100%",
              }}
            >
              婚礼游戏
            </View>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <View
                style={{
                  display: "flex",

                  alignItems: "center",
                  height: "120rpx",
                  width: "100%",
                  borderBottom: "2rpx solid #f3f3f3",
                }}
              >
                <View style={{ width: "140rpx", marginRight: "20rpx" }}>
                  随机人数:
                </View>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <DropDown
                    title={tempGameInfo?.number}
                    list={[
                      { label: "1", value: 1 },
                      { label: "2", value: 2 },
                      { label: "3", value: 3 },
                    ]}
                    value={tempGameInfo?.number}
                    onChange={handleGamePerson}
                  />
                </View>
              </View>
              {tempGameInfo?.list?.map((item, i) => (
                <View
                  style={{
                    display: "flex",

                    alignItems: "center",
                    height: "120rpx",
                    width: "100%",
                    borderBottom: "2rpx solid #f3f3f3",
                  }}
                >
                  <View style={{ width: "120rpx", marginRight: "20rpx" }}>
                    游戏{i + 1}:
                  </View>
                  <View>
                    <Input
                      value={item}
                      placeholder="请输入游戏名"
                      maxlength={10}
                      onInput={(e) => {
                        const newList = [...tempGameInfo?.list];
                        newList[i] = e?.detail?.value;
                        setTempGameInfo((prev) => ({ ...prev, list: newList }));
                      }}
                    />
                  </View>
                  {i === tempGameInfo?.list?.length - 1 &&
                    tempGameInfo?.list?.length < 4 && (
                      <View
                        onClick={() => {
                          const newList = [...tempGameInfo?.list];
                          newList.push("");
                          setTempGameInfo((prev) => ({
                            ...prev,
                            list: newList,
                          }));
                        }}
                      >
                        <Icon
                          type="icon-tianjia-yin"
                          style={{ color: "#333", fontSize: "40rpx" }}
                        />
                      </View>
                    )}
                </View>
              ))}
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  position: "absolute",
                  bottom: 20,
                  width: `calc(100% - 48rpx)`,
                }}
              >
                <Button className="saveBtn" onClick={handleSaveGame}>
                  保存
                </Button>
              </View>
            </View>
          </View>
        </Popup>
        <Popup open={gameResult?.length > 0} onClose={() => setGameResult([])}>
          <View>
            {gameResult?.map((item) => (
              <View>{item}</View>
            ))}
          </View>
        </Popup>
      </View>
    </PageContainer>
  );
};
export default WediingGame;
