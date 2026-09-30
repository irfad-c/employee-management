const pool = require("../config/db");

async function employeeTaskCount(employeeId) {
  const [result] = await pool.query(
    "select employees.id,employees.name, count(tasks.id)as task_count from employees left join tasks on employees.id=tasks.employee_id where employees.id=?group by employees.id,employees.name",
    [employeeId],
  );
  if (result.length === 0) {
    const error = new Error("No task found for this employ");
    throw error;
  }
  return result[0];
}

async function createTaskService(
  title,
  status,
  priority,
  due_date,
  employeeId,
) {
  const [employeeData] = await pool.query(
    "select * from employees where id=?",
    [employeeId],
  );
  if (employeeData.length === 0) {
    const error = new Error("Employee data not found");
    error.statusCode = 404;
    throw error;
  }
  const tasks = await employeeTaskCount(employeeId);
  const noOftasks = tasks.task_count;
  if (noOftasks >= 3) {
    const error = new Error("Task limit reached.");
    error.statusCode = 400;
    throw error;
  }
  const [newTask] = await pool.query(
    "INSERT INTO tasks (employee_id,title,status,priority,due_date)VALUES(?,?,?,?,?)",
    [employeeId, title, status, priority, due_date],
  );
  return {
    newTask,
    message: "New task inserted successfully",
  };
}

async function updateTaskService(status, id) {
  const [rows] = await pool.query("SELECT status FROM tasks  WHERE id=?", [id]);
  if (rows.length === 0) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  const currentStatus = rows[0].status;

  if (currentStatus === "TODO" && status === "IN_PROGRESS") {
    await pool.query("UPDATE tasks SET status=? WHERE id=?", [status, id]);
  } else if (currentStatus === "IN_PROGRESS" && status === "COMPLETED") {
    await pool.query("UPDATE tasks SET status=? WHERE id=?", [status, id]);
  } else {
    return "Update not possible";
  }
}

module.exports = { createTaskService, updateTaskService };
