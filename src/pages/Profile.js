import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

import { db, storage } from "../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import defaultImage from "../img/profile.jpg";
import Favourite from "./partials/Favourite";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import EditSVG from "../img/edit.svg";
import CheckSVG from "../img/check.svg";

import "../css/profile.css";
import "../css/partials/uploadimage.css";

export default function Profile() {
  const { userID } = useParams();

  const user = useContext(UserContext);

  const navigate = useNavigate();

  const [userData, setUserData] = useState();
  const [editOpen, setOpenEdit] = useState(false);
  const [newPhone, setNewPhone] = useState();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [favourites, setFavourites] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);

  const [imageUplaod, setImageUpload] = useState(null);

  const userRef = doc(db, "userData", userID);

  useEffect(() => {
    const getUser = async () => {
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserData(userSnap.data());
      }
    };
    getUser();
  }, [userRef]);

  useEffect(() => {
    const avatarRef = ref(storage, `avatars/${userID}`);

    if (avatarRef !== false) {
      const getAvatar = async () => {
        getDownloadURL(avatarRef)
          .then((url) => {
            setAvatarUrl(url);
          })
          .catch((err) => console.log(err.code));
      };
      getAvatar();
    }
  }, [userID, navigate]);

  useEffect(() => {
    const likesRef = doc(db, "userData", userID);
    const getLikes = async () => {
      try {
        const likes = await getDoc(likesRef);
        setFavourites(likes.data().likes);
      } catch (err) {
        console.log(err);
        navigate("*");
      }
    };
    getLikes();
  }, [navigate, userID]);

  const uploadImage = () => {
    const avatarRef = ref(storage, `avatars/${userID}`);

    uploadBytes(avatarRef, imageUplaod)
      .then(() =>
        getDownloadURL(avatarRef)
          .then((url) => {
            setAvatarUrl(url);
          })
          .catch((err) => console.log(err.message))
      )
      .catch((err) => console.log(err.message));
    setImageUpload(null);
  };

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
  };

  return (
    <div className="profile">
      <h1 className="page-header">User Profile</h1>
      {userData ? (
        <>
          <div className="profile-picture-container">
            {/* If not image set, use default */}
            <img
              src={avatarUrl ? avatarUrl : defaultImage}
              alt=""
              className="avatar-pic"
            />
            {user && user.uid === userID ? (
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

              {user && user.uid === userID ? (
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
          {user && user.uid === userID && favourites.length > 0 ? (
            <>
              <p>Your favourites:</p>
              <div className="my-likes-container">
                {favourites.map((id, index) => {
                  return <Favourite id={id} key={index} />;
                })}
              </div>
            </>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
