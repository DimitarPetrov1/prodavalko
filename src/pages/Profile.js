import { useEffect, useState } from "react";

import { db, auth, storage } from "../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import defaultImage from "../img/profile.jpg";
import Favourite from "../partials/Favourite";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import "../css/profile.css";
import "../css/partials/uploadimage.css";

export default function Profile() {
  const [userData, setUserData] = useState();
  const [editOpen, setOpenEdit] = useState(false);
  const [newPhone, setNewPhone] = useState();
  const [avatarUrl, setAvatarUrl] = useState("");

  const [selectedImage, setSelectedImage] = useState("No image selected");

  const [imageUplaod, setImageUpload] = useState(null);

  const uploadImage = () => {
    if (imageUplaod == null) return;

    const imageRef = ref(storage, `avatars/${auth.currentUser.uid}`);
    uploadBytes(imageRef, imageUplaod).then(() => {
      alert("image uploaded");
    });
  };

  useEffect(() => {
    const avatarRef = ref(storage, `avatars/${auth.currentUser.uid}`);
    if (avatarRef !== null || avatarRef !== undefined) {
      getDownloadURL(avatarRef).then((res) => {
        setAvatarUrl(res);
      });
    }
  }, []);

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
            <img src={avatarUrl} alt="" />

            <div className="upload-image-container">
              <label htmlFor="uploadImage">Add image</label>
              <input
                type="file"
                name="image"
                id="uploadImage"
                onChange={(e) => {
                  setSelectedImage(e.target.value.match(/[^\\/]*$/));
                  setImageUpload(e.target.files[0]);
                }}
              />
              <button onClick={uploadImage}>Add photo</button>
              {selectedImage}
            </div>
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
