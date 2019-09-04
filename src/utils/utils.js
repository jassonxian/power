import lodash from 'lodash';
/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

/**
 * Enter an object, Return a string representing its type.
 *
 * @param o
 * @returns {*}
 */
export function dataType(o) {
  if (typeof o !== 'object') return typeof o;
  if (o === null) return 'null';
  if ((Array.isArray && Array.isArray(o)) || Object.getPrototypeOf(o).constructor.name === 'Array')
    return 'array';
  return 'object';
}

/**
 * Enter an object, Return an object which filtered its empty data recursively.
 *
 * @param data
 * @returns {*}
 */
export function filterEmpty(data) {
  const cache = lodash.cloneDeep(data);
  Object.keys(cache).forEach(key => {
    switch (dataType(cache[key])) {
      case 'string':
        cache[key] = cache[key].trim();
        break;
      case 'null':
        delete cache[key];
        break;
      case 'undefined':
        delete cache[key];
        break;
      case 'array':
        cache[key] = cache[key].filter(item => item !== null && item !== undefined);
        break;
      case 'object':
        cache[key] = filterEmpty(cache[key]);
        break;
      default:
        break;
    }
  });
  return cache;
}

export function toPercentage(v) {
  if (v) {
    return Math.fround(v * 10000) / 100;
  }
  return 0;
}
