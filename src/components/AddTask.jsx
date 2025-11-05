import { useState } from "react";
import "../style/addtask.css";
import { useNavigate } from "react-router-dom";
const API_BASE = import.meta.env.VITE_API_URL;

const AddTask = () => {
  const [taskData, setTaskData] = useState();
  const navigate = useNavigate();

  const handleAddTask = async () => {
    if (!taskData || !taskData.title) {
      alert("Please enter a title for the task.");
      return;
    }

    try {
      let result = await fetch(`${API_BASE}/add-task`, {
        method: "POST", // fixed
        body: JSON.stringify(taskData),
        credentials: "include",
        headers: {
          "Content-Type": "application/json", // fixed
        },
      });
      result = await result.json().catch(() => ({}));
      if (result && result.success) {
        console.log("new task added");
        navigate("/");
      } else {
        alert("Failed to add task. Please try again.");
      }
    } catch (err) {
      console.error("handleAddTask error:", err);
      alert("Network error while adding task. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Add New Task</h1>
      <label htmlFor="">Title</label>
      <input
        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
        type="text"
        name="title"
        placeholder="Enter task title"
      />
      <label htmlFor="">Description</label>
      <textarea
        onChange={(e) =>
          setTaskData({ ...taskData, description: e.target.value })
        }
        rows={5}
        name="description"
        placeholder="Enter task description "
        id=""
      ></textarea>
      <button onClick={handleAddTask} className="submit">
        Add New Task
      </button>
    </div>
  );
};

export default AddTask;
