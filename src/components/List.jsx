import { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import "../style/list.css";
import { Link } from "react-router-dom";
const API_BASE = import.meta.env.VITE_API_URL;


const List = () => {
  const [taskData, setTaskData] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    let list = await fetch(`${API_BASE}/tasks`,{
      credentials: 'include'
      // include cookies in the request
    });
    list = await list.json();
    if (list.success) {
      setTaskData(list.result);
    }
    else{
      alert("Failed to fetch tasks. Please try again.");
    }
  };

  const deleteTask = async (id) => {
    let item = await fetch(`${API_BASE}/delete/${id}`, {
      method: "DELETE",
      credentials: 'include'
    });
    item = await item.json();
    if (item.success) {
      getListData();
    }
    else{
      alert("Failed to delete task. Please try again.");
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
    let item = await fetch(`${API_BASE}/delete-multiple/`, {
      method: "DELETE",
      body: JSON.stringify(selectedTasks),
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await item.json().catch(() => ({}));
    if (res.success) {
      setSelectedTasks([]);
      getListData();
    }
    else{
      alert("Failed to delete selected tasks. Please try again.");
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
                <button
                  onClick={() => deleteTask(item._id)}
                  className="delete-item"
                >
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
