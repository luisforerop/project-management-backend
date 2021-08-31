"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var jwt = require('jsonwebtoken'); // Para generar tokens


var Joi = require('joi'); // Validaci�n de datos


var debug = require('debug')('auth:debug'); // Impresi�n de mensajes en modo debug
// M�dulos


var userController = require('../auth/users.controller');

var to = require('../tools/promisesManagement').to; // VALIDACIONES CON JOI = SCHEMA


var schema = Joi.object({
  user: Joi.string() //.alphanum()
  .min(3).max(30).required(),
  password: Joi.string().min(8).pattern(new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])[A-Za-z0-9 .,@$!%*#?&+-]{8,30}$')) // (?=.*\d) al menos un digito (?=.*\w) al menos una letra o _
  // \d = [0-9] \w = [a-zA-Z_]
  // Puede contener letras, 0-9 y _, ademas puede incluir ' '.,@$!%*#?&+- y debe tener entre 8-30

});

var login = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _schema$validate, value, error, user, password, userId, _yield$to, _yield$to2, err, result, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Variables a validar
            toValidate = {
              user: req.body.user,
              password: req.body.password
            }; // Validaci�n

            _schema$validate = schema.validate(toValidate), value = _schema$validate.value, error = _schema$validate.error; // Los valores que necesitamos quedan en el objeto value

            user = value.user;
            password = value.password;
            debug(user, password);
            debug("Estas son user: ".concat(user, ", password: ").concat(password, " y este es error ").concat(error)); // Si hay un error en la validaci�n

            if (!error) {
              _context.next = 9;
              break;
            }

            debug(error.details[0].message);
            return _context.abrupt("return", res.status(400).send(error.details[0].message));

          case 9:
            debug('Pasamos el if error'); // Si son validas generamos un jwt y lo devolvemos

            _context.prev = 10;
            _context.next = 13;
            return userController.consultUserId(user);

          case 13:
            userId = _context.sent;
            _context.next = 16;
            return to(userController.checkUsersCredentials(userId, password));

          case 16:
            _yield$to = _context.sent;
            _yield$to2 = _slicedToArray(_yield$to, 2);
            err = _yield$to2[0];
            result = _yield$to2[1];
            debug("El error es ".concat(err));
            debug("El resultado es ".concat(result));

            if (!(err || !result)) {
              _context.next = 26;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              message: 'Invalid credentials'
            }));

          case 26:
            // Creamos un token  
            token = jwt.sign({
              user: user
            }, 'NuestraClaveSecreta');
            return _context.abrupt("return", res.status(200).json({
              token: token,
              userId: userId
            }));

          case 28:
            _context.next = 33;
            break;

          case 30:
            _context.prev = 30;
            _context.t0 = _context["catch"](10);
            return _context.abrupt("return", res.status(401).json(_context.t0));

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[10, 30]]);
  }));

  return function login(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var signup = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var user, password, userIdTest;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(Object.keys(req.body).length === 0)) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              message: 'missing data, without data'
            }));

          case 4:
            if (!(!req.body.user || !req.body.password)) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              message: 'no user or password providen'
            }));

          case 6:
            // VARIABLES DE TRABAJO
            user = req.body.user;
            password = req.body.password;
            debug(user, password); // CREAMOS EL USUARIO

            _context2.next = 11;
            return userController.registerUsers(user, password);

          case 11:
            userIdTest = _context2.sent;

            if (!(userIdTest == 'userExist')) {
              _context2.next = 16;
              break;
            }

            return _context2.abrupt("return", res.status(409).json({
              message: 'The username already exist'
            }));

          case 16:
            return _context2.abrupt("return", res.status(200).json({
              message: 'succesful signUp',
              userId: userIdTest
            }));

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function signup(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.login = login;
exports.signup = signup;