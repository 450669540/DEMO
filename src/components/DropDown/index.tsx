/*
 * @Description:
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2023-08-31 14:05:03
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-04-16 15:35:32
 */
import React, { useState } from "react";
import { View } from "@tarojs/components";
import "./index.scss";
import { ArrowDown, ArrowUp } from "@taroify/icons";

interface Props {
  /** 标题 */
  title: string;
  /** 选中值 */
  value: any;
  /** 下拉列表数据 */
  list: { label: string; value: any }[];
  /** 数据改变 */
  onChange: (value: { label: string; value: any }) => void;
  /** 是否显示 */
  isShow?: boolean;
  /** 框样式 */
  containerStyle?: React.CSSProperties;
  /** 自定义框内元素 */
  children?: JSX.Element;
}

const DropDown = ({
  title,
  value,
  list,
  onChange,
  isShow = false,
  children,
  containerStyle,
}: Props) => {
  const [show, setShow] = useState<boolean>(isShow);
  return (
    <>
      <View className="dropDownContainer">
        <View className="title" onClick={() => setShow((prev) => !prev)}>
          <View style={{ marginRight: "9rpx" }}>{title}</View>
          {show ? <ArrowUp /> : <ArrowDown />}
        </View>

        {show && (
          <View style={containerStyle} className="dropDownDialog">
            {children ??
              list?.map((item, index) => (
                <>
                  <View
                    key={item?.value}
                    style={{
                      color: value === item?.value ? "#333" : "#999",
                      fontSize: "28rpx",
                      lineHeight: "40rpx",
                      padding: "24rpx 0rpx",
                      textAlign: "center",
                    }}
                    onClick={() => {
                      setShow(false);
                      onChange(item);
                    }}
                  >
                    {item?.label}
                  </View>
                  {index !== list?.length - 1 && <View className="grayLine" />}
                </>
              ))}
          </View>
        )}
      </View>
      {show && (
        <View className="backDrop" onClick={() => setShow(false)}></View>
      )}
    </>
  );
};
export default DropDown;
