/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-03-14 15:34:29
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-04-10 17:35:36
 * @FilePath: /DEMO/src/components/Comment/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from "react";
import PageContainer from "@/components/PageContainer";
import {
  Input,
  Swiper,
  SwiperItem,
  Text,
  Textarea,
  View,
  Button,
} from "@tarojs/components";
import { limitNumber } from "@/utils/util";
import Icon from "../Icon";
import "./index.less";
import { ActionSheet, Backdrop, Popup } from "@taroify/core";
import { isNil } from "@/utils/lang";
import Tips from "@/utils/Tips";

interface Props {
  comments: any[];
  onAddComment: (value) => void;
}
const Comment = ({ comments, onAddComment }: Props) => {
  const [value, setValue] = useState();
  const [show, setShow] = useState<boolean>(false);
  const [danmuShow, setDanmuShow] = useState<boolean>(true);
  const [danmuListShow, setDanmuListShow] = useState<boolean>(false);

  useEffect(() => {
    setValue({ create: "", content: "" });
  }, [show]);

  return (
    <View style={{ position: "relative" }}>
      {!danmuListShow && danmuShow && (
        <View
          style={{
            position: "fixed",
            bottom: "88px",
            left: "24rpx",
            zIndex: 10000,
          }}
        >
          <View
            style={{
              width: "60vw",
            }}
          >
            <Swiper
              displayMultipleItems={comments?.length > 3 ? 3 : comments?.length}
              skipHiddenItemLayout
              vertical
              autoplay
              circular
              style={{
                height:
                  comments?.length > 3 ? "120px" : `${comments?.length * 40}px`,
              }}
            >
              {comments?.map((item) => (
                <SwiperItem style={{ height: "40px" }}>
                  <View
                    style={{
                      color: "#fff",
                      padding: "10rpx",
                      background: "#999",
                      opacity: "0.6",
                      borderRadius: "16rpx",
                    }}
                  >
                    {item?.create}:{limitNumber(item?.content, 12)}
                  </View>
                </SwiperItem>
              ))}
            </Swiper>
          </View>
        </View>
      )}
      {!danmuListShow && (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#999",
            borderRadius: "16rpx",
            opacity: 0.6,
            padding: "10rpx",
            position: "fixed",
            bottom: "50px",
            left: "24rpx",
            zIndex: 10000,
          }}
        >
          <Text
            // placeholder="请留下您的祝福..."
            // placeholderClass="placeholder-class"
            style={{ color: "#fff", width: "400rpx" }}
            // onInput={(e) => {}}
            onClick={() => {
              setShow(true);
            }}
          >
            请留下您的祝福...
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon
              type={danmuShow ? "icon-danmu" : "icon-jinzhidanmu"}
              style={{ fontSize: "48rpx", color: "#fff" }}
              onClick={() => setDanmuShow((prev) => !prev)}
            />
            <Icon
              type="icon-danmuliebiao1"
              style={{ fontSize: "36rpx", color: "#fff", marginLeft: "12rpx" }}
              onClick={() => setDanmuListShow((prev) => !prev)}
            />
          </View>
        </View>
      )}
      <ActionSheet
        open={danmuListShow}
        style={{ paddingBottom: "60rpx" }}
        onClose={() => setDanmuListShow(false)}
      >
        <ActionSheet.Header>弹幕列表</ActionSheet.Header>

        {comments?.map((comment) => (
          <ActionSheet.Action
            value="1"
            name={`${comment?.create}:${comment?.content}`}
          />
        ))}
      </ActionSheet>
      <Popup
        open={show}
        rounded
        style={{
          zIndex: 10000,
          width: "600rpx",
          height: "560rpx",
          padding: "24rpx",
          "--backdrop-z-index": 10000,
        }}
        onClose={() => {
          setShow(false);
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <View style={{ fontSize: "40rpx", marginBottom: "20rpx" }}>
            您要发的弹幕
          </View>

          <Input
            value={value?.create ?? ""}
            placeholder="请输入您的名字"
            style={{
              padding: "24rpx",
              background: "#f3f3f3",
              borderRadius: "40rpx",
              width: "80%",
              marginBottom: "20rpx",
            }}
            onInput={(e) => {
              setValue((prev) => ({ ...prev, create: e?.detail?.value }));
            }}
          />

          <Textarea
            value={value?.content ?? ""}
            placeholder="请留下您要说的话"
            showCount
            maxlength={20}
            style={{
              padding: "24rpx",
              background: "#f3f3f3",
              borderRadius: "40rpx",
              width: "80%",
              height: "200rpx",
            }}
            onInput={(e) => {
              setValue((prev) => ({ ...prev, content: e?.detail?.value }));
            }}
          />

          <Button
            style={{
              background: "#fff",
              border: "2rpx solid #333",
              color: "#333",
              width: "80%",
              height: "80rpx",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "32rpx",
              marginTop: "40rpx",
              borderRadius: "44rpx",
            }}
            onClick={() => {
              if (
                isNil(value?.create?.trim()) ||
                isNil(value?.content?.trim())
              ) {
                Tips.info("不能为空!");
                return;
              }
              onAddComment(value);
              setShow(false);
            }}
          >
            确定
          </Button>
        </View>
      </Popup>
    </View>
  );
};
export default Comment;
