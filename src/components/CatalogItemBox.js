import { NavLink } from "react-router-dom";
import "../css/catalog-item-box.css";

export default function CatalogItemBox() {
  return (
    <div className="catalog-item-box">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCm9N4vxJ2ZQbReOYcPyGuHyp4uD2eFnkvvQ&usqp=CAU"
        alt="photo"
      />
      <div className="catalog-item-description-box">
        {/* To fix overflowing with larger texts */}
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum ducimus
          est ratione veritatis reiciendis animi consequatur quia consequuntur
          deserunt laudantium illo officiis, sapiente, ipsum odit?
          Reprehenderit, molestias, molestiae dolore rem inventore, provident
          modi ratione omnis debitis itaque velit nisi voluptatibus eveniet
          voluptas soluta iure hic! Aliquid quia reprehenderit, obcaecati
          impedit vel dolorem. Quos iste quaerat voluptatum fugiat nobis
          consequuntur quasi obcaecati odio fugit numquam minus accusamus sit
          consectetur explicabo repellendus enim iusto corporis similique nulla,
          sed unde ad deserunt dolorem maxime! Quasi similique aut perferendis
          ea numquam minus est sint maiores? Molestiae nostrum nemo laudantium
          non adipisci possimus repudiandae accusantium.
        </p>
        <div className="catalog-item-buttons-box">
          <NavLink>Like</NavLink>
          <NavLink className="button success" to="/catalog/:offerID/details">
            See offer
          </NavLink>
        </div>
      </div>
    </div>
  );
}
