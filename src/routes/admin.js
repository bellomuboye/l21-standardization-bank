const router = require("express").Router();
const AdminController = require("../controllers/admin");
const { isAuthenticated, isAdmin } = require("../middlewares/auth")
const joiValidator = require("../middlewares/joiValidator")


router.post("/", joiValidator, isAdmin, AdminController.createAdmin)

module.exports = router;