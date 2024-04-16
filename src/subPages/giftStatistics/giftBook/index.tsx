/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-04-11 16:31:55
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-04-16 10:45:10
 * @FilePath: /DEMO/src/subPages/giftStatistics/giftBook/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import PageContainer from "@/components/PageContainer";
import { EnumGiftBookType } from "@/router";
import { Input, Textarea, View } from "@tarojs/components";
import Button from "@taroify/core/button/button";
import "./index.scss";
import { Popup } from "@taroify/core";
import DatePickerComponent from "@/components/DatePickerComponent";
import dayjs from "dayjs";
import {
  getBookDetail,
  saveAndUpdateGiftBook,
} from "@/services/giftStatistics";
import Tips from "@/utils/Tips";
import { emitEvent } from "@/utils/util";
const GiftBook = () => {
  const { params } = useRouter();
  const [showPicker, setShowPicker] = useState(false);
  const [book, setBook] = useState();

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title:
        params?.type === EnumGiftBookType.update ? "编辑礼金薄" : "创建礼金簿",
    });
    getDetail();
  }, []);

  const getDetail = async () => {
    if (!!params?.id) {
      const res = await getBookDetail(params?.id);
      if (res?.success) {
        const { _id, name, remark, activity_on } = res?.data;
        setBook({
          id: _id,
          name,
          remark,
          activity_on,
        });
      }
    }
  };

  const handleSave = async () => {
    if (!book?.name) {
      Tips.info("名称不能为空");
      return;
    }
    if (!book?.activity_on) {
      Tips.info("时间不能为空");
      return;
    }
    const res = await saveAndUpdateGiftBook(book);
    if (res?.success) {
      Tips.info("提交成功");
      emitEvent("reloadList");
      Taro.navigateBack();
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
              <View style={{ width: "100rpx", marginRight: "20rpx" }}>
                名称:
              </View>
              <View>
                <Input
                  value={book?.name}
                  placeholder="请输入礼金簿名称"
                  maxlength={10}
                  onFocus={() => setShowPicker(false)}
                  onInput={(e) => {
                    setBook((prev) => ({ ...prev, name: e?.detail?.value }));
                  }}
                />
              </View>
            </View>

            <View
              style={{
                display: "flex",
                alignItems: "center",
                height: "120rpx",
                width: "100%",
                borderBottom: "2rpx solid #f3f3f3",
              }}
            >
              <View style={{ marginRight: "20rpx", width: "100rpx" }}>
                时间:
              </View>
              <View onClick={() => setShowPicker(true)}>
                <Input
                  value={
                    book?.activity_on
                      ? dayjs(book?.activity_on).format("YYYY-MM-DD")
                      : ""
                  }
                  disabled={true}
                  placeholder="请选择时间"
                />
              </View>
            </View>
            <View
              style={{
                display: "flex",
                paddingTop: "36rpx",
                borderBottom: "2rpx solid #f3f3f3",

                width: "100%",
              }}
            >
              <View style={{ marginRight: "20rpx", width: "100rpx" }}>
                备注:
              </View>
              <View>
                <Textarea
                  style={{
                    width: `calc(100vw - 220rpx)`,
                    height: "200rpx",
                    paddingTop: "4rpx",
                    // border: "2rpx solid #333",
                    // borderRadius: "16rpx",
                  }}
                  value={book?.remark}
                  onFocus={() => setShowPicker(false)}
                  maxlength={200}
                  showCount
                  placeholder="不必填"
                  onInput={(e) => {
                    setBook((prev) => ({ ...prev, remark: e?.detail?.value }));
                  }}
                ></Textarea>
              </View>
            </View>
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
        <View></View>
      </View>
      <DatePickerComponent
        show={showPicker}
        selectedDate={book?.activity_on}
        onConfirm={(data) => {
          setShowPicker(false);

          setBook((prev) => ({ ...prev, activity_on: data }));
        }}
        onCancle={() => setShowPicker(false)}
      />
    </PageContainer>
  );
};
export default GiftBook;
