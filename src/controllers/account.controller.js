const db = require( "../config/db" );

function getAccountView(req, res) {
    db.query( "SELECT * FROM users WHERE id = ?", [req.user.id], (err, result) => {
        if (err) {
            console.log( err )
        } else {

            res.render( "account" , { user: result[0] })
        }
    })
}

function updateAccount(req, res) {
    const { username, password } = req.body

    console.log( username, password )

    if (username === "" || password === "") {
        res.status( 400 ).send( "Username and password are required" )
        return;
    }

    db.query( "UPDATE users SET username = ?, password = ? WHERE id = ?" , [username, password, req.user.id], (err, result) => {
        if (err) {
            console.log( err )
        } else {
            res.redirect( "/account" )
        }
    })
}

function deleteAccount(req, res) {
    db.query( "DELETE FROM tasks WHERE user_id = ?", [req.user.id], (err, result) => {
        if (err) {
            console.log( err )
        } else {
            db.query( "DELETE FROM users WHERE id = ?", [req.user.id], (err, result) => {
                if (err) {
                    console.log( err )
                } else {
                    res.clearCookie( "token" )
                    res.redirect( "/" )
                }
            })
        }
    })
}

module.exports = {
    getAccountView,
    updateAccount,
    deleteAccount
}
