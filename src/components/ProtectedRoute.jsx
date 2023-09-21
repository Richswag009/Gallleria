/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "./store/useUserAuth";

const ProtectedRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let { currentUser } = useUserAuth();
  const navigate = useNavigate();

  const checkUser = () => {
    setIsLoggedIn(false);
    if (!currentUser) {
      return navigate("/");
    } else setIsLoggedIn(true);
  };

  useEffect(() => {
    checkUser();
  }, [isLoggedIn]);

  return <div> {isLoggedIn ? children : null}</div>;
};

export default ProtectedRoute;
