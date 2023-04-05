import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { useParams, NavLink } from "react-router-dom";
import { auth } from "../firebase/config";

import HeartSVG from "../img/heart.svg";
import DeleteSVG from "../img/trash-2.svg";
import EditSVG from "../img/edit.svg";

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

  const onLike = async () => {
    let userLikesList = [];
    const userRef = doc(db, "userData", auth.currentUser.uid);
    const likesSnap = (await getDoc(userRef)).data().likes;

    if (!likesSnap.includes(offerID)) {
      userLikesList.push(...likesSnap, offerID);
    } else {
      let likesCopy = likesSnap;
      const index = likesCopy.indexOf(offerID);
      likesCopy.splice(index, 1);

      userLikesList = likesCopy;
    }
    await updateDoc(userRef, {
      likes: userLikesList,
    });
  };

  return (
    <div className="details">
      {offer && offerDetails ? (
        <>
          <div className="details-container">
            <img src={offer.image} alt="" />
            <div className="separator"></div>
            <p>{offer.description}</p>
          </div>
          <div className="sidebar">
            <div className="sidebar-title">
              <p>{offer.name}</p>
              {auth.currentUser &&
              auth.currentUser.uid === offer.owner ? null : (
                <img
                  className="svg-button"
                  src={HeartSVG}
                  alt=""
                  onClick={onLike}
                />
              )}
            </div>
            <p className="sidebar-price">Price: {offer.price}$</p>

            <p>Offer by: {offerDetails.username}</p>
            <p>Contact number: {offerDetails.phoneNumber}</p>

            {/* todo */}
            {auth.currentUser && auth.currentUser.uid === offer.owner ? (
              <div className="sidebar-controls">
                <img
                  className="svg-button"
                  src={DeleteSVG}
                  alt=""
                  onClick={onDelete}
                />
                <NavLink to={`/edit/${offerID}`}>
                  <img className="svg-button" src={EditSVG} alt="" />
                </NavLink>
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
}
