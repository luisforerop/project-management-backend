"use strict";

var bcrypt = require('bcrypt');

var saltRounds = 10;

var hashPassword = function hashPassword(plainTextPwd) {
  return bcrypt.hash(plainTextPwd, saltRounds);
};

var comparePassword = function comparePassword(plainPassword, hashPassword) {
  return bcrypt.compare(plainPassword, hashPassword);
};

var hashPasswordSync = function hashPasswordSync(plainTextPwd) {
  return bcrypt.hashSync(plainTextPwd, saltRounds);
};

exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
exports.hashPasswordSync = hashPasswordSync;