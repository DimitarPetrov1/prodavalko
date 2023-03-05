import { NavLink } from "react-router-dom";
import "../css/details.css";

export default function Details() {
  return (
    <div className="details">
      <div className="details-container">
        <p>Offer title</p>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCm9N4vxJ2ZQbReOYcPyGuHyp4uD2eFnkvvQ&usqp=CAU"
          alt="photo"
        />
        <p>Price: 400$</p>
        <p>Description</p>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
          laudantium commodi non aspernatur alias atque placeat maiores, quis
          corporis. Impedit asperiores minima quas vero voluptates ut veritatis.
          expedita, assumenda quibusdam quae, nemo labore ea. Accusantium,
          recusandae?
        </div>
        <p>Contact number: 088 888 888</p>
      </div>
    </div>
  );
}
