// INICIALIZACIÓN
import express from 'express' // Creamos el objeto express
const app = express(); // Inicializamos un app con el constructor de express

import setupMiddleware from './middleware'; // MIDDLEWARES

// ROUTES
/*
const authRoutes = require('./auth/auth.router').router;
const companies = require('./companies/companies.router').router;
const users = require('./users/users.router').router;
const projects = require('./projects/projects.router').router;
const userStories = require('./userStories/userStories.router').router;
const tickets = require('./tickets/tickets.router').router;
*/

import auth from './dbSimulation/auth'

// MIDDLEWARE
setupMiddleware(app); // Llamamos a setupMiddleware y dejamos que se encargue del resto

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

app.get('/' , (req , res)=>{

   res.send({response: 'hello from simple server :)'})

})


app.post('/auth' , (req , res)=>{
    console.log('Este es el req desde auth', req.body);
    const {username, password} = req.body;
    const userInfo = auth({username, password})
    const errorMessage = {error: 'Error auth'}
    if(userInfo){
        res.status(202).send(userInfo)
    } else res.status(401).send(errorMessage)
})

app.get('/infoProjects' , (req , res)=>{

   res.send({response: 'hello from simple server :)'})

})


app.listen(app.get('port'), ()=> {
    console.log(`server starter at port ${app.get('port')}` )
});

exports.app = app;