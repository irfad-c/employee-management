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

async function workLoadStats(id) {
  const [employee] = await pool.query("SELECT * from employees where id=?", [
    id,
  ]);
  if (employee.length === 0) {
    const error = new Error("Employee not found.");
    error.statusCode = 404;
    throw error;
  }

  const [task] = await pool.query(
    `SELECT COUNT(*)AS total_tasks ,
    CAST(SUM(CASE WHEN status='IN_PROGRESS' THEN 1 ELSE 0 END)AS UNSIGNED)AS pending_tasks,
    CAST(SUM(CASE WHEN status='COMPLETED' THEN 1 ELSE 0 END)AS UNSIGNED)AS completed_tasks,
    CAST(SUM(CASE WHEN status='IN_PROGRESS' AND priority='HIGH' THEN 1 ELSE 0 END)AS UNSIGNED)AS high_priority_pending,
    CAST(SUM(CASE WHEN due_date<CURDATE() AND status!='COMPLETED' THEN 1 ELSE 0 END)AS UNSIGNED)AS overdue_tasks 
    FROM tasks where employee_id=?`,
    [id],
  );

  const total_tasks = task[0].total_tasks;
  const pending_tasks = task[0].pending_tasks;
  const completed_tasks = task[0].completed_tasks;
  const high_priority_pending = task[0].high_priority_pending;
  const overdue_tasks = task[0].overdue_tasks;

  return {
    employee_id: Number(id),
    total_tasks,
    pending_tasks,
    completed_tasks,
    high_priority_pending,
    overdue_tasks,
  };
}

module.exports = {
  createEmployeeService,
  workLoadStats,
};
