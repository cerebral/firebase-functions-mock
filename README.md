# firebase-functions-mock
Work locally with firebase functions

## Install

`npm install firebase-functions-mock`

## Supports

- **onRequest** express app handling
- **onWrite** database event handling
- Mocks out auth and config
- Runs static delivery of your public files folder

## How to use
*functions/index.js*
```js
const firebase = require('firebase-admin');
const admin = firebase.initializeApp({
  credential: firebase.credential.cert(JSON.parse(process.env.SERVICE_ACCOUNT)),
  databaseURL: JSON.parse(process.env.FIREBASE_CONFIG).databaseURL,
});
let functions = require('firebase-functions');

// When in debug mode, override functions with the mock and
// pass in the instance of "admin" and optional options
if (process.env.NODE_ENV !== 'production') {
  functions = require('firebase-functions-mock')(admin, {
    config: process.env.FIREBASE_CONFIG,
    port: 3001,
    publicPath: 'public'
  });
}

exports.app = functions.https.onRequest(require('./app'));
exports.publish = functions.database.ref('articles/{uid}/{articleName}').onWrite(require('./publish'));
```

## Limitations
This project is in its initial state to build the [jsblog.io](https://www.jsblog.io) project. It has a lot of potential for improvements. Although contributions are already made, here are some things to look into:

- Test more scenarios with **onWrite** usage

## Get going
To get going with Firebase Functions I highly recommend using [this boilerplate](https://github.com/cerebral/firebase-functions-boilerplate) which has the whole workflow set up for you.
