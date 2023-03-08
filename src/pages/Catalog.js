import { useState, useEffect } from "react";

import { db } from "../firebase/config";

import { collection, getDocs } from "firebase/firestore";

import "../css/catalog.css";
import CatalogItemBox from "./CatalogItemBox";

export default function Catalog() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const getOffers = async () => {
      const data = await getDocs(collection(db, "offers"));
      setOffers(
        data.docs.map((doc) => ({
          id: doc.id,
          details: doc.data(),
        }))
      );
    };
    getOffers();
  }, []);

  return (
    <div className="catalog">
      <div className="catalog-items">
        {/* <p>No items available</p> */}
        {offers.map((offer, index) => {
          return (
            <CatalogItemBox key={index} id={offer.id} details={offer.details} />
          );
        })}
      </div>
    </div>
  );
}
