import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { db, storage } from "../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import ImageIcon from "../img/image.svg";

import "../css/create-edit.css";
import Alert from "../pages/partials/Alert";

export default function Edit() {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const [alertMessage, setAlertMessage] = useState("");
  const [alert, setAlert] = useState(false);

  const [selectedImageName, setSelectedImageName] =
    useState("No image selected");

  const { offerID } = useParams();
  const [offerDetails, setOfferDetails] = useState({});
  const [imageUplaodRef, setImageUploadRef] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const editDocumentRef = doc(db, "offers", offerID);
  const imageRef = ref(storage, `offerImages/${offerID}`);

  useEffect(() => {
    if (user) {
      const getOffer = async () => {
        const offerSnap = await getDoc(editDocumentRef);

        if (offerSnap.exists()) {
          setOfferDetails({
            name: offerSnap.data().name,
            price: offerSnap.data().price,
            description: offerSnap.data().description,
          });
        } else {
          navigate("*");
        }
      };

      getOffer();
    } else {
      navigate("*");
    }
  });

  // to use auto id use doc
  const editOffer = async (e) => {
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
    let numbers = /^[-+]?[0-9]+(\.[0-9]+)*$/;
    if (!form.price.value.match(numbers)) {
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

    await updateDoc(editDocumentRef, {
      name: form.name.value,
      image: imageUrl,
      price: form.price.value,
      description: form.description.value,
    });

    navigate(`/catalog/${offerID}`);
  };

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

  return (
    <div className="page edit create">
      {alert ? (
        <Alert message={alertMessage} onClose={() => setAlert(false)} />
      ) : null}
      {offerDetails ? (
        <>
          <h1 className="page-header">Edit your offer below</h1>
          <form method="POST" onSubmit={(e) => e.preventDefault()}>
            <input type="text" name="name" placeholder={offerDetails.name} />
            <input type="text" name="price" placeholder={offerDetails.price} />
            <textarea
              name="description"
              placeholder={offerDetails.description}
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
              onClick={editOffer}
              disabled={!imageUrl}
            >
              {imageUrl ? "Edit offer" : "Select your image"}
            </button>
          </form>
        </>
      ) : null}
    </div>
  );
}
