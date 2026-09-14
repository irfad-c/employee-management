const express = require("express");
const router = express.Router();
const createTask = require("../controllers/employee.controller.js");
const updateTaskStatus = require("../controllers/employee.controller.js");
require;

router.post("/", createTask);
router.post("/:id/status", updateTaskStatus);

module.exports = router;
