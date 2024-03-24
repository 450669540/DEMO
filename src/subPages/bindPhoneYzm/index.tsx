/*
 * @Author: your name
 * @Date: 2021-09-03 11:07:13
 * @LastEditTime: 2024-02-06 17:34:07
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @Description: In User Settings Edit
 * @FilePath: /myApp/src/pages/index/index.tsx
 */
import { useState, useRef, useEffect } from "react";
import { AtButton } from "taro-ui";
import Taro from "@tarojs/taro";
import { View, Text, Input } from "@tarojs/components";
import "./index.scss";

export default function BindPhoneYzm() {
  const [phoneNum, setPhoneNum] = useState("");
  const [status, setStatus] = useState(true); //true展示获取验证码  false展示重新获取
  const [time, setTime] = useState(60);
  const [yzm, setYzm] = useState("");
  const timeRef = useRef(time);

  useEffect(() => {
    timeRef.current = time;
  }, [time]);

  /**
   * 绑定手机号
   */
  const bindPhone = () => {
    if (!phoneNum) {
      Taro.showToast({
        title: "手机号不能为空！",
        icon: "none",
      });
      return;
    }
    if (!yzm) {
      Taro.showToast({
        title: "验证码不能为空！",
        icon: "none",
      });
      return;
    }
    //手机号放进缓存
    Taro.setStorage({ key: "phoneNum", data: phoneNum });
    Taro.reLaunch({
      url: "/pages/mine/index",
    });
  };

  /**
   * 手机号改变
   */
  const handlePhoneNumChange = (e) => {
    setPhoneNum(() => {
      return e.detail.value;
    });
  };

  /**
   * 验证码改变
   */
  const handleYzmChange = (e) => {
    setYzm(() => {
      return e.detail.value;
    });
  };

  /**
   * 获取验证码
   */
  const getYzm = () => {
    if (!phoneNum) {
      Taro.showToast({
        title: "请先输入手机号，再绑定！",
        icon: "none",
      });
      return;
    }
    if (status) {
      var interval = setInterval(() => {
        if (timeRef.current == 0) {
          interval && clearInterval(interval);
          setStatus(() => {
            return true;
          });
          setTime(() => {
            return 60;
          });
        } else {
          setTime((prevValue) => {
            return prevValue - 1;
          });
        }
      }, 1000);
      setStatus(() => {
        return false;
      });
    }
  };

  return (
    <View>
      <View className="item2">
        <View className="title">
          <Text className="itemText">手机号</Text>
        </View>
        <View className="phoneNum">
          <Input
            type="text"
            placeholder="请输入手机号码"
            placeholderStyle="font-size:small"
            value={phoneNum}
            maxlength={11}
            onInput={handlePhoneNumChange}
          />
        </View>
      </View>
      <View className="item">
        <View className="title">
          <Text className="itemText">验证码</Text>
        </View>
        <View className="yzm">
          <Input
            type="text"
            placeholder="请输入验证码"
            placeholderStyle="font-size:small"
            value={yzm}
            maxlength={6}
            onInput={handleYzmChange}
          />
        </View>
        <View className="yzmBtn" onClick={getYzm}>
          <Text className="itemText2">
            {status ? "获取验证码" : `重新获取（${time}）`}
          </Text>
        </View>
      </View>
      <AtButton className="bindBtn" circle onClick={bindPhone}>
        绑定手机号
      </AtButton>
    </View>
  );
}
