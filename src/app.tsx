/*
 * @Author: your name
 * @Date: 2021-09-03 11:07:13
 * @LastEditTime: 2021-09-07 15:21:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /myApp/src/app.ts
 */
import {useReducer } from 'react'
import 'taro-ui/dist/style/index.scss'
import './app.scss'
import {MyContext,reducer} from './reducer/index'

// 纯粹为了展示 useReducer 第三个参数
function init(initialValue) {
  return { userInfo:initialValue };
}

function App (props) {
    const [state, dispatch] = useReducer(reducer, {}, init);  
    return (
      <MyContext.Provider value={{state,dispatch}} >
        {props.children}
      </MyContext.Provider>
    )
}

export default App
