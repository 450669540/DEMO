/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-06-14 10:35:24
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-06-21 14:11:02
 * @FilePath: /DEMO/src/components/AddressMap/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import { Map, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import Tips from "@/utils/Tips";

interface Props {
  latitude: number;
  longitude: number;
  address: string;
  hotelName: string;
  isEdit?: boolean;
  styles?: React.CSSProperties;
  firstLine?: string;
  secondLine?: string;
  firstLineStyles?: React.CSSProperties;
  secondLineStyles?: React.CSSProperties;

  onChangeAddressInfo: (info) => void;
}
const AddressMap = ({
  address,
  hotelName,
  latitude = 39.908115,
  longitude = 116.397261,
  isEdit = false,
  styles,
  firstLine,
  secondLine,
  firstLineStyles,
  secondLineStyles,
  onChangeAddressInfo,
}: Props) => {
  /** 打开地图 */
  const handleOpenMap = (e) => {
    e.stopPropagation();
    if (isEdit) {
      Taro.chooseLocation({
        latitude,
        longitude,
      }).then((res) => {
        if (!res.address) {
          Tips.info("请选中一个地址");
          return;
        }
        console.log(res);
        onChangeAddressInfo(res);
      });
    } else {
      Taro.openLocation({
        name: hotelName,
        address: address,
        longitude,
        latitude,
      });
    }
  };

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        margin: "40rpx 0rpx",
        flexDirection: "column",
        ...styles,
      }}
    >
      <View
        style={{
          color: "#AA866A",
          fontSize: "44rpx",
          fontFamily: "FZS3K--GBK1-0",
          marginBottom: "10px",
          ...firstLineStyles,
        }}
      >
        {firstLine}
      </View>

      <View
        style={{
          color: "#AA866A",
          fontSize: "30rpx",
          fontFamily: "FZS3K--GBK1-0",
          marginBottom: "30px",
          ...secondLineStyles,
        }}
      >
        {secondLine}
      </View>

      <Map
        scale={18}
        style={{ width: "240px", height: "160px" }}
        latitude={latitude}
        longitude={longitude}
        enableScroll={false}
        enableZoom={false}
        onClick={handleOpenMap}
        markers={[
          {
            iconPath: "../../images/marker.png",

            id: 0,
            latitude,
            longitude,
            width: 22,
            height: 32,
            title: "",
            customCallout: {
              display: "ALWAYS",
              anchorY: "10",
            },
          },
        ]}
        onError={(error) => console.log(error)}
      />
    </View>
  );
};
export default AddressMap;
