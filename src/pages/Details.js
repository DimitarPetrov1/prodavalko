import { useState, useEffect, useContext } from "react";
import { db } from "../firebase/config";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

import HeartSVG from "../img/heart.svg";
import BlackHeartSVG from "../img/heart-black.svg";
import DeleteSVG from "../img/trash-2.svg";
import EditSVG from "../img/edit.svg";
import Alert from "./partials/Alert";

import "../css/details.css";

export default function Details() {
  const navigate = useNavigate();

  const user = useContext(UserContext);

  const [offerLiked, setOfferLiked] = useState(false);
  const [offer, setOffer] = useState();
  const [offerDetails, setOfferDetails] = useState();
  const [alert, setAlert] = useState(false);

  // useparams to get the id of the offer
  const { offerID } = useParams();

  useEffect(() => {
    const getIsLiked = async () => {
      if (user) {
        const userRef = doc(db, "userData", user.uid);
        const likesSnap = await getDoc(userRef);

        if (likesSnap.data().likes.includes(offerID)) {
          setOfferLiked(true);
        }
      }
    };
    getIsLiked();
  });

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
          navigate("*");
        }
      } else {
        navigate("*");
      }
    };
    getOffer();
  }, [offerID, navigate]);

  const onAlertConfirm = async () => {
    await deleteDoc(doc(db, "offers", offerID));
    navigate("/catalog");
  };

  const onLike = async () => {
    let userLikesList = [];
    const userRef = doc(db, "userData", user.uid);
    const likesSnap = await getDoc(userRef);

    if (!likesSnap.data().likes.includes(offerID)) {
      userLikesList.push(...likesSnap.data().likes, offerID);
    } else {
      let likesCopy = likesSnap.data().likes;
      const index = likesCopy.indexOf(offerID);
      likesCopy.splice(index, 1);

      userLikesList = likesCopy;
    }
    await updateDoc(userRef, {
      likes: userLikesList,
    });
    setOfferLiked(!offerLiked);
  };

  return (
    <div className="details">
      {alert ? (
        <Alert
          type="confirm"
          message="Do you wish to delete this offer?"
          onClose={() => setAlert(false)}
          onConfirm={onAlertConfirm}
        />
      ) : null}
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
              {/* When No user || user is not the offer owner we can't Like */}
              {/* When we have logged user && Owner we can't Like but can Edit or Delete */}
              {!user || user.uid === offer.owner ? null : (
                <img
                  className="svg-button"
                  src={offerLiked ? BlackHeartSVG : HeartSVG}
                  alt=""
                  onClick={onLike}
                />
              )}
            </div>
            <p className="sidebar-price">Price: {offer.price}$</p>

            <p>
              Offer by:{" "}
              <NavLink className="text-link" to={`/profile/${offer.owner}`}>
                {offerDetails.username}
              </NavLink>
            </p>
            <p>Contact number: {offerDetails.phoneNumber}</p>

            {user && user.uid === offer.owner ? (
              <div className="sidebar-controls">
                <img
                  className="svg-button"
                  src={DeleteSVG}
                  alt=""
                  onClick={() => setAlert(true)}
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
