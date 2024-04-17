/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-04-16 13:35:31
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-04-17 17:03:26
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

  /** 新写法 */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  /** 结束 */

  /**
   * 点击扭蛋机
   */
  const eggPlay = () => {
    if (start) {
      Tips.info("正在进行中");
      return;
    }
    console.log("开始");
    if (gameInfo?.list?.filter((item) => item?.trim() !== "")?.length === 0) {
      Tips.info("请先创建游戏清单");
      return;
    }
    if (ballList?.length === 0) {
      Tips.info("已抽完,可以点重置继续抽");
      return;
    }

    setStart(true);
    setTimeout(() => {
      setStart(false);
      setQiu(false);
      if (ballList?.length > gameInfo?.number) {
        const gameResultArr = getRandomArrayElements(
          ballList,
          gameInfo?.number
        );
        let newBallList = [...ballList];
        for (let i = 0; i < gameResultArr?.length; i++) {
          const index = ballList?.findIndex(
            (ball) => ball === gameResultArr[i]
          );
          newBallList.splice(index, 1);
        }
        console.log("游戏结果", gameResultArr, newBallList);
        setGameResult(gameResultArr);
        setBallList(newBallList);
      } else {
        setGameResult(ballList);
        setBallList([]);
      }

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
    if (tempGameInfo?.list?.filter((item) => item?.trim() === "")?.length > 0) {
      Tips.info("请输入游戏名");
      return;
    }
    let gameNames = [];
    let errorFlag = false;
    for (let i = 0; i < tempGameInfo?.list?.length; i++) {
      if (gameNames.includes(tempGameInfo?.list?.[i])) {
        errorFlag = true;
      } else {
        gameNames.push(tempGameInfo?.list?.[i]);
      }
    }
    if (errorFlag) {
      Tips.info("游戏名不能重复");
      return;
    }
    if (
      tempGameInfo?.list?.filter((item) => item?.trim() !== "")?.length <
      tempGameInfo?.number
    ) {
      Tips.info("游戏数不能小于抽取数");
      return;
    }
    setGameInfo({ ...tempGameInfo });
    setGameShow(false);
    setBallList(tempGameInfo?.list);
  };
  console.log("start", start);

  return (
    // <PageContainer>
    //   <View className="container">
    //     <View style={{ width: "100%", textAlign: "center" }}>
    //       <View
    //         style={{
    //           fontFamily: "Adorable",
    //           fontSize: "80rpx",
    //           marginTop: "80rpx",
    //         }}
    //       >
    //         接亲大作战
    //       </View>
    //       <View
    //         onClick={() => {
    //           setShow(true);
    //         }}
    //       >
    //         规则说明
    //       </View>
    //     </View>
    //     <View className="egg">
    //       <View
    //         style={{
    //           background: "#fff",
    //           width: "460rpx",
    //           height: "418rpx",
    //           borderRadius: "50%",
    //           position: "absolute",
    //           top: "52rpx",
    //           left: "146rpx",
    //           opacity: 0.6,
    //           zIndex: -1,
    //         }}
    //       ></View>
    //       <Image
    //         className="egg_ji"
    //         src="https://xiaomianma.oss-cn-hangzhou.aliyuncs.com/src%3Dhttp___safe-img.xhscdn.com_bw1_dc568006-d9fc-4027-8d8e-4dcc39c25f0d_imageView2_2_w_1080_format_jpg%26refer%3Dhttp___safe-img.xhscdn.png"
    //         mode="widthFix"
    //       ></Image>
    //       <Image
    //         className={`play ${start ? "go" : ""}`}
    //         onClick={eggPlay}
    //         src="https://xiaomianma.oss-cn-hangzhou.aliyuncs.com/u%3D1762211795%2C2637587186%26fm%3D253%26fmt%3Dauto%26app%3D138%26f%3DGIF.gif"
    //         mode="widthFix"
    //       />

    //       {ballList?.map((ball, i) => (
    //         <Image
    //           className={`ball ball_${i + 1} ${start ? `weiyi_${i + 1}` : ""}`}
    //           src={`https://acceleratepic.miniso.com/miniso/ball${i + 1}.png`}
    //           mode="widthFix"
    //         />
    //       ))}
    //       {/* {!qiu && (
    //         <Image
    //           animation={ani}
    //           className="ball ball_end"
    //           src="https://acceleratepic.miniso.com/miniso/ball4.png"
    //           mode="widthFix"
    //         />
    //       )} */}
    //     </View>
    //     <View onClick={() => setGameShow(true)}>创建游戏</View>
    //     <Popup
    //       rounded
    //       open={show}
    //       onClose={() => setShow(false)}
    //       style={{ width: "600rpx", height: "300rpx" }}
    //     >
    //       <View style={{ width: `calc(100% - 48rpx)`, padding: "24rpx" }}>
    //         <View
    //           style={{
    //             fontSize: "40rpx",
    //             color: "#333",
    //             textAlign: "center",
    //             fontWeight: 500,
    //           }}
    //         >
    //           规则说明
    //         </View>
    //         <View style={{ marginTop: "20rpx", color: "#333" }}>
    //           游戏前,请先点击下方
    //           <Text style={{ color: "#cf000b" }}>创建游戏</Text>按钮,
    //           创建游戏数据,然后点击扭蛋机上的开关按钮,开始你们的婚礼小游戏吧
    //         </View>
    //       </View>
    //     </Popup>
    //     <Popup
    //       rounded
    //       open={gameShow}
    //       onClose={() => {
    //         setGameShow(false);
    //       }}
    //       style={{ width: "600rpx", height: "800rpx" }}
    //     >
    //       <View
    //         style={{
    //           width: `calc(100% - 48rpx)`,
    //           padding: "24rpx",
    //         }}
    //       >
    //         <View
    //           style={{
    //             fontSize: "40rpx",
    //             color: "#333",
    //             textAlign: "center",
    //             fontWeight: 500,
    //             width: "100%",
    //           }}
    //         >
    //           婚礼游戏
    //         </View>
    //         <View style={{ display: "flex", flexDirection: "column" }}>
    //           <View
    //             style={{
    //               display: "flex",

    //               alignItems: "center",
    //               height: "120rpx",
    //               width: "100%",
    //               borderBottom: "2rpx solid #f3f3f3",
    //             }}
    //           >
    //             <View style={{ width: "140rpx", marginRight: "20rpx" }}>
    //               抽取数:
    //             </View>
    //             <View style={{ display: "flex", flexDirection: "row" }}>
    //               <DropDown
    //                 title={tempGameInfo?.number}
    //                 list={[
    //                   { label: "1", value: 1 },
    //                   { label: "2", value: 2 },
    //                   { label: "3", value: 3 },
    //                 ]}
    //                 value={tempGameInfo?.number}
    //                 onChange={handleGamePerson}
    //               />
    //             </View>
    //           </View>
    //           {tempGameInfo?.list?.map((item, i) => (
    //             <View
    //               style={{
    //                 display: "flex",

    //                 alignItems: "center",
    //                 height: "120rpx",
    //                 width: "100%",
    //                 borderBottom: "2rpx solid #f3f3f3",
    //               }}
    //             >
    //               <View style={{ width: "140rpx", marginRight: "20rpx" }}>
    //                 游戏{i + 1}:
    //               </View>
    //               <View>
    //                 <Input
    //                   value={item}
    //                   placeholder="请输入游戏名"
    //                   maxlength={10}
    //                   onInput={(e) => {
    //                     const newList = [...tempGameInfo?.list];
    //                     newList[i] = e?.detail?.value;
    //                     setTempGameInfo((prev) => ({ ...prev, list: newList }));
    //                   }}
    //                 />
    //               </View>
    //               {i === tempGameInfo?.list?.length - 1 &&
    //                 tempGameInfo?.list?.length < 4 && (
    //                   <View
    //                     onClick={() => {
    //                       const newList = [...tempGameInfo?.list];
    //                       newList.push("");
    //                       setTempGameInfo((prev) => ({
    //                         ...prev,
    //                         list: newList,
    //                       }));
    //                     }}
    //                   >
    //                     <Icon
    //                       type="icon-tianjia-yin"
    //                       style={{ color: "#333", fontSize: "40rpx" }}
    //                     />
    //                   </View>
    //                 )}
    //             </View>
    //           ))}
    //           <View
    //             style={{
    //               display: "flex",
    //               justifyContent: "center",
    //               position: "absolute",
    //               bottom: 20,
    //               width: `calc(100% - 48rpx)`,
    //             }}
    //           >
    //             <Button className="saveBtn" onClick={handleSaveGame}>
    //               保存
    //             </Button>
    //           </View>
    //         </View>
    //       </View>
    //     </Popup>
    //     <Popup
    //       open={gameResult?.length > 0}
    //       className="gameResultWrapper"
    //       style={{ width: "83%", height: "400rpx", padding: "24rpx" }}
    //       rounded
    //       onClose={() => setGameResult([])}
    //     >
    //       <View
    //         style={{
    //           width: "100%",
    //           height: "100%",
    //           display: "flex",
    //           flexDirection: "column",
    //           alignItems: "center",
    //         }}
    //       >
    //         <View>抽中游戏</View>
    //         <View
    //           style={{
    //             display: "flex",
    //             flexDirection: "row",
    //             justifyContent: "center",
    //             alignItems: "center",
    //             width: "100%",
    //             marginTop: "20rpx",
    //           }}
    //         >
    //           {gameResult?.map((item) => (
    //             <View
    //               style={{
    //                 width: "46%",
    //                 height: "200rpx",
    //                 background: "#E5D5BC",
    //                 borderRadius: "16rpx",
    //                 color: "#fff",
    //                 display: "flex",
    //                 justifyContent: "center",
    //                 alignItems: "center",
    //                 fontSize: "40rpx",
    //               }}
    //               className="gameResultView"
    //             >
    //               {item}
    //             </View>
    //           ))}
    //         </View>
    //       </View>
    //     </Popup>
    //   </View>
    // </PageContainer>
    <PageContainer>
      <View className="container" style={{ position: "relative" }}>
        {loading ? (
          <View
            style={{
              background: "#12045F",
              width: "100vw",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Image
              style={{ width: "100%", position: "relative" }}
              src="https://xiaomianma.oss-cn-hangzhou.aliyuncs.com/0102b35b57f640a801206a35c9a33f.jpeg"
            >
              <View
                style={{
                  color: "#fff",
                  position: "absolute",
                  bottom: "100rpx",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                加载中...
              </View>
            </Image>
          </View>
        ) : (
          <View>
            <View
              style={{
                background: "#140460",
                color: "#FEEA69",
                width: "100%",
                height: "400rpx",
                textAlign: "center",
                position: "relative",
              }}
            >
              <Icon
                type="icon-qiqiu2"
                style={{
                  fontSize: "100rpx",
                  position: "absolute",
                  top: "50rpx",
                  left: "0rpx",
                }}
              />

              <Icon
                type="icon-qingzhu11"
                style={{
                  fontSize: "100rpx",
                  position: "absolute",
                  top: "40rpx",
                  right: "24rpx",
                }}
              />
              <Icon
                type="icon-qingzhu4"
                style={{
                  fontSize: "100rpx",
                  position: "absolute",
                  top: "240rpx",
                  left: "0rpx",
                }}
              />
              <Icon
                type="icon-qingzhu3"
                style={{
                  fontSize: "100rpx",
                  position: "absolute",
                  top: "240rpx",
                  right: "0rpx",
                }}
              />
              <Image
                style={{ width: "80%", marginTop: "100rpx" }}
                mode="widthFix"
                src="https://xiaomianma.oss-cn-hangzhou.aliyuncs.com/171333767086490.png"
              />
              <View
                style={{
                  color: "#FFCC02",
                  position: "absolute",
                  top: "280rpx",
                  left: "42%",
                }}
                onClick={() => setShow(true)}
              >
                规则说明
              </View>
            </View>
            <View style={{ position: "relative" }}>
              {start && (
                <Image
                  style={{ width: "100%", position: "absolute", top: 0 }}
                  mode="widthFix"
                  src={
                    "https://xiaomianma.oss-cn-hangzhou.aliyuncs.com/0113865b57f79aa801215c8f469d67.jpeg"
                  }
                ></Image>
              )}
              <Image
                style={{ width: "100%" }}
                mode="widthFix"
                src={
                  "https://xiaomianma.oss-cn-hangzhou.aliyuncs.com/WechatIMG324.jpg"
                }
              ></Image>
              <View
                style={{
                  width: "100rpx",
                  position: "absolute",
                  bottom: "190rpx",
                  left: "45%",
                  color: "#FEEA69",
                  fontWeight: 500,
                }}
                onClick={eggPlay}
              >
                开始
              </View>
            </View>

            <View
              style={{
                background: "linear-gradient(to top, #FFBD02, #FEDA66)",
                color: "#FEEA69",
                width: "100%",
                height: "360rpx",
                textAlign: "center",
                position: "absolute",
                top: "1086rpx",
              }}
            >
              <View
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  margin: "0 100rpx",
                  marginTop: "100rpx",
                }}
              >
                <View
                  style={{
                    width: "220rpx",
                    height: "80rpx",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  onClick={() => {
                    setGameShow(true);
                  }}
                >
                  <View
                    style={{
                      background: "#CE3C0B",
                      width: "220rpx",
                      height: "80rpx",
                      borderRadius: "40rpx",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                      top: "14rpx",
                    }}
                  ></View>
                  <View
                    style={{
                      background: "#FDED74",
                      width: "200rpx",
                      height: "80rpx",
                      borderRadius: "40rpx",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                    }}
                  >
                    <View
                      style={{
                        color: "#DF6000",
                        fontSize: "36rpx",
                        fontWeight: 500,
                      }}
                    >
                      创建游戏
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "220rpx",
                    height: "80rpx",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      background: "#CE3C0B",
                      width: "220rpx",
                      height: "80rpx",
                      borderRadius: "40rpx",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                      top: "14rpx",
                    }}
                  ></View>
                  <View
                    style={{
                      background: "#FDED74",
                      width: "200rpx",
                      height: "80rpx",
                      borderRadius: "40rpx",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                    }}
                  >
                    <View
                      style={{
                        color: "#DF6000",
                        fontSize: "36rpx",
                        fontWeight: 500,
                      }}
                      onClick={() => {
                        setBallList(gameInfo?.list);
                        Tips.info("重置成功");
                      }}
                    >
                      重置游戏
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                position: "absolute",
                top: "410rpx",
                left: "180rpx",
                color: "#FDEA66",
                fontSize: "28rpx",
              }}
            >
              快设置数据,让我动起来吧
            </View>
          </View>
        )}
        <Popup
          rounded
          open={show}
          onClose={() => setShow(false)}
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
            <ScrollView
              scrollY
              style={{ height: "600rpx" }}
              showScrollbar={false}
            >
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
                    抽取数:
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
                    <View style={{ width: "140rpx", marginRight: "20rpx" }}>
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
                          setTempGameInfo((prev) => ({
                            ...prev,
                            list: newList,
                          }));
                        }}
                      />
                    </View>
                    {i === tempGameInfo?.list?.length - 1 ? (
                      tempGameInfo?.list?.length < 10 && (
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
                            type="icon-tianjia1"
                            style={{ color: "#333", fontSize: "36rpx" }}
                          />
                        </View>
                      )
                    ) : (
                      <View
                        onClick={() => {
                          const newList = [...tempGameInfo?.list];
                          newList.splice(i, 1);

                          setTempGameInfo((prev) => ({
                            ...prev,
                            list: newList,
                          }));
                        }}
                      >
                        <Icon
                          type="icon-yichu"
                          style={{ color: "#cf000b", fontSize: "40rpx" }}
                        />
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </ScrollView>
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
        </Popup>
        <Popup
          open={gameResult?.length > 0}
          className="gameResultWrapper"
          style={{ width: "83%", height: "600rpx", padding: "24rpx" }}
          rounded
          onClose={() => setGameResult([])}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <View>抽中游戏</View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginTop: "20rpx",
                flexWrap: "wrap",
              }}
            >
              {gameResult?.map((item) => (
                <View
                  style={{
                    width: "46%",
                    height: "200rpx",
                    background: "#E5D5BC",
                    borderRadius: "16rpx",
                    color: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "40rpx",
                    marginBottom: "20rpx",
                  }}
                  className="gameResultView"
                >
                  {item}
                </View>
              ))}
            </View>
          </View>
        </Popup>
      </View>
    </PageContainer>
  );
};
export default WediingGame;
