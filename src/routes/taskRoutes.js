const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.post("/create-task", taskController.createTask);
router.get("/tasks-by-user", taskController.getSelfTasks);
router.get("/tasks-by-status/:status", taskController.getTasksByStatus);
router.get("/tasks-for-next-week", taskController.getTasksForNextWeek);
router.put("/update-task/:taskId", taskController.updateTask);
router.delete("/delete-task/:taskId", taskController.deleteTask);

module.exports = router;
