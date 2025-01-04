import Navbar from "./components/Navbar/Navbar";
import Search from "./components/SearchD/Search";
import Jobs from "./components/JobsD/Jobs";
import Value from "./components/ValueD/Value";
import Footer from "./components/FooterD/Footer";
import Slogan from "./components/SloganD/Slogan";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import AboutUs from "./components/About US/AboutUs";
import CvPilot from "./components/CvPilot/CvPilot";
import PreCvPilot from "./components/CvPilot/PreCvPilot";
import Dashboard from "./components/Dashboard/dashboard";
// import { useEffect } from "react";

const App = () => {
  // const fetchUserData = async () => {
  //   const token = localStorage.getItem("token"); // Retrieve the JWT token
  //   const serverUri = import.meta.env.VITE_SERVER_URI;

  //   const response = await fetch(`${serverUri}/auth/user`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `${token}`, // Send the token in the Authorization header
  //     },
  //   });

  //   if (response.status == "success") {
  //     const data = await response.json();
  //     console.log("User data:", data);
  //   } else {
  //     console.log("Failed to fetch data");
  //   }
  // };

  // useEffect(() => {
  //   fetchUserData();
  // });

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="w-[85%] m-auto bg-white">
              <Navbar />
              <Slogan />
              <Search />
              <Jobs />
              <PreCvPilot />
              <Value />
              <Footer />
            </div>
          }
        />
        <Route
          path="/jobs"
          element={
            <div className="w-[85%] m-auto bg-white">
              <Navbar />
              <Search />
              <Jobs />
              <PreCvPilot />
              <Footer />
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div className="w-[85%] m-auto bg-white">
              <Navbar />
              <AboutUs />
              <Footer />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className="w-[85%] m-auto bg-white">
              <Navbar />
              <Login />
              <Footer />
            </div>
          }
        />
        <Route
          path="/cvpilot"
          element={
            <div className="w-[85%] m-auto bg-white">
              <Navbar />
              <CvPilot />
              <Footer />
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <div className="w-[85%] m-auto bg-white">
              <Navbar />
              <Register />
              <Footer />
            </div>
          }
        />
        <Route
          path="/contact"
          element={
            <div className="w-[85%] m-auto bg-white">
              <Navbar />
              <Footer />
            </div>
          }
        />
        <Route
          path="/dashboard"
          element={
            <div className="w-[85%] m-auto bg-white">
              <Navbar />
              <Dashboard
                user={{
                  firstName: "khaled",
                  lastName: "mohamed",
                  email: "khaledmohamed",
                  role: "Admin",
                }}
              />
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
