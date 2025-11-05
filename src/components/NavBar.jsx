import { Link, Navigate, useNavigate } from "react-router-dom";
import "../style/navbar.css";
import { useEffect, useState } from "react";


const NavBar = () => {
  const navigate=useNavigate();
  const [login, setLogin] = useState(localStorage.getItem("login"));
  const logout = () => {
    localStorage.removeItem("login");
    setLogin(null);
    setTimeout(() => {
      navigate("/login");
    }, 100);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setLogin(localStorage.getItem("login"));
    };
    window.addEventListener("localStorage-change", handleStorageChange);

    return ()=>{
      window.removeEventListener("localStorage-change", handleStorageChange);
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">ToDo App</div>
      <ul className="nav-links">
        {login ? (
          <>
            <li>
              <Link to="/">List</Link>
            </li>
            <li>
              <Link to="/add">Add Task</Link>
            </li>
            <li>
              <Link onClick={logout}>Logout</Link>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
};

export default NavBar;
