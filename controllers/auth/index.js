const register = require("./registerUser");
const login = require("./loginUser");
const logout = require("./logoutUser");
const current = require("./currentUser");
const verify = require("./verify");
const secondVerify = require("./secondVerify");

module.exports = { register, login, logout, current, verify, secondVerify };