const express = require("express");
const router = express.Router();
const {
  createTask,
  updateTaskStatus,summarizeTask
} = require("../controllers/task.controller.js");
const validateTask = require("../validators/task.validator.js");

router.post("/", validateTask, createTask);
router.patch("/:id/status", updateTaskStatus);
router.get("/summary",summarizeTask)

module.exports = router;
