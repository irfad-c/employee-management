const express = require("express");
const router = express.Router();
const {createEmployee,calculateWorkload} = require("../controllers/employee.controller.js");
const validateEmployee = require("../validators/employee.validator.js");

router.post("/", validateEmployee, createEmployee);
router.get("/:id/workload",calculateWorkload)

module.exports = router;
