const express = require("express");

const { create, getAll, getById, update, updateStatus, remove } = require("../controllers/contacts/index")

const Schemas = require('../schemas/contact');

const router = express.Router();

const validate = require('../middleware/validation');

const auth = require("../middleware/auth");

const jsonParser = express.json()

router.get("/", auth, getAll);
router.get("/:id", validate(Schemas.idSchemaGlobal), getById);
router.post("/", jsonParser, auth, validate(Schemas.contactSchemaGlobal), create);
router.delete("/:id", auth, validate(Schemas.idSchemaGlobal), remove);
router.put("/:id", jsonParser, auth, validate(Schemas.idContactSchemaGlobal), update);
router.patch("/:id", jsonParser, auth, validate(Schemas.idStatusSchemaGlobal), updateStatus);

module.exports = router;
