function validateTask(req, res, next) {
  const { title, status, priority, due_date, employeeId } = req.body;
  if (!title || !status || !priority || !due_date || !employeeId) {
    return res.status(400).json({ message: "All fields are required." });
  }
  if (title.trim() === "") {
    return res.status(400).json({ message: "title cannot be empty." });
  }

const allowedStatus=["todo"]

  if (!allowedStatus.includes(status.toLowerCase())) {
    return res
      .status(400)
      .json({ message: "You can only create a todo task." });
  }

  const allowedPriorities = ["low", "medium", "high"];

  if (!allowedPriorities.includes(priority.toLowerCase())) {
    return res
      .status(400)
      .json({ message: "Priority should be low / medium / high" });
  }

  if (new Date(due_date).getTime() < Date.now()) {
    return res.status(400).json({ message: "Due date cannot be in the past." });
  }

  next();
}

module.exports = validateTask;
