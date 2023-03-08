import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { auth } from "../firebase/config";

import "../css/details.css";

export default function Details() {
  const [offer, setOffer] = useState();
  // useparams to get the id of the offer
  const { offerID } = useParams();

  useEffect(() => {
    const getOffer = async () => {
      const currentOffer = doc(db, "offers", offerID);
      const offerSnap = await getDoc(currentOffer);

      if (offerSnap.exists()) {
        setOffer(offerSnap.data());
      } else {
        console.log("No such document");
      }
    };
    getOffer();
  }, [offerID]);

  return (
    <div className="details">
      {offer ? (
        <div className="details-container">
          <p>{offer.name}</p>
          <img src={offer.image} alt="photo" />
          <p>Price: {offer.price}</p>
          <p>Description:</p>
          <p>{offer.description}</p>
          <p>Contact number: {offer.contactNumber}</p>
          <p>auth: {offer.owner}</p>
          {/* todo */}
          {auth.currentUser && auth.currentUser.uid === offer.owner ? (
            <>
              <button>delete</button>
              <button>edit</button>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
