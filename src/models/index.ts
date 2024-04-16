/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-02-20 11:38:03
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-04-10 17:25:08
 * @FilePath: /DEMO/src/pages/models/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import dva from "@/utils/dva";

import user, { UserMs } from "./user";
import system, { SystemMs } from "./system";

const models = [user, system];

const dvaApp = dva.createApp({
  initialState: {},
  models,
});

export type RootState = {
  user: UserMs;
  system: SystemMs;
};

export const store = dvaApp.getStore();
export default models;
