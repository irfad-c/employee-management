const express = require("express");
const router = express.Router();
const createEmployee = require("../controllers/employee.controller.js");
const validateEmployee = require("../validators/employee.validator.js");

router.post("/", validateEmployee, createEmployee);

module.exports = router;
