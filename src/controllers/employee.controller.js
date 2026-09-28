const {
  createEmployeeService,
  calculateTotalTasks,
} = require("../services/emloyee.services.js");

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

async function calculateWorkload(req,res) {
  const id = req.params.id;
  // Total tasks
  try {
    const result = await calculateTotalTasks(id);
    return res.status(200).json({totalTask:result});
  } catch (error) {
    if (error.message ==="Employee didnt exist in this particular id") {
      return res.status(404).json({ message: error.message });
    }
    
    return res.status(500).json({ message: error.message });
  }

  // High - priority pending tasks

  // Overdue tasks
}

module.exports = { createEmployee, calculateWorkload };
