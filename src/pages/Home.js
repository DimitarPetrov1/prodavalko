import { NavLink } from "react-router-dom";

import "../css/home.css";

export default function Home({ user }) {
  return (
    <div className="home">
      <h2>
        {user
          ? `Hello ${user.email}, we're glad you're back`
          : "Welcome to the best place to sell and buy your stuff!"}
      </h2>

      <p>
        <NavLink className="home-link" to="/catalog">
          See our latest items here!
        </NavLink>
      </p>
    </div>
  );
}
