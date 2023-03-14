import { auth } from "../firebase/config";
import Login from "./Login";
import WelcomeIcon from "../img/undraw_welcome_re_h3d9.svg";

import "../css/home.css";

export default function Home() {
  return (
    <div className="home">
      {auth.currentUser && auth.currentUser.uid ? (
        <img src={WelcomeIcon} alt=""></img>
      ) : (
        <Login />
      )}

      <p></p>
    </div>
  );
}
