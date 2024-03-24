/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-02-20 16:20:06
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-02-20 16:20:18
 * @FilePath: /DEMO/src/components/ConfigProvider/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ConfigProvider as TaroifyConfigProvider } from "@taroify/core";
import type { ConfigProviderThemeVars } from "@taroify/core";
import React, { useMemo } from "react";
// import { useGlobal } from '@/hooks/bizHooks/useGlobal';
import { EnumStorageKey } from "@/types/local.storage";
import Taro from "@tarojs/taro";
import { DEFAULT_THEME } from "@/const";

interface Props {
  children: React.ReactNode;
}

const ConfigProvider: React.FC<Props> = (props) => {
  const theme = Taro.getStorageSync(EnumStorageKey.店铺风格);
  // 'var(--primary-color)'
  const primaryColor = useMemo(() => {
    return theme?.primaryColor ?? DEFAULT_THEME.primaryColor;
  }, [theme]);

  const themeVars: ConfigProviderThemeVars = {
    primaryColor: primaryColor,
    // primaryColor
    buttonPrimaryBackgroundColor: primaryColor,
    tabsActiveColor: primaryColor,
    tabActiveColor: primaryColor,
    "taroify-tabs__line--active": primaryColor,
  };

  return (
    <TaroifyConfigProvider theme={themeVars}>
      {props.children}
    </TaroifyConfigProvider>
  );
};

export default ConfigProvider;
