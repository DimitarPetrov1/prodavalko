import { useState } from "react";
import { db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

import "../css/create.css";

export default function Create() {
  const [selectedImage, setSelectedImage] = useState("No image selected");

  const { offerID } = useParams();

  // to use auto id use doc
  const editOffer = async (e) => {
    const form = e.target.form;

    const editDocumentRef = doc(db, "offers", offerID);

    await updateDoc(editDocumentRef, {
      name: form.name.value,
      price: form.price.value,
      description: form.description.value,
    });
  };

  return (
    <div className="create">
      <form method="POST" onSubmit={(e) => e.preventDefault()}>
        <label>Edit Offer name</label>
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

        <input type="submit" value="Edit" onClick={editOffer} />
      </form>
    </div>
  );
}
