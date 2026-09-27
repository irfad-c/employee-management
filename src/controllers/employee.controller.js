const createEmployeeService = require("../services/emloyee.services.js");

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

module.exports = createEmployee;
