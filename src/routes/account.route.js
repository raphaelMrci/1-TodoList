const express = require("express")
const router = express.Router()

const { getAccountView, updateAccount, deleteAccount } = require("../controllers/account.controller")
const { authenticateToken } = require( "../middlewares/auth.middleware" )

router.get("/", authenticateToken, getAccountView)
router.post("/edit", authenticateToken, updateAccount)
router.post("/", authenticateToken, deleteAccount)

module.exports = router
