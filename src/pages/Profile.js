import { useState } from "react";

import { db } from "../firebase/config";
import { auth } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

import defaultImage from "../img/profile.jpg";
import UploadImage from "../partials/UploadImage";
import Favourite from "../partials/Favourite";

import "../css/profile.css";

export default function Profile() {
  const [userData, setUserData] = useState();

  const getUser = async () => {
    const userRef = doc(db, "userData", auth.currentUser.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      setUserData(userSnap.data());
    } else {
      console.log("No such document!");
    }
  };
  getUser();

  return (
    <div className="profile">
      {userData ? (
        <>
          <div className="profile-picture-container">
            <p>{userData.username}</p>
            {/* If not image set, use default */}
            <img src={defaultImage} alt="" />
            <UploadImage />
          </div>

          <div className="my-info">
            <p>Contact number: {userData.phoneNumber}</p>
            <button>Edit</button>
          </div>
          {/*  */}
          <p>Likes:</p>
          <div className="my-likes-container">
            <Favourite />
            <Favourite />
            <Favourite />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
