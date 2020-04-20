import React from 'react';
import PromiseRender from './PromiseRender';

function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
}

/**
 * 通用权限检查方法
 * Common check permissions method
 * @param { 你的权限 Your permission description  type:string} code
 * @param { 权限判定 Permission judgment type string |array | Promise | Function } codes
 * @param { 通过的组件 Passing components } target
 * @param { 未通过的组件 no pass components } Exception
 * @param { 未通过的组件 no pass components } valid
 */
const checkPermissions = (code, codes, target, Exception, valid) => {
  // 没有判定权限.默认查看所有
  // Retirement code, return target;
  if (!code) {
    return target;
  }
  // 数组处理
  if (Array.isArray(codes)) {
    if (codes.indexOf(code) >= 0) {
      return target;
    }
    if (Array.isArray(code)) {
      for (let i = 0; i < code.length; i += 1) {
        const element = code[i];
        if (codes.indexOf(element) >= 0) {
          return target;
        }
      }
    }
    return Exception;
  }

  // string 处理
  if (typeof codes === 'string') {
    if (codes === code) {
      return target;
    }
    if (Array.isArray(code)) {
      for (let i = 0; i < code.length; i += 1) {
        const element = code[i];
        if (codes === element) {
          return target;
        }
      }
    }
    return Exception;
  }

  // Promise 处理
  if (isPromise(valid)) {
    return <PromiseRender ok={target} error={Exception} promise={valid} />;
  }

  // Function 处理
  if (typeof valid === 'function') {
    try {
      const bool = valid(code);
      // 函数执行后返回值是 Promise
      if (isPromise(bool)) {
        return <PromiseRender ok={target} error={Exception} promise={bool} />;
      }
      if (bool) {
        return target;
      }
      return Exception;
    } catch (error) {
      throw error;
    }
  }
  throw new Error('unsupported parameters');
};

export { checkPermissions };

const check = (code, codes, target, Exception, valid) => checkPermissions(codes, code, target, Exception, valid);

export default check;
