import Taro from "@tarojs/taro";
import { Toast } from "@taroify/core";
import { isObject, isString } from "@/utils/lang2";
import { isNil } from "@/utils/lang";
import { DEFAULT_THEME } from "@/const";
import { EnumStorageKey } from "@/types/local.storage";

interface infoOptions {
  useComponents?: boolean;
  duration?: number;
  backdrop?: boolean;
}

export const TipInfoToastId = "toast";

/**
 * 提示与加载工具类
 */
export default class Tips {
  static isLoading = false;
  static pause = false;

  /**
   * info 没有图标 字数不限，最多两行
   * 不显示图标，此时 title 文本最多可显示两行，1.9.0及以上版本支持
   * @author luoxiaochuan <luoxiaoxchuan@comteck.cn>
   * @date 2019-07-01
   * @link https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/Taro.showToast.html
   */
  static info(title, duration: infoOptions | number = 1500) {
    // 默认支持长消息， useComponents
    // 汉字文字长度大于24，换行了，使用组件，支持长消息
    let useComponents = isString(title) && title.length > 24;
    let options = {};
    if (isObject(duration)) {
      options = duration;
      // https://taroify.github.io/taroify.com/components/toast/
      if (!isNil(options.useComponents)) {
        useComponents = !!options.useComponents;
      }
      duration = options.duration || 1500;
    }
    // 配合 自定义的 PageContainer 组件里的 Toast 组件，支持长消息显示
    // 默认支持长消息
    if (useComponents) {
      Toast.open({
        // 无效
        // selector: TipInfoToastId,
        // backdrop: true,
        children: title,
        zIndex: 9999999,
        ...options,
      });
    } else {
      Taro.showToast({
        title: title,
        icon: "none",
        mask: true,
        duration: duration,
      });
    }
    if (duration > 0) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, duration);
      });
    }
  }

  /**
   * 弹出提示框
   */

  static success(title, duration = 500) {
    Taro.showToast({
      title: title,
      icon: "success",
      mask: true,
      duration: duration,
    });
    if (duration > 0) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(true);
        }, duration);
      });
    }
  }

  static toast(title, onHide, icon = "success") {
    Taro.showToast({
      title: title,
      icon: icon,
      mask: true,
      duration: 500,
    });
    // 隐藏结束回调
    if (onHide) {
      setTimeout(() => {
        onHide();
      }, 500);
    }
  }

  /**
   * 弹出确认窗口
   */
  static modal(
    options: { title?: string; content: string; confirmText?: string } | string
  ) {
    let title = "",
      content = "",
      confirmText = "确认";
    if (isObject(options)) {
      title = options.title || "温馨提示";
      content = options.content || "";
      confirmText = options.confirmText || "确认";
    }
    if (isString(options)) {
      content = options as string;
    }

    const theme = Taro.getStorageSync(EnumStorageKey.店铺风格);
    return new Promise((resolve, reject) => {
      Taro.showModal({
        title,
        content,
        confirmText,
        confirmColor: theme?.primaryColor || DEFAULT_THEME.primaryColor,
        showCancel: false,
        success: () => {
          resolve(true);
        },
        fail: () => {
          reject(false);
        },
      });
    });
  }

  /**
   * 弹出确认窗口
   */
  static confirm(
    text: string | { title: string; content: string },
    confirmText = "确定",
    cancelText = "取消"
  ) {
    const theme = Taro.getStorageSync(EnumStorageKey.店铺风格);
    return new Promise((resolve, reject) => {
      let title = "温馨提示";
      let content = text;
      if (isObject(text)) {
        title = text.title;
        content = text.content;
      }

      Taro.showModal({
        title: title,
        content: content,
        confirmText: confirmText,
        cancelText: cancelText,
        confirmColor: theme?.primaryColor || DEFAULT_THEME.primaryColor,
        showCancel: true,
        success: (res) => {
          if (res.confirm) {
            resolve(res);
          } else if (res.cancel) {
            reject(res);
          }
        },
        fail: (res) => {
          reject(res);
        },
      });
    });
  }

  /**
   * 警告框
   */
  /**
   * 目前没有用到，注释以减少体积
   * 图标image文件移除
   * @author luoxiaochuan <luoxiaoxchuan@comteck.cn>
   * @date 2021-06-08
   */
  // static alert(title){
  // 	Taro.showToast({
  // 		title: title,
  // 		image: '/static/images/icons/alert.png',
  // 		mask: true,
  // 		duration: 2000
  // 	});
  // 	return new Promise((resolve, reject) => {
  // 		setTimeout(() => {
  // 			resolve();
  // 		}, 2000);
  // 	});
  // }

  /**
   * 错误框
   */
  /**
   * 目前没有用到，注释以减少体积
   * @author luoxiaochuan <luoxiaoxchuan@comteck.cn>
   * @date 2021-06-08
   */
  // static error(title, onHide){
  // 	Taro.showToast({
  // 		title: title,
  // 		image: '/static/images/icons/error.png',
  // 		mask: true,
  // 		duration: 2000
  // 	});
  // 	// 隐藏结束回调
  // 	if(onHide){
  // 		setTimeout(() => {
  // 			onHide();
  // 		}, 2000);
  // 	}
  // }

  /**
   * 弹出下拉动作栏
   */
  /**
   * 目前没有用到，注释以减少体积
   * @author luoxiaochuan <luoxiaoxchuan@comteck.cn>
   * @date 2021-06-08
   */
  // static action(...items){
  // 	return new Promise((resolve, reject) => {
  // 		Taro.showActionSheet({
  // 			itemList: items,
  // 			success: function (res){
  // 				const result = {
  // 					index: res.tapIndex,
  // 					text: items[res.tapIndex]
  // 				};
  // 				resolve(result);
  // 			},
  // 			fail: function (res){
  // 				reject(res.errMsg);
  // 			}
  // 		});
  // 	});
  // }

  /**
   * 目前没有用到，注释以减少体积
   * @author luoxiaochuan <luoxiaoxchuan@comteck.cn>
   * @date 2021-06-08
   */
  // static actionWithFunc(items, ...functions){
  // 	Taro.showActionSheet({
  // 		itemList: items,
  // 		success: function (res){
  // 			const index = res.tapIndex;
  // 			if(index >= 0 && index < functions.length){
  // 				functions[index]();
  // 			}
  // 		}
  // 	});
  // }

  static share(title, url, desc) {
    return {
      title: title,
      path: url,
      desc: desc,
      success: function (res) {
        Tips.toast("分享成功");
      },
    };
  }

  static shareWithImg(title, url, desc, img) {
    return {
      title: title,
      path: url,
      desc: desc,
      imageUrl: img,
      success: function (res) {
        Tips.toast("分享成功");
      },
    };
  }

  static setLoading() {
    this.isLoading = true;
  }
}
