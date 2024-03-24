/**
 * 数组通过某一属性排列的排序
 * 升序
 * 用法案例：sorList('name'); name指需要排列的属性名称
 */
export const sortListAsc = (keyName = 'seqno') => {
  return function (objectN, objectM) {
    var valueN = objectN[keyName];
    var valueM = objectM[keyName];
    if (valueN > valueM) {
      return 1;
    }
    else if (valueN < valueM) {
      return -1;
    }
    else {
      return 0;
    }
  };
};

/**
 * 数组通过某一属性排列的排序
 * 降序
 * 用法案例：sorList('name'); name指需要排列的属性名称
 */
export const sortListDesc = (keyName = 'seqno') => {
  return function (objectN, objectM) {
    var valueN = objectN[keyName];
    var valueM = objectM[keyName];
    if (valueN < valueM) {
      return 1;
    }
    else if (valueN > valueM) {
      return -1;
    }
    else {
      return 0;
    }
  };
};
