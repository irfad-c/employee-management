const {
  createTaskService,
  updateTaskService,
  summarizeTaskService,
} = require("../services/task.services");

async function createTask(req, res, next) {
  try {
    const { title, status, priority, due_date, employeeId } = req.body;
    const newStatus = status.toUpperCase();
    const newPriority = priority.toUpperCase();
    const data = await createTaskService(
      title,
      newStatus,
      newPriority,
      due_date,
      employeeId,
    );

    return res.status(201).json({ message: "New task created successfully" });
  } catch (error) {
    next(error);
  }
}

async function updateTaskStatus(req, res, next) {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const newStatus = status.toUpperCase();
    const data = await updateTaskService(newStatus, id);
    return res.status(200).json({ message: "Status updated successfully." });
  } catch (error) {
    next(error);
  }
}

async function summarizeTask(req, res, next) {
  try {
    const data = await summarizeTaskService();
    return res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createTask,
  updateTaskStatus,
  summarizeTask,
};
