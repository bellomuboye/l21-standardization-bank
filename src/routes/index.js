const router = require("express").Router();
const authRoutes = require("./auth")
const userRoutes = require("./user")
const transactionRoutes = require("./transaction")

router.get('/', (req, res)=> {
    res.json({message: 'connected'})
})
router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/transactions', transactionRoutes)


module.exports = router;