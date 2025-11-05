import { useState } from "react";
import "../style/addtask.css";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [taskData, setTaskData] = useState();
  const navigate =useNavigate();
  const handleAddTask = async () => {
    let result= await fetch('http://localhost:3200/add-task',{
        method:'Post',
        body:JSON.stringify(taskData),
        credentials: 'include',
        headers:{
            'Content-Type':'Application/Json'
        }
    })
    result=await result.json();
    if(result.success){
      console.log("new task added");
      navigate('/');
    }
    else{
        alert("Failed to add task. Please try again.");
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
