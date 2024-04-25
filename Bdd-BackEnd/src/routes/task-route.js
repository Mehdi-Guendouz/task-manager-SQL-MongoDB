const express = require("express");
const { protect } = require("../middlewares/authMidleWare");
const {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require("../controllers/TaskControllers");
const router = express.Router();

router.route("/").get(protect, getAllTasks).post(protect, createTask);
router.route("/:id").put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;
