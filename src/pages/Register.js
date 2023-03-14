import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import SignUpSVG from "../img/undraw_sign__up_nm4k.svg";
import HiddenIcon from "../img/eye-off.svg";
import VisibleIcon from "../img/eye.svg";
import "../css/auth.css";

export default function Register() {
  const [hiddenPassword, setHiddenPassword] = useState(true);

  const Submit = (e) => {
    e.preventDefault();

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
          avatar: "",
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div className="auth-page">
      <h1>Sign up</h1>
      <form method="POST" onSubmit={Submit}>
        <input type="text" name="username" placeholder="Username" />
        <input type="email" name="email" placeholder="Your Email" />
        <input
          type="number"
          name="phoneNumber"
          placeholder="Your phone number"
        />
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
        Already have an account? <Link to="/login">Sign in</Link>.
      </p>
      <p>
        Or just browse our offers <Link to="/catalog">here</Link>.
      </p>
    </div>
  );
}
