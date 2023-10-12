import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../store/useUserAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required("Please Enter a valid Email"),
  password: yup
    .string()
    .min(6)
    .max(32)
    .required("Password must be greater than 6"),
});

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { onSignIn } = useUserAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async () => {
    // e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const result = await onSignIn(email, password);
      const data = result.user;
      if (data.accessToken) {
        localStorage.setItem("token", data.accessToken);
        setIsLoading(false);
        return navigate("/gallery");
      }
    } catch (error) {
      setError(error.message);

      console.log(error.message);
    }
    reset();
    setIsLoading(false);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className=" bg-white rounded-lg px-4 max-w-[400px] border-2 shadow-md mx-auto pb-20  my-20"
      >
        <h1 className="text--[#008751] text-center text-3xl my-3">Sign In</h1>

        <div className="my-2">
          <label htmlFor="fullname">
            Email <sup className="text-red-500 text-lg">*</sup>
          </label>
          <input
            {...register("email")}
            type="email"
            value={email}
            name="email"
            placeholder="Enter Email"
            className=" rounded-2 h-[40px] w-full border p-3 my-1"
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="text-red-800">{errors["email"]?.message}</span>
        </div>

        <div className="my-2">
          <label htmlFor="fullname">
            Password <sup className="text-red-500 text-lg">*</sup>
          </label>
          <input
            {...register("password")}
            value={password}
            type="password"
            name="password"
            placeholder="Enter Password"
            className="  rounded-2 h-[40px] w-full border p-3 my-1"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="text-red-800 my-1 ">
            {errors["password"]?.message}
            {error && <p>{error}</p>}
          </span>
        </div>
        <button
          type="submit"
          className="px-3 text-white text-xl tracking-wildest py-3 bg-[#008751] rounded-lg w-full my-4 border"
        >
          {isLoading ? (
            <p className="text-center text-xl">loading...</p>
          ) : (
            <span>Login</span>
          )}
        </button>

        {/* <p className="mb-3">
          Dont have an account??{" "}
          <Link to="/register">
            <strong> Register here</strong>{" "}
          </Link>
        </p> */}
      </form>
    </div>
  );
};

export default SignIn;
