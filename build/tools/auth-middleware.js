"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protectWithJwt = exports.init = void 0;

var _passportJwt = require("passport-jwt");

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var init = function init() {
  var opts = {};
  opts.jwtFromRequest = _passportJwt.ExtractJwt.fromAuthHeaderWithScheme('jwt'); // Esto deber�a estar en una variable de entorno ya que es nuestra clave

  opts.secretOrKey = 'NuestraClaveSecreta';

  _passport["default"].use(new _passportJwt.Strategy(opts, function (decoded, done) {
    console.log('decoded jwt', decoded);
    return done(null, decoded);
  }));
};

exports.init = init;

var protectWithJwt = function protectWithJwt(req, res, next) {
  if (req.path == '/' || req.path == '/auth/login' || req.path == '/dbconsult' || req.path == '/auth/signUp' || req.path == '/garage/dbcars') {
    return next();
  } else {
    return _passport["default"].authenticate('jwt', {
      session: false
    })(req, res, next);
  }
};

exports.protectWithJwt = protectWithJwt;