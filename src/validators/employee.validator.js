module.exports = validateEmployee;

const { body } = require("express-validator");

const employeeValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Enter a valid email"),
  body("salary")
    .notEmpty()
    .withMessage("salary is required")
    .isFloat({ min: 0 })
    .withMessage("Salary must be a positive number"),
  body("department").notEmpty().withMessage("department is required"),
];

module.exports = employeeValidation;
