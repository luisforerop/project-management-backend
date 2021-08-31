"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var uuid = require('uuid'); // Librer�a para generar identificadores �nicos


var mongoose = require('mongoose');

var crypto = require('../tools/crypto'); // Importamos nuestra funci�n de crypto


var to = require('../tools/promisesManagement').to;

var garage = require('../garage/garage.controller');

var userModel = new mongoose.model('users', {
  userId: String,
  userName: String,
  password: String
});

var deleteUserDB = function deleteUserDB() {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return userModel.deleteMany({}).exec();

            case 2:
              resolve();

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

var dbConsult = function dbConsult() {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
      var _yield$to, _yield$to2, err, result;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return to(userModel.find().exec());

            case 2:
              _yield$to = _context2.sent;
              _yield$to2 = _slicedToArray(_yield$to, 2);
              err = _yield$to2[0];
              result = _yield$to2[1];

              if (!(err || !result)) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt("return", reject(err));

            case 8:
              console.log(result);
              return _context2.abrupt("return", resolve(result));

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};

var consultUserId = function consultUserId(userName) {
  return new Promise( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
      var _yield$to3, _yield$to4, err, result;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return to(userModel.findOne({
                userName: userName
              }).exec());

            case 2:
              _yield$to3 = _context3.sent;
              _yield$to4 = _slicedToArray(_yield$to3, 2);
              err = _yield$to4[0];
              result = _yield$to4[1];

              if (!(err || !result)) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("return", reject({
                message: 'No user with this username'
              }));

            case 8:
              console.log('User id', result.userId, 'resutl', result, '=========');
              return _context3.abrupt("return", resolve(result.userId));

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
};

var userExist = function userExist(userName) {
  return new Promise( /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(resolve, reject) {
      var _yield$to5, _yield$to6, err, result;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return to(userModel.findOne({
                userName: userName
              }).exec());

            case 2:
              _yield$to5 = _context4.sent;
              _yield$to6 = _slicedToArray(_yield$to5, 2);
              err = _yield$to6[0];
              result = _yield$to6[1];

              if (!(err || !result)) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt("return", reject({
                message: 'User no exist'
              }));

            case 8:
              return _context4.abrupt("return", resolve(result));

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
};
/*
const registerUsers = async (userName, password) => {
    try {
        // SI EL USUARIO EXISTE, NO PODEMOS REGISTRARLO NUEVAMENTE
        exist = await userExist(userName);
        return 'userExist'
    } catch (error) {
        // COMO EL USUARIO NO EXISTE, LO PODEMOS REGISTRAR
        console.log(`Como estamos ${error.message}`)
        let hashPassword = await crypto.hashPassword(password);
        console.log('estamos en register async y esta es la pass', hashPassword)

        let userId = uuid.v4();
        garage.createGarage(userId);
        usersDatabase[userId] = {
            userName,
            'password': hashPassword
        }
        return userId
    }

}; */


var registerUsers = function registerUsers(userName, password) {
  return new Promise( /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(resolve, reject) {
      var _yield$to7, _yield$to8, noExist, exist, hashPassword, userId, newUser, _yield$to9, _yield$to10, err, response;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return to(userExist(userName));

            case 2:
              _yield$to7 = _context5.sent;
              _yield$to8 = _slicedToArray(_yield$to7, 2);
              noExist = _yield$to8[0];
              exist = _yield$to8[1];

              if (!exist) {
                _context5.next = 8;
                break;
              }

              return _context5.abrupt("return", resolve('userExist'));

            case 8:
              _context5.next = 10;
              return crypto.hashPassword(password);

            case 10:
              hashPassword = _context5.sent;
              userId = uuid.v4(); // IMPLEMENTANDO MONGODB

              newUser = new userModel({
                userId: userId,
                userName: userName,
                password: hashPassword
              });
              _context5.next = 15;
              return newUser.save();

            case 15:
              _context5.next = 17;
              return to(garage.createGarage(userId));

            case 17:
              _yield$to9 = _context5.sent;
              _yield$to10 = _slicedToArray(_yield$to9, 2);
              err = _yield$to10[0];
              response = _yield$to10[1];

              if (!(err || !response)) {
                _context5.next = 23;
                break;
              }

              return _context5.abrupt("return", reject(err));

            case 23:
              return _context5.abrupt("return", resolve(userId));

            case 24:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());
};

var registerUserSync = function registerUserSync(userName, password) {
  // Revisamos si hay una existencia
  exist = userExist(userName);

  if (exist) {
    return 'userExist';
  } else {
    var userId = uuid.v4();
    garage.createGarage(userId); // Creamos un garage sin contenido

    usersDatabase[userId] = {
      'userName': userName,
      'password': crypto.hashPasswordSync(password)
    };
    return userId;
  }
};

var checkUsersCredentials = function checkUsersCredentials(userId, password) {
  return new Promise( /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(resolve, reject) {
      var _yield$to11, _yield$to12, err, userDB, _yield$to13, _yield$to14, cryptoErr, cryptoResponse;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return to(userModel.findOne({
                userId: userId
              }).exec());

            case 2:
              _yield$to11 = _context6.sent;
              _yield$to12 = _slicedToArray(_yield$to11, 2);
              err = _yield$to12[0];
              userDB = _yield$to12[1];

              if (!(err || !userDB)) {
                _context6.next = 8;
                break;
              }

              return _context6.abrupt("return", reject(err));

            case 8:
              _context6.next = 10;
              return to(crypto.comparePassword(password, userDB.password));

            case 10:
              _yield$to13 = _context6.sent;
              _yield$to14 = _slicedToArray(_yield$to13, 2);
              cryptoErr = _yield$to14[0];
              cryptoResponse = _yield$to14[1];
              return _context6.abrupt("return", resolve(cryptoResponse));

            case 15:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());
};

exports.registerUsers = registerUsers;
exports.checkUsersCredentials = checkUsersCredentials;
exports.registerUserSync = registerUserSync;
exports.consultUserId = consultUserId;
exports.dbConsult = dbConsult;
exports.deleteUserDB = deleteUserDB;