const express = require("express");
const router = express.Router();
const createEmployee = require("../controllers/employee.controller.js");
const calculateWorkLoad=require("../controllers/employee.controller.js");require

router.post("/", createEmployee);
router.post("/:id/workload", calculateWorkLoad);

module.exports = router;
