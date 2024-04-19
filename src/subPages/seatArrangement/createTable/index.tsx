/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-04-11 16:31:55
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-04-19 15:09:11
 * @FilePath: /DEMO/src/subPages/giftStatistics/giftBook/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useRef, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import PageContainer from "@/components/PageContainer";
import { EnumGiftBookType } from "@/router";
import { Input, ScrollView, Textarea, View } from "@tarojs/components";
import Button from "@taroify/core/button/button";
import "./index.scss";
import {
  fetchUpdateGiftBookTotal,
  getGiftBookRecordDetail,
  saveAndUpdateBookRecord,
} from "@/services/giftStatistics";
import Tips from "@/utils/Tips";
import { emitEvent } from "@/utils/util";
import MathHelper from "@/utils/math";
import { getTableDetail, saveAndUpdateTable } from "@/services/seat";
import Icon from "@/components/Icon";
const CreateTabel = () => {
  const { params } = useRouter();
  const [table, setTable] = useState({ table_no: "", guest: [""] });
  console.log("params", params);
  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    if (!!params?.tableId) {
      const res = await getTableDetail(params?.tableId);
      if (res?.success) {
        const { _id, guest_names, table_no, seat_id } = res?.data;
        setTable({
          id: _id,
          guest: guest_names?.split(","),
          table_no,
          seatId: seat_id ?? params?.seatId,
        });
      }
    }
  };

  const handleSave = async () => {
    console.log("table", table);
    if (!table?.table_no) {
      Tips.info("桌号不能为空");
      return;
    }
    if (table?.guest?.filter((item) => item?.trim() === "")?.length > 0) {
      Tips.info("请输入宾客名");
      return;
    }
    let gameNames = [];
    let errorFlag = false;
    for (let i = 0; i < table?.guest?.length; i++) {
      if (gameNames.includes(table?.guest?.[i])) {
        errorFlag = true;
      } else {
        gameNames.push(table?.guest?.[i]);
      }
    }
    if (errorFlag) {
      Tips.info("宾客名不能重复");
      return;
    }

    const res = await saveAndUpdateTable({
      id: table?.id,
      table_no: table?.table_no,
      seatId: params?.seatId,
      guest_names: table?.guest?.join(","),
    });
    if (res?.success) {
      Tips.info("提交成功");

      emitEvent("reloadList");
      Taro.navigateBack();
    } else {
      Tips.info(res?.message);
    }
  };

  return (
    <PageContainer>
      <View className="container">
        <View className="wrapper">
          <View style={{ margin: "24rpx" }}>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                height: "120rpx",
                width: "100%",
                borderBottom: "2rpx solid #f3f3f3",
              }}
            >
              <View style={{ width: "120rpx", marginRight: "20rpx" }}>
                桌号:
              </View>
              <View style={{ width: "72%" }}>
                <Input
                  value={table?.table_no}
                  placeholder="请输入桌号"
                  maxlength={10}
                  type="number"
                  onInput={(e) => {
                    const value = e?.detail?.value.replace(/[^-0-9]/g, "");
                    console.log("value", value);
                    setTable((prev) => ({
                      ...prev,
                      table_no: value,
                    }));
                  }}
                />
              </View>
            </View>
            <ScrollView
              scrollY
              style={{ height: "70vh" }}
              showScrollbar={false}
            >
              {table?.guest?.map((item, i) => (
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "120rpx",
                    width: "100%",
                    borderBottom: "2rpx solid #f3f3f3",
                  }}
                >
                  <View style={{ width: "120rpx", marginRight: "20rpx" }}>
                    宾客{i + 1}:
                  </View>
                  <View style={{ width: "72%" }}>
                    <Input
                      value={item}
                      placeholder="请输入宾客名"
                      maxlength={10}
                      onInput={(e) => {
                        const newList = [...table?.guest];
                        newList[i] = e?.detail?.value;
                        setTable((prev) => ({
                          ...prev,
                          guest: newList,
                        }));
                      }}
                    />
                  </View>
                  {i === table?.guest?.length - 1 ? (
                    <View
                      onClick={() => {
                        const newList = [...table?.guest];
                        newList.push("");
                        setTable((prev) => ({
                          ...prev,
                          guest: newList,
                        }));
                      }}
                    >
                      <Icon
                        type="icon-tianjia1"
                        style={{ color: "#333", fontSize: "36rpx" }}
                      />
                    </View>
                  ) : (
                    <View
                      onClick={() => {
                        const newList = [...table?.guest];
                        newList.splice(i, 1);

                        setTable((prev) => ({
                          ...prev,
                          guest: newList,
                        }));
                      }}
                    >
                      <Icon
                        type="icon-yichu"
                        style={{ color: "#cf000b", fontSize: "40rpx" }}
                      />
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              bottom: 20,
              width: "100%",
            }}
          >
            <Button className="saveBtn" onClick={handleSave}>
              保存
            </Button>
          </View>
        </View>
      </View>
    </PageContainer>
  );
};
export default CreateTabel;
