/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-01-08 10:29:04
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-02-21 11:45:58
 * @FilePath: /xmall-mini-partner/src/utils/upload.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Tips from "@/utils/Tips";
import Taro from "@tarojs/taro";
import { SERVICES, REAL_API_SERVER_URL } from "@/const";

interface Result {
  fullpath: string;
  id: string;
}

export enum EnumUploadFileCategoryId {
  头像 = 54,
  申请退货 = 25,
  身份证正面 = 60,
  身份证反面 = 61,
}

export async function uploadFile(filePath: string) {
  return new Promise<Result>((resolve, reject) => {
    let innerHeader = {
      "Content-Type": "multipart/form-data",
      accept: "application/json",
    };

    Taro.uploadFile({
      // @ts-ignore
      url: `${API_SERVER_URL}/uploadAvatar`,
      filePath,
      name: "fileData",
      header: {
        ...innerHeader,
      },
      success: (res) => {
        console.log(res, "success");
        if ([200, 201, 204].includes(res.statusCode)) {
          let item = {};
          try {
            const result = JSON.parse(res.data);
            item = result.data || "";
          } catch (error) {
            item = "";
          }

          resolve(item);
        }
      },
      fail: (e) => {
        console.log("fail", e);
        Tips.info(e.errMsg || "上传失败");

        reject(e);
      },
    });
  });
}
