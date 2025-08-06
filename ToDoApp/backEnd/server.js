const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const cors = require("cors");
const fs = require("fs");
const path = require("path");

app.use(cors());
app.use(express.json());

const fileDirectory = path.join(__dirname, "data", "toDos.json");

app.post("/", (req, res) => {
  const receivedTask = req.body;
  console.log(receivedTask);
  let taskArray = [];
  fs.readFile(fileDirectory, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Corrupted data file" });
    } else {
      taskArray = JSON.parse(data); //converts a JSON-formatted string into a JavaScript object.
      taskArray.push(receivedTask);
    }

    fs.writeFile(fileDirectory, JSON.stringify(taskArray, null, 2), (err) => {
      // JSON.stringify(taskArray, null, 2) converts a JavaScript object or array into a JSON-formatted string
      //JSON.stringify(value, replacer, space)
      //taskArray: the object or array you want to convert to a JSON string.
      // null: means no filtering or replacer — include all keys.
      // 2: tells it to format the JSON string with 2-space indentation (for readability).
      if (err) {
        return res.status(500).json({ message: "Failed to save the task" });
      } else {
        res.json({ message: "Tasks Saved" });
      }
    });
  });
});

app.get("/tasks", (req, res) => {
  fs.readFile(fileDirectory, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading File", err);
      return res.status(500).json({ message: "Failed to Read File" });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.delete("/tasks/:index", (req, res) => {
  const taskIndex = parseInt(req.params.index);

  fs.readFile(fileDirectory, "utf-8", (err, data) => {
    let taskNow = [];
    if (err) {
      return res.status(500).json({ message: "Corrupted data file" });
    } else {
      taskNow = JSON.parse(data);
      taskNow.splice(taskIndex, 1);
    }

    fs.writeFile(fileDirectory, JSON.stringify(taskNow, null, 2), (err) => {
      if (err) {
        res.status(500).json({ message: "Failed to Delete" });
      } else {
        res.json({ message: "Task deleted successfully" });
      }
    });
  });
});

app.put("/tasks/:index", (req, res) => {
  const taskIndex = parseInt(req.params.index);
  const taskEdited = req.body;

  fs.readFile(fileDirectory, "utf-8", (err, data) => {
    let taskNow = [];
    if (err) {
      return res.status(500).json({ message: "Corrupted data file" });
    } else {
      taskNow = JSON.parse(data);
      taskNow[taskIndex] = taskEdited;
    }

    fs.writeFile(fileDirectory, JSON.stringify(taskNow, null, 2), (err) => {
      if (err) {
        res.status(500).json({ message: "Failed to Edit" });
      } else {
        res.json({ message: "Successfully Edited" });
      }
    });
  });
});

app.listen(PORT, () => console.log(`Server Running on ${PORT} Succesfully`));
