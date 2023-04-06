import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { db, auth, storage } from "../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import defaultImage from "../img/profile.jpg";
import Favourite from "../partials/Favourite";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import EditSVG from "../img/edit.svg";
import CheckSVG from "../img/check.svg";

import "../css/profile.css";
import "../css/partials/uploadimage.css";

export default function Profile() {
  const { userID } = useParams();

  const [userData, setUserData] = useState();
  const [editOpen, setOpenEdit] = useState(false);
  const [newPhone, setNewPhone] = useState();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [favourites, setFavourites] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);

  const [imageUplaod, setImageUpload] = useState(null);

  useEffect(() => {
    const avatarRef = ref(storage, `avatars/${userID}`);
    const likesRef = doc(db, "userData", userID);

    if (avatarRef !== null || avatarRef !== undefined) {
      getDownloadURL(avatarRef)
        .then((url) => {
          setAvatarUrl(url);
        })
        .catch((err) => console.log(err.message));
    }

    const getLikes = async () => {
      const likes = await getDoc(likesRef);
      setFavourites(likes.data().likes);
    };

    getLikes();
  }, [userID]);

  const uploadImage = () => {
    if (imageUplaod == null) return;

    const imageRef = ref(storage, `avatars/${userID}`);
    uploadBytes(imageRef, imageUplaod).then(() => {
      alert("image uploaded");
    });
    setImageUpload(null);
  };

  const getUser = async () => {
    const userRef = doc(db, "userData", userID);
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
      const numberRef = doc(db, "userData", userID);
      await updateDoc(numberRef, {
        phoneNumber: newPhone,
      });
    };
    updateNumber();
    setOpenEdit(false);
    setNewPhone();
    getUser();
  };

  return (
    <div className="profile">
      <h1>User Profile</h1>
      {userData ? (
        <>
          <div className="profile-picture-container">
            {/* If not image set, use default */}
            <img
              src={avatarUrl ? avatarUrl : defaultImage}
              alt=""
              className="avatar-pic"
            />
            {auth.currentUser && auth.currentUser.uid === userID ? (
              <label style={{ marginBottom: 10 }} htmlFor="uploadImage">
                <img src={EditSVG} alt="" className="svg-button" />
              </label>
            ) : null}

            <h3>{userData.username}</h3>

            <div className="upload-image-container">
              <input
                type="file"
                name="image"
                id="uploadImage"
                onChange={(e) => {
                  setSelectedImage(e.target.value.match(/[^\\/]*$/));
                  setImageUpload(e.target.files[0]);
                }}
              />

              {imageUplaod ? (
                <>
                  <button onClick={uploadImage}>Add photo</button>
                  {selectedImage}
                </>
              ) : null}
            </div>
          </div>

          <form method="POST">
            <div className="phone-holder">
              <p>Contact number: {userData.phoneNumber}</p>

              {auth.currentUser && auth.currentUser.uid === userID ? (
                <img
                  src={EditSVG}
                  alt=""
                  className="svg-button"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenEdit(!editOpen);
                  }}
                />
              ) : null}
            </div>

            <div className={editOpen ? "edit-phone-visible" : "edit-phone"}>
              <input
                type="number"
                name="editNumber"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
              <img
                className="svg-button"
                src={CheckSVG}
                alt=""
                onClick={editNumber}
              />
            </div>
          </form>
          {auth.currentUser && auth.currentUser.uid === userID ? (
            <>
              <p>Your favourites:</p>
              <div className="my-likes-container">
                {favourites
                  ? favourites.map((id, index) => {
                      return <Favourite id={id} key={index} />;
                    })
                  : null}
              </div>
            </>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
