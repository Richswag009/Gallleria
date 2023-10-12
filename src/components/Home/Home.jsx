import { Link } from "react-router-dom";
import { useUserAuth } from "../../store/useUserAuth";
import { data } from "../../../data";
import { useState, useEffect } from "react";

const Home = () => {
  const { currentUser } = useUserAuth();
  const [image, setImage] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setImage(data[Math.floor(Math.random() * data.length)]);
    }, 10000);
    return () => clearInterval(interval);
  }, [image]);

  return (
    <div className="flex max-w-6xl text-center fon t-[Cinzel]  flex-col my-20 mx-auto justify-center items-center  lg:px-20 space-y-8">
      <h1 className="text-6xl font-bold  tracking-wide">
        Bringing Arts to You the art ways{" "}
      </h1>
      <p className="px-12">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ratione
        magnam quidem, expedita saepe maxime cum velit rerum natus earum
        laborum. Molestiae suscipit quos animi rem eveniet asperiores vero
        neque!
      </p>
      {!currentUser && (
        <Link to="/login">
          <button className=" w-60 rounded-lg bg-black px-4 py-3 text-white">
            Log in
          </button>
        </Link>
      )}
      <img
        className="px-12 lg:px-24"
        loading="lazy"
        src={image?.imagePath}
        alt=""
      />
    </div>
  );
};
export default Home;
