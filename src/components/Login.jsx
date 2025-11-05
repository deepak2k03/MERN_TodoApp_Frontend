import { useEffect, useState } from "react";
import "../style/addtask.css";
import { Link, useNavigate } from "react-router-dom";
const API_BASE = import.meta.env.VITE_API_URL;

const Login = () => {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const navigate =useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('login')){
        navigate('/');
    }
  })
  const handleLogin = async() => {
    let result = await fetch(`${API_BASE}/login`, {
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
        window.dispatchEvent(new Event("localStorage-change"));
        navigate('/');
    }
    else{
        alert("Please check your email or password");
    }
}

  return (
    <div className="container">
      <h1>Login</h1>

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

      <button onClick={handleLogin} className="submit">Login</button>
      <Link to='/signup' className="link">SignUp here</Link>
    </div>
  );
};

export default Login;
