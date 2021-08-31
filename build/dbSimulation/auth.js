"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _require = require("../db"),
    users = _require.users,
    company = _require.company,
    projects = _require.projects;

var auth = function auth(_ref) {
  var username = _ref.username,
      password = _ref.password;
  var infoUser = users.find(function (user) {
    return user.username === username;
  });

  if (infoUser.password === password) {
    //const infoCompany = company.find(info => info.id === infoUser.company)
    //const infoProjects = projects.filter(project => project.company === infoUser.company)

    /*const companyUsers = infoCompany.users.map( id => {
        const infoCoworker = users.find( user => user.id === id )
        return { name: infoCoworker.name, id }
    })*/

    /*const info = {
        infoUser,
        //infoCompany,
        //companyUsers
        //infoProjects
    }*/
    delete infoUser['password'];
    return {
      infoUser: infoUser,
      token: '123456'
    };
  } else return null;
}; // const response = auth({username: 'pepe', password: '1234lf'})
// console.log(response);


var _default = auth;
exports["default"] = _default;