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

async function calculateTotalTasks(id) {
  const [employee] = await pool.query("SELECT * from employees where id=?", [
    id,
  ]);
  if (employee.length === 0) {
    throw new Error("Employee didnt exist in this particular id");
  }

  const [task] = await pool.query("SELECT * from tasks where employee_id=?", [
    id,
  ]);

  if (task.length === 0) {
    throw new Error("Task didnt exist for this employee id");
  } else {
    const [rows] = await pool.query(
      "SELECT COUNT(*) AS totalTask from tasks where employee_id=?",
      [id],
    );
    return rows[0].totalTask;
  }
}

async function countHighPriorityPendingTasks(id) {
  const [rows] = await pool.query(
    "SELECT * from tasks where employee_id=? AND priority=? AND status=?",
    [id, "HIGH", "PENDING"],
  );

  return rows.length;
}

module.exports = {
  createEmployeeService,
  calculateTotalTasks,
  countHighPriorityPendingTasks,
};
