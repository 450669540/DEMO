/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-04-12 15:44:04
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-04-16 11:30:11
 * @FilePath: /DEMO/src/subPages/giftStatistics/giftBookDetails/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useRef, useState } from "react";
import Taro, { usePageScroll, useRouter } from "@tarojs/taro";
import numeral from "numeral";
import PageContainer from "@/components/PageContainer";
import EmptyData from "@/components/EmptyData";
import { ScrollView, Text, View } from "@tarojs/components";
import Icon from "@/components/Icon";
import "./index.scss";
import { Input, List, Loading, SwipeCell, Button } from "@taroify/core";
import { EnumGiftBookType, bookDetailRouter } from "@/router";
import { defaultPageSize } from "@/const";
import {
  deleteBookRecord,
  fetchUpdateGiftBookTotal,
  getBookDetail,
  getBookRecordList,
} from "@/services/giftStatistics";
import Tips from "@/utils/Tips";
import MathHelper from "@/utils/math";
import { emitEvent } from "@/utils/util";
const GiftBookDetails = () => {
  const { params } = useRouter();
  const [keyword, setKeyWord] = useState<string>("");
  const [list, setList] = useState([]);
  const startRef = useRef(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [giftBook, setGiftBook] = useState();

  usePageScroll(({ scrollTop: aScrollTop }) => setScrollTop(aScrollTop));

  useEffect(() => {
    getList();
    getGiftDetail();
  }, []);

  const getList = async () => {
    setLoading(true);

    try {
      const res = await getBookRecordList({
        id: params?.id,
        keyword,
        start: startRef.current,
        pageSize: defaultPageSize,
      });
      if (res?.success) {
        console.log("start", startRef.current, list, res?.data);
        if (list?.length === 0 && startRef.current === 0) {
          setList(res?.data);
        } else {
          if (res?.data?.length > 0) {
            setList((prev) => [...prev, ...res?.data]);
            startRef.current = startRef.current + defaultPageSize;
          }
        }
        setHasMore(res?.data?.length >= defaultPageSize);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getGiftDetail = async () => {
    if (!!params?.id) {
      const res = await getBookDetail(params?.id);
      if (res?.success) {
        setGiftBook(res?.data);
      }
    }
  };

  const handleCreateBookDetail = (
    type?: EnumGiftBookType,
    recordId?: string
  ) => {
    Taro.navigateTo({
      url: bookDetailRouter(
        encodeURIComponent(JSON.stringify(giftBook)),
        type,
        recordId
      ),
      events: {
        reloadList: () => {
          reload();
          getGiftDetail();
        },
      },
    });
  };

  /** 删除记录 */
  const handleDelete = async (id) => {
    Tips.confirm("是否确认删除礼金簿?")
      .then(async () => {
        const res = await deleteBookRecord(id);
        if (res?.success) {
          Tips.info("删除成功");
          const newList = [...list];
          const index = newList?.findIndex((item) => item?._id === id);
          const currentRecord = newList?.[index];
          if (index !== -1) {
            newList.splice(index, 1);
            setList(newList);
            const result = await fetchUpdateGiftBookTotal({
              id: giftBook?._id,
              total_money: MathHelper.subtract(
                giftBook?.total_money,
                currentRecord?.gift_money
              ),
              total_record: MathHelper.subtract(giftBook?.total_record, 1),
            });
            if (result?.success) {
              getGiftDetail();

              emitEvent("reloadList");
            } else {
            }
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

  const reload = () => {
    console.log("刷新");
    startRef.current = 0;
    setList([]);
    setHasMore(true);
    getList();
  };

  useEffect(() => {
    reload();
  }, [keyword]);

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
          <Text style={{ fontSize: "30rpx" }}>左滑删除</Text>
        </View>
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
            <Icon
              type="icon-sousuo"
              style={{ fontSize: "36rpx", color: "#333" }}
            />
            <Input
              style={{ marginLeft: "28rpx", width: "60vw" }}
              placeholder="请输入搜索关键字"
              value={keyword}
              confirmType="search"
              onChange={(e) => {
                setKeyWord(e.detail.value);
              }}
            />
          </View>
          {keyword && (
            <Icon
              type="icon-tixingshixin"
              style={{ fontSize: "36rpx" }}
              onClick={() => {
                setKeyWord("");
              }}
            />
          )}
        </View>
        {list?.length === 0 ? (
          <EmptyData />
        ) : (
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Icon
                type="icon-biaoji"
                style={{
                  fontSize: "60rpx",
                  color: "#333",
                  marginLeft: "24rpx",
                }}
              />
              <View
                style={{
                  fontSize: "40rpx",
                  color: "#333",
                  fontWeight: "500",
                  fontFamily: "HYXiaoBoZheZhiTiJ",
                  marginTop: "10rpx",
                }}
              >
                明细列表
              </View>
            </View>
            <List
              loading={loading}
              hasMore={hasMore}
              scrollTop={scrollTop}
              onLoad={() => {
                getList();
              }}
            >
              {list.map((item) => (
                <SwipeCell className="custom-swipe-cell">
                  <View
                    style={{
                      margin: "24rpx",
                      padding: "24rpx",
                      border: "2rpx solid #333",
                      borderRadius: "16rpx",
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignItems: "center",
                      position: "relative",
                    }}
                    onClick={() =>
                      handleCreateBookDetail(EnumGiftBookType.create, item?._id)
                    }
                  >
                    <View style={{ display: "flex", flexDirection: "column" }}>
                      <View>{item?.name}</View>
                      {/* <View style={{ fontSize: "24rpx", color: "#999" }}>
                  bgjhgjhhgh
                </View> */}
                    </View>
                    <View style={{ color: "#cf000b" }}>
                      ¥
                      <Text style={{ fontSize: "40rpx" }}>
                        {numeral(item?.gift_money).format("0.00")}
                      </Text>
                    </View>
                    <Icon
                      type="icon-pin"
                      style={{
                        fontSize: "36rpx",
                        position: "absolute",
                        right: -5,
                        top: -5,
                        color: "#333",
                        zIndex: 100,
                        background: "#fff",
                      }}
                    />
                  </View>

                  <SwipeCell.Actions side="right">
                    {/* <Button variant="contained" shape="square" color="danger">
                      删除
                    </Button> */}
                    <Button
                      variant="contained"
                      shape="square"
                      color="danger"
                      onClick={() => handleDelete(item?._id)}
                    >
                      <Icon
                        type="icon-shanchu"
                        style={{ fontSize: "40rpx", color: "#fff" }}
                      />
                    </Button>
                  </SwipeCell.Actions>
                </SwipeCell>
              ))}

              <List.Placeholder>
                {loading && <Loading>加载中...</Loading>}
                {!hasMore && "没有更多了"}
              </List.Placeholder>
            </List>
          </View>
        )}
        {list?.length > 0 && (
          <View
            style={{
              position: "fixed",
              left: 0,
              bottom: 0,
              background: "#fff",
              // height: "80rpx",
              zIndex: 101,
              fontSize: "44rpx",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "68rpx",
              border: "2rpx solid #333",
              paddingTop: "60rpx",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* <Icon
              type="icon-zongjijine"
              style={{ fontSize: "60rpx", color: "#333" }}
            /> */}
              <View>
                总计:¥
                <Text style={{ fontSize: "60rpx", fontWeight: "500" }}>
                  {numeral(giftBook?.total_money).format("0.00")}
                </Text>
              </View>
            </View>
          </View>
        )}
        <View
          className="createBtn"
          onClick={() => handleCreateBookDetail(EnumGiftBookType.create)}
        >
          <Icon
            type="icon-zhangbenzhangdanjizhangzhangbu"
            style={{ fontSize: "60rpx" }}
          />
        </View>
      </View>
    </PageContainer>
  );
};
export default GiftBookDetails;
