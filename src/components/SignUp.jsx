import { useEffect, useState } from "react";
import "../style/addtask.css";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userData, setUserData] = useState();
  const navigate =useNavigate();

  useEffect(()=>{
      if(localStorage.getItem('login')){
          navigate('/');
      }
    })

  const handleSingUp = async() => {
    let result = await fetch("http://localhost:3200/signup", {
        method: "POST", 
        body: JSON.stringify(userData),
        headers: {
            "Content-Type": "application/json"
        }
    });
    result = await result.json();
    if(result.success){
        console.log(result);
        document.cookie="token="+result.token;
        localStorage.setItem('login', userData.email);
        navigate('/');
    }
    else{
        alert("SignUp failed. Please try again.");
    }
}
  return (
    <div className="container">
      <h1>SignUp</h1>
      <label htmlFor="">Name</label>
      <input
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        type="text"
        name="name"
        placeholder="Enter Name"
      />

      <label htmlFor="">Email</label>
      <input
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        type="email"
        name="email"
        placeholder="Enter Email"
      />

      <label htmlFor="">Email</label>
      <input
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        type="password"
        name="password"
        placeholder="Enter Password"
      />

      <button onClick={handleSingUp} className="submit">SignUp</button>
      <Link to='/login' className="link">Login here</Link>
    </div>
  );
};

export default SignUp;
