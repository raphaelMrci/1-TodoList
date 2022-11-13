const db = require( "../config/db" )

function getTodolist(req, res) {
    db.query( "SELECT * FROM tasks WHERE user_id = ?", [req.user.id], (err, result) => {
        if (err) {
            console.log( err )
        } else {
            console.log( result );
            res.render( "todolist" , { todos: result, username: req.user.username })
        }
    })
}

function createTask(req, res) {
    const { title, description } = req.body
    db.query( "INSERT INTO tasks SET ?" , { title, user_id: req.user.id, description }, (err, result) => {
        if (err) {
            console.log( err )
        } else {
            res.redirect( "/" )
        }
    })
}

function getNewTaskView(req, res) {
    res.render( "newTask" )
}

function updateTask(req, res) {
    const { title, description } = req.body
    const { id } = req.params
    db.query( "UPDATE tasks SET title = ?, description = ? WHERE id = ? AND user_id = ?" , [title, description, id, req.user.id], (err, result) => {
        if (err) {
            console.log( err )
        } else {
            res.redirect( "/" )
        }
    })
}

function deleteTask(req, res) {
    const { id } = req.params
    db.query( "DELETE FROM tasks WHERE id = ? AND user_id = ?" , [id, req.user.id], (err, result) => {
        if (err) {
            console.log( err )
        } else {
            res.redirect( "/" )
        }
    })
}

function updateDueTimeTask(req, res) {
    const { dueTime } = req.body
    const { id } = req.params

    console.log( dueTime )

    db.query( "UPDATE tasks SET due_time = ? WHERE id = ? AND user_id = ?" , [dueTime, id, req.user.id], (err, result) => {
        if (err) {
            console.log( err )
        } else {
            res.redirect( "/" )
        }
    })
}

module.exports = {
    getTodolist,
    createTask,
    getNewTaskView,
    updateTask,
    deleteTask,
    updateDueTimeTask
}
