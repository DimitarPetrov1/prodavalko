import { useState } from "react";

function UploadImage() {
  const [selectedImage, setSelectedImage] = useState("No image selected");

  return (
    <div>
      <input
        type="file"
        name="image"
        id="uploadImage"
        onChange={(e) => setSelectedImage(e.target.value.match(/[^\\/]*$/))}
      />
      {selectedImage}
    </div>
  );
}

export default UploadImage;
