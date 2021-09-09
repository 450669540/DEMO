/*
 * @Author: your name
 * @Date: 2021-09-03 11:07:13
 * @LastEditTime: 2021-09-08 11:50:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /myApp/src/pages/index/index.tsx
 */
import { useContext } from 'react'
import { View, Text } from '@tarojs/components'
import { AtAvatar, AtButton } from "taro-ui"
import Taro from '@tarojs/taro'
import avatarPng from './../../images/avatar.png'
import './index.scss'
import { MyContext } from './../../reducer/index'

export default function WxAuthorizationPhone() {
  const { state }: any = useContext(MyContext)
  const { userInfo } = state

  /**
   * 跳转手机验证码绑定页面
   */
  const toBindPhoneYzm = () => {
    Taro.navigateTo({
      url: '/pages/bindPhoneYzm/index'
    })
  }

  const getPhoneNumber = e => {
    console.log(e)
  }

  return (
    <View className='container'>
      <AtAvatar className='avatarView' circle image={userInfo.avatarUrl ?? avatarPng}></AtAvatar>
      <View className='tipView'>
        <Text className='tipText1'>{`${userInfo.nickName ?? ''}申请获得以下权限：`}</Text>
        <Text className='tipText2'>获得您的手机号</Text>
      </View>
      <AtButton className='bindBtn' openType='getPhoneNumber' onGetPhoneNumber={getPhoneNumber}>微信手机号一键绑定</AtButton>
      <View className='phoneYzmBind' onClick={toBindPhoneYzm}>
        <Text className='tipText2'>使用手机验证码绑定</Text>
      </View>
    </View>
  )
}


