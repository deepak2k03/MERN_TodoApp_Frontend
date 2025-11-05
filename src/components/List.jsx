// List.jsx
import { Fragment, useEffect, useState } from "react";
import "../style/list.css";
import { Link } from "react-router-dom";
const API_BASE = import.meta.env.VITE_API_URL;

const List = () => {
  const [taskData, setTaskData] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const token = () => localStorage.getItem("token") || "";

  useEffect(() => {
    getListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getListData = async () => {
    try {
      const resp = await fetch(`${API_BASE}/tasks`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      const list = await resp.json().catch(() => ({}));
      if (list && list.success) {
        setTaskData(list.result || []);
      } else {
        alert(list.msg || "Failed to fetch tasks. Please try again.");
      }
    } catch (err) {
      console.error("getListData error:", err);
      alert("Network error while fetching tasks. Please try again.");
    }
  };

  const deleteTask = async (id) => {
    try {
      const resp = await fetch(`${API_BASE}/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      const item = await resp.json().catch(() => ({}));
      if (item && item.success) {
        getListData();
      } else {
        alert(item.msg || "Failed to delete task. Please try again.");
      }
    } catch (err) {
      console.error("deleteTask error:", err);
      alert("Network error while deleting task. Please try again.");
    }
  };

  const selectAll = (e) => {
    if (e.target.checked) {
      let items = taskData.map((task) => task._id);
      setSelectedTasks(items);
    } else {
      setSelectedTasks([]);
    }
  };

  const selectSingleItem = (id) => {
    if (selectedTasks.includes(id)) {
      let filteredItems = selectedTasks.filter((itemId) => itemId !== id);
      setSelectedTasks(filteredItems);
    } else {
      setSelectedTasks([...selectedTasks, id]);
    }
  };

  const deleteMultiple = async () => {
    if (!selectedTasks || selectedTasks.length === 0) {
      alert("No tasks selected.");
      return;
    }
    try {
      const resp = await fetch(`${API_BASE}/delete-multiple`, {
        method: "DELETE",
        body: JSON.stringify(selectedTasks),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      const res = await resp.json().catch(() => ({}));
      if (res && res.success) {
        setSelectedTasks([]);
        getListData();
      } else {
        alert(res.msg || "Failed to delete selected tasks. Please try again.");
      }
    } catch (err) {
      console.error("deleteMultiple error:", err);
      alert("Network error while deleting selected tasks. Please try again.");
    }
  };

  return (
    <div className="list-container">
      <h1>Task List</h1>
      <button onClick={deleteMultiple} className="delete-item delete-multiple">
        Delete
      </button>
      <ul className="task-list">
        <li className="list-header">
          <input onChange={selectAll} type="checkbox" />
        </li>
        <li className="list-header"> Sr. No </li>
        <li className="list-header"> Title </li>
        <li className="list-header"> Description </li>
        <li className="list-header"> Action </li>
        {taskData &&
          taskData.map((item, index) => (
            <Fragment key={item._id}>
              <li className="list-item">
                <input
                  onChange={() => selectSingleItem(item._id)}
                  checked={selectedTasks.includes(item._id)}
                  type="checkbox"
                />
              </li>
              <li className="list-item"> {index + 1} </li>
              <li className="list-item"> {item.title} </li>
              <li className="list-item"> {item.description} </li>
              <li className="list-item">
                <button onClick={() => deleteTask(item._id)} className="delete-item">
                  Delete
                </button>
                <Link to={"update/" + item._id} className="update-item">
                  Update
                </Link>
              </li>
            </Fragment>
          ))}
      </ul>
    </div>
  );
};

export default List;
