function validateTask(req, res,next) {
  const { title, status, priority, due_date } = req.body;
  if (!title || !status  || !priority ||!due_date) {
    return res.status(400).json({ message: "All fields are required." });
  }
  if (status === "completed") {
    return res
      .status(400)
      .json({ message: "You cant create a completed task." });
  }
  if (new Date(due_date).getDate() < Date.now()) {
    return res.status(400).json({ message: "Due date cannot be in the past." });
  }
  next()
}

module.exports = validateTask;
