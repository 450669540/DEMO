/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-04-16 13:35:31
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-04-16 14:52:24
 * @FilePath: /DEMO/src/subPages/wediingGame/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from "react";
import PageContainer from "@/components/PageContainer";
import { Image, View } from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";

const Game = () => {
  const [ballList, setBallList] = useState([1, 2, 3, 4]);
  const [start, setStart] = useState(false);
  const [qiu, setQiu] = useState(true);
  const [ani, setAni] = useState();
  useEffect(() => {
    setTimeout(() => {
      setStart(false);
    }, 1000);

    //其他代码部分
    //time是接口请求开始到结束的时间
  }, []);

  /**
   * 点击扭蛋机
   */
  const eggPlay = () => {
    console.log("开始");
    setStart(true);
    setTimeout(() => {
      setStart(false);
      setQiu(false);

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

  return (
    <PageContainer>
      <View className="container">
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
          {!qiu && (
            <Image
              animation={ani}
              className="ball ball_end"
              src="https://acceleratepic.miniso.com/miniso/ball4.png"
              mode="widthFix"
            />
          )}
        </View>
      </View>
    </PageContainer>
  );
};
export default Game;
