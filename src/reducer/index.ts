/*
 * @Author: your name
 * @Date: 2021-09-07 10:20:40
 * @LastEditTime: 2021-09-07 10:24:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /myApp/src/reducer/index.ts
 */

import React from 'react'

const userInfo={}
const MyContext =React.createContext({});

// 和 redux 一样，综合根据旧 state 和 dispatch 而来的数据，计算出最新的 state
//定义reducer的改变规则
const SetUserInfo = "SetUserInfo"
function reducer(state={}, action) {
  switch (action.type) {
    case SetUserInfo:
      return { userInfo: action.payload };
    default:
      return state;
  }
}

export {
    reducer,
    userInfo,
    MyContext
}
