/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useUserAuth } from "./store/useUserAuth";

const ProtectedRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let { currentUser } = useUserAuth();
  const navigate = useNavigate();

  const checkUser = () => {
    if (!currentUser) {
      setIsLoggedIn(false);
      return navigate("/auth/login");
    } else setIsLoggedIn(true);
  };

  useEffect(() => {
    checkUser();
  }, [isLoggedIn]);

  return <React.Fragment>{isLoggedIn ? children : null}</React.Fragment>;
};

export default ProtectedRoute;
