const express = require("express");
const schema = require('../schemas/user');
const validate = require('../middleware/validation');

const { register, login, logout, current } = require("../controllers/auth/index");
const router = express.Router();
const auth = require("../middleware/auth");

const jsonParser = express.json();

router.post("/register", jsonParser, validate(schema.userSchemaGlobal), register);

router.post("/login", jsonParser, validate(schema.userSchemaGlobal), login);

router.post("/logout", auth, logout);

router.get("/current", auth, current);

module.exports = router;