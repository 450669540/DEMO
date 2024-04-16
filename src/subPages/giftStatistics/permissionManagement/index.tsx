/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-04-11 16:31:55
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-04-16 10:15:18
 * @FilePath: /DEMO/src/subPages/giftStatistics/giftBook/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import PageContainer from "@/components/PageContainer";
import { EnumGiftBookType } from "@/router";
import { Image, Input, Text, Textarea, View } from "@tarojs/components";
import Button from "@taroify/core/button/button";
import "./index.scss";
import { Popup } from "@taroify/core";
import Icon from "@/components/Icon";
import {
  fetchUpdateGiftBookAuthorized,
  getBookDetail,
} from "@/services/giftStatistics";
import { getUserInfoByIds, getUserInfoByUserNo } from "@/services/user";
import arrify from "@/utils/arrify";
import { defaultAvatar } from "@/const";
import Tips from "@/utils/Tips";
const PermissionManagement = () => {
  const { params } = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const [memebers, setMemebers] = useState([]);
  const [keyword, setKeyword] = useState();
  const [user, setUser] = useState({});
  const [giftBook, setGiftBook] = useState();
  const [authorizedIds, setAuthorizedIds] = useState([]);
  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    if (!!params?.id) {
      const res = await getBookDetail(params?.id);
      if (res?.success) {
        console.log("详情", res?.data);
        setGiftBook(res?.data);
        setAuthorizedIds(
          !!res?.data?.authorized_ids
            ? res?.data?.authorized_ids.split(",")
            : []
        );
        const result = await getUserInfoByIds({
          ids: res?.data?.authorized_ids,
        });
        if (result.success) {
          setMemebers(arrify(result.data));
        }
      }
    }
  };

  const handleSearch = async () => {
    const res = await getUserInfoByUserNo({ user_no: keyword });
    if (res?.success) {
      if (res?.data?._id === giftBook?.user_id) {
        Tips.info("礼金簿创建者不用添加");
        return;
      }
      if (authorizedIds.includes(res?.data?._id)) {
        Tips.info("已经添加过");
        return;
      }
      setUser(res?.data);
    } else {
    }
  };

  const handleAddBook = async () => {
    let newAuthorizedIds = [...authorizedIds];
    // const index = newAuthorizedIds?.findIndex((item) => item === userId);
    // if (index !== -1) {
    //   Tips.info("已经添加过");
    //   return;
    // }
    newAuthorizedIds.push(user?._id);
    console.log("newAuthorizedIds", newAuthorizedIds);
    const res = await fetchUpdateGiftBookAuthorized({
      id: params?.id,
      authorized_ids: newAuthorizedIds?.join(","),
    });
    if (res?.success) {
      Tips.info("添加成功");
      setShow(false);
      setUser({});
      setKeyword("");
      getDetail();
    } else {
    }
  };

  const handleDeleteMember = async (userId) => {
    let newAuthorizedIds = [...authorizedIds];
    const index = newAuthorizedIds?.findIndex((item) => item === userId);
    if (index !== -1) {
      newAuthorizedIds.splice(index, 1);
      console.log("newAuthorizedIds", newAuthorizedIds);
      const res = await fetchUpdateGiftBookAuthorized({
        id: params?.id,
        authorized_ids: newAuthorizedIds?.join(","),
      });
      if (res?.success) {
        Tips.info("移除成功");

        getDetail();
      } else {
      }
    }
  };

  return (
    <PageContainer>
      <View className="container">
        <View style={{ margin: "24rpx" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon
              type="icon-kefu"
              style={{ color: "#333", fontSize: "70rpx" }}
            />
            <View
              style={{
                fontSize: "40rpx",
                color: "#333",
                fontWeight: 500,
                fontFamily: "HYXiaoBoZheZhiTiJ",
              }}
            >
              成员
            </View>
          </View>
          <View
            style={{
              margin: "24rpx 0",
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          >
            {memebers?.map((memeber) => (
              <View
                style={{
                  width: `calc((100vw - 48rpx - (20rpx * 4)) / 5)`,
                  marginRight: "20rpx",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "20rpx",
                  position: "relative",
                }}
              >
                <Icon
                  type="icon-yichu"
                  style={{
                    fontSize: "40rpx",
                    color: "#999",
                    position: "absolute",
                    right: -6,
                    top: -6,
                  }}
                  onClick={() => handleDeleteMember(memeber?._id)}
                />
                <Image
                  mode="widthFix"
                  style={{
                    width: "100%",
                    height: `calc((100vw - 48rpx - (20rpx * 4)) / 5)`,

                    background: "red",
                    borderRadius: "50%",
                  }}
                  src={memeber?.avatar ?? defaultAvatar}
                />
                <View>{memeber?.nick_name ?? "匿名"}</View>
              </View>
            ))}
            <View
              style={{
                width: `calc((100vw - 48rpx - (20rpx * 4)) / 5)`,
                marginRight: "20rpx",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "20rpx",
              }}
              onClick={() => setShow(true)}
            >
              <Icon
                type="icon-tianjia1"
                style={{
                  fontSize: "116rpx",
                  color: "#333",
                }}
              />
              <View style={{ opacity: 0 }}>张三</View>
            </View>
          </View>
        </View>
      </View>
      <Popup
        open={show}
        rounded
        style={{ height: "600rpx" }}
        onClose={() => setShow(false)}
      >
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              border: "2rpx solid #333",
              borderRadius: "16rpx",
              margin: "24rpx",
              padding: "24rpx",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Input
                style={{ width: "60vw" }}
                placeholder="请输入用户编号"
                value={keyword}
                // value={keyWord}
                confirmType="search"
                onInput={(e) => {
                  setKeyword(e.detail.value);
                }}
              />
            </View>
            <Icon
              type="icon-sousuo"
              style={{ fontSize: "36rpx", color: "#333" }}
              onClick={handleSearch}
            />
            {/* {keyWord && (
            <Icon
              type="icon-tixingshixin"
              style={{ fontSize: "36rpx" }}
              onClick={() => {
                setKeyWord("");
              }}
            />
          )} */}
          </View>
          <View
            style={{ color: "#999", marginLeft: "24rpx", fontSize: "28rpx" }}
          >
            输入我的页面<Text style={{ color: "#cf000b" }}>编号</Text>搜索
          </View>
          {!user && (
            <View
              style={{
                color: "#cf000b",
                marginLeft: "24rpx",
                fontSize: "28rpx",
                fontWeight: 500,
              }}
            >
              搜索不到该用户 请输入正确的用户编号
            </View>
          )}
          {user?._id && (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "fit-content",
              }}
              onClick={handleAddBook}
            >
              <Image
                style={{ width: "100rpx", height: "100rpx", margin: "24rpx" }}
                src={user?.avatar ?? defaultAvatar}
              />
              <View>{user?.nick_name ?? "匿名"}</View>
            </View>
          )}
        </View>
      </Popup>
    </PageContainer>
  );
};
export default PermissionManagement;
