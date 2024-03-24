/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-02-20 11:24:31
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-03-13 16:12:43
 * @FilePath: /DEMO/src/pages/models/user/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ModelType } from "@/types/dva";
import { MemberVO } from "@/types/user";
import { actionTypes } from "./actions";
import { BaseResp } from "@/types/request";
import { getMember } from "@/services/user";
import { EnumStorageKey } from "@/types/local.storage";

export interface UserMs {
  auth: boolean;
  userInfo?: MemberVO;
}

const Model: ModelType<UserMs> = {
  namespace: actionTypes.namespace,
  state: {
    auth: false,
  },
  effects: {
    *[actionTypes.fetchMember]({ callback, payload }, { put, call }) {
      const res: BaseResp<MemberVO> = yield call(getMember, payload);
      if (res.success) {
        yield put({
          type: "saveMember",
          payload: res.data,
        });
      }
      callback && callback(res);
    },
    *[actionTypes.logout]({ payload }, { put, call }) {
      const res = yield call(logout, payload);
      if (res.success) {
        yield put({
          type: "saveLogout",
          payload: payload,
        });
      }
    },
  },
  reducers: {
    saveMember(state, { payload }) {
      return {
        ...state,
        userInfo: payload,
      };
    },
    saveLogout(state, {}) {
      return {
        ...state,
        auth: false,
        userInfo: undefined,
      };
    },
    [actionTypes.logoutNotRemove](state, {}) {
      return {
        ...state,
        auth: false,
        userInfo: undefined,
      };
    },
  },
};

export default Model;
