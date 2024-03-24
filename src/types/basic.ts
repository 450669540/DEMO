/*
 * @Description:
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2023-08-07 16:18:11
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-02-04 15:10:46
 */
import { CSSProperties } from 'react';

// 数字或字符串
export type Numeric = number | string;

export type Styles = CSSProperties;

// 样式
export interface StyledProps {
  className?: string;
  style?: CSSProperties;
}

//日期格式枚举
export enum EFormatDatetimeType {
  YEAR_MONTH_DAY_HOUR_MIN = '年月日时分',
  HORIZONTAL_BAR_HOUR_MIN = '横杠时分',
  YEAR_MONTH_DAY = '年月日',
  HORIZONTAL_BAR_TO_DAY = '横杠年月日',
  YEAR_MONTH = '年月',
  HORIZONTAL_BAR = '横杠年月',
  SLASH_YEAR_MONTH_DAY = '斜杠年月日',
  SLASH_YEAR_MONTH_DAY_HOUR_MIN = '斜杠年月日时分',
  MONTH_DAY = '月日',
  HORIZONTAL_BAR_MONTH_DAY_HOUR_MIN = '横杠月日时分',
}
