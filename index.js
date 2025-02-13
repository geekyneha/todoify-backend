require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const TodoModel = require("./Models/Todo");

const port = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// // Add a new task
// app.post("/add", async (req, res) => {
//   try {
//     const { task } = req.body;
//     if (!task.trim())
//       return res.status(400).json({ error: "Task cannot be empty" });

//     const newTodo = new TodoModel({ task });
//     await newTodo.save();
//     res.status(201).json(newTodo);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
app.post("/add", async (req, res) => {
  try {
    const { task } = req.body;
    if (!task.trim())
      return res.status(400).json({ error: "Task cannot be empty" });

    const newTodo = new TodoModel({ task });
    const savedTodo = await newTodo.save(); // Save to DB and get full object

    res.status(201).json(savedTodo); // Return full task object
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate({ _id: id }, { status: true })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
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
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
