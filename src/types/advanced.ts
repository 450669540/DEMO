// import Taro from '@tarojs/taro';
// import { EnumStorageKey } from './local.storage';

/**
 * 基本键值对
 */
export interface ValueNameObject<V> {
  /**
   * 值
   */
  value: V;
  /**
   * 值名称
   */
  name: string;
}

/**
 * 基础参数对象
 */
export interface BaseParams {
  [key: string]: any;
}

/**
 * 是否-枚举
 */
export enum EnumYesOrNo {
  否 = 0, // 禁用 0
  是 = 1, // 启用 1
}

export enum EnumBaseStatus {
  无效 = 0,
  有效 = 2,
}

export enum EnumValidStatus {
  有效 = 1,
  无效 = 0,
}

export interface Pagination {
  // pageNum: number;
  // pageSize: number;
  start: number;
  length: number;
}

/**
 * 默认分页
 */
export const DefaultPager = Object.freeze({
  // TODO:
  pageNum: 0,
  pageSize: 20,
  start: 0,
  length: 20,
  // total: undefined,
});
