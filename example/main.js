// 是项目的JS打包入口文件
import React from 'react';
import ReactDOM from 'react-dom';
import AuthWrapper from '../src/index.js';

function myValid() {
  return true;
}

function getCodes() {
  return ['123', '456'];
}
ReactDOM.render(
  <React.Fragment>
    <AuthWrapper code="123" codes={['123', '456']}>
      <div>This is React Nodes as Children</div>
    </AuthWrapper>
    <AuthWrapper code="1234" codes={['123', '456']}>
      <div>No Auth</div>
    </AuthWrapper>

    <AuthWrapper code="1234" codes={getCodes()}>
      <div>No Auth1</div>
    </AuthWrapper>

    <AuthWrapper valid={myValid}>
      <div>No Auth function</div>
    </AuthWrapper>
  </React.Fragment>
  , document.getElementById('app')
);
