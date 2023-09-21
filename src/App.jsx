import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/AuthForm/SignIn";
import SignUp from "./components/AuthForm/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import { useUserAuth } from "./components/store/useUserAuth";
function App() {
  const { currentUser } = useUserAuth();

  return (
    <>
      <Navbar />
      <Routes>
        {currentUser ? (
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        ) : (
          <Route path="/" exact element={<SignIn />} />
        )}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
