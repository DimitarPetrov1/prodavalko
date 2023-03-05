import "../css/catalog.css";
import CatalogItemBox from "./CatalogItemBox";

export default function Catalog() {
  return (
    <div className="catalog">
      <div className="catalog-items">
        {/* <p>No items available</p> */}
        <CatalogItemBox />
        <CatalogItemBox />
        <CatalogItemBox />
      </div>
    </div>
  );
}
