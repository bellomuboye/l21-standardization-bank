const router = require("express").Router();
const TransactionController = require("../controllers/transaction");
const { isAuthenticated, isAdmin, isAdminOrOwner } = require("../middlewares/auth")
const joiValidate = require("../middlewares/joiValidator")
const schemas = require("../middlewares/joiSchemas")

router.post("/deposit", joiValidate(schemas.depositTransactionDataSchema, 'body'), TransactionController.createDeposit)
router.post("/withdraw", joiValidate(schemas.withdrawalTransactionDataSchema, 'body'), isAuthenticated, TransactionController.createWithdrawal)
router.post("/transfer", joiValidate(schemas.transferTransactionData, 'body'), isAuthenticated, TransactionController.createTransfer)
router.get("/:user_id", isAdminOrOwner, TransactionController.getTransactionsByUserId)
router.get("/", TransactionController.getAllTransactions)
router.get("/:transaction_id", TransactionController.getTransactionById)
router.delete("/:transaction_id/reverse", isAdmin, TransactionController.reverseTransaction)


module.exports = router;