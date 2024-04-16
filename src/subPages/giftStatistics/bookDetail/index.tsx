/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-04-11 16:31:55
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-04-16 10:45:53
 * @FilePath: /DEMO/src/subPages/giftStatistics/giftBook/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useRef, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import PageContainer from "@/components/PageContainer";
import { EnumGiftBookType } from "@/router";
import { Input, Textarea, View } from "@tarojs/components";
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
const BookDetail = () => {
  const { params } = useRouter();
  const [record, setRecord] = useState();
  const oldGiftMoneyRef = useRef(0);
  const { giftBook = "{}" } = params;
  const info = JSON.parse(decodeURIComponent(giftBook));
  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    if (!!params?.recordId) {
      const res = await getGiftBookRecordDetail(params?.recordId);
      if (res?.success) {
        const { _id, name, remark, gift_money } = res?.data;
        oldGiftMoneyRef.current = gift_money;
        setRecord({
          id: _id,
          name,
          remark,
          gift_money,
        });
      }
    }
  };

  function isAmountFormat(str) {
    let regex = /^[1-9]\d*(\.\d{1,2})?$|^0\.\d{1,2}$/;
    return regex.test(str);
  }

  const handleSave = async () => {
    console.log("record", record);
    if (!record?.name) {
      Tips.info("姓名不能为空");
      return;
    }
    if (!record?.gift_money) {
      Tips.info("礼金不能为空");
      return;
    }
    if (!isAmountFormat(record?.gift_money)) {
      Tips.info("请输入正确的金额");
      return;
    }
    console.log("保存参数", {
      ...record,
      bookId: info?._id,
    });
    const res = await saveAndUpdateBookRecord({
      ...record,
      bookId: info?._id,
    });
    if (res?.success) {
      Tips.info("提交成功");

      console.log(
        "info?.total_money",
        info?.total_money,
        record?.gift_money,
        oldGiftMoneyRef.current
      );
      const result = await fetchUpdateGiftBookTotal({
        id: info?._id,
        total_money: params?.recordId
          ? MathHelper.add(
              info?.total_money,
              MathHelper.subtract(record?.gift_money, oldGiftMoneyRef.current)
            )
          : MathHelper.add(info?.total_money, record?.gift_money),
        total_record: params?.recordId
          ? info?.total_record
          : MathHelper.add(info?.total_record, 1),
      });
      if (result?.success) {
        emitEvent("reloadList");
        Taro.navigateBack();
      } else {
      }
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
                姓名:
              </View>
              <View>
                <Input
                  value={record?.name}
                  placeholder="请输入姓名"
                  maxlength={10}
                  onInput={(e) => {
                    setRecord((prev) => ({ ...prev, name: e?.detail?.value }));
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
              <View style={{ width: "100rpx", marginRight: "20rpx" }}>
                礼金:
              </View>
              <View>
                <Input
                  value={record?.gift_money}
                  placeholder="请输入礼金"
                  maxlength={10}
                  type="number"
                  onInput={(e) => {
                    setRecord((prev) => ({
                      ...prev,
                      gift_money: e?.detail?.value,
                    }));
                  }}
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
                  value={record?.remark}
                  maxlength={200}
                  showCount
                  placeholder="不必填"
                  onInput={(e) => {
                    setRecord((prev) => ({
                      ...prev,
                      remark: e?.detail?.value,
                    }));
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
      </View>
    </PageContainer>
  );
};
export default BookDetail;
