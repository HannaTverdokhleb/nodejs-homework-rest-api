const register = require("./registerUser");
const login = require("./loginUser");
const logout = require("./logoutUser");
const current = require("./currentUser");

module.exports = { register, login, logout, current };