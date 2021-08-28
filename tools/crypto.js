const bcrypt = require('bcrypt');
const saltRounds = 10; 

const hashPassword = (plainTextPwd) => {
    return bcrypt.hash(plainTextPwd, saltRounds)
};

const comparePassword = (plainPassword, hashPassword) => {
    return bcrypt.compare(plainPassword, hashPassword)
};

const hashPasswordSync = (plainTextPwd) => {
    return bcrypt.hashSync(plainTextPwd, saltRounds)
}

exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
exports.hashPasswordSync = hashPasswordSync;
