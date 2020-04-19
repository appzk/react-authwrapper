import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import permissionImg from './PermissionSvg';

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
    code: PropTypes.string, // 按钮级的权限webKey
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
    ]),
  };

  static defaultProps = {
    description: '',
    image: false,
    className: '',
    prefixCls: 'yg-auth',
    valid: null,
    code: '',
    codes: [],
  };

  validAuth() {
    // user: { userAllAuthRoleList }
    const { valid, codes, code } = this.props;
    if (valid) {return valid();}
    // const codes = codes;// userAllAuthRoleList.code || []; // code 数据源返回

    const hasAuth = !!code && code.length > 0 ? codes.includes(code) : true;
    return hasAuth;
  }

  render() {
    const {className, children, description, image, prefixCls } = this.props;
    const restProps = __rest(this.props, ['className', 'prefixCls', 'image', 'description', 'children']);

    const hasAuth = this.validAuth();
    if (hasAuth) {
      return (
        <React.Fragment>
          {children}
        </React.Fragment>
      );// <ComposedComponent { ...others} />;
    }
    const des = description;
    const alt = typeof des === 'string' ? des : '无权限';
    let imageNode = null;
    if (!image && image !== false) {
      imageNode = <img alt={alt} src={permissionImg} />;
    } else if (typeof image === 'string') {
      imageNode = <img alt={alt} src={image} />;
    } else if (image) {
      imageNode = image;
    }
    let descNode = null;
    if (typeof description === 'string') {
      descNode = <p className={`${prefixCls}-description`}>{des}</p>;
    } else if (description) {
      descNode = description;
    }

    return (
      <div className={classNames(prefixCls, className)} {...restProps}>
        {imageNode && <div className={`${prefixCls}-image`}>{imageNode}</div>}
        {descNode}
      </div>
    );
  }
}

export default PermissionWrapper;
