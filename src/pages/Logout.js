import React, { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";

export default function Logout() {
  useEffect(() => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }, []);

  return <div>We're sad to see you go. Log in again.</div>;
}
