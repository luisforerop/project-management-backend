"use strict";

var _express = _interopRequireDefault(require("express"));

var _middleware = _interopRequireDefault(require("./middleware"));

var _auth = _interopRequireDefault(require("./dbSimulation/auth"));

var _infoProjects = require("./dbSimulation/infoProjects");

var _infoAll = _interopRequireDefault(require("./dbSimulation/infoAll"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// INICIALIZACIÓN
// Creamos el objeto express
var app = (0, _express["default"])(); // Inicializamos un app con el constructor de express

// MIDDLEWARE
(0, _middleware["default"])(app); // Llamamos a setupMiddleware y dejamos que se encargue del resto
// PORT

app.set('port', process.env.PORT || 5001);
/*
app.use('/auth', authRoutes); // A todas las rutas de authRoutes se le antepondrá un /auth
app.use('/companies', companies);
app.use('/users', users);
app.use('/projects', projects);
app.use('/userStories', userStories);
app.use('/tickets', tickets);
*/

app.get('/', function (req, res) {
  var response = 'Bienvenido al backend de la aplicación para gestión de proyectos. Si deseas ver la data que exista actualmente ingresa a /allInfo';
  console.log('Petici+ón get');
  res.send({
    response: response
  });
});
app.post('/auth', function (req, res) {
  console.log('Este es el req desde auth', req.body);
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;
  var userInfo = (0, _auth["default"])({
    username: username,
    password: password
  });
  var errorMessage = {
    error: 'Error auth'
  };

  if (userInfo) {
    console.log(userInfo);
    res.status(202).send(userInfo);
  } else res.status(401).send(errorMessage);
});
app.post('/infoProjectsByList', function (req, res) {
  console.log('Esta es la req desde info p');
  console.log(req.body);
  var listInfo = (0, _infoProjects.infoProjectsByList)(req.body);
  res.send({
    listInfo: listInfo
  });
});
app.post('/infoProjectsByCompany', function (req, res) {
  console.log('Esta es la req desde info by company');
  console.log(req.body);
  var listInfo = (0, _infoProjects.infoProjectsByCompany)(req.body);
  console.log('Esta es la respuesta');
  console.log({
    listInfo: listInfo
  });
  res.send(listInfo);
});
app.post('/infoProjectsOfUser', function (req, res) {
  console.log('Esta es la req desde info Users projects');
  console.log(req.body);
  var listInfo = (0, _infoProjects.infoUserProjects)(req.body);
  console.log('Esta es la respuesta');
  console.log(listInfo);
  res.send(listInfo);
});
app.post('/basicInfoUsers', function (req, res) {
  console.log('Esta es la req desde info team');
  console.log(req.body);
  var listTeam = (0, _infoProjects.infoTeam)(req.body);
  res.send(listTeam);
});
app.post('/devsInACompany', function (req, res) {
  console.log(req.body);
  var listInfo = (0, _infoProjects.devsInACompany)(req.body);
  res.send(listInfo);
});
app.put('/', function (req, res) {
  res.send('hello from simple server :)');
});
app.get('/allInfo', function (req, res) {
  var info = (0, _infoAll["default"])();
  res.send(info);
});
app.listen(app.get('port'), function () {
  console.log("server starter at port ".concat(app.get('port')));
});
exports.app = app;