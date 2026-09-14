const express = require("express");
const router = express.Router();
const createTask = require("../controllers/task.controller.js");
const updateTaskStatus = require("../controllers/task.controller.js");
const validateTask=require("../validators/task.validator.js")

router.post("/",validateTask, createTask);
router.post("/:id/status", updateTaskStatus);

module.exports = router;
