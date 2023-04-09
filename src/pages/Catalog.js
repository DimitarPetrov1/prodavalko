import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import CatalogItemBox from "./CatalogItemBox";

import "../css/catalog.css";

export default function Catalog() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  }, []);

  return (
    <div className="catalog">
      <h1 className="page-header">Our catalog</h1>
      <div className="catalog-items">
        {loading ? null : (
          <>
            {offers.length === 0 ? (
              <p>No items available</p>
            ) : (
              offers.map((offer, index) => {
                return (
                  <CatalogItemBox
                    key={index}
                    id={offer.id}
                    details={offer.details}
                  />
                );
              })
            )}
          </>
        )}
      </div>
    </div>
  );
}
