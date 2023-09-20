import React, { useState, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../Store/auth-context";
// import { setUserSession } from "../../utils/Fetchapi";
import { baseUrl } from "../../utils/Fetchapi";
import { config } from "../../utils/Fetchapi";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object()
  .shape({
    email: yup.string().required("please enter a valid email"),
    password: yup
      .string()
      .required("please enter password")
      .matches(
        // /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/,
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Minimum eight characters, at least one letter, one number and one special character"
      ),
  })
  .required();

const SignIn = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const authCtx = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const loginHandler = async () => {
    // e.preventDefault();
    try {
      const response = await axios.post(
        baseUrl() + "login",
        {
          email: email,
          password: password,
        },
        config
      );
      const res = response.data;
      // console.log(res.data.token);
      console.log(res.data);
      if (res.data.token) {
        // localStorage.setItem("user", JSON.stringify(res.data.data));
        authCtx.login(res.data.token);
        history("/dashboard2");
        window.location.reload();
      } else {
        throw new Error("please enter a valid email or password");
      }
    } catch (error) {
      setError("invalid username/password");
      console.log(error.message);
    }
  };
  // if (authCtx.isLoggedIn) {
  // }
  return (
    <div>
      <Navbar />
      <div className=" h-[80vh] bg-gradient-to-r from-[#336c80] to-[#002531]">
        <form
          action=""
          className="px-4 bg-white rounded-lg max-w-lg border-2 mt-10  shadow-md mx-auto "
          onSubmit={handleSubmit(loginHandler)}
        >
          <h1 className="text--[#008751] text-center text-3xl my-3">
            Sign up for Free
          </h1>
          <div className="my-2">
            <label htmlFor="fullname">Email</label>
            <input
              {...register("email")}
              type="email"
              value={email}
              name="email"
              className=" rounded-2 h-[40px] w-full border p-3 my-1"
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="text-red-800">
              {errors["email"]?.message} <sup>*</sup>
            </span>
          </div>

          <div className="my-2">
            <label htmlFor="fullname">Password</label>
            <input
              {...register("password")}
              value={password}
              type="password"
              name="password"
              className="  rounded-2 h-[40px] w-full border p-3 my-1"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="text-red-800">{errors["password"]?.message}</span>
          </div>

          {error && <span className="text-red-900">{error}</span>}

          {/* <Link to="/dashboard2"> */}
          <button className="px-3 text-white text-xl tracking-wildest py-3 bg-[#008751] rounded-lg w-full my-4 border">
            Login
          </button>
          {/* </Link> */}

          <p className="mb-3">
            Dont have an account??{" "}
            <Link to="/register">
              {" "}
              <strong> Register here</strong>{" "}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
