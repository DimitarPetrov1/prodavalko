import NotFoundSVG from "../img/undraw_page_not_found_re_e9o6.svg";
import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found">
      <img src={NotFoundSVG} alt="" />
      <h2>We can't find that page!</h2>
      <br />
      <NavLink className="text-link" to="/">
        <p>Visit our home page. </p>
      </NavLink>
    </div>
  );
}
