import { NavLink } from "react-router-dom";
import "../css/catalog-item-box.css";

export default function CatalogItemBox({ id, details }) {
  return (
    <NavLink to={`/catalog/${id}`}>
      <div className="catalog-item-box">
        <img src={details.image} alt="" />
        <div className="catalog-item-description-box">
          {/* To fix overflowing with larger texts */}
          <p>{details.name}</p>
          <p className="catalog-item-box-description">
            {details.description.slice(0, 300)}
          </p>
          <p>{details.price}$</p>
        </div>
      </div>
    </NavLink>
  );
}
