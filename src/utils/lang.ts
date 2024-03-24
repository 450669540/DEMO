import { isObject } from './lang2';

/**
 * 是否为空
 * @param value
 * @returns
 */
export const isNil = (value: any) => value === null || value === undefined || value === '';

/**
 * 判断是否空数组
 * @param {any} val
 * @return {boolean}
 */
export const isEmptyArray = (val: any): boolean => isNil(val) || (Array.isArray(val) && val.length === 0);

/**
 * 判断是否对象(非数组)
 * @param {any} val
 * @return {boolean}
 */
// export const isObject = (val: any): boolean => typeof val === 'object' && !Array.isArray(val);

/**
 * 判断是否空对象(非数组)
 * @param {any} val
 * @return {boolean}
 */
export const isEmptyObject = (val: any): boolean =>
  val === null || val === undefined || (isObject(val) && Object.keys(val).length === 0);

/**
 * 判断是否空对象(非数组)，所有的值为空也返回true
 * @param {any} val
 * @return {boolean}
 */
export const isNilObject = (val: any): boolean =>
  val === null ||
  val === undefined ||
  (isObject(val) && Object.keys(val).length === 0) ||
  (isObject(val) && Object.keys(val).every((key) => isEmptyArray(val[key])));

/**
 * 是否为空字符串
 * @param value
 * @returns
 */
export const isEmptyString = (value: any) => value === null || value === undefined || value === '';

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key: string, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    // eslint-disable-next-line consistent-return
    return value;
  };
};

/**
 * 一个更加安全的 stringify，可以解决循环依赖的问题
 * @param value
 */
export const stringify = (value: any) => JSON.stringify(value, getCircularReplacer());

/**
 * 字符串转大写中文
 * @param n
 * @returns
 */
export function toNumberChinese(n: string) {
  let num = n;
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(num)) {
    return '数据非法'; // 判断数据是否大于0
  }

  let unit = '千百拾亿千百拾万千百拾元角分';
  let str = '';
  num += '00';

  const indexpoint = num.indexOf('.'); // 如果是小数，截取小数点前面的位数

  if (indexpoint >= 0) {
    num = num.substring(0, indexpoint) + num.substr(indexpoint + 1, 2); // 若为小数，截取需要使用的unit单位
  }

  unit = unit.substr(unit.length - num.length); // 若为整数，截取需要使用的unit单位
  for (let i = 0; i < num.length; i++) {
    str += '零壹贰叁肆伍陆柒捌玖'.charAt(num.charAt(i)) + unit.charAt(i); // 遍历转化为大写的数字
  }

  return str
    .replace(/零(千|百|拾|角)/g, '零')
    .replace(/(零)+/g, '零')
    .replace(/零(万|亿|元)/g, '$1')
    .replace(/(亿)万|壹(拾)/g, '$1$2')
    .replace(/^元零?|零分/g, '')
    .replace(/元$/g, '元整'); // 替换掉数字里面的零字符，得到结果
}
