const {
  createEmployeeService,
  calculateTotalTasks,
  countHighPriorityPendingTasks,
  countOverdueTask,
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
    const totalTask = await calculateTotalTasks(id);
    const highPriorityPendingTask = await countHighPriorityPendingTasks(id);
    const overdueTask = await countOverdueTask(id);
    return res
      .status(200)
      .json({ totalTask, highPriorityPendingTask, overdueTask });
  } catch (error) {
    next(error);
  }
}

module.exports = { createEmployee, calculateWorkload };
