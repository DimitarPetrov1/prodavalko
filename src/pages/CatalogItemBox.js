import { NavLink } from "react-router-dom";
import "../css/catalog-item-box.css";

export default function CatalogItemBox({ id, details }) {
  return (
    <div className="catalog-item-box">
      <img src={details.image} alt="" />
      <div className="catalog-item-description-box">
        {/* To fix overflowing with larger texts */}
        <p>{details.name}</p>
        <p>{details.description}</p>
        <p>{details.price}</p>
        <div className="catalog-item-buttons-box">
          <NavLink>Like</NavLink>
          <NavLink className="button success" to={`/catalog/${id}`}>
            See offer
          </NavLink>
        </div>
      </div>
    </div>
  );
}
