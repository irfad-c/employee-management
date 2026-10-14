// Execute businees logic
const pool = require("../config/db");

async function createEmployeeService(name, email, department, salary) {
  const [rows] = await pool.query("SELECT * from employees where email=?", [
    email,
  ]);

  if (rows.length > 0) {
    const error = new Error("Email already exist.");
    error.statusCode = 409;
    throw error;
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
    const error = new Error("Employee not found.");
    error.statusCode = 404;
    throw error;
  }

  const [task] = await pool.query("SELECT * from tasks where employee_id=?", [
    id,
  ]);

  if (task.length === 0) {
    const error = new Error("Task not found.");
    error.statusCode = 404;
    throw error;
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
    "SELECT COUNT(*) AS highPriorityPendingTasks FROM tasks WHERE employee_id=? AND priority=? AND status=?",
    [id, "HIGH", "IN_PROGRESS"],
  );
  return rows[0].highPriorityPendingTasks;
}

async function countOverdueTask(id) {
  const [rows] = await pool.query(
    "SELECT COUNT(*)AS overdueTasks FROM tasks WHERE employee_id=? AND due_date < CURDATE() AND status!='COMPLETED'",
    [id],
  );
  return rows[0].overdueTasks;
}

module.exports = {
  createEmployeeService,
  calculateTotalTasks,
  countHighPriorityPendingTasks,
  countOverdueTask,
};
