import { useState } from "react";
import "../css/partials/uploadimage.css";

function UploadImage() {
  const [selectedImage, setSelectedImage] = useState("No image selected");

  return (
    <div className="upload-image-container">
      <label htmlFor="uploadImage">Add image</label>
      <input
        type="file"
        name="image"
        id="uploadImage"
        onChange={(e) => setSelectedImage(e.target.value.match(/[^\\/]*$/))}
      />
      {selectedImage}

      <button>Add photo</button>
    </div>
  );
}

export default UploadImage;
