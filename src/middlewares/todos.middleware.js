const db = require( "../config/db" )

function getTask(req, res, next) {
    const { id } = req.params

    db.query( "SELECT * FROM tasks WHERE id = ? AND user_id = ?", [id, req.user.id], (err, result) => {
        if (err) {
            console.log( err )
            res.redirect( "/" )
        } else {
            console.log( result )
            req.task = result[0]
            next()
        }
    })
}

module.exports = { getTask }
