import Taro from '@tarojs/taro';

/**
 * 拥有属性
 * @author luoxiaochuan <lxchuan12@163.com>
 * @date 2021-09-22
 */
export const hasOwn = function (val, key) {
  return Object.prototype.hasOwnProperty.call(val, key);
};

/**
 * 生成uuid
 * @author luoxiaochuan <lxchuan12@163.com>
 * @date 2021-08-30 15:45:36
 */
export const uuid = function () {
  /* eslint-disable */
  var s = [];
  var hexDigits = '0123456789abcdef';
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-';

  var uuid = s.join('');
  return uuid;
};

export const getDpr = () => {
  let dpr = 1;
  try {
    const res = Taro.getSystemInfoSync();
    dpr = res.pixelRatio;
  } catch (e) {
    dpr = 1;
    return dpr;
  }
};

/**
 * 格式化图片链接函数
 * @author luoxiaochuan <lxchuan12@163.com>
 * @date 2022-01-17
 */
export const formatImageUrl = function (url, width, options = {}) {
  // dpr 1 2 3
  // 超过 2 rmode=min 会出现空白
  let dpr = getDpr() || 1;
  if (Number(dpr) > 2) {
    dpr = 2;
  }
  // options 留着扩展，暂时不用
  const suffix = 'Quality=100&rsampler=lanczos8&rmode=min';
  let lastUrl = '';
  if (typeof width === 'number') {
    lastUrl = `${url}?width=${width * dpr}&${suffix}`;
  }
  // url?width
  else if (url.includes('width')) {
    lastUrl = `${url}&${suffix}`;
  } else {
    lastUrl = `${url}?${suffix}`;
  }
  return lastUrl;
};

/**
 * IOS 下不支持 new Date('xxxx-xx-xx') ，统一转换成 /
 * @author luoxiaochuan <luoxiaochuan@xueji.com>
 * @date 2022-07-14
 */
export const IOSReplace = (dateStr) => {
  if (typeof dateStr === 'string') {
    return dateStr.replace(/-/g, '/');
  }
  return dateStr;
};

/**
 * 简版 delay
 * @author luoxiaochuan <luoxiaochuan@xueji.com>
 * @date 2022-04-01
 */
export const delay = (ms: number = 3000, data = {}) => {
  return new Promise((resovle) => {
    setTimeout(() => {
      resovle(data);
    }, ms);
  });
};

/**
 * 解析时间
 * @author luoxiaochuan <luoxiaochuan@xueji.com>
 * @date 2022-10-09
 */
export function parseTime(time: number) {
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const days = Math.floor(time / DAY);
  const hours = Math.floor((time % DAY) / HOUR);
  const minutes = Math.floor((time % HOUR) / MINUTE);
  const seconds = Math.floor((time % MINUTE) / SECOND);
  const milliseconds = Math.floor(time % SECOND);
  return {
    total: time,
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
  };
}

/**
 * parse函数
 * @param  {object} vm vue数据对象
 * @return {object} 转换后的纯净object
 */
export const parse = function (vm) {
  let ret;
  try {
    ret = JSON.parse(JSON.stringify(vm));
    return ret;
  } catch (e) {
    console.log(e);
    return vm;
  }
};
