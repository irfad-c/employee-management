const express = require("express");
const router = express.Router();
const {
  createEmployee,
  calculateWorkload,
} = require("../controllers/employee.controller.js");
const employeeValidation = require("../validators/employee.validator.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const validate = require("../middlewares/validator.middleware.js");

router.post("/", authMiddleware, employeeValidation, validate, createEmployee);
router.get("/:id/workload", calculateWorkload);

module.exports = router;
