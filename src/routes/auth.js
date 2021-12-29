const router = require("express").Router();

const AuthController = require("../controllers/auth");
const UserController = require("../controllers/user")
const joiValidate = require("../middlewares/joiValidator")
const schemas = require("../middlewares/joiSchemas")

router.post("/register", joiValidate(schemas.registrationDataSchema, 'body'), UserController.createUser);
router.post("/login", joiValidate(schemas.loginDataSchema, 'body'), AuthController.login)

module.exports = router;