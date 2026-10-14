const express = require("express");
const dotenv = require("dotenv");
const employeeRoutes = require("./routes/employee.routes");
const taskRoutes = require("./routes/task.routes");
const loggerMiddleware = require("./middlewares/logger.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(loggerMiddleware);

app.get("/", (req, res) => {
  res.send("Server running");
});

app.use("/api/employees", employeeRoutes);
app.use("/api/tasks", taskRoutes);

app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
