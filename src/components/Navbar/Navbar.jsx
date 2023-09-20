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
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <nav className=" flex flex-row justify-between align-middle border-b-4 bg-white px-10 py-3 shadow-lg  mb-0">
      <h1 className="text-2xl font-normal">
        {" "}
        <strong className="text-lime-800 ">Galleria</strong>
      </h1>

      {/* <Navigation user={user} /> */}
      {currentUser && (
        <>
          {`signed in as ${currentUser.email}`}
          <button
            className="py-2 px-3 text-white bg-black"
            onClick={onSignedOut}
          >
            Sign out now
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
