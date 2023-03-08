import { useState } from "react";
import { db } from "../firebase/config";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth } from "../firebase/config";

import "../css/create.css";

export default function Create() {
  const [selectedImage, setSelectedImage] = useState("No image selected");

  let formData = {};

  const submit = (e) => {
    // first get the form data and update the state
    const form = e.target.form;

    formData = {
      owner: auth.currentUser.uid.toString(),
      name: form.name.value,
      price: form.price.value,
      description: form.description.value,
      contactNumber: form.contactNumber.value,
    };

    // to use auto id use doc
    const createOffer = async () => {
      const docRef = doc(collection(db, "offers"));
      await setDoc(docRef, formData);
    };
    createOffer();
  };

  return (
    <div className="create">
      <form method="POST" onSubmit={(e) => e.preventDefault()}>
        <label>Offer name</label>
        <input type="text" name="name" placeholder="Offer name" />

        <label htmlFor="uploadImage">Add image</label>
        <input
          type="file"
          name="image"
          id="uploadImage"
          onChange={(e) => setSelectedImage(e.target.value.match(/[^\\/]*$/))}
        />
        {selectedImage}

        <label>Offer price</label>
        <input type="number" name="price" />

        <label>Offer description</label>
        <input type="text" name="description" />

        <label>Contact number</label>
        <input type="text" name="contactNumber" />

        <input type="submit" value="Create" onClick={submit} />
      </form>
    </div>
  );
}
