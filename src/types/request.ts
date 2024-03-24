/**
 * 请求返回基础类型
 */
export type BaseResp<T = any> = {
  code: number;
  success: boolean;
  message: string;
  data: T;
  requestUrl: string;
  unAuthorizedRequest: boolean;
};

/**
 * 分页返回数据
 */
export type BasePagiRespData<T> = {
  dataList: T[];
  total: number;
};

/**
 * 分页请求返回基础类信息
 */
export type BasePageResp<T> = {
  total?: number;
  success: boolean;
  message: string;
  data: T[];
  hasMore: 0 | 1;
};

/**
 * 分页请求基础类型
 */
export type BasePageReq = {
  pageNum?: number;
  pageSize?: number;
  // 拼接
  start?: number;
  length?: number;
};

/**
 * 接口网关
 */
export enum EnumGateWay {
  农贸 = 'nm-engine',
  b2c = 'b2c-engine',
  零售 = 'retail-engine-manager',
}
