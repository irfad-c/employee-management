const {
  createEmployeeService,
  calculateTotalTasks,
  countHighPriorityPendingTasks,
  countOverdueTask,
} = require("../services/employee.services.js");

async function createEmployee(req, res) {
  try {
    const { name, email, department, salary } = req.body;

    await createEmployeeService(name, email, department, salary);

    return res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    if (error.message === "Email must be unique") {
      return res.status(409).json({ message: error.message });
    }

    return res
      .status(500)
      .json({ message: "Cant able to create new employee." });
  }
}

async function calculateWorkload(req, res) {
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
    if (error.message === "Employee didnt exist in this particular id") {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { createEmployee, calculateWorkload };
