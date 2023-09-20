import React from "react";
import SignIn from "../components/AuthForm/SignIn";
import SignUp from "../components/AuthForm/SignUp";

const AuthPage = () => {
  return (
    <div>
      <SignIn />
      <SignUp />
    </div>
  );
};

export default AuthPage;
