/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-04-11 15:53:19
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-04-16 11:43:26
 * @FilePath: /DEMO/src/subPages/giftStatistics/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useMemo, useRef, useState } from "react";
import Taro, { usePageScroll } from "@tarojs/taro";
import numeral from "numeral";
import PageContainer from "@/components/PageContainer";
import { Text, View } from "@tarojs/components";
import Icon from "@/components/Icon";

import "./index.scss";
import EmptyData from "@/components/EmptyData";
import {
  EnumGiftBookType,
  bookPermissionManagementRouter,
  giftBookDetailsRouter,
  giftBookRouter,
} from "@/router";
import { ActionSheet, List, Loading } from "@taroify/core";
import Tips from "@/utils/Tips";
import { deleteGiftBook, getGiftBookList } from "@/services/giftStatistics";
import { defaultPageSize } from "@/const";
import { NOOP, formatDatetime } from "@/utils/util";
import { EFormatDatetimeType } from "@/types/basic";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "@/models";
import { MemberVO } from "@/types/user";

const GiftStatistics = () => {
  const userInfo = useSelector<RootState, MemberVO | undefined>(
    (state) => state.user.userInfo
  );
  const [showId, setShowId] = useState<String>();
  const [list, setList] = useState([]);
  const startRef = useRef(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const hasMoreRef = useRef(true);
  usePageScroll(({ scrollTop: aScrollTop }) => setScrollTop(aScrollTop));

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    console.log("getlist", hasMore);
    if (!hasMoreRef.current) {
      return;
    }
    setLoading(true);

    try {
      const res = await getGiftBookList({
        start: startRef.current,
        pageSize: defaultPageSize,
      });
      if (res?.success) {
        console.log("start", startRef.current, list, res?.data);
        if (list?.length === 0 && startRef.current === 0) {
          setList(res?.data);
        } else {
          if (res?.data?.length > 0) {
            setList((prev) => {
              return [...prev, ...res?.data];
            });
          }
        }
        startRef.current = startRef.current + defaultPageSize;
        setHasMore(res?.data?.length >= defaultPageSize);
        hasMoreRef.current = res?.data?.length >= defaultPageSize;
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  /** 创建礼金簿 */
  const handleCreateBook = (type?: EnumGiftBookType) => {
    setShowId(undefined);
    Taro.navigateTo({
      url: giftBookRouter(type, showId),
      events: {
        reloadList: () => {
          reload();
        },
      },
    });
  };

  const reload = () => {
    console.log("刷新");
    startRef.current = 0;
    setList([]);
    setHasMore(true);
    hasMoreRef.current = true;

    getList();
  };

  /** 删除礼金簿 */
  const handleDeleteBook = async () => {
    setShowId(undefined);
    Tips.confirm("是否确认删除礼金簿?")
      .then(async () => {
        const res = await deleteGiftBook(showId);
        if (res?.success) {
          Tips.info("删除成功");
          const newList = [...list];
          const index = newList?.findIndex((item) => item?._id === showId);
          if (index !== -1) {
            newList.splice(index, 1);
            setList(newList);
          }
        } else {
          Tips.info("删除失败");
        }
      })
      .catch((err) => {
        if (err?.cancel) {
          console.log("用户点击取消");
        }
        console.log("---------", err);
      });
  };

  const goPermissionManagement = (id) => {
    setShowId(undefined);
    Taro.navigateTo({ url: bookPermissionManagementRouter(id) });
  };

  /** 跳转礼金明细页面 */
  const goGiftBookDetails = (item) => {
    setShowId(undefined);
    Taro.navigateTo({
      url: giftBookDetailsRouter(item?._id),
      events: {
        reloadList: () => {
          reload();
        },
      },
    });
  };
  console.log("hasmore", hasMore);
  return (
    <PageContainer>
      <View className="container">
        <View
          style={{
            background: "#E4BD34",
            color: "#fff",
            padding: "10rpx 24rpx",
            display: "flex",
            //alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Icon
            type="icon-tixingshixin"
            style={{
              fontSize: "34rpx",
              color: "#fff",
              marginBottom: "4rpx",
              marginRight: "10rpx",
            }}
          />
          <Text style={{ fontSize: "30rpx" }}>
            自己的礼簿,长按出现操作弹窗;点击礼簿,查看收礼明细
          </Text>
        </View>

        <List
          loading={loading}
          hasMore={hasMore}
          scrollTop={scrollTop}
          onLoad={() => {
            getList();
          }}
        >
          <View
            style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}
          >
            <View
              style={{
                // border: "2rpx solid #333",
                boxShadow: "0px 2px 8px 0px rgba(209,209,209,0.80)",
                borderRadius: "16rpx",
                margin: "24rpx",
                padding: "24rpx",
                width: `calc((100% - 200rpx) / 2)`,
                height: "300rpx",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => handleCreateBook()}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Icon
                  type="icon-tianjia"
                  style={{
                    color: "#999",
                    fontSize: "100rpx",
                  }}
                />
                <View style={{ marginTop: "20rpx" }}>创建礼簿</View>
              </View>
            </View>
            {list?.length > 0 &&
              list.map((item) => (
                <View
                  style={{
                    boxShadow: "0px 2px 8px 0px rgba(209,209,209,1)",
                    borderRadius: "16rpx",
                    margin: "24rpx",
                    padding: "24rpx",
                    width: `calc((100% - 200rpx) / 2)`,
                    height: "300rpx",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                  }}
                  onClick={() => goGiftBookDetails(item)}
                  onLongPress={
                    item?.user_id !== userInfo?._id
                      ? NOOP
                      : () => setShowId(item?._id)
                  }
                >
                  <View>
                    <View
                      style={{
                        fontSize: "40rpx",
                        color: "#cf000b",
                        fontFamily: "HYXiaoBoZheZhiTiJ",
                      }}
                    >
                      {item?.name}
                    </View>
                    <View style={{ color: "#999" }}>
                      共
                      <Text
                        style={{
                          color: "#cf000b",
                          marginLeft: "6rpx",
                          marginRight: "6rpx",
                        }}
                      >
                        {item?.total_record}
                      </Text>
                      笔
                    </View>
                  </View>
                  <View>
                    <View style={{ color: "#333", fontWeight: "500" }}>
                      ¥
                      <Text style={{ fontSize: "44rpx" }}>
                        {numeral(item?.total_money).format("0.00")}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ color: "#999", fontSize: "28rpx" }}>
                        {formatDatetime(
                          item?.activity_on,
                          EFormatDatetimeType.HORIZONTAL_BAR_TO_DAY
                        )}
                      </View>
                      <View
                        style={{
                          border: `2rpx solid ${
                            item?.user_id !== userInfo?._id
                              ? "#7EBA1D"
                              : "#EDA810"
                          }`,
                          color:
                            item?.user_id !== userInfo?._id
                              ? "#7EBA1D"
                              : "#EDA810",
                          fontSize: "24rpx",
                          padding: "4rpx 10rpx",
                          borderRadius: "8rpx",
                        }}
                      >
                        {item?.user_id !== userInfo?._id ? "他人" : "自己"}
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      width: "120rpx",
                      height: "50rpx",
                      background: "#cf000b",
                      position: "absolute",
                      right: 0,
                      top: "45%",
                      borderTopLeftRadius: "32rpx",
                      borderBottomLeftRadius: "32rpx",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "20rpx",
                        height: "20rpx",
                        borderRadius: "50%",
                        background:
                          "linear-gradient(to right, red, orange, yellow)",
                        marginLeft: "20rpx",
                      }}
                    ></View>
                  </View>
                </View>
              ))}
          </View>
          <List.Placeholder>
            {loading && <Loading>加载中...</Loading>}
            {!hasMore && "没有更多了"}
          </List.Placeholder>
        </List>

        {/* <View className="createBtn" onClick={handleCreateBook}>
          <Icon
            type="icon-zhangbenzhangdanjizhangzhangbu"
            style={{ fontSize: "60rpx" }}
          />
        </View> */}
      </View>

      <ActionSheet
        open={!!showId}
        style={{ paddingBottom: "60rpx" }}
        onClose={() => setShowId(undefined)}
      >
        <ActionSheet.Header>操作</ActionSheet.Header>

        <ActionSheet.Action
          name="编辑"
          onClick={() => handleCreateBook(EnumGiftBookType.update)}
        />

        <ActionSheet.Action
          name="权限管理"
          onClick={() => goPermissionManagement(showId)}
        />

        <ActionSheet.Action name="删除" onClick={handleDeleteBook} />
      </ActionSheet>
    </PageContainer>
  );
};
export default GiftStatistics;
