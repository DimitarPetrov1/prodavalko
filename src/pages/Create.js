import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth } from "../firebase/config";

import { storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import "../css/create.css";
import "../css/partials/uploadimage.css";

export default function Create() {
  const [imageUplaod, setImageUpload] = useState(null);
  const [selectedImage, setSelectedImage] = useState("No image selected");

  const [imageUrl, setImageUrl] = useState(null);

  let formData = {};

  // to use auto id use doc
  const docRef = doc(collection(db, "offers"));
  const offerID = docRef.id;

  // image ref + using the auto id for the offer as a image name
  const imageRef = ref(storage, `offerImages/${offerID}`);

  const imageUpload = async () => {
    uploadBytes(imageRef, imageUplaod)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setImageUrl(url);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
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
    <div className="create">
      <form method="POST" onSubmit={(e) => e.preventDefault()}>
        <label>Offer name</label>
        <input type="text" name="name" placeholder="Offer name" />

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
          {selectedImage}
          <img src={imageUrl} alt="" />
          <button onClick={imageUpload}>Confirm</button>
        </div>

        <label>Offer price</label>
        <input type="number" name="price" />

        <label>Offer description</label>
        <input type="text" name="description" />

        <input type="submit" value="Create" onClick={submit} />
      </form>
    </div>
  );
}
