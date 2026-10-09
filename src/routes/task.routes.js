const express = require("express");
const router = express.Router();
const {
  createTask,
  updateTaskStatus,
  summarizeTask,
} = require("../controllers/task.controller.js");
const validateTask = require("../validators/task.validator.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

router.post("/", authMiddleware, validateTask, createTask);
router.patch("/:id/status", authMiddleware, updateTaskStatus);
router.get("/summary", summarizeTask);

module.exports = router;
