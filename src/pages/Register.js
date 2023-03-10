import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";
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
      <form method="POST" onSubmit={Submit}>
        <h2>Register</h2>
        <input type="text" name="username" placeholder="Username" />
        <input type="email" name="email" placeholder="Your Email" />
        <input
          type="number"
          name="phoneNumber"
          placeholder="Your phone number"
        />
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
