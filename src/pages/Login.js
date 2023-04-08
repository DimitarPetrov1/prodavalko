import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import SignInSVG from "../img/undraw_secure_login_pdn4.svg";
import HiddenIcon from "../img/eye-off.svg";
import VisibleIcon from "../img/eye.svg";
import Alert from "../pages/partials/Alert";

const Login = () => {
  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState("");
  const [alert, setAlert] = useState(false);

  const [hiddenPassword, setHiddenPassword] = useState(true);

  const Submit = (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value
    )
      .then(() => {
        if (auth) {
          navigate("/");
        }
      })
      .catch((err) => {
        let message;

        if (err.message.includes("auth/user-not-found")) {
          message = "Wrong email or password!";
        }
        if (err.message.includes("auth/wrong-password")) {
          message = "Wrong password!";
        } else {
          message = err.message;
        }

        setAlertMessage(message);
        setAlert(true);
      });
  };

  return (
    <div className="page auth-page">
      {alert ? (
        <Alert message={alertMessage} onClose={() => setAlert(false)} />
      ) : null}
      <h1 className="page-header">Sign in</h1>
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
        Don't have an account?{" "}
        <Link className="text-link" to="/register">
          Sign up
        </Link>
        .
      </p>
      <p>
        Or just browse our offers{" "}
        <Link className="text-link" to="/catalog">
          here
        </Link>
        .
      </p>
    </div>
  );
};

export default Login;
