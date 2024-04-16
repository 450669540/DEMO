/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-04-11 16:27:13
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-04-11 16:27:30
 * @FilePath: /DEMO/src/components/EmptyData/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import PageContainer from "@/components/PageContainer";
import { View } from "@tarojs/components";
import Icon from "../Icon";
const EmptyData = () => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "400rpx",
      }}
    >
      <Icon
        type="icon-zanwushuju"
        style={{ fontSize: "200rpx", color: "#333" }}
      ></Icon>
      <View>暂无数据~</View>
    </View>
  );
};
export default EmptyData;
