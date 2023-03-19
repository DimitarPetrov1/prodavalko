import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import SignInSVG from "../img/undraw_secure_login_pdn4.svg";
import HiddenIcon from "../img/eye-off.svg";
import VisibleIcon from "../img/eye.svg";

const Login = () => {
  const [hiddenPassword, setHiddenPassword] = useState(true);

  const Submit = (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value
    );
  };

  return (
    <div className="page auth-page">
      <h1>Sign in</h1>
      <form method="POST" onSubmit={Submit}>
        <input type="email" name="email" placeholder="Your email" />
        <div className="icon-holder">
          <input
            type={hiddenPassword ? "password" : "text"}
            name="password"
            placeholder="Your Password"
          />
          {hiddenPassword ? (
            <img
              src={HiddenIcon}
              alt=""
              className="eye-icon"
              onClick={(e) => {
                e.preventDefault();
                setHiddenPassword(!hiddenPassword);
              }}
            />
          ) : (
            <img
              src={VisibleIcon}
              alt=""
              className="eye-icon"
              onClick={(e) => {
                e.preventDefault();
                setHiddenPassword(!hiddenPassword);
              }}
            />
          )}
        </div>

        <button className="button success">Sign in</button>

        <img src={SignInSVG} alt="" />
      </form>
      <p>
        Don't have an account? <Link to="/register">Sign up</Link>.
      </p>
      <p>
        Or just browse our offers <Link to="/catalog">here</Link>.
      </p>
    </div>
  );
};

export default Login;
