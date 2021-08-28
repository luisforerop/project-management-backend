const uuid = require('uuid'); // Librería para generar identificadores únicos
const mongoose = require('mongoose');

const crypto = require('../tools/crypto'); // Importamos nuestra función de crypto
const to = require('../tools/promisesManagement').to;
const garage = require('../garage/garage.controller');

const userModel = new mongoose.model('users',
    {
        userId: String,
        userName: String,
        password: String
    });

const deleteUserDB = () => {
    return new Promise(async (resolve, reject) => {
        await userModel.deleteMany({}).exec();
        resolve();
    })
}


const dbConsult = () => {
    return new Promise(async (resolve, reject) => {
        let [err, result] = await to(userModel.find().exec());
        if (err || !result) {
            return reject(err)
        }
        console.log(result)
        return resolve(result);
    })
}

const consultUserId = (userName) => {
    return new Promise(async (resolve, reject) => {
        /*for (let userId in usersDatabase) {
            match = usersDatabase[userId]['userName'] == userName;
            if (match) {
                return resolve(userId);
            }
        }
        return reject({ message: 'No user with this username' })*/

        let [err, result] = await to(userModel.findOne({ userName: userName }).exec());
        if (err || !result) {
            return reject({ message: 'No user with this username' })
        }
        console.log('User id', result.userId, 'resutl', result,'=========')
        return resolve(result.userId);

    });
};


const userExist = (userName) => {
    return new Promise(async (resolve, reject) => {
        let [err, result] = await to(userModel.findOne({ userName: userName }).exec());
        if (err || !result) {
            // console.log('este es el error:', err)
            return reject({ message: 'User no exist' })
        }
        return resolve(result);
    });
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

const registerUsers =  (userName, password) => {
    return new Promise(async(resolve, reject) => {
        let [noExist, exist] = await to(userExist(userName));

        if (exist) {
            return resolve('userExist');
        }
        // SI EL USUARIO NO EXISTE PODEMOS CREAR UNO NUEVO
        let hashPassword = await crypto.hashPassword(password);
        let userId = uuid.v4();
        // IMPLEMENTANDO MONGODB
        let newUser = new userModel({
            userId: userId,
            userName: userName,
            password: hashPassword
        });
        await newUser.save();
        let [err, response] = await to(garage.createGarage(userId));
        if (err || !response) {
            return reject(err);
        }
        return resolve(userId);
    });
};

const registerUserSync = (userName, password) => {
    // Revisamos si hay una existencia
    exist = userExist(userName);
    if (exist) {
        return 'userExist'
    } else {
        let userId = uuid.v4();
        garage.createGarage(userId); // Creamos un garage sin contenido
        usersDatabase[userId] = {
            'userName': userName,
            'password': crypto.hashPasswordSync(password)
        }
        return  userId
    }

}

const checkUsersCredentials = (userId, password) => {
    return new Promise(async (resolve, reject) => {
        let [err, userDB] = await to(userModel.findOne({ userId: userId }).exec());
        if (err || !userDB) {
            return reject(err);
        }
        let [cryptoErr, cryptoResponse] = await to(crypto.comparePassword(password, userDB.password));
        return resolve(cryptoResponse);
    });
};

exports.registerUsers = registerUsers;
exports.checkUsersCredentials = checkUsersCredentials;
exports.registerUserSync = registerUserSync;
exports.consultUserId = consultUserId;
exports.dbConsult = dbConsult;
exports.deleteUserDB = deleteUserDB;
