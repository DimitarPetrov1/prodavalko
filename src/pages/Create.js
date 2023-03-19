import { useState } from "react";
import { db } from "../firebase/config";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth } from "../firebase/config";

import { storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import ImageIcon from "../img/image.svg";
import CreateSVG from "../img/undraw_typewriter_re_u9i2.svg";

import "../css/create.css";

export default function Create() {
  const [selectedImageName, setSelectedImageName] =
    useState("No image selected");

  const [imageUplaodRef, setImageUploadRef] = useState(null);

  const [imageUrl, setImageUrl] = useState(null);

  let formData = {};

  // to use auto id use doc
  const docRef = doc(collection(db, "offers"));
  const offerID = docRef.id;

  // image ref + using the auto id for the offer as a image name
  const imageRef = ref(storage, `offerImages/${offerID}`);

  const uploadImage = async () => {
    uploadBytes(imageRef, imageUplaodRef)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setImageUrl(url);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    setImageUploadRef(null);
  };

  const submit = async (e) => {
    //  get the form data and update the state
    const form = e.target.form;

    formData = {
      id: offerID,
      owner: auth.currentUser.uid.toString(),
      image: imageUrl,
      name: form.name.value,
      price: form.price.value,
      description: form.description.value,
    };

    await setDoc(docRef, formData);

    alert("Offer created");
  };

  return (
    <div className="page create">
      <h1>Create offer</h1>
      <form method="POST" onSubmit={(e) => e.preventDefault()}>
        <input type="text" name="name" placeholder="Offer name" />
        <input type="text" name="price" placeholder="Offer price" />
        <textarea
          name="description"
          placeholder="Describe your offer"
        ></textarea>

        <div className="upload-image-container">
          <label className="select-text-wrap" htmlFor="uploadImage">
            {selectedImageName}
            <img src={ImageIcon} alt="" />
          </label>
          <input
            type="file"
            name="image"
            id="uploadImage"
            onChange={(e) => {
              setSelectedImageName(e.target.value.match(/[^\\/]*$/));
              setImageUploadRef(e.target.files[0]);
            }}
          />
          {imageRef ? (
            <>
              <img src={imageUrl} alt="" />
              {imageUplaodRef ? (
                <button className="button normal" onClick={uploadImage}>
                  Confirm
                </button>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </div>

        <button
          className="button success"
          onClick={submit}
          disabled={!imageUrl}
        >
          {imageUrl ? "Create offer" : "Select your image"}
        </button>
      </form>
      <img src={CreateSVG} alt="" className="create-bg-img" />
    </div>
  );
}
