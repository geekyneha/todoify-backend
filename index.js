const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo"); // Import your schema

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("YOUR_MONGO_DB_URI", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Get all todos
app.get("/get", async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new task
app.post("/add", async (req, res) => {
  try {
    const { task } = req.body;
    if (!task.trim())
      return res.status(400).json({ error: "Task cannot be empty" });

    const newTodo = new TodoModel({ task });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update task status (mark as completed)
app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await TodoModel.findById(id);
    if (!todo) return res.status(404).json({ error: "Task not found" });

    todo.status = !todo.status; // Toggle status
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✨ Update task text (Edit functionality)
app.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;

    if (!task.trim())
      return res.status(400).json({ error: "Task cannot be empty" });

    const updatedTask = await TodoModel.findByIdAndUpdate(
      id,
      { task },
      { new: true }
    );
    if (!updatedTask) return res.status(404).json({ error: "Task not found" });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a task
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await TodoModel.findByIdAndDelete(id);
    if (!deletedTask) return res.status(404).json({ error: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
