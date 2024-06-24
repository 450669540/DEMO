/*
 * @Author: your name
 * @Date: 2021-09-03 11:07:13
 * @LastEditTime: 2024-06-15 18:18:12
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @Description: In User Settings Edit
 * @FilePath: /myApp/src/app.ts
 */
import { useEffect, useReducer } from "react";
import Taro from "@tarojs/taro";
import "taro-ui/dist/style/index.scss";
import "./app.scss";
import { loadFontFace, updateApp } from "./app.utils";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/models/index"; // RootState
import { wxPreLogin } from "./utils/auth";
import { userFetchMember } from "./models/user/actions";
//import "@/style/font.scss";
import { useDidShow } from "@tarojs/taro";
import { getSystemParams } from "./services/common";
import { systemFetchGlobalParams } from "./models/system/actions";

function App(props) {
  useEffect(() => {
    loadFontFace();
    // 版本更新
    updateApp();

    getQuickLoginInfo();
  }, []);

  useDidShow(async () => {
    store.dispatch(systemFetchGlobalParams());
  });

  /**
   * 获取登录的信息，手动登录时再存入
   * @author luoxiaochuan <luoxiaochuan@comteck.cn>
   * @date 2023-08-02
   */
  const getQuickLoginInfo = async () => {
    try {
      await wxPreLogin();

      store.dispatch(userFetchMember());
    } finally {
      console.log("getQuickLoginInfo-1");
    }
  };

  return <Provider store={store}> {props.children}</Provider>;
}

export default App;
