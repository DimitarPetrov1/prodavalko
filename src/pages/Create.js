import { useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import { db } from "../firebase/config";
import { collection, doc, setDoc } from "firebase/firestore";
import Alert from "../pages/partials/Alert";

import { useNavigate } from "react-router-dom";

import { storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import ImageIcon from "../img/image.svg";
import CreateSVG from "../img/undraw_typewriter_re_u9i2.svg";

import "../css/create-edit.css";

export default function Create() {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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

    // Input validation
    // All fiends are reqired
    if (
      !form.name.value ||
      !form.price.value ||
      !form.description.value ||
      !form.image.value
    ) {
      setAlertMessage("All fields are required!");
      setAlert(true);
      return;
    }
    // Price must be numbers only && > 0
    if (!form.price.value.match(/^[-+]?[0-9]+(\.[0-9]+)*$/g)) {
      setAlertMessage("Price must be a number!");
      setAlert(true);
      return;
    }
    if (Number(form.price.value) <= 0) {
      setAlertMessage("Price must be more than 0");
      setAlert(true);
      return;
    }
    // Name and description must be longer than...
    if (form.name.value.length < 3) {
      setAlertMessage("The name must be longer than 3 characters");
      setAlert(true);
      return;
    }
    if (form.description.value.length < 10) {
      setAlertMessage("The description must be longer than 10 characters");
      setAlert(true);
      return;
    }

    formData = {
      id: offerID,
      owner: user.uid,
      image: imageUrl,
      name: form.name.value,
      price: form.price.value,
      description: form.description.value,
    };

    await setDoc(docRef, formData);

    navigate(`/catalog/${offerID}`);
  };

  return (
    <div className="page create">
      {alert ? (
        <Alert message={alertMessage} onClose={() => setAlert(false)} />
      ) : null}
      <h1 className="page-header">Create offer</h1>
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
              ) : null}
            </>
          ) : null}
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
