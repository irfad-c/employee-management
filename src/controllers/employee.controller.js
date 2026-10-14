const {
  createEmployeeService,
  workLoadStats,
} = require("../services/employee.services.js");

async function createEmployee(req, res, next) {
  try {
    const { name, email, department, salary } = req.body;

    await createEmployeeService(name, email, department, salary);

    return res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    next(error);
  }
}

async function calculateWorkload(req, res, next) {
  const id = req.params.id;
  // Total tasks
  try {
    const data = await workLoadStats(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

module.exports = { createEmployee, calculateWorkload };
