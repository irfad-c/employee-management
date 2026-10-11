const express = require("express");
const router = express.Router();
const {
  createTask,
  updateTaskStatus,
  summarizeTask,
} = require("../controllers/task.controller.js");
const taskValidation = require("../validators/task.validator.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const validate = require("../middlewares/validator.middleware.js");

router.post("/", authMiddleware, taskValidation, validate, createTask);
router.patch("/:id/status", authMiddleware, updateTaskStatus);
router.get("/summary", summarizeTask);

module.exports = router;
