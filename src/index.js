const express = require('express');
const onWrite = require('./onWrite');

const app = express();

let httpListener;

app.all('*', function(req, res) {
  if (httpListener) {
    listener(req, res);
  }
})

app.listen();

module.exports = function(admin, config) {
  return {
    config: (() => config || {}),
    },
    database: {
      ref: function(path) {
        return {
          onWrite(cb) {
            return onWrite(path, cb, admin);
          },
        };
      },
    },

    https: {
      onRequest: function(cb) {
        httpListener = cb;
      }
    }
  };
};
