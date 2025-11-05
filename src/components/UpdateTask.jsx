import "../style/addtask.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


const UpdateTask = () => {
  const [taskData, setTaskData] = useState();
  const navigate =useNavigate();
  const {id} = useParams();
  useEffect(() =>{
    getTask(id);
  },[]);
const getTask = async(id)=>{
    let task = await fetch(`http://localhost:3200/task/${id}`);
    task = await task.json();
    if(task.result){
        setTaskData(task.result);
    }
}

const updateTask = async() => {
    let task = await fetch("http://localhost:3200/update-task", {
        method: "PUT",
        body: JSON.stringify(taskData),
        headers: {
          "Content-Type": "application/json"
        }
      });
      task = await task.json();
      if (task) {
        alert("Task Updated Successfully");
        navigate("/");  
      }
}
  return (
    <div className="container">
      <h1>Update Task</h1>
      <label htmlFor="">Title</label>
      <input
            value={taskData?.title}
        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
        type="text"
        name="title"
        placeholder="Enter task title"
      />
      <label htmlFor="">Description</label>
      <textarea
        value={taskData?.description}
        onChange={(e) =>
          setTaskData({ ...taskData, description: e.target.value })
        }
        rows={5}
        name="description"
        placeholder="Enter task description "
        id=""
      ></textarea>
      <button className="submit" onClick={updateTask}>

        Update Task
      </button>
    </div>
  );
};

export default UpdateTask;
