import { NavLink } from "react-router-dom";
import "../css/navigation.css";

export default function Navigation({ loggedUser }) {
  return (
    <nav>
      <ul className="nav">
        <li>
          <NavLink to="/">home</NavLink>
        </li>
        <li>
          <NavLink to="/catalog">catalog</NavLink>
        </li>
        {loggedUser ? (
          <>
            <li>
              <NavLink to="/create">create</NavLink>
            </li>
            <li>
              <NavLink to="/logout">logout</NavLink>
            </li>
            <li>
              <NavLink to={`/profile/${loggedUser.uid}`}>profile</NavLink>
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
