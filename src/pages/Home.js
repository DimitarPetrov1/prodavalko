import { useContext } from "react";
import { UserContext } from "../context/userContext";

import "../css/home.css";
import { NavLink } from "react-router-dom";

export default function Home() {
  const user = useContext(UserContext);

  return (
    <div className="page home">
      <h1 className="page-header">Welcome to Prodavalko</h1>
      <h3 style={{ marginBottom: 10 }}>The best place to sell or buy stuff!</h3>

      {user ? (
        <p>Hello again</p>
      ) : (
        <p>
          <NavLink className="text-link" to="/login">
            Login
          </NavLink>
          {" or "}
          <NavLink className="text-link" to="/register">
            Register
          </NavLink>
          {" to get full access!"}
        </p>
      )}
    </div>
  );
}
