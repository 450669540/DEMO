import Taro from '@tarojs/taro';

export enum EnumEventCenter {
  updateCart = 'updateCart',
  updateAddressList = 'updateAddressList',
  giftSuccessRouter = 'giftSuccessRouter',
  greetingCardDetailRouter = 'greetingCardDetailRouter',
  paySuccess = 'paySuccess',
  // 用于订单详情取消订单时，更新列表记录
  updateOrderListItem = 'updateOrderListItem',
  // 用于更新寄到家活动点单页数据
  updateDeliveryActivityCart = 'updateDeliveryActivityCart',
}

export const eventCenterTrigger = (eventName: string, data = {}) => {
  // 用于刷购物车
  Taro.eventCenter.trigger(eventName, data);
};

export const eventCenterOn = (eventName, fn) => {
  // 用于刷购物车
  Taro.eventCenter.on(eventName, fn);
};

export const eventCenterOff = (eventName: string) => {
  // 用于刷购物车
  Taro.eventCenter.off(eventName);
};

export const eventCenterOnce = (eventName, fn) => {
  // 用于刷购物车
  Taro.eventCenter.once(eventName, fn);
};
