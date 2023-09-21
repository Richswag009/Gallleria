import { useState } from "react";
// import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../store/useUserAuth";

const Navbar = () => {
  const { logOut, currentUser } = useUserAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onSignedOut = async () => {
    try {
      await logOut();
      console.log("successfully LogOut");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <nav className=" flex flex-row justify-between align-middle border-b-4 bg-white px-3 lg:px-10 py-3 shadow-lg  mb-0">
      <h1 className="text-2xl font-normal">
        {" "}
        <strong className="text-lime-800 ">Galleria</strong>
      </h1>

      {currentUser && (
        <button
          className="px-2 py-1 lg:py-2 lg:px-3 rounded-md text-white bg-black"
          onClick={onSignedOut}
        >
          Sign out now
        </button>
      )}
    </nav>
  );
};

export default Navbar;
