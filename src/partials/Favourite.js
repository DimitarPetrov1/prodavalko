import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { NavLink } from "react-router-dom";
import "../css/partials/favourite.css";

export default function Favourite({ id }) {
  const [offer, setOffer] = useState();

  useEffect(() => {
    const getOfferDetails = async () => {
      const offerRef = doc(db, "offers", id);
      const offerData = await getDoc(offerRef);
      setOffer(offerData.data());
    };
    getOfferDetails();
  }, [id]);

  return (
    <NavLink to={`/catalog/${id}`}>
      <div className="favourite-box">
        {offer ? (
          <>
            <img src={offer.image} alt="" />
            <div className="favourite-box-details">
              <p style={{ fontWeight: 700 }}>{offer.name}</p>
              <p>{offer.price}$</p>
            </div>
          </>
        ) : null}
      </div>
    </NavLink>
  );
}
