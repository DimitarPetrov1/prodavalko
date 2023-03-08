import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
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
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // ..
      });
  };

  return (
    <div className="auth-page">
      <form method="POST" onSubmit={Submit}>
        <h2>Register</h2>
        <input type="email" name="email" placeholder="Your Email" />
        <input
          type={hiddenPassword ? "password" : "text"}
          name="password"
          placeholder="Your Password"
        />
        <input
          type={hiddenPassword ? "password" : "text"}
          name="repeatPassword"
          placeholder="Your Password"
        />

        <button
          className="button normal"
          onClick={(e) => {
            e.preventDefault();
            setHiddenPassword(!hiddenPassword);
          }}
        >
          See
        </button>

        <button className="button danger" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
