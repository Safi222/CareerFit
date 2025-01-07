import Navbar from "./components/Navbar/Navbar";
import Jobs from "./components/JobsD/Jobs";
import Value from "./components/ValueD/Value";
import Footer from "./components/FooterD/Footer";
import Slogan from "./components/SloganD/Slogan";
import Login from "./components/Login/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Register from "./components/Register/Register";
import AboutUs from "./components/About US/AboutUs";
import CvPilot from "./components/CvPilot/CvPilot";
import PreCvPilot from "./components/CvPilot/PreCvPilot";
import Profile from "./components/Profile/Profile";
import ProtectedRoute from "./ProtectedRoute";
// import { useEffect } from "react";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="w-[85%] m-auto bg-white">
              <Slogan />
              <Jobs fromHome={true} />
              <PreCvPilot />
              <Value />
            </div>
          }
        />
        <Route
          path="/jobs"
          element={
            <div className="w-[85%] m-auto bg-white">
              <Jobs />
              <PreCvPilot />
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div className="w-[85%] m-auto bg-white">
              <AboutUs />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className="w-[85%] m-auto bg-white">
              <Login />
            </div>
          }
        />
        <Route
          path="/cvpilot"
          element={
            <div className="w-[85%] m-auto bg-white">
              <CvPilot />
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <div className="w-[85%] m-auto bg-white">
              <Register />
            </div>
          }
        />
        <Route
          path="/contact"
          element={<div className="w-[85%] m-auto bg-white"></div>}
        />
        <Route
          path="/profile"
          element={
            <div className="w-[85%] m-auto bg-white">
              <ProtectedRoute>
                <Profile
                  user={{
                    firstName: "khaled",
                    lastName: "mohamed",
                    email: "khaledmohamed",
                    role: "Admin",
                  }}
                />
              </ProtectedRoute>
            </div>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
