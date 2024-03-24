/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-02-18 09:56:32
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-02-19 09:29:18
 * @FilePath: /DEMO/src/utils/global.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import MathHelper from "@/utils/math";
import { isNil } from "@/utils/lang";

/**
 * oss图片地址统一取设计稿2倍
 * @param url oss地址
 * @param width 设计稿宽度px
 * @param height 设计稿高度px
 */
interface formatOssUrlOptions {
  minifiy: boolean;
}

export const formatOssUrl = (
  url: string,
  width: number,
  height: number,
  options: formatOssUrlOptions = { minifiy: true }
) => {
  if (isNil(url)) {
    return null;
  }
  if (!options.minifiy) {
    return url;
  }
  // 华为云
  // myhuaweicloud    x-oss-process  ->  x-image-process
  let str = "x-oss-process";
  if (url.indexOf("myhuaweicloud") > -1) {
    str = "x-image-process";
  }
  // 不支持小数，向下取整
  return `${url}?${str}=image/resize,m_lfit,w_${Math.floor(
    MathHelper.multiply(width, 2)
  )},h_${Math.floor(MathHelper.multiply(height, 2))}`;
};
