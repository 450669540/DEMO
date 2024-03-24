/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-02-20 16:19:40
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-02-20 16:20:54
 * @FilePath: /DEMO/src/components/PageContainer/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { FC } from "react";
import { SafeArea, Toast } from "@taroify/core";
import { StyledProps } from "@/types/basic";

import ConfigProvider from "@@/ConfigProvider";

interface Props {
  isShowSafeArea?: boolean;
  children?: React.ReactNode;
  style?: StyledProps;
}

/**
 * 页面容器组件，包含 configProvider 和 tip
 * @author luoxiaochuan <luoxiaochuan@comteck.cn>
 * @date 2023-08-02
 */

const PageContainer: FC<Props> = (props) => {
  const { isShowSafeArea = true, style = {} } = props;
  return (
    <ConfigProvider>
      <Toast id="toast"></Toast>
      {props.children}
      {/* 安全区域 */}
      {isShowSafeArea && (
        <>
          <SafeArea position="bottom"></SafeArea>
        </>
      )}
    </ConfigProvider>
  );
};

export default PageContainer;
