"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = require("../db");

var infoAll = function infoAll() {
  return {
    companies: _db.companies,
    userStories: _db.userStories,
    users: _db.users,
    tickets: _db.tickets,
    projects: _db.projects
  };
};

var _default = infoAll;
exports["default"] = _default;