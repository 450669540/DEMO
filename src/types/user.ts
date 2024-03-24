/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-02-20 11:20:51
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-02-20 11:21:50
 * @FilePath: /DEMO/src/types/user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface MemberVO {
  nick_name: string;
  sex: number;
  avatar: string;
  create_on: Date;
  update_on: Date;
  phone?: string;
}
