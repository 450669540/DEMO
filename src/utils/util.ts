import Taro from "@tarojs/taro";
import { isNil } from "@/utils/lang";
import Tips from "@/utils/Tips";
import LogHelper from "@/utils/log";
import { isString } from "@/utils/lang2";
import dayjs from "dayjs";
import { EFormatDatetimeType, Numeric } from "@/types/basic";
import { requirePrivacyAuthorize } from "@/utils/bizUtils/wxAuth";

/**
 * typescript enum 转化为{label,value}
 * @param enumObj
 * @returns
 */
export const transEnum2Option = (enumObj: Object) => {
  const options = [];
  let keys = Object.keys(enumObj);
  keys = keys.sort().splice(0, keys.length / 2);

  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    options.push({
      label: enumObj[key] as string,
      value: parseInt(key),
    });
  }

  return options;
};

// 找到某个值在枚举中对应的key
export const transEnumKeyToStr = (enumObj: Object, value: number) => {
  let keys = Object.keys(enumObj);

  keys = keys.sort().splice(keys.length / 2, keys.length);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    if (enumObj[key] === value) {
      return key;
    }
  }
  return false;
};

/**
 * 派发事件 默认 reload
 * @author luoxiaochuan <luoxiaochuan@xueji.com>
 * @date 2022-12-14
 */
export const emitEvent = (event = "reload", data = {}, delta = 1) => {
  const pages = Taro.getCurrentPages();
  const currentPage = pages[pages.length - delta];
  const eventChannel = currentPage.getOpenerEventChannel();
  if (eventChannel && eventChannel.emit) {
    eventChannel.emit(event, data);
  } else {
    LogHelper.info(
      "emitEvent: eventChannel.emit is not a function",
      data,
      delta
    );
    console.error("eventChannel.emit is not a function", data, delta);
  }
};

export const NOOP = () => {};

export const EMPTY_OBJ = {};

/**
 * 复制到剪切板
 * @author luoxiaochuan <luoxiaochuan@xueji.com>
 * @date 2023-06-30
 */
export const setClipboardData = (e, data) => {
  e.stopPropagation();
  requirePrivacyAuthorize({
    success() {
      Taro.setClipboardData({
        data,
        success: () => {
          Taro.showToast({
            title: "已复制到剪贴板",
          });
        },
      });
    },
  });
};

export const locationModal = () => {
  Tips.modal({
    title: "未开启定位",
    content:
      "hey，您可能未开启微信定位，无法为您推荐就近的门店。请进入系统【设置】>>【隐私】>>【定位服务】中打开开关，并允许微信使用定位服务",
    confirmText: "我知道了",
  });
};

export const locationMessage =
  "抱歉，您可能未开启小程序定位，无法为您推荐就近的门店。请点击去开启按钮 >>【位置信息】>>【使用小程序时允许】";

/**
 * 获取坐标函数
 * @author luoxiaochuan <luoxiaochuan@xueji.com>
 * @date 2022-10-18 17:43:19
 * @returns {Object} { latitude, longitude, ...etc }
 */
export interface getLocationReturnValue {
  userLocation?: boolean;
  systemLocation?: boolean;
  latitude?: Numeric;
  longitude?: Numeric;
  // 其他
  [key: string]: any;
}

export const getLocation = async (): Promise<getLocationReturnValue> => {
  const privacyAuthKeys = [
    "getLocation:fail privacy permission is not authorized",
    "getLocation:fail privacy permission is not authorized in gap",
    "getLocation:fail api scope is not declared in the privacy agreement",
  ];
  const keys = [
    "getLocation:fail auth deny",
    "getLocation:fail:auth denied",
    "getLocation:fail authorize no response",
  ];
  const systemKeys = [
    "getLocation:fail system permission denied",
    "getLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF",
  ];
  const errorMap = {
    "getLocation:fail auth deny": locationMessage,
    "getLocation:fail:auth denied": locationMessage,
    "getLocation:fail authorize no response": locationMessage,
    "getLocation:fail system permission denied":
      "获取定位失败，您需要给微信授权允许获取位置信息",
    "getLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF":
      "获取定位失败，您的手机需要开启系统定位",
    "getLocation:fail:ERROR_NETWORK": "获取定位失败，网络异常",
    "getLocation:fail:timeout": "获取定位失败，网络异常",
  };

  let data = {
    userLocation: true,
    systemLocation: true,
  } as getLocationReturnValue;
  try {
    // eslint-disable-next-line
    const res = await Taro.getLocation({
      type: "gcj02",
    });

    // if(res.errMsg === 'getLocation:ok'){
    // }
    data = {
      // 其他参数，但未使用
      ...(res || {}),
      latitude: isNil(res.latitude) ? "" : res.latitude,
      longitude: isNil(res.longitude) ? "" : res.longitude,
      userLocation: true,
      systemLocation: true,
    };
    return data;
  } catch (error) {
    // console.log(error, res, 'getLocation-error-res');

    // 	wx.getLocation(Object object)
    // wx.getLocation https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.getLocation.html
    // 获取当前的地理位置、速度。

    // fail返回的对象 errMsg 可能返回的值

    // ‘getLocation:fail auth deny’,'getLocation:fail:auth denied','getLocation:fail authorize no response' ：用户在小程序中未授权 （新老版本、平台返回不同）
    // ‘getLocation:fail system permission denied’：未给微信位置授权
    // ‘getLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF’：没开启系统定位
    // ‘getLocation:fail:ERROR_NETWORK’：网络异常
    // ‘getLocation:fail:timeout‘：定位超时

    console.log("getLocation-error", error);
    // openSetting
    // https://developers.weixin.qq.com/miniprogram/dev/api/open-api/setting/wx.openSetting.html
    if (error) {
      //await Tips.info(errorMap[error.errMsg] || error.errMsg, 2000);
      // Tips.modal('需开启手机定位功能', {}, '知道了');
      if (keys.includes(error.errMsg)) {
        try {
          /**
           * 强制弹窗去开启
           * @author luoxiaochuan <luoxiaochuan@xueji.com>
           * @date 2023-07-29
           *
            您需先在小程序设置中允许获取位置信息才能定位成功。
          await Tips.confirm(locationMessage, '去开启', '取消');
          const settingRes = await Taro.openSetting();
          data.userLocation = settingRes.authSetting?.['scope.userLocation'] || false;
            */
          data.userLocation = false;
          // 取消
          data.systemLocation = true;
        } catch (e) {
          data.userLocation = false;
          data.systemLocation = true;
        }
      }

      // 微信定位权限，或者系统未开启定位
      if (systemKeys.includes(error.errMsg)) {
        // 微信定位或者系统级定位
        data.systemLocation = false;
        // （若您已开启定位权限但仍然无法正常使用，请尝试打开【微信】定位，或者手机系统定位）
        locationModal();
      }

      // 用户隐私拒绝了，隐私权限
      if (
        error.errno === 104 ||
        error.errno === 103 ||
        privacyAuthKeys.includes(error.errMsg)
      ) {
        data.userLocation = false;
      }

      console.log("getLocation-error-2", data);

      return data;
    }
    console.log(error);
    LogHelper.error(error);
    //Tips.info(error);
  }
  return data;
};

// 移除首尾空格，字符串容错
export const trim = (val) => {
  return isString(val) ? val.trim() : "";
};

/**
 * @description 字符串指定位置替换成指定字符，例如：CZXUEJI00120230810000002替换为*********************002
 * @param str 字符串
 * @param startIndex 开始下标
 * @param endIndex 结束下标
 * @param replaceCharacters 替换字符
 * @returns 字符串
 */
export const replaceCharact = (
  str = "",
  startIndex = 0,
  endIndex,
  replaceCharacters = "*"
) => {
  if (!endIndex) {
    endIndex = str?.length - 1;
  }
  let subStringText = str?.substring(startIndex, endIndex);
  const array = subStringText?.split("");
  for (let i = 0; i < array?.length; i++) {
    array[i] = replaceCharacters;
  }
  subStringText =
    str.substring(0, startIndex) +
    array?.join("") +
    str.substring(endIndex, str?.length);
  return subStringText;
};

/**
 *
 * @param dateTime
 * @returns
 */
export const formatDatetime = (
  dateTime: string,
  format = EFormatDatetimeType.HORIZONTAL_BAR_HOUR_MIN
) => {
  return dayjs(dateTime).format(
    format === EFormatDatetimeType.YEAR_MONTH_DAY_HOUR_MIN
      ? "YYYY年MM月DD日 HH:mm"
      : format === EFormatDatetimeType.HORIZONTAL_BAR_HOUR_MIN
      ? "YYYY-MM-DD HH:mm"
      : format === EFormatDatetimeType.YEAR_MONTH_DAY
      ? "YYYY年MM月DD日"
      : format === EFormatDatetimeType.HORIZONTAL_BAR_TO_DAY
      ? "YYYY-MM-DD"
      : format === EFormatDatetimeType.YEAR_MONTH
      ? "YYYY年MM月"
      : format === EFormatDatetimeType.SLASH_YEAR_MONTH_DAY
      ? "YYYY/MM/DD"
      : format === EFormatDatetimeType.SLASH_YEAR_MONTH_DAY_HOUR_MIN
      ? "YYYY/MM/DD HH:mm"
      : format === EFormatDatetimeType.MONTH_DAY
      ? "MM月DD日"
      : format === EFormatDatetimeType.HORIZONTAL_BAR_MONTH_DAY_HOUR_MIN
      ? "MM-DD HH:mm"
      : "YYYY-MM"
  );
};

/**
 * @description 指定长度字符串加...
 * @param txt
 * @param number
 * @param noEllipsis
 * @returns
 */
export const limitNumber = (
  txt: string,
  number: number,
  noEllipsis?: boolean
) => {
  const str = txt;
  let len = 0;
  let index = 0;
  if (!str) {
    return;
  }
  for (let i = 0; i < str?.length; i++) {
    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
      len += 2;
    } else {
      len++;
    }
    if (len <= number * 2) {
      index = i;
    }
  }

  return len > number * 2
    ? str.substring(0, index + 1) + (!noEllipsis ? "..." : "")
    : str;
};

export const judgeStringExceedSpecifiedLength = (
  txt: string,
  number: number
) => {
  const str = txt;
  let len = 0;
  if (!str) {
    return;
  }
  for (let i = 0; i < str?.length; i++) {
    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
      len += 2;
    } else {
      len++;
    }
  }
  return len > number * 2;
};

export function formatNumber(value) {
  var allowDot =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var allowMinus =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (allowDot) {
    value = trimExtraChar(value, ".", /\./g);
  } else {
    value = value.split(".")[0];
  }
  if (allowMinus) {
    value = trimExtraChar(value, "-", /-/g);
  } else {
    value = value.replace(/-/, "");
  }
  var regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;
  return value.replace(regExp, "");
}

function trimExtraChar(value, char, regExp) {
  var index = value.indexOf(char);
  if (index === -1) {
    return value;
  }
  if (char === "-" && index !== 0) {
    return value.slice(0, index);
  }
  return value.slice(0, index + 1) + value.slice(index).replace(regExp, "");
}

/**
 * 解析模版 json 数组，默认返回数组
 * @author luoxiaochuan <luoxiaochuan@xueji.com>
 * @date 2023-12-04
 */
export const parseTemplateJson = (json, config = []) => {
  try {
    config = JSON.parse(json);
  } catch (e) {
    console.log(e);
  }
  return config;
};

// 根据经纬度计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
export const getDistances = (lat1, lng1, lat2, lng2) => {
  let EARTH_RADIUS = 6378.137; // 地球半径
  let radLat1 = (lat1 * Math.PI) / 180.0; //lat1 * Math.PI / 180.0=>弧度计算
  let radLat2 = (lat2 * Math.PI) / 180.0;
  let a = radLat1 - radLat2;
  let b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
  let s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
      )
    );
  s = s * EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000; // 输出为公里
  return { m: s * 1000, km: Number(s.toFixed(2)) };
};
