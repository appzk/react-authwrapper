
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
  , container
);

```

## install

[![react-authwrapper](https://nodei.co/npm/@ygyg/react-authwrapper.png)](https://npmjs.org/package/@ygyg/react-authwrapper)

## API


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
  