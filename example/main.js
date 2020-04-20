// 是项目的JS打包入口文件
import React from 'react';
import ReactDOM from 'react-dom';
import AuthWrapper from '../src/index.js';

function myValid(code) {
  console.log(code);
  const codes = ['123', '456'];
  const hasAuth = !!code && code.length > 0 ? codes.includes(code) : true;
  return hasAuth;
}

function getCodes() {
  return ['123', '456'];
}

function Exception403() {
  return 'forbidden';
}
ReactDOM.render(
  <React.Fragment>
    <AuthWrapper code="123" codes={['123', '456', '678']}>
      <div>This is React Nodes as Children</div>
    </AuthWrapper>
    <AuthWrapper code="1234" codes={['123', '456']}>
      <div>No Auth</div>
    </AuthWrapper>

    <AuthWrapper code="1234" codes={['123', '456']} noMatch={<Exception403 />}>
      <div>No Auth forbidden exception</div>
    </AuthWrapper>

    <AuthWrapper code="1234" codes={getCodes()}>
      <div>No Auth1</div>
    </AuthWrapper>

    <AuthWrapper code="123" codes="123">
      <div>codes is string ---- ok</div>
    </AuthWrapper>

    <AuthWrapper code={['123', 'aaa456']} codes={['123', '456', '678']}>
      <div>code and codes is array</div>
    </AuthWrapper>

    <AuthWrapper code="1234" valid={myValid}>
      <div>No Auth function</div>
    </AuthWrapper>

    <AuthWrapper code="1234" valid={myValid}>
      <div>No Auth function And Codes</div>
    </AuthWrapper>

    <AuthWrapper code="">
      <div>Allow empty ---- ok</div>
    </AuthWrapper>

    <AuthWrapper>
      <div>undefined waring ---- ok</div>
    </AuthWrapper>

  </React.Fragment>
  , document.getElementById('app')
);
