// Login.jsx
import { useEffect, useState } from "react";
import "../style/addtask.css";
import { Link, useNavigate } from "react-router-dom";
const API_BASE = import.meta.env.VITE_API_URL;

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("login")) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async () => {
    try {
      const resp = await fetch(`${API_BASE}/login`, {
        method: "POST",
        credentials: "include", // keep cookie flow
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await resp.json().catch(() => ({}));

      if (result && result.success) {
        // save token for Authorization header fallback
        if (result.token) localStorage.setItem("token", result.token);

        // keep the existing login marker (if you use it elsewhere)
        localStorage.setItem("login", userData.email);
        window.dispatchEvent(new Event("localStorage-change"));
        navigate("/");
      } else {
        alert(result.msg || "Please check your email or password");
      }
    } catch (err) {
      console.error("handleLogin error:", err);
      alert("Network/server error during login. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>

      <label>Email</label>
      <input
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        type="email"
        name="email"
        placeholder="Enter Email"
      />

      <label>Password</label>
      <input
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        type="password"
        name="password"
        placeholder="Enter Password"
      />

      <button onClick={handleLogin} className="submit">
        Login
      </button>
      <Link to="/signup" className="link">
        SignUp here
      </Link>
    </div>
  );
};

export default Login;
