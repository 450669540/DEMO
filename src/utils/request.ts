import Taro from "@tarojs/taro";
import { EnumStorageKey } from "@/types/local.storage";
import dva from "@/utils/dva";
import { XnToken } from "@/types/auth";
import { getAccountInfo } from "@/utils/local.storage";
// import {
//   isEmptyObject,
//   // isNil
// } from "@/utils/lang";
// import { EnumLoginCode, userLogin } from "@/utils/auth";
import LogHelper from "@/utils/log";
import { NOT_LOGIN_CODE, REAL_API_SERVER_URL } from "@/const";
import Tips from "@/utils/Tips";
// import {
//   userLogin as userLoginAction,
//   userLogoutNotRemove,
// } from "@/models/user/actions";
import { isObject } from "@/utils/lang2";

const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  // 404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  404: "服务器异常，请重新操作试试",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

const commonWhiteList = [
  {
    name: "获取门店模版的接口",
    url: "/MultiChannel/api/FrontTemplate/GetNewSimplePageContent",
    message: "当前门店还未配模板",
  },
];

// 这些错误日志不捕获
const whiteList = [
  ...commonWhiteList,
  {
    name: "首次登录，需手机号登录",
    url: "/MultiChannel/api/WeixinMP/DecodeEncryptedData",
    message: "未注册，请点击快捷登录；",
  },
  {
    name: "订单支付接口",
    url: "/Sales/api/Online/orderPay",
    message: "订单已完成支付",
  },
  // 后端已经处理为不报错
  // {
  //   name: '首页弹窗广告',
  //   url: '/Market/api/Online/GetJumpCouponImg',
  //   message: '广告图未启用或已过期',
  // },
];

// 事件白名单
const whiteListReportEvent = [...commonWhiteList];

/**
 * 自动登录逻辑
 * @param toLogin
 * @param requestParams
 * @returns
 */
// const autoLogin = async ({ toLogin, requestParams, res }) => {
//   // 清除登录状态
//   const dispatch = dva.getDispatch();
//   if (toLogin !== false) {
//     Taro.showLoading({ mask: true, title: "" });
//     const { loginCode, customer } = await userLogin();
//     Taro.hideLoading();
//     console.log(loginCode);
//     if (loginCode === EnumLoginCode.登录成功) {
//       dispatch(
//         userLoginAction({
//           userInfo: customer,
//         })
//       );

//       // 重新调用接口

//       const header = requestParams.header;

//       delete header.Authorization;

//       // console.log('resReq-75', resReq);
//       return request.request(
//         {
//           ...requestParams,
//           url: requestParams.url.replace(REAL_API_SERVER_URL, ""),
//           header,
//         },
//         requestParams.method
//       );
//     } else if (loginCode === EnumLoginCode.获取token失败) {
//       // Taro.showToast({ title: '请登录', icon: 'none', mask: true, duration: 1000 });
//       Tips.info(res.message || "无访问权限，请先登录");
//       const jumped = Taro.getStorageSync(EnumStorageKey.已自动跳转登录页);
//       if (!jumped) {
//         const pages = Taro.getCurrentPages();
//         const last = pages[pages.length - 1];
//         Taro.setStorageSync(EnumStorageKey.已自动跳转登录页, true);
//         // 首次 string ''
//         if (last?.route && loginRouter().indexOf(last?.route)) {
//           if (!isEmptyObject(last?.options)) {
//             Taro.reLaunch({
//               url:
//                 loginRouter() +
//                 "?from=" +
//                 last.route +
//                 "&fromParams=" +
//                 JSON.stringify(last.options),
//             }).finally(() =>
//               Taro.removeStorageSync(EnumStorageKey.已自动跳转登录页)
//             );
//           } else {
//             Taro.reLaunch({
//               url: loginRouter() + "?from=" + last.route,
//             }).finally(() =>
//               Taro.removeStorageSync(EnumStorageKey.已自动跳转登录页)
//             );
//           }
//         }
//       }

//       return { ...res, success: false, message: "无访问权限，请先登录" };
//     } else {
//       return {
//         ...res,
//         success: false,
//         message: res.data.message || "无访问权限，请先登录",
//       };
//     }
//   } else {
//     return {
//       ...res,
//       success: false,
//       message: res.data.message || "无访问权限，请先登录",
//     };
//   }
// };

// request拦截器
const interceptor = async function (chain) {
  const requestParams = chain.requestParams;
  const { url, toLogin, manualToast = false } = requestParams;

  // console.log(url, toLogin, requestParams, 'url, toLogin, requestParams');
  try {
    const res = await chain.proceed(requestParams);
    const data = isObject(res.data) ? res.data : {};
    let bool = data?.code === NOT_LOGIN_CODE || data?.code === undefined;
    if (res.statusCode !== 200) {
      LogHelper.warn(
        "接口请求：statusCode !== 200",
        "请求参数",
        requestParams,
        "响应参数",
        res
      );
      return { success: false, message: codeMessage[res.statusCode || 500] };
    }
    let reportEventData = { requestParams };
    let lastRes = {
      ...data,
      success: data?.code === 1,
    };
    if (!lastRes.success) {
      // @ts-ignore
      reportEventData.lastRes = lastRes;
    }
    if (bool) {
      // @ts-ignore，简单点，减少日志输出
      reportEventData = { url: requestParams?.url, message: "code102未登录" };
    }
    if (Taro.canIUse("reportEvent")) {
      const whiteListReportEventBool = whiteListReportEvent.some(
        (el) =>
          requestParams?.url?.indexOf(el.url) > -1 &&
          lastRes?.message?.indexOf(el.message) > -1
      );
      if (!whiteListReportEventBool) {
        Taro.reportEvent("request_report", reportEventData);
      }
    }
    if (!bool) {
      if (!lastRes.success) {
        if (!manualToast) {
          Tips.info(lastRes.message);
        }
        // LogHelper.error(`【${url}】【API RESPONSE FALSE】：${lastRes?.message}`);
        const whiteListBool = whiteList.some(
          (el) =>
            requestParams?.url?.indexOf(el.url) > -1 &&
            lastRes?.message?.indexOf(el.message) > -1
        );
        if (!whiteListBool) {
          LogHelper.warn(
            "接口获取数据异常",
            "请求参数",
            requestParams,
            "响应参数",
            lastRes
          );
        }
      }
      return lastRes;
    }
    // 跳转
    // 清除登录状态
    // const dispatch = dva.getDispatch();
    // dispatch(userLogoutNotRemove());
    if (!toLogin) {
      return {
        ...data,
        success: false,
        message: data?.message || "无访问权限，请先登录",
      };
    }
    // Taro.showToast({ title: '请登录', icon: 'none', mask: true, duration: 1000 });
    Tips.info(data?.message || "无访问权限，请先登录");
    const jumped = Taro.getStorageSync(EnumStorageKey.已自动跳转登录页);
    if (!jumped) {
      const pages = Taro.getCurrentPages();
      const last = pages[pages.length - 1];
      Taro.setStorageSync(EnumStorageKey.已自动跳转登录页, true);
      // 首次 string ''
      // if (last?.route && last?.route !== loginRouterWithoutPrefix()) {
      //   if (!isEmptyObject(last?.options)) {
      //     Taro.reLaunch({
      //       url:
      //         loginRouter() +
      //         "?from=" +
      //         last.route +
      //         "&fromParams=" +
      //         JSON.stringify(last.options),
      //     }).finally(() =>
      //       Taro.removeStorageSync(EnumStorageKey.已自动跳转登录页)
      //     );
      //   } else {
      //     Taro.reLaunch({ url: loginRouter() + "?from=" + last.route }).finally(
      //       () => Taro.removeStorageSync(EnumStorageKey.已自动跳转登录页)
      //     );
      //   }
      // }
    }

    return {
      ...data,
      success: false,
      message: data.message || "无访问权限，请先登录",
    };
  } catch (err) {
    console.log("err", err);
    try {
      console.log("http错误", err, "请求参数", requestParams);
      LogHelper.error("http错误", err, "请求参数", requestParams);
    } catch (e) {}
    return { success: false, message: "网络错误，请稍后重试" };
  }
};

Taro.addInterceptor(interceptor);

interface RequestParams {
  url: string;
  withToken?: boolean;
  /**是否跳转到登录 */
  toLogin?: boolean;
  orgzInfo?: boolean;
  appId?: boolean;
  systemTypeId?: boolean;
  manualToast?: boolean;
  [key: string]: any;
}

// let refreshToken = false

const request = {
  async request(
    options: any,
    method?:
      | "GET"
      | "OPTIONS"
      | "HEAD"
      | "POST"
      | "PUT"
      | "DELETE"
      | "TRACE"
      | "CONNECT"
  ) {
    try {
      const getNetworkTypeRes = await Taro.getNetworkType();
      const weakNet = Taro.getStorageSync(EnumStorageKey.弱网状态);
      if (getNetworkTypeRes.networkType === "none" || weakNet) {
        Tips.info("当前网络异常，请检查您的网络是否正常");
        return;
      }
    } catch (e) {
      LogHelper.error("网络异常:" + JSON.stringify(e));
    }
    const {
      url,
      withToken,
      appId = false,
      // TODO: 确认
      systemTypeId = true,
      orgzInfo = false,
    } = options;

    if (options.data) {
      let newData = {};
      for (let key in options.data) {
        if (options.data[key] !== undefined && options.data[key] !== null) {
          // if ((method || 'GET') === 'GET' && Array.isArray(options.data[key])) {
          //   // 数组转换 [1,2,3] => 1,2,3
          //   newData[key] = options.data[key].join(',');
          // } else {
          //   newData[key] = options.data[key];
          // }

          newData[key] = options.data[key];
        }
      }

      // 全局参数
      let globalOptions: {
        appId: string;
        systemTypeId: number;
        orgId: number;
        orgCode: string;
      } = {};
      if (appId) {
        const accountInfo = getAccountInfo();
        globalOptions.appId = accountInfo.miniProgram.appId;
      }
      // if (systemTypeId) {
      //   // @ts-ignore
      //   globalOptions.systemTypeId = SYSTEM_TYPE_ID;
      // }

      options.data = { ...globalOptions, ...newData };
    }

    // 适配restful id get resource: /url/:id/
    const urlParams = /(\/:\w+)/gm.exec(url);

    let realURL = url;

    const optionData = Array.isArray(options.data)
      ? options.data
      : {
          ...options.data,
        };

    try {
      if (urlParams !== null) {
        const params = Array.from(new Set([...urlParams]));

        params
          .map((param: string) => {
            const key = (/\w+/.exec(param) ?? [""])[0];
            return {
              urlParam: param,
              key,
            };
          })
          .forEach((param: any) => {
            if (optionData.hasOwnProperty(param.key)) {
              realURL = realURL.replace(
                param.urlParam,
                `/${optionData[param.key]}`
              );
              delete optionData[param.key];
            } else {
              throw new Error(
                `Request to ${url} has param "${param.key}" but value not found`
              );
            }
          });
      }
    } catch (err) {
      console.error("request try catch 错误", err);
      LogHelper.info("request try catch 错误", err);
    }

    let innerHeader = {};
    let cookieHeader = {};
    if (withToken !== false) {
      const JWTToken = Taro.getStorageSync(
        EnumStorageKey.用户登录状态
      ) as XnToken;
      if (JWTToken) {
        innerHeader = Object.assign(innerHeader, {
          Authorization: `Bearer ${JWTToken}`,
        });
      }
    }
    const sessionId = Taro.getStorageSync("session_id");
    if (sessionId) {
      cookieHeader = { cookie: sessionId };
    }

    let lastUrl = "";
    if (!realURL.startsWith(REAL_API_SERVER_URL)) {
      lastUrl = `${REAL_API_SERVER_URL}${realURL}`;
    } else {
      lastUrl = realURL;
    }

    return Taro.request({
      ...options,
      // gateWay,
      data: optionData,
      method: method || "GET",
      url: lastUrl,
      header: {
        ...innerHeader,
        ...cookieHeader,
        ...options.header,
      },
      success: (res) => {
        if (res.header["Set-Cookie"]) {
          Taro.setStorageSync("session_id", res.header["Set-Cookie"]);
        }
      },
    });
  },
  get(options: RequestParams) {
    return this.request({
      ...options,
    });
  },
  post(options: RequestParams) {
    return this.request(
      {
        ...options,
      },
      "POST"
    );
  },
  put(options: RequestParams) {
    return this.request(
      {
        ...options,
      },
      "PUT"
    );
  },
  delete(options: RequestParams) {
    return this.request(
      {
        ...options,
      },
      "DELETE"
    );
  },
};

export default request;
