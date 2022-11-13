const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const config = dotenv.config().parsed;

function authenticateToken(req, res, next) {
    const token = req.cookies.token;

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, config.SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

module.exports = {authenticateToken};
