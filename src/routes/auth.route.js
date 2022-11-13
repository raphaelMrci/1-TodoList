const express = require("express")
const router = express.Router()

const {
    getLoginView,
    login,
    getRegisterView,
    register,
    logout
} = require("../controllers/auth.controller")

router.get("/login", getLoginView)
router.post("/login", login)

router.get("/register", getRegisterView)
router.post("/register", register)

router.post("/logout", logout)

module.exports = router
