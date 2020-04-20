import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import permissionImg from './PermissionSvg';
import CheckPermissions from './CheckPermissions';

const __rest = (this && this.__rest) || function (s, e) {
  const t = {};
  for (const p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) {t[p] = s[p];}
  }
  if (s !== null && typeof Object.getOwnPropertySymbols === 'function') {
    for (let i = 0, op = Object.getOwnPropertySymbols(s); i < op.length; i++) {
      if (e.indexOf(op[i]) < 0) {t[op[i]] = s[op[i]];}
    }
  }
  return t;
};

function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
}

// ComposedComponent, codes = [], path = ''
// 权限控制 AuthWrapper 可供任意组件权限控制
// 无权限处理 隐藏 or forbiden or onclick func
/**
 * <AuthWrapper codes={["1234"]} className="yg-auth-inline" code="OPER5196613174" image={false}>
      <Button specialCode="1" className={`yg-btn-link ${styles.color_FF691}`} rel="noopener noreferrer">
        同意出席
      </Button>
    </AuthWrapper>
 */
class PermissionWrapper extends Component {

  static propTypes = {
    // code: PropTypes.string.isRequired, // 按钮级的权限webKey
    code: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]).isRequired, // 按钮级的权限webKey
    children: PropTypes.node.isRequired,
    image: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.object,
    ]),
    description: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    valid: PropTypes.func,
    codes: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string,
    ]),
    noMatch: PropTypes.node,
  };

  static defaultProps = {
    description: '',
    image: false,
    noMatch: null,
    className: '',
    prefixCls: 'yg-auth',
    valid: null,
    codes: [],
  };

  render() {
    const {children, noMatch = null, code, codes, valid } = this.props;
    // const restProps = __rest(this.props, ['className', 'prefixCls', 'image', 'description', 'children', 'noMatch']);
    // code, codes, target, Exception, valid
    const childrenRender = typeof children === 'undefined' ? null : children;
    return code !== undefined ? CheckPermissions(code, codes, childrenRender, noMatch, valid) : null;

  }
}

export default PermissionWrapper;
