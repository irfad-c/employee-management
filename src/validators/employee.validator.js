// validate employee data before processing it.

function validateEmployee(req, res, next) {
  const { name, email, salary, department } = req.body;
  if (!name || !email || !salary || !department) {
    return res.status(400).json({ message: "All fields are required." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      message: "Enter a valid email",
    });
  }
  next();
}

module.exports = validateEmployee;
