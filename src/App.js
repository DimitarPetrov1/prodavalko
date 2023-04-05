import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./pages/Navigation";
import Catalog from "./pages/Catalog";
import Details from "./pages/Details";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";

import "./css/app.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import Profile from "./pages/Profile";

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
        <Navigation loggedUser={user} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:offerID" element={<Details />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:offerID" element={<Edit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:userID" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer>Just a footer</footer>
    </div>
  );
}

export default App;
