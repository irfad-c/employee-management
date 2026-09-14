const express = require("express");
const dotenv = require("dotenv");
const employeeRoutes=require("./src/routes/employee.routes")
const taskRoutes=require("./src/routes/task.routes")

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running");
});

app.use("/api/employees",employeeRoutes)
app.use("/api/tasks",taskRoutes)

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
