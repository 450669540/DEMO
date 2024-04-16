/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-02-20 11:24:31
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-04-10 17:19:15
 * @FilePath: /DEMO/src/pages/models/user/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ModelType } from "@/types/dva";
import { MemberVO } from "@/types/user";
import { actionTypes } from "./actions";
import { BaseResp } from "@/types/request";
import { getMember } from "@/services/user";
import { EnumStorageKey } from "@/types/local.storage";
import { getSystemParams } from "@/services/common";

export interface SystemMs {
  globalParams: any;
}

const Model: ModelType<SystemMs> = {
  namespace: actionTypes.namespace,
  state: {
    globalParams: undefined,
  },
  effects: {
    *[actionTypes.fetchGlobalParams]({ callback, payload }, { put, call }) {
      const res: BaseResp<MemberVO> = yield call(getSystemParams, payload);
      if (res.success) {
        yield put({
          type: "saveGlobalParams",
          payload: res.data,
        });
      }
      callback && callback(res);
    },
  },
  reducers: {
    saveGlobalParams(state, { payload }) {
      return {
        ...state,
        globalParams: payload,
      };
    },
  },
};

export default Model;
