"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import {init, protectWithJwt} from './tools/auth-middleware';
// const bodyParser = require('body-parser')
var setupMiddleware = function setupMiddleware(app) {
  app.use(_express["default"].json());
  app.use(_express["default"].urlencoded({
    extended: true
  }));
  app.use((0, _cors["default"])()); //init();
  //app.use(protectWithJwt); // app.use pasa los par�metros req, res, next
};

var _default = setupMiddleware; // exports.setupMiddleware = setupMiddleware;

exports["default"] = _default;