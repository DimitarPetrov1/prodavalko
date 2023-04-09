import { useState, useEffect } from "react";
import { UserContext } from "./context/userContext";
import { Routes, Route } from "react-router-dom";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import Home from "./pages/Home";
import Navigation from "./pages/Navigation";
import Catalog from "./pages/Catalog";
import Details from "./pages/Details";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";

import Profile from "./pages/Profile";

import "./css/app.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="app">
      {loading ? null : (
        <UserContext.Provider value={user}>
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </UserContext.Provider>
      )}
    </div>
  );
}

export default App;
