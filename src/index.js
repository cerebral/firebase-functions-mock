const express = require('express');
const onWrite = require('./onWrite');

module.exports = function(admin) {
  return {
    https: {
      onRequest: function(app) {
        app.use(express.static('public'));
        app.listen(3001, function() {
          console.log('Running server on port 3001');
        });
      },
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
  };
};
