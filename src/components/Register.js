import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../css/auth.css";

export default function Register() {
  const [selectedImage, setSelectedImage] = useState("No image selected");
  const [hiddenPassword, setHiddenPassword] = useState(true);

  useEffect(() => {}, []);

  return (
    <div className="auth-page">
      <form method="POST" onSubmit={(e) => e.preventDefault()}>
        <h2>Register</h2>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="email">Email address</label>
        <input type="text" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input
          type={hiddenPassword ? "password" : "text"}
          name="password"
          id="password"
        />
        <label htmlFor="repeatPassword">Confirm password</label>
        <input
          type={hiddenPassword ? "password" : "text"}
          name="repeatPassword"
          id="repeatPassword"
        />
        {/*  */}
        <button
          className="button normal"
          onClick={() => setHiddenPassword(!hiddenPassword)}
        >
          See
        </button>
        {/*  */}
        <label htmlFor="uploadImage">Add image</label>
        <input
          type="file"
          name="image"
          id="uploadImage"
          onChange={(e) => setSelectedImage(e.target.value.match(/[^\\/]*$/))}
        />
        {selectedImage}

        <button className="button danger" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
