const router = require("express").Router();
const UserController = require("../controllers/user");
const AdminController = require("../controllers/admin");
const { isAuthenticated, isAdmin } = require("../middlewares/auth")
const joiValidator = require("../middlewares/joiValidator")


router.post("/", isAdmin, UserController.createUser)
router.post("/admin", isAdmin, AdminController.createAdmin)
router.get("/", isAdmin, UserController.getAllUsers)
router.get("/:user_id", isAuthenticated, UserController.getUserbyId)
router.put("/:user_id/disable", isAdmin, UserController.disableUser)
router.put("/:user_id/enable", isAdmin, UserController.enableUser)
router.delete("/:user_id", isAdmin, UserController.deleteUserbyId)

module.exports = router;