import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Gallery from "./pages/Gallery";
import SignIn from "./components/AuthForm/SignIn";
import SignUp from "./components/AuthForm/SignUp";
import ErrorPage from "./pages/ErrorPage";
import RootLayout from "./pages/RootLayout";
import { checkAuthLoader, tokenLoader } from "./utils/UseAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: tokenLoader,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/gallery",
        element: <Gallery />,
        loader: checkAuthLoader,
      },
      { path: "/login", element: <SignIn /> },
      { path: "/register", element: <SignUp /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
