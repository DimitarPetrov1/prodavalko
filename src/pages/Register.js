import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import SignUpSVG from "../img/undraw_sign__up_nm4k.svg";
import HiddenIcon from "../img/eye-off.svg";
import VisibleIcon from "../img/eye.svg";
import Alert from "../pages/partials/Alert";

import "../css/auth.css";

export default function Register() {
  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState("");
  const [alert, setAlert] = useState(false);

  const [hiddenPassword, setHiddenPassword] = useState(true);

  const Submit = (e) => {
    e.preventDefault();

    // Check if all inputs are entered
    if (
      !e.target.username.value ||
      !e.target.email.value ||
      !e.target.phoneNumber.value ||
      !e.target.password.value ||
      !e.target.repeatPassword.value
    ) {
      setAlertMessage("All fields are required!");
      setAlert(true);
      return;
    }

    if (e.target.phoneNumber.value.match(/[^0-9.]/g)) {
      setAlertMessage("Please input your phone number");
      setAlert(true);
      return;
    }
    if (e.target.password.value !== e.target.repeatPassword.value) {
      setAlertMessage("Passwords don't match");
      setAlert(true);
      return;
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value
    )
      .then(async (userCredential) => {
        await setDoc(doc(db, "userData", userCredential.user.uid), {
          username: e.target.username.value,
          phoneNumber: e.target.phoneNumber.value,
          likes: [],
        });
      })
      .then(() => {
        if (auth) {
          navigate("/");
        }
      })
      .catch((err) => {
        let message;

        if (err.message.includes("auth/email-already-in-use")) {
          message = "Email already registered!";
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
      <h1 className="page-header">Sign up</h1>
      <form method="POST" onSubmit={Submit}>
        <input type="text" name="username" placeholder="Username" />
        <input type="email" name="email" placeholder="Your Email" />
        <input type="text" name="phoneNumber" placeholder="Your phone number" />
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
        <input
          type={hiddenPassword ? "password" : "text"}
          name="repeatPassword"
          placeholder="Your Password"
        />

        <button className="button success" type="submit">
          Sign up
        </button>

        <img src={SignUpSVG} alt="" />
      </form>
      <p>
        Already have an account?{" "}
        <Link className="text-link" to="/login">
          Sign in
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
}
