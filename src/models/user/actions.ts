/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-02-20 11:24:24
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-03-13 16:11:03
 * @FilePath: /DEMO/src/pages/models/user/actions.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const actionTypes = {
  namespace: "user",
  fetchMember: "fetchMember",
  logoutNotRemove: "logoutNotRemove",
  logout: "logout",
};

/**
 * fetchMember
 */
export const userFetchMember = (payload = {}) => {
  return {
    type: `${actionTypes.namespace}/${actionTypes.fetchMember}`,
    payload,
  };
};

export const userLogout = (payload = {}) => {
  return {
    type: `${actionTypes.namespace}/${actionTypes.logout}`,
    payload,
  };
};
