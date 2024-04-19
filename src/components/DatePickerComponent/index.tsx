/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-04-13 22:28:19
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-04-19 16:38:58
 * @FilePath: /DEMO/src/components/DataPickerComponent/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from "react";
import PageContainer from "@/components/PageContainer";
import { DatetimePicker, Popup } from "@taroify/core";
import dayjs from "dayjs";

interface Props {
  selectedDate: Date;
  show: boolean;
  onConfirm: (data: Date) => void;
  onCancle: () => void;
}

const DatePickerComponent = ({
  show,
  selectedDate,
  onConfirm,
  onCancle,
}: Props) => {
  // const [minDate] = useState(new Date(2021, 9, 14));
  //const [maxDate] = useState(new Date(2023, 11, 12));
  //const [defaultValue] = useState(new Date(2021, 9, 14));
  const [value, setValue] = useState(new Date());
  useEffect(() => {
    setValue(!!selectedDate ? dayjs(selectedDate).toDate() : new Date());
  }, [selectedDate]);

  return (
    show && (
      <Popup open rounded placement="bottom" onClose={onCancle}>
        <Popup.Backdrop />
        <DatetimePicker
          type="date"
          // min={minDate}
          //max={maxDate}
          defaultValue={new Date()}
          value={value}
          onChange={(data) => {
            console.log("改变", data);
            setValue(data);
          }}
        >
          <DatetimePicker.Toolbar>
            <DatetimePicker.Button onClick={onCancle}>
              取消
            </DatetimePicker.Button>
            <DatetimePicker.Title>选择年月日</DatetimePicker.Title>
            <DatetimePicker.Button
              onClick={(e) => {
                console.log("确定", value);
                onConfirm(value);
              }}
            >
              确认
            </DatetimePicker.Button>
          </DatetimePicker.Toolbar>
        </DatetimePicker>
      </Popup>
    )
  );
};
export default DatePickerComponent;
