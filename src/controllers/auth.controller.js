const db = require("../config/db")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const config = dotenv.config().parsed;

function login(req, res) {
    let email = req.body.email
    let password = req.body.password

    if (email === "" || password === "") {
        res.render("auth/login", { errorMessage: "Please enter both, email and password to sign up." });
        return;
    }

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) {
            console.log(err)
        }

        if (result.length === 0) {
            res.render("auth/login", { errorMessage: "Email doesn't exist." });
            return;
        }

        const verified = bcrypt.compareSync(password, result[0].password);

        if (verified) {
            const token = jwt.sign({ id: result[0].id }, config.SECRET, {
                expiresIn: 86400 // 24 hours
            });

            res.cookie("token", token, { httpOnly: true });
            res.redirect("/");
        } else {
            res.render("auth/login", { errorMessage: "Wrong password." });
        }
    })
}

function getLoginView(req, res) {
    res.render("auth/login")
}

function register(req, res) {
    console.log("REGISTER: POST")
    let email = req.body.email
    let username = req.body.username
    let password = req.body.password
    let password2 = req.body.password2

    if (email === "" || username === "" || password === "" || password2 === "") {
        res.render("auth/register", { errorMessage: "Please enter all fields." });
        return;
    }

    if (password !== password2) {
        res.render("auth/register", { errorMessage: "Passwords don't match." });
        return;
    }

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) {
            console.log(err)
        }

        if (result.length > 0) {
            res.status(409);
            res.render("auth/register", { errorMessage: "Email already exists." });
        } else {
            password = bcrypt.hashSync(password, 10);

            db.query("INSERT INTO users SET ?", { email: email, username: username, password: password }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result)
                    res.redirect("/login")
                }
            })
        }
    });
}

function getRegisterView(req, res) {
    res.render("auth/register")
}

function logout(req, res) {
    res.clearCookie( "token" )
    res.redirect( "/login" )
}

module.exports = {
    login,
    getLoginView,
    register,
    getRegisterView,
    logout
}
