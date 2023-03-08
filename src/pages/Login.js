import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const Login = () => {
  const Submit = (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value
    )
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
      });
  };

  return (
    <div className="auth-page">
      <form method="POST" onSubmit={Submit}>
        <h1>Login</h1>

        <input type="email" name="email" placeholder="Your email" />
        <input type="password" name="password" placeholder="Your Password" />

        <button>Login</button>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
