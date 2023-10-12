import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useUserAuth } from "../store/useUserAuth";

const RootLayout = () => {
  const { currentUser } = useUserAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUser = () => {
      if (!currentUser || currentUser === "undefined" || currentUser === null) {
        setIsLoggedIn(false);
        console.log(currentUser);
      } else {
        setIsLoggedIn(true);
        console.log(currentUser);
      }
    };
    checkUser();
  }, [currentUser]);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
