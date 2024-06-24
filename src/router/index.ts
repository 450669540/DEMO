/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-02-07 14:09:34
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-06-14 15:33:40
 * @FilePath: /DEMO/src/router/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export enum EnumGiftBookType {
  create = "创建",
  update = "编辑",
}

/** 座位排列模版页 */
export const seatArrangementRouter = () => {
  return "/subPages/seatArrangement/index";
};

export const weddingGameRouter = () => {
  return "/subPages/wediingGame/index";
};

export const auspiciousDayRouter = () => {
  return "/subPages/auspiciousDay/index";
};

/** 座位排列详情页 */
export const viewSeatRouter = () => {
  return "/subPages/seatArrangement/view/index";
};

/** 座位排列详情页 */
export const tableListRouter = (id: string) => {
  return `/subPages/seatArrangement/tableList/index?seat_id=${id}`;
};

/** 创建/编辑桌子 */
export const tableDetailRouter = (
  seatId: string,
  type?: EnumGiftBookType,
  tableId?: string
) => {
  return `/subPages/seatArrangement/createTable/index?type=${type}${
    !!seatId ? `&seatId=${seatId}` : ""
  }${!!tableId ? `&tableId=${tableId}` : ""}`;
};

/** 账户设置 */
export const accountSettingRouter = () => {
  return "/subPages/accountSetting/index";
};

/** 电子请柬列表 */
export const electronicInvitationMainRouter = () => {
  return `/pages/electronicInvitationMain/index`;
};

/** 电子请柬详情页 */
export const electronicInvitationRouter = (template_id: string) => {
  return `/subPages/electronicInvitation/index?template_id=${template_id}`;
};

/** 电子请柬编辑页 */
export const electronicInvitationEditRouter = (
  orign_template_id: string,
  template_id?: string
) => {
  return `/subPages/electronicInvitation/edit/index?orign_template_id=${orign_template_id}&template_id=${template_id}`;
};

/** 礼金记录 */
export const giftStatisticsRouter = () => {
  return "/subPages/giftStatistics/index";
};

/** 创建/编辑礼金薄 */
export const giftBookRouter = (type?: EnumGiftBookType, id?: string) => {
  return `/subPages/giftStatistics/giftBook/index?type=${type}${
    !!id ? `&id=${id}` : ""
  }`;
};

/** 创建/编辑礼金薄 */
export const giftBookDetailsRouter = (id: string) => {
  return `/subPages/giftStatistics/giftBookDetails/index?id=${id}`;
};

/** 创建/编辑收礼记录 */
export const bookDetailRouter = (
  giftBook: string,
  type?: EnumGiftBookType,
  recordId?: string
) => {
  return `/subPages/giftStatistics/bookDetail/index?type=${type}${
    !!giftBook ? `&giftBook=${giftBook}` : ""
  }${!!recordId ? `&recordId=${recordId}` : ""}`;
};

/** 礼簿权限管理页面 */
export const bookPermissionManagementRouter = (id: string) => {
  return `/subPages/giftStatistics/permissionManagement/index?id=${id}`;
};
