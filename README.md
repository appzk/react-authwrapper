
Auth Wrapper
----------------

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/@ygyg/react-authwrapper.svg?style=flat-square
[npm-url]: http://npmjs.org/package/@ygyg/react-authwrapper
[travis-image]: https://img.shields.io/travis/react-component/menu.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/menu
[coveralls-image]: https://img.shields.io/coveralls/react-component/menu.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/menu?branch=master

[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/@ygyg/react-authwrapper.svg?style=flat-square
[download-url]: https://npmjs.org/package/@ygyg/react-authwrapper


## Usage

```jsx
import AuthWrapper from '@ygyg/react-authwrapper';
import React from 'react';
import ReactDOM from 'react-dom';

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
  , container
);

```

## install

[![react-authwrapper](https://nodei.co/npm/@ygyg/react-authwrapper.png)](https://npmjs.org/package/@ygyg/react-authwrapper)

## API


| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| code | 权限码  | string 或 array | 必传，可为空 |
| codes | 权限码的合集 | string 或 array |  |
| chilren | 子组件 | () => HTMLElement | 必传 |
| noMatch | 无权限，需显示的组件 | 子组件 | () => HTMLElement | 无 |
| valid |  校验函数 | () => {} 返回bool| 无 | 



## Development

```
npm install
npm run dev
```

## Example

http://localhost:3000/


## Coverage

```
npm run coverage
```

open coverage/ dir

## License

react authwrapper is released under the MIT license.
  