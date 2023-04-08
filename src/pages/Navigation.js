import { NavLink } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../css/navigation.css";

export default function Navigation({ loggedUser }) {
  const navigate = useNavigate();

  const onLogout = () => {
    const user = getAuth();
    signOut(user)
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

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
              <NavLink onClick={onLogout}>logout</NavLink>
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
