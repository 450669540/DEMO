/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-02-20 11:24:24
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-04-10 17:23:36
 * @FilePath: /DEMO/src/pages/models/user/actions.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const actionTypes = {
  namespace: "system",
  fetchGlobalParams: "fetchGlobalParams",
};

/**
 * systemFetchGlobalParams
 */
export const systemFetchGlobalParams = (payload = {}) => {
  return {
    type: `${actionTypes.namespace}/${actionTypes.fetchGlobalParams}`,
    payload,
  };
};
