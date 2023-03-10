import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useParams, NavLink } from "react-router-dom";
import { auth } from "../firebase/config";

import "../css/details.css";

export default function Details() {
  const [offer, setOffer] = useState();
  const [offerDetails, setOfferDetails] = useState();

  // useparams to get the id of the offer
  const { offerID } = useParams();

  useEffect(() => {
    const getOffer = async () => {
      const currentOffer = doc(db, "offers", offerID);
      const offerSnap = await getDoc(currentOffer);

      // If the offer (1) exists check for the offer (2) author to display them
      if (offerSnap.exists()) {
        // 1
        setOffer(offerSnap.data());
        const ownerID = offerSnap.data().owner;
        const getOwnerDetails = doc(db, "userData", ownerID);

        const ownerSnap = await getDoc(getOwnerDetails);
        // 2
        if (ownerSnap.exists()) {
          setOfferDetails(ownerSnap.data());
        } else {
          console.log("No such document");
        }
      } else {
        console.log("No such document");
      }
    };
    getOffer();
  }, [offerID]);

  const onDelete = async () => {
    await deleteDoc(doc(db, "offers", offerID));
  };

  return (
    <div className="details">
      {offer && offerDetails ? (
        <div className="details-container">
          <p>Offer author: {offerDetails.username}</p>
          <p>Phone number: {offerDetails.phoneNumber}</p>
          <p>{offer.name}</p>
          <img src={offer.image} alt="" />
          <p>Price: {offer.price}</p>
          <p>Description:</p>
          <p>{offer.description}</p>
          {/* <p>Contact number: {offer.contactNumber}</p> */}
          {/* todo */}
          {auth.currentUser && auth.currentUser.uid === offer.owner ? (
            <>
              <button onClick={onDelete}>delete</button>
              <NavLink to={`/edit/${offerID}`}>edit</NavLink>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
