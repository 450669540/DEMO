/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-03-03 15:08:21
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-06-14 17:12:18
 * @FilePath: /DEMO/src/pages/electronicInvitation/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useRef, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import PageContainer from "@/components/PageContainer";
import {
  Image,
  ScrollView,
  Text,
  View,
  PageContainer as Dialog,
} from "@tarojs/components";
import { Like, Phone } from "@taroify/icons";
import "./index.scss";
import FlippingPages from "@/components/FlippingPages";
import LongImage from "@/components/LongImage";
import {
  commentList,
  getElectronicInvitationById,
  saveComment,
} from "@/services/electron";
import arrify from "@/utils/arrify";
import { RootState } from "@/models";
import { useSelector } from "react-redux";
import Icon from "@/components/Icon";
import { Input, Popup } from "@taroify/core";
import MusicLibrary from "@/components/MusicLibrary";
import { AtIcon } from "taro-ui";
import "./index.scss";
import AddressMap from "@/components/AddressMap";
import { electronicInvitationEditRouter } from "@/router";
const Edit = () => {
  const systemParams = useSelector<RootState>(
    (state) => state.system.globalParams
  );

  const [template, setTemplate] = useState();
  const [comments, setComments] = useState();
  const [showComponent, setShowComponent] = useState(false);
  const [showType, setShowType] = useState();
  const { params } = useRouter();
  const [isPaused, setIsPaused] = useState(false);
  const audioContext = useRef();

  const getDetail = async () => {
    const res = await getElectronicInvitationById(params?.template_id);
    if (res?.data) {
      Taro.setNavigationBarTitle({ title: res?.data?.name });
      setTemplate({
        ...res?.data,
      });
      console.log("systemParams", systemParams);
      if (systemParams?.comment_flag) {
        getCommentList(res?.data?._id);
      }
    }
  };

  const getCommentList = async (template_id) => {
    const res = await commentList(template_id);
    if (res?.data) {
      setComments(arrify(res?.data));
    }
  };
  useEffect(() => {
    getDetail();
  }, []);

  // useEffect(() => {
  //   if (!audioContext.current) {
  //     audioContext.current = Taro.createInnerAudioContext();
  //     /** 循环播放 */
  //     audioContext.current.loop = true;
  //     /** 是否遵循系统静音开关,不遵循，静音模式下也可以发出声音 */
  //     audioContext.current.obeyMuteSwitch = false;
  //   }
  //   if (!template?.audio_path) {
  //     audioContext.current.stop();
  //   } else {
  //     audioContext.current.src = template?.audio_path;

  //     audioContext.current.play();
  //   }
  // }, [template?.audio_path]);

  const handleAddComment = async (value) => {
    const res = await saveComment({ ...value, template_id: template?._id });
    if (res?.success) {
      getCommentList(template?._id);
    }
  };

  const handleChangeMusicPlay = () => {
    setIsPaused((prev) => !prev);
    if (!isPaused) {
      audioContext.current.pause();
    } else {
      audioContext.current.play();
    }
  };
  console.log("showType", showType);
  return (
    <PageContainer>
      <View style={{ position: "relative" }}>
        {/* <View
          style={{
            background: "#999",
            borderRadius: "50%",
            width: "100rpx",
            height: "100rpx",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            right: "24rpx",
            top: "24rpx",
            zIndex: 1,
          }}
          className={!isPaused && "musicIcon"}
          onClick={handleChangeMusicPlay}
        >
          <Icon
            // type="icon-yinle1"
            type={isPaused ? "icon-yinlezanting01" : "icon-yinle1"}
            style={{ fontSize: "50rpx", color: "#fff" }}
          />
        </View> */}
        {template?.type === "flip" ? (
          <FlippingPages
            comments={comments}
            onAddComment={handleAddComment}
            template={template}
            systemParams={systemParams}
            isEdit
          />
        ) : template?.type === "longImage" ? (
          <LongImage
            template={template}
            comments={comments}
            systemParams={systemParams}
            onAddComment={handleAddComment}
          />
        ) : (
          <></>
        )}
        <View
          style={{
            position: "fixed",
            bottom: "54rpx",
            width: "100%",
            // paddingBottom: "60rpx",
            // height: "80rpx",
            // background: "#fff",
            // boxShadow: "0px -4px 9px 0px rgba(0,0,0,0.1)",
            // paddingTop: "20rpx",
          }}
        >
          <View
            style={{
              margin: "0 24rpx",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",

              alignItems: "center",
            }}
          >
            <View
              style={{
                background: "#fff",
                boxShadow: "0px -4px 9px 0px rgba(0,0,0,0.1)",
                padding: "20rpx 32rpx",
                borderRadius: "16rpx",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Icon
                type="icon-tupian_huaban"
                style={{ fontSize: "48rpx", color: "#333" }}
              />
              <View>图片</View>
            </View>
            <View
              style={{
                background: "#fff",
                boxShadow: "0px -4px 9px 0px rgba(0,0,0,0.1)",
                padding: "20rpx 32rpx",
                borderRadius: "16rpx",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Icon
                type="icon-wenzi1"
                style={{ fontSize: "48rpx", color: "#333" }}
              />
              <View>文字</View>
            </View>
            <View
              style={{
                background: "#fff",
                boxShadow: "0px -4px 9px 0px rgba(0,0,0,0.1)",
                padding: "20rpx 32rpx",
                borderRadius: "16rpx",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
              onClick={() => {
                setShowComponent(true);
              }}
            >
              <Icon
                type="icon-zujian"
                style={{ fontSize: "48rpx", color: "#333" }}
              />
              <View>组件</View>
            </View>
            <View
              style={{
                background: "#fff",
                boxShadow: "0px -4px 9px 0px rgba(0,0,0,0.1)",
                padding: "20rpx 32rpx",
                borderRadius: "16rpx",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
              onClick={() => {
                console.log("音乐");
                setShowType("music");
              }}
            >
              <Icon
                type="icon-yinle3"
                style={{ fontSize: "48rpx", color: "#333" }}
              />
              <View>音乐</View>
            </View>
            <View
              style={{
                background: "#fff",
                boxShadow: "0px -4px 9px 0px rgba(0,0,0,0.1)",
                padding: "20rpx 32rpx",
                borderRadius: "16rpx",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Icon
                type="icon-shezhi2"
                style={{ fontSize: "48rpx", color: "#333" }}
              />
              <View>设置</View>
            </View>
          </View>
        </View>
        <Popup
          open={showComponent}
          rounded
          placement="bottom"
          style={{ paddingBottom: "60rpx" }}
          onClose={() => {
            setShowComponent(false);
          }}
        >
          <View
            style={{
              fontSize: "40rpx",
              color: "#333",
              margin: "24rpx",
              textAlign: "center",
            }}
          >
            组件功能
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "24rpx",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "#F4F4F4",
                justifyContent: "center",
                width: `calc(86vw / 4)`,
                height: `calc(86vw / 4)`,
                borderRadius: "16rpx",
              }}
            >
              <Icon
                type="icon-daojishi"
                style={{ fontSize: "48rpx", color: "#333" }}
              />
              <View>倒计时</View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "#F4F4F4",
                justifyContent: "center",

                width: `calc(86vw / 4)`,
                height: `calc(86vw / 4)`,
                borderRadius: "16rpx",
              }}
            >
              <Icon
                type="icon-rili"
                style={{ fontSize: "48rpx", color: "#333" }}
              />
              <View>日历</View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "#F4F4F4",
                justifyContent: "center",

                width: `calc(86vw / 4)`,
                height: `calc(86vw / 4)`,
                borderRadius: "16rpx",
              }}
            >
              <Icon
                type="icon-ditu"
                style={{ fontSize: "48rpx", color: "#333" }}
              />
              <View>地图</View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "#F4F4F4",
                justifyContent: "center",

                width: `calc(86vw / 4)`,
                height: `calc(86vw / 4)`,
                borderRadius: "16rpx",
              }}
            >
              <Icon
                type="icon-yijianbohao"
                style={{ fontSize: "48rpx", color: "#333" }}
              />
              <View>一键拨号</View>
            </View>
          </View>
        </Popup>
      </View>
      <MusicLibrary
        show={showType === "music"}
        onClose={() => {
          setShowType();
        }}
        onChangeMusic={(url, id) => console.log("改变音乐", url, id)}
      />
    </PageContainer>
  );
};
export default Edit;
