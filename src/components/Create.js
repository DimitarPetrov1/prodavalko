import { useState } from "react";
import "../css/create.css";

export default function Create() {
  const [selectedImage, setSelectedImage] = useState("No image selected");

  return (
    <div className="create">
      <form method="POST">
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
        <input type="text" name="phone" />

        <input type="submit" value="Create" />
      </form>
    </div>
  );
}
