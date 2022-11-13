const express = require("express")
const router = express.Router()

const { authenticateToken } = require("../middlewares/auth.middleware")
const { getTask } = require("../middlewares/todos.middleware")
const { getTodolist, createTask, getNewTaskView, updateTask, deleteTask, updateDueTimeTask } = require("../controllers/root.controller")

router.get("/", authenticateToken, getTodolist)
router.get("/new", authenticateToken, getNewTaskView)
router.post("/new", authenticateToken, createTask)
router.get("/t/:id", authenticateToken, getTask, (req, res) => {
    res.render("task", { task: req.task })
})

router.get("/t/:id/edit", authenticateToken, getTask, (req, res) => {
    res.render("editTask", { task: req.task })
})

router.post("/t/:id/edit", authenticateToken, updateTask)

router.post("/t/:id/edit-duetime", authenticateToken, updateDueTimeTask)

router.post('/t/:id/delete', authenticateToken, deleteTask)

module.exports = router
