/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-02-08 10:56:13
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-02-08 11:01:15
 * @FilePath: /DEMO/src/types/seatArrangement.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface SeatArrangementVo {
  list: SeatItem[];
  title?: string;
  thankWord?: string;
}

export interface SeatItem {
  id: number;
  no: number;
  guestList: GuestItem[];
}

export interface GuestItem {
  name: string;
  phone?: string;
}
