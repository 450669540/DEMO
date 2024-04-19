/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-04-12 15:44:04
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-04-19 15:19:38
 * @FilePath: /DEMO/src/subPages/giftStatistics/giftBookDetails/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useEffect, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import PageContainer from "@/components/PageContainer";
import EmptyData from "@/components/EmptyData";
import { ScrollView, Text, View } from "@tarojs/components";
import Icon from "@/components/Icon";
import "./index.scss";
import { Input, SwipeCell, Button } from "@taroify/core";
import { EnumGiftBookType, tableDetailRouter } from "@/router";

import Tips from "@/utils/Tips";
import { deleteTable, getAllTableList } from "@/services/seat";
const SeatList = () => {
  const { params } = useRouter();
  const [keyword, setKeyWord] = useState<string>("");
  const [list, setList] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      const res = await getAllTableList({
        id: params?.seat_id,
        keyword,
      });
      if (res?.success) {
        setList(res?.data);
      }
    } catch (error) {
    } finally {
    }
  };

  const handleCreateTable = (type?: EnumGiftBookType, tableId?: string) => {
    Taro.navigateTo({
      url: tableDetailRouter(params?.seat_id ?? "", type, tableId),
      events: {
        reloadList: () => {
          reload();
        },
      },
    });
  };

  /** 删除记录 */
  const handleDelete = async (id) => {
    Tips.confirm("是否确认删除?")
      .then(async () => {
        const res = await deleteTable(id);
        if (res?.success) {
          Tips.info("删除成功");
          const newList = [...list];
          const index = newList?.findIndex((item) => item?._id === id);
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

  const reload = () => {
    console.log("刷新");

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
              placeholder="输入宾客名字,快速查桌"
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
                座位列表
              </View>
            </View>
            <ScrollView scrollY style={{ height: "80vh" }}>
              {list.map((item) => (
                <SwipeCell className="custom-swipe-cell">
                  <View
                    style={{
                      margin: "24rpx",
                      padding: "24rpx",
                      border: "2rpx solid #333",
                      borderRadius: "16rpx",
                      display: "flex",
                      // justifyContent: "space-between",
                      flexDirection: "column",
                      // alignItems: "center",
                      position: "relative",
                    }}
                    onClick={() =>
                      handleCreateTable(EnumGiftBookType.create, item?._id)
                    }
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        // borderBottom: "2rpx solid #333",
                      }}
                    >
                      <View
                        style={{
                          paddingBottom: "10rpx",
                          textAlign: "center",
                          color: "#cf000b",
                          fontSize: "40rpx",
                        }}
                      >
                        {item?.table_no}号桌
                      </View>
                    </View>
                    <View style={{ paddingTop: "10rpx" }}>
                      {item?.guest_names?.split(",")?.map((guest) => (
                        <Text style={{ margin: "6rpx" }}>{guest}</Text>
                      ))}
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
            </ScrollView>
          </View>
        )}

        <View
          className="createBtn"
          onClick={() => handleCreateTable(EnumGiftBookType.create)}
        >
          <Icon type="icon-tianjia" style={{ fontSize: "60rpx" }} />
        </View>
      </View>
    </PageContainer>
  );
};
export default SeatList;
