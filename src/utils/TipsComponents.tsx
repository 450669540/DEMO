/**
 * 暂未使用，因为目前来看 Toast 不支持 自定义 selector
 *
 * @author luoxiaochuan <luoxiaochuan@xueji.com>
 * @date 2023-08-02
 */
import React from 'react';

import { Toast as TaroifyToast } from '@taroify/core';

export const Toast = TaroifyToast;

export const TipInfoToastId = 'toast';

export const TipInfoToast = () => {
  return <TaroifyToast id={TipInfoToastId} />;
};
