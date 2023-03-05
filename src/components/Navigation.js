import { NavLink } from "react-router-dom";
import "../css/navigation.css";

export default function Navigation() {
  return (
    <nav>
      <ul className="nav">
        <li>
          <NavLink to="/">home</NavLink>
        </li>
        <li>
          <NavLink to="/catalog">catalog</NavLink>
        </li>
        <li>
          <NavLink to="/create">create</NavLink>
        </li>
        <li>
          <NavLink to="/register">register</NavLink>
        </li>
        <li>
          <NavLink to="/login">login</NavLink>
        </li>
        <li>
          <NavLink to="/logout">logout</NavLink>
        </li>
      </ul>
    </nav>
  );
}
