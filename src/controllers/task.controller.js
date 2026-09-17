const {
  createTaskService,
  updateTaskService,
} = require("../services/task.services");

async function createTask(req, res) {
  try {
    const { title, status, priority, due_date, employeeId } = req.body;
    const data = await createTaskService(
      title,
      status,
      priority,
      due_date,
      employeeId,
    );

    return res.status(201).json({ message: "New task created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Cant able to create task." });
  }
}

async function updateTaskStatus(req, res) {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const data = await updateTaskService(status, id);
    return res.status(200).json({message:"Status updated successfully."})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Cant able to update task." });
  }
}

module.exports = { createTask, updateTaskStatus };
