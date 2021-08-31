"use strict";

var to = function to(Promise) {
  return Promise.then(function (data) {
    return [null, data];
  })["catch"](function (err) {
    return [err, null];
  });
};

exports.to = to;