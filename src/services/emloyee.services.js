// Execute businees logic
const pool = require("../config/db");

async function createEmployeeService(name, email, department, salary) {
  const [rows] = await pool.query("SELECT * from employees where email=?", [
    email,
  ]);

  if (rows.length > 0) {
    throw new Error("Email must be unique");
  }
  const [result] = await pool.query(
    "INSERT INTO employees (name,email,department,salary) VALUES(?,?,?,?)",
    [name, email, department, salary],
  );

  return {
    data: { id: result.insertId },
    message: "New employee created successfully.",
  };
}

module.exports = createEmployeeService;
