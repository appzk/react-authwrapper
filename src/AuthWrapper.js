import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import permissionImg from '@/assets/no-permission.svg';

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
// ComposedComponent, operCodes = [], path = ''
// 权限控制 AuthWrapper 可供任意组件权限控制
// 无权限处理 隐藏 or forbiden or onclick func
/**
 * <AuthWrapper user={this.props.user} className="yg-auth-inline" opercode="OPER5196613174" image={false}>
      <Button specialCode="1" className={`yg-btn-link ${styles.color_FF691}`} rel="noopener noreferrer">
        同意出席
      </Button>
    </AuthWrapper>
 */
class AuthWrapper extends Component {

  static propTypes = {
    opercode: PropTypes.string.isRequired, // 按钮级的权限webKey
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
    validAuth: PropTypes.func,

  };

  static defaultProps = {
    description: '',
    image: false,
    className: '',
    prefixCls: 'yg-auth',
    validAuth: null,
  };

  validAuth() {
    const { validAuth, user: { userAllAuthRoleList }, opercode } = this.props;
    if (validAuth) {return validAuth();}
    const operCodes = userAllAuthRoleList.operCode || []; // operCode 数据源返回

    const hasAuth = !!opercode && opercode.length > 0 ? operCodes.includes(opercode) : true;
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

export default AuthWrapper;
