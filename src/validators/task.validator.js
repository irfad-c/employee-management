const { body } = require("express-validator");

const taskValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["TODO"])
    .withMessage("You can only create a TODO task"),
  body("priority")
    .notEmpty()
    .withMessage("Priority is required.")
    .isIn(["LOW", "MEDIUM", "HIGH"])
    .withMessage("Priority should be LOW/MEDIUM/HIGH"),
  body("due_date")
    .notEmpty()
    .withMessage("Due date is required")
    .isISO8601()
    .withMessage("Due date must be a valid date.")
    .custom((value) => {
      if (new Date(value).getTime() < Date.now()) {
        throw new Error("Due date cannot be in the past.");
      }
      return true;
    }),
  body("employeeId").notEmpty().withMessage("employeeId is required"),
];
const taskStatusValidation = [
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["IN_PROGRESS", "COMPLETED"]),

  body("id")
    .notEmpty()
    .withMessage("Id is required")
    .isInt({ min: 1 })
    .withMessage("Must be a positive number"),
];

module.exports = { taskValidation, taskStatusValidation };
