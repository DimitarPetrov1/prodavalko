import { useState, useEffect } from "react";

import { db } from "../firebase/config";
import { auth } from "../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import defaultImage from "../img/profile.jpg";
import UploadImage from "../partials/UploadImage";
import Favourite from "../partials/Favourite";

import "../css/profile.css";

export default function Profile() {
  const [userData, setUserData] = useState();
  const [editOpen, setOpenEdit] = useState(false);
  const [newPhone, setNewPhone] = useState();

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

  const editNumber = (e) => {
    e.preventDefault();

    const updateNumber = async () => {
      const numberRef = doc(db, "userData", auth.currentUser.uid);
      await updateDoc(numberRef, {
        phoneNumber: newPhone,
      });
    };
    updateNumber();
    setNewPhone();
    setOpenEdit(false);
    getUser();
  };

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

          <form method="POST" className="my-info">
            <p>Contact number: {userData.phoneNumber}</p>
            <div style={{ visibility: editOpen ? "visible" : "hidden" }}>
              <input
                type="number"
                name="editNumber"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
              <button onClick={editNumber}>Confirm</button>
            </div>

            <button
              className={editOpen ? "button danger" : "button success"}
              onClick={(e) => {
                e.preventDefault();
                setOpenEdit(!editOpen);
              }}
            >
              Edit
            </button>
          </form>
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
