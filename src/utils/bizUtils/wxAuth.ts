/**
 * 微信授权
 * https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html
 * @author luoxiaochuan <luoxiaochuan@xueji.com>
 * @date 2023-11-03
 */

import Taro from "@tarojs/taro";
import { locationMessage } from "@/utils/util";
import Tips from "@/utils/Tips";
//import { shopSaveAuthSettingLocation } from '@/models/shop/actions';
import { useDispatch } from "react-redux";

interface Param {
  success?: (res) => void;
  fail?: (res) => void;
}

export const requirePrivacyAuthorize = (options: Param = {}) => {
  const { success = () => {}, fail = () => {} } = options;
  // @ts-ignore
  if (Taro.requirePrivacyAuthorize) {
    // @ts-ignore
    Taro.requirePrivacyAuthorize({
      success: (res) => {
        console.log("用户同意了隐私协议 或 无需用户同意隐私协议");
        // 用户同意隐私协议后给昵称input聚焦
        success && success(res);
      },
      fail: (res) => {
        console.log("用户拒绝了隐私协议");
        fail && fail(res);
      },
    });
  } else {
    success && success({});
  }
};

/**
 * 获取位置信息的授权
 * https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html
 * @author luoxiaochuan <luoxiaochuan@xueji.com>
 * @date 2023-11-03
 */
export const getUserLocationAsync2 = async () => {
  let result = {
    userLocation: false,
  };
  // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
  const settingRes = await Taro.getSetting();
  if (!settingRes.authSetting["scope.userLocation"]) {
    try {
      const authorizeRes = await Taro.authorize({
        scope: "scope.userLocation",
      });
      console.log("err-authorize-1", authorizeRes);
      result.userLocation = authorizeRes?.authSetting?.["scope.userLocation"];
    } catch (err) {
      console.log(err, "err-authorize");
      await Tips.confirm(locationMessage, "去开启", "取消");
      const settingRes2 = await Taro.openSetting();
      console.log(settingRes2, "settingRes2");
      result.userLocation =
        settingRes2.authSetting?.["scope.userLocation"] || false;
    }
  }
  return result;
  /**
 *
Taro.openSetting({
  success(res) {
    // console.log(res, 'Taro.openSetting');
    dispatch(
      shopSaveAuthSettingLocation({
        userLocation: res.authSetting?.['scope.userLocation'] || false,
      }),
    );
  },
  fail() {
    dispatch(
      shopSaveAuthSettingLocation({
        userLocation: false,
      }),
    );
  },
});
 *
 */
};

export const getUserLocationAsync = (): Promise<{ userLocation: boolean }> => {
  return new Promise((resolve, reject) => {
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    Taro.getSetting({
      success(res) {
        console.log("Taro.getSetting-1", res);
        if (!res.authSetting["scope.userLocation"]) {
          Taro.authorize({
            scope: "scope.userLocation",
            success(res2) {
              console.log("Taro.getSetting-2", res2);
              resolve({ userLocation: true });
            },
            fail(err) {
              console.log("Taro.getSetting-3", err);
              Tips.confirm(locationMessage, "去开启", "取消")
                .then(() => {
                  Taro.openSetting({
                    success(res3) {
                      console.log("Taro.getSetting-4", res3);
                      resolve({
                        userLocation:
                          res3.authSetting?.["scope.userLocation"] || false,
                      });
                    },
                    fail() {
                      resolve({ userLocation: false });
                    },
                  });
                })
                .catch(() => {
                  resolve({ userLocation: false });
                });
            },
          });
        } else {
          resolve({
            userLocation: true,
          });
        }
      },
    });
  });
};

/**
 * dispatch 定位
 * @author luoxiaochuan <luoxiaochuan@xueji.com>
 * @date 2023-11-03
 */
export const useDispatchUserLocation = () => {
  const dispatch = useDispatch();
  const dispatchUserLocation = (callback = (val) => {}) => {
    // 先触发用户隐私弹窗
    requirePrivacyAuthorize({
      success(res1) {
        console.log(res1, "res-success");
        getUserLocationAsync().then((res) => {
          console.log("getUserLocationAsync-1", res);
          callback && callback(res);
          // dispatch(
          //   shopSaveAuthSettingLocation({
          //     userLocation: res?.userLocation,
          //   }),
          // );
        });
      },
      fail: (res) => {
        console.log(res, "res-fail");
      },
    });
  };
  return {
    dispatchUserLocation,
  };
};
