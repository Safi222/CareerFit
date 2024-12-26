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

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home Page Route */}
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
              <Jobs />
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
          path="/CvPilot"
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
          path="/Contact"
          element={
            <div className="w-[85%] m-auto bg-white">
              <Navbar />
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
