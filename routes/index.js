const express = require("express");

const auth = require("../middleware/auth")

const router = express.Router()

const authRoutes = require("./auth")
const contactRoutes = require("./contacts")

router.use("/users", authRoutes);
router.use("/contacts", auth, contactRoutes);

module.exports = router;