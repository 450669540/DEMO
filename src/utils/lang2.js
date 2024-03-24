// 数字判断
export const isNumber = (value) => {
  const patrn = /^[-+]?\d+(\.\d+)?$/;
  return patrn.test(value);
};

// 数字判断
export const isPositiveNumber = (value) => {
  const patrn = /^[1-9]\d*$|^\.\d*$|^0\.\d*$|^[1-9]\d*\.\d*$|^0$/;
  return patrn.test(value);
};
// 数组判断
export const isArray = (o) => {
  return Object.prototype.toString.call(o) === '[object Array]';
};
// 事件转日期
export const convertTimestapeToDay = (timestape) => {
  return timestape.substring(0, timestape.indexOf(' ')).replace(/-/g, '.');
};
/**
 * parse函数
 * @param  {object} vm vue数据对象
 * @return {object} 转换后的纯净object
 */
export const parse = function (vm) {
  let ret;
  try {
    ret = JSON.parse(JSON.stringify(vm));
    return ret;
  } catch (e) {
    console.log(e);
    return vm;
  }
};

/**
 * 判断类型
 * @param {Object|String|etc.} val
 * @return {String} object, null，date等类型
 */
const _type = (val) => {
  return Object.prototype.toString.call(val).toLowerCase().slice(8, -1);
};

export const type = _type;

/**
 * 判断类型是否是对象
 * @param {Object|String|etc} obj
 * @return {Boolean}
 */
export const isObject = (obj) => {
  return _type(obj) === 'object';
};

/**
 * 判断类型是否是字符串
 * @param {Object|String|etc} obj
 * @return {Boolean}
 */
export const isString = (obj) => {
  return _type(obj) === 'string';
};

/**
 * 判断 是否是函数
 * typeof 比较准确
 * Object.prototype.toString.call 不一定准确，类型较多
 * @author luoxiaochuan <lxchuan12@163.com>
 * @date 2021-08-19
 */
export const isFunction = (fn) => {
  return typeof fn === 'function';
};

/**
 * 判断是否为空
 * @param {any} text 待校验的变量
 * @return {boolean} 长度不为0的文本则为true|其余均为false
 */
export const isEmpty = (text) => {
  if (text === undefined || text === null) {
    return true;
  }
  if (typeof text === 'string' && text.length === 0) {
    return true;
  } else {
    return false;
  }
};

/**
 * 字符串前置填充0
 * @param  {String|Number}  text
 * @param  {Number}         bit
 * @return {String}
 */
export const fillZero = (text = '', bit = 2) => {
  if (text.toString().length >= bit) {
    return text.toString();
  } else {
    return new Array(bit - text.toString().length + 1).join('0') + text;
  }
};

/**
 * 转接口模型的方法
 * data: 要修改的对象
 * 第二个参数传数组[]:  key为要被改的属性名， value为改成的属性名
 * 用法案例：eachFn(data, [{ key: "detail", value: "details" }, { key: "goodsImg", value: "Img" }])
 */
export const eachFn = (obj, typeArr) => {
  let result;
  const toString = Object.prototype.toString;
  if (toString.call(obj) === '[object Array]') {
    result = [];
    for (let i = 0; i < obj.length; i++) {
      result[i] = eachFn(obj[i], typeArr);
    }
  } else if (toString.call(obj) === '[object Object]') {
    result = {};
    for (const _key in obj) {
      if (obj.hasOwnProperty(_key)) {
        let flag = 0;
        let _value = null;
        for (let j = 0; j < typeArr.length; j++) {
          if (typeArr[j].key === _key) {
            flag = 1;
            _value = typeArr[j].value;
          }
        }
        if (flag) {
          result[_value] = eachFn(obj[_key], typeArr);
        } else {
          result[_key] = eachFn(obj[_key], typeArr);
        }
      }
    }
  } else {
    return obj;
  }
  return result;
};
