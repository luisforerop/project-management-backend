"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var chai = require('chai');

var chaiHTTP = require('chai-http');

var garageController = require('../../garage/garage.controller');

var userController = require('../users.controller');

chai.use(chaiHTTP);

var app = require('../../app').app;

before( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('Limpiando base de datos...');
          _context.next = 3;
          return userController.deleteUserDB();

        case 3:
          _context.next = 5;
          return garageController.deleteGarageDB();

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
describe('Suite de pruebas auth', function () {
  var testCredential = {
    user: 'luis_forerop',
    password: 'hola mundo 123'
  };
  var testFakeCredential = {
    user: 'luis_forerop',
    password: 'hola mundo 321 no es la clave'
  };
  var testNoUserExist = {
    user: 'Pepe',
    password: 'hola mundo 321 no es la clave'
  };
  it('should return 400 when no data is provided', function (done) {
    chai.request(app).post('/auth/login').end(function (err, res) {
      chai.assert.equal(res.statusCode, 400);
      done();
    });
  });
  it('should return 400 when no user or password is provided', function (done) {
    console.log('hacemos la petici�n a login enviando solo usuario');
    chai.request(app).post('/auth/login').set('Content-Type', 'application/json').send({
      nombre: 'pepe'
    }).end(function (err, res) {
      chai.assert.equal(res.statusCode, 400);
      done();
    });
  }); // TEST PARA SIGN UP

  it('should return 200 when user signup and 401 if user exist', function (done) {
    chai.request(app).post('/auth/signUp').set('Content-Type', 'application/json').send(testCredential).end(function (err, res) {
      chai.assert.equal(res.statusCode, 200);
      console.log('Iniciamos test para user exist');
      chai.request(app).post('/auth/signUp').set('Content-Type', 'application/json').send(testCredential).end(function (err, res) {
        console.log('este esl body en user exist', res.body);
        chai.assert.equal(res.statusCode, 409);
        done();
      });
    });
  }); // TESTS PARA LOGIN
  // Los test de login van a pasar porque nos registramos con el user y password de prueba

  it('should return 401 when password is wrong', function (done) {
    chai.request(app).post('/auth/login').set('Content-Type', 'application/json') // Enviamos por header el tipo de contenido que va a recibir
    .send(testFakeCredential) // Enviamos la informaci�n del usuario por body
    .end(function (err, res) {
      console.log('estas son las credenciales falsas', testFakeCredential);
      chai.assert.equal(res.statusCode, 401);
      done();
    });
  });
  it('should return 401 when user no exist', function (done) {
    chai.request(app).post('/auth/login').set('Content-Type', 'application/json') // Enviamos por header el tipo de contenido que va a recibir
    .send(testNoUserExist) // Enviamos la informaci�n del usuario por body
    .end(function (err, res) {
      console.log('Este es el test y las credenciales son:', testNoUserExist);
      chai.assert.equal(res.statusCode, 401);
      done();
    });
  });
  it('should return 200 and token for succesful login', function (done) {
    chai.request(app).post('/auth/login').set('Content-Type', 'application/json') // Enviamos por header el tipo de contenido que va a recibir
    .send(testCredential) // Enviamos la informaci�n del usuario por body
    .end(function (err, res) {
      chai.assert.equal(res.statusCode, 200);
      done();
    });
  });
  /* Devolvemos 200 cuando el usuario tiene un token
  * Si el token es v�lido, devolvemos un 200
  * Para implementarlo correctamente debemos combinar diferentes llamadas
  */

  it('should return 200 when jwt is valid', function (done) {
    chai.request(app) // Primero corremos un test para loguear un usuario
    .post('/auth/login').set('content-type', 'application/json') // Enviamos por header el tipo de contenido que va a recibir
    .send(testCredential) // Enviamos la informaci�n del usuario por body
    // Tan pronto como terminamos de hacer el login, podemos hacer un request
    .end(function (err, res) {
      chai.assert.equal(res.statusCode, 200); // Comparamos si el request es 200	
      // Evaluamos la informaci�n que estamos recibiendo
      //console.log('Este es el c�digo ' + res.statusCode);
      //console.log('Este es el token ' + res.body.token);

      chai.request(app).get('/garage').set('Authorization', "JWT ".concat(res.body.token), 'content-type', 'application/json') // Enviamos el token en el header .set('Authorization', 'JWT token')
      .send(res.body).end(function (err, res) {
        chai.assert.equal(res.statusCode, 200); // Si el token es v�lido, devolvemos 200

        done();
      });
    });
  });
});