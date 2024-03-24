import Taro from '@tarojs/taro';

/**
 * 比较版本
 * @author luoxiaochuan <luoxiaochuan@xueji.com>
 * @date 2022-11-04
 */
export const compareVersion = function compareVersion(v1, v2) {
  v1 = v1.split('.');
  v2 = v2.split('.');
  const len = Math.max(v1.length, v2.length);

  while (v1.length < len) {
    v1.push('0');
  }
  while (v2.length < len) {
    v2.push('0');
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i]);
    const num2 = parseInt(v2[i]);

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }

  return 0;
};

/**
 * 获取系统 SDK 版本
 * @author luoxiaochuan <luoxiaochuan@xueji.com>
 * @date 2022-11-04
 */
export const getSDKVersion = () => {
  const version = Taro.getSystemInfoSync().SDKVersion;
  return version;
};

/**
 * 函数 version
 * @author luoxiaochuan <luoxiaochuan@xueji.com>
 * @date 2022-11-04
 * @param version 版本号
 * @param {resolve} 函数 能用回调
 * @param {reject} 函数 不能用回调
 */
export const canIUseByVersion = (version, resolve = () => {}, reject = () => {}) => {
  if (compareVersion(getSDKVersion(), version) >= 0) {
    resolve && resolve();
  } else {
    reject && reject();
  }
};

/**
 * 函数 version
 * @author luoxiaochuan <luoxiaochuan@xueji.com>
 * @date 2022-11-04
 * @param {string} version 版本号
 */
export const canIUseBySDKVersion = (version) => {
  return compareVersion(getSDKVersion(), version) >= 0;
};
