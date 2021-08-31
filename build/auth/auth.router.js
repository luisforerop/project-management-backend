"use strict";

var express = require('express');

var router = express.Router(); // Construimos un router con el constructor de express

var authHttpHandler = require('./auth.http'); // Definimos la ruta como una entidad


router.route('/login').post(authHttpHandler.login);
router.route('/signUp').post(authHttpHandler.signup);
exports.router = router;