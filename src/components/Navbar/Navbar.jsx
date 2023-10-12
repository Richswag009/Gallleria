import { useState, useEffect } from "react";
// import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../store/useUserAuth";

// eslint-disable-next-line react/prop-types
const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const { onLogOut, currentUser } = useUserAuth();
  // const authctx = useUserAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onSignedOut = async () => {
    try {
      // await logOut();
      onLogOut();
      console.log("successfully LogOut");
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <nav className=" flex font-[Cinzel] flex-row justify-between align-middle items-center border-b-4 bg-white px-3 lg:px-10 py-3 shadow-lg  mb-0">
      <Link to="/">
        <h1 className="text-2xl font-normal">
          <strong className="text-lime-800 ">Galleria</strong>
        </h1>
      </Link>

      {isLoggedIn ? (
        <div className="flex justify-between align-middle items-center space-x-8">
          <Link to="/gallery">
            <p className="text-2xl font-semibold"> Gallery</p>
          </Link>

          <button
            className="px-2 py-1 lg:py-2 border lg:px-3 rounded-md hover:bg-black hover:text-white duration-150 delay-150 transition ease-in-out  bg-white"
            onClick={onSignedOut}
          >
            LogOut
          </button>

          <span className="rounded-full w-full p-4 text-center text-white bg-lime-800">
            {currentUser.email[0]}
          </span>
        </div>
      ) : (
        <Link to="/register">
          <button className="px-2 py-1 lg:py-2 lg:px-3 rounded-md text-black bg-white">
            Sign Up
          </button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
