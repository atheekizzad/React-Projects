import React, { useEffect, useState } from "react";
import "./ToDo.css";

function ToDo() {
  const [task, setTask] = useState("");
  const [stores, setStore] = useState([]);
  const [msg, setMsg] = useState("");
  const [schedule, setSchedule] = useState("");
  const [status, setStatus] = useState(false);

  const alertMsg = (text) => {
    setMsg(text);
    setTimeout(() => {
      setMsg("");
    }, 2000);
  };
  const handleClick = () => {
    if (!task.trim() || !schedule) {
      alertMsg("Both Fileds Required");
      return;
    } else if (stores.some((store) => store.name === task.trim())) {
      alertMsg("Task already Existed");
      setTask("");
      setSchedule("");
      return;
    } else {
      const taskToAdded = {
        name: task.trim(),
        time: schedule.replace("T", " "),
        completed: false,
      };
      setStore((prev) => [...prev, taskToAdded]);

      const handleSave = async (content) => {
        try {
          const res = await fetch("http://localhost:3500/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(content),
            //It converts a JavaScript object or array (stores)
            //  into a JSON-formatted string, so it can be sent in an HTTP request or written to a file.
          });
          if (!res.ok) {
            alertMsg("Failed to Post");
          } else {
            const data = await res.json();
            alertMsg(data.message);
          }
        } catch (err) {
          console.error(err);
          alertMsg("Something Wrong");
        }
      };
      handleSave(taskToAdded);
      setTask("");
      setSchedule("");
    }
  };
  const deleteItem = (index) => {
    setStore(stores.filter((store, i) => i !== index));

    const deleteTaskInBackend = async (index) => {
      try {
        const res = await fetch(`http://localhost:3500/tasks/${index}`, {
          method: "DELETE",
        });
        const data = await res.json();
        alertMsg(data.message);
      } catch (err) {
        console.error(err);
      }
    };
    deleteTaskInBackend(index);
  };
  const editItem = (index) => {
    const taskToEdit = prompt("Edit The Task", stores[index].name);
    const scheduleToEdit = prompt(
      "Edit Schedule (YYYY-MM-DD HH:MM)",
      stores[index].time.replace("T", " ")
    );
    const updatedStores = [...stores];
    if (
      taskToEdit !== null &&
      taskToEdit.trim() !== "" &&
      scheduleToEdit !== null &&
      scheduleToEdit.trim() !== ""
    ) {
      const trimmedTask = taskToEdit.trim();
      const isDuplicate = stores.some(
        (task, i) => i !== index && task.name === trimmedTask
      );
      //.some(...) → a JavaScript array method that returns true if at least one item in the array meets the condition.
      //isDuplacite return Truie or False
      if (!isDuplicate) {
        updatedStores[index] = {
          name: trimmedTask,
          time: scheduleToEdit,
          completed: stores[index].completed,
        };
        setStore(updatedStores);
        alertMsg("Succesfully Edited");
        handleEditinBackEnd(index, updatedStores[index]);
      } else {
        alertMsg("Task Already Exist");
      }
    }
  };

  const handleEditinBackEnd = async (index, editedTask) => {
    try {
      const res = await fetch(`http://localhost:3500/tasks/${index}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedTask),
      });
      const data = await res.json();
      alertMsg(data.message);
    } catch (err) {
      console.error(err);
    }
  };
  const handleToggle = (index) => {
    const updatedStores = [...stores];
    updatedStores[index].completed = !updatedStores[index].completed;
    setStore(updatedStores);
  };

  const handleAutoLoadfromBackEnd = async () => {
    try {
      const res = await fetch("http://localhost:3500/tasks");
      if (!res.ok) {
        alertMsg("Error in Loading History");
      } else {
        const data = await res.json();
        if (!data) {
          return;
        } else {
          setStore(data);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    handleAutoLoadfromBackEnd();
  }, []);
  return (
    <div>
      <h1>
        <span className="icon">📝</span> To Do App with React & Nodejs | Express
      </h1>
      <label htmlFor="to_do">Enter the Do Here..........</label>
      <input
        type="text"
        id="to_do"
        placeholder="Enter Your Task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      ></input>
      <input
        type="datetime-local"
        value={schedule}
        onChange={(e) => setSchedule(e.target.value)}
      />
      <button onClick={handleClick}>Add</button>
      <h2>{msg}</h2>

      <ul>
        {stores.map((store, index) => (
          <li key={index}>
            <div
              className={`text-container ${store.completed ? "completed" : ""}`}
            >
              {store.name}
            </div>
            <small>
              Scheduled at: {store.time.replace("T", " ") || "No schedule"}
            </small>
            <div className="button-container">
              <button onClick={() => deleteItem(index)}> Delete</button>{" "}
              <button onClick={() => editItem(index)}>Edit</button>
              <button
                onClick={() => handleToggle(index)}
                className="mark-toggle"
              >
                {!store.completed ? "Completed" : "Pending"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDo;
