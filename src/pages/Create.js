import { useState } from "react";
import { db } from "../firebase/config";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth } from "../firebase/config";

import { storage } from "../firebase/config";
import { ref, uploadBytes } from "firebase/storage";

import "../css/create.css";
import "../css/partials/uploadimage.css";

export default function Create() {
  const [imageUplaod, setImageUpload] = useState(null);

  const [selectedImage, setSelectedImage] = useState("No image selected");

  let formData = {};

  const submit = (e) => {
    let offerID = "";
    // to use auto id use doc
    const docRef = doc(collection(db, "offers"));
    offerID = docRef.id;
    // image ref
    const imageRef = ref(storage, `offerImages/${offerID}`);

    //  get the form data and update the state
    const form = e.target.form;

    formData = {
      id: offerID,
      owner: auth.currentUser.uid.toString(),
      name: form.name.value,
      price: form.price.value,
      description: form.description.value,
    };

    const createOffer = async () => {
      await setDoc(docRef, formData);

      const uploadImage = async () => {
        if (imageUplaod == null) return;
        uploadBytes(imageRef, imageUplaod).then(() => {
          alert("Offer created");
        });
      };
      uploadImage();
    };

    createOffer();
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
