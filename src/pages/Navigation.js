import { NavLink } from "react-router-dom";
import "../css/navigation.css";

export default function Navigation({ user }) {
  return (
    <nav>
      <ul className="nav">
        <li>
          <NavLink to="/">home</NavLink>
        </li>
        <li>
          <NavLink to="/catalog">catalog</NavLink>
        </li>
        {user ? (
          <>
            <li>
              <NavLink to="/create">create</NavLink>
            </li>
            <li>
              <NavLink to="/logout">logout</NavLink>
            </li>
            <li>
              <NavLink to="/profile">profile</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/register">register</NavLink>
            </li>
            <li>
              <NavLink to="/login">login</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
