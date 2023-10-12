import { useRouteError } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <Navbar />
      <div
        id="error-page"
        className=" flex flex-col mx-auto  justify-center space-y-4 mt-20 text-2xl text-center"
      >
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}
