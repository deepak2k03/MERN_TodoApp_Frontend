// UpdateTask.jsx
import "../style/addtask.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
const API_BASE = import.meta.env.VITE_API_URL;

const UpdateTask = () => {
  const [taskData, setTaskData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) getTask(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getTask = async (id) => {
    try {
      const resp = await fetch(`${API_BASE}/task/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      const task = await resp.json().catch(() => ({}));
      if (task && task.success && task.result) {
        setTaskData(task.result);
      } else {
        alert(task.msg || "Failed to fetch task. Please try again.");
      }
    } catch (err) {
      console.error("getTask error:", err);
      alert("Network error while fetching task. Please try again.");
    }
  };

  const updateTask = async () => {
    try {
      const resp = await fetch(`${API_BASE}/update-task`, {
        method: "PUT",
        body: JSON.stringify(taskData),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      const result = await resp.json().catch(() => ({}));
      if (result && result.success) {
        alert("Task Updated Successfully");
        navigate("/");
      } else {
        alert(result.msg || "Failed to update task. Please try again.");
      }
    } catch (err) {
      console.error("updateTask error:", err);
      alert("Network error while updating task. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Update Task</h1>
      <label>Title</label>
      <input
        value={taskData?.title || ""}
        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
        type="text"
        name="title"
        placeholder="Enter task title"
      />
      <label>Description</label>
      <textarea
        value={taskData?.description || ""}
        onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
        rows={5}
        name="description"
        placeholder="Enter task description "
      />
      <button className="submit" onClick={updateTask}>
        Update Task
      </button>
    </div>
  );
};

export default UpdateTask;
