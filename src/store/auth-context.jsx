/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

export const AuthContext = React.createContext({
  onSignUp: () => {},
  onSignIn: () => {},
  onLogOut: () => {},
  isLoggedin: false,
  currentUser: null,
});

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  const contextvalue = {
    onSignIn: signIn,
    onSignUp: signUp,
    onLogOut: logOut,
    currentUser: currentUser,
  };

  return (
    <AuthContext.Provider value={contextvalue}>{children}</AuthContext.Provider>
  );
};
