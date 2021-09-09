/*
 * @Author: your name
 * @Date: 2021-09-03 11:07:13
 * @LastEditTime: 2021-09-08 16:36:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /myApp/src/pages/index/index.tsx
 */
import { useContext, useEffect, useState,useMemo } from 'react'
import { AtAvatar, AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import avatarPng from './../../images/avatar.png'
import rightArrowPng from './../../images/rightArrow.png'
import adressManage from './../../images/sudokuAdressManage.png'
import myShop from './../../images/sudokuMyShop.png'
import groupBooking from './../../images/sudokuGroupBooking.png'
import acountSetting from './../../images/sudokuAcountSetting.png'
import { MyContext, } from './../../reducer/index'


export default function Mine() {

  const { state, dispatch }: any = useContext(MyContext)
  const { userInfo } = state

  const [phoneNum, setPhoneNum] = useState('')
  
  useEffect(() => {
    const getPhoneStorage = async () => {
      try {
        var result = await Taro.getStorage({ key: 'phoneNum' })
        if (result && result.data) {
          setPhoneNum(() => {
            return result.data
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
    if (Object.keys(userInfo).length > 0) {
      getPhoneStorage();
    }
  }, [userInfo])

  const toUserInfoPage = () => {
    Taro.navigateTo({
      url: `/pages/userInfo/index?phoneNum=${phoneNum}`
    })
  }

  const wxLogin = () => {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    Taro.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        dispatch({ type: 'SetUserInfo', payload: res.userInfo })
      }
    })
  }

  return (
    <View>
      <View>
        {Object.keys(userInfo).length > 0 && !phoneNum ?
          <View className='tipView'>
            <Text className='tipText'>绑定手机号，同步全渠道订单/权益/资产</Text>
          </View> : null}
        <View className='avatarWrap'>
          <AtAvatar circle image={userInfo.avatarUrl ?? avatarPng}></AtAvatar>
          {Object.keys(userInfo).length === 0 ? <AtButton className='loginView' onClick={wxLogin}>
            <Text className='loginText'>立即登录</Text>
            <Image className='rightArrow' src={rightArrowPng}></Image>
          </AtButton> :
            <View className='loginView2' onClick={toUserInfoPage}>
              <Text className='loginText'>{userInfo.nickName ?? ''}</Text>
              {phoneNum ? <Text className='loginText3'>{phoneNum}</Text> : <Text className='loginText2'>未绑定手机号</Text>}
            </View>}
        </View>
        <View className='userInfo'>
          <View className='userInfoView'>
            <View className='infoText1'>380.00</View>
            <View className='infoText2'>余额</View>
          </View>
          <View className='rightLine'></View>
          <View className='userInfoView'>
            <View className='infoText1'>3282</View>
            <View className='infoText2'>积分</View>
          </View>
          <View className='rightLine'></View>
          <View className='userInfoView'>
            <View className='infoText1'>29</View>
            <View className='infoText2'>优惠券</View>
          </View>
        </View>
        <View className='grayLine'></View>
      </View>
      <View className='otherOperatingContent'>
        <View className='otherOperatingTitle' >
          <Text className='otherOperatingText'>其他操作</Text>
        </View>
        <View className='otherOperatingBtn'>
          <View className='otherOperatingItem'>
            <Image className='btnImage' src={adressManage}></Image>
            <View className='infoText2'>地址管理</View>
          </View>
          <View className='otherOperatingItem'>
            <Image className='btnImage' src={myShop}></Image>
            <View className='infoText2'>我的门店</View>
          </View>
          <View className='otherOperatingItem'>
            <Image className='btnImage' src={groupBooking}></Image>
            <View className='infoText2'>拼团</View>
          </View>
          <View className='otherOperatingItem'>
            <Image className='btnImage' src={acountSetting}></Image>
            <View className='infoText2'>账户设置</View>
          </View>
        </View>
      </View>
    </View>
  )
}
