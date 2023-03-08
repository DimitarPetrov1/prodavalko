import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./pages/Navigation";
import Catalog from "./pages/Catalog";
import Details from "./pages/Details";
import Create from "./pages/Create";
import Logout from "./pages/Logout";

import "./css/app.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div className="app">
      <header>
        <Navigation user={user} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:offerID" element={<Details />} />
          <Route path="/create" element={<Create />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </main>
      {/* <footer>Just a footer</footer> */}
    </div>
  );
}

export default App;
