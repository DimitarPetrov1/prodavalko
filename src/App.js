import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Catalog from "./components/Catalog";
import Details from "./components/Details";
import Create from "./components/Create";

import "./css/app.css";

function App() {
  return (
    <div className="app">
      <header>
        <Navigation />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:offerID/details" element={<Details />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </main>
      {/* <footer>Just a footer</footer> */}
    </div>
  );
}

export default App;
