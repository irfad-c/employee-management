const express = require("express");
const router = express.Router();
const {
  createEmployee,
  calculateWorkload,
} = require("../controllers/employee.controller.js");
const validateEmployee = require("../validators/employee.validator.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

router.post("/", authMiddleware, validateEmployee, createEmployee);
router.get("/:id/workload", calculateWorkload);

module.exports = router;
