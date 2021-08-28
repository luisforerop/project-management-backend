import express from 'express';
import cors from 'cors';
//import {init, protectWithJwt} from './tools/auth-middleware';

// const bodyParser = require('body-parser')

const setupMiddleware = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors())
    //init();
    //app.use(protectWithJwt); // app.use pasa los par�metros req, res, next
}

export default setupMiddleware;
// exports.setupMiddleware = setupMiddleware;