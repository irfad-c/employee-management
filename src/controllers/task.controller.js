const {
  createTaskService,
  updateTaskService,
  summarizeTaskService,
} = require("../services/task.services");

async function createTask(req, res) {
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
    console.error(error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Cant able to create task." });
  }
}

async function updateTaskStatus(req, res) {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const newStatus = status.toUpperCase();
    const data = await updateTaskService(newStatus, id);
    return res.status(200).json({ message: "Status updated successfully." });
  } catch (error) {
    console.error(error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Cant able to update task." });
  }
}

async function summarizeTask(req, res) {
  try {
    const data = await summarizeTaskService();
    return res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createTask,
  updateTaskStatus,
  summarizeTask,
};
